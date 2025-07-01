import Link from "next/link";
import { getAllArticles } from "@/app/lib/action";

export default async function Home() {
  await getAllArticles();
  const articles = await getAllArticles();

  return (
    <main className="px-4 py-20 mx-auto bg-[#0a192f]">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#0ef] tracking-tight">
        🔥 Trending Articles
      </h1>

      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {articles.map((article) => (
          <li
            key={article._id}
            className="rounded-xl hover:translate-y-[-5px] transition border border-gray-800 bg-black/30 p-6 hover:shadow-lg hover:border-[#0ef] transition duration-300"
          >
            <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
              <Link
                href={`/article/${article.slug}`}
                className="hover:text-[#0ef] transition"
              >
                {article.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-400 line-clamp-3">
              {article.meta?.description || article.description}
            </p>
            <Link
                href={`/article/${article.slug}`}
                className="underline"
              >
                Read more
              </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
