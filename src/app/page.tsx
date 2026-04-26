import { RESUME_DATA } from "@/data/resume-data";
import { SimpleView } from "@/components/simple-view";
import { HeaderSection } from "@/components/HeaderSection";
import { AboutSection } from "@/components/AboutSection";
import { KeyHighlightsSection } from "@/components/keyHightlightsSection";
import { WorkExperienceSection } from "@/components/WorkExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ProjectsSection } from "@/components/ProjectSection";
import { BlogSection } from "@/components/BlogSection";
import { AchievementsSection } from "@/components/AchivementsSection";
import { VolunteerExperienceSection } from "@/components/VolunteerExperienceSection";
import { PortfolioViewShell } from "@/components/portfolio-view-shell";

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  link?: string;
}

const EXCERPT_MAX_LENGTH = 150;

export default function Page() {
  const projects: Project[] = RESUME_DATA.projects.map((proj, index) => ({
    id: index + 1,
    title: proj.title,
    description: proj.description,
    tech_stack: Array.from(proj.techStack),
    link: proj.link?.href,
  }));

  const blogProjects = projects.filter(
    (project) =>
      project.tech_stack.includes("Blog") ||
      project.tech_stack.includes("Medium")
  );

  const generateExcerpt = (text: string, maxLength: number = EXCERPT_MAX_LENGTH) =>
    text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;

  return (
    <PortfolioViewShell
      simple={<SimpleView />}
      detailed={
        <section className="mx-auto w-full max-w-5xl space-y-6 text-foreground sm:space-y-8 md:space-y-10 print:bg-white print:text-black">
          <HeaderSection />
          <AboutSection />
          <KeyHighlightsSection />
          <WorkExperienceSection />
          <EducationSection />
          <ProjectsSection projects={projects} />
          <BlogSection blogProjects={blogProjects} generateExcerpt={generateExcerpt} />
          <SkillsSection />
          <CertificationsSection />
          <AchievementsSection />
          <VolunteerExperienceSection />
        </section>
      }
    />
  );
}
