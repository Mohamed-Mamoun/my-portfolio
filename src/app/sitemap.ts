import type { MetadataRoute } from "next";
import { site, projects } from "#content";
import { getPosts, getTags } from "@/lib/content";

/**
 * The previous build had exactly one indexable URL and no sitemap.
 * Tier-3 routes are included here deliberately — they're crawlable
 * even while they stay out of the header (docs/02 §9).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/projects", priority: 0.9 },
    { path: "/blog", priority: 0.9 },
    { path: "/experience", priority: 0.7 },
    { path: "/skills", priority: 0.6 },
    { path: "/uses", priority: 0.5 },
    { path: "/now", priority: 0.5 },
    { path: "/contact", priority: 0.7 },
  ].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const postRoutes = getPosts().map((post) => ({
    url: `${site.url}${post.permalink}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const tagRoutes = getTags().map(({ tag }) => ({
    url: `${site.url}/blog/tag/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes, ...tagRoutes];
}
