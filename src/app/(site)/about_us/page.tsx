import WorkSpeakers from "@/components/Home/WorkSpeakers";
import React from "react";
import { Metadata } from "next";
import Aboutcom from "@/components/SharedComponent/Aboutcom";
import Testimonials from "@/components/Home/Testimonials";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About-us | Cortex Web Solutions",
  description: "Learn the story, mission and approach of Cortex Web Solutions — digital solutions and training focused on business impact.",
};

const Page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about_us", text: "About-us" },
  ];

  return (
    <div className="bg-orange-50 dark:bg-gray-900 overflow-hidden">
      {/* Header Section */}
      <Aboutcom
        title="🧠 The Story of Cortex Web Solutions"
        description="Innovation driven by deep thinking and strategic architecture."
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-20">
          
          {/* Concept Section */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h3 className="text-2xl md:text-3xl font-light leading-relaxed text-dark italic">
              "Every great brand starts with a core idea. For us, that idea is encapsulated in the very name we chose: <span className="text-ElectricAqua font-bold not-italic">Cortex</span>."
            </h3>
            <div className="mt-8 h-1 w-24 bg-ElectricAqua mx-auto rounded-full opacity-50"></div>
            <p className="mt-8 text-lg text-dark-400 leading-relaxed">
              The human cerebral cortex is the engine of innovation—the place where complex thought, problem-solving, and vision are born. We chose it as a pledge to our clients: to provide the highest level of processing for your business.
            </p>
          </div>

          {/* Mission & Promise Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <div className="p-8 rounded-2xl bg-secondary/30 border border-dark_border hover:border-ElectricAqua/50 transition-all group">
              <h2 className="text-3xl font-bold mb-4 text-primary group-hover:translate-x-2 transition-transform">Our Mission</h2>
              <p className="text-dark-800 leading-relaxed text-lg">
                <strong className="text-dark-950">Thinking Deeper:</strong> In a digital landscape filled with surface-level solutions, we bring Cortex-level thinking to your challenges. We analyze your core operation and user psychology to architect growth.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/30 border border-dark_border hover:border-primary/50 transition-all group">
              <h2 className="text-3xl font-bold mb-4 text-primary group-hover:translate-x-2 transition-transform">Our Promise</h2>
              <p className="text-dark-800 leading-relaxed text-lg">
                <strong className="ttext-dark-950">Innovation, Engineered:</strong> Technology should be a multiplier, not a hurdle. We transform your ideas from concept into functional, scalable, and beautiful reality.
              </p>
            </div>
          </div>

          {/* Core Pillars (Cards) */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-16">Our Strategic Focus</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-secondary/20 p-10 rounded-3xl border-b-4 border-ElectricAqua">
                <div className="text-4xl mb-6">🏗️</div>
                <h4 className="text-xl font-bold mb-4">Intelligent Web Architecture</h4>
                <p className="text-dark-900">Creating platforms that are fast, secure, and ready for tomorrow's technology.</p>
              </div>
              {/* Pillar 2 */}
              <div className="bg-secondary/20 p-10 rounded-3xl border-b-4 border-primary">
                <div className="text-4xl mb-6">🎨</div>
                <h4 className="text-xl font-bold mb-4">Intuitive User Experience</h4>
                <p className="text-dark-900">Designing interfaces that delight users and drive conversion through psychology.</p>
              </div>
              {/* Pillar 3 */}
              <div className="bg-secondary/20 p-10 rounded-3xl border-b-4 border-white">
                <div className="text-4xl mb-6">📈</div>
                <h4 className="text-xl font-bold mb-4">Strategic Digital Growth</h4>
                <p className="text-dark-900">Implementing solutions that directly impact your bottom line and scale with you.</p>
              </div>
            </div>
          </div>

          {/* Final Call to Action Style Text */}
          <div className="mt-32 text-center bg-gradient-to-r from-secondary to-transparent p-12 rounded-3xl border border-dark_border">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              This is <span className="text-transparent bg-clip-text bg-gradient-to-r from-ElectricAqua to-primary">Cortex</span>. <br />
              Where your potential is fully realized.
            </h1>
            <p className="text-dark text-lg mb-8 max-w-2xl mx-auto">
              We see beyond the code and into the business potential. Experience the difference of deep, intelligent partnership.
            </p>
            <Link href="/contact" className="inline-block bg-ElectricAqua text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Other Components */}
      <WorkSpeakers showTitle={false} />
      <Testimonials />
    </div>
  );
};

export default Page;