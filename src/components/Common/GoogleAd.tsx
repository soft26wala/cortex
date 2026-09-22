"use client";

import React, { useEffect, useRef } from "react";

interface GoogleAdProps {
  /** Google AdSense Ad Slot ID (e.g., "1234567890") */
  adSlot?: string;
  /** Ad format: auto, fluid, rectangle, horizontal, vertical */
  adFormat?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  /** Full width responsive setting */
  fullWidthResponsive?: boolean;
  /** Size presets: 'small' (320x50), 'medium' (300x250), 'banner' (728x90), 'auto' (Responsive) */
  variant?: "small" | "medium" | "banner" | "auto";
  /** Custom inline style override */
  style?: React.CSSProperties;
  /** Custom container Tailwind CSS classes */
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function GoogleAd({
  adSlot = "1234567890", // Replace with actual slot ID from your Google AdSense Dashboard
  adFormat = "auto",
  fullWidthResponsive = true,
  variant = "auto",
  style,
  className = "",
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const clientAdId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX";

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Prevent duplicate push error when navigating back and forth in Next.js
        if (adRef.current && !adRef.current.getAttribute("data-adsbygoogle-status")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (err) {
      console.error("Google AdSense render error:", err);
    }
  }, []);

  // Determine preset dimension styles based on selected variant
  const getStyles = (): React.CSSProperties => {
    switch (variant) {
      case "small":
        return { display: "inline-block", width: "320px", height: "50px", ...style };
      case "medium":
        return { display: "inline-block", width: "300px", height: "250px", ...style };
      case "banner":
        return { display: "inline-block", width: "728px", height: "90px", ...style };
      case "auto":
      default:
        return { display: "block", width: "100%", ...style };
    }
  };

  return (
    <div className={`google-ad-wrapper flex justify-center items-center my-4 overflow-hidden min-h-[50px] ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getStyles()}
        data-ad-client={clientAdId}
        data-ad-slot={adSlot}
        data-ad-format={variant === "auto" ? adFormat : undefined}
        data-full-width-responsive={variant === "auto" && fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
