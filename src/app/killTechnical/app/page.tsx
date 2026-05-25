"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/navbar";
// import Navbar from "../components/navbar";
import Hero from "../components/hero";
import NoiseBackground from "../components/noise-background";

// Scroll restoration component
const ScrollRestoration = () => {
  useEffect(() => {
    // Set scroll to top
    window.scrollTo(0, 0);

    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

// Lazy load components
const Features = dynamic(() => import("../components/features"));

const Work = dynamic(() => import("../components/work"));

const Process = dynamic(() => import("../components/process"));

const Testimonials = dynamic(() => import("../components/testimonials"));

const Pricing = dynamic(() => import("../components/pricing"));

const Contact = dynamic(() => import("../components/contact"));

const Footer = dynamic(() => import("../components/footer"));

// LazyLoad wrapper component
function LazyLoad({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return <div ref={ref}>{inView ? children : null}</div>;
}

export default function Home() {
  return (
    <main className="bg-black text-white min-h-[7500px]">
      <ScrollRestoration />
      <NoiseBackground />
      <Navbar />
      <Hero />
      <LazyLoad>
        <Features />
      </LazyLoad>
      <LazyLoad>
        <Work />
      </LazyLoad>
      <LazyLoad>
        <Process />
      </LazyLoad>
      <LazyLoad>
        <Testimonials />
      </LazyLoad>
      <LazyLoad>
        <Pricing />
      </LazyLoad>
      <LazyLoad>
        <Contact />
      </LazyLoad>
      <LazyLoad>
        <Footer />
      </LazyLoad>
    </main>
  );
}
