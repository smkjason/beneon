import Link from "next/link";

import type { AuthUser } from "@/lib/supabase/auth";

type AuthNavProps = {
  user: AuthUser | null;
};

export function AuthNav({ user }: AuthNavProps) {
  if (user) {
    return (
      <div className="flex items-center gap-3">
        {user.email ? (
          <span className="hidden max-w-[12rem] truncate text-sm text-zinc-500 sm:inline dark:text-zinc-400">
            {user.email}
          </span>
        ) : null}
        <Link
          href="/auth/signout"
          className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-zinc-700 uppercase transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Sign out
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-md bg-blue-800 px-3 py-1.5 text-xs font-medium tracking-wide text-white uppercase transition hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600"
    >
      Sign in
    </Link>
  );
}
