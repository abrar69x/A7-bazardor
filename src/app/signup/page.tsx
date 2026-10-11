"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("সবগুলো ঘর পূরণ করুন");
      return;
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ name: formData.name, email: formData.email })
    );
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/5">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#174c35] text-2xl"
          >
            🛒
          </Link>
          <h2 className="mt-4 text-2xl font-black text-stone-800">
            অ্যাকাউন্ট তৈরি করুন
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            বাজার দরে যুক্ত হয়ে নিত্যদিনের আপডেট রাখুন
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider">
              আপনার নাম
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-emerald-500 focus:outline-none"
              placeholder="যেমন: হাসানুল আবরার"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider">
              ইমেইল
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-emerald-500 focus:outline-none"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-emerald-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-[#174c35] p-3 text-sm font-bold text-white transition hover:bg-[#103b29]"
          >
            সাইন আপ সম্পন্ন করুন
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-stone-500">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-bold text-emerald-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}