import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";

import { getCategories, getProducts } from "@/lib/api";
import {
  formatPrice,
  getChangeLabel,
  getUnitLabel,
} from "@/lib/utils";

import type { Product } from "@/types";

function ProductCard({ product }: { product: Product }) {
  const badgeClass =
    product.change.dir === "up"
      ? "bg-red-50 text-red-600"
      : product.change.dir === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-xl border border-[#e1e9e2] bg-white p-3 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-sm"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f5f1] text-xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#202b23] group-hover:text-green-700">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-0.5 text-lg font-extrabold leading-tight text-[#202b23]">
            ৳{formatPrice(product.today)}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${badgeClass}`}
        >
          {getChangeLabel(product.change.pct)}
        </span>
      </div>

      <p className="mt-2 text-[11px] text-gray-500">
        গতকাল: ৳{formatPrice(product.yesterday)}
      </p>
    </Link>
  );
}

export default async function HomePage() {
  let products: Product[] = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let errorMessage = "";

  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch {
    errorMessage =
      "দুঃখিত, এই মুহূর্তে বাজারদরের তথ্য লোড করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।";
  }

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <Navbar categories={categories} />

      {/* Price ticker */}
      {!errorMessage && products.length > 0 && (
        <div className="overflow-hidden border-b border-[#e3ebe4] bg-[#f8faf8] py-2">
          <div className="animate-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {products.map((product) => (
                  <Link
                    key={`${copy}-${product.id}`}
                    href={`/product/${product.slug}`}
                    className="mx-4 flex items-center gap-1.5 border-r border-[#e4eae5] pr-4 text-xs text-gray-700 transition hover:text-green-800 sm:text-sm"
                  >
                    <span>{product.image}</span>
                    <span>{product.nameBn}</span>
                    <span>৳{formatPrice(product.today)}</span>

                    {product.change.dir === "up" ? (
                      <span className="font-semibold text-red-600">
                        ▲ {getChangeLabel(product.change.pct)}
                      </span>
                    ) : product.change.dir === "down" ? (
                      <span className="font-semibold text-green-700">
                        ▼ {getChangeLabel(product.change.pct)}
                      </span>
                    ) : (
                      <span className="text-gray-500">•</span>
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:py-6">
        {/* Hero */}
        <section className="overflow-hidden rounded-2xl border border-[#e1eae2] bg-[#fbfdfb]">
          <div className="grid items-center gap-3 px-5 py-5 sm:grid-cols-[1.45fr_0.75fr] sm:gap-5 sm:px-7 sm:py-6">
            <div className="min-w-0">
              <span className="inline-flex rounded-full bg-[#e0f2e6] px-3 py-1 text-xs font-semibold text-green-800">
                🌿 প্রতিদিনের বাজারদর
              </span>

              <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#202b23] sm:whitespace-nowrap sm:text-3xl lg:text-[34px]">
                আজকের বাজারের দাম এক নজরে
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারদর দেখুন।
                বিভিন্ন বাজারের দাম তুলনা করুন এবং জেনে নিন কোন পণ্যের দাম
                বাড়ছে বা কমছে।
              </p>

              <Link
                href="#all-products"
                className="mt-4 inline-flex items-center rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
              >
                সব পণ্য দেখুন
                <span className="ml-2" aria-hidden="true">
                  ↓
                </span>
              </Link>
            </div>

            <div className="relative mx-auto w-full max-w-[230px] sm:max-w-[250px]">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
                width={600}
                height={450}
                priority
                sizes="(max-width: 640px) 180px, 250px"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* API error */}
        {errorMessage ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            <p className="font-semibold">{errorMessage}</p>
            <p className="mt-2 text-sm">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <>
            {/* Rising prices */}
            <section className="mt-7" aria-labelledby="rising-title">
              <div className="mb-3">
                <h2
                  id="rising-title"
                  className="text-lg font-extrabold text-[#202b23] sm:text-xl"
                >
                  <span className="text-red-600">▲</span> আজ দাম বেড়েছে
                </h2>
              </div>

              {risingProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {risingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-white p-4 text-sm text-gray-500">
                  এই মুহূর্তে দাম বৃদ্ধির তথ্য পাওয়া যায়নি।
                </p>
              )}
            </section>

            {/* Falling prices */}
            <section className="mt-7" aria-labelledby="falling-title">
              <div className="mb-3">
                <h2
                  id="falling-title"
                  className="text-lg font-extrabold text-[#202b23] sm:text-xl"
                >
                  <span className="text-green-700">▼</span> আজ দাম কমেছে
                </h2>
              </div>

              {fallingProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {fallingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-white p-4 text-sm text-gray-500">
                  এই মুহূর্তে দাম কমার তথ্য পাওয়া যায়নি।
                </p>
              )}
            </section>

            {/* All products */}
            <section
              id="all-products"
              className="mt-8 scroll-mt-28"
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-[#202b23] sm:text-2xl">
                    সব পণ্য
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    সব ক্যাটাগরির বাজারদর এক জায়গায়
                  </p>
                </div>

                <span className="rounded-full bg-[#e0f2e6] px-3 py-1.5 text-xs font-semibold text-green-800 sm:text-sm">
                  মোট {formatPrice(products.length)}টি পণ্য
                </span>
              </div>

              {categories.map((category) => {
                const categoryProducts = products.filter(
                  (product) => product.category === category.id,
                );

                if (categoryProducts.length === 0) {
                  return null;
                }

                return (
                  <section
                    key={category.id}
                    id={`category-${category.id}`}
                    className="mt-6 scroll-mt-28"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-base font-bold text-[#202b23] sm:text-lg">
                        {category.icon} {category.nameBn}
                        <span className="ml-1.5 text-xs font-normal text-gray-500 sm:text-sm">
                          ({formatPrice(categoryProducts.length)}টি)
                        </span>
                      </h3>

                      <Link
                        href={`/category/${category.slug}`}
                        className="shrink-0 text-xs font-semibold text-green-700 hover:underline sm:text-sm"
                      >
                        সব দেখুন →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </section>
          </>
        )}
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