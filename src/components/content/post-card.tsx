import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl border border-subtle bg-surface-raised p-6 edge-highlight",
        "transition-[transform,border-color,box-shadow] duration-300 ease-[--ease-out-quint]",
        "hover:-translate-y-1 hover:border-default hover:shadow-lg",
        "focus-within:border-accent-border focus-within:shadow-lg",
        className,
      )}
    >
      <PostMeta post={post} />

      <h3 className="mt-3 text-heading-md">
        <Link
          href={post.permalink}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-2 text-body-sm text-secondary">{post.description}</p>

      {post.tags.length > 0 ? (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm border border-subtle bg-surface-subtle px-2 py-0.5 text-caption text-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-caption text-tertiary">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.metadata.readingTime} min read</span>
      {post.series ? (
        <>
          <span aria-hidden="true">·</span>
          <span className="text-accent-text">
            {post.series} · Part {post.seriesOrder}
          </span>
        </>
      ) : null}
    </p>
  );
}
