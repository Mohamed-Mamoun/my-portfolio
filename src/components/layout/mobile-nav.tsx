"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { primaryNav, footerNav } from "@/lib/navigation";
import { site, socials } from "#content";
import { cn } from "@/lib/utils";

/**
 * Radix Dialog, not a hand-rolled overlay.
 *
 * The previous mobile menu was a fixed full-screen div with no
 * role="dialog", no aria-modal, no focus trap, no scroll lock, and no
 * focus restore — background content stayed in the tab order behind it.
 * Radix gives all of that correctly, for free.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  /**
   * Close on navigation via delegation rather than an effect keyed on
   * the pathname — the click is the actual signal, so there's no
   * cascading render and no dependency on route timing.
   */
  const closeOnLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className={cn(
          "grid size-11 place-items-center rounded-md text-secondary md:hidden",
          "transition-colors duration-150 hover:bg-surface-subtle hover:text-primary",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-90 bg-backdrop backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 right-0 z-100 flex w-full max-w-sm flex-col",
            "border-l border-subtle bg-surface-base shadow-xl",
            "focus:outline-none",
          )}
        >
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Site navigation and contact links
          </Dialog.Description>

          <div className="flex h-16 items-center justify-between px-5">
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-md bg-primary text-body-sm font-semibold text-inverse">
              {site.shortName}
            </span>
            <Dialog.Close
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-md text-secondary transition-colors hover:bg-surface-subtle hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </Dialog.Close>
          </div>

          {/* Delegation only — every click target is itself a real link. */}
          <nav
            aria-label="Mobile"
            onClick={closeOnLinkClick}
            className="flex-1 overflow-y-auto px-5 pb-8"
          >
            <ul className="flex flex-col gap-1 border-b border-subtle pb-6">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-12 items-center rounded-md px-3 text-heading-sm text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="mt-2 flex h-12 items-center justify-center rounded-md bg-accent px-3 text-body-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Let&rsquo;s talk
                </Link>
              </li>
            </ul>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-6">
              {footerNav.map((group) => (
                <div key={group.heading}>
                  <h2 className="mb-2 text-label uppercase text-tertiary">{group.heading}</h2>
                  <ul className="flex flex-col gap-0.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex h-9 items-center rounded-md text-body-sm text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-subtle pt-6">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex h-9 items-center rounded-md text-body-sm text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
