'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Truck, RefreshCw, Send } from 'lucide-react';

export const StoreFooter: React.FC = () => {
  return (
    <footer className="bg-[#050508] border-t border-[#D4AF37]/20 text-[#F5F0EB]/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#0A0A0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-5 h-5 text-[#E6C762]" />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif tracking-wider text-[#F5F0EB]">
                  HANDWORK
                </span>
                <p className="text-xs text-[#9CA3AF] tracking-widest uppercase">by CortexStack Ecosystem</p>
              </div>
            </div>
            
            <p className="text-sm font-light leading-relaxed text-[#F5F0EB]/70 max-w-sm">
              "Your Memory. Your Design. Handmade." <br />
              We specialize in custom epoxy resin artwork, memory preservation blocks, personalized name plates and bespoke handcrafted luxury decor.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E6C762]">
                🇮🇳 Handcrafted in India
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#F5F0EB]/70">
                ✨ Made With Patience
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#E6C762] font-serif">
              Collections
            </h3>
            <ul className="space-y-2 text-sm font-light">
              <li><Link href="/store/handwork#collections" className="hover:text-[#E6C762] transition-colors">Royal Resin Frames</Link></li>
              <li><Link href="/store/handwork#collections" className="hover:text-[#E6C762] transition-colors">Golden Bloom Name Plates</Link></li>
              <li><Link href="/store/handwork#collections" className="hover:text-[#E6C762] transition-colors">Couple Memory Art</Link></li>
              <li><Link href="/store/handwork#collections" className="hover:text-[#E6C762] transition-colors">Preservation Keepsakes</Link></li>
              <li><Link href="/store/handwork#collections" className="hover:text-[#E6C762] transition-colors">Custom Ocean Clocks</Link></li>
            </ul>
          </div>

          {/* Navigation & Store */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#E6C762] font-serif">
              CortexStack Store
            </h3>
            <ul className="space-y-2 text-sm font-light">
              <li><Link href="/store/handwork" className="hover:text-[#E6C762] transition-colors">Handwork Storefront</Link></li>
              <li><Link href="/store" className="hover:text-[#E6C762] transition-colors">Store Categories Hub</Link></li>
              <li><Link href="/store/handwork#custom-design" className="hover:text-[#E6C762] transition-colors">Request Custom Quote</Link></li>
              <li><Link href="/store/handwork#how-it-works" className="hover:text-[#E6C762] transition-colors">Custom Ordering Process</Link></li>
              <li><Link href="/store/handwork#gallery" className="hover:text-[#E6C762] transition-colors">Masterpiece Gallery</Link></li>
            </ul>
          </div>

          {/* Contact & Custom Order */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-[#E6C762] font-serif">
              Bespoke Assistance
            </h3>
            <p className="text-xs text-[#F5F0EB]/60">
              Have a unique custom request? Send your reference photo or idea to our master resin artist directly.
            </p>
            <div className="pt-1">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=${encodeURIComponent('Hello! I want to request a custom resin design from Handwork.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366]/20 to-[#128C7E]/20 border border-[#25D366]/40 text-[#25D366] font-medium text-xs hover:bg-[#25D366]/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>WhatsApp Design Team</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <p>© {new Date().getFullYear()} Handwork by CortexStack. All rights reserved. Crafting timeless memories.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#F5F0EB] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#F5F0EB] transition-colors">Terms of Craft</Link>
            <Link href="/shipping" className="hover:text-[#F5F0EB] transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
