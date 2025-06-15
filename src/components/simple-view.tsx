
"use client";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";

export function SimpleView() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground sm:p-6">
      <div className="max-w-[90%] text-center sm:max-w-md">
        <h1 className="animate-fade-in mb-4 text-4xl font-bold sm:text-5xl">
          {RESUME_DATA.name}
        </h1>
        <p className="animate-fade-in-delayed mb-4 text-base text-muted-foreground sm:text-lg">
          {RESUME_DATA.about}
        </p>
        <p className="animate-fade-in-delayed mb-6 text-xs text-muted-foreground sm:text-sm">
          {RESUME_DATA.summary}
        </p>
        <p className="animate-fade-in-delayed mb-8 flex items-center justify-center text-xs text-muted-foreground">
          <GlobeIcon className="mr-1 h-3 w-3" />
          <a
            className="hover:text-foreground hover:underline"
            href={RESUME_DATA.locationLink}
            target="_blank"
          >
            {RESUME_DATA.location}
          </a>
        </p>
        <div className="animate-fade-in-delayed-more flex flex-wrap justify-center gap-3">
          {RESUME_DATA.contact.email && (
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-border transition-all hover:scale-110 hover:border-gray-600 hover:bg-gray-900"
              asChild
            >
              <a href={`mailto:${RESUME_DATA.contact.email}`} aria-label="Email">
                <MailIcon className="h-5 w-5" />
              </a>
            </Button>
          )}
          {RESUME_DATA.contact.social.map((social) => (
            <Button
              key={social.name}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-border transition-all hover:scale-110 hover:border-gray-600 hover:bg-gray-900"
              asChild
            >
              <a href={social.url} target="_blank" aria-label={social.name}>
                <social.icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
