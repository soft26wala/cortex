import type React from "react";
// import "../globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import FloatingCursor from "../components/floating-cursor";
import type { Metadata } from 'next'; // Import Metadata type
import ClickEffect from "../components/ClickEffect";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { // Add Metadata type
  title: "Kill Technical| Master the Institutional Trading Mindset",
  description: "Decode the market like the 1% operators. Kill Technicalprovides elite SMC strategies, Forex mastery, and institutional psychology to transform retail traders into market masters. Start your journey with Anubhav Soni.",
  generator: "Anmol Singh, Gurvinder Singh",
  // Add manifest and icons metadata
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png", // Assumes apple-touch-icon.png exists in /public
  },
  // Add Open Graph metadata
  openGraph: {
    title: "SIGMA TARDER",
    description: "We create minimalist digital experiences that make an impact. Raw, unfiltered, and straight to the point.",
    url: "https://your-website-url.com", // Replace with your actual website URL
    siteName: "SIGMA TARDER",
    images: [
      {
        url: "/image.png", // Path to your image in the public folder
        width: 1200, // Optional: Specify image width
        height: 630, // Optional: Specify image height
        alt: "SIGMA TARDER", // Optional: Alt text for the image
      },
    ],
    locale: "en_US", // Optional: Specify locale
    type: "website", // Optional: Specify content type
  },
  // Optional: Add Twitter card metadata if needed
  twitter: {
    card: "summary_large_image",
    title: "SIGMA TARDER",
    description: "We create minimalist digital experiences that make an impact. Raw, unfiltered, and straight to the point.",
    // creator: "@yourTwitterHandle", // Optional: Your Twitter handle
    images: ["/image.png"], // Path to your image in the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning >
      <body className={`${inter.className} bg-black mx-auto max-w-[1440px]`}>
        <AuthDialogProvider >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <ClickEffect />
            {children}
             <Toaster
                    position="top-center"
                    reverseOrder={false}
                    containerStyle={{
                      zIndex: 99999,
                    }}
                  />
          </ThemeProvider>
          <FloatingCursor />
        </AuthDialogProvider>
      </body>
    </html>
  );
}

