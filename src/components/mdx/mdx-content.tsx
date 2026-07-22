import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";

type MDXModule = React.ComponentType<{ components: MDXComponents }>;

const cache = new Map<string, MDXModule>();

/**
 * Velite compiles MDX to a function body at build time. This evaluates
 * it — the standard Velite/Contentlayer pattern. The input is our own
 * content, compiled during our own build; nothing user-supplied reaches
 * `new Function`.
 *
 * Results are cached by code string, so a given post compiles once per
 * process rather than once per render.
 */
function getMDXComponent(code: string): MDXModule {
  const cached = cache.get(code);
  if (cached) return cached;

  const fn = new Function(code);
  const component = fn({ ...runtime }).default as MDXModule;
  cache.set(code, component);
  return component;
}

type MDXComponents = Record<string, React.ComponentType<Record<string, unknown>>>;

const components = {
  Callout,

  // Internal links get client-side navigation; external links get the
  // security attributes and a visual affordance.
  a: ({ href = "", children, ...props }: React.ComponentProps<"a">) => {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },

  // rehype-pretty-code wraps highlighted blocks in <pre>; CodeBlock adds
  // the copy affordance around it without touching the highlighting.
  pre: CodeBlock,

  // width/height come from the MDX author as strings; Image needs real
  // dimensions, so they're set here rather than forwarded.
  img: ({ src, alt = "", title }: React.ComponentProps<"img">) => (
    <Image
      src={typeof src === "string" ? src : ""}
      alt={alt}
      title={title}
      width={1200}
      height={675}
      sizes="(min-width: 768px) 68ch, 100vw"
      className="rounded-lg border border-subtle"
    />
  ),
} as unknown as MDXComponents;

export function MDXContent({ code }: { code: string }) {
  // The rule guards against components whose identity churns between
  // renders, remounting their subtree. Neither condition applies here:
  // this is a server component, and `code` is a build-time constant
  // that resolves to a cached, stable component per post.
  const Component = getMDXComponent(code);
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />;
}
