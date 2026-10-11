"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setName(parsed.name || "");
        setEmail(parsed.email || "");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ name, email }));
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-lg">
        <Link href="/profile" className="text-sm font-bold text-emerald-800 hover:underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
        <h2 className="text-2xl font-black text-stone-800 mt-4">প্রোফাইল আপডেট</h2>
        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase">নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase">ইমেইল</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-[#174c35] p-3 text-sm font-bold text-white hover:bg-[#103b29]"
          >
            সংরক্ষণ করুন
          </button>
        </form>
      </div>
    </div>
  );
}