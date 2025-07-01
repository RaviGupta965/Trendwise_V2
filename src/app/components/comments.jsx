'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Comments({ slug }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`/api/comment?slug=${slug}`)
      .then(res => res.json())
      .then(setComments);
  }, [slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ content: input, articleSlug: slug }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      setComments([data.comment, ...comments]);
      setInput("");
    }
  }

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-2">Comments</h3>

      {session ? (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border px-3 py-1 flex-1 rounded"
            placeholder="Add your comment"
            required
          />
          <button className="bg-blue-500 text-white px-4 rounded">Post</button>
        </form>
      ) : (
        <p className="text-gray-600">Please log in to comment.</p>
      )}

      <ul className="space-y-2">
        {comments.map((c, i) => (
          <li key={i} className="border p-3 rounded">
            <p className="text-sm text-gray-700 mb-1">{c.content}</p>
            <span className="text-xs text-gray-500">
              {c.userName} • {new Date(c.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}