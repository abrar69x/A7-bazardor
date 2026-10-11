"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { parseBanglaOrEnglishNumber } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<"default" | "lowToHigh" | "highToLow">("default");

  useEffect(() => {
    async function fetchCategoryData() {
      setLoading(true);
      try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`);
        const data = await res.json();
        setProducts(data.data || data || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchCategoryData();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "default") return 0;
    const priceA = parseBanglaOrEnglishNumber(a.price);
    const priceB = parseBanglaOrEnglishNumber(b.price);
    return sortOption === "lowToHigh" ? priceA - priceB : priceB - priceA;
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো তালিকাভুক্ত পণ্য নেই।</p>
        <Link href="/" className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-black text-gray-900 capitalize flex items-center gap-2">
          📁 ক্যাটাগরি: {slug}
        </h1>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">সাজান:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="border rounded-lg px-3 py-1.5 text-sm bg-white text-gray-800 outline-none focus:border-emerald-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="lowToHigh">দাম: কম থেকে বেশি</option>
            <option value="highToLow">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product, idx) => (
          <ProductCard key={product.id || product.slug || idx} product={product} />
        ))}
      </div>
    </div>
  );
}
