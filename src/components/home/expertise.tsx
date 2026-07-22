import Link from "next/link";
import { competencies, projects } from "#content";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const titleBySlug = new Map(projects.map((p) => [p.slug, p.title]));

/**
 * "No self-assigned percentages" — the previous site's refusal to draw
 * skill bars was a genuine seniority signal, so the stance survives.
 *
 * What changes: `provenIn` used to be a string. It's now a project
 * slug, so every claim links to the work that proves it.
 */
export function Expertise() {
  return (
    <Section space="lg" className="border-t border-subtle bg-surface-subtle">
      <Container>
        <SectionHeading
          label="Expertise"
          title="What I'm trusted with"
          description="No self-assigned percentages. Each of these links to the work that proves it."
          href="/skills"
          hrefLabel="All skills"
        />

        <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-2">
          {competencies.map((c) => (
            <StaggerItem as="li" key={c.title}>
              <div className="flex h-full flex-col rounded-xl border border-subtle bg-surface-raised p-7 edge-highlight">
                <h3 className="text-heading-md">{c.title}</h3>
                <p className="mt-3 text-body-sm text-secondary">{c.blurb}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {c.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-sm border border-subtle bg-surface-subtle px-2 py-0.5 text-caption text-secondary"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-6 text-caption text-tertiary">
                  <span className="uppercase tracking-wide">Proven in</span>{" "}
                  {c.provenIn.map((slug, i) => (
                    <span key={slug}>
                      {i > 0 ? <span aria-hidden="true"> · </span> : null}
                      <Link
                        href={`/projects/${slug}`}
                        className="rounded-sm text-accent-text underline decoration-accent-border underline-offset-2 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {titleBySlug.get(slug) ?? slug}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
