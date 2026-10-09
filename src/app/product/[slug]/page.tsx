
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

    // Temporary debugging: verify the exact product data received by this page.
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
    { label: "à¦—à¦¤à¦•à¦¾à¦²", price: product.yesterday },
    { label: "à¦—à¦¤ à¦¸à¦ªà§à¦¤à¦¾à¦¹", price: product.lastWeek },
    { label: "à¦—à¦¤ à¦®à¦¾à¦¸", price: product.lastMonth },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:py-12">
      <Link
        href="/"
        className="text-sm font-medium text-green-700 hover:underline"
      >
        â† à¦¹à§‹à¦® à¦ªà§‡à¦œà§‡ à¦«à¦¿à¦°à§‡ à¦¯à¦¾à¦¨
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
            à¦†à¦œà¦•à§‡à¦° à¦¬à¦¾à¦œà¦¾à¦°à¦¦à¦°
          </p>

          <div className="mt-3 flex flex-wrap items-end gap-3">
            <h2 className="text-4xl font-extrabold text-green-800">
              à§³{formatPrice(product.today)}
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
            {getUnitLabel(product.unit)} à¦¹à¦¿à¦¸à¦¾à¦¬à§‡
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-600">
                à¦¸à¦°à§à¦¬à¦¨à¦¿à¦®à§à¦¨ à¦¬à¦¾à¦œà¦¾à¦°à¦¦à¦°
              </p>

              <p className="mt-1 text-xl font-bold">
                à§³
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
                à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à¦¬à¦¾à¦œà¦¾à¦°à¦¦à¦°
              </p>

              <p className="mt-1 text-xl font-bold">
                à§³
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
              <p className="text-sm text-gray-600">à¦—à§œ à¦¬à¦¾à¦œà¦¾à¦°à¦¦à¦°</p>

              <p className="mt-1 text-xl font-bold">
                à§³{formatPrice(averagePrice)}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-sm text-gray-600">à¦—à¦¤à¦•à¦¾à¦²à§‡à¦° à¦¦à¦¾à¦®</p>

              <p className="mt-1 text-xl font-bold">
                à§³{formatPrice(product.yesterday)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Price Comparison */}
      <section className="mt-8 rounded-3xl border border-green-100 bg-white p-5 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold">à¦¦à¦¾à¦®à§‡à¦° à¦¤à§à¦²à¦¨à¦¾</h2>

          <p className="mt-2 text-sm text-gray-500">
            à¦¬à¦¿à¦­à¦¿à¦¨à§à¦¨ à¦¸à¦®à§Ÿà§‡à¦° à¦¬à¦¾à¦œà¦¾à¦°à¦¦à¦°à§‡à¦° à¦¤à§à¦²à¦¨à¦¾
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
                  à§³{formatPrice(item.price)}
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
                    ? "à¦¤à§à¦²à¦¨à¦¾à¦° à¦œà¦¨à§à¦¯ à¦†à¦—à§‡à¦° à¦¦à¦¾à¦®à§‡à¦° à¦¤à¦¥à§à¦¯ à¦¨à§‡à¦‡"
                    : (
                        <>
                          {difference > 0
                            ? "â–² "
                            : difference < 0
                              ? "â–¼ "
                              : "â€” "}
                          {formatPrice(Math.abs(percentage))}%{" "}
                          {difference > 0
                            ? "à¦¬à§ƒà¦¦à§à¦§à¦¿"
                            : difference < 0
                              ? "à¦¹à§à¦°à¦¾à¦¸"
                              : "à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¨ à¦¨à§‡à¦‡"}
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
            <h2 className="text-2xl font-bold">à¦¬à¦¾à¦œà¦¾à¦°à¦­à¦¿à¦¤à§à¦¤à¦¿à¦• à¦¦à¦¾à¦®</h2>

            <p className="mt-2 text-sm text-gray-500">
              à¦¬à¦¿à¦­à¦¿à¦¨à§à¦¨ à¦¬à¦¾à¦œà¦¾à¦°à§‡à¦° à¦¸à¦°à§à¦¬à¦¨à¦¿à¦®à§à¦¨ à¦“ à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à¦¦à¦¾à¦®
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-800">
            {product.markets.length}à¦Ÿà¦¿ à¦¬à¦¾à¦œà¦¾à¦°
          </span>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>à¦¬à¦¾à¦œà¦¾à¦°à§‡à¦° à¦¨à¦¾à¦®</th>
                <th>à¦¬à¦¿à¦­à¦¾à¦—</th>
                <th>à¦¸à¦°à§à¦¬à¦¨à¦¿à¦®à§à¦¨ à¦¦à¦¾à¦®</th>
                <th>à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à¦¦à¦¾à¦®</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market, index) => (
                <tr key={`${market.market}-${index}`}>
                  <td className="font-medium">{market.market}</td>
                  <td>{market.division}</td>

                  <td className="font-semibold text-green-800">
                    à§³{formatPrice(market.min)}
                  </td>

                  <td className="font-semibold text-red-600">
                    à§³{formatPrice(market.max)}
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
          {product.categoryNameBn} à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦—à¦°à¦¿à¦° à¦¸à¦¬ à¦ªà¦£à§à¦¯ à¦¦à§‡à¦–à§à¦¨ â†’
        </Link>
      </div>
    </main>
  );
}
