"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Activity } from "lucide-react";

const Footer: FC = () => {
  return (
    <footer className="relative bg-[#050505] text-white border-t border-white/[0.08] overflow-hidden pt-20 pb-12">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#6C63FF]/10 via-[#00D4FF]/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Newsletter & Banner Section */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#0B0B0B] border border-white/[0.08] mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6C63FF]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={12} />
              Cortex Intelligence Dispatch
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Architecting the next generation of SaaS & AI
            </h3>
            <p className="text-zinc-400 text-sm">
              Subscribe for exclusive engineering insights, feature releases, and system updates.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 w-full lg:w-auto max-w-md">
            <input
              type="email"
              placeholder="Enter your work email"
              className="w-full px-5 py-3.5 rounded-full bg-[#111111] border border-white/[0.1] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#6C63FF] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white text-sm font-bold rounded-full hover:shadow-[0_0_25px_rgba(108,99,255,0.5)] transition-all flex items-center gap-2 flex-shrink-0"
            >
              Join <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-16 border-b border-white/[0.08]">
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/logo3.svg"
                alt="Cortex Logo"
                width={160}
                height={50}
                quality={100}
                className="object-contain"
              />
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Enterprise software, high-converting digital products, and automated AI systems built for scaling companies globally.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Activity size={12} />
              All Systems Operational
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/Service" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/about_us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events & Summits</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/documentation" className="hover:text-white transition-colors">Docs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Cortex Web Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/cortestack" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/cortex-web-solutions-349459399" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;