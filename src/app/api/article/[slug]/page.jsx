import connectToDatabase from "@/app/lib/mongoDB";
import Article from "@/app/models/article.schema";
import Comments from "@/app/components/Comments";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = params;
  await connectToDatabase();
  const article = await Article.findOne({ slug }).lean();

  if (!article) return { title: "Not Found" };

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      images: article.media || [],
    },
  };
}


export default async function ArticlePage({ params }) {
  const { slug } = params;
  await connectDB();
  const article = await Article.findOne({ slug }).lean();

  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <Comments slug={slug} />
    </div>
  );
}
