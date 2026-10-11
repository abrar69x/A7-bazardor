"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] p-4 sm:p-8">
      <div className="max-w-xl mx-auto bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-sm font-bold text-emerald-800 hover:underline">← হোমপেজে যান</Link>
          <button onClick={handleLogout} className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg">লগআউট</button>
        </div>
        <div className="mt-6 text-center">
          <div className="w-20 h-20 bg-[#174c35] text-white text-3xl font-bold flex items-center justify-center rounded-full mx-auto">
            {user?.name ? user.name[0] : "ব"}
          </div>
          <h2 className="text-2xl font-black text-stone-800 mt-4">{user?.name || "অতিথি ব্যবহারকারী"}</h2>
          <p className="text-sm text-stone-500 mt-1">{user?.email || "user@example.com"}</p>
        </div>
        <div className="mt-8 border-t border-stone-100 pt-6">
          <h3 className="font-bold text-stone-800 mb-3">আপনার তথ্য</h3>
          <div className="space-y-2 text-sm text-stone-600 bg-stone-50 p-4 rounded-2xl">
            <p><strong>স্ট্যাটাস:</strong> সক্রিয় সদস্য</p>
            <p><strong>নোটিফিকেশন:</strong> বাজারদর অ্যালার্ট চালু</p>
          </div>
        </div>
      </div>
    </div>
  );
}