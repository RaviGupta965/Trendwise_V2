"use client";

import { useState } from "react";
import Link from "next/link";

export default function ArticleList({ articles }) {
  const [query, setQuery] = useState("");

  const filteredArticles = articles.filter((article) =>
    (article.title + article.description)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full mb-6 p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-[#0ef]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {filteredArticles.map((article) => (
          <li
            key={article._id}
            className="rounded-xl hover:translate-y-[-5px] border border-gray-800 bg-black/30 p-6 hover:shadow-lg hover:border-[#0ef] transition duration-300"
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
            <Link href={`/article/${article.slug}`} className="underline">
              Read more
            </Link>
          </li>
        ))}
      </ul>

      {filteredArticles.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No articles found.</p>
      )}
    </>
  );
}
