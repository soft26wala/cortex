"use client";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { motion } from "framer-motion";
import { Truck, Globe, MapPin, Calendar, Mail, Phone, Zap, ShieldCheck } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <>
        <Navbar />
      
    <section className="bg-[#000000] min-h-screen py-24 relative overflow-hidden text-white flex flex-col items-center">
      
      {/* --- BACKGROUND AMBIENCE (Emerald/Green Glow) --- */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* --- CENTERED HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-8 bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
            <span className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase italic">Delivery Protocol</span>
            <div className="h-[2px] w-8 bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase">
            SHIPPING <span className="text-white/10 italic">& DELIVERY</span>
          </h1>
          <p className="text-white/40 tracking-[0.2em] uppercase text-[10px] font-bold">
            SIGMA TRADER LOGISTICS <span className="text-white/60 ml-2 italic">Last Updated: Dec 29, 2025</span>
          </p>
        </motion.div>

        {/* --- MAIN CONTENT CONTAINER --- */}
        <div className="relative group w-full max-w-5xl">
          
          {/* ALWAYS RUNNING ENERGY BORDER (Emerald/Cyan) */}
          <div className="absolute inset-[-1px] overflow-hidden rounded-sm">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-200%]"
              style={{ background: `conic-gradient(from 0deg, transparent, #10b981, transparent 40%, #06b6d4, transparent 80%)` }}
            />
          </div>

          <div className="relative bg-[#050505] border border-white/10 p-8 md:p-16 z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* INTERNATIONAL BUYERS */}
              <div className="p-8 bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                <Globe className="w-10 h-10 text-emerald-500 mb-6" />
                <h2 className="text-xl font-black tracking-widest uppercase mb-4">International Buyers</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Orders are shipped and delivered through registered international courier companies and/or International speed post only.
                </p>
                <div className="absolute -bottom-5 -right-5 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Globe className="w-24 h-24" />
                </div>
              </div>

              {/* DOMESTIC BUYERS */}
              <div className="p-8 bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                <MapPin className="w-10 h-10 text-blue-500 mb-6" />
                <h2 className="text-xl font-black tracking-widest uppercase mb-4">Domestic Buyers</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Orders are shipped through registered domestic courier companies and/or speed post only.
                </p>
                <div className="absolute -bottom-5 -right-5 opacity-5 group-hover:opacity-20 transition-opacity">
                    <MapPin className="w-24 h-24" />
                </div>
              </div>

              {/* SHIPPING TIMELINE */}
              <div className="md:col-span-2 p-8 bg-emerald-500/5 border border-emerald-500/20 relative">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                   <div className="p-5 bg-emerald-500 rounded-full shadow-[0_0_30px_#10b981]">
                      <Calendar className="w-8 h-8 text-white" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black tracking-tight uppercase mb-2">Shipping Timeline: 0-7 Days</h2>
                      <p className="text-neutral-300 text-sm italic">
                        Note: Handover guaranteed within 0-7 days. SIGMA TRADER is not liable for delays caused by courier company or postal authorities.
                      </p>
                   </div>
                </div>
              </div>

              {/* DELIVERY CONFIRMATION */}
              <div className="md:col-span-2 flex flex-col items-center text-center p-8">
                 <ShieldCheck className="w-12 h-12 text-white/20 mb-4" />
                 <h2 className="text-xl font-bold mb-4">Delivery Confirmation</h2>
                 <p className="text-neutral-400 max-w-2xl">
                    Delivery of all orders will be made to the address provided by the buyer. For our digital trading services, confirmation will be sent directly to your <span className="text-white underline decoration-emerald-500 font-bold">registered mail ID</span>.
                 </p>
              </div>

            </div>

            {/* --- SUPPORT HELPDESK (The Energy Core) --- */}
            <div className="mt-16 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-12">
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:bg-emerald-500 transition-all">
                  <Phone className="w-5 h-5 text-emerald-500 group-hover:text-black" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 tracking-widest uppercase font-bold">Call Support</p>
                  <p className="text-lg font-mono">+91 8094997023</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:bg-blue-500 transition-all">
                  <Mail className="w-5 h-5 text-blue-500 group-hover:text-black" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 tracking-widest uppercase font-bold">Email Support</p>
                  <p className="text-lg font-mono uppercase">cortexwebsolution@gmail.com</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* --- DECORATIVE TAG --- */}
        <div className="mt-16 opacity-30 flex items-center gap-4">
          <Zap className="w-4 h-4 text-emerald-500 fill-current animate-pulse" />
          <p className="text-[9px] tracking-[1em] font-black uppercase">SIGMA TRADER — LOGISTICS SECURE</p>
        </div>

      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
    </section>
      <Footer />
        </>
  );
}