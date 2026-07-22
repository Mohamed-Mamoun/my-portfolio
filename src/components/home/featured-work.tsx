import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "#content";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectAccent } from "@/components/content/project-accent";
import { PhoneFrame } from "@/components/content/phone-frame";
import { cn } from "@/lib/utils";

/**
 * Asymmetric and editorial, not a uniform card grid. The lead project
 * gets room to state its problem; the rest are scannable.
 */
export function FeaturedWork() {
  const [lead, ...supporting] = projects;
  if (!lead) return null;

  return (
    <Section space="lg" className="border-t border-subtle">
      <Container>
        <SectionHeading
          label="Selected work"
          title="Products I shipped end to end"
          href="/projects"
          hrefLabel="All projects"
        />

        <Stagger className="mt-12 flex flex-col gap-6">
          <StaggerItem>
            <LeadCard project={lead} />
          </StaggerItem>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supporting.map((project) => (
              <StaggerItem key={project.slug}>
                <SupportingCard project={project} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}

const cardBase = cn(
  "group relative flex h-full flex-col overflow-hidden rounded-xl border border-subtle bg-surface-raised edge-highlight",
  "transition-[transform,border-color,box-shadow] duration-300 ease-[--ease-out-quint]",
  "hover:-translate-y-1 hover:border-default hover:shadow-lg",
  "focus-within:border-accent-border focus-within:shadow-lg",
);

function LeadCard({ project }: { project: Project }) {
  return (
    <article className={cn(cardBase, "lg:flex-row")}>
      <div className="flex flex-1 flex-col justify-center p-8 sm:p-12">
        <ProjectMeta project={project} />
        <h3 className="mt-4 text-display-lg">
          {/* Stretched link: the whole card is the target, but the
              accessible name comes from the heading alone. */}
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-md text-body text-secondary">
          {project.problem}
        </p>
        <TechList items={project.stack} className="mt-6" />
        <p className="mt-8 inline-flex items-center gap-1.5 text-body-sm font-medium text-accent-text">
          Read the case study
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </p>
      </div>

      {/* Screenshots when they exist; otherwise the brand mark on a
          tinted panel, so a logo-only project still leads with weight. */}
      {project.screens?.[0] ? (
        <div className="relative flex shrink-0 items-end justify-center overflow-hidden border-t border-subtle bg-surface-subtle px-8 pt-12 lg:w-[22rem] lg:border-l lg:border-t-0">
          <ProjectAccent hue={project.hue} />
          <PhoneFrame
            src={project.screens[0].src}
            alt={project.screens[0].alt}
            variant="peek"
            priority
            sizes="224px"
            className="relative w-56 transition-transform duration-500 ease-[--ease-out-quint] group-hover:-translate-y-2"
          />
        </div>
      ) : (
        <div className="relative flex shrink-0 items-center justify-center overflow-hidden border-t border-subtle bg-surface-subtle p-12 lg:w-[22rem] lg:border-l lg:border-t-0">
          <ProjectAccent hue={project.hue} />
          {project.logo ? (
            <Image
              src={project.logo}
              alt=""
              width={160}
              height={160}
              priority
              sizes="160px"
              className="relative size-32 rounded-2xl border border-subtle bg-surface-raised object-contain p-4 shadow-lg sm:size-40"
            />
          ) : (
            <span
              aria-hidden="true"
              className="relative grid size-32 place-items-center rounded-2xl border border-default bg-surface-raised text-display-lg text-tertiary shadow-lg sm:size-40"
            >
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      )}
    </article>
  );
}

function SupportingCard({ project }: { project: Project }) {
  return (
    <article className={cardBase}>
      <div className="flex items-center justify-center border-b border-subtle bg-surface-subtle py-10">
        {project.logo ? (
          <Image
            src={project.logo}
            alt=""
            width={64}
            height={64}
            className="size-16 rounded-lg object-contain"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-16 place-items-center rounded-lg border border-default text-heading-md text-tertiary"
          >
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <ProjectMeta project={project} />
        <h3 className="mt-3 text-heading-md">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-body-sm text-secondary">{project.summary}</p>
        <TechList items={project.stack} className="mt-5 pt-1" />
      </div>
    </article>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <p className="flex items-center gap-2 text-label uppercase text-tertiary">
      <span>{project.category}</span>
      <span aria-hidden="true">·</span>
      <span>{project.year}</span>
    </p>
  );
}

function TechList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("mt-auto flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-sm border border-subtle bg-surface-subtle px-2 py-0.5 text-caption text-secondary"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

