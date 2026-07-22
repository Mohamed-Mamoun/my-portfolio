"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress without an animation library.
 *
 * Writes a CSS custom property from a passive, rAF-throttled scroll
 * listener; the transform lives in CSS. This replaced `useScroll` +
 * `useSpring`, which pulled 118 KB of `motion` onto every route.
 */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      element.style.setProperty("--progress", String(Math.min(1, Math.max(0, progress))));
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // Decorative — the scrollbar carries the same information.
    <div
      ref={ref}
      aria-hidden="true"
      className="reading-progress fixed inset-x-0 top-0 z-60 h-0.5 bg-accent"
    />
  );
}
