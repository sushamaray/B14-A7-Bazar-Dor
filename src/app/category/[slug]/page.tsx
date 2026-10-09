
import Link from "next/link";
import { getCategories, getProductsByCategory } from "@/lib/api";
import CategoryProducts from "./CategoryProducts";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  try {
    const [categories, products] = await Promise.all([
      getCategories(),
      getProductsByCategory(slug),
    ]);

    const category = categories.find((item) => item.slug === slug);

    if (!category || products.length === 0) {
      return (
        <main className="mx-auto min-h-screen max-w-6xl px-4 py-16">
          <div className="rounded-2xl border border-green-100 bg-white p-10 text-center">
            <p className="text-5xl">🔎</p>
            <h1 className="mt-4 text-2xl font-bold">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h1>
            <p className="mt-2 text-gray-500">
              অন্য ক্যাটাগরি নির্বাচন করে আবার চেষ্টা করো।
            </p>
            <Link
              href="/"
              className="btn mt-6 bg-green-700 text-white hover:bg-green-800"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </main>
      );
    }

    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
        <Link href="/" className="text-sm text-green-700 hover:underline">
          ← হোম পেজ
        </Link>

        <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <p className="text-sm text-green-700">পণ্য ক্যাটাগরি</p>
              <h1 className="text-3xl font-bold">{category.nameBn}</h1>
              <p className="mt-1 text-sm text-gray-500">
                মোট {products.length}টি পণ্য
              </p>
            </div>
          </div>
        </section>

        <CategoryProducts products={products} />
      </main>
    );
  } catch {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">তথ্য লোড করা যায়নি</h1>
        <p className="mt-2 text-gray-500">
          ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করো।
        </p>
        <Link href="/" className="btn mt-5">
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }
}
