import { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { AnimatedFavicon } from "@/components/animated-favicon";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const LIGHT_THEME_COLOR = "#f8f8f8";
const DARK_THEME_COLOR = "#000000";
const FAVICON_VERSION = "20260510-4";

const themeBootScript = `
  (function() {
    try {
      var storageKey = "theme";
      var storedTheme = localStorage.getItem(storageKey);
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var resolvedTheme = storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";
      var root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
      root.style.colorScheme = resolvedTheme;

      var themeColor = resolvedTheme === "dark" ? "${DARK_THEME_COLOR}" : "${LIGHT_THEME_COLOR}";
      var themeMeta = document.querySelector('meta[name="theme-color"]:not([media])');
      if (themeMeta) {
        themeMeta.setAttribute("content", themeColor);
      }
    } catch (_) {}
  })();
`;

export const metadata: Metadata = {
  title: {
    default: "Waqar Ahmed | Full Stack Developer",
    template: "%s | Waqar Ahmed Portfolio",
  },
  description:
    "Waqar Ahmed is a Full Stack Developer with 3+ years of experience building React/Next.js products, Node/NestJS APIs, SaaS dashboards, real-time chat/video features, secure product workflows, and agentic AI solutions.",
  keywords: [
    "Waqar Ahmed",
    "Full Stack Developer",
    "Secure API Developer",
    "Real-Time Video",
    "Startup MVP Developer",
    "SaaS Developer",
    "Coworking SaaS",
    "Product Engineer",
    "Entrepreneurship",
    "Secure APIs",
    "WebRTC",
    "Database Indexing",
    "OpenAI API",
    "Agentic AI",
    "AI SDKs",
    "LangChain",
    "RAG",
    "Tool Calling",
    "Next.js",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "Web Apps",
    "App Development",
    "Problem Solving",
    "Portfolio",
    "Islamabad",
    "Pakistan",
    "AI Development",
    "Web Development",
  ],
  authors: [{ name: "Waqar Ahmed", url: "https://waqarahmed.xyz" }],
  creator: "Waqar Ahmed",
  publisher: "Waqar Ahmed",
  metadataBase: new URL("https://waqarahmed.xyz"),
  alternates: {
    canonical: "https://waqarahmed.xyz/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waqarahmed.xyz",
    siteName: "Waqar Ahmed Portfolio",
    title: "Waqar Ahmed | Full Stack Developer",
    description:
      "Explore Waqar Ahmed's portfolio of scalable web apps, SaaS dashboards, real-time chat/video products, secure backend APIs, nonprofit revamps, AI SDK experiments, and agentic AI solutions.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Waqar Ahmed Portfolio Preview",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Mr___WaQAR",
    creator: "@Mr___WaQAR",
    title: "Waqar Ahmed | Full Stack Developer",
    description:
      "Full Stack Developer solving real product, startup, business, nonprofit, and operations problems with web apps, backend systems, SaaS products, secure APIs, and agentic AI workflows.",
    images: ["/image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "apple-mobile-web-app-title": "Waqar Ahmed Portfolio",
    "application-name": "Waqar Ahmed Portfolio",
    "msapplication-TileColor": DARK_THEME_COLOR,
    "msapplication-config": "/favicons/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content={LIGHT_THEME_COLOR} />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content={LIGHT_THEME_COLOR}
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content={DARK_THEME_COLOR}
        />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <link
          rel="icon"
          href={`/favicons/favicon.svg?v=${FAVICON_VERSION}`}
          type="image/svg+xml"
        />
        <link
          rel="icon"
          href={`/favicons/favicon.ico?v=${FAVICON_VERSION}`}
          sizes="any"
        />
        <link
          rel="icon"
          href={`/favicons/favicon-32x32.png?v=${FAVICON_VERSION}`}
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href={`/favicons/favicon-16x16.png?v=${FAVICON_VERSION}`}
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href={`/favicons/favicon-animated.gif?v=${FAVICON_VERSION}`}
          type="image/gif"
          sizes="64x64"
        />
        <link
          rel="shortcut icon"
          href={`/favicons/favicon.ico?v=${FAVICON_VERSION}`}
        />
        <link
          rel="apple-touch-icon"
          href={`/favicons/apple-touch-icon.png?v=${FAVICON_VERSION}`}
        />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        {GTM_ID ? (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <Script id="gtm-script" strategy="lazyOnload">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `}
            </Script>
          </>
        ) : null}
        <Script id="json-ld" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Waqar Ahmed",
              "jobTitle": "Full Stack Developer",
              "description": "Full Stack Developer with 3+ years of experience building React/Next.js products, Node/NestJS APIs, SaaS dashboards, real-time chat/video features, secure product workflows, AI SDK integrations, and agentic AI solutions.",
              "url": "https://waqarahmed.xyz",
              "sameAs": [
                "https://github.com/Waqar-ahmedkhan",
                "https://www.linkedin.com/in/waqar-ahmed-49416b237/",
                "https://x.com/Mr___WaQAR",
                "https://medium.com/@waqarahmed44870",
                "https://t.me/waqarahmed",
                "https://www.facebook.com/waqarahmed",
                "https://www.youtube.com/@WaqarAhmed-00"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Islamabad",
                "addressCountry": "Pakistan"
              },
              "email": "waqar@waqarahmed.xyz",
              "image": "https://avatars.githubusercontent.com/u/150153359?s=400",
              "worksFor": {
                "@type": "Organization",
                "name": "Geekinate"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Kohat University of Science and Technology"
              }
            }
          `}
        </Script>
      </head>
      <body
        className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300"
        suppressHydrationWarning
      >
        <div className="site-black-background" aria-hidden="true" />
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        ) : null}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatedFavicon />
          <div className="relative z-10">
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
