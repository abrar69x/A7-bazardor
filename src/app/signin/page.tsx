"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ name: "ব্যবহারকারী", email }));
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="text-center">
          <Link href="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#174c35] text-2xl">🛒</Link>
          <h2 className="mt-4 text-2xl font-black text-stone-800">সাইন ইন করুন</h2>
          <p className="mt-1 text-sm text-stone-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase">ইমেইল</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-emerald-500 focus:outline-none" placeholder="example@mail.com" />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase">পাসওয়ার্ড</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-emerald-500 focus:outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full mt-2 rounded-xl bg-[#174c35] p-3 text-sm font-bold text-white hover:bg-[#103b29]">সাইন ইন</button>
        </form>
        <p className="mt-6 text-center text-xs text-stone-500">অ্যাকাউন্ট নেই? <Link href="/signup" className="font-bold text-emerald-700 hover:underline">নতুন অ্যাকাউন্ট খুলুন</Link></p>
      </div>
    </div>
  );
}