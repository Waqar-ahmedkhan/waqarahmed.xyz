import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";

const PRIMARY_SOCIALS = new Set(["LinkedIn", "GitHub", "X"]);

export function HeaderSection() {
  const primarySocials = RESUME_DATA.contact.social.filter((social) => PRIMARY_SOCIALS.has(social.name));
  const additionalSocials = RESUME_DATA.contact.social.filter((social) => !PRIMARY_SOCIALS.has(social.name));

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-border/80 bg-card/70 p-4 transition-colors duration-300 hover:border-foreground/15 sm:gap-6 sm:p-5 md:p-6 animate-fade-in-up">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
      <div className="flex-1 space-y-2 sm:space-y-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold font-sans text-foreground">
          {RESUME_DATA.name}
        </h1>
        <p className="max-w-2xl text-xs leading-6 sm:text-sm sm:leading-7 text-muted-foreground">
          {RESUME_DATA.about}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          <a
            className="inline-flex gap-x-1.5 items-center underline-offset-4 hover:text-foreground hover:underline transition-colors duration-200"
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
      <Image
        alt={`${RESUME_DATA.name} profile photo`}
        src={RESUME_DATA.avatarUrl}
        width={96}
        height={96}
        sizes="(max-width: 640px) 80px, 96px"
        quality={70}
        className="mt-3 h-20 w-20 rounded-lg border border-border/80 object-cover sm:mt-0 sm:h-24 sm:w-24"
        priority={false}
      />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border/70 pt-4 print:hidden">
        {RESUME_DATA.contact.email ? (
          <Button asChild className="h-10 rounded-md px-3 shadow-sm">
            <a href={`mailto:${RESUME_DATA.contact.email}`}>
              <MailIcon className="h-4 w-4" aria-hidden="true" />
              <span>Email me</span>
            </a>
          </Button>
        ) : null}
        {primarySocials.map((social) => (
          <Button
            key={social.name}
            variant="outline"
            asChild
            className="h-10 rounded-md border-border/80 bg-background/75 px-3 transition-colors duration-200 hover:border-foreground/25 hover:bg-accent"
          >
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              <social.icon className="h-4 w-4" aria-hidden="true" />
              <span>{social.name === "X" ? "X / Twitter" : social.name}</span>
            </a>
          </Button>
        ))}
        {additionalSocials.map((social) => (
          <Button
            key={social.name}
            variant="ghost"
            size="icon"
            asChild
            className="h-10 w-10 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label={`Visit ${RESUME_DATA.name} on ${social.name}`}
          >
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              <social.icon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{social.name}</span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
