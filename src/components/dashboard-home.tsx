import Link from "next/link";

import type { AuthUser } from "@/lib/supabase/auth";

type DashboardHomeProps = {
  user: AuthUser;
};

export function DashboardHome({ user }: DashboardHomeProps) {
  const greeting = user.email ? user.email.split("@")[0] : "friend";

  return (
    <div className="flex flex-1 flex-col">
      <p className="mb-2 text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
        Welcome back
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        Good to see you, {greeting}.
      </h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
        Your daily rhythm in Scripture, prayer, and community starts here.
        Pick up where you left off or begin quiet time.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Today&apos;s habits
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Reading, prayer, and community streaks will appear here once you
            begin your rhythm.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {["Quiet time", "Prayer", "Community"].map((label) => (
              <div
                key={label}
                className="rounded-lg border border-dashed border-zinc-200 px-2 py-4 dark:border-zinc-700"
              >
                <p className="text-lg font-semibold text-zinc-300 dark:text-zinc-600">
                  —
                </p>
                <p className="mt-1 text-[10px] font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Start here
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Quiet time is where Scripture and reflection come together — one
            focused flow, not a separate reader.
          </p>
          <Link
            href="/quiet-time"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Begin quiet time
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
