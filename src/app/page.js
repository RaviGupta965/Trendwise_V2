import Link from "next/link";
import { getAllArticles } from "@/app/lib/action";

export default async function Home() {
  const articles = await getAllArticles();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔥 Trending Articles</h1>
      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article.id} className="border p-4 rounded-md hover:shadow">
            <h2 className="text-xl font-semibold">
              <Link href={`/article/${article.slug}`}>{article.title}</Link>
            </h2>
            <p className="text-sm text-gray-600 mt-1">{article.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

