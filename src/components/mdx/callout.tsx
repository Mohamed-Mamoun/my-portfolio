import { cn } from "@/lib/utils";

const variants = {
  note: {
    wrapper: "border-info/30 bg-info-subtle",
    icon: "text-info",
    label: "Note",
    path: "M12 16v-4M12 8h.01",
  },
  warning: {
    wrapper: "border-warning/30 bg-warning-subtle",
    icon: "text-warning",
    label: "Warning",
    path: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  },
  tip: {
    wrapper: "border-success/30 bg-success-subtle",
    icon: "text-success",
    label: "Tip",
    path: "m9 12 2 2 4-4",
  },
} as const;

export function Callout({
  type = "note",
  children,
}: {
  type?: keyof typeof variants;
  children: React.ReactNode;
}) {
  const variant = variants[type];

  return (
    <aside
      className={cn(
        "my-8 flex gap-3 rounded-lg border p-4 text-body-sm sm:p-5",
        "[&>div>*:first-child]:mt-0 [&>div>*:last-child]:mb-0",
        variant.wrapper,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn("mt-0.5 size-5 shrink-0", variant.icon)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-label={variant.label}
      >
        {type !== "warning" ? <circle cx="12" cy="12" r="9" /> : null}
        <path d={variant.path} />
      </svg>
      <div className="min-w-0">{children}</div>
    </aside>
  );
}
