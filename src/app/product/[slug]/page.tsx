import Link from "next/link";

export default async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product = null;

  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", { cache: "no-store" });
    const json = await res.json();
    const list = Array.isArray(json) ? json : json.data || [];
    product = list.find((p: any) => String(p.slug) === slug || String(p.id) === slug);
  } catch (err) {
    console.error(err);
  }

  const name = product?.nameBn ?? "পণ্যের বিবরণ";
  const price = product?.today ?? 100;
  const category = product?.categoryNameBn ?? "সাধারণ";
  const unit = product?.unit ?? "কেজি";
  const change = product?.change?.pct ?? 0;

  return (
    <div className="min-h-screen bg-[#fbfaf6] p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-lg">
        <Link href="/" className="text-sm font-bold text-emerald-800 hover:underline">← মূল পাতায় ফিরে যান</Link>
        <div className="mt-6 flex items-center gap-4">
          <div className="h-20 w-20 flex items-center justify-center bg-[#f3f7ec] rounded-2xl text-4xl">{product?.image ?? "🛒"}</div>
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 rounded-full text-stone-600">{category}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-800 mt-1">{name}</h1>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-b border-stone-100 py-6">
          <div className="p-4 bg-stone-50 rounded-2xl">
            <p className="text-xs text-stone-500">বর্তমান দর</p>
            <p className="text-2xl font-black text-[#174c35] mt-1">{price} টাকা / {unit}</p>
          </div>
          <div className="p-4 bg-stone-50 rounded-2xl">
            <p className="text-xs text-stone-500">পরিবর্তন</p>
            <p className={`text-2xl font-black mt-1 ${change >= 0 ? "text-rose-600" : "text-emerald-700"}`}>
              {change >= 0 ? "▲ +" : "▼ "}{change}%
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-stone-800">বাজার বিবরণ</h3>
          <p className="text-stone-600 text-sm mt-2 leading-relaxed">
            এটি স্থানীয় বাজারের আজকের হালনাগাদ দর। পাইকারি ও খুচরা বাজার ভেদে দাম কিছুটা পরিবর্তিত হতে পারে।
          </p>
        </div>
      </div>
    </div>
  );
}