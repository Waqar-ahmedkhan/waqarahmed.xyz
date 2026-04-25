import { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title: {
    default: "Waqar Ahmed | Full Stack AI Developer",
    template: "%s | Waqar Ahmed Portfolio",
  },
  description:
    "Waqar Ahmed is a Full Stack AI Developer with 3+ years of experience turning real business problems into startup MVPs, SaaS apps, dashboards, backend APIs, web apps, and agentic AI systems.",
  keywords: [
    "Waqar Ahmed",
    "Full Stack AI Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "AI Engineer",
    "Startup MVP Developer",
    "SaaS Developer",
    "Coworking SaaS",
    "Product Engineer",
    "Entrepreneurship",
    "Agentic AI",
    "LangChain",
    "LangGraph",
    "OpenAI API",
    "Machine Learning",
    "MLOps",
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
    title: "Waqar Ahmed | Full Stack AI Developer",
    description:
      "Explore Waqar Ahmed's portfolio of startup MVPs, SaaS apps, product dashboards, backend APIs, agentic AI systems, nonprofit platforms, business websites, and web apps.",
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
    title: "Waqar Ahmed | Full Stack AI Developer",
    description:
      "Full Stack AI Developer solving real product, startup, business, nonprofit, and operations problems with web apps, backend systems, SaaS products, and agentic AI.",
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
    "theme-color": "#0f172a",
    "apple-mobile-web-app-title": "Waqar Ahmed Portfolio",
    "application-name": "Waqar Ahmed Portfolio",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
              "jobTitle": "Full Stack AI Developer",
              "description": "Full Stack AI Developer with 3+ years of experience turning business problems into startup MVPs, SaaS apps, dashboards, backend APIs, agentic AI systems, nonprofit platforms, company websites, and web apps.",
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
              "email": "contact@waqarahmed.xyz",
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
        className="min-h-screen bg-background text-foreground transition-colors duration-300"
        suppressHydrationWarning
      >
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
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
