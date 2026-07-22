import type { Metadata } from "next";
import { site, experience, competencies } from "#content";
import { Container, Section } from "@/components/layout/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Experience",
  description: `Career history of ${site.name} — senior Flutter developer building cross-platform mobile products.`,
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <Section space="lg">
      <Container>
        <Reveal>
          <header className="max-w-2xl">
            <p className="text-label uppercase text-accent-text">Experience</p>
            <h1 className="mt-3 text-display-xl">Where I&rsquo;ve worked</h1>
            <p className="mt-5 text-body-lg text-secondary">
              Four years across e-learning, healthcare, e-commerce, and payments — mostly as the
              person responsible when it broke.
            </p>
          </header>
        </Reveal>

        <Stagger as="ul" className="mt-14 flex flex-col">
          {experience.map((role, i) => (
            <StaggerItem as="li" key={`${role.period}-${role.role}`}>
              <div className="grid gap-2 border-t border-subtle py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
                <p className="font-mono text-body-sm text-tertiary">{role.period}</p>
                <div>
                  <h2 className="flex flex-wrap items-center gap-3 text-heading-md">
                    {role.role}
                    {role.current ? (
                      <span className="rounded-full border border-accent-border bg-accent-subtle px-2.5 py-0.5 text-caption font-normal text-accent-text">
                        Current
                      </span>
                    ) : null}
                  </h2>
                  <p className="mt-1 text-body text-secondary">{role.company}</p>
                  <p className="mt-3 max-w-prose text-body text-tertiary">{role.description}</p>
                </div>
              </div>
              {i === experience.length - 1 ? <div className="border-t border-subtle" /> : null}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <h2 className="mt-20 text-display-lg">Core competencies</h2>
        </Reveal>
        <Stagger as="ul" className="mt-8 grid gap-5 md:grid-cols-2">
          {competencies.map((c) => (
            <StaggerItem as="li" key={c.title}>
              <div className="h-full rounded-xl border border-subtle bg-surface-subtle p-6">
                <h3 className="text-heading-sm">{c.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {c.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-sm border border-subtle bg-surface-raised px-2 py-0.5 text-caption text-secondary"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
