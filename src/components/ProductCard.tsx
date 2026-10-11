import Link from "next/link";
import { toBanglaNumber } from "@/lib/utils";

export default function ProductCard({ product }: { product: any }) {
  const isUp = product.change?.includes("▲") || (product.priceChange && product.priceChange > 0);
  const isDown = product.change?.includes("▼") || (product.priceChange && product.priceChange < 0);

  return (
    <Link
      href={`/product/${product.id || product.slug || 1}`}
      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
    >
      <div>
        <div className="text-4xl mb-3 text-center bg-gray-50 rounded-xl py-4 group-hover:scale-105 transition-transform">
          {product.emoji || "🥬"}
        </div>
        <h3 className="font-bold text-gray-900 text-base md:text-lg line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1">{product.unit || "প্রতি কেজি"}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block">আজকের দাম</span>
          <span className="text-base md:text-lg font-black text-gray-800">{toBanglaNumber(product.price)} টাকা</span>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
            isUp
              ? "bg-rose-100 text-rose-700"
              : isDown
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {product.change || "—০.০%"}
        </span>
      </div>
    </Link>
  );
}
