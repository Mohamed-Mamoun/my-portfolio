"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import Link from "next/link";
import { searchDocs, type SearchDoc, type SearchKind } from "@/lib/search";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<SearchKind, string> = {
  project: "Project",
  post: "Article",
  tag: "Tag",
  page: "Page",
};

export function SearchResults({ docs }: { docs: SearchDoc[] }) {
  const id = useId();
  const [query, setQuery] = useState("");
  // Keeps typing responsive when the index grows.
  const deferred = useDeferredValue(query);

  const results = useMemo(
    () => (deferred.trim() ? searchDocs(docs, deferred, 30) : docs),
    [docs, deferred],
  );

  const isSearching = deferred.trim().length > 0;

  return (
    <div className="mt-10">
      <label htmlFor={id} className="sr-only">
        Search projects, articles, tags, and pages
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try “flutter”, “offline”, or “bloc”…"
        className={cn(
          "w-full rounded-lg border border-default bg-surface-raised px-4 py-3 text-body text-primary",
          "transition-[border-color,box-shadow] duration-150 placeholder:text-tertiary",
          "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-subtle",
        )}
      />

      <p aria-live="polite" className="mt-4 text-body-sm text-tertiary">
        {isSearching
          ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${deferred}”`
          : `${results.length} things to browse`}
      </p>

      {results.length === 0 ? (
        <p className="mt-8 text-body text-secondary">
          Nothing matched. Try a technology name, a project, or a broader topic.
        </p>
      ) : (
        <ul className="mt-6 flex flex-col divide-y divide-subtle border-y border-subtle">
          {results.map((doc) => (
            <li key={doc.id}>
              <Link
                href={doc.href}
                className="group flex flex-col gap-1 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="flex items-center gap-2">
                  <span className="rounded-sm border border-subtle bg-surface-subtle px-1.5 py-0.5 text-caption text-tertiary">
                    {KIND_LABEL[doc.kind]}
                  </span>
                  <span className="text-body font-medium text-primary transition-colors group-hover:text-accent-text">
                    {doc.title}
                  </span>
                </span>
                <span className="text-body-sm text-secondary">{doc.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
