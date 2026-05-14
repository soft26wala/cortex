"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  Zap
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden text-white">
      
      {/* --- DYNAMIC LIGHTING ORBS --- */}
      <div className="absolute top-0 right-[10%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            {/* Glowing Line */}
            <div className="h-[2px] w-12 bg-blue-500 shadow-[0_0_15px_#3b82f6]"></div>
            <div className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">Secure Terminal</div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
            Let's Work
            <br />
            <span className="text-white/40">Together</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* --- CONTACT FORM WITH GLOWING INPUTS --- */}
          <form className="space-y-6 relative">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2 group-focus-within:text-blue-400 transition-colors">
                Operator Name
              </label>
              <input
                type="text"
                className="w-full bg-white/[0.03] border-2 border-white/10 p-4 text-white placeholder:text-white/10 focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all duration-500"
                placeholder="YOUR NAME"
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2 group-focus-within:text-blue-400 transition-colors">
                Access Email
              </label>
              <input
                type="email"
                className="w-full bg-white/[0.03] border-2 border-white/10 p-4 text-white placeholder:text-white/10 focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all duration-500"
                placeholder="EMAIL@DOMAIN.COM"
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2 group-focus-within:text-blue-400 transition-colors">
                Transmission Details
              </label>
              <textarea
                rows={5}
                className="w-full bg-white/[0.03] border-2 border-white/10 p-4 text-white placeholder:text-white/10 focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all duration-500 resize-none"
                placeholder="MESSAGE..."
              ></textarea>
            </div>

            {/* Glowing Button */}
            <button className="w-full bg-white text-black py-4 font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-500 hover:text-white transition-all duration-500 relative group overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Send Message <Send className="w-3 h-3" />
              </span>
            </button>
          </form>

          {/* --- CONTACT INFO WITH NEON ACCENTS --- */}
          <div className="relative border-2 border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 md:p-12 overflow-hidden">
            {/* Corner Light Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px]" />
            
            <h3 className="text-xl font-black mb-10 text-white uppercase tracking-tighter flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500 fill-current" /> Contact Info
            </h3>
            
            <div className="space-y-10">
              <div className="flex items-start group cursor-pointer">
                <div className="bg-white/5 p-3 border border-white/10 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all mr-5">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Direct Link</div>
                  <a href="mailto:cortexwebsolution@gmail.com" className="text-lg font-bold hover:text-blue-400 transition-colors">cortexwebsolution@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start group cursor-pointer">
                <div className="bg-white/5 p-3 border border-white/10 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all mr-5">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Voice Channel</div>
                  <a href="tel:+918094997023" className="text-lg font-bold hover:text-blue-400 transition-colors">+91 8094997023</a>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-6">Social Grid</div>
                <div className="flex gap-4">
                  {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="p-3 bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                      <Icon className="w-5 h-5 text-white/60 group-hover:text-blue-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Lines */}
      <div className="absolute top-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute bottom-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </section>
  );
}