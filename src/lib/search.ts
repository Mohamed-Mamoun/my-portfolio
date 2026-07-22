import { projects, site } from "#content";
import { getPosts, getTags } from "@/lib/content";

export type SearchKind = "page" | "post" | "project" | "tag";

export type SearchDoc = {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  /** Space-joined haystack: tags, stack, category. Matched with lower weight. */
  keywords: string;
};

const PAGES: Omit<SearchDoc, "kind" | "id">[] = [
  { title: "Home", description: "Senior mobile engineer — Flutter architecture, shipped end to end.", href: "/", keywords: "home start index" },
  { title: "Projects", description: "Production Flutter products, with the reasoning behind them.", href: "/projects", keywords: "work portfolio case studies apps" },
  { title: "Writing", description: "Engineering decisions from shipped products.", href: "/blog", keywords: "blog articles posts writing" },
  { title: "About", description: "Background, values, and how I think about the work.", href: "/about", keywords: "bio story background who" },
  { title: "Experience", description: "Career history and core competencies.", href: "/experience", keywords: "cv resume career jobs work history" },
  { title: "Skills", description: "Competencies, each linked to the work that proves it.", href: "/skills", keywords: "expertise technologies abilities" },
  { title: "Résumé", description: "One-page career summary, as a PDF.", href: site.resume, keywords: "cv resume download pdf hire" },
  { title: "Contact", description: "Email, response time, and how to reach me.", href: "/contact", keywords: "email hire talk reach get in touch" },
  { title: "Uses", description: "Tools, software, and services I build with.", href: "/uses", keywords: "setup tools gear software stack" },
  { title: "Now", description: "What I'm focused on at the moment.", href: "/now", keywords: "current focus today" },
];

/**
 * Built once at module load on the server, served as a static JSON
 * document. Kept out of the initial page payload — the command menu
 * fetches it on first open.
 */
export function buildSearchIndex(): SearchDoc[] {
  const pages: SearchDoc[] = PAGES.map((page) => ({
    ...page,
    kind: "page",
    id: `page:${page.href}`,
  }));

  const posts: SearchDoc[] = getPosts().map((post) => ({
    id: `post:${post.slug}`,
    kind: "post",
    title: post.title,
    description: post.description,
    href: post.permalink,
    keywords: [...post.tags, post.series ?? "", post.excerpt].join(" "),
  }));

  const projectDocs: SearchDoc[] = projects.map((project) => ({
    id: `project:${project.slug}`,
    kind: "project",
    title: project.title,
    description: project.summary,
    href: `/projects/${project.slug}`,
    keywords: [...project.stack, project.category, project.year].join(" "),
  }));

  const tags: SearchDoc[] = getTags().map(({ tag, count }) => ({
    id: `tag:${tag}`,
    kind: "tag",
    title: tag,
    description: `${count} ${count === 1 ? "article" : "articles"}`,
    href: `/blog/tag/${tag}`,
    keywords: "tag topic category",
  }));

  return [...pages, ...projectDocs, ...posts, ...tags];
}

/**
 * Field-weighted token scoring. Deliberately simple and dependency-free
 * — embedding-based semantic search is a post-launch item (docs/02 §7)
 * and would replace this function, not the surrounding UI.
 */
export function scoreDoc(doc: SearchDoc, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const tokens = q.split(/\s+/);
  const title = doc.title.toLowerCase();
  const description = doc.description.toLowerCase();
  const keywords = doc.keywords.toLowerCase();

  let score = 0;
  for (const token of tokens) {
    if (title === token) score += 100;
    else if (title.startsWith(token)) score += 50;
    else if (title.includes(token)) score += 30;

    if (keywords.includes(token)) score += 12;
    if (description.includes(token)) score += 6;
  }

  // Every token must land somewhere, or it isn't a match.
  const matchedAll = tokens.every(
    (token) => title.includes(token) || keywords.includes(token) || description.includes(token),
  );

  return matchedAll ? score : 0;
}

export function searchDocs(docs: SearchDoc[], query: string, limit = 12): SearchDoc[] {
  return docs
    .map((doc) => ({ doc, score: scoreDoc(doc, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ doc }) => doc);
}
