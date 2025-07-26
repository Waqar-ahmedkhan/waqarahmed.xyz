"use client";

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
  isMobile: boolean;
  animationDelay?: string;
}

export function ProjectsSection({
  projects,
  isMobile,
  animationDelay = "0.6s",
}: ProjectsSectionProps) {
  return (
    <Section
      className="my-6 sm:my-8 md:my-10 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-foreground">
        Projects
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
        {projects
          .filter((project) => !project.tech_stack.includes("Medium"))
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
                isMobile={isMobile}
              />
            </div>
          ))}
      </div>
    </Section>
  );
}