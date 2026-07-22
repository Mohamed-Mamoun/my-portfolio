"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Active-heading tracking.
 *
 * Deliberately not the naive "any intersecting entry wins" observer the
 * previous build used for scroll-spy — with two headings on screen the
 * winner was whichever came last in the callback array, so the
 * indicator flickered. Here we track every heading's position and pick
 * the last one above the reading line, which is deterministic.
 */
export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const items = flatten(toc);
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const visible = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }

        // Last heading that has scrolled past the reading line wins.
        const headings = items
          .map(({ id }) => document.getElementById(id))
          .filter((el): el is HTMLElement => el !== null);

        const passed = headings.filter((el) => el.getBoundingClientRect().top <= 120);
        const current = passed.at(-1) ?? headings[0];
        if (current) setActiveId(current.id);
      },
      { rootMargin: "-100px 0px -66% 0px", threshold: [0, 1] },
    );

    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-labelledby="toc-heading" className="text-body-sm">
      <h2 id="toc-heading" className="text-label uppercase text-tertiary">
        On this page
      </h2>
      <ul className="mt-4 flex flex-col gap-0.5 border-l border-subtle">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={cn(
                "-ml-px flex border-l py-1.5 pr-2 transition-colors duration-150",
                item.depth === 2 ? "pl-4" : "pl-8",
                activeId === item.id
                  ? "border-accent text-primary"
                  : "border-transparent text-tertiary hover:text-secondary",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function flatten(entries: TocEntry[], depth = 2): { id: string; title: string; depth: number }[] {
  return entries.flatMap((entry) => [
    { id: entry.url.replace(/^#/, ""), title: entry.title, depth },
    ...flatten(entry.items ?? [], depth + 1),
  ]);
}
