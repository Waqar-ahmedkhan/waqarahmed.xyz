import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

interface AboutSectionProps {
  animationDelay?: string;
}

export function AboutSection({ animationDelay = "0.1s" }: AboutSectionProps) {
  const focusAreas = [
    "Full-stack products",
    "SaaS dashboards",
    "Secure APIs",
    "Agentic AI solutions",
    "AI SDKs",
  ];

  return (
    <Section
      className="my-4 sm:my-6 md:my-8 animate-fade-in"
      style={{ animationDelay }}
    >
      <div className="rounded-lg border border-border/80 bg-card/70 p-4 transition-colors duration-300 hover:border-foreground/15 sm:p-5">
        <div className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase text-muted-foreground">
              Profile
            </p>
            <h2 className="mt-2 text-base sm:text-lg md:text-xl font-semibold font-sans text-foreground animate-fade-in-subtle">
              About
            </h2>
          </div>
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
      </div>
    </Section>
  );
}
