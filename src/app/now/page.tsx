import type { Metadata } from "next";
import Link from "next/link";
import { now } from "#content";
import { Container, Section } from "@/components/layout/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on at the moment — building, writing, and learning.",
  alternates: { canonical: "/now" },
};

export default function NowPage() {
  return (
    <Section space="lg">
      <Container size="content">
        <Reveal>
          <header>
            <p className="text-label uppercase text-accent-text">Now</p>
            <h1 className="mt-3 text-display-xl">What I&rsquo;m focused on</h1>
            <p className="mt-5 text-body-lg text-secondary">
              A snapshot of current work, kept honest by a date at the bottom. Inspired by{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-accent-text underline decoration-accent-border underline-offset-2 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Derek Sivers&rsquo; /now page
              </a>
              .
            </p>
          </header>
        </Reveal>

        <Stagger as="ul" className="mt-12 flex flex-col divide-y divide-subtle border-y border-subtle">
          {now.items.map((item) => (
            <StaggerItem as="li" key={item.label} className="py-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                <h2 className="w-32 shrink-0 text-label uppercase text-tertiary">{item.label}</h2>
                <p className="text-body text-secondary">{item.value}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-8 text-caption text-tertiary">
            Last updated <time dateTime={now.updated}>{formatDate(now.updated)}</time>.{" "}
            <Link
              href="/blog"
              className="rounded-sm text-accent-text underline decoration-accent-border underline-offset-2 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Recent writing
            </Link>{" "}
            is usually a better signal of what I&rsquo;m actually thinking about.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
