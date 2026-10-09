
import { getCategories, getProducts } from "@/lib/api";
import { formatPrice, getChangeLabel, getUnitLabel } from "@/lib/utils";
import type { Product } from "@/types";

function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  const badgeClass = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-700"
      : "bg-gray-100 text-gray-600";

  return (
    <article className="rounded-2xl border border-[#dce6de] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-2xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-bold">
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
          <p className="text-xl font-bold">
            {formatPrice(product.today)}{" "}
            <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {isFlat ? "— ০.০%" : getChangeLabel(product.change.pct)}
        </span>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        গতকাল: {formatPrice(product.yesterday)} টাকা
      </p>
    </article>
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

  const risingProducts = products.filter(
    (product) => product.change.dir === "up",
  );

  const fallingProducts = products.filter(
    (product) => product.change.dir === "down",
  );

  return (
    <main className="min-h-screen">
      <header className="border-b border-[#dce6de] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <a href="/" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-[#07883f] text-2xl text-white">
              🛒
            </span>
            <span>
              <span className="block text-xl font-extrabold">
                বাজার দর
              </span>
              <span className="text-xs text-gray-500">
                প্রয়োজনীয় পণ্যের দাম এক নজরে
              </span>
            </span>
          </a>

          <span className="hidden text-sm text-gray-500 sm:block">
            বাংলাদেশের বাজারদর
          </span>
        </div>
      </header>

      <nav className="border-b border-[#dce6de] bg-white">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#category-${category.id}`}
              className="shrink-0 rounded-full px-4 py-2 text-sm hover:bg-green-50"
            >
              {category.icon} {category.nameBn}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <section className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#dce6de] bg-white p-6 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              আজকের বাজারদর
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
              দাম দেখুন। বিভিন্ন পণ্যের দাম বৃদ্ধি ও হ্রাস
              সহজেই তুলনা করুন।
            </p>

            <a
              href="#all-products"
              className="mt-6 inline-flex rounded-lg bg-[#07883f] px-6 py-3 font-semibold text-white shadow hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="self-center text-8xl sm:text-9xl" role="img" aria-label="বাজারের ঝুড়ি">
            🧺
          </div>
        </section>

        {errorMessage ? (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            <p className="font-semibold">{errorMessage}</p>
            <p className="mt-2 text-sm">
              API connection এবং terminal log পরীক্ষা করুন।
            </p>
          </div>
        ) : (
          <>
            <section className="mt-10" aria-labelledby="rising-title">
              <h2 id="rising-title" className="mb-4 text-xl font-bold">
                <span className="text-red-600">▲</span> আজ দাম বেড়েছে
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {risingProducts.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section className="mt-10" aria-labelledby="falling-title">
              <h2 id="falling-title" className="mb-4 text-xl font-bold">
                <span className="text-green-700">▼</span> আজ দাম কমেছে
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fallingProducts.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section id="all-products" className="mt-10">
              <h2 className="text-xl font-bold">সব পণ্য</h2>
              <p className="mt-1 text-sm text-gray-500">
                মোট {formatPrice(products.length)}টি পণ্যের তথ্য
              </p>

              {categories.map((category) => {
                const categoryProducts = products.filter(
                  (product) => product.category === category.id,
                );

                if (categoryProducts.length === 0) return null;

                return (
                  <section
                    key={category.id}
                    id={`category-${category.id}`}
                    className="mt-7 scroll-mt-5"
                  >
                    <h3 className="mb-4 text-lg font-bold">
                      {category.icon} {category.nameBn}
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({formatPrice(categoryProducts.length)}টি)
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <footer className="mt-12 border-t border-[#dce6de] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-gray-600 sm:flex-row sm:justify-between">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম বাংলাদেশি টাকায় প্রকাশিত।</p>
        </div>
      </footer>
    </main>
  );
}
