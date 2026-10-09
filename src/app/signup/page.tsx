
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim().length < 2) {
      toast.error("নাম অন্তত ২ অক্ষরের হতে হবে।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "Account তৈরি করা যায়নি।");
        return;
      }

      toast.success("Account তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
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
          <h1 className="mt-4 text-3xl font-extrabold">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="mt-2 text-sm text-gray-500">
            বাজারদর সহজে দেখতে যোগ দিন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
              আপনার নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার পুরো নাম"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
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
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="অন্তত ৮ অক্ষর"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-semibold"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-green-700 bg-green-700 text-white hover:bg-green-800"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
}
