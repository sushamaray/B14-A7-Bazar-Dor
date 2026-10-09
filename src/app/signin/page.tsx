"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import { getCategories, getProducts } from "@/lib/api";
import { formatPrice, getChangeLabel } from "@/lib/utils";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "Sign in করা যায়নি।");
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

  async function handleSocialSignIn(provider: "google" | "github") {
    const setSocialLoading =
      provider === "google" ? setGoogleLoading : setGithubLoading;

    setSocialLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            `${provider === "google" ? "Google" : "GitHub"} Sign In করা যায়নি।`,
        );
        setSocialLoading(false);
      }
    } catch {
      toast.error("Sign In করতে সমস্যা হয়েছে। আবার চেষ্টা করো।");
      setSocialLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f0f5f1]">
      <Navbar categories={[]} />

      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-extrabold text-[#202b23]">
            সাইন ইন
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <section className="mx-auto mt-6 w-full max-w-md rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-[#202b23]"
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
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#dce6de] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-[#202b23]"
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
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full rounded-lg border border-[#dce6de] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading || githubLoading}
              className="w-full rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading || googleLoading || githubLoading}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[#dce6de] bg-white px-2 py-2.5 text-xs font-semibold text-[#202b23] transition hover:bg-green-50 disabled:opacity-60"
            >
              <span aria-hidden="true" className="font-bold text-base">
                G
              </span>
              {googleLoading ? "সংযোগ হচ্ছে..." : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading || googleLoading || githubLoading}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-[#dce6de] bg-white px-2 py-2.5 text-xs font-semibold text-[#202b23] transition hover:bg-green-50 disabled:opacity-60"
            >
              <span aria-hidden="true">◉</span>
              {githubLoading ? "সংযোগ হচ্ছে..." : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>
      </div>

      <footer className="mt-16 border-t border-[#dce6de] bg-[#fbfdfb]">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-5 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <Link href="/" className="font-semibold text-[#202b23]">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </Link>
          <p>সকল দাম সময়ান্তর; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </main>
  );
}