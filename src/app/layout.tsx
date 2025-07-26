import { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Waqar Ahmed | Full Stack, DevOps & AI Engineer",
    template: "%s | Waqar Ahmed Portfolio",
  },
  description:
    "Waqar Ahmed, a Full Stack and DevOps Engineer specializing in AI, Machine Learning, and cloud-native solutions. Explore projects, certifications, and expertise in Next.js, React, and MLOps from Islamabad, Pakistan.",
  keywords: [
    "Waqar Ahmed",
    "Full Stack Developer",
    "DevOps Engineer",
    "AI Engineer",
    "Machine Learning",
    "MLOps",
    "Next.js",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "Cloud Native",
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
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waqarahmed.xyz",
    siteName: "Waqar Ahmed Portfolio",
    title: "Waqar Ahmed | Full Stack, DevOps & AI Engineer",
    description:
      "Explore Waqar Ahmed's portfolio showcasing AI-driven projects, DevOps expertise, and cloud-native solutions built with Next.js, React, and AWS.",
    images: [
      {
        url: "/og.png",
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
    title: "Waqar Ahmed | Full Stack, DevOps & AI Engineer",
    description:
      "Discover Waqar Ahmed's work in AI, DevOps, and Full Stack Development. View projects, certifications, and contributions.",
    images: ["/og.png"],
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
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="format-detection" content="telephone=no" />
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NPKQCQK3');
          `}
        </Script>
        <Script id="json-ld" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Waqar Ahmed",
              "jobTitle": "Full Stack & DevOps Engineer",
              "description": "Specializing in AI, Machine Learning, and cloud-native solutions in Islamabad, Pakistan.",
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
                "name": "Viral Mobitech (Private) Limited"
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
        className={`${poppins.className} bg-background text-foreground transition-colors min-h-screen`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NPKQCQK3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <main className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}