"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import type { SearchDoc, SearchKind } from "@/lib/search";
import { cn } from "@/lib/utils";

/**
 * ⌘K is the real navigation. It's what allows a six-item header on a
 * 27-route site — and for the developer audience it's a signal in its
 * own right.
 *
 * cmdk handles combobox semantics (aria-activedescendant, roles, list
 * virtualisation of focus) that are genuinely hard to get right by
 * hand; Radix Dialog handles the focus trap. Same rule as the mobile
 * nav: don't re-implement overlay behaviour.
 */
/** Fully controlled by <CommandMenuTrigger>, which owns the open state. */
export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const router = useRouter();
  const { setTheme } = useTheme();
  const setOpen = onOpenChange;

  // The index is fetched once, on first open — never in the initial payload.
  const loadIndex = useCallback(() => {
    if (docs) return;
    fetch("/search-index.json")
      .then((response) => response.json())
      .then(setDocs)
      .catch(() => setDocs([]));
  }, [docs]);

  useEffect(() => {
    if (open) loadIndex();
  }, [open, loadIndex]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const grouped = groupByKind(docs ?? []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-90 bg-backdrop backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-[12vh] z-100 w-[min(38rem,calc(100vw-2rem))] -translate-x-1/2",
            "overflow-hidden rounded-xl border border-subtle bg-surface-overlay shadow-xl",
            "focus:outline-none",
          )}
        >
          <Dialog.Title className="sr-only">Search the site</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search projects, articles, tags, and pages. Use arrow keys to navigate.
          </Dialog.Description>

          <Command label="Site search" loop className="flex flex-col">
            <div className="flex items-center gap-3 border-b border-subtle px-4">
              <SearchIcon className="shrink-0 text-tertiary" />
              <Command.Input
                autoFocus
                placeholder="Search projects, writing, tags…"
                className="h-14 flex-1 bg-transparent text-body text-primary outline-none placeholder:text-tertiary"
              />
              <kbd className="rounded border border-subtle px-1.5 font-mono text-caption text-tertiary">
                esc
              </kbd>
            </div>

            <Command.List className="max-h-[min(24rem,50vh)] overflow-y-auto overscroll-contain p-2">
              {docs === null ? (
                <p className="px-3 py-8 text-center text-body-sm text-tertiary">Loading…</p>
              ) : (
                <Command.Empty className="px-3 py-8 text-center text-body-sm text-tertiary">
                  Nothing found. Try a technology, a project, or a topic.
                </Command.Empty>
              )}

              {(Object.keys(grouped) as SearchKind[]).map((kind) => {
                const items = grouped[kind];
                if (!items || items.length === 0) return null;
                return (
                  <Command.Group
                    key={kind}
                    heading={GROUP_LABEL[kind]}
                    className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-label [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-tertiary"
                  >
                    {items.map((doc) => (
                      <Command.Item
                        key={doc.id}
                        value={`${doc.title} ${doc.keywords} ${doc.description}`}
                        onSelect={() => go(doc.href)}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-md px-3 py-2.5",
                          "data-[selected=true]:bg-accent-subtle",
                        )}
                      >
                        <KindIcon kind={kind} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-body-sm text-primary">
                            {doc.title}
                          </span>
                          <span className="block truncate text-caption text-tertiary">
                            {doc.description}
                          </span>
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                );
              })}

              <Command.Group
                heading="Theme"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-label [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-tertiary"
              >
                {(["light", "dark", "system"] as const).map((mode) => (
                  <Command.Item
                    key={mode}
                    value={`theme ${mode} appearance colour color`}
                    onSelect={() => {
                      setTheme(mode);
                      setOpen(false);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-body-sm text-primary data-[selected=true]:bg-accent-subtle"
                  >
                    <span aria-hidden="true" className="grid size-5 place-items-center text-tertiary">
                      ◐
                    </span>
                    Switch to {mode} theme
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const GROUP_LABEL: Record<SearchKind, string> = {
  project: "Projects",
  post: "Writing",
  tag: "Tags",
  page: "Pages",
};

function groupByKind(docs: SearchDoc[]): Partial<Record<SearchKind, SearchDoc[]>> {
  const groups: Partial<Record<SearchKind, SearchDoc[]>> = {};
  for (const doc of docs) {
    (groups[doc.kind] ??= []).push(doc);
  }
  return groups;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function KindIcon({ kind }: { kind: SearchKind }) {
  const paths: Record<SearchKind, string> = {
    project: "M4 7h16v12H4zM4 7l2-3h12l2 3",
    post: "M6 4h9l3 3v13H6zM9 12h6M9 16h6",
    tag: "M4 4h7l9 9-7 7-9-9zM8 8h.01",
    page: "M7 4h7l4 4v12H7zM14 4v4h4",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 size-4 shrink-0 text-tertiary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind]} />
    </svg>
  );
}
