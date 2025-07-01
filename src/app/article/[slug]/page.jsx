import { connectToDatabase } from "@/app/lib/mongoDB";
import Article from "@/app/models/article.schema";
import { notFound } from "next/navigation";
import Comments from "@/app/components/comments";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectToDatabase();
  const article = await Article.findOne({ slug }).lean();

  if (!article) return {};

  return {
    title: article.meta?.title || article.title,
    description: article.meta?.description || "",
    openGraph: {
      title: article.meta?.title || article.title,
      description: article.meta?.description || "",
      url: `https://your-domain.com/article/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = params;
  await connectToDatabase();
  const article = await Article.findOne({ slug }).lean();

  if (!article) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#0f2d5b] text-white">
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#0ef] mb-8">
          {article.title}
        </h1>

        <article
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-16 border-t border-gray-700 pt-10">
          <h2 className="text-2xl font-semibold text-[#0ef] mb-4">
            💬 Comments
          </h2>
          <Comments slug={slug} />
        </div>
      </div>
    </div>
  );
}
