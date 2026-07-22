import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base = cn(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium",
  "whitespace-nowrap select-none",
  "transition-[transform,background-color,border-color,box-shadow,color]",
  "duration-150 ease-[--ease-out-quint]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  "disabled:pointer-events-none disabled:opacity-50",
  // Every interactive element gets hover AND active AND focus — the
  // previous build had hover only.
  "active:scale-[0.98]",
);

const variants: Record<Variant, string> = {
  primary: cn(
    "bg-accent text-accent-contrast shadow-sm",
    "hover:bg-accent-hover hover:shadow-md",
    "active:bg-accent-active",
  ),
  secondary: cn(
    "border border-default bg-surface-raised text-primary shadow-xs",
    "hover:border-strong hover:shadow-sm",
    "active:bg-surface-subtle",
  ),
  ghost: cn("text-secondary", "hover:bg-surface-subtle hover:text-primary", "active:bg-surface-inset"),
};

const sizes: Record<Size, string> = {
  // 44px minimum touch target on md/lg (WCAG 2.5.8).
  sm: "h-9 px-3 text-body-sm",
  md: "h-11 px-5 text-body-sm",
  lg: "h-12 px-6 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  ...props
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props} />;
  }
  return <Link href={href} className={classes} {...props} />;
}
