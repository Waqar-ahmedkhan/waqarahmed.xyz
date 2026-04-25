import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";

export function HeaderSection() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-6 border border-border/80 bg-card/70 p-4 sm:p-5 rounded-lg transition-colors duration-300 hover:border-foreground/15 animate-fade-in-up">
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
        <div className="flex flex-wrap gap-2 pt-1 sm:pt-2 print:hidden">
          {RESUME_DATA.contact.email && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-9 w-9 rounded-lg border-border/80 bg-background/80 transition-colors duration-200 hover:border-foreground/20 hover:bg-accent hover:text-accent-foreground"
              aria-label={`Send email to ${RESUME_DATA.name}`}
            >
              <a
                href={`mailto:${RESUME_DATA.contact.email}`}
                aria-label={`Email ${RESUME_DATA.name}`}
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </Button>
          )}
          {RESUME_DATA.contact.social.map((social) => (
            <Button
              key={social.name}
              variant="outline"
              size="icon"
              asChild
              className="h-9 w-9 rounded-lg border-border/80 bg-background/80 transition-colors duration-200 hover:border-foreground/20 hover:bg-accent hover:text-accent-foreground"
              aria-label={`Visit ${social.name} profile`}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${RESUME_DATA.name} on ${social.name}`}
              >
                <social.icon className="h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>
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
  );
}
