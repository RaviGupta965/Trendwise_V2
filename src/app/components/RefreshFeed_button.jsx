"use client";
import { useState } from "react";

export default function RefreshFeedButton() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/article", { method: "POST" });
      if (res.ok) {
        setDone(true);
      }
    } catch (e) {
      console.error("Refresh failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
          onClick={handleRefresh}
          disabled={loading || done}
          className="px-4 py-2 my-5 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {loading ? "Refreshing..." : done ? "Done ✔" : "Refresh Feed"}
        </button>
    </>
  );
}
