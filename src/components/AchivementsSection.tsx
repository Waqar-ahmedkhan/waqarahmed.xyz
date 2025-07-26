"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { ExternalLink } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";

interface AchievementsSectionProps {
  animationDelay?: string;
}

export function AchievementsSection({ animationDelay = "0.8s" }: AchievementsSectionProps) {
  return (
    <Section
      className="my-6 sm:my-8 md:my-10 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-foreground">
        Achievements
      </h2>
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {RESUME_DATA.achievements.map((achievement, index) => (
          <Card
            key={achievement.title}
            className="p-4 sm:p-5 border border-border hover:border-gray-700 transition-all duration-300"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <CardHeader className="p-0 pb-2 sm:pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 text-sm sm:text-base">
                <h3 className="flex items-center gap-x-1 font-semibold text-foreground">
                  <span>{achievement.title}</span>
                  {Array.from(achievement.reference as readonly { url: string }[]).map(
                    (ref) => (
                      <a
                        key={ref.url}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center hover:text-blue-400 transition-colors duration-200"
                        aria-label={`View reference for ${achievement.title}`}
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    )
                  )}
                </h3>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {achievement.by} | {achievement.year}
              </p>
              {achievement.description && (
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}