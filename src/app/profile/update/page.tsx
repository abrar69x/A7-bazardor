"use client";

import { useState } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({ name });
      toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে");
      router.push("/profile");
    } catch {
      toast.error("আপডেট করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 mb-6">নাম আপডেট করুন</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">নতুন নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-emerald-600"
              placeholder="আপনার নতুন নাম দিন"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            {loading ? "আপডেট হচ্ছে..." : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
}
