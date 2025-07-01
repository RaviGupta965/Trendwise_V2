import { connectToDatabase } from "@/app/lib/mongoDB";
import Article from "@/app/models/article.schema";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  await connectToDatabase();

  const topic = "Top JavaScript Frameworks in 2025";

  const prompt = `
Write a detailed SEO-friendly blog article on: "${topic}".
Structure it with:
- A title
- A slug (kebab-case)
- Meta title and description
- H1-H3 headings
- Suggested media links
- Rich content

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
}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const text = await result.response.text();
    console.log(text);
  let articleData;
  try {
      const clean = text.trim().replace(/^```json|^```|```$/g, "");
      articleData = JSON.parse(clean);
  } catch (e) {
    return new Response("Gemini response was not valid JSON", { status: 500 });
  }

  const article = await Article.create(articleData);
  return Response.json({ success: true, article });
}
