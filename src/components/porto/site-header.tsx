"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/porto/theme-toggle";

const NAV = [
  { label: "projects", href: "/projects" },
  { label: "experience", href: "/experience" },
  { label: "writing", href: "/writing" },
  { label: "music", href: "/music" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <Link
        href="/"
        className="font-serif text-2xl leading-none tracking-tight text-foreground transition-colors hover:text-cobalt"
      >
        julian salvador
      </Link>

      <nav className="flex items-center gap-4 text-sm sm:gap-6">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`hidden transition-colors sm:inline ${
                active
                  ? "text-cobalt underline decoration-cobalt/40 underline-offset-[6px]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}

/** Nav row shown under the header on phones, where the inline links hide. */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="-mt-2 mb-2 flex gap-4 overflow-x-auto text-sm sm:hidden">
      {NAV.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "text-cobalt underline decoration-cobalt/40 underline-offset-[6px]"
                : "text-muted-foreground"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
