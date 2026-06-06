import { Instrument_Serif } from "next/font/google";
import Link from "next/link";

import { getAuthUser } from "@/lib/supabase/auth";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export default async function Home() {
  const user = await getAuthUser();

  return (
    <div
      className={`${instrumentSerif.variable} flex min-h-full flex-col bg-[#f5f7fa] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50`}
    >
      <header className="border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-zinc-900 dark:text-zinc-50"
            style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
          >
            beneon
            <span className="text-blue-700 dark:text-blue-400">.</span>
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              {user.email ? (
                <span className="hidden text-sm text-zinc-500 sm:inline dark:text-zinc-400">
                  {user.email}
                </span>
              ) : null}
              <Link
                href="/auth/signout"
                className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-xs font-medium tracking-wide text-zinc-700 uppercase transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Sign out
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-blue-800 px-4 py-2 text-xs font-medium tracking-wide text-white uppercase transition hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Sign in
            </Link>
          )}
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <p className="mb-6 text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
            Scripture · prayer · community
          </p>
          <h1
            className="mb-6 text-4xl leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem] dark:text-zinc-50"
            style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
          >
            Build a daily rhythm in{" "}
            <em className="text-blue-800 italic dark:text-blue-400">
              God&apos;s Word
            </em>
            .
          </h1>
          <p
            className="mb-3 text-2xl leading-snug text-zinc-700 sm:text-3xl dark:text-zinc-300"
            style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
          >
            Quietly. Together. Every day.
          </p>
          <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
            A conversational guide for Bible reading, prayer, and community —
            designed to help you return to Scripture with intention.
          </p>
          {!user ? (
            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Get started
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20"
          />
          <div className="relative flex aspect-[4/5] w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-zinc-300/80 bg-white/40 text-sm tracking-wide text-zinc-400 uppercase backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-500">
            empty
          </div>
        </div>
      </main>
    </div>
  );
}
