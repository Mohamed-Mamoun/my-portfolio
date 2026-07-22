import { posts as allPosts, type Post } from "#velite";

export type { Post };

export type TocEntry = { title: string; url: string; items: TocEntry[] };

const isPublished = (post: Post) =>
  !post.draft && (process.env.NODE_ENV === "development" || new Date(post.date) <= new Date());

const byNewest = (a: Post, b: Post) => +new Date(b.date) - +new Date(a.date);

/** Every published post, newest first. Drafts render in dev only. */
export function getPosts(): Post[] {
  return allPosts.filter(isPublished).sort(byNewest);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): Post[] {
  return getPosts().filter((post) => post.tags.includes(tag));
}

/** Ordered parts of a series, so a post can render prev/next. */
export function getSeries(name: string): Post[] {
  return getPosts()
    .filter((post) => post.series === name)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export function getSeriesNames(): string[] {
  return [...new Set(getPosts().flatMap((post) => (post.series ? [post.series] : [])))];
}

/**
 * Related posts by shared tags, then recency. Deliberately simple —
 * embedding-based similarity is a post-launch item (docs/02 §7) and
 * would reuse the search index rather than living here.
 */
export function getRelatedPosts(post: Post, limit = 2): Post[] {
  return getPosts()
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({
      post: other,
      shared: other.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || +new Date(b.post.date) - +new Date(a.post.date))
    .slice(0, limit)
    .map(({ post: related }) => related);
}
