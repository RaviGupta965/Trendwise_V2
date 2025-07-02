import Link from "next/link";
import RefreshFeedButton from "./components/RefreshFeed_button";
import { getAllArticles } from "@/app/lib/action";
import ArticleList from "@/app/components/ArticleList";
export default async function Home() {
  const articles = await getAllArticles();

  return (
    <main className="px-4 py-20 mx-auto min-h-screen bg-[#0a192f]">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#0ef] tracking-tight">
        🔥 Trending Articles
      </h1>
      <div className="flex justify-center">
        <RefreshFeedButton />
      </div>
      <ArticleList articles={articles} />
    </main>
  );
}
