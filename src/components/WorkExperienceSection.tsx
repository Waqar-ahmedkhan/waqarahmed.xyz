"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { ArrowRightIcon } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";

interface WorkExperienceSectionProps {
  animationDelay?: string;
}

export function WorkExperienceSection({ animationDelay = "0.3s" }: WorkExperienceSectionProps) {
  return (
    <Section
      className="my-6 sm:my-8 md:my-10 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-foreground">
        Work Experience
      </h2>
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {RESUME_DATA.work.map((work, index) => (
          <Card
            key={work.company}
            className="p-4 sm:p-5 border border-border hover:border-gray-700 transition-all duration-300"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <CardHeader className="p-0 pb-2 sm:pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 text-sm sm:text-base">
                <h3 className="inline-flex flex-col sm:flex-row sm:items-center justify-start gap-x-1 font-semibold text-foreground">
                  <a
                    className={work.link ? "hover:text-blue-400 transition-colors duration-200" : ""}
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
                        className="text-[10px] sm:text-xs print:text-[8px]"
                        key={badge}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                </h3>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {work.start} - {work.end ?? "Present"}
                </div>
              </div>
              <h4 className="font-mono text-xs sm:text-sm text-foreground mt-1">
                {work.title}
              </h4>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                {work.description}
              </p>
              {work.bulletPoints && (
                <ul className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
                  {work.bulletPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="mb-1 sm:mb-2 flex items-start gap-x-2"
                    >
                      <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-muted-foreground mt-1" />
                      <span>{point.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}