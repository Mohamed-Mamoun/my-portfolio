import type { Metadata } from "next";
import { site, socials } from "#content";
import { Container, Section } from "@/components/layout/container";
import { ContactForm } from "@/components/features/contact-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — open to senior mobile roles and selected freelance work.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section space="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-label uppercase text-accent-text">Contact</p>
            <h1 className="mt-3 text-display-xl">Let&rsquo;s talk</h1>
            <p className="mt-5 text-body-lg text-secondary">
              Open to senior mobile engineering roles and selected freelance work.
            </p>

            {/* What happens next, and when — the previous form asked for
                three fields and promised nothing. */}
            <dl className="mt-10 flex flex-col gap-5 border-t border-subtle pt-8 text-body-sm">
              <div>
                <dt className="text-label uppercase text-tertiary">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="rounded-sm text-body text-accent-text underline decoration-accent-border underline-offset-2 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-label uppercase text-tertiary">Response time</dt>
                <dd className="mt-1 text-secondary">Within two working days, always.</dd>
              </div>
              <div>
                <dt className="text-label uppercase text-tertiary">Where I am</dt>
                <dd className="mt-1 text-secondary">
                  {site.location} · {site.timezone} · comfortable working async
                </dd>
              </div>
              <div>
                <dt className="text-label uppercase text-tertiary">Elsewhere</dt>
                <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="rounded-sm text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {social.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
