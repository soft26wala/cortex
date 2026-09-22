'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ShoppingBag, Send, ArrowLeft, Check, ShieldCheck, Truck, Clock, Info, Scissors } from 'lucide-react';
import { FASHION_PRODUCTS } from '@/data/fashionProducts';
import { useStoreCart } from '@/store/useStoreCart';
import { useStoreWishlist } from '@/store/useStoreWishlist';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';

export default function FashionProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const product = FASHION_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'customization' | 'materials' | 'care' | 'shipping'>('description');

  // Customization inputs
  const [customText, setCustomText] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customNote, setCustomNote] = useState('');

  const addItem = useStoreCart((state) => state.addItem);
  const toggleWishlist = useStoreWishlist((state) => state.toggleWishlist);
  const isInWishlist = useStoreWishlist((state) => state.isInWishlist(product.id));
  const openCustomModal = useCustomDesignStore((state) => state.openModal);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const totalPrice = (product.price + selectedSize.priceModifier) * quantity;

  const handleAddToCart = () => {
    addItem(
      product,
      selectedSize,
      quantity,
      customText,
      customDate,
      undefined,
      customNote
    );
  };

  return (
    <div className="py-12 bg-[#070D0B] min-h-screen text-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
          <Link href="/store/fashion" className="hover:text-[#E6C762] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Luxury Apparel & Weaves</span>
          </Link>
          <span>/</span>
          <span className="text-[#F5F0EB] font-medium">{product.title}</span>
        </div>

        {/* Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Gallery Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#0F1E19] shadow-2xl">
              <Image
                src={product.images[selectedImageIndex] || product.thumbnail}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border transition-all z-10 ${
                  isInWishlist
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black scale-110 shadow-lg'
                    : 'bg-black/50 border-white/20 text-white hover:border-[#D4AF37]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-black' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.title} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Purchasing Column */}
          <div className="lg:col-span-5 space-y-8 bg-[#0B1411] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl">
            
            <div className="space-y-2 border-b border-white/10 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E6C762]">
                  {product.category}
                </span>
                {product.rating && (
                  <span className="text-xs text-[#E6C762] font-semibold">
                    ★ {product.rating} ({product.reviewCount} reviews)
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#F5F0EB]">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="text-xs text-[#9CA3AF] font-light leading-relaxed">
                  {product.subtitle}
                </p>
              )}

              {/* Price */}
              <div className="pt-3 flex items-baseline gap-3">
                {product.pricingType === 'CUSTOM_QUOTE' ? (
                  <div>
                    <span className="text-xs text-[#9CA3AF] block">Starting from</span>
                    <span className="text-2xl font-bold text-[#E6C762] font-serif">
                      ₹{product.startingPrice?.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs text-[#9CA3AF] block">Handwoven Craft Price</span>
                    <span className="text-3xl font-bold text-[#F5F0EB] font-serif">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Size / Stitching Option */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#F5F0EB] uppercase tracking-wider block">
                Garment & Tailoring Option
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.sizes.map((sz, idx) => (
                  <button
                    key={sz.id}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                      selectedSizeIndex === idx
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E6C762] font-bold'
                        : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:border-white/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{sz.name}</span>
                      {sz.priceModifier !== 0 && (
                        <span className="text-[#E6C762]">
                          +{sz.priceModifier > 0 ? `₹${sz.priceModifier}` : `-₹${Math.abs(sz.priceModifier)}`}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Measurement Inputs */}
            {product.customizable && (
              <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-[#D4AF37]/30">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#E6C762]">
                  <Scissors className="w-4 h-4" />
                  <span>Custom Measurements & Fitting Notes</span>
                </div>

                <div>
                  <label className="text-[11px] text-[#9CA3AF] block mb-1">Bust / Chest / Waist Measurements</label>
                  <input
                    type="text"
                    placeholder="e.g. Bust: 36, Waist: 30, Shoulder: 15"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#9CA3AF] block mb-1">Blouse Neckline / Sleeve Length Preference</label>
                  <input
                    type="text"
                    placeholder="e.g. Deep Sweetheart neckline, 10 inch elbow sleeves"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            {/* Quantity & CTA */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#9CA3AF]">Quantity:</span>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-sm font-bold text-[#9CA3AF] hover:text-white"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-sm font-bold text-[#9CA3AF] hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {product.pricingType === 'CUSTOM_QUOTE'
                      ? 'Add Bespoke Request To Cart'
                      : 'Add To Cart'}
                  </span>
                </button>

                <button
                  onClick={() => openCustomModal(product.title, selectedSize.name)}
                  className="w-full py-3.5 rounded-2xl bg-white/5 border border-white/15 text-[#F5F0EB] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#E6C762]" />
                  <span>Request Full Bespoke Customization</span>
                </button>
              </div>
            </div>

            {/* Notice */}
            <div className="p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-start gap-2.5 text-xs text-[#E6C762]">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Includes Silk Mark / Pashmark authenticity tag. Handwoven with care.</span>
            </div>
          </div>
        </div>

        {/* Specifications Tabs */}
        <div className="bg-[#0B1411] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-4 border-b border-white/10 overflow-x-auto pb-2">
            {[
              { id: 'description', label: 'Description' },
              { id: 'customization', label: 'Blouse & Fit Customization' },
              { id: 'materials', label: 'Pure Silk & Fiber Origin' },
              { id: 'care', label: 'Garment Care' },
              { id: 'shipping', label: 'Shipping & Packaging' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap relative transition-colors ${
                  activeTab === tab.id ? 'text-[#E6C762]' : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="text-sm text-[#9CA3AF] font-light leading-relaxed">
            {activeTab === 'description' && <p>{product.description}</p>}
            {activeTab === 'customization' && (
              <div className="space-y-2">
                <p>We provide custom padded blouse stitching, sherwani fitting, and sleeve customization.</p>
                <p>After placing your order, our master couturier will connect with you on WhatsApp to double check all measurements.</p>
              </div>
            )}
            {activeTab === 'materials' && (
              <ul className="list-disc list-inside space-y-1">
                {product.materials.map((mat, i) => (
                  <li key={i}>{mat}</li>
                ))}
              </ul>
            )}
            {activeTab === 'care' && <p>{product.careInstructions}</p>}
            {activeTab === 'shipping' && <p>{product.shippingInfo}</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
