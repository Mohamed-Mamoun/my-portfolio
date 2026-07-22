import { cn } from "@/lib/utils";

const widths = {
  content: "max-w-content",
  default: "max-w-default",
  wide: "max-w-wide",
  ultra: "max-w-ultra",
} as const;

export function Container({
  size = "default",
  className,
  children,
}: {
  size?: keyof typeof widths;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", widths[size], className)}>
      {children}
    </div>
  );
}

const rhythm = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-32",
  xl: "py-24 sm:py-40",
} as const;

export function Section({
  space = "md",
  className,
  children,
  ...props
}: {
  space?: keyof typeof rhythm;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn(rhythm[space], className)} {...props}>
      {children}
    </section>
  );
}
