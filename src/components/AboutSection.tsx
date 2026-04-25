import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

interface AboutSectionProps {
  animationDelay?: string;
}

export function AboutSection({ animationDelay = "0.1s" }: AboutSectionProps) {
  return (
    <Section
      className="my-4 sm:my-6 md:my-8 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-base sm:text-lg md:text-xl font-semibold font-sans text-foreground animate-fade-in-subtle">
        About
      </h2>
      <p className="max-w-3xl text-xs leading-6 sm:text-sm sm:leading-7 text-muted-foreground mt-2 sm:mt-3">
        {RESUME_DATA.summary}
      </p>
    </Section>
  );
}
