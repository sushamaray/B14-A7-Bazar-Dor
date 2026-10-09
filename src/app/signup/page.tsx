import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import SignupForm from "./SignupForm";

import { getCategories, getProducts } from "@/lib/api";
import {
  formatPrice,
  getChangeLabel,
} from "@/lib/utils";

import type { Product } from "@/types";

export default async function SignupPage() {
  let products: Product[] = [];
  let categories: Awaited<
    ReturnType<typeof getCategories>
  > = [];

  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch {
    // Signup form should remain accessible if the price API fails.
  }

  return (
    <main className="min-h-screen bg-[#f0f5f1]">
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
                    {product.nameBn}: ৳
                    {formatPrice(product.today)}{" "}
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
      <div className="mx-auto flex min-h-[600px] max-w-6xl flex-col items-center px-4 py-8 sm:py-10">
        <SignupForm />

        <Link
          href="/"
          className="mt-5 text-sm text-[#7a857d] transition hover:text-[#07883f]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-[#dce6de] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-7 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-bold text-green-800">
            🛒 বাজার দর
          </Link>

          <p>প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

          <p>সকল দাম বাংলাদেশি টাকায় প্রকাশিত।</p>
        </div>
      </footer>
    </main>
  );
}