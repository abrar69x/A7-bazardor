"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toBanglaNumber } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("বিস্তারিত দেখতে অনুগ্রহ করে লগইন করুন");
      router.push("/signin");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${slug}`);
        const data = await res.json();
        setProduct(data.data || data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchDetail();
  }, [slug]);

  if (isPending || loading) {
    return <div className="p-12 text-center text-gray-500">তথ্য লোড হচ্ছে...</div>;
  }

  if (!product) {
    return <div className="p-12 text-center text-gray-500">পণ্য পাওয়া যায়নি।</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
          <div className="text-6xl p-6 bg-emerald-50 rounded-2xl">{product.emoji || "🥬"}</div>
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">
              {product.category || "সবজি"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{product.description || "নিত্যদিনের বাজার তালিকা অনুযায়ী হালনাগাদকৃত দর।"}</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">একক: {product.unit || "প্রতি কেজি"}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-8 text-center">
          <div className="p-4 bg-gray-50 border rounded-xl">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{toBanglaNumber(product.minPrice || product.price || 0)} ৳</p>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <p className="text-xs text-emerald-700 font-medium">গড় দাম</p>
            <p className="text-xl font-black text-emerald-800 mt-1">{toBanglaNumber(product.price || 0)} ৳</p>
          </div>
          <div className="p-4 bg-gray-50 border rounded-xl">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{toBanglaNumber(product.maxPrice || product.price || 0)} ৳</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
          <div className="divide-y border rounded-xl overflow-hidden">
            {[
              { bazar: "কাওরান বাজার", price: product.price || 120 },
              { bazar: "মিরপুর ১ নম্বর কাঁচাবাজার", price: (product.price || 120) + 5 },
              { bazar: "যাত্রাবাড়ী আড়ত", price: (product.price || 120) - 5 },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 flex justify-between items-center bg-white hover:bg-gray-50">
                <span className="font-medium text-gray-700">{item.bazar}</span>
                <span className="font-bold text-gray-900">{toBanglaNumber(item.price)} টাকা/{product.unit || "কেজি"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
