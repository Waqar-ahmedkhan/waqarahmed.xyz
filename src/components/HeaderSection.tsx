"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";

interface HeaderSectionProps {
  isMobile: boolean;
}

export function HeaderSection({ isMobile }: HeaderSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 border border-border p-4 sm:p-5 rounded-lg transition-all duration-300 hover:border-gray-700 animate-fade-in">
      <div className="flex-1 space-y-2 sm:space-y-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-sans text-foreground">
          {RESUME_DATA.name}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {RESUME_DATA.about}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          <a
            className="inline-flex gap-x-1.5 items-center hover:text-blue-400 transition-colors duration-200"
            href={RESUME_DATA.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${RESUME_DATA.location} on Google Maps`}
          >
            <GlobeIcon className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            <span>{RESUME_DATA.location}</span>
          </a>
        </p>
        <div className="flex gap-x-2 gap-y-2 pt-1 sm:pt-2 font-mono text-xs sm:text-sm text-muted-foreground print:hidden flex-wrap">
          {RESUME_DATA.contact.email && (
            <Button
              variant="outline"
              size={isMobile ? "sm" : "icon"}
              asChild
              className="h-8 w-8 sm:h-9 sm:w-9 border-border hover:border-gray-700 hover:bg-gray-50 transition-all duration-200"
              aria-label={`Send email to ${RESUME_DATA.name}`}
            >
              <a href={`mailto:${RESUME_DATA.contact.email}`}>
                <MailIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
          )}
          {RESUME_DATA.contact.social.map((social) => (
            <Button
              key={social.name}
              variant="outline"
              size={isMobile ? "sm" : "icon"}
              asChild
              className="h-8 w-8 sm:h-9 sm:w-9 border-border hover:border-gray-700 hover:bg-gray-50 transition-all duration-200"
              aria-label={`Visit ${social.name} profile`}
            >
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
      <Avatar
        className={`${
          isMobile ? "mt-3" : ""
        } h-20 w-20 sm:h-24 sm:w-24 rounded-lg border border-border`}
      >
        <AvatarImage
          alt={RESUME_DATA.name}
          src={RESUME_DATA.avatarUrl}
          className="rounded-lg"
        />
        <AvatarFallback className="text-lg sm:text-xl rounded-lg">
          {RESUME_DATA.initials}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}