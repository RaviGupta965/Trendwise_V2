'use client'
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex gap-4 items-center">
        <p className="text-sm">Welcome, {session.user.name}</p>
        <button onClick={() => signOut()} className="px-3 py-1 bg-red-500 text-white rounded">Sign out</button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="rounded-[8px] border-[1px] border-gray-500 hover:bg-[#212b3a] px-3 py-1 bg-[#295e9e] text-white rounded">
      Sign in
    </button>
  );
}