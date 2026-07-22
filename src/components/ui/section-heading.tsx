import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  label,
  title,
  description,
  href,
  hrefLabel,
}: {
  label: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="max-w-xl">
          {/* One uppercase micro-label per section, maximum. */}
          <p className="text-label uppercase text-accent-text">{label}</p>
          <h2 className="mt-3 text-display-lg">{title}</h2>
          {description ? <p className="mt-4 text-body text-secondary">{description}</p> : null}
        </div>

        {href && hrefLabel ? (
          <Link
            href={href}
            className="group inline-flex items-center gap-1.5 rounded-md text-body-sm font-medium text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {hrefLabel}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        ) : null}
      </div>
    </Reveal>
  );
}
