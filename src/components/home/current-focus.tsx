import Link from "next/link";
import { now, experience } from "#content";
import { Container, Section } from "@/components/layout/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";

export function CurrentFocus() {
  return (
    <Section space="lg" className="border-t border-subtle">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="text-label uppercase text-accent-text">Right now</p>
              <h2 className="mt-3 text-display-lg">What I&rsquo;m working on</h2>
            </Reveal>

            <Stagger as="ul" className="mt-8 flex flex-col divide-y divide-subtle border-y border-subtle">
              {now.items.map((item) => (
                <StaggerItem as="li" key={item.label} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-6">
                  <span className="w-24 shrink-0 text-label uppercase text-tertiary">{item.label}</span>
                  <span className="text-body text-secondary">{item.value}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <p className="mt-6 text-caption text-tertiary">
                Updated {formatDate(now.updated)} ·{" "}
                <Link
                  href="/now"
                  className="rounded-sm text-accent-text underline decoration-accent-border underline-offset-2 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  full /now page
                </Link>
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="text-label uppercase text-accent-text">Experience</p>
              <h2 className="mt-3 text-display-lg">Where I&rsquo;ve been</h2>
            </Reveal>

            <Stagger as="ul" className="mt-8 flex flex-col">
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

                  <div className="pb-8">
                    <p className="font-mono text-caption text-tertiary">{role.period}</p>
                    <h3 className="mt-1 text-heading-sm">{role.role}</h3>
                    <p className="text-body-sm text-secondary">{role.company}</p>
                    <p className="mt-1.5 text-body-sm text-tertiary">{role.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </Section>
  );
}
