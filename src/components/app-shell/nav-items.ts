export type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", shortLabel: "Home" },
  { href: "/quiet-time", label: "Quiet time", shortLabel: "Quiet" },
  { href: "/prayer", label: "Prayer", shortLabel: "Prayer" },
  { href: "/community", label: "Community", shortLabel: "People" },
  { href: "/character", label: "Character", shortLabel: "Growth" },
];
