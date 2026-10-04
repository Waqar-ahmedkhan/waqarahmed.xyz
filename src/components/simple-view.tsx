import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";

const contactButtonClass =
  "h-11 w-11 rounded-lg border border-border/80 bg-card/80 transition-colors duration-200 hover:border-foreground/20 hover:bg-accent hover:text-accent-foreground";

export function SimpleView() {
  const links: { key: string; href: string; label: string; icon: React.ReactNode }[] = [];

  if (RESUME_DATA.contact.email) {
    links.push({
      key: "email",
      href: `mailto:${RESUME_DATA.contact.email}`,
      label: `Email ${RESUME_DATA.name}`,
      icon: <MailIcon className="h-5 w-5" />,
    });
  }
  RESUME_DATA.contact.social.forEach((s) => {
    links.push({
      key: s.name,
      href: s.url,
      label: `Visit ${RESUME_DATA.name} on ${s.name}`,
      icon: <s.icon className="h-5 w-5" />,
    });
  });

  return (
    <>
      <div className="flex flex-col items-center bg-transparent px-4 pt-3 pb-24 sm:pt-4 text-foreground sm:px-6">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto mb-5 inline-flex rounded-full border border-border/80 bg-card/80 px-4 py-1.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
            Full Stack AI Engineer / Agentic AI / 4+ Years
          </div>
          <h1 className="mb-4 text-4xl font-semibold sm:text-5xl transition-colors duration-300">
            {RESUME_DATA.name}
          </h1>
          <p className="mx-auto mb-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg transition-colors duration-300">
            {RESUME_DATA.about}
          </p>
          <p className="mx-auto mb-6 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7 transition-colors duration-300">
            {RESUME_DATA.summary}
          </p>
          <p className="mb-8 flex items-center justify-center text-xs text-muted-foreground transition-colors duration-180">
            <GlobeIcon className="mr-1 h-3 w-3" />
            <a
              className="underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
              href={RESUME_DATA.locationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {RESUME_DATA.location}
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {links.map(({ key, href, label, icon }) => {
              const isEmail = key === "email";
              return (
                <Button
                  key={key}
                  variant="outline"
                  size="icon"
                  className={contactButtonClass}
                  asChild
                >
                  <a
                    href={href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    aria-label={label}
                  >
                    {icon}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
