"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        toast.error(
          result.error.message || "Sign in করা যায়নি।"
        );
        return;
      }

      toast.success("সফলভাবে Sign in হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f1] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-6 shadow-sm sm:p-9">
        <Link
          href="/"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <div className="mt-7 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-green-700 text-3xl text-white">
            🛒
          </div>

          <h1 className="mt-4 text-3xl font-extrabold">
            Sign In
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            তোমার বাজারদর অ্যাকাউন্টে প্রবেশ করো
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="তোমার পাসওয়ার্ড"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-green-700 bg-green-700 text-white hover:bg-green-800"
          >
            {loading ? "Sign in হচ্ছে..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}