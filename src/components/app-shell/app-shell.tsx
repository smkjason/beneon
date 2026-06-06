import Link from "next/link";

import { getAuthUser } from "@/lib/supabase/auth";

import { AppNav } from "./app-nav";
import { AuthNav } from "./auth-nav";

type AppShellProps = {
  children: React.ReactNode;
};

export async function AppShell({ children }: AppShellProps) {
  const user = await getAuthUser();

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 md:flex-row dark:bg-zinc-950 dark:text-zinc-50">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-zinc-200 bg-white md:flex dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-5 py-5 dark:border-zinc-800">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            beneon
            <span className="text-blue-700 dark:text-blue-400">.</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col px-3 py-4">
          <AppNav variant="sidebar" />
        </div>
        <div className="border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <AuthNav user={user} />
        </div>
      </aside>

      <div className="flex min-h-full flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-4 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            beneon
            <span className="text-blue-700 dark:text-blue-400">.</span>
          </Link>
          <AuthNav user={user} />
        </header>

        <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6 pb-24 md:px-8 md:py-10 md:pb-10">
          {children}
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-10 border-t border-zinc-200 bg-white/95 backdrop-blur-sm md:hidden dark:border-zinc-800 dark:bg-zinc-900/95"
        aria-label="Mobile navigation"
      >
        <AppNav variant="bottom" />
      </nav>
    </div>
  );
}
