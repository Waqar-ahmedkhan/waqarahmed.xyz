
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { RESUME_DATA } from "@/data/resume-data";
import { ViewSwitch, ViewMode } from "@/components/view-switch";
import { SimpleView } from "@/components/simple-view";
import { ChatbotWidget } from "@/components/ChatbotWidget";
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

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  link?: string;
}

const EXCERPT_MAX_LENGTH = 150;

export default function Page() {
  const [viewMode, setViewMode] = useState<ViewMode>("initial");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects = useMemo<Project[]>(
    () =>
      RESUME_DATA.projects.map((proj: typeof RESUME_DATA.projects[number], index: number) => ({
        id: index + 1,
        title: proj.title,
        description: proj.description,
        tech_stack: Array.from(proj.techStack),
        link: proj.link?.href,
      })),
    []
  );

  const blogProjects = useMemo(
    () => projects.filter((project) => project.tech_stack.includes("Medium")),
    [projects]
  );

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem("portfolioViewMode", mode);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to save view mode to localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      const savedViewMode = localStorage.getItem("portfolioViewMode") as ViewMode | null;
      if (savedViewMode && ["simple", "detailed"].includes(savedViewMode)) {
        setViewMode(savedViewMode);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to read view mode from localStorage:", error);
      }
    }
  }, []);

  const generateExcerpt = useCallback(
    (text: string, maxLength: number = EXCERPT_MAX_LENGTH) => {
      return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
    },
    []
  );

  if (viewMode === "initial") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8 sm:px-6 md:px-8 animate-scale-in">
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-sans">
            Explore My Portfolio
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
            Choose a view mode to dive into my work
          </p>
        </div>
        <ViewSwitch
          currentView="simple"
          onChange={handleViewModeChange}
          size="large"
          className="transition-transform hover:scale-105 shadow-md rounded-full p-2 sm:p-3 md:p-4 bg-background"
          aria-label="Select portfolio view mode"
        />
      </div>
    );
  }

  if (viewMode === "simple") {
    return (
      <div className="animate-scale-in">
        <SimpleView />
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-8 md:bottom-10">
          <ViewSwitch
            currentView={viewMode}
            onChange={handleViewModeChange}
            className="transition-transform hover:scale-105 shadow-md rounded-full p-2 sm:p-3 md:p-4 bg-background"
            aria-label="Switch portfolio view mode"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-scale-in bg-background">
      <main className="container relative mx-auto min-h-screen scroll-my-12 overflow-auto p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 print:p-12">
        <section className="mx-auto w-full max-w-3xl space-y-8 sm:space-y-10 md:space-y-12 rounded-2xl text-foreground print:bg-white print:text-black">
          <HeaderSection isMobile={isMobile} />
          <AboutSection />
          <KeyHighlightsSection />
          <WorkExperienceSection />
          <EducationSection />
          <SkillsSection />
          <CertificationsSection />
          <ProjectsSection projects={projects} isMobile={isMobile} />
          <BlogSection blogProjects={blogProjects} generateExcerpt={generateExcerpt} />
          <AchievementsSection />
          <VolunteerExperienceSection />
        </section>

        <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 z-50 -translate-x-1/2">
          <ViewSwitch
            currentView={viewMode}
            onChange={handleViewModeChange}
            className="transition-transform hover:scale-105 shadow-md rounded-full p-1 sm:p-2 md:p-3 bg-background"
            aria-label="Switch portfolio view mode"
          />
        </div>

        <ChatbotWidget />
      </main>
    </div>
  );
}
