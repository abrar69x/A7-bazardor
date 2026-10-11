import { toBanglaNumber } from "@/lib/utils";

export default function PriceTicker({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-amber-100/70 border-b border-amber-200 overflow-hidden py-2 text-xs md:text-sm">
      <div className="flex w-max space-x-8 animate-pulse hover:animate-none">
        {products.slice(0, 15).map((item, idx) => {
          const isUp = item.change?.includes("▲") || (item.priceChange && item.priceChange > 0);
          return (
            <span key={idx} className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-gray-800">
              <span>{item.emoji || "🧺"}</span>
              <span>{item.name}</span>
              <span className="font-semibold text-emerald-800">{toBanglaNumber(item.price)} ৳/{item.unit || "কেজি"}</span>
              <span className={isUp ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"}>
                {item.change || "—০.০%"}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
