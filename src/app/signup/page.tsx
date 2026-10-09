import Link from "next/link";

import Navbar from "@/components/Navbar";
import SignupForm from "./SignupForm";

import { getCategories, getProducts } from "@/lib/api";
import {
  formatPrice,
  getChangeLabel,
} from "@/lib/utils";

import type { Category, Product } from "@/types";

export default async function SignupPage() {
  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch {
    // Signup form should remain accessible if the price API fails.
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <Navbar categories={categories} />

      {/* Price ticker */}
      {products.length > 0 && (
        <div className="overflow-hidden border-b border-green-100 bg-green-950 py-2.5 text-white">
          <div className="animate-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {products.map((product) => (
                  <Link
                    key={`${copy}-${product.id}`}
                    href={`/product/${product.slug}`}
                    className="mx-5 text-sm"
                  >
                    {product.change.dir === "up" ? (
                      <span className="text-red-300">▲</span>
                    ) : product.change.dir === "down" ? (
                      <span className="text-green-300">▼</span>
                    ) : (
                      <span>•</span>
                    )}{" "}
                    {product.nameBn}: ৳{formatPrice(product.today)}{" "}
                    <span className="text-xs opacity-80">
                      {getChangeLabel(product.change.pct)}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Signup content */}
      <div className="mx-auto flex min-h-[600px] w-full max-w-6xl flex-1 flex-col items-center px-4 py-8 sm:py-10">
        <SignupForm />

        <Link
          href="/"
          className="mt-5 text-sm text-[#7a857d] transition hover:text-[#07883f]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#dce6de] bg-[#fbfdfb]">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-5 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <Link
            href="/"
            className="font-medium text-[#202b23] hover:text-green-700"
          >
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