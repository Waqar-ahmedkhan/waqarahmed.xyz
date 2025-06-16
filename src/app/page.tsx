"use client";
import { useState, useEffect } from "react";
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

export default function Page() {
  const [viewMode, setViewMode] = useState<ViewMode>("initial");
  const [projects] = useState<Project[]>(
    RESUME_DATA.projects.map((proj, index) => ({
      id: index + 1,
      title: proj.title,
      description: proj.description,
      tech_stack: Array.from(proj.techStack),
      link: proj.link?.href,
    }))
  );

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem("portfolioViewMode", mode);
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  };

  useEffect(() => {
    try {
      const savedViewMode = localStorage.getItem("portfolioViewMode") as ViewMode | null;
      if (savedViewMode && ["simple", "detailed"].includes(savedViewMode)) {
        setViewMode(savedViewMode);
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  }, []);

  // Helper function to generate a short excerpt from the title
  const generateExcerpt = (title: string) => {
    return title.length > 50 ? `${title.slice(0, 47)}...` : title;
  };

  if (viewMode === "initial") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8 animate-scale-in">
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl font-sans">
            Explore My Portfolio
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Choose a view mode to dive in
          </p>
        </div>
        <ViewSwitch
          currentView="simple"
          onChange={handleViewModeChange}
          size="large"
          className="transition-transform hover:scale-105 shadow-md rounded-full p-2 bg-background"
        />
      </div>
    );
  }

  if (viewMode === "simple") {
    return (
      <div className="animate-scale-in">
        <SimpleView />
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-8">
          <ViewSwitch
            currentView={viewMode}
            onChange={handleViewModeChange}
            className="transition-transform hover:scale-105 shadow-md rounded-full p-2 bg-background"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-scale-in bg-background">
      <main className="container relative mx-auto min-h-screen scroll-my-12 overflow-auto p-6 sm:p-8 md:p-20 print:p-12">
        <section className="mx-auto w-full max-w-3xl space-y-12 rounded-2xl text-foreground print:bg-white print:text-black">
          <div className="flex items-center justify-between gap-8 rounded-xl border border-border px-6 py-3 shadow-sm transition-all hover:shadow-md animate-fade-in">
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight font-sans">{RESUME_DATA.name}</h1>
              <p className="max-w-md text-pretty font-mono  text-muted-foreground print:text-[12px] my-3">
                {RESUME_DATA.about}
              </p>
              <p className="max-w-md items-center text-pretty font-mono text-sm text-muted-foreground">
                <a
                  className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline transition-all"
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Location"
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
                    className="transition-transform hover:scale-110"
                    aria-label={`Email ${RESUME_DATA.name}`}
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
                    className="transition-transform hover:scale-110"
                    aria-label={social.name}
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

          <Section className="my-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold font-sans">About</h2>
              <p className="text-pretty font-mono  text-muted-foreground print:text-[12px] mt-6">
                {RESUME_DATA.summary}
              </p>
            </div>
          </Section>

          <Section className="my-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-extrabold font-sans">Key Highlights</h2>
            <div className="-mx-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4 print:gap-2">
              {RESUME_DATA.keyHighlights.map((point) => (
                <Card
                  key={point.title}
                  className="flex flex-col items-start gap-3 p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
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

          <Section className="my-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-extrabold font-sans">Work Experience</h2>
            {RESUME_DATA.work.map((work) => (
              <Card
                key={work.company}
                className="p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a
                        className="hover:underline transition-all"
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
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
                      {work.bulletPoints.map(
                        (
                          point: { text: string; links?: { url: string }[] },
                          index: number
                        ) => (
                          <li key={index} className="mb-2 flex items-center gap-x-2">
                            <ArrowRightIcon className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                            <span className="flex items-center gap-x-1">
                              {point.text}
                              {point.links?.map((link: { url: string }, linkIndex: number) => (
                                <a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center hover:underline transition-all"
                                >
                                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                                </a>
                              ))}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </Section>

          <Section className="my-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-extrabold font-sans">Education</h2>
            {RESUME_DATA.education.map((education) => (
              <Card
                key={education.school}
                className="p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
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
                </CardContent>
              </Card>
            ))}
          </Section>

          <Section className="my-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-extrabold font-sans">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.skills.map((skill) => (
                <Badge
                  className="print:text-[10px] transition-transform hover:scale-105"
                  key={skill}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Section>

          <Section className="print-force-new-page scroll-mb-16 my-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-extrabold font-sans">Projects</h2>
            <div className="-mx-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tech_stack}
                  link={project.link}
                />
              ))}
            </div>
          </Section>

          <Section className="my-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-2xl font-extrabold font-sans">Blog</h2>
            <div className="-mx-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
              {RESUME_DATA.publications?.map((post) => (
                <Card
                  key={post.title}
                  className="p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                >
                  <CardHeader>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <div className="text-sm tabular-nums text-muted-foreground">
                      {post.publisher} | {post.year}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{generateExcerpt(post.title)}</p>
                    {post.link && (
                      <Button
                        variant="link"
                        asChild
                        className="p-0 h-auto hover:underline transition-all"
                      >
                        <a href={post.link.href} target="_blank" rel="noopener noreferrer">
                          Read More <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )) ?? (
                <p className="text-sm text-muted-foreground">
                  No blog posts available yet.
                </p>
              )}
            </div>
          </Section>

          <Section className="my-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-2xl font-extrabold font-sans">Achievements</h2>
            {RESUME_DATA.achievements.map((achievement) => (
              <Card
                key={achievement.title}
                className="p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="flex items-center gap-x-2 font-semibold leading-none">
                      {achievement.title}
                      {achievement.reference.map((ref) => (
                        <a
                          key={ref.url}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center hover:underline transition-all"
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                      ))}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="mt-4">{achievement.by}</CardContent>
              </Card>
            ))}
          </Section>
        </section>

        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-8">
          <ViewSwitch
            currentView={viewMode}
            onChange={handleViewModeChange}
            className="transition-transform hover:scale-105 shadow-md rounded-full p-2 bg-background"
          />
        </div>
      </main>
    </div>
  );
}