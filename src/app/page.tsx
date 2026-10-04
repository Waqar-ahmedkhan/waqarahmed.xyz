import { RESUME_DATA } from "@/data/resume-data";
import { SimpleView } from "@/components/simple-view";
import { HeaderSection } from "@/components/HeaderSection";
import { GitHubContributionsSection } from "@/components/GitHubContributionsSection";
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
import { ProjectUniverse } from "@/components/project-universe";

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
        <div className="mx-auto w-full max-w-5xl space-y-4 print:block">
        <section className="min-w-0 space-y-6 text-foreground sm:space-y-8 md:space-y-10 print:bg-white print:text-black">
          <div id="profile" className="scroll-mt-6"><HeaderSection /></div>
          <ProjectUniverse projects={[0, 1, 8, 4, 6].map((index) => ({
            techStack: RESUME_DATA.projects[index].techStack.slice(0, 4),
            link: RESUME_DATA.projects[index].link,
          }))} />
          <GitHubContributionsSection username={RESUME_DATA.githubUsername}
            bookingUrl={RESUME_DATA.bookingUrl} email={RESUME_DATA.contact.email} />
          <div id="research" className="scroll-mt-6"><AboutSection /></div>
          <KeyHighlightsSection />
          <div id="experience" className="scroll-mt-6"><WorkExperienceSection /></div>
          <EducationSection />
          <div id="projects" className="scroll-mt-6"><ProjectsSection projects={projects} /></div>
          <BlogSection blogProjects={blogProjects} generateExcerpt={generateExcerpt} />
          <SkillsSection />
          <CertificationsSection />
          <AchievementsSection />
          <VolunteerExperienceSection />
        </section>
        </div>
      }
    />
  );
}
