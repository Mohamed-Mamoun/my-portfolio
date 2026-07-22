import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getTags, getSeriesNames, getSeries } from "@/lib/content";
import { Container, Section } from "@/components/layout/container";
import { PostCard } from "@/components/content/post-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering decisions from shipped Flutter products — architecture, trade-offs, and the calls I got wrong.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts();
  const tags = getTags();
  const series = getSeriesNames();

  return (
    <Section space="lg">
      <Container>
        <Reveal>
          <header className="max-w-2xl">
            <p className="text-label uppercase text-accent-text">Writing</p>
            <h1 className="mt-3 text-display-xl">Decisions, and why</h1>
            <p className="mt-5 text-body-lg text-secondary">
              Notes from shipped products — architecture, trade-offs, and the calls I&rsquo;d
              make differently now. No tutorials I can&rsquo;t back with production experience.
            </p>
          </header>
        </Reveal>

        {tags.length > 0 ? (
          <Reveal delay={0.05}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {tags.map(({ tag, count }) => (
                <li key={tag}>
                  <Link
                    href={`/blog/tag/${tag}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-subtle bg-surface-raised px-3 py-1.5 text-body-sm text-secondary transition-colors hover:border-default hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {tag}
                    <span className="text-caption text-tertiary tabular-nums">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {series.length > 0 ? (
          <div className="mt-16">
            <Reveal>
              <h2 className="text-heading-lg">Series</h2>
            </Reveal>
            <Stagger as="ul" className="mt-6 flex flex-col gap-4">
              {series.map((name) => {
                const parts = getSeries(name);
                return (
                  <StaggerItem as="li" key={name}>
                    <div className="rounded-xl border border-subtle bg-surface-subtle p-6">
                      <h3 className="text-heading-sm">{name}</h3>
                      <p className="mt-1 text-caption text-tertiary">
                        {parts.length} {parts.length === 1 ? "part" : "parts"}
                      </p>
                      <ol className="mt-4 flex flex-col gap-2">
                        {parts.map((part) => (
                          <li key={part.slug} className="flex gap-3 text-body-sm">
                            <span className="font-mono text-tertiary tabular-nums">
                              {String(part.seriesOrder).padStart(2, "0")}
                            </span>
                            <Link
                              href={part.permalink}
                              className="rounded-sm text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                            >
                              {part.title}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        ) : null}

        <div className="mt-16">
          <Reveal>
            <h2 className="text-heading-lg">All posts</h2>
          </Reveal>

          {posts.length === 0 ? (
            <p className="mt-6 text-body text-secondary">Nothing published yet.</p>
          ) : (
            <Stagger className="mt-6 grid gap-5 sm:grid-cols-2">
              {posts.map((post) => (
                <StaggerItem key={post.slug} className="h-full">
                  <PostCard post={post} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </Container>
    </Section>
  );
}
