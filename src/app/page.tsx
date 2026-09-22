import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import TrustedCompanies from "@/components/Home/TrustedCompanies";
import ProductShowcase from "@/components/Home/ProductShowcase";
import SoftwareAppDevSection from "@/components/Home/SoftwareAppDevSection";
import AIFeatures from "@/components/Home/AIFeatures";
import AutomationFeatures from "@/components/Home/AutomationFeatures";
import WhatsAppBlueprintSection from "@/app/killTechnical/components/WhatsAppBlueprintSection";
import InteractiveDashboard from "@/components/Home/InteractiveDashboard";
import WorkflowTimeline from "@/components/Home/WorkflowTimeline";
import LuxuryPricing from "@/components/Home/LuxuryPricing";
import LuxuryTeam from "@/components/Home/LuxuryTeam";
import LuxuryTestimonials from "@/components/Home/LuxuryTestimonials";
import LuxuryFAQ from "@/components/Home/LuxuryFAQ";
import FinalCTA from "@/components/Home/FinalCTA";

export const metadata: Metadata = {
  title: "Cortex Web Solutions • Luxury Enterprise SaaS & AI Platforms",
  description: "Cortex Web Solutions builds high-converting web applications, automated WhatsApp AI agents, and enterprise cloud software.",
};

export default function Home() {
  return (
    <main className="bg-[#030712] text-white min-h-screen">
      <Hero />
      <TrustedCompanies />
      <SoftwareAppDevSection />
      <AIFeatures />
      <WhatsAppBlueprintSection />
      <ProductShowcase />
      <AutomationFeatures />
      <InteractiveDashboard />
      <WorkflowTimeline />
      <LuxuryPricing />
      <LuxuryTeam />
      <LuxuryTestimonials />
      <LuxuryFAQ />
      <FinalCTA />
    </main>
  );
}
