import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

interface SkillsSectionProps {
  animationDelay?: string;
}

export function SkillsSection({ animationDelay = "0.5s" }: SkillsSectionProps) {
  return (
    <Section
      className="my-4 sm:my-6 md:my-8 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-base sm:text-lg md:text-xl font-semibold font-sans animate-fade-in-subtle">Skills</h2>
      <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
        {RESUME_DATA.skills.map((skill, index) => (
          <Badge
            key={skill}
            className="px-2 py-0.5 text-[10px] sm:text-xs print:text-[8px] transition-colors duration-200 hover:bg-accent"
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
