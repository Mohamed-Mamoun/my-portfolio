import type { Metadata } from "next";
import { projects } from "#content";
import { Container, Section } from "@/components/layout/container";
import { ProjectFilters } from "@/components/content/project-filters";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production Flutter products shipped end to end — e-learning, AI productivity, e-commerce, and payments.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const stacks = [...new Set(projects.flatMap((project) => project.stack))].sort();

  return (
    <Section space="lg">
      <Container>
        <Reveal>
          <header className="max-w-2xl">
            <p className="text-label uppercase text-accent-text">Work</p>
            <h1 className="mt-3 text-display-xl">Products, not screenshots</h1>
            <p className="mt-5 text-body-lg text-secondary">
              Four production apps. Each case study covers the problem, the architecture, the
              trade-offs — and what I&rsquo;d do differently.
            </p>
          </header>
        </Reveal>

        <ProjectFilters projects={projects} stacks={stacks} />
      </Container>
    </Section>
  );
}
