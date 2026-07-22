import type { Metadata } from "next";
import { buildSearchIndex } from "@/lib/search";
import { Container, Section } from "@/components/layout/container";
import { SearchResults } from "@/components/features/search-results";

export const metadata: Metadata = {
  title: "Search",
  description: "Search projects, articles, tags, and pages.",
  alternates: { canonical: "/search" },
  // A search UI has nothing to rank for; the content it points at does.
  robots: { index: false, follow: true },
};

/**
 * The full-page counterpart to ⌘K — linkable, shareable, and usable
 * without a keyboard shortcut. Both read the same index.
 */
export default function SearchPage() {
  return (
    <Section space="lg">
      <Container size="content">
        <header>
          <p className="text-label uppercase text-accent-text">Search</p>
          <h1 className="mt-3 text-display-lg">Find anything</h1>
          <p className="mt-4 text-body text-secondary">
            Projects, articles, tags, and pages. Press{" "}
            <kbd className="rounded border border-subtle bg-surface-subtle px-1.5 py-0.5 font-mono text-caption">
              ⌘K
            </kbd>{" "}
            anywhere on the site for the same thing without leaving the page.
          </p>
        </header>

        <SearchResults docs={buildSearchIndex()} />
      </Container>
    </Section>
  );
}
