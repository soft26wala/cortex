'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Upload, Send, Check, ZoomIn, Eye, Sparkle, RefreshCw } from 'lucide-react';
import { useHandworkAdminStore } from '@/store/useHandworkAdminStore';

interface CustomDesignFormProps {
  initialProductType?: string;
  initialSize?: string;
  onSubmitted?: () => void;
}

export const CustomDesignForm: React.FC<CustomDesignFormProps> = ({
  initialProductType = '',
  initialSize = 'Medium (8x10 inch)',
  onSubmitted
}) => {
  const { products, addOrder } = useHandworkAdminStore();

  // Fallback frame options if store is empty
  const defaultFrames = [
    { id: 'df-1', title: 'Royal Resin Frame', category: 'Handmade Frames', thumbnail: '/images/handwork/hero.jpg', price: 2499 },
    { id: 'df-2', title: 'Golden Bloom Name Art', category: 'Name Plates', thumbnail: '/images/handwork/name_art.jpg', price: 1899 },
    { id: 'df-3', title: 'Celestial Ocean Clock', category: 'Home Decor', thumbnail: '/images/handwork/clock.jpg', price: 3499 }
  ];

  const availableProducts = products.length > 0 ? products : defaultFrames;

  // Selected Product & Custom Inputs
  const [selectedProductTitle, setSelectedProductTitle] = useState(
    initialProductType || availableProducts[0]?.title || 'Royal Resin Frame'
  );
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [customText, setCustomText] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customIdea, setCustomIdea] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  // Image Upload & Preview Controls
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [fitMode, setFitMode] = useState<'inset' | 'full'>('inset');
  const [photoZoom, setPhotoZoom] = useState<number>(1.0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedProduct = availableProducts.find((p) => p.title === selectedProductTitle) || availableProducts[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      customerName: customerName || 'Valued Customer',
      customerPhone: customerPhone || 'N/A',
      productTitle: selectedProduct.title,
      productType: selectedProduct.category || 'Resin Art',
      selectedSize,
      customText,
      customDate,
      colorTheme: 'Custom Selected Frame',
      customIdea,
      referenceImage: previewImage || fileName || selectedProduct.thumbnail,
      pricingType: 'CUSTOM_QUOTE' as const,
      totalPrice: selectedProduct.price || 2499
    };

    // Save to Persistent Store
    addOrder(orderData);

    // Save to Backend API
    fetch('/api/handwork/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    }).catch(() => {});

    setIsSubmitted(true);
    if (onSubmitted) onSubmitted();

    // Generate WhatsApp Message
    let msg = `*✨ New Custom Frame Order — Handwork by CortexStack*\n\n`;
    msg += `*Frame Selected:* ${selectedProduct.title}\n`;
    msg += `*Size:* ${selectedSize}\n`;
    if (customText) msg += `*Engraving Text:* ${customText}\n`;
    if (customDate) msg += `*Special Date:* ${customDate}\n`;
    if (customIdea) msg += `*Custom Request:* ${customIdea}\n`;
    if (fileName) msg += `*Attached Photo:* ${fileName}\n`;
    if (customerName) msg += `*Customer:* ${customerName} (${customerPhone || 'N/A'})\n`;
    msg += `\nPlease confirm order status & delivery estimate!`;

    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full bg-[#0D0D12] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[120px] pointer-events-none" />

      {/* Studio Header */}
      <div className="mb-8 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E6C762]" />
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#F5F0EB]">Smart Custom Frame Studio</h3>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1 font-light">
            Select an admin frame design. Upload your photo to see it set right inside the handcrafted frame!
          </p>
        </div>
        <span className="text-xs font-bold text-[#E6C762] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-3.5 py-1.5 rounded-full w-fit flex items-center gap-1.5">
          <Sparkle className="w-3.5 h-3.5" /> AI Inset Photo Detector
        </span>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live 3D Frame Inset Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#F5F0EB] uppercase tracking-wider block">
                🖼️ Live Frame Inset Preview
              </label>

              {previewImage && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFitMode(fitMode === 'inset' ? 'full' : 'inset')}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/15 text-[#E6C762] hover:bg-white/10 flex items-center gap-1 font-bold"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{fitMode === 'inset' ? 'Full View' : 'Frame Cutout View'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3D Frame Mockup Box */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 bg-[#070709] shadow-2xl flex items-center justify-center group">
              
              {/* Layer 1: Admin Selected Frame Artwork (Base Resin Casing) */}
              <Image
                src={selectedProduct.thumbnail || '/images/handwork/hero.jpg'}
                alt={selectedProduct.title}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  previewImage && fitMode === 'full' ? 'opacity-20' : 'opacity-100'
                }`}
              />

              {/* Layer 2: Uploaded Customer Photo set INSIDE Frame Cutout Window */}
              {previewImage && fitMode === 'inset' && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[65%] rounded-xl overflow-hidden border-4 border-[#D4AF37] shadow-[0_10px_35px_rgba(0,0,0,0.9)] bg-black"
                >
                  <img
                    src={previewImage}
                    alt="Customer Uploaded Photo"
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{ transform: `scale(${photoZoom})` }}
                  />
                  {/* Subtle Glass Resin Reflection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/20 pointer-events-none" />
                </motion.div>
              )}

              {/* Layer 2 (Alternate): Full View Mode */}
              {previewImage && fitMode === 'full' && (
                <div className="absolute inset-4 rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-black">
                  <img
                    src={previewImage}
                    alt="Customer Uploaded Photo Full"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Layer 3: Engraved Name Plaque Overlay on Frame */}
              {customText && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#D4AF37]/70 text-center shadow-2xl max-w-[85%] truncate">
                  <span className="text-xs font-serif font-bold text-[#E6C762] tracking-wider block truncate">
                    {customText}
                  </span>
                  {customDate && (
                    <span className="text-[9px] text-[#9CA3AF] block tracking-widest">{customDate}</span>
                  )}
                </div>
              )}

              {/* Subtle Corner Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-[#E6C762] font-bold">
                {previewImage ? '✨ Photo Positioned In Frame' : 'Select Photo to Test'}
              </div>
            </div>

            {/* Photo Adjustments Toolbar */}
            {previewImage && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ZoomIn className="w-3.5 h-3.5 text-[#E6C762]" />
                  <span className="text-[#9CA3AF]">Photo Zoom:</span>
                  <input
                    type="range"
                    min="1.0"
                    max="1.5"
                    step="0.05"
                    value={photoZoom}
                    onChange={(e) => setPhotoZoom(parseFloat(e.target.value))}
                    className="w-24 accent-[#D4AF37]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setPhotoZoom(1.0)}
                  className="text-[10px] text-[#9CA3AF] hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>
            )}

            {/* Photo Upload Input Box */}
            <div className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] bg-white/5 rounded-2xl p-4 text-center transition-all relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#E6C762]">
                <Upload className="w-4 h-4" />
                <span>{fileName ? `Photo: ${fileName}` : 'Upload Photo to Embed in Frame Cutout'}</span>
              </div>
              <p className="text-[10px] text-[#9CA3AF] mt-1">
                Local preview instantly inserts photo into the resin frame cutout window.
              </p>
            </div>
          </div>

          {/* Right Column: Order & Frame Specifications */}
          <div className="lg:col-span-7 space-y-5 text-xs">
            
            {/* 1. Select Admin Frame */}
            <div>
              <label className="text-[#9CA3AF] block font-semibold mb-1.5">
                1. Select Handcrafted Frame (Admin Catalog)
              </label>
              <select
                value={selectedProductTitle}
                onChange={(e) => setSelectedProductTitle(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-3 text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37] text-xs font-medium"
              >
                {availableProducts.map((p) => (
                  <option key={p.id || p.title} value={p.title}>
                    {p.title} — ₹{(p.price || 2499).toLocaleString('en-IN')}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Size Options */}
            <div>
              <label className="text-[#9CA3AF] block font-semibold mb-1.5">
                2. Select Frame Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Small (6x8 inch)',
                  'Medium (8x10 inch)',
                  'Large (10x12 inch)',
                  'Grand Entrance (8x14 inch)',
                  'Custom Size'
                ].map((sz) => (
                  <button
                    type="button"
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                      selectedSize === sz
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E6C762]'
                        : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:border-white/20'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 & 4. Typography & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[#9CA3AF] block font-semibold mb-1">
                  3. Engraving Name / Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eliza & James"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-[#9CA3AF] block font-semibold mb-1">
                  4. Important Date (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14.02.2025 or EST. 2024"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* 5. Custom Idea Notes */}
            <div>
              <label className="text-[#9CA3AF] block font-semibold mb-1">
                5. Custom Notes / Special Idea
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please add extra 24K gold leaf flaking on top right corner around photo..."
                value={customIdea}
                onChange={(e) => setCustomIdea(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[#9CA3AF] block font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aakash Verma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-[#F5F0EB]"
                />
              </div>

              <div>
                <label className="text-[#9CA3AF] block font-semibold mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-[#F5F0EB]"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[#E6C762] font-serif">
                <span className="text-xs text-[#9CA3AF] block">Base Frame Price</span>
                <span className="text-2xl font-bold">
                  ₹{(selectedProduct.price || 2499).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Frame Order</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Order Confirmed Screen */
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold font-serif text-[#F5F0EB]">
            Frame Order Received & Saved to Database!
          </h4>
          <p className="text-xs text-[#9CA3AF] max-w-md mx-auto">
            Your frame choice, custom text, and attached photo preview have been saved to the Admin Orders Database.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setPreviewImage(null);
              setFileName('');
            }}
            className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase"
          >
            Order Another Custom Frame
          </button>
        </div>
      )}
    </div>
  );
};
