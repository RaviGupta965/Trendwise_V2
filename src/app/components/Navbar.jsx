"use client";

import { useSession } from "next-auth/react";
import AuthButton from "./Login";
import RefreshFeedButton from "./RefreshFeed_button";

export default function Navbar() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === "sg.shivam75@gmail.com"; // Replace with your email

  return (
    <nav className="px-6 py-4 flex justify-between items-center bg-gradient-to-r from-black via-gray-900 to-black shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-3xl">🔥</span>
        <h1 className="text-2xl font-semibold text-[#0ef] tracking-wide">
          TrendWise
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <AuthButton />
      </div>
    </nav>
  );
}
