"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const iconClass =
  "absolute size-[18px] transition-[opacity,transform] duration-300 ease-[--ease-out-quint]";

/**
 * Icon state is driven by the `.dark` class, not React state — so there
 * is no mounted flag, no effect, and no hydration flash. `resolvedTheme`
 * is only read inside the click handler, by which point it's settled.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle colour theme"
      className={cn(
        "relative grid size-11 place-items-center rounded-md text-secondary",
        "transition-colors duration-150",
        "hover:bg-surface-subtle hover:text-primary active:bg-surface-inset",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <SunIcon className={cn(iconClass, "scale-100 opacity-100 dark:scale-50 dark:opacity-0")} />
      <MoonIcon className={cn(iconClass, "scale-50 opacity-0 dark:scale-100 dark:opacity-100")} />
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
