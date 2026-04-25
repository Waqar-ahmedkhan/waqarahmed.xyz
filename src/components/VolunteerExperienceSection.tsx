import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

interface VolunteerExperienceSectionProps {
  animationDelay?: string;
}

export function VolunteerExperienceSection({
  animationDelay = "0.9s",
}: VolunteerExperienceSectionProps) {
  return (
    <Section
      className="my-4 sm:my-6 md:my-8 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-base sm:text-lg md:text-xl font-semibold font-sans text-foreground animate-fade-in-subtle">
        Volunteer Experience
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {RESUME_DATA.volunteerExperience.map((volunteer, index) => (
          <Card
            key={volunteer.organization}
            className="p-4 sm:p-5 border border-border/80 transition-colors duration-300 hover:border-foreground/15"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <CardHeader className="p-0 pb-2 sm:pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-x-2 text-sm sm:text-base">
                <h3 className="font-semibold text-foreground">
                  {volunteer.organization}
                </h3>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {volunteer.start} - {volunteer.end ?? "Present"}
                </div>
              </div>
              <h4 className="font-mono text-xs sm:text-sm text-foreground mt-1">
                {volunteer.role}
              </h4>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xs leading-6 sm:text-sm sm:leading-7 text-muted-foreground mt-2">
                {volunteer.description}
              </p>
              {volunteer.bulletPoints && (
                <ul className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground space-y-2">
                  {volunteer.bulletPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 border-l border-primary/25 pl-3 py-0.5 leading-6"
                    >
                      <span>{point.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
