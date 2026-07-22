"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "#content";
import { primaryNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/features/theme-toggle";
import { CommandMenuTrigger } from "@/components/features/command-menu-trigger";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-subtle bg-surface-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-default items-center gap-4 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="rounded-md text-body-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span className="sr-only">{site.name} — home</span>
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-md bg-primary text-inverse">
            {site.shortName}
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-2 hidden md:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-9 items-center rounded-md px-3 text-body-sm transition-colors duration-150",
                      "hover:bg-surface-subtle hover:text-primary",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      active ? "text-primary" : "text-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <CommandMenuTrigger />
          <ThemeToggle />
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            Let&rsquo;s talk
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
