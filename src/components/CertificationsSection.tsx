"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

interface CertificationsSectionProps {
  animationDelay?: string;
}

export function CertificationsSection({ animationDelay = "0.55s" }: CertificationsSectionProps) {
  return (
    <Section
      className="my-6 sm:my-8 md:my-10 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-foreground">
        Certifications
      </h2>
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {RESUME_DATA.certifications.map((certification, index) => (
          <Card
            key={certification.title}
            className="p-4 sm:p-5 border border-border hover:border-gray-700 transition-all duration-300"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <CardHeader className="p-0 pb-2 sm:pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 text-sm sm:text-base">
                <h3 className="font-semibold text-foreground">
                  <a
                    href={certification.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-blue-400 transition-colors duration-200"
                  >
                    {certification.title}
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  </a>
                </h3>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {certification.year}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xs sm:text-sm text-foreground font-mono">
                {certification.issuer}
              </p>
              {certification.description && (
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                  {certification.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}