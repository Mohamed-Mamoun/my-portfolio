import { getPosts } from "@/lib/content";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostCard } from "@/components/content/post-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * Renders nothing when there's nothing to show. An empty "latest posts"
 * strip is worse than no strip (CLAUDE.md § Content integrity).
 */
export function LatestWriting() {
  const posts = getPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section space="lg" className="border-t border-subtle">
      <Container>
        <SectionHeading
          label="Writing"
          title="Thinking out loud"
          description="Architecture decisions from shipped products — including the ones I'd make differently now."
          href="/blog"
          hrefLabel="All writing"
        />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
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
