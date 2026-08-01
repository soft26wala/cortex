import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import TrustedCompanies from "@/components/Home/TrustedCompanies";
import AIFeatures from "@/components/Home/AIFeatures";
import ProductShowcase from "@/components/Home/ProductShowcase";
import InteractiveDashboard from "@/components/Home/InteractiveDashboard";
import AutomationFeatures from "@/components/Home/AutomationFeatures";
import Benefits from "@/components/Home/Benefits";
import WorkflowTimeline from "@/components/Home/WorkflowTimeline";
import Integrations from "@/components/Home/Integrations";
import SecurityShowcase from "@/components/Home/SecurityShowcase";
import PerformanceMetrics from "@/components/Home/PerformanceMetrics";
import LuxuryTestimonials from "@/components/Home/LuxuryTestimonials";
import LuxuryPricing from "@/components/Home/LuxuryPricing";
import LuxuryFAQ from "@/components/Home/LuxuryFAQ";
import FinalCTA from "@/components/Home/FinalCTA";

export const metadata: Metadata = {
  title: "Cortex Web Solutions • Luxury Enterprise SaaS & AI Platforms",
  description: "Cortex Web Solutions builds high-converting web applications, automated WhatsApp AI agents, and enterprise cloud software for market leaders.",
};

export default function Home() {
  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-[#6C63FF]/30 selection:text-white">
      <Hero />
      <TrustedCompanies />
      <AIFeatures />
      <ProductShowcase />
      <InteractiveDashboard />
      <AutomationFeatures />
      <Benefits />
      <WorkflowTimeline />
      <Integrations />
      <SecurityShowcase />
      <PerformanceMetrics />
      <LuxuryTestimonials />
      <LuxuryPricing />
      <LuxuryFAQ />
      <FinalCTA />
    </main>
  );
}
