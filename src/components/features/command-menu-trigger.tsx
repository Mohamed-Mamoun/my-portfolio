"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * cmdk + Radix Dialog is ~63 KB, and it sits in the header on every
 * route. So the header ships only this button; the menu itself is
 * fetched on the first signal that someone actually wants it — a
 * click, ⌘K, or "/".
 *
 * The keyboard listener is a few lines and stays eager, so the shortcut
 * works on first press rather than needing a second one.
 */
const CommandMenu = dynamic(
  () => import("@/components/features/command-menu").then((m) => m.CommandMenu),
  { ssr: false },
);

export function CommandMenuTrigger() {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = event.key === "k" && (event.metaKey || event.ctrlKey);
      const isSlash = event.key === "/" && !isEditable(event.target);
      if (!isShortcut && !isSlash) return;

      event.preventDefault();
      setLoaded(true);
      setOpen(true);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  if (loaded) return <CommandMenu open={open} onOpenChange={setOpen} />;

  return (
    <button
      type="button"
      onClick={() => {
        setLoaded(true);
        setOpen(true);
      }}
      // Hover is a strong signal of intent — start fetching the chunk
      // before the click lands.
      onPointerEnter={() => setLoaded(true)}
      aria-label="Search — press Command K"
      className={cn(
        "hidden h-9 items-center gap-2 rounded-md border border-subtle bg-surface-subtle px-3 sm:flex",
        "text-body-sm text-tertiary transition-colors duration-150",
        "hover:border-default hover:text-secondary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span>Search</span>
      <kbd className="ml-2 rounded border border-subtle bg-surface-raised px-1.5 font-mono text-caption text-tertiary">
        ⌘K
      </kbd>
    </button>
  );
}

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}
