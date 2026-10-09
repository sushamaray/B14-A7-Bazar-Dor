
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import {
  formatPrice,
  getChangeLabel,
  getUnitLabel,
} from "@/lib/utils";

type Props = {
  products: Product[];
};

export default function CategoryProducts({ products }: Props) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section className="mt-8">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold">এই ক্যাটাগরির সব পণ্য</h2>

        <label className="flex items-center gap-3 text-sm">
          <span className="whitespace-nowrap">সাজান:</span>

          <select
            className="select select-bordered w-full max-w-xs bg-white"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group rounded-2xl border border-green-100 bg-white p-5 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
          >
            <div className="flex h-24 items-center justify-center rounded-xl bg-green-50 text-5xl">
              {product.image}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold group-hover:text-green-700">
                {product.nameBn}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {getUnitLabel(product.unit)}
              </p>

              <div className="mt-4 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-500">আজকের দাম</p>
                  <p className="text-xl font-bold text-green-800">
                    ৳{formatPrice(product.today)}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
