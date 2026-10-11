"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: string | number;
  name: string;
  category: string;
  price: number;
  change: number;
  unit: string;
  emoji: string;
  slug: string;
};

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

const demoProducts: Product[] = [
  { id: 1, name: "মিনিকেট চাল", category: "চাল", price: 78, change: 2.1, unit: "কেজি", emoji: "🍚", slug: "miniket-chal" },
  { id: 2, name: "আলু", category: "সবজি", price: 35, change: -2.9, unit: "কেজি", emoji: "🥔", slug: "alu" },
  { id: 3, name: "পেঁয়াজ", category: "সবজি", price: 65, change: 3.5, unit: "কেজি", emoji: "🧅", slug: "peyaj" },
  { id: 4, name: "সয়াবিন তেল", category: "তেল", price: 175, change: -1.2, unit: "লিটার", emoji: "🫙", slug: "soyabin-tel" },
  { id: 5, name: "মসুর ডাল", category: "ডাল", price: 115, change: 1.8, unit: "কেজি", emoji: "🫘", slug: "mosur-dal" },
  { id: 6, name: "ডিম", category: "প্রোটিন", price: 48, change: -0.5, unit: "হালি", emoji: "🥚", slug: "dim" },
  { id: 7, name: "রসুন", category: "মসলা", price: 160, change: 4.2, unit: "কেজি", emoji: "🧄", slug: "roshun" },
  { id: 8, name: "কাঁচা মরিচ", category: "সবজি", price: 90, change: -3.1, unit: "কেজি", emoji: "🌶️", slug: "kancha-morich" },
  { id: 9, name: "আদা", category: "মসলা", price: 140, change: 1.4, unit: "কেজি", emoji: "🫚", slug: "ada" },
  { id: 10, name: "ব্রয়লার মুরগি", category: "মাছ-মাংস", price: 190, change: 2.7, unit: "কেজি", emoji: "🍗", slug: "broiler-murgi" },
  { id: 11, name: "সাদা চাল", category: "চাল", price: 65, change: -1.5, unit: "কেজি", emoji: "🍚", slug: "shada-chal" },
  { id: 12, name: "ইলিশ মাছ", category: "মাছ-মাংস", price: 850, change: 0, unit: "কেজি", emoji: "🐟", slug: "ilish-mach" },
];

const categories = [
  { name: "সব পণ্য", icon: "🛍️", value: "সব" },
  { name: "চাল ও ডাল", icon: "🌾", value: "চাল" },
  { name: "সবজি", icon: "🥬", value: "সবজি" },
  { name: "তেল ও মসলা", icon: "🫙", value: "তেল" },
  { name: "মাছ-মাংস", icon: "🐟", value: "মাছ-মাংস" },
];

const banglaNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);

// API থেকে আসা ডেটা সুরক্ষিতভাবে পার্স করার ফাংশন
function normalizeProducts(payload: any): Product[] {
  let list: any[] = [];
  if (Array.isArray(payload)) {
    list = payload;
  } else if (payload && Array.isArray(payload.data)) {
    list = payload.data;
  } else if (payload && Array.isArray(payload.products)) {
    list = payload.products;
  }

  return list.map((item: any, index: number) => {
    const name = item.nameBn ?? item.name ?? "পণ্য";
    const category = item.categoryNameBn ?? item.category ?? "অন্যান্য";
    const price = Number(item.today) || Number(item.price) || 0;
    const change = Number(item.change?.pct) || Number(item.change) || 0;
    const unitNames: Record<string, string> = {
      kg: "কেজি",
      liter: "লিটার",
      piece: "টি",
      dozen: "ডজন",
      hali: "হালি",
    };
    const unit = unitNames[item.unit] ?? item.unit ?? "কেজি";

    return {
      id: item.id ?? item._id ?? index + 1,
      name,
      category,
      price,
      change,
      unit,
      emoji: item.image ?? item.categoryIcon ?? "🛒",
      slug: String(item.slug ?? item.id ?? index + 1),
    };
  });
}

function formatDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function ProductCard({ product }: { product: Product }) {
  const up = product.change > 0;
  const down = product.change < 0;

  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug)}`}
      className="group rounded-2xl border border-stone-200/80 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 sm:p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f7ec] text-3xl transition group-hover:scale-105">
          {product.emoji}
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            up
              ? "bg-rose-50 text-rose-600"
              : down
                ? "bg-emerald-50 text-emerald-700"
                : "bg-stone-100 text-stone-500"
          }`}
        >
          {up ? "▲" : down ? "▼" : "—"}{" "}
          {banglaNumber(Math.abs(product.change))}%
        </span>
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium text-stone-400">
          {product.category}
        </p>
        <h3 className="mt-1 text-lg font-bold text-stone-800">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-stone-500">
          প্রতি {product.unit}
        </p>
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-dashed border-stone-200 pt-4">
        <div>
          <p className="text-xs text-stone-500">আজকের দাম</p>
          <p className="mt-1 text-xl font-extrabold text-[#174c35]">
            {banglaNumber(product.price)}
            <span className="ml-1 text-xs font-medium">টাকা</span>
          </p>
        </div>
        <span className="text-stone-400 transition group-hover:translate-x-1 group-hover:text-emerald-700">
          →
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [activeCategory, setActiveCategory] = useState("সব");
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("API request failed");
        const payload = await response.json();
        const data = normalizeProducts(payload);

        if (active && data.length > 0) {
          setProducts(data);
          setApiConnected(true);
        }
      } catch {
        if (active) setApiConnected(false);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const filteredProducts =
    activeCategory === "সব"
      ? products
      : products.filter((p) =>
          p.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

  const risers = [...products]
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  const tickerProducts = [...products]
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-stone-800">
      <div className="border-b border-emerald-100 bg-[#173f2d] px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        🥬 নিত্যপণ্যের বাজারদর জানুন, সচেতনভাবে কেনাকাটা করুন
      </div>

      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#fbfaf6]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#174c35] text-2xl shadow-lg shadow-emerald-950/10">
              🛒
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight text-[#174c35] sm:text-2xl">
                বাজার দর
              </span>
              <span className="block text-[10px] text-stone-500 sm:text-xs">
                {formatDate()}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium text-stone-600 md:flex">
            <a href="#price-up" className="transition hover:text-emerald-700">
              দাম বেড়েছে
            </a>
            <a href="#price-down" className="transition hover:text-emerald-700">
              দাম কমেছে
            </a>
            <a href="#সব-পণ্য" className="transition hover:text-emerald-700">
              সব পণ্য
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/signin"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-[#174c35] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#103b29] sm:px-4"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <div className="border-t border-stone-100">
          <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setActiveCategory(category.value);
                  document
                    .getElementById("সব-পণ্য")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category.value
                    ? "bg-[#174c35] text-white shadow-sm"
                    : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-emerald-50"
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Ticker Section */}
      <div className="overflow-hidden border-b border-emerald-100 bg-white">
        <div className="ticker-track flex w-max items-center gap-8 py-3">
          {[...tickerProducts, ...tickerProducts].map((p, i) => (
            <span key={`${p.id}-${i}`} className="flex items-center gap-2 text-sm">
              <span>{p.emoji}</span>
              <span className="font-semibold text-stone-700">{p.name}</span>
              <span className="font-bold text-[#174c35]">
                {banglaNumber(p.price)} টাকা/{p.unit}
              </span>
              <span
                className={
                  p.change > 0
                    ? "font-semibold text-rose-600"
                    : p.change < 0
                      ? "font-semibold text-emerald-700"
                      : "text-stone-400"
                }
              >
                {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"}
                {banglaNumber(Math.abs(p.change))}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            আপনার প্রতিদিনের বাজার সহায়ক
          </span>

          <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.2] tracking-tight text-[#173f2d] sm:text-5xl lg:text-6xl">
            বাজারের সঠিক
            <br />
            <span className="text-[#78a64a]">দাম জানুন</span>
            <br />
            নিশ্চিন্তে কিনুন।
          </h1>

          <p className="mt-5 max-w-lg text-base leading-8 text-stone-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের দাম এক জায়গায়।
            বাজারে যাওয়ার আগে জেনে নিন আজকের দর।
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#সব-পণ্য"
              className="rounded-xl bg-[#174c35] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-[#103b29] sm:text-base"
            >
              সব পণ্যের দাম দেখুন ↗
            </a>
            <span className="text-xs text-stone-500">
              {banglaNumber(products.length)}টি পণ্য তালিকায়
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 border-t border-stone-200 pt-5">
            <div>
              <p className="text-2xl font-black text-[#174c35]">
                {banglaNumber(products.length)}
              </p>
              <p className="mt-1 text-xs text-stone-500">তালিকাভুক্ত পণ্য</p>
            </div>
            <div className="h-10 w-px bg-stone-200" />
            <div>
              <p className="text-2xl font-black text-[#174c35]">
                {banglaNumber(risers.length)}
              </p>
              <p className="mt-1 text-xs text-stone-500">দাম বেড়েছে</p>
            </div>
            <div className="h-10 w-px bg-stone-200" />
            <div>
              <p className="text-2xl font-black text-[#174c35]">
                {banglaNumber(fallers.length)}
              </p>
              <p className="mt-1 text-xs text-stone-500">দাম কমেছে</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-3 rounded-[2rem] bg-[#dce9c9] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-[#eaf0dc] p-5 shadow-xl shadow-emerald-950/10 sm:p-7">
            <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-white/60" />
            <div className="relative flex items-center justify-between">
              <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-[#174c35]">
                🥬 বাজারের ঝুড়ি
              </span>
              <span className="text-xs text-stone-500">প্রতিদিনের প্রয়োজন</span>
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-3">
              {[
                { emoji: "🍚", name: "চাল", note: "প্রতিদিনের খাবার" },
                { emoji: "🥬", name: "তাজা সবজি", note: "সুস্থ জীবনের জন্য" },
                { emoji: "🥚", name: "ডিম", note: "প্রোটিনের উৎস" },
                { emoji: "🐟", name: "মাছ", note: "পুষ্টিকর খাবার" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-white/80 bg-white/80 p-4 backdrop-blur-sm"
                >
                  <span className="flex h-14 items-center justify-center text-4xl">
                    {item.emoji}
                  </span>
                  <p className="mt-2 text-center font-bold text-[#174c35]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-center text-xs text-stone-500">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative mt-4 flex items-center gap-3 rounded-2xl bg-[#174c35] p-4 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl">
                📊
              </span>
              <div>
                <p className="font-bold">দাম তুলনা করুন</p>
                <p className="mt-1 text-xs text-emerald-100">
                  কেনাকাটার আগে বাজারদর জেনে নিন
                </p>
              </div>
              <span className="ml-auto text-xl">↗</span>
            </div>
          </div>
        </div>
      </section>

      {/* Price Up Section */}
      <section id="price-up" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-rose-600">
              PRICE INCREASE
            </p>
            <h2 className="mt-2 text-2xl font-black text-stone-800 sm:text-3xl">
              আজ দাম বেড়েছে <span className="text-rose-500">↗</span>
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              যেসব পণ্যের দামে ঊর্ধ্বগতি দেখা যাচ্ছে
            </p>
          </div>
          <span className="hidden rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 sm:inline-block">
            {banglaNumber(risers.length)}টি পণ্য
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-stone-200/70" />
            ))}
          </div>
        ) : risers.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white p-6 text-sm text-stone-500">
            এই মুহূর্তে দাম বৃদ্ধির তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* Price Down Section */}
      <section id="price-down" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            PRICE DECREASE
          </p>
          <h2 className="mt-2 text-2xl font-black text-stone-800 sm:text-3xl">
            আজ দাম কমেছে <span className="text-emerald-600">↘</span>
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            দামের পরিবর্তন দেখে বেছে নিন আপনার প্রয়োজনীয় পণ্য
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-stone-200/70" />
            ))}
          </div>
        ) : fallers.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white p-6 text-sm text-stone-500">
            এই মুহূর্তে দাম কমার তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* All Products Section */}
      <section id="সব-পণ্য" className="mt-8 bg-[#f1f3e9] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                DAILY MARKET LIST
              </p>
              <h2 className="mt-2 text-3xl font-black text-[#173f2d] sm:text-4xl">
                সব পণ্য
              </h2>
              <p className="mt-2 text-sm text-stone-600 sm:text-base">
                আপনার নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখে নিন।
              </p>
            </div>
            <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-600 shadow-sm">
              মোট {banglaNumber(filteredProducts.length)}টি পণ্য
            </span>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category.value
                    ? "bg-[#174c35] text-white"
                    : "border border-stone-200 bg-white text-stone-600 hover:border-emerald-300"
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          <div className="mt-5">
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-64 animate-pulse rounded-2xl bg-white/80" />
                ))}
              </div>
            ) : filteredProducts.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-10 text-center">
                <p className="text-4xl">🔎</p>
                <h3 className="mt-3 font-bold">কোনো পণ্য পাওয়া যায়নি</h3>
                <button
                  onClick={() => setActiveCategory("সব")}
                  className="mt-4 rounded-xl bg-[#174c35] px-5 py-3 text-sm font-bold text-white"
                >
                  সব পণ্য দেখুন
                </button>
              </div>
            )}
          </div>

          {!apiConnected && !loading && (
            <p className="mt-5 text-xs leading-6 text-stone-500">
              প্রদর্শিত কিছু দাম নমুনা তথ্য। API থেকে প্রকৃত তথ্য পাওয়া গেলে তা স্বয়ংক্রিয়ভাবে দেখানো হবে।
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#173f2d] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <Link href="/" className="text-2xl font-black">
              🛒 বাজার দর
            </Link>
            <p className="mt-2 text-sm text-emerald-100">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>
          <p className="max-w-md text-xs leading-6 text-emerald-100 sm:text-right sm:text-sm">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-emerald-100">
          © {new Date().getFullYear()} বাজার দর · সর্বস্বত্ব সংরক্ষিত
        </div>
      </footer>
    </main>
  );
}