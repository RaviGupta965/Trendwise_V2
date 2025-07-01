import { connectToDatabase } from "@/app/lib/mongoDB";
import Article from "@/app/models/article.schema";

export async function GET() {
  await connectToDatabase();
  const articles = await Article.find().select("slug").lean();

  const baseUrl = "https://your-domain.com";

  const urls = articles
    .map(({ slug }) => `<url><loc>${baseUrl}/article/${slug}</loc></url>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc></url>
  ${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}