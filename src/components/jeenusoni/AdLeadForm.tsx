"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles, ShieldCheck, Building2, Phone, MapPin, DollarSign, MessageSquare } from "lucide-react";

export default function AdLeadForm() {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [advertisementType, setAdvertisementType] = useState("Instagram Reel & Post");
  const [budget, setBudget] = useState("₹1,00,000 - ₹2,50,000");
  const [message, setMessage] = useState("");
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [websiteHp, setWebsiteHp] = useState(""); // Honeypot

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(null);

    // Frontend validation
    const newErrors: Record<string, string> = {};
    if (!clientName.trim()) newErrors.clientName = "Client / Contact Name is required.";
    if (!phone.trim()) {
      newErrors.phone = "Mobile Number is required.";
    } else if (phone.trim().length < 8) {
      newErrors.phone = "Please enter a valid mobile number (min 8 digits).";
    }
    if (!location.trim()) newErrors.location = "Location / City is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/vlog/jeenusoni/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          phone,
          location,
          businessName,
          advertisementType,
          budget,
          message,
          contactMethod,
          website_hp: websiteHp,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSuccessMessage(json.message || "Thank you! Your request has been received.");
        // Reset form
        setClientName("");
        setPhone("");
        setLocation("");
        setBusinessName("");
        setMessage("");
      } else {
        if (json.errors) {
          setErrors(json.errors);
        } else {
          setErrors({ _form: json.error || "Failed to submit request. Please try again." });
        }
      }
    } catch (err: any) {
      setErrors({ _form: "Network error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="collab-form" className="py-24 px-4 relative bg-gradient-to-b from-[#0A0507] via-[#15070F] to-[#0A0507]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-rose-900/20 to-[#E8C39E]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="rounded-[2.5rem] bg-black/60 backdrop-blur-2xl border border-[#E8C39E]/30 p-8 sm:p-12 shadow-[0_0_60px_rgba(139,0,50,0.25)] space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/20 text-xs font-mono uppercase tracking-widest text-[#E8C39E]">
              <Sparkles size={14} className="text-rose-400" />
              Brands & Event Collaborations
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Partner With <span className="bg-gradient-to-r from-[#FCE7D4] to-[#E8C39E] bg-clip-text text-transparent">Jeenu Soni</span>
            </h2>
            <p className="text-zinc-300 text-sm font-light">
              Elevate your brand with luxury promotions, Instagram reels, high-fashion unboxings, and event appearances.
            </p>
          </div>

          {/* Success State */}
          {successMessage ? (
            <div className="p-8 rounded-3xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-4 animate-fade-in">
              <CheckCircle2 size={48} className="mx-auto text-emerald-400 animate-bounce" />
              <h3 className="text-2xl font-serif font-bold text-white">{successMessage}</h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                Our team will review your campaign details and contact you via your preferred method shortly.
              </p>
              <button
                onClick={() => setSuccessMessage(null)}
                className="mt-4 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form level error */}
              {errors._form && (
                <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs text-center font-medium">
                  {errors._form}
                </div>
              )}

              {/* Honeypot field (hidden from real users) */}
              <input
                type="text"
                name="website_hp"
                value={websiteHp}
                onChange={(e) => setWebsiteHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden pointer-events-none"
              />

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Client Name (Required) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-serif font-bold text-rose-100 flex items-center gap-1.5">
                    Client / Contact Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Ananya Sharma"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#E8C39E] transition-all ${
                        errors.clientName ? "border-rose-500" : "border-white/10"
                      }`}
                      required
                    />
                  </div>
                  {errors.clientName && <p className="text-[11px] text-rose-400 font-medium">{errors.clientName}</p>}
                </div>

                {/* Phone Number (Required) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-serif font-bold text-rose-100 flex items-center gap-1.5">
                    Mobile / Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#E8C39E] transition-all ${
                        errors.phone ? "border-rose-500" : "border-white/10"
                      }`}
                      required
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-400 font-medium">{errors.phone}</p>}
                </div>

                {/* Location (Required) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-serif font-bold text-rose-100 flex items-center gap-1.5">
                    City / Location <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="e.g. Mumbai / Delhi / Dubai"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#E8C39E] transition-all ${
                        errors.location ? "border-rose-500" : "border-white/10"
                      }`}
                      required
                    />
                  </div>
                  {errors.location && <p className="text-[11px] text-rose-400 font-medium">{errors.location}</p>}
                </div>

                {/* Business Name (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-serif font-bold text-rose-100 flex items-center gap-1.5">
                    Business / Brand Name <span className="text-zinc-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="e.g. Luxe Jewelry House"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#E8C39E] transition-all"
                    />
                  </div>
                </div>

                {/* Advertisement Type (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-serif font-bold text-rose-100">Advertisement / Collab Type</label>
                  <select
                    value={advertisementType}
                    onChange={(e) => setAdvertisementType(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#140810] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E8C39E] transition-all"
                  >
                    <option value="Instagram Reel & Story">Instagram Reel & Story</option>
                    <option value="Brand Ambassador / Sponsorship">Brand Ambassador / Sponsorship</option>
                    <option value="Event Appearance & Red Carpet">Event Appearance & Red Carpet</option>
                    <option value="Product Unboxing & Review">Product Unboxing & Review</option>
                    <option value="Vlog Integration">Vlog Integration</option>
                    <option value="Other Custom Campaign">Other Custom Campaign</option>
                  </select>
                </div>

                {/* Budget Range (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-serif font-bold text-rose-100">Estimated Budget Range</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#140810] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E8C39E] transition-all"
                  >
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                    <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                    <option value="₹5,00,000+">₹5,00,000+</option>
                    <option value="Flexible / Negotiable">Flexible / Negotiable</option>
                  </select>
                </div>
              </div>

              {/* Message (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-serif font-bold text-rose-100 flex items-center gap-1.5">
                  Campaign Details / Message <span className="text-zinc-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details about your brand, goals, timeline, or specific event date..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#E8C39E] transition-all"
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-rose-100 block">Preferred Contact Method</label>
                <div className="flex gap-4">
                  {["WhatsApp", "Phone Call", "Email"].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={contactMethod === method}
                        onChange={(e) => setContactMethod(e.target.value)}
                        className="accent-rose-500"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-rose-950 via-[#4A0E17] to-rose-950 hover:from-rose-900 hover:to-rose-900 text-[#FCE7D4] font-serif font-bold text-sm border border-[#E8C39E]/40 shadow-[0_0_30px_rgba(139,0,50,0.5)] hover:shadow-[0_0_45px_rgba(232,195,158,0.4)] flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
              >
                <Send size={16} className="text-[#E8C39E]" />
                {loading ? "Submitting Campaign Request..." : "Submit Brand Collaboration Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
