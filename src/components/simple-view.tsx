"use client";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { GlobeIcon, MailIcon } from "lucide-react";

export function SimpleView() {
  let delay = 0.8;
  const allButtons = [];

  if (RESUME_DATA.contact.email) {
    allButtons.push(
      <Button
        key="email"
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full border-border transition-all duration-300 hover:scale-110 hover:border-gray-600 hover:bg-gray-900 animate-slide-up"
        style={{ 
          animation: `slideUpFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay.toFixed(1)}s forwards`, 
          opacity: 0,
          transform: 'translateY(20px)'
        }}
        asChild
      >
        <a href={`mailto:${RESUME_DATA.contact.email}`} aria-label="Email">
          <MailIcon className="h-5 w-5 transition-transform duration-200" />
        </a>
      </Button>
    );
    delay += 0.15;
  }

  RESUME_DATA.contact.social.forEach((social) => {
    allButtons.push(
      <Button
        key={social.name}
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full border-border transition-all duration-300 hover:scale-110 hover:border-gray-600 hover:bg-gray-900"
        style={{ 
          animation: `slideUpFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay.toFixed(1)}s forwards`, 
          opacity: 0,
          transform: 'translateY(20px)'
        }}
        asChild
      >
        <a href={social.url} target="_blank" aria-label={social.name}>
          <social.icon className="h-5 w-5 transition-transform duration-200" />
        </a>
      </Button>
    );
    delay += 0.15;
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

        .stagger-container > * {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .stagger-container:hover > * {
          transform: scale(1.05);
        }

        .stagger-container > *:hover {
          transform: scale(1.15) !important;
          z-index: 10;
          position: relative;
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
            <GlobeIcon className="mr-1 h-3 w-3 transition-transform duration-200" />
            <a
              className="hover:text-foreground hover:underline transition-all duration-200"
              href={RESUME_DATA.locationLink}
              target="_blank"
            >
              {RESUME_DATA.location}
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-3 stagger-container">
            {allButtons}
          </div>
        </div>
      </div>
    </>
  );
}