import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AppThemeProvider } from "@/components/theme-provider";

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
      <head />
      <body className={`${inter.className} bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors`}>
        <AppThemeProvider>
          {children}
          {/* Google Analytics */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXX');
            `}
          </Script>
        </AppThemeProvider>
      </body>
    </html>
  );
}
