import { useCallback, useEffect, useRef, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ProjectModal from "./components/ProjectModal";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.dataset.section);
        });
      },
      { threshold: 0.35 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((key) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const setRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  return (
    <>
      <Nav active={activeSection} onNavigate={scrollTo} />
      <main>
        <Hero sectionRef={setRef("hero")} onNavigate={scrollTo} />
        <About sectionRef={setRef("about")} />
        <Skills sectionRef={setRef("skills")} />
        <Projects sectionRef={setRef("projects")} onSelect={setSelectedProject} />
        <Contact sectionRef={setRef("contact")} />
      </main>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
