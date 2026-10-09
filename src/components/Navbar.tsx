"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";


type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export default function Navbar({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
  setSigningOut(true);

  try {
    const result = await authClient.signOut();

    if (result.error) {
      toast.error(
        result.error.message || "Sign out করা যায়নি।"
      );
      return;
    }

    toast.success("সফলভাবে Sign out হয়েছে!");
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  } catch (error) {
    console.error("Sign out failed:", error);
    toast.error("Sign out করতে সমস্যা হয়েছে।");
  } finally {
    setSigningOut(false);
  }
}

  return (
    <>
      <header className="border-b border-[#dce6de] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={48}
              height={48}
              priority
              className="size-12 rounded-xl object-contain"
            />

            <span>
              <span className="block text-xl font-extrabold">
                বাজার দর
              </span>
              <span className="block text-xs text-gray-500">
                বাংলাদেশের দৈনিক বাজারদর
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-green-800">
                বাংলাদেশের বাজারদর
              </p>
              <p className="text-xs text-gray-500">
                প্রয়োজনীয় পণ্যের দাম এক নজরে
              </p>
            </div>

            {!isPending && !session && (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-green-800 transition hover:bg-green-50"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-green-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {isPending && (
              <div className="skeleton h-10 w-24 rounded-xl" />
            )}

            {!isPending && session && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-expanded={menuOpen}
                  aria-label="User menu"
                  className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2 transition hover:bg-green-100"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-green-700 font-bold text-white">
                    {(session.user.name || session.user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>

                  <span className="hidden max-w-32 truncate text-sm font-semibold sm:block">
                    {session.user.name || session.user.email}
                  </span>

                  <span aria-hidden="true">⌄</span>
                </button>

                {menuOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="Close user menu"
                      className="fixed inset-0 z-30 cursor-default"
                      onClick={() => setMenuOpen(false)}
                    />

                    <div className="absolute right-0 z-40 mt-2 w-64 rounded-2xl border border-[#dce6de] bg-white p-2 shadow-xl">
                      <div className="border-b border-gray-100 px-3 py-3">
                        <p className="truncate font-semibold text-gray-900">
                          {session.user.name || "User"}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {session.user.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className={`mt-2 block rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-green-50 ${
                          pathname === "/profile"
                            ? "bg-green-50 text-green-800"
                            : "text-gray-700"
                        }`}
                      >
                        👤 My Profile
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                      >
                        {signingOut ? "Signing out..." : "↪ Sign Out"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-20 border-b border-[#dce6de] bg-white">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          <Link
            href="/"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              pathname === "/"
                ? "bg-green-700 text-white"
                : "hover:bg-green-50 hover:text-green-800"
            }`}
          >
            🏠 হোম
          </Link>

          {categories.map((category) => {
            const active = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-green-700 font-semibold text-white"
                    : "hover:bg-green-50 hover:text-green-800"
                }`}
              >
                {category.icon} {category.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}