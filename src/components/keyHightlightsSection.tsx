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
      className="my-4 sm:my-6 md:my-8 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-base sm:text-lg md:text-xl font-semibold font-sans text-foreground animate-fade-in-subtle">
        Key Highlights
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
        {RESUME_DATA.keyHighlights.map((point, index) => {
          const Icon = iconMap[point.title] || Star; // Fallback to Star icon
          return (
            <Card
              key={point.title}
              className="group flex min-h-[118px] flex-col items-start gap-2 p-4 sm:p-5 border border-border/80 transition-colors duration-300 hover:border-foreground/15"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <Icon className="h-5 w-5 text-primary transition-colors duration-300" />
              <div>
                <h3 className="font-semibold text-sm text-foreground">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2 leading-5">
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
