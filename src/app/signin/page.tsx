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
    const [googleLoading, setGoogleLoading] = useState(false);

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

    async function handleGoogleSignIn() {
        setGoogleLoading(true);

        try {
            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (result.error) {
                toast.error(
                    result.error.message || "Google Sign In করা যায়নি।"
                );
                setGoogleLoading(false);
            }
        } catch {
            toast.error("Google Sign In করতে সমস্যা হয়েছে। আবার চেষ্টা করো।");
            setGoogleLoading(false);
        }
    }

    async function handleGitHubSignIn() {
        try {
            const result = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });

            if (result.error) {
                toast.error(
                    result.error.message || "GitHub Sign In করা যায়নি।"
                );
            }
        } catch {
            toast.error("GitHub Sign In করতে সমস্যা হয়েছে।");
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

                    <h1 className="mt-4 text-3xl font-extrabold">Sign In</h1>

                    <p className="mt-2 text-sm text-gray-500">
                        তোমার বাজারদর অ্যাকাউন্টে প্রবেশ করো
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading || googleLoading}
                    className="btn mt-8 w-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                >
                    {googleLoading ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 48 48"
                            className="size-5"
                        >
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.01 46.98 31.8 46.98 24.55Z" />
                            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48Z" />
                        </svg>
                    )}
                    {googleLoading ? "Google-এ সংযোগ হচ্ছে..." : "Continue with Google"}
                </button>

                <button
                    type="button"
                    onClick={handleGitHubSignIn}
                    className="btn mt-3 w-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                >
                    Continue with GitHub
                </button>

                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-500">অথবা ইমেইল দিয়ে</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        disabled={loading || googleLoading}
                        className="btn h-10 min-h-10 whitespace-nowrap rounded-lg border border-[#dce6de] bg-transparent px-2 text-xs font-semibold text-[#202b23] hover:bg-[#f0f5f1] sm:text-sm"
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