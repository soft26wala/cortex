import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import { SpeedInsights } from '@vercel/speed-insights/next';


const dmsans = DM_Sans({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';
import PendingStickyBtn from "./PendingStickyBtn";
import Notification from "./Notification";
import { NextAuthProvider } from "./providers";
import NewYearRocket from "./NewYearRocket";

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmsans.className}>
        <AuthDialogProvider>
          <SessionProviderComp session={session}>
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
                  <NewYearRocket />
                  {children}
                  <Footer />
                </Aoscompo>
                <ScrollToTop />
              </NextAuthProvider>
            </ThemeProvider>
          </SessionProviderComp>
        </AuthDialogProvider>
        <SpeedInsights />
      </body>
    </html >
  );
}
