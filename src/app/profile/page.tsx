"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  if (isPending || !session) return <div className="p-12 text-center text-gray-500">লোড হচ্ছে...</div>;

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 mb-6">আমার প্রোফাইল</h1>
        <div className="space-y-4 mb-6">
          <div>
            <span className="text-xs text-gray-400 block">নাম</span>
            <span className="font-semibold text-gray-800">{session.user?.name || "নাম পাওয়া যায়নি"}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block">ইমেইল</span>
            <span className="font-semibold text-gray-800">{session.user?.email}</span>
          </div>
        </div>
        <Link
          href="/profile/update"
          className="inline-block w-full text-center py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          তথ্য পরিবর্তন করুন
        </Link>
      </div>
    </div>
  );
}
