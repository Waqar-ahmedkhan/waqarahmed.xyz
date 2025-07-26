"use client";

import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

interface AboutSectionProps {
  animationDelay?: string;
}

export function AboutSection({ animationDelay = "0.1s" }: AboutSectionProps) {
  return (
    <Section
      className="my-6 sm:my-8 md:my-10 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-foreground">
        About
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
        {RESUME_DATA.summary}
      </p>
    </Section>
  );
}