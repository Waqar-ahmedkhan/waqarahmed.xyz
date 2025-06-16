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

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  link?: string;
}

const EXCERPT_MAX_LENGTH = 150; // Increased for more meaningful excerpts

export default function Page() {
  const [viewMode, setViewMode] = useState<ViewMode>("initial");

  // Use useMemo to prevent re-calculating projects on every render if RESUME_DATA doesn't change
  const projects = useMemo<Project[]>(
    () =>
      RESUME_DATA.projects.map((proj, index) => ({
        id: index + 1,
        title: proj.title,
        description: proj.description,
        tech_stack: Array.from(proj.techStack),
        link: proj.link?.href,
      })),
    [] // Empty dependency array means this runs once
  );

  // Filter blog projects once and memoize the result
  const blogProjects = useMemo(
    () => projects.filter((project) => project.tech_stack.includes("Medium")),
    [projects]
  );

  // Memoize the handleViewModeChange function using useCallback
  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem("portfolioViewMode", mode);
    } catch (error) {
      // In development, log the error without breaking the app
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to save view mode to localStorage:", error);
      }
    }
  }, []); // Empty dependency array means this function is created once

  // Effect to load view mode from localStorage only on initial mount
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
  }, []); // Empty dependency array means this runs once on mount

  // Memoize the generateExcerpt function
  const generateExcerpt = useCallback((text: string, maxLength: number = EXCERPT_MAX_LENGTH) => {
    return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
  }, []);

  // Early return for initial view mode
  if (viewMode === "initial") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8 animate-scale-in">
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl font-sans">
            Explore My Portfolio
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Choose a view mode to dive into my work
          </p>
        </div>
        <ViewSwitch
          currentView="simple"
          onChange={handleViewModeChange}
          size="large"
          className="transition-transform hover:scale-105 shadow-md rounded-full p-2 bg-background"
          aria-label="Select portfolio view mode"
        />
      </div>
    );
  }

  // Early return for simple view mode
  if (viewMode === "simple") {
    return (
      <div className="animate-scale-in">
        <SimpleView />
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-8">
          <ViewSwitch
            currentView={viewMode}
            onChange={handleViewModeChange}
            className="transition-transform hover:scale-105 shadow-md rounded-full p-2 bg-background"
            aria-label="Switch portfolio view mode"
          />
        </div>
      </div>
    );
  }

  // Detailed view mode
  return (
    <div className="animate-scale-in bg-background">
      <main className="container relative mx-auto min-h-screen scroll-my-12 overflow-auto p-6 sm:p-8 md:p-12 lg:p-20 print:p-12">
        <section className="mx-auto w-full max-w-3xl space-y-12 rounded-2xl text-foreground print:bg-white print:text-black">
          {/* Header Section */}
          <div className="flex items-center justify-between gap-8 rounded-xl border border-border px-6 py-3 shadow-sm transition-all hover:shadow-md animate-fade-in">
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight font-sans">{RESUME_DATA.name}</h1>
              <p className="max-w-md text-pretty font-mono text-muted-foreground print:text-[12px] my-3">
                {RESUME_DATA.about}
              </p>
              <p className="max-w-md items-center text-pretty font-mono text-sm text-muted-foreground">
                <a
                  className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline transition-all"
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${RESUME_DATA.location} on Google Maps`}
                >
                  <GlobeIcon className="h-4 w-4" aria-hidden="true" />
                  <span>{RESUME_DATA.location}</span>
                </a>
              </p>
              <div className="flex gap-x-2 pt-2 font-mono text-sm text-muted-foreground print:hidden">
                {RESUME_DATA.contact.email && (
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    aria-label={`Send email to ${RESUME_DATA.name}`}
                  >
                    <a href={`mailto:${RESUME_DATA.contact.email}`}>
                      <MailIcon className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {RESUME_DATA.contact.social.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    asChild
                    className="transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    aria-label={`Visit ${social.name} profile`}
                  >
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            <Avatar className="hidden h-36 w-36 rounded-xl border-2 border-border md:block">
              <AvatarImage
                alt={RESUME_DATA.name}
                src={RESUME_DATA.avatarUrl}
                className="rounded-xl"
              />
              <AvatarFallback className="text-2xl">{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
          </div>

          {/* About Section */}
          <Section className="my-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-extrabold font-sans">About</h2>
            <p className="text-pretty font-mono text-muted-foreground print:text-[12px] mt-6">
              {RESUME_DATA.summary}
            </p>
          </Section>

          {/* Key Highlights Section */}
          <Section className="my-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-extrabold font-sans">Key Highlights</h2>
            <div className="-mx-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
              {RESUME_DATA.keyHighlights.map((point, index) => (
                <Card
                  key={point.title}
                  className="flex flex-col items-start gap-3 p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="text-3xl">{point.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{point.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{point.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* Work Experience Section */}
          <Section className="my-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-extrabold font-sans">Work Experience</h2>
            {RESUME_DATA.work.map((work, index) => (
              <Card
                key={work.company}
                className="p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a
                        className={work.link ? "hover:underline transition-all" : ""}
                        href={work.link || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${work.company} website`}
                      >
                        {work.company}
                      </a>
                      <span className="inline-flex gap-x-1">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs print:text-[8px] transition-transform hover:scale-105"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="text-sm tabular-nums text-muted-foreground">
                      {work.start} - {work.end ?? "Present"}
                    </div>
                  </div>
                  <h4 className="font-mono text-sm leading-none print:text-[12px] mt-2">
                    {work.title}
                  </h4>
                </CardHeader>
                <CardContent className="mt-4">
                  <p className="mb-3 text-xs print:text-[10px]">{work.description}</p>
                  {work.bulletPoints && (
                    <ul className="mt-3 text-xs print:text-[10px]">
                      {work.bulletPoints.map((point, idx) => (
                        <li key={idx} className="mb-2 flex items-center gap-x-2">
                          <ArrowRightIcon className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
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
          <Section className="my-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-extrabold font-sans">Education</h2>
            {RESUME_DATA.education.map((education, index) => (
              <Card
                key={education.school}
                className="p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="font-semibold leading-none">{education.school}</h3>
                    <div className="text-sm tabular-nums text-muted-foreground">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-4 print:text-[12px]">
                  {education.degree}
                  {education.description && (
                    <p className="mt-2 text-xs text-muted-foreground">{education.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </Section>

          {/* Skills Section */}
          <Section className="my-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-2xl font-extrabold font-sans">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.skills.map((skill, index) => (
                <Badge
                  className="print:text-[10px] transition-transform hover:scale-105"
                  key={skill}
                  style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Section>

          {/* Projects Section */}
          <Section className="print-force-new-page scroll-mb-16 my-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-2xl font-extrabold font-sans">Projects</h2>
            <div className="-mx-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
              {projects
                .filter((project) => !project.tech_stack.includes("Medium"))
                .map((project, index) => (
                  <div key={project.id} style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
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

          {/* Blog Section */}
          <Section className="my-12 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <h2 className="text-2xl font-extrabold font-sans">Blog</h2>
            <div className="mb-4 text-sm text-muted-foreground">
              {blogProjects.length > 0
                ? "Check out my latest insights and articles:"
                : "Blog posts coming soon! Check out my Medium profile for updates."
              }
            </div>
            <div className="-mx-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
              {blogProjects.map((post, index) => (
                <Card
                  key={post.title}
                  className="p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <CardHeader>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <div className="text-sm tabular-nums text-muted-foreground">
                      Medium | 2024
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{generateExcerpt(post.description)}</p>
                    {post.link && (
                      <Button
                        variant="link"
                        asChild
                        className="p-0 h-auto hover:underline transition-all"
                        aria-label={`Read more about ${post.title}`}
                      >
                        <a href={post.link} target="_blank" rel="noopener noreferrer">
                          Read More <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          {/* Achievements Section */}
          <Section className="my-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <h2 className="text-2xl font-extrabold font-sans">Achievements</h2>
            {RESUME_DATA.achievements.map((achievement, index) => (
              <Card
                key={achievement.title}
                className="p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="flex items-center gap-x-2 font-semibold leading-none">
                      {achievement.title}
                      {Array.from(achievement.reference as readonly { url: string }[]).map((ref) => (
                        <a
                          key={ref.url}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center hover:underline transition-all"
                          aria-label={`View reference for ${achievement.title}`}
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                      ))}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="mt-4">
                  {achievement.by} | {achievement.year}
                  {achievement.description && (
                    <p className="mt-2 text-xs text-muted-foreground">{achievement.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </Section>
        </section>

        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-8">
          <ViewSwitch
            currentView={viewMode}
            onChange={handleViewModeChange}
            className="transition-transform hover:scale-105 shadow-md rounded-full p-2 bg-background"
            aria-label="Switch portfolio view mode"
          />
        </div>
      </main>
    </div>
  );
}