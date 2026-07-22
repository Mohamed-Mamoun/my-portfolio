import type { Metadata } from "next";
import Link from "next/link";
import { competencies, projects } from "#content";
import { Container, Section } from "@/components/layout/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical competencies backed by shipped work — each claim links to the project that proves it.",
  alternates: { canonical: "/skills" },
};

const titleBySlug = new Map(projects.map((p) => [p.slug, p.title]));

export default function SkillsPage() {
  return (
    <Section space="lg">
      <Container>
        <Reveal>
          <header className="max-w-2xl">
            <p className="text-label uppercase text-accent-text">Skills</p>
            <h1 className="mt-3 text-display-xl">What I&rsquo;m trusted with</h1>
            <p className="mt-5 text-body-lg text-secondary">
              No self-assigned percentages, no five-star ratings. Every claim below links to the
              production work that backs it — if it isn&rsquo;t shipped, it isn&rsquo;t listed.
            </p>
          </header>
        </Reveal>

        <Stagger as="ul" className="mt-14 flex flex-col gap-6">
          {competencies.map((c) => (
            <StaggerItem as="li" key={c.title}>
              <div className="grid gap-6 rounded-xl border border-subtle bg-surface-raised p-7 edge-highlight md:grid-cols-[minmax(0,1fr)_18rem] md:gap-10">
                <div>
                  <h2 className="text-heading-lg">{c.title}</h2>
                  <p className="mt-3 max-w-prose text-body text-secondary">{c.blurb}</p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {c.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-sm border border-subtle bg-surface-subtle px-2.5 py-1 text-body-sm text-secondary"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-subtle pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <h3 className="text-label uppercase text-tertiary">Proven in</h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {c.provenIn.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/projects/${slug}`}
                          className="group inline-flex items-center gap-1.5 rounded-sm text-body-sm text-accent-text transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                          {titleBySlug.get(slug) ?? slug}
                          <span
                            aria-hidden="true"
                            className="text-tertiary transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
