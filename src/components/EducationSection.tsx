import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

interface EducationSectionProps {
  animationDelay?: string;
}

export function EducationSection({ animationDelay = "0.4s" }: EducationSectionProps) {
  return (
    <Section
      className="my-4 sm:my-6 md:my-8 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-base sm:text-lg md:text-xl font-semibold font-sans text-foreground animate-fade-in-subtle">
        Education
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {RESUME_DATA.education.map((education, index) => (
          <Card
            key={education.school}
            className="p-4 sm:p-5 border border-border/80 transition-colors duration-300 hover:border-foreground/15"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <CardHeader className="p-0 pb-2 sm:pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 text-sm sm:text-base">
                <h3 className="font-semibold text-foreground">
                  {education.school}
                </h3>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {education.start} - {education.end}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xs sm:text-sm text-foreground">
                {education.degree}
              </p>
              {education.description && (
                <p className="mt-1 sm:mt-2 text-xs leading-6 sm:text-sm sm:leading-7 text-muted-foreground">
                  {education.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
