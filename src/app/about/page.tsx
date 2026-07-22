import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, experience } from "#content";
import { Container, Section } from "@/components/layout/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — ${site.positioning}`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "The boring option is usually right",
    body: "Novel technology is a cost you pay in every future debugging session. I reach for it when the problem genuinely demands it, and not to make the work more interesting.",
  },
  {
    title: "Decisions should survive being questioned",
    body: "If I can't explain why a library, a pattern, or an abstraction is there, it shouldn't be there. That's also why I write — an argument you can't put in prose usually isn't one.",
  },
  {
    title: "Offline is a first-class state",
    body: "Most apps treat a missing network as an error. Users treat it as Tuesday. Designing for the disconnected case tends to produce a better connected one too.",
  },
  {
    title: "Ship it, then be honest about it",
    body: "Every project here has something I'd do differently. Saying so is more useful to you than a page of superlatives — and it's the part of a portfolio I'd want to read.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section space="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal>
              <p className="text-label uppercase text-accent-text">About</p>
              <h1 className="mt-3 text-display-xl">
                I got here by shipping things that had to work.
              </h1>

              <div className="prose mt-8">
                <p>
                  I&rsquo;m a mobile engineer in {site.location}. For the last four years I&rsquo;ve
                  built Flutter applications end to end — architecture, state, backend
                  integration, store release — mostly for products where I was the person
                  responsible when something broke.
                </p>
                <p>
                  That shapes how I work. When you own a product from Figma file to Play Store
                  listing, you stop optimising for how clever the code reads and start optimising
                  for how quickly you can understand it at 11pm with a crash report open. Most of
                  my engineering opinions come from that, not from a conference talk.
                </p>
                <p>
                  I studied Computer Science at The Future University, started with a community
                  healthcare app as an intern, and have since worked across e-learning,
                  e-commerce, payments, and AI-assisted productivity. The domains changed; the
                  questions didn&rsquo;t — what&rsquo;s the real constraint, what breaks first, and
                  what does the user do when it does.
                </p>
                <p>
                  Lately I&rsquo;ve been writing more of it down. Partly because explaining a
                  decision is the fastest way to find out whether it was a good one, and partly
                  because the engineers I learned the most from were the ones who published their
                  reasoning rather than their results.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-24">
                {/* Transparent circular source — no border, no frame.
                    See the note in components/home/hero.tsx. */}
                <div className="relative mx-auto max-w-xs lg:max-w-none">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,var(--accent-subtle),transparent_70%)] blur-2xl"
                  />
                  <Image
                    src={site.avatar}
                    alt={`Portrait of ${site.name}`}
                    width={640}
                    height={640}
                    priority
                    sizes="(min-width: 1024px) 400px, 320px"
                    className="relative aspect-square w-full object-contain"
                  />
                </div>
                <dl className="mt-6 flex flex-col gap-3 text-body-sm">
                  <div className="flex justify-between gap-4 border-b border-subtle pb-3">
                    <dt className="text-tertiary">Based in</dt>
                    <dd className="text-primary">{site.location}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-subtle pb-3">
                    <dt className="text-tertiary">Timezone</dt>
                    <dd className="text-primary">{site.timezone}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-tertiary">Focus</dt>
                    <dd className="text-primary">Flutter · Mobile architecture</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section space="md" className="border-t border-subtle bg-surface-subtle">
        <Container>
          <Reveal>
            <h2 className="text-display-lg">How I think about the work</h2>
          </Reveal>
          <Stagger as="ul" className="mt-10 grid gap-5 md:grid-cols-2">
            {values.map((value) => (
              <StaggerItem as="li" key={value.title}>
                <div className="h-full rounded-xl border border-subtle bg-surface-raised p-7 edge-highlight">
                  <h3 className="text-heading-sm">{value.title}</h3>
                  <p className="mt-3 text-body-sm text-secondary">{value.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section space="md" className="border-t border-subtle">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-display-lg">The path</h2>
              <Link
                href="/experience"
                className="group inline-flex items-center gap-1.5 rounded-md text-body-sm font-medium text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                Full experience
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <p className="mt-4 text-body-sm text-tertiary">
              Prefer the short version?{" "}
              <a
                href={site.resume}
                className="rounded-sm font-medium text-secondary underline decoration-subtle underline-offset-4 transition-colors hover:text-primary hover:decoration-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Download the résumé
              </a>{" "}
              as a PDF.
            </p>
          </Reveal>

          <Stagger as="ul" className="mt-10 flex flex-col">
            {experience.map((role, i) => (
              <StaggerItem as="li" key={`${role.period}-${role.role}`} className="flex gap-5">
                <div aria-hidden="true" className="flex flex-col items-center pt-1.5">
                  <span
                    className={
                      role.current
                        ? "size-2.5 rounded-full bg-accent ring-4 ring-accent-subtle"
                        : "size-2.5 rounded-full border-2 border-strong"
                    }
                  />
                  {i < experience.length - 1 ? (
                    <span className="w-px flex-1 bg-gradient-to-b from-subtle to-transparent" />
                  ) : null}
                </div>
                <div className="pb-10">
                  <p className="font-mono text-caption text-tertiary">{role.period}</p>
                  <h3 className="mt-1 text-heading-sm">{role.role}</h3>
                  <p className="text-body-sm text-secondary">{role.company}</p>
                  <p className="mt-1.5 max-w-prose text-body-sm text-tertiary">{role.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
