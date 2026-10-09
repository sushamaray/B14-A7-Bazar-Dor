import Link from "next/link";
import Navbar from "@/components/Navbar";
import SignInForm from "./SignInForm";
import { getCategories, getProducts } from "@/lib/api";
import { formatPrice, getChangeLabel } from "@/lib/utils";
import type { Category, Product } from "@/types";

export default async function SignInPage() {
  let categories: Category[] = [];
  let products: Product[] = [];

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
  } catch (error) {
    console.error("Sign in page data fetch failed:", error);
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <Navbar categories={categories} />

      {products.length > 0 && (
        <div className="overflow-hidden border-b border-[#e6ece7] bg-white">
          <div className="animate-marquee flex w-max whitespace-nowrap py-2">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {products.map((product) => (
                  <Link
                    key={`${copy}-${product.id}`}
                    href={`/product/${product.slug}`}
                    className="mx-5 text-sm text-gray-700"
                  >
                    {product.image} {product.nameBn}{" "}
                    {formatPrice(product.today)} টাকা/{product.unit}{" "}
                    <span
                      className={
                        product.change.dir === "up"
                          ? "font-semibold text-red-600"
                          : product.change.dir === "down"
                            ? "font-semibold text-green-700"
                            : "text-gray-500"
                      }
                    >
                      {product.change.dir === "up"
                        ? "▲"
                        : product.change.dir === "down"
                          ? "▼"
                          : "—"}{" "}
                      {getChangeLabel(product.change.pct)}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col items-center px-4 py-8 sm:py-10">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-extrabold text-[#202b23]">
            সাইন ইন
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <section className="mt-6 w-full max-w-md rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-5 sm:p-6">
          <SignInForm />
        </section>

        <Link
          href="/"
          className="mt-5 text-sm text-[#7a857d] transition hover:text-[#07883f]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>

      <footer className="border-t border-[#dce6de] bg-[#fbfdfb]">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-5 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <Link href="/" className="font-semibold text-[#202b23]">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </Link>

          <p>
            সকল দাম সময়ান্তর; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </footer>
    </main>
  );
}