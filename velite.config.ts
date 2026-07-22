import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { PluggableList } from "unified";

/**
 * Content is git. Velite validates it with Zod at build time and emits
 * plain JSON + compiled MDX into .velite/ — it does not hook into the
 * bundler, which is precisely why Contentlayer died. See docs/02 §6.
 *
 * A malformed frontmatter field fails the BUILD, not the page.
 */

const prettyCode: PrettyCodeOptions = {
  // Dual theme: Shiki emits both, CSS picks one. Zero client JS.
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: { block: "text", inline: "text" },
};

const remarkPlugins: PluggableList = [remarkGfm, remarkMath];

const rehypePlugins: PluggableList = [
  rehypeSlug,
  [rehypePrettyCode, prettyCode],
  rehypeKatex,
  // Appended so the anchor follows the heading text rather than
  // swallowing it — screen readers announce the heading, not "link".
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      properties: { className: ["heading-anchor"], "aria-hidden": "true", tabIndex: -1 },
    },
  ],
];

const mdxOptions = { remarkPlugins, rehypePlugins };

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(110),
      description: s.string().max(200),
      date: s.isodate(),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      /** Ordered multi-part writing — the highest-value structure for
       *  demonstrating depth (docs/02 §13). */
      series: s.string().optional(),
      seriesOrder: s.number().optional(),
      draft: s.boolean().default(false),
      cover: s.image().optional(),
      slug: s.path(),
      content: s.mdx(mdxOptions),
      toc: s.toc(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug.replace(/^posts\//, ""),
      permalink: `/blog/${data.slug.replace(/^posts\//, "")}`,
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
});
