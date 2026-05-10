import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";

const contactButtonClass =
  "h-9 w-9 rounded-lg border border-border/80 bg-card/80 transition-colors duration-200 hover:border-foreground/20 hover:bg-accent hover:text-accent-foreground";

export function SimpleView() {
  const delay = 0.8;
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
      <div className="flex min-h-[100svh] flex-col items-center justify-center bg-transparent px-4 py-20 text-foreground sm:px-6">
        <div className="w-full max-w-2xl text-center">
          <div className="animate-text-reveal-1 mx-auto mb-5 inline-flex rounded-full border border-border/80 bg-card/80 px-4 py-1.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
            Full Stack / SaaS / Secure APIs
          </div>
          <h1 className="animate-text-reveal-1 mb-4 text-4xl font-semibold sm:text-5xl transition-colors duration-300">
            {RESUME_DATA.name}
          </h1>
          <p className="animate-text-reveal-2 mx-auto mb-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg transition-colors duration-300">
            {RESUME_DATA.about}
          </p>
          <p className="animate-text-reveal-3 mx-auto mb-6 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7 transition-colors duration-300">
            {RESUME_DATA.summary}
          </p>
          <p className="animate-text-reveal-4 mb-8 flex items-center justify-center text-xs text-muted-foreground transition-all duration-300">
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
            {links.map(({ key, href, label, icon }, i) => {
              const isEmail = key === "email";
              return (
                <Button
                  key={key}
                  variant="outline"
                  size="icon"
                  className={contactButtonClass}
                  style={{
                    animation: `slideUpFade 0.5s var(--ease-out-smooth) ${(delay + i * 0.08).toFixed(2)}s forwards`,
                    opacity: 0,
                    transform: "translateY(10px)",
                  }}
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
