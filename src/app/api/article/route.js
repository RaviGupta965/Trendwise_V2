import { connectToDatabase } from "@/app/lib/mongoDB";
import Article from "@/app/models/article.schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer from "puppeteer";
import slugify from "slugify";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// delay to avoid api bottleneck
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req) {
  await connectToDatabase();

  // Step 1: Fetch Trending Topics using Puppeteer
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://trends24.in/india/", {
    waitUntil: "networkidle2",
  });

  const topics = await page.evaluate(() => {
    const titles = [];
    document.querySelectorAll(".trend-link").forEach((el) => {
      titles.push(el.textContent.trim());
    });
    return titles; // limit to 10 topics
  });
  await browser.close();

  // Step 2: Generate and save article for each topic
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const generated = [];
  let cnt = 0;
  for (const topic of topics) {
    const exists = await Article.findOne({ title: topic });
    if (exists) continue;
    if (cnt === 5) {
      break;
    }
    const prompt = `Write a detailed SEO-friendly blog article on: "${topic}".
Structure it with:
- A title should be same as topic name which i am providing
- A slug (kebab-case)
- Meta title and description
- H1-H3 headings
- Suggested media links
- Rich content
- media should contain array of <a> tag with related websites link.

Return JSON like:
{
  "title": "",
  "slug": "",
  "meta": {
    "title": "",
    "description": ""
  },
  "content": "",
  "media": [""]
};`;
    
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const jsonText = text.replace(/```json|```/g, "").trim();
      const articleData = JSON.parse(jsonText);
      // Fallback in case Gemini misses the slug
      if (!articleData.slug) {
        articleData.slug = slugify(topic, { lower: true });
      }

      const newArticle = await Article.create(articleData);
      cnt++;
      generated.push(newArticle.slug);
      await delay(2000);
    } catch (err) {
      console.error(`Failed on topic: ${topic}`, err.message);
      continue;
    }
  }
  console.log("your feed has been refreshed reload");
  return Response.json({ success: true, generated });
}
