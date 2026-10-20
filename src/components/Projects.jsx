import { PROJECTS } from "../data";
import ProjectCard from "./ProjectCard";
import Section from "./ui/Section";

// PROJECTS is newest first: the first is featured, the next two are primary, the rest compact
const variantOf = (index) => (index === 0 ? "featured" : index < 3 ? "primary" : "compact");
const SPAN = {
  featured: "md:col-span-2 lg:col-span-6",
  primary: "lg:col-span-3",
  compact: "lg:col-span-2",
};

// The centrepiece: a surface band with a 6-column grid (featured full width, primary halves, compact thirds).
// grid-cols-1 + min-w-0 keep the single phone column from growing to the screenshots' intrinsic 1600px width.
function Projects() {
  return (
    <Section id="projects" title="Projects" tone="surface" size="lg">
      <ul role="list" className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-6 lg:gap-y-20">
        {PROJECTS.map((project, i) => {
          const variant = variantOf(i);
          return (
            <li key={project.title} className={`min-w-0 ${SPAN[variant]}`}>
              <ProjectCard project={project} variant={variant} latest={i === 0} />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export default Projects;
