import { DM_Sans } from "next/font/google";
import "./globals.css";
// import "../Style/style.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';

const dmsans = DM_Sans({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';
import PendingStickyBtn from "./PendingStickyBtn";
import Notification from "./Notification";
import { NextAuthProvider } from "./providers";
import ChatBot from "@/components/ChatBot";
import TicketSection from "@/components/Home/TicketSection";

import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Indian Web Development Company | Next.js & AI Solutions - Cortex Web Solutions",
    template: "%s | Cortex Web Solutions"
  },
  description: "Cortex Web Solutions is a leading Indian web development company specializing in custom Next.js web applications, AI integrations, automated WhatsApp bots, and enterprise SaaS platforms.",
  keywords: [
    "indian web development company",
    "web development company in india",
    "hire next.js developers india",
    "custom saas development company india",
    "ai web application agency",
    "top web development agency india",
    "full stack web development india",
    "ecommerce website development india",
    "react web development agency"
  ],
  authors: [{ name: "Cortex Web Solutions", url: "https://cortestack.com" }],
  creator: "Cortex Web Solutions",
  publisher: "Cortex Web Solutions",
  metadataBase: new URL("https://cortestack.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Indian Web Development Company | Next.js & AI Solutions",
    description: "Build high-converting Next.js web apps, AI platforms, and enterprise software with India's top web development agency.",
    url: "https://cortestack.com",
    siteName: "Cortex Web Solutions",
    images: [
      {
        url: "/cortex_hero_showcase.jpg",
        width: 1200,
        height: 630,
        alt: "Cortex Web Solutions - Top Indian Web Development Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Web Development Company | Next.js & AI Solutions",
    description: "Build high-converting Next.js web apps, AI platforms, and enterprise software with India's top web development agency.",
    images: ["/cortex_hero_showcase.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAdsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Cortex Web Solutions",
    "alternateName": ["Cortex Stack", "Cortex Web Agency India"],
    "url": "https://cortestack.com",
    "logo": "https://cortestack.com/cortex_hero_showcase.jpg",
    "image": "https://cortestack.com/cortex_hero_showcase.jpg",
    "description": "Premier Indian web development company specializing in Next.js web applications, custom SaaS platforms, AI chatbot integration, and automated enterprise software.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.5937",
      "longitude": "78.9629"
    },
    "priceRange": "$$",
    "areaServed": ["IN", "US", "GB", "AE", "AU", "CA", "DE"],
    "knowsAbout": [
      "Web Development",
      "Next.js Development",
      "React Applications",
      "SaaS Architecture",
      "AI Integration",
      "WhatsApp AI Agents",
      "Custom Software Engineering"
    ],
    "sameAs": [
      "https://github.com/cortexwebsolutions",
      "https://linkedin.com/company/cortexwebsolutions"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={dmsans.className}>
        <AuthDialogProvider>
          <SessionProviderComp session={undefined}>
            <ThemeProvider
              attribute="class"
              enableSystem={true}
              defaultTheme="system"
            >
              <NextAuthProvider>
                <Aoscompo>
                  <Header />
                  <PendingStickyBtn />
                  <Notification />
                  <NextTopLoader />
                  {/* <NewYearRocket /> */}
                  {children}
                  <Toaster
                    position="top-center"
                    reverseOrder={false}
                    containerStyle={{
                      zIndex: 99999,
                    }}
                  />
                  <Footer />
                </Aoscompo>
                <ScrollToTop />
              </NextAuthProvider>
            </ThemeProvider>
          </SessionProviderComp>
        </AuthDialogProvider>
        <ChatBot />
        {/* <TicketSection />  */}
        <SpeedInsights />
      </body>
    </html >
  );
}
