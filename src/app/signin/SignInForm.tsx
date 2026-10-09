"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

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
        toast.error(result.error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign in failed:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(
    provider: "google" | "github",
  ) {
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message || "সাইন ইন করা যায়নি।",
        );
        setSocialLoading(null);
      }
    } catch (error) {
      console.error(`${provider} sign in failed:`, error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  }

  const disabled = loading || socialLoading !== null;

  return (
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
          disabled={disabled}
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
          disabled={disabled}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-[#dce6de] bg-white px-2 py-2.5 text-xs font-semibold text-[#202b23] transition hover:bg-green-50 disabled:opacity-60"
        >
          {socialLoading === "google" ? (
            "সংযোগ হচ্ছে..."
          ) : (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                className="size-4 shrink-0"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.01 46.98 31.8 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>
              Google দিয়ে চালিয়ে যান
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
          disabled={disabled}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-[#dce6de] bg-white px-2 py-2.5 text-xs font-semibold text-[#202b23] transition hover:bg-green-50 disabled:opacity-60"
        >
          {socialLoading === "github" ? (
            "সংযোগ হচ্ছে..."
          ) : (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4 shrink-0 fill-current"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.4-1.22.72-1.5-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.21 1.16-2.99-.12-.29-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.1-1.43 3.05-1.14 3.05-1.14.61 1.54.23 2.67.11 2.96.72.78 1.16 1.77 1.16 2.99 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06v3.12c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </>
          )}
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
  );
}