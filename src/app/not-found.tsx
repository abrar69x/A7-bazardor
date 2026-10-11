import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-black text-emerald-600 mb-4">৪০৪</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
      <p className="text-gray-500 mb-6 text-sm">আপনি যে পেজটিতে যাওয়ার চেষ্টা করছেন তা বর্তমানে বিদ্যমান নেই।</p>
      <Link
        href="/"
        className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
