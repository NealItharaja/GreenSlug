'use client';

import Link from "next/link";

export default function NavBarFacts() {
  return (
    <nav className="flex items-center justify-between bg-emerald-900 px-6 py-3">
      <div className="text-white font-bold text-lg">
        GreenSlug
      </div>

      <Link
        href="/graphs"
        className="text-emerald-100 font-medium px-4 py-2 rounded-md hover:bg-emerald-700"
      >
        Graphs / Info
      </Link>

      <div className="space-x-4">
        <Link href="/login" className="text-white">
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-emerald-600 text-white px-4 py-2 rounded-md"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
