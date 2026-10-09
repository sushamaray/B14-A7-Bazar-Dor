
import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import { formatPrice, getChangeLabel, getUnitLabel } from "@/lib/utils";
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
      className="group block rounded-2xl border border-[#dce6de] bg-white p-4 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-2xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-bold group-hover:text-green-700">
            {product.nameBn}
          </h3>
          <p className="text-sm text-gray-500">
            {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold text-green-800">
            ৳{formatPrice(product.today)}
          </p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}>
          {getChangeLabel(product.change.pct)}
        </span>
      </div>

      <p className="mt-3 text-xs text-gray-500">
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

  const banglaDate = "বাংলাদেশের দৈনিক বাজারদর";

  return (
    <main className="min-h-screen">
      <header className="border-b border-[#dce6de] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={48}
              height={48}
              priority
              className="size-12 rounded-xl object-contain"
            />
            <span>
              <span className="block text-xl font-extrabold">
                বাজার দর
              </span>
              <span className="block text-xs text-gray-500">
                {banglaDate}
              </span>
            </span>
          </Link>

          <div className="text-right">
            <p className="text-sm font-semibold text-green-800">
              বাংলাদেশের বাজারদর
            </p>
            <p className="text-xs text-gray-500">
              প্রয়োজনীয় পণ্যের দাম এক নজরে
            </p>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-20 border-b border-[#dce6de] bg-white">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          <Link
            href="/"
            className="shrink-0 rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white"
          >
            🏠 হোম
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="shrink-0 rounded-full px-4 py-2 text-sm transition hover:bg-green-50 hover:text-green-800"
            >
              {category.icon} {category.nameBn}
            </Link>
          ))}
        </div>
      </nav>

      {!errorMessage && products.length > 0 && (
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
                    {product.nameBn}: ৳{formatPrice(product.today)}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-8">
        <section className="relative isolate overflow-hidden rounded-3xl border border-green-100 bg-white">
          <div className="grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                🌿 প্রতিদিনের বাজারদর
              </span>
              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                আজকের বাজারের দাম
                <span className="block text-green-700">এক নজরে জানুন</span>
              </h1>
              <p className="mt-4 max-w-xl leading-7 text-gray-600">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
                বাজারদর দেখুন। বিভিন্ন বাজারের দাম তুলনা করুন
                এবং জেনে নিন কোন পণ্যের দাম বাড়ছে বা কমছে।
              </p>
              <Link
                href="#all-products"
                className="mt-6 inline-flex rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800"
              >
                সব পণ্য দেখুন <span className="ml-2">↓</span>
              </Link>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
                width={600}
                height={450}
                priority
                className="h-auto w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        </section>

        {errorMessage ? (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            <p className="font-semibold">{errorMessage}</p>
            <p className="mt-2 text-sm">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <>
            <section className="mt-10" aria-labelledby="rising-title">
              <div className="mb-5">
                <h2 id="rising-title" className="text-2xl font-extrabold">
                  <span className="text-red-600">▲</span> আজ দাম বেড়েছে
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  যেসব পণ্যের দামে ঊর্ধ্বমুখী পরিবর্তন হয়েছে
                </p>
              </div>
              {risingProducts.length ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {risingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-white p-5 text-gray-500">
                  এই মুহূর্তে দাম বৃদ্ধির তথ্য পাওয়া যায়নি।
                </p>
              )}
            </section>

            <section className="mt-10" aria-labelledby="falling-title">
              <div className="mb-5">
                <h2 id="falling-title" className="text-2xl font-extrabold">
                  <span className="text-green-700">▼</span> আজ দাম কমেছে
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  যেসব পণ্যের দামে নিম্নমুখী পরিবর্তন হয়েছে
                </p>
              </div>
              {fallingProducts.length ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {fallingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-white p-5 text-gray-500">
                  এই মুহূর্তে দাম কমার তথ্য পাওয়া যায়নি।
                </p>
              )}
            </section>

            <section id="all-products" className="mt-12 scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold">সব পণ্য</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    সব ক্যাটাগরির বাজারদর এক জায়গায়
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-800">
                  মোট {formatPrice(products.length)}টি পণ্য
                </span>
              </div>

              {categories.map((category) => {
                const categoryProducts = products.filter(
                  (product) => product.category === category.id,
                );

                if (categoryProducts.length === 0) return null;

                return (
                  <section
                    key={category.id}
                    id={`category-${category.id}`}
                    className="mt-8 scroll-mt-28"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-xl font-bold">
                        {category.icon} {category.nameBn}
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          ({formatPrice(categoryProducts.length)}টি)
                        </span>
                      </h3>
                      <Link
                        href={`/category/${category.slug}`}
                        className="shrink-0 text-sm font-semibold text-green-700 hover:underline"
                      >
                        সব দেখুন →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </section>
          </>
        )}
      </div>

      <footer className="mt-12 border-t border-[#dce6de] bg-white">
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
