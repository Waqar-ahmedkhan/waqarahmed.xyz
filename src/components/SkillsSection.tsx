
"use client";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

interface SkillsSectionProps {
  animationDelay?: string;
}

export function SkillsSection({ animationDelay = "0.5s" }: SkillsSectionProps) {
  return (
    <Section
      className="my-8 sm:my-10 md:my-12 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-sans">Skills</h2>
      <div className="mt-2 flex flex-wrap gap-1 sm:gap-2 md:gap-3">
        {RESUME_DATA.skills.map((skill, index) => (
          <Badge
            key={skill}
            className="px-1 py-0 text-[10px] sm:text-xs md:text-sm print:text-[8px] transition-transform hover:scale-105"
            variant="secondary"
            style={{ animationDelay: `${0.05 * (index + 1)}s` }}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </Section>
  );
}
