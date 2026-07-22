"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "#content";
import { cn } from "@/lib/utils";

const ALL = "All";

export function ProjectFilters({
  projects,
  stacks,
}: {
  projects: readonly Project[];
  stacks: string[];
}) {
  const [active, setActive] = useState(ALL);

  const filtered = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.stack.includes(active))),
    [projects, active],
  );

  const filters = [ALL, ...stacks];

  return (
    <>
      <div className="mt-10">
        <h2 id="filter-heading" className="text-label uppercase text-tertiary">
          Filter by technology
        </h2>
        <div
          role="group"
          aria-labelledby="filter-heading"
          className="mt-3 flex flex-wrap gap-2"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
              className={cn(
                "rounded-full border px-3 py-1.5 text-body-sm transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                active === filter
                  ? "border-accent bg-accent text-accent-contrast"
                  : "border-subtle bg-surface-raised text-secondary hover:border-default hover:text-primary",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Announced so filtering isn't a silent change for screen readers. */}
      <p aria-live="polite" className="mt-6 text-body-sm text-tertiary">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {active !== ALL ? ` using ${active}` : ""}
      </p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <li key={project.slug}>
            <article
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-xl border border-subtle bg-surface-raised edge-highlight",
                "transition-[transform,border-color,box-shadow] duration-300 ease-[--ease-out-quint]",
                "hover:-translate-y-1 hover:border-default hover:shadow-lg",
                "focus-within:border-accent-border focus-within:shadow-lg",
              )}
            >
              <div className="flex items-center justify-center border-b border-subtle bg-surface-subtle py-10">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 rounded-lg object-contain"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid size-16 place-items-center rounded-lg border border-default text-heading-md text-tertiary"
                  >
                    {project.title.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-2 text-label uppercase text-tertiary">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </p>
                <h3 className="mt-3 text-heading-md">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-body-sm text-secondary">{project.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-sm border border-subtle bg-surface-subtle px-2 py-0.5 text-caption text-secondary"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
