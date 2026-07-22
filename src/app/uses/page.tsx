import type { Metadata } from "next";
import { uses } from "#content";
import { Container, Section } from "@/components/layout/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, software, and services I build with day to day.",
  alternates: { canonical: "/uses" },
};

export default function UsesPage() {
  // Empty groups are skipped rather than shown as "coming soon".
  const groups = uses.filter((group) => group.items.length > 0);

  return (
    <Section space="lg">
      <Container size="content">
        <Reveal>
          <header>
            <p className="text-label uppercase text-accent-text">Uses</p>
            <h1 className="mt-3 text-display-xl">What I build with</h1>
            <p className="mt-5 text-body-lg text-secondary">
              Tools earn their place by staying out of the way. This list changes slowly, which
              is the point.
            </p>
          </header>
        </Reveal>

        <div className="mt-14 flex flex-col gap-14">
          {groups.map((group) => (
            <section key={group.heading}>
              <Reveal>
                <h2 className="text-heading-lg">{group.heading}</h2>
              </Reveal>
              <Stagger as="ul" className="mt-5 flex flex-col divide-y divide-subtle border-y border-subtle">
                {group.items.map((item) => (
                  <StaggerItem as="li" key={item.name} className="py-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                      <h3 className="w-48 shrink-0 text-body font-medium text-primary">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-sm text-accent-text underline decoration-accent-border underline-offset-2 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                          >
                            {item.name}
                          </a>
                        ) : (
                          item.name
                        )}
                      </h3>
                      <p className="text-body-sm text-secondary">{item.note}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
