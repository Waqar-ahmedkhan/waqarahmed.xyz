import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/icons";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";

const FEATURED_SOCIALS = new Set(["LinkedIn", "X"]);
const SECONDARY_SOCIALS = new Set(["GitHub", "Medium", "Telegram", "YouTube"]);

const SOCIAL_DETAILS = {
  LinkedIn: {
    label: "LinkedIn",
    detail: "in/waqarahmeddev",
  },
  X: {
    label: "X",
    detail: "@Mr___WaQAR",
  },
} as const;

export function HeaderSection() {
  const featuredSocials = RESUME_DATA.contact.social.filter((social) => FEATURED_SOCIALS.has(social.name));
  const additionalSocials = RESUME_DATA.contact.social.filter((social) => SECONDARY_SOCIALS.has(social.name));

  return (
    <div className="animate-fade-in-up flex flex-col gap-4 rounded-lg border border-border/80 bg-card/70 p-4 transition-colors duration-300 hover:border-foreground/15 sm:gap-5 sm:p-5 md:p-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="order-2 flex-1 space-y-2 sm:order-1 sm:space-y-3">
          <h1 className="font-sans text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
            {RESUME_DATA.name}
          </h1>
          <p className="max-w-2xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
            {RESUME_DATA.about}
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">
            <a
              className="inline-flex items-center gap-x-1.5 underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
              href={RESUME_DATA.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${RESUME_DATA.location} on Google Maps`}
            >
              <GlobeIcon className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
              <span>{RESUME_DATA.location}</span>
            </a>
          </p>
        </div>
        <div className="order-1 shrink-0 rounded-xl border border-border/80 bg-background/50 p-1 sm:order-2">
          <Image
            alt={`${RESUME_DATA.name} profile photo`}
            src={RESUME_DATA.avatarUrl}
            width={112}
            height={112}
            sizes="(max-width: 640px) 96px, 112px"
            quality={70}
            className="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28"
            priority={false}
          />
        </div>
      </div>

      <div className="space-y-3 border-t border-border/70 pt-4 print:hidden">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {featuredSocials.map((social) => {
            const details = SOCIAL_DETAILS[social.name as keyof typeof SOCIAL_DETAILS];

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[4.5rem] items-center gap-3 rounded-sm border-2 border-dotted border-muted-foreground/70 bg-card/60 p-3 transition-colors duration-200 hover:border-foreground/55 hover:bg-accent/50"
                aria-label={`Follow ${RESUME_DATA.name} on ${details.label}`}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-foreground text-background transition-transform duration-200 group-hover:scale-105">
                  <social.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">{RESUME_DATA.name}</span>
                  <span className="block text-xs text-muted-foreground">{details.detail}</span>
                </span>
                <span className="rounded-sm border border-border bg-background/50 px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors group-hover:border-foreground/75 group-hover:bg-background">
                  Follow
                </span>
              </a>
            );
          })}

          <a
            href={RESUME_DATA.contact.discord.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[4.5rem] items-center gap-3 rounded-sm border-2 border-dotted border-muted-foreground/70 bg-card/60 p-3 transition-colors duration-200 hover:border-[#5865f2]/70 hover:bg-[#5865f2]/10"
            aria-label={`Join ${RESUME_DATA.contact.discord.name} on Discord`}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#5865f2] text-white transition-transform duration-200 group-hover:scale-105">
              <DiscordIcon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <span className="size-1.5 rounded-full bg-[#23a559]" aria-hidden="true" />
                {RESUME_DATA.contact.discord.name}
              </span>
              <span className="block text-xs text-muted-foreground">{RESUME_DATA.contact.discord.description}</span>
            </span>
            <span className="rounded-sm bg-[#5865f2] px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors group-hover:bg-[#4752c4]">
              Join ›
            </span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 px-1">
          {RESUME_DATA.contact.email ? (
            <Button asChild className="h-10 rounded-md px-3 shadow-sm">
              <a href={`mailto:${RESUME_DATA.contact.email}`}>
                <MailIcon className="h-4 w-4" aria-hidden="true" />
                <span>Email me</span>
              </a>
            </Button>
          ) : null}
          <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
          {additionalSocials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className="group flex size-8 items-center justify-center rounded-md border border-border/80 bg-card/60 text-muted-foreground shadow-sm transition-colors duration-200 hover:border-foreground/35 hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
              aria-label={`Visit ${RESUME_DATA.name} on ${social.name}`}
            >
              <social.icon className="size-4" aria-hidden="true" />
              <span className="sr-only">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
