
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Waqar Ahmed | Full Stack, DevOps & AI Engineer 🚀",
  description:
    "Experienced Full Stack and DevOps Engineer with expertise in AI and Machine Learning.",
  openGraph: {
    title: "Waqar Ahmed | Full Stack, DevOps & AI Engineer 🚀",
    description:
      "Building scalable systems, deploying AI/ML models, and crafting modern apps.",
    url: "https://waqarahmed.xyz",
    siteName: "Waqar Ahmed Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Waqar Ahmed Portfolio",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Pakistan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waqar Ahmed | Full Stack, DevOps & AI Engineer 🚀",
    description:
      "Building scalable systems, deploying AI/ML models, and leading cloud-native infra projects.",
    images: ["/og.png"],
    creator: "@yourhandle",
    site: "@yourhandle",
  },
  metadataBase: new URL("https://waqarahmed.xyz"),
  alternates: {
    canonical: "https://waqarahmed.xyz",
  },
  keywords: [
    "Waqar Ahmed",
    "Full Stack Developer",
    "DevOps Engineer",
    "AI",
    "ML",
    "Next.js",
    "MLOps",
    "Cloud Native",
  ],
  authors: [{ name: "Waqar Ahmed", url: "https://waqarahmed.xyz" }],
  creator: "Waqar Ahmed",
  publisher: "Waqar Ahmed",
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
    "apple-mobile-web-app-title": "Waqar Ahmed",
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
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NPKQCQK3');
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} bg-white text-black dark:bg-zinc-900  dark:text-white transition-colors`}
    suppressHydrationWarning  >
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
