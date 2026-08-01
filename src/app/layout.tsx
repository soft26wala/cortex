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
// import ChatBot from "@/components/ChatBot";
import TicketSection from "@/components/Home/TicketSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cortex Web Solutions • Luxury Enterprise SaaS & AI Platforms",
  description: "Cortex Web Solutions builds high-converting web applications, automated WhatsApp AI agents, and enterprise cloud software.",
  metadataBase: new URL("https://cortestack.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        {/* <ChatBot /> */}
        {/* <TicketSection />  */}
        <SpeedInsights />
      </body>
    </html >
  );
}
