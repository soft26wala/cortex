'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Upload, Send, ArrowRight, ArrowLeft, Info, FileImage } from 'lucide-react';

const PRODUCT_TYPES = [
  'Resin Frame',
  'Photo Frame',
  'Name Plate',
  'Couple Design',
  'Wedding Design',
  'Anniversary Design',
  'Birthday Design',
  'Memorial Design',
  'Baby Name Design',
  'Home Decor',
  'Custom Artwork',
  'Other Idea'
];

const SIZES = [
  { name: 'Small', desc: '6" x 8" — Compact Desk Keepsake' },
  { name: 'Medium', desc: '8" x 10" — Most Popular Wall/Desk' },
  { name: 'Large', desc: '10" x 12" — Statement Art Block' },
  { name: 'Extra Large', desc: '12" x 16" — Grand Centerpiece' },
  { name: 'Custom Size', desc: 'Tailored dimensions for your space' }
];

const COLOR_THEMES = [
  '24K Gold Leaf & Crimson Roses',
  'Champagne Gold & Baby Breath',
  'Deep Obsidian & Metallic Gold',
  'Ocean Turquoise Wave Swirls',
  'Pastel Pearl & Floral Preservation',
  'Custom Pigment Mix'
];

interface CustomDesignFormProps {
  initialProductType?: string;
  initialSize?: string;
  onSubmitted?: () => void;
}

