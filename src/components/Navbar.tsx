"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<{ name?: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#fbfaf6]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#174c35] text-2xl text-white shadow-lg shadow-emerald-950/10">
            🛒
          </span>
          <span className="text-xl font-black tracking-tight text-[#174c35] sm:text-2xl">
            বাজার দর
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-stone-600 md:flex">
          <Link href="/#price-up" className="transition hover:text-emerald-700">
            দাম বেড়েছে
          </Link>
          <Link href="/#price-down" className="transition hover:text-emerald-700">
            দাম কমেছে
          </Link>
          <Link href="/#সব-পণ্য" className="transition hover:text-emerald-700">
            সব পণ্য
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <Link
              href="/profile"
              className="rounded-xl bg-[#174c35] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#103b29]"
            >
              প্রোফাইল
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-[#174c35] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#103b29] sm:px-4"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}