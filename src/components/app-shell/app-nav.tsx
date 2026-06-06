"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "./nav-items";

function navLinkClass(isActive: boolean, variant: "sidebar" | "bottom") {
  const base =
    variant === "sidebar"
      ? "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition"
      : "flex flex-1 flex-col items-center gap-1 px-1 py-2 text-[10px] font-medium transition";

  if (isActive) {
    return `${base} bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50`;
  }

  return `${base} text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100`;
}

function isNavActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

type AppNavProps = {
  variant: "sidebar" | "bottom";
};

export function AppNav({ variant }: AppNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={
        variant === "sidebar"
          ? "flex flex-col gap-1"
          : "flex w-full items-stretch justify-around"
      }
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={navLinkClass(active, variant)}
            aria-current={active ? "page" : undefined}
          >
            <span className={variant === "bottom" ? "truncate" : undefined}>
              {variant === "bottom" ? item.shortLabel : item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
