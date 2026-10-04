import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RESUME_DATA } from "@/data/resume-data";

interface AboutSectionProps {
  animationDelay?: string;
}

export function AboutSection({ animationDelay = "0.1s" }: AboutSectionProps) {
  const focusAreas = [
    "AI research",
    "Systems architecture",
    "Customer & product understanding",
    "AI-powered products",
    "Agentic workflows",
    "Human-in-the-loop automation",
    "Pashto language AI",
    "Secure SaaS systems",
  ];

  return (
    <Section
      className="animate-fade-in"
      style={{ animationDelay }}
    >
      <SectionHeading>About</SectionHeading>
      <div className="rounded-lg border border-border/80 bg-card/70 p-4 transition-colors duration-300 hover:border-foreground/15 sm:p-5">
          <div className="space-y-4">
            <p className="max-w-3xl text-xs leading-6 sm:text-sm sm:leading-7 text-muted-foreground">
              {RESUME_DATA.summary}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-md border border-border/60 bg-secondary/80 px-2 py-1 text-[10px] font-medium text-secondary-foreground sm:text-xs"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
      </div>
    </Section>
  );
}
