'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Layers, Flame, Gift } from 'lucide-react';

const PROCESS_STEPS = [
  {
    id: 'step-01',
    stepNumber: '01',
    title: 'Customer Reference',
    subtitle: 'Your Photo, Bouquet or Sketch',
    description: 'You share your wedding bouquet, newborn footprint, engagement photo, or custom lettering requirement with our design team.',
    image: '/images/handwork/hero.jpg',
    badge: 'STAGE 1: INPUT',
    icon: Sparkles
  },
  {
    id: 'step-02',
    stepNumber: '02',
    title: 'Design Concept',
    subtitle: '3D Mockup & Color Composition',
    description: 'We curate dried flowers, 24K gold foil flakes, and optical resin pigments to preview how your memories will be preserved.',
    image: '/images/handwork/name_art.jpg',
    badge: 'STAGE 2: VISUALIZATION',
    icon: Layers
  },
  {
    id: 'step-03',
    stepNumber: '03',
    title: 'Handmade Crafting',
    subtitle: 'Multi-Layer Pouring & De-airing',
    description: 'Master resin artisans pour optical-grade epoxy in micro-layers, curing over 48 hours to eliminate micro-bubbles and achieve diamond clarity.',
    image: '/images/handwork/clock.jpg',
    badge: 'STAGE 3: ARTISAN POUR',
    icon: Flame
  },
  {
    id: 'step-04',
    stepNumber: '04',
    title: 'Finished Artwork',
    subtitle: 'Beveled Polishing & Gift Crate Packaging',
    description: 'Each piece undergoes diamond bevel polishing, anti-UV sealing, and is delivered in a velvet-lined wooden presentation box.',
    image: '/images/handwork/hero.jpg',
    badge: 'STAGE 4: HEIRLOOM DECOUPE',
    icon: Gift
  }
];

export const ProcessShowcase: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section className="py-20 bg-[#070709] border-y border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E6C762] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Custom Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#F5F0EB]">
            From Customer Idea To Timeless Artwork
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] font-light leading-relaxed">
            See how your personal memory transforms from a simple photo or bouquet into a museum-quality handcrafted resin heirloom.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#0D0D12] border-[#D4AF37] shadow-xl'
                    : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100 hover:border-white/20'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProcessTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/15 to-transparent pointer-events-none"
                  />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold font-serif ${isActive ? 'text-[#E6C762]' : 'text-[#9CA3AF]'}`}>
                    {step.stepNumber}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E6C762]' : 'text-[#9CA3AF]'}`} />
                </div>
                <h4 className={`text-sm font-bold truncate ${isActive ? 'text-[#F5F0EB]' : 'text-[#F5F0EB]/70'}`}>
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#9CA3AF] truncate mt-0.5 font-light">{step.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Display Panel */}
        <div className="bg-[#0D0D12] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center shadow-2xl">
          {/* Left Text Detail */}
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6C762]">
              {activeStep.badge}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#F5F0EB]">
              {activeStep.title} — {activeStep.subtitle}
            </h3>

            <p className="text-sm text-[#9CA3AF] font-light leading-relaxed">
              {activeStep.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-[#F5F0EB]/90">
                <CheckCircle2 className="w-4 h-4 text-[#E6C762] shrink-0" />
                <span>Custom tailored specifically to customer dimensions & preferences.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#F5F0EB]/90">
                <CheckCircle2 className="w-4 h-4 text-[#E6C762] shrink-0" />
                <span>Progress photos & video updates sent on WhatsApp at every milestone.</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => setActiveStepIndex((prev) => (prev + 1) % PROCESS_STEPS.length)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Stage Visual */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#121217]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeStep.image}
                  alt={activeStep.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#E6C762] block">
                      {activeStep.title}
                    </span>
                    <span className="text-[11px] text-[#9CA3AF]">
                      Handwork Artisan Studio, India
                    </span>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#E6C762] animate-pulse" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
