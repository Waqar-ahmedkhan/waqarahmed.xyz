"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { RESUME_DATA } from "@/data/resume-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/project-card";
import { SimpleView } from "@/components/simple-view";
import { ViewSwitch, ViewMode } from "@/components/view-switch";
import { GlobeIcon, MailIcon, ExternalLinkIcon, ArrowRightIcon } from "lucide-react";
import ChatbotWidget from "@/components/ChatbotWidget"; // Import chatbot component

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
      setIsMobile(window.innerWidth < 640); // Adjusted mobile breakpoint
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
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 rounded-xl border border-border p-4 sm:p-5 md:p-6 shadow-sm transition-all hover:shadow-md animate-fade-in ">
            <div className="flex-1  space-y-2 sm:space-y-3 md:space-y-4 w-full">
              <h1 className="text-2xl  sm:text-3xl md:text-4xl font-extrabold tracking-tight font-sans">
                {RESUME_DATA.name}
              </h1>
              <p className="max-w-md text-pretty font-mono text-sm sm:text-base md:text-lg text-muted-foreground print:text-[12px] my-2 sm:my-3 md:my-4">
                {RESUME_DATA.about}
              </p>
              <p className="max-w-md items-center text-pretty font-mono text-xs sm:text-sm md:text-base text-muted-foreground">
                <a
                  className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline transition-all"
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${RESUME_DATA.location} on Google Maps`}
                >
                  <GlobeIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" aria-hidden="true" />
                  <span>{RESUME_DATA.location}</span>
                </a>
              </p>
              <div className="flex gap-x-2 gap-y-2 pt-1 sm:pt-2 md:pt-3 font-mono text-xs sm:text-sm md:text-base text-muted-foreground print:hidden flex-wrap ">
                {RESUME_DATA.contact.email && (
                  <Button
                    variant="outline"
                    size={isMobile ? "sm" : "icon"}
                    asChild
                    className="transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    aria-label={`Send email to ${RESUME_DATA.name}`}
                  >
                    <a href={`mailto:${RESUME_DATA.contact.email}`}>
                      <MailIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </a>
                  </Button>
                )}
                {RESUME_DATA.contact.social.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size={isMobile ? "sm" : "icon"}
                    asChild
                    className="transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    aria-label={`Visit ${social.name} profile`}
                  >
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            <Avatar
              className={`${isMobile ? "mt-4" : ""} h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 rounded-xl border-2 border-border`}
            >
              <AvatarImage
                alt={RESUME_DATA.name}
                src={RESUME_DATA.avatarUrl}
                className="rounded-xl"
              />
              <AvatarFallback className="text-xl sm:text-2xl md:text-3xl">
                {RESUME_DATA.initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* About Section */}
          <Section
            className="my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">About</h2>
            <p className="text-pretty font-mono text-sm sm:text-base md:text-lg text-muted-foreground print:text-[12px] mt-4 sm:mt-5 md:mt-6">
              {RESUME_DATA.summary}
            </p>
          </Section>

          {/* Key Highlights Section */}
          <Section
            className="my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">
              Key Highlights
            </h2>
            <div className="-mx-2 sm:-mx-3 md:-mx-4 grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
              {RESUME_DATA.keyHighlights.map((point, index) => (
                <Card
                  key={point.title}
                  className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4 p-4 sm:p-5 md:p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl">{point.icon}</div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg md:text-xl">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1 sm:mt-2 md:mt-3">
                      {point.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* Work Experience Section */}
          <Section
            className="my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">
              Work Experience
            </h2>
            {RESUME_DATA.work.map((work, index) => (
              <Card
                key={work.company}
                className="p-4 sm:p-5 md:p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader className="p-0 pb-3 sm:pb-4 md:pb-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 md:gap-x-3 text-sm sm:text-base md:text-lg">
                    <h3 className="inline-flex flex-col sm:flex-row sm:items-center justify-start gap-x-1 font-semibold leading-none">
                      <a
                        className={work.link ? "hover:underline transition-all" : ""}
                        href={work.link || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${work.company} website`}
                      >
                        {work.company}
                      </a>
                      <span className="inline-flex gap-x-1 mt-1 sm:mt-0">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs sm:text-sm md:text-base print:text-[8px] transition-transform hover:scale-105"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="text-xs sm:text-sm md:text-base tabular-nums text-muted-foreground">
                      {work.start} - {work.end ?? "Present"}
                    </div>
                  </div>
                  <h4 className="font-mono text-xs sm:text-sm md:text-base leading-none print:text-[12px] mt-1 sm:mt-2 md:mt-3">
                    {work.title}
                  </h4>
                </CardHeader>
                <CardContent className="mt-2 sm:mt-3 md:mt-4 p-0 sm:p-0">
                  <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base print:text-[10px]">
                    {work.description}
                  </p>
                  {work.bulletPoints && (
                    <ul className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base print:text-[10px]">
                      {work.bulletPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="mb-1 sm:mb-2 md:mb-3 flex items-center gap-x-2"
                        >
                          <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 text-muted-foreground" />
                          <span>{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </Section>

          {/* Education Section */}
          <Section
            className="my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">
              Education
            </h2>
            {RESUME_DATA.education.map((education, index) => (
              <Card
                key={education.school}
                className="p-4 sm:p-5 md:p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader className="p-0 pb-3 sm:pb-4 md:pb-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 md:gap-x-3 text-sm sm:text-base md:text-lg">
                    <h3 className="font-semibold leading-none">
                      {education.school}
                    </h3>
                    <div className="text-xs sm:text-sm md:text-base tabular-nums text-muted-foreground">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2 sm:mt-3 md:mt-4 p-0 sm:p-0 print:text-[12px]">
                  {education.degree}
                  {education.description && (
                    <p className="mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground">
                      {education.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </Section>

          {/* Skills Section */}
          <Section
            className="my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">Skills</h2>
            <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3">
              {RESUME_DATA.skills.map((skill, index) => (
                <Badge
                  className="print:text-[10px] transition-transform hover:scale-105 text-xs sm:text-sm md:text-base"
                  key={skill}
                  style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Section>

          {/* Certifications Section */}
          <Section
            className="my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.55s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">
              Certifications
            </h2>
            {RESUME_DATA.certifications.map((certification, index) => (
              <Card
                key={certification.title}
                className="p-4 sm:p-5 md:p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader className="p-0 pb-2 sm:pb-3 md:pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 md:gap-x-3 text-sm sm:text-base md:text-lg">
                    <h3 className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 font-semibold leading-none">
                      {certification.title}
                      <a
                        href={certification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center hover:underline transition-all"
                        aria-label={`View ${certification.title} certificate`}
                      >
                        <ExternalLinkIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      </a>
                    </h3>
                    <div className="text-xs sm:text-sm md:text-base tabular-nums text-muted-foreground">
                      {certification.year}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-1 sm:mt-2 md:mt-3 p-0 sm:p-0">
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    {certification.issuer}
                  </p>
                  {certification.description && (
                    <p className="mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground">
                      {certification.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </Section>

          {/* Projects Section */}
          <Section
            className="print-force-new-page scroll-mb-16 my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">
              Projects
            </h2>
            <div className="-mx-2 sm:-mx-3 md:-mx-4 grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
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

          {/* Blog Section */}
          <Section
            className="my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.7s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">Blog</h2>
            <div className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base text-muted-foreground">
              {blogProjects.length > 0
                ? "Check out my latest insights and articles:"
                : "Blog posts coming soon! Check out my Medium profile for updates."}
            </div>
            <div className="-mx-2 sm:-mx-3 md:-mx-4 grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
              {blogProjects.map((post, index) => (
                <Card
                  key={post.title}
                  className="p-4 sm:p-5 md:p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <CardHeader className="p-0 pb-2 sm:pb-3 md:pb-4">
                    <h3 className="font-semibold text-base sm:text-lg md:text-xl">
                      {post.title}
                    </h3>
                    <div className="text-xs sm:text-sm md:text-base tabular-nums text-muted-foreground">
                      Medium | 2024
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 pt-2 sm:pt-3 md:pt-4">
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-2 sm:mb-3 md:mb-4">
                      {generateExcerpt(post.description)}
                    </p>
                    {post.link && (
                      <Button
                        variant="link"
                        asChild
                        className="p-0 h-auto hover:underline transition-all text-xs sm:text-sm md:text-base"
                        aria-label={`Read more about ${post.title}`}
                      >
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read More{" "}
                          <ArrowRightIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          {/* Achievements Section */}
          <Section
            className="my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">
              Achievements
            </h2>
            {RESUME_DATA.achievements.map((achievement, index) => (
              <Card
                key={achievement.title}
                className="p-4 sm:p-5 md:p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader className="p-0 pb-2 sm:pb-3 md:pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 md:gap-x-3 text-sm sm:text-base md:text-lg">
                    <h3 className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-3 font-semibold leading-none">
                      {achievement.title}
                      {Array.from(achievement.reference as readonly { url: string }[]).map(
                        (ref) => (
                          <a
                            key={ref.url}
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center hover:underline transition-all"
                            aria-label={`View reference for ${achievement.title}`}
                          >
                            <ExternalLinkIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                          </a>
                        )
                      )}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="mt-1 sm:mt-2 md:mt-3 p-0 sm:p-0">
                  {achievement.by} | {achievement.year}
                  {achievement.description && (
                    <p className="mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground">
                      {achievement.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </Section>

          {/* Volunteer Experience Section */}
          <Section
            className="my-8 sm:my-10 md:my-12 animate-fade-in"
            style={{ animationDelay: "0.9s" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">
              Volunteer Experience
            </h2>
            {RESUME_DATA.volunteerExperience.map((volunteer, index) => (
              <Card
                key={volunteer.organization}
                className="p-4 sm:p-5 md:p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader className="p-0 pb-3 sm:pb-4 md:pb-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 md:gap-x-3 text-sm sm:text-base md:text-lg">
                    <h3 className="font-semibold leading-none">
                      {volunteer.organization}
                    </h3>
                    <div className="text-xs sm:text-sm md:text-base tabular-nums text-muted-foreground">
                      {volunteer.start} - {volunteer.end ?? "Present"}
                    </div>
                  </div>
                  <h4 className="font-mono text-xs sm:text-sm md:text-base leading-none print:text-[12px] mt-1 sm:mt-2 md:mt-3">
                    {volunteer.role}
                  </h4>
                </CardHeader>
                <CardContent className="mt-2 sm:mt-3 md:mt-4 p-0 sm:p-0">
                  <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base print:text-[10px]">
                    {volunteer.description}
                  </p>
                  {volunteer.bulletPoints && (
                    <ul className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base print:text-[10px]">
                      {volunteer.bulletPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="mb-1 sm:mb-2 md:mb-3 flex items-center gap-x-2"
                        >
                          <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 text-muted-foreground" />
                          <span>{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </Section>
        </section>

        <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 z-50 -translate-x-1/2">
          <ViewSwitch
            currentView={viewMode}
            onChange={handleViewModeChange}
            className="transition-transform hover:scale-105 shadow-md rounded-full p-1 sm:p-2 md:p-3 bg-background"
            aria-label="Switch portfolio view mode"
          />
        </div>

        {/* Add Chatbot Widget */}
        <ChatbotWidget />
      </main>
    </div>
  );
}