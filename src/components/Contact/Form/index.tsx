"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const ContactForm = () => {

    return (
        <>
            <section className="bg-[#050505] text-white lg:pb-24 pb-16 pt-10">
                <div className="container mx-auto max-w-6xl px-6">
                    <div className="rounded-3xl bg-[#0B0B0B] border border-white/[0.08] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="grid md:grid-cols-12 gap-10 items-center">
                            <div className="md:col-span-7 space-y-6">
                                <h2 className="text-3xl font-extrabold text-white">Book Executive Consultation</h2>
                                <p className="text-zinc-400 text-sm">Schedule a direct strategy call with our software architects to discuss custom web applications, WhatsApp AI agents, or cloud migration.</p>
                                
                                <form onSubmit={(e) => e.preventDefault()} className="space-y-4 pt-2">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="first-name" className="pb-2 block text-xs font-semibold text-zinc-400">First Name*</label>
                                            <input
                                                id="first-name"
                                                className="w-full text-sm px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-white focus:outline-none focus:border-[#6C63FF] transition-colors"
                                                type="text"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="last-name" className="pb-2 block text-xs font-semibold text-zinc-400">Last Name*</label>
                                            <input
                                                id="last-name"
                                                className="w-full text-sm px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-white focus:outline-none focus:border-[#6C63FF] transition-colors"
                                                type="text"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="email" className="pb-2 block text-xs font-semibold text-zinc-400">Work Email*</label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="w-full text-sm px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-white focus:outline-none focus:border-[#6C63FF] transition-colors"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="Specialist" className="pb-2 block text-xs font-semibold text-zinc-400">Service Inquiry*</label>
                                            <select id="Specialist" className="w-full text-sm px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-white focus:outline-none focus:border-[#6C63FF] transition-colors">
                                                <option value="">Select Service Architecture</option>
                                                <option value="Custom Next.js Web App">Custom Next.js Web App</option>
                                                <option value="WhatsApp AI Bot Automation">WhatsApp AI Bot Automation</option>
                                                <option value="Enterprise SaaS Engineering">Enterprise SaaS Engineering</option>
                                                <option value="Proptis / Real Estate Engine">Proptis / Real Estate Engine</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button 
                                            type="submit" 
                                            className="w-full py-4 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-sm shadow-[0_0_25px_rgba(108,99,255,0.4)] hover:shadow-[0_0_35px_rgba(0,212,255,0.6)] transition-all"
                                        >
                                            Submit Strategy Request
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="md:col-span-5 p-8 rounded-2xl bg-[#111111] border border-white/[0.08] space-y-6">
                                <h3 className="text-xl font-bold text-white">Direct Contacts</h3>
                                <div className="space-y-4 text-xs text-zinc-400">
                                    <div>
                                        <p className="font-semibold text-zinc-300">Engineering HQ</p>
                                        <p>Cortex Web Solutions Pvt. Ltd</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-zinc-300">Fast Inquiries</p>
                                        <p className="text-[#00D4FF]">contact@cortexwebsolutions.com</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-zinc-300">SLA Response Guarantee</p>
                                        <p className="text-[#4ADE80]">Within 2 Hours (Mon-Fri)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactForm;
