"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/utils";
import toast from "react-hot-toast";

const categories = [
  { name: "সব পণ্য", slug: "/" },
  { name: "চাল", slug: "/category/chal" },
  { name: "সবজি", slug: "/category/sobji" },
  { name: "মাছ", slug: "/category/mach" },
  { name: "মাংস", slug: "/category/mangsho" },
  { name: "মসলা", slug: "/category/moshla" },
  { name: "ডাল ও তেল", slug: "/category/dal-o-tel" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    toast.success("লগআউট সফল হয়েছে");
  };

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link href="/" className="text-xl md:text-2xl font-black text-emerald-700 tracking-tight flex items-center gap-1">
            🛒 বাজার দর
          </Link>
          <p className="text-[11px] text-gray-500 font-medium">{getBanglaDate()}</p>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="text-sm font-semibold text-gray-700 hover:text-emerald-700">
                {session.user?.name || "প্রোফাইল"}
              </Link>
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 text-xs md:text-sm bg-rose-50 text-rose-600 rounded-md font-medium hover:bg-rose-100"
              >
                লগআউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin" className="px-3 py-1.5 text-xs md:text-sm font-medium text-emerald-700 hover:bg-emerald-50 rounded-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="px-3 py-1.5 text-xs md:text-sm font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <nav className="border-t bg-gray-50/70">
        <div className="max-w-6xl mx-auto px-4 flex gap-3 overflow-x-auto py-2 text-sm">
          {categories.map((cat) => {
            const isActive = pathname === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={cat.slug}
                className={`whitespace-nowrap px-3.5 py-1 rounded-full text-xs md:text-sm font-medium transition ${
                  isActive ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
