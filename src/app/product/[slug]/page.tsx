import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import {
  formatPrice,
  getChangeLabel,
  getUnitLabel,
} from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;

  let product;

  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    notFound();
  }

  const averagePrice =
    product.markets.length > 0
      ? product.markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / product.markets.length
      : product.today;

  const historicalPrices = [
    { label: "গতকাল", price: product.yesterday },
    { label: "গত সপ্তাহ", price: product.lastWeek },
    { label: "গত মাস", price: product.lastMonth },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:py-12">
      <Link
        href="/"
        className="text-sm font-medium text-green-700 hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-72 items-center justify-center rounded-3xl border border-green-100 bg-white p-8">
          <div className="text-center">
            <span className="text-8xl">{product.image}</span>

            <p className="mt-5 text-sm text-gray-500">
              {product.categoryIcon} {product.categoryNameBn}
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-gray-500">
              {getUnitLabel(product.unit)}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-green-100 bg-white p-6 sm:p-8">
          <p className="text-sm font-medium text-green-700">
            আজকের বাজারদর
          </p>

          <div className="mt-3 flex flex-wrap items-end gap-3">
            <h2 className="text-4xl font-extrabold text-green-800">
              ৳{formatPrice(product.today)}
            </h2>

            <span
              className={`mb-1 rounded-full px-3 py-1 text-sm font-semibold ${
                product.change.dir === "up"
                  ? "bg-red-50 text-red-600"
                  : product.change.dir === "down"
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {getChangeLabel(product.change.pct)}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {getUnitLabel(product.unit)} হিসাবে
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-600">
                সর্বনিম্ন বাজারদর
              </p>

              <p className="mt-1 text-xl font-bold">
                ৳
                {formatPrice(
                  product.markets.length
                    ? Math.min(
                        ...product.markets.map((market) => market.min),
                      )
                    : product.today,
                )}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-600">
                সর্বোচ্চ বাজারদর
              </p>

              <p className="mt-1 text-xl font-bold">
                ৳
                {formatPrice(
                  product.markets.length
                    ? Math.max(
                        ...product.markets.map((market) => market.max),
                      )
                    : product.today,
                )}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-gray-600">
                গড় বাজারদর
              </p>

              <p className="mt-1 text-xl font-bold">
                ৳{formatPrice(averagePrice)}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-sm text-gray-600">
                গতকালের দাম
              </p>

              <p className="mt-1 text-xl font-bold">
                ৳{formatPrice(product.yesterday)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Price Comparison */}
      <section className="mt-8 rounded-3xl border border-green-100 bg-white p-5 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold">দামের তুলনা</h2>

          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন সময়ের বাজারদরের তুলনা
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {historicalPrices.map((item) => {
            const difference = product.today - item.price;

            const percentage =
              item.price > 0
                ? (difference / item.price) * 100
                : null;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-100 p-5"
              >
                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="mt-2 text-2xl font-bold">
                  ৳{formatPrice(item.price)}
                </p>

                <p
                  className={`mt-2 text-sm font-medium ${
                    difference > 0
                      ? "text-red-600"
                      : difference < 0
                        ? "text-green-700"
                        : "text-gray-500"
                  }`}
                >
                  {percentage === null
                    ? "তুলনার জন্য আগের দামের তথ্য নেই"
                    : (
                        <>
                          {difference > 0
                            ? "▲ "
                            : difference < 0
                              ? "▼ "
                              : "— "}
                          {formatPrice(Math.abs(percentage))}%{" "}
                          {difference > 0
                            ? "বৃদ্ধি"
                            : difference < 0
                              ? "হ্রাস"
                              : "পরিবর্তন নেই"}
                        </>
                      )}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Market-specific prices */}
      <section className="mt-8 rounded-3xl border border-green-100 bg-white p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">বাজারভিত্তিক দাম</h2>

            <p className="mt-2 text-sm text-gray-500">
              বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-800">
            {formatPrice(product.markets.length)}টি বাজার
          </span>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>বাজারের নাম</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন দাম</th>
                <th>সর্বোচ্চ দাম</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market, index) => (
                <tr key={`${market.market}-${index}`}>
                  <td className="font-medium">{market.market}</td>
                  <td>{market.division}</td>

                  <td className="font-semibold text-green-800">
                    ৳{formatPrice(market.min)}
                  </td>

                  <td className="font-semibold text-red-600">
                    ৳{formatPrice(market.max)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 text-center">
        <Link
          href={`/category/${product.category}`}
          className="btn border-green-700 bg-green-700 text-white hover:bg-green-800"
        >
          {product.categoryNameBn} ক্যাটাগরির সব পণ্য দেখুন →
        </Link>
      </div>
    </main>
  );
}