import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, site } from "#content";
import { Container, Section } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectAccent } from "@/components/content/project-accent";
import { PhoneFrame } from "@/components/content/phone-frame";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      {/* Per-project accent is scoped to this page, where it aids
          recognition instead of competing for attention. Hue only —
          lightness is fixed so every project reads at equal weight. */}
      <header className="relative overflow-hidden border-b border-subtle">
        <ProjectAccent hue={project.hue} />
        <Container className="relative py-16 sm:py-24">
          <Reveal>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 rounded-md text-body-sm text-tertiary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              All projects
            </Link>

            <p className="mt-8 text-label uppercase text-accent-text">{project.category}</p>
            <h1 className="mt-3 text-display-xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-body-lg text-secondary">{project.summary}</p>

            {project.links && project.links.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <ButtonLink key={link.href} href={link.href} external size="md">
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </ButtonLink>
                ))}
              </div>
            ) : null}
          </Reveal>
        </Container>
      </header>

      {/* At-a-glance strip — the scannable answer for a reviewer who
          has 30 seconds, before the prose that takes ten minutes. */}
      <Container className="border-b border-subtle py-8">
        <dl className="grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-label uppercase text-tertiary">Year</dt>
            <dd className="mt-1 text-body text-primary">{project.year}</dd>
          </div>
          <div>
            <dt className="text-label uppercase text-tertiary">Category</dt>
            <dd className="mt-1 text-body text-primary">{project.category}</dd>
          </div>
          <div>
            <dt className="text-label uppercase text-tertiary">Stack</dt>
            <dd className="mt-1 text-body text-primary">{project.stack.join(" · ")}</dd>
          </div>
        </dl>
      </Container>

      <Section space="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div className="prose">
              <h2>The problem</h2>
              <p>{project.problem}</p>

              <h2>The approach</h2>
              <p>{project.approach}</p>

              <h2>The outcome</h2>
              <p>{project.outcome}</p>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-label uppercase text-tertiary">Built with</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-subtle bg-surface-subtle px-2 py-0.5 text-caption text-secondary"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>

      {project.screens && project.screens.length > 0 ? (
        <Section
          space="md"
          className="relative overflow-hidden border-t border-subtle bg-surface-subtle"
        >
          <ProjectAccent hue={project.hue} />
          <Container size="wide" className="relative">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-heading-lg">The screens</h2>
              <p className="text-caption text-tertiary">
                {project.screens.length} screens · scroll to browse
              </p>
            </div>

            {/* Horizontal scroller with an alternating vertical offset —
                the stagger reads as a shelf of devices rather than a row
                of identical rectangles. Scrolling is contained here, so
                the page body never scrolls sideways. */}
            <Stagger
              as="ul"
              className="-mx-5 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
            >
              {project.screens.map((screen, i) => (
                <StaggerItem
                  as="li"
                  key={screen.src}
                  className={cn("shrink-0 snap-start", i % 2 === 1 && "sm:pt-10")}
                >
                  <PhoneFrame
                    src={screen.src}
                    alt={screen.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    sizes="(min-width: 640px) 224px, 176px"
                    className="w-44 transition-transform duration-500 ease-[--ease-out-quint] hover:-translate-y-2 sm:w-56"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      ) : null}

      {next ? (
        <Container className="border-t border-subtle py-12">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-lg p-2 transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span>
              <span className="text-label uppercase text-tertiary">Next project</span>
              <span className="mt-1 block text-heading-md text-primary">{next.title}</span>
            </span>
            <span aria-hidden="true" className="text-heading-md text-tertiary transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Container>
      ) : null}

      <StructuredData project={project} />
    </article>
  );
}

function StructuredData({ project }: { project: (typeof projects)[number] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: "MobileApplication",
    operatingSystem: "Android, iOS",
    description: project.summary,
    author: { "@type": "Person", name: site.name, url: site.url },
    ...(project.links?.[0] ? { url: project.links[0].href } : {}),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
