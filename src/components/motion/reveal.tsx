"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll choreography — no animation library.
 *
 * `motion` cost 118 KB on every route to fade elements in by 12px. That
 * is a CSS problem, so it is now solved in CSS: this component only
 * flips a data attribute, and the transition lives in globals.css.
 *
 * Progressive enhancement matters here. The server renders content
 * *visible*; the hidden state is scoped to `.js`, a class added by a
 * blocking script in <head>. Without JS — or if this component never
 * mounts — everything is readable, which is exactly the failure the
 * audit flagged in the previous build's `opacity: 0` reveals.
 *
 * Stagger delays are owned by the container via CSS `nth-child`, so no
 * component ever hand-types `0.15 + 0.08 * i` again.
 */

const DISTANCE_CLASS = "reveal";

type Tag = "div" | "section" | "li" | "article" | "header" | "ul";

function useRevealed<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || shown) return;

    // No support check needed: the `.js` class that hides these elements
    // is only added when IntersectionObserver exists (see layout head).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shown]);

  return [ref, shown] as const;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Standalone reveals only — inside <Stagger>, the container schedules. */
  delay?: number;
  as?: Tag;
}) {
  const [ref, shown] = useRevealed<HTMLElement>();
  // A union of tag names makes JSX intersect every element's props,
  // which no single ref can satisfy. ElementType is the standard escape.
  const Component = as as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn(DISTANCE_CLASS, className)}
      data-reveal={shown ? "shown" : "hidden"}
      data-reveal-delay={delay > 0 ? Math.round(delay * 1000) : undefined}
    >
      {children}
    </Component>
  );
}

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const [ref, shown] = useRevealed<HTMLElement>();
  const Component = as as React.ElementType;

  return (
    <Component ref={ref} className={className} data-stagger={shown ? "shown" : "hidden"}>
      {children}
    </Component>
  );
}

/** A direct child of <Stagger>. Its delay comes from its position. */
export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Component = as as React.ElementType;
  return <Component className={cn(DISTANCE_CLASS, className)}>{children}</Component>;
}
