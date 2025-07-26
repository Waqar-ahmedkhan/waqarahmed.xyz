"use client";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { Briefcase, Code, Users, Award, Rocket, BookOpen, Globe, Star } from "lucide-react";

interface KeyHighlightsSectionProps {
  animationDelay?: string;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Experience: Briefcase,
  Teaching: BookOpen,
  Community: Users,
  Certifications: Award,
  Hackathons: Rocket,
  "Open Source": Code,
  Innovation: Star,
  Startups: Globe,
};

export function KeyHighlightsSection({ animationDelay = "0.2s" }: KeyHighlightsSectionProps) {
  return (
    <Section
      className="my-6 sm:my-8 md:my-10 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-foreground">
        Key Highlights
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
        {RESUME_DATA.keyHighlights.map((point, index) => {
          const Icon = iconMap[point.title] || Star; // Fallback to Star icon
          return (
            <Card
              key={point.title}
              className="flex flex-col items-start gap-2 p-4 sm:p-5 h-[120px] sm:h-[140px] border border-border hover:border-gray-700 transition-all duration-300"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-foreground">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                  {point.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}