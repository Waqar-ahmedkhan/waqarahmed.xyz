"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { ArrowRightIcon } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";

interface VolunteerExperienceSectionProps {
  animationDelay?: string;
}

export function VolunteerExperienceSection({
  animationDelay = "0.9s",
}: VolunteerExperienceSectionProps) {
  return (
    <Section
      className="my-6 sm:my-8 md:my-10 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-foreground">
        Volunteer Experience
      </h2>
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {RESUME_DATA.volunteerExperience.map((volunteer, index) => (
          <Card
            key={volunteer.organization}
            className="p-4 sm:p-5 border border-border hover:border-gray-700 transition-all duration-300"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <CardHeader className="p-0 pb-2 sm:pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 text-sm sm:text-base">
                <h3 className="font-semibold text-foreground">
                  {volunteer.organization}
                </h3>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {volunteer.start} - {volunteer.end ?? "Present"}
                </div>
              </div>
              <h4 className="font-mono text-xs sm:text-sm text-foreground mt-1">
                {volunteer.role}
              </h4>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                {volunteer.description}
              </p>
              {volunteer.bulletPoints && (
                <ul className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
                  {volunteer.bulletPoints.map((point, idx) => (
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