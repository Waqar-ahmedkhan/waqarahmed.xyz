"use client";

import { useEffect, useState } from "react";

import { CalendarDaysIcon, MailIcon } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

interface ContributionsResponse {
  total: {
    lastYear: number;
  };
  contributions: Contribution[];
}

interface GitHubContributionsSectionProps {
  animationDelay?: string;
}

const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${RESUME_DATA.githubUsername}?y=last`;
const LEVEL_CLASSES = [
  "bg-muted/80",
  "bg-muted-foreground/20",
  "bg-muted-foreground/35",
  "bg-muted-foreground/55",
  "bg-foreground/75",
];
const EMPTY_CONTRIBUTIONS = Array.from({ length: 365 }, (_, index) => ({ date: `Day ${index + 1}`, count: 0, level: 0 }));
const MONTH_FORMATTER = new Intl.DateTimeFormat("en", { month: "short" });

export function GitHubContributionsSection({ animationDelay = "0.05s" }: GitHubContributionsSectionProps) {
  const [data, setData] = useState<ContributionsResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadContributions = async () => {
      try {
        const response = await fetch(CONTRIBUTIONS_URL, { signal: controller.signal });

        if (!response.ok) {
          return;
        }

        const contributions = (await response.json()) as ContributionsResponse;
        setData(contributions);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          return;
        }
      }
    };

    loadContributions();

    return () => controller.abort();
  }, []);

  const contributions = data?.contributions ?? EMPTY_CONTRIBUTIONS;
  const totalLabel = data ? `${data.total.lastYear.toLocaleString()} contributions in the last year` : "Loading contribution activity";
  const monthLabels = data
    ? Array.from(
        new Map(
          data.contributions.map((contribution) => {
            const date = new Date(`${contribution.date}T00:00:00`);
            return [`${date.getFullYear()}-${date.getMonth()}`, MONTH_FORMATTER.format(date)];
          })
        ).values()
      ).slice(0, 12)
    : ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <Section className="my-4 animate-fade-in sm:my-6 md:my-8" style={{ animationDelay }}>
      <div className="rounded-lg border border-border/80 bg-card/80 p-3 transition-colors duration-300 hover:border-foreground/15 sm:p-4">
        <div className="overflow-x-auto rounded-md border border-border/70 bg-background/70 p-3 sm:p-4">
          <div className="min-w-[660px]">
            <div className="mb-3 flex justify-between px-0.5 text-xs font-medium text-muted-foreground">
              {monthLabels.map((month, index) => (
                <span key={`${month}-${index}`}>{month}</span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]" aria-label={totalLabel}>
              {contributions.map((contribution) => (
                <span
                  key={contribution.date}
                  title={`${contribution.count} contributions on ${contribution.date}`}
                  className={`size-2 rounded-[2px] sm:size-2.5 ${LEVEL_CLASSES[contribution.level] ?? LEVEL_CLASSES[0]}`}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{totalLabel}</span>
              <span className="flex items-center gap-1.5">
                <span>Less</span>
                {LEVEL_CLASSES.map((levelClass) => (
                  <span key={levelClass} className={`size-2 rounded-[2px] ${levelClass}`} />
                ))}
                <span>More</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-1 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Interested in working together? <span className="font-medium text-foreground">Let&apos;s build something useful.</span>
          </p>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="h-9">
              <a href={RESUME_DATA.bookingUrl} target="_blank" rel="noopener noreferrer">
                <CalendarDaysIcon className="size-4" aria-hidden="true" />
                Book an intro call
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="h-9">
              <a href={`mailto:${RESUME_DATA.contact.email}`}>
                <MailIcon className="size-4" aria-hidden="true" />
                Send an email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
