import { connectToDatabase } from "@/app/lib/mongoDB";
import Article from "@/app/models/article.schema";
import { notFound } from "next/navigation";
import Comments from "@/app/components/comments";

export async function generateMetadata({ params }) {
  const { slug } = params;
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
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="prose prose-lg mb-6" dangerouslySetInnerHTML={{ __html: article.content }} />
      
      {article.media?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Media</h3>
          <ul className="list-disc pl-5 space-y-2">
            {article.media.map((url, i) => (
              <li key={i}>
                <a href={url} className="text-blue-600 underline" target="_blank">{url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Comments slug={slug} />
    </main>
  );
}