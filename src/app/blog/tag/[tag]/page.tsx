import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTags, getPostsByTag } from "@/lib/content";
import { Container, Section } from "@/components/layout/container";
import { PostCard } from "@/components/content/post-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type Params = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Writing tagged “${tag}”`,
    description: `Articles about ${tag}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

export default async function TagPage({ params }: Params) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <Section space="lg">
      <Container>
        <Reveal>
          <nav aria-label="Breadcrumb">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 rounded-md text-body-sm text-tertiary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              All writing
            </Link>
          </nav>
          <h1 className="mt-8 text-display-lg">
            Tagged <span className="text-accent-text">{tag}</span>
          </h1>
          <p className="mt-3 text-body text-secondary">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <PostCard post={post} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
