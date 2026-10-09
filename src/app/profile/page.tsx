"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user.name) {
      setName(session.user.name);
    }
  }, [session?.user.name]);

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      toast.error("নাম অন্তত ২ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "Profile update করা যায়নি।");
        return;
      }

      toast.success("Profile সফলভাবে update হয়েছে!");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f1] px-4">
        <span className="loading loading-spinner loading-lg text-green-700" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f1] px-4">
        <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold">Sign In প্রয়োজন</h1>
          <p className="mt-3 text-sm text-gray-600">
            Profile দেখতে প্রথমে তোমার account-এ Sign In করো।
          </p>
          <Link
            href="/signin"
            className="btn mt-6 border-green-700 bg-green-700 text-white hover:bg-green-800"
          >
            Sign In
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f1] px-4 py-10">
      <section className="mx-auto w-full max-w-2xl rounded-3xl border border-green-100 bg-white p-6 shadow-sm sm:p-10">
        <Link
          href="/"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <div className="mt-7 flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-3xl font-bold text-white">
            {(session.user.name || session.user.email || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold">My Profile</h1>
            <p className="mt-1 truncate text-sm text-gray-500">
              Account information ও profile settings
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-green-50 p-5">
          <p className="text-sm text-gray-500">Email address</p>
          <p className="mt-1 break-all font-semibold text-gray-900">
            {session.user.email}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Email পরিবর্তনের সুবিধা এই form-এ নেই।
          </p>
        </div>

        <form onSubmit={handleUpdate} className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold"
            >
              তোমার নাম
            </label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input input-bordered w-full bg-white"
              placeholder="তোমার নাম লিখো"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-green-700 bg-green-700 text-white hover:bg-green-800"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </section>
    </main>
  );
}