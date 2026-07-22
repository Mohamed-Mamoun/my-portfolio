import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "#content";
import { getPost, getPosts, getRelatedPosts, getSeries } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { MDXContent } from "@/components/mdx/mdx-content";
import { TableOfContents } from "@/components/content/table-of-contents";
import { ReadingProgress } from "@/components/content/reading-progress";
import { PostCard, PostMeta } from "@/components/content/post-card";
import { formatDate } from "@/lib/utils";
// Scoped to article routes so the ~7 KB of maths CSS never loads on
// pages that can't contain equations.
import "katex/dist/katex.min.css";

type Params = { params: Promise<{ slug: string }> };

/** Every article is pre-rendered at build time. */
export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.permalink },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: post.permalink,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [site.name],
      tags: [...post.tags],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const series = post.series ? getSeries(post.series) : [];
  const indexInSeries = series.findIndex((p) => p.slug === post.slug);
  const previous = indexInSeries > 0 ? series[indexInSeries - 1] : undefined;
  const next = indexInSeries >= 0 ? series[indexInSeries + 1] : undefined;

  return (
    <>
      <ReadingProgress />

      <article>
        <Container size="wide" className="py-12 sm:py-16">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            <div className="min-w-0">
              <header className="mx-auto max-w-[68ch]">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-1.5 rounded-md text-body-sm text-tertiary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                  All writing
                </Link>

                <h1 className="mt-8 text-display-lg">{post.title}</h1>
                <p className="mt-5 text-body-lg text-secondary">{post.description}</p>

                <div className="mt-6 border-t border-subtle pt-5">
                  <PostMeta post={post} />
                  {post.updated ? (
                    <p className="mt-1 text-caption text-tertiary">
                      Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                    </p>
                  ) : null}
                </div>
              </header>

              {/* Mobile/tablet: the TOC sits inline above the article
                  rather than being hidden entirely. */}
              {post.toc.length > 1 ? (
                <div className="mx-auto mt-10 max-w-[68ch] rounded-xl border border-subtle bg-surface-subtle p-5 lg:hidden">
                  <TableOfContents toc={post.toc} />
                </div>
              ) : null}

              <div className="prose shiki-themed mx-auto mt-12">
                <MDXContent code={post.content} />
              </div>

              {series.length > 1 ? (
                <nav
                  aria-label="Series navigation"
                  className="mx-auto mt-16 grid max-w-[68ch] gap-4 border-t border-subtle pt-8 sm:grid-cols-2"
                >
                  {previous ? (
                    <SeriesLink post={previous} direction="previous" />
                  ) : (
                    <span />
                  )}
                  {next ? <SeriesLink post={next} direction="next" /> : null}
                </nav>
              ) : null}
            </div>

            {post.toc.length > 1 ? (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents toc={post.toc} />
                </div>
              </aside>
            ) : null}
          </div>
        </Container>

        {related.length > 0 ? (
          <Container size="wide" className="border-t border-subtle py-16">
            <h2 className="text-heading-lg">Related reading</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        ) : null}
      </article>
    </>
  );
}

function SeriesLink({
  post,
  direction,
}: {
  post: { permalink: string; title: string };
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={post.permalink}
      rel={direction}
      className={`group rounded-lg border border-subtle bg-surface-raised p-5 transition-[border-color,box-shadow] hover:border-default hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
        isNext ? "sm:text-right" : ""
      }`}
    >
      <span className="text-label uppercase text-tertiary">
        {isNext ? "Next in series" : "Previous in series"}
      </span>
      <span className="mt-1.5 block text-body font-medium text-primary">{post.title}</span>
    </Link>
  );
}
