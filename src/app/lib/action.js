import { connectToDatabase } from "@/app/lib/mongoDB";
import Article from "@/app/models/article.schema";

export async function getAllArticles() {
  await connectToDatabase();
  const articles = await Article.find().sort({ createdAt: -1 }).lean();
  return articles.map(({ _id, title, slug, meta }) => ({
    id: _id.toString(),
    title,
    slug,
    description: meta?.description || "",
  }));
}