export const CustomDesignForm: React.FC<CustomDesignFormProps> = ({
  initialProductType = 'Resin Frame',
  initialSize = 'Medium',
  onSubmitted
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [productType, setProductType] = useState(initialProductType);
  const [size, setSize] = useState(initialSize);
  const [colorTheme, setColorTheme] = useState(COLOR_THEMES[0]);
  const [nameOrText, setNameOrText] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customQuote, setCustomQuote] = useState('');
  const [customIdea, setCustomIdea] = useState('');
  const [fileName, setFileName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 7));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const generateWhatsAppString = () => {
    let msg = `*✨ New Custom Design Request — Handwork by CortexStack*\n\n`;
    msg += `*1. Product Type:* ${productType}\n`;
    msg += `*2. Size:* ${size}\n`;
    msg += `*3. Color / Theme:* ${colorTheme}\n`;
    if (nameOrText) msg += `*4. Name/Text:* ${nameOrText}\n`;
    if (customDate) msg += `*5. Important Date:* ${customDate}\n`;
    if (customQuote) msg += `*6. Quote/Message:* ${customQuote}\n`;
    msg += `*7. Idea Description:* ${customIdea || 'Not specified'}\n`;
    if (fileName) msg += `*Reference File:* ${fileName}\n`;
    if (customerName) msg += `*Customer:* ${customerName} (${customerPhone || 'N/A'})\n`;
    msg += `\nPlease provide a custom price quote & timeline for this piece!`;
    return encodeURIComponent(msg);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Save order into Admin store & backend API
    try {
      const { addOrder } = require('@/store/useHandworkAdminStore').useHandworkAdminStore.getState();
      addOrder({
        customerName: customerName || 'Valued Customer',
        customerPhone: customerPhone || 'N/A',
        productTitle: `${productType} (${colorTheme})`,
        productType,
        selectedSize: size,
        customText: nameOrText,
        customDate,
        colorTheme,
        customIdea,
        referenceImage: fileName,
        pricingType: 'CUSTOM_QUOTE',
        totalPrice: 2499
      });

      fetch('/api/handwork/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName || 'Valued Customer',
          customerPhone: customerPhone || 'N/A',
          productTitle: `${productType} (${colorTheme})`,
          productType,
          selectedSize: size,
          customText: nameOrText,
          customDate,
          colorTheme,
          customIdea,
          referenceImage: fileName,
          pricingType: 'CUSTOM_QUOTE',
          totalPrice: 2499
        })
      }).catch(() => {});
    } catch (err) {
      console.error('Order saving error:', err);
    }

    if (onSubmitted) onSubmitted();

    // Trigger WhatsApp redirect
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=${generateWhatsAppString()}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full bg-[#0D0D12] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[120px] pointer-events-none" />

      {/* Form Steps Indicator Header */}
      <div className="mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E6C762]" />
            <h3 className="text-xl font-bold font-serif text-[#F5F0EB]">Custom Design Studio</h3>
          </div>
          <span className="text-xs font-bold text-[#E6C762] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-3 py-1 rounded-full">
            Step 0{step} of 07
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 7) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* STEP 01: PRODUCT TYPE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#F5F0EB]">
                    Step 01: Choose What You Want Us To Create
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Select the product category or select "Other Idea" to share something unique.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {PRODUCT_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setProductType(type)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        productType === type
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E6C762] shadow-lg'
                          : 'bg-white/5 border-white/10 text-[#F5F0EB]/80 hover:border-white/30'
                      }`}
                    >
                      <span>{type}</span>
                      {productType === type && <Check className="w-4 h-4 text-[#E6C762]" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 02: SIZE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#F5F0EB]">
                    Step 02: Choose Size Dimension
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    All sizes are crafted with premium high-density depth.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {SIZES.map((sz) => (
                    <button
                      type="button"
                      key={sz.name}
                      onClick={() => setSize(sz.name)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        size === sz.name
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E6C762]'
                          : 'bg-white/5 border-white/10 text-[#F5F0EB]/80 hover:border-white/30'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold block">{sz.name}</span>
                        <span className="text-xs text-[#9CA3AF] font-light">{sz.desc}</span>
                      </div>
                      {size === sz.name && <Check className="w-5 h-5 text-[#E6C762]" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 03: STYLE & COLOR THEME */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#F5F0EB]">
                    Step 03: Select Aesthetic & Color Palette
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Choose the visual palette for your resin and botanical inclusions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {COLOR_THEMES.map((theme) => (
                    <button
                      type="button"
                      key={theme}
                      onClick={() => setColorTheme(theme)}
                      className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        colorTheme === theme
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E6C762]'
                          : 'bg-white/5 border-white/10 text-[#F5F0EB]/80 hover:border-white/30'
                      }`}
                    >
                      <span>✨ {theme}</span>
                      {colorTheme === theme && <Check className="w-4 h-4 text-[#E6C762]" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 04: UPLOAD REFERENCE PHOTO */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#F5F0EB]">
                    Step 04: Upload Reference Photos / Photos to Embed
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Upload the photo you want embedded in the resin, or an inspiration screenshot.
                  </p>
                </div>

                <div className="border-2 border-dashed border-[#D4AF37]/30 hover:border-[#D4AF37] bg-white/5 rounded-2xl p-8 text-center transition-all relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 text-[#E6C762] flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  {fileName ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-[#E6C762] font-semibold">
                      <FileImage className="w-4 h-4" />
                      <span>{fileName}</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-[#F5F0EB]">
                        Drag & Drop or Click to Upload Image
                      </p>
                      <p className="text-xs text-[#9CA3AF] mt-1">Supports JPG, PNG, WEBP up to 25MB</p>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 05: NAMES / DATES / TEXT */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#F5F0EB]">
                    Step 05: Add Personalized Names, Dates & Messages
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Leave blank if you prefer a clean floral/artwork design without lettering.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs text-[#9CA3AF] block mb-1">Names / Typography Text</label>
                    <input
                      type="text"
                      placeholder="e.g. Eliza & James / The Sharma Family"
                      value={nameOrText}
                      onChange={(e) => setNameOrText(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#9CA3AF] block mb-1">Special Date (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 24.11.2024 or EST. 2024"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#9CA3AF] block mb-1">Custom Quote / Vow Snippet</label>
                      <input
                        type="text"
                        placeholder="e.g. Forever & Always"
                        value={customQuote}
                        onChange={(e) => setCustomQuote(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 06: DESCRIBE YOUR IDEA */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#F5F0EB]">
                    Step 06: Describe Your Concept in Detail
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Tell us what you have in mind! Feel free to describe shapes, colors, or feelings.
                  </p>
                </div>

                <textarea
                  rows={4}
                  placeholder="Describe what you want us to create... (e.g. I want a 3D hexagon frame with deep obsidian resin bottom layer, golden leaves, and my wedding bouquet petals around our portrait)"
                  value={customIdea}
                  onChange={(e) => setCustomIdea(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37] placeholder-[#9CA3AF]"
                />
              </motion.div>
            )}

            {/* STEP 07: GET CUSTOM QUOTE & REVIEW */}
            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#F5F0EB]">
                    Step 07: Review & Request Custom Quote
                  </h4>
                  <p className="text-xs text-[#9CA3AF]">
                    Custom designs are priced individually based on size, raw resin volume, and intricacy.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-[#D4AF37]/30 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#9CA3AF]">Product:</span>
                    <span className="font-bold text-[#E6C762]">{productType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#9CA3AF]">Size:</span>
                    <span className="font-bold text-[#F5F0EB]">{size}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#9CA3AF]">Theme:</span>
                    <span className="text-[#F5F0EB]">{colorTheme}</span>
                  </div>
                  {nameOrText && (
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#9CA3AF]">Custom Text:</span>
                      <span className="text-[#F5F0EB] font-serif">"{nameOrText}"</span>
                    </div>
                  )}
                  {fileName && (
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#9CA3AF]">Attachment:</span>
                      <span className="text-[#E6C762]">{fileName}</span>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-start gap-2.5 text-xs text-[#E6C762]">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    No fixed checkout fee charged now. Our master resin artisan will review your inputs and reply with exact timeline and price quote!
                  </span>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F5F0EB]"
                  />
                  <input
                    type="tel"
                    placeholder="Your WhatsApp Number (Optional)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F5F0EB]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-[#F5F0EB] flex items-center gap-1.5 hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 7 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 shadow-lg"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:brightness-110 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Request Custom Quote on WhatsApp</span>
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold font-serif text-[#F5F0EB]">
            Custom Design Request Sent!
          </h4>
          <p className="text-xs text-[#9CA3AF] max-w-md mx-auto">
            Your custom specifications have been pre-filled for WhatsApp. Our artist will connect with you within 2 hours to confirm your custom piece.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase"
          >
            Create Another Design
          </button>
        </div>
      )}
    </div>
  );
};
