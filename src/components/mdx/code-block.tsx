"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps the <pre> that rehype-pretty-code produces. Highlighting stays
 * a build-time concern — this only adds the copy affordance, so the
 * client cost is one small button, not a syntax highlighter.
 */
export function CodeBlock({ children, className, ...props }: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = preRef.current?.textContent;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto rounded-lg border border-subtle bg-surface-subtle py-4 text-code",
          "[&>code]:grid [&>code]:min-w-full",
          "[&_[data-line]]:border-l-2 [&_[data-line]]:border-transparent [&_[data-line]]:px-4",
          "[&_[data-highlighted-line]]:border-accent [&_[data-highlighted-line]]:bg-accent-subtle",
          className,
        )}
        {...props}
      >
        {children}
      </pre>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        className={cn(
          "absolute right-2 top-2 grid size-9 place-items-center rounded-md",
          "border border-subtle bg-surface-raised text-tertiary shadow-xs",
          "opacity-0 transition-[opacity,color] duration-150",
          "group-hover:opacity-100 focus-visible:opacity-100",
          "hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="size-4 text-success" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 13 4 4L19 7" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
      </button>
    </div>
  );
}
