import { site } from "#content";
import { Container, Section } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function ContactCta() {
  return (
    <Section space="lg" className="border-t border-subtle">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-subtle bg-surface-subtle px-8 py-16 text-center sm:px-16 edge-highlight">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto size-[32rem] rounded-full bg-[radial-gradient(circle,var(--accent-subtle),transparent_65%)] blur-3xl"
            />
            <div className="relative">
              <h2 className="text-display-lg">Let&rsquo;s build something</h2>
              <p className="mx-auto mt-4 max-w-md text-body text-secondary">
                Open to senior mobile roles and selected freelance work. I reply to everything
                within two working days.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href={`mailto:${site.email}`} size="lg" external>
                  {site.email}
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  More ways to reach me
                </ButtonLink>
              </div>
              <p className="mt-6 text-caption text-tertiary">
                {site.location} · {site.timezone} · open to remote
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
