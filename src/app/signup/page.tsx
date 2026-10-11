"use client";

import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    } else {
      toast.success("অ্যাকাউন্ট তৈরি সম্পন্ন হয়েছে! লগইন করুন");
      router.push("/signin");
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    await signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 mb-6 text-center">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">পূর্ণ নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-emerald-600"
              placeholder="আপনার নাম"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">ইমেইল এড্রেস</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-emerald-600"
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-emerald-600"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t flex flex-col gap-2">
          <button
            onClick={() => handleSocialLogin("google")}
            type="button"
            className="w-full py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            Google দিয়ে সাইন আপ
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            type="button"
            className="w-full py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            GitHub দিয়ে সাইন আপ
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-emerald-600 font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
