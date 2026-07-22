import Image from "next/image";
import { site, stats } from "#content";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

/**
 * The 30-second job: an unfamiliar recruiter must learn who, what,
 * that it's real, and how to reach you — without scrolling past the
 * second viewport. Proof lives *in* the hero, not below it.
 *
 * The LCP element here is text, not a 448 KB PNG.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <AmbientGradient />

      <Container>
        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <Stagger className="relative max-w-3xl">
            <StaggerItem>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-subtle px-3 py-1.5 text-caption text-accent-text">
                <span aria-hidden="true" className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {site.availability}
              </p>
            </StaggerItem>

            <StaggerItem>
              <h1 className="mt-6 text-display-2xl text-balance">
                {site.tagline}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-xl text-body-lg text-secondary">
                {site.positioning}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-4 max-w-xl text-body text-tertiary">
                {site.intro}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/projects" size="lg">
                  View my work
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  Get in touch
                </ButtonLink>
              </div>
            </StaggerItem>
          </Stagger>

          {/* One portrait, repositioned by the grid rather than two
              elements toggled with hidden/block — two <Image>s meant two
              preloads, and only one is ever visible.
              Mobile: small round avatar above the copy, so it can't eat
              the fold the way the previous build's 320px headshot did.
              Desktop: full portrait in the second column. */}
          <Reveal delay={0.15} className="order-first lg:order-none">
            <div className="relative w-fit lg:w-full">
              <div
                aria-hidden="true"
                className="absolute -inset-4 hidden rounded-full bg-[radial-gradient(circle,var(--accent-subtle),transparent_70%)] blur-2xl lg:block"
              />
              {/* The source is a real circle — 640×640 with an alpha
                  channel and fully transparent corners. So: no border and
                  no box-shadow, both of which would outline empty space.
                  Depth comes from the radial glow behind it instead. */}
              <Image
                src={site.avatar}
                alt={`Portrait of ${site.name}`}
                width={640}
                height={640}
                loading="eager"
                sizes="(min-width: 1024px) 320px, 64px"
                className="relative size-16 object-contain lg:aspect-square lg:size-auto lg:w-full"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-subtle pt-10 sm:mt-20 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-display-lg tabular-nums text-primary">
                  {stat.href ? (
                    <a
                      href={stat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-md transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      {stat.value}
                      <ExternalIcon />
                    </a>
                  ) : (
                    stat.value
                  )}
                </dt>
                <dd className="mt-1 text-body-sm text-tertiary">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

/** Decorative. GPU-only properties, no layout cost, hidden from AT. */
function AmbientGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-40 left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-subtle),transparent_65%)] opacity-70 blur-3xl" />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 text-tertiary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3h7v7M13 3L4 12" />
    </svg>
  );
}
