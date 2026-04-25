import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/project-card";

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  link?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  animationDelay?: string;
}

export function ProjectsSection({
  projects,
  animationDelay = "0.6s",
}: ProjectsSectionProps) {
  return (
    <Section
      className="my-4 sm:my-6 md:my-8 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-base sm:text-lg md:text-xl font-semibold font-sans text-foreground animate-fade-in-subtle">
        Projects
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
        {projects
          .filter(
            (project) =>
              !project.tech_stack.includes("Medium") &&
              !project.tech_stack.includes("Blog")
          )
          .map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tech_stack}
                link={project.link}
              />
            </div>
          ))}
      </div>
    </Section>
  );
}
