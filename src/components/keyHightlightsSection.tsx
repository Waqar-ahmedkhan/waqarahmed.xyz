"use client";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

interface KeyHighlightsSectionProps {
  animationDelay?: string;
}

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
        {RESUME_DATA.keyHighlights.map((point, index) => (
          <Card
            key={point.title}
            className="flex flex-col items-start gap-3 p-4 sm:p-5 border border-border hover:border-gray-700 transition-all duration-300"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <div className="text-xl sm:text-2xl md:text-3xl text-foreground">{point.icon}</div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-foreground">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {point.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}