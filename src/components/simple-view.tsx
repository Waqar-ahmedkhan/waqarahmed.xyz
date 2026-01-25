"use client";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";

const contactButtonClass =
  "h-9 w-9 rounded-lg border border-border bg-background transition-colors duration-200 hover:border-border hover:bg-accent hover:text-accent-foreground";

export function SimpleView() {
  let delay = 0.8;
  const links: { key: string; href: string; label: string; icon: React.ReactNode }[] = [];

  if (RESUME_DATA.contact.email) {
    links.push({
      key: "email",
      href: `mailto:${RESUME_DATA.contact.email}`,
      label: "Email",
      icon: <MailIcon className="h-5 w-5" />,
    });
  }
  RESUME_DATA.contact.social.forEach((s) => {
    links.push({
      key: s.name,
      href: s.url,
      label: s.name,
      icon: <s.icon className="h-5 w-5" />,
    });
  });

  return (
    <>
      <style jsx>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-text-reveal-1 {
          animation: textReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
          opacity: 0;
        }

        .animate-text-reveal-2 {
          animation: textReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
          opacity: 0;
        }

        .animate-text-reveal-3 {
          animation: textReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
          opacity: 0;
        }

        .animate-text-reveal-4 {
          animation: textReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards;
          opacity: 0;
        }

        .animate-gentle-float {
          animation: gentleFloat 6s ease-in-out infinite;
          animation-delay: 1.2s;
        }

      `}</style>
      
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground sm:p-6">
        <div className="max-w-[90%] text-center sm:max-w-md animate-gentle-float">
          <h1 className="animate-text-reveal-1 mb-4 text-4xl font-bold sm:text-5xl transition-all duration-300">
            {RESUME_DATA.name}
          </h1>
          <p className="animate-text-reveal-2 mb-4 text-base text-muted-foreground sm:text-lg transition-all duration-300">
            {RESUME_DATA.about}
          </p>
          <p className="animate-text-reveal-3 mb-6 text-xs text-muted-foreground sm:text-sm transition-all duration-300">
            {RESUME_DATA.summary}
          </p>
          <p className="animate-text-reveal-4 mb-8 flex items-center justify-center text-xs text-muted-foreground transition-all duration-300">
            <GlobeIcon className="mr-1 h-3 w-3" />
            <a
              className="hover:text-foreground hover:underline transition-colors duration-200"
              href={RESUME_DATA.locationLink}
              target="_blank"
            >
              {RESUME_DATA.location}
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {links.map(({ key, href, label, icon }, i) => (
              <Button
                key={key}
                variant="outline"
                size="icon"
                className={contactButtonClass}
                style={{
                  animation: `slideUpFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${(delay + i * 0.15).toFixed(1)}s forwards`,
                  opacity: 0,
                  transform: "translateY(20px)",
                }}
                asChild
              >
                <a href={href} target={key === "email" ? undefined : "_blank"} rel={key === "email" ? undefined : "noopener noreferrer"} aria-label={label}>
                  {icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}