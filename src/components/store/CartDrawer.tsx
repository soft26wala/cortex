'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, Sparkles } from 'lucide-react';
import { useStoreCart } from '@/store/useStoreCart';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, generateWhatsAppMessage } =
    useStoreCart();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=${generateWhatsAppMessage()}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#0D0D12] border-l border-[#D4AF37]/30 text-[#F5F0EB] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121217]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E6C762]" />
                <h2 className="text-lg font-bold font-serif text-[#F5F0EB]">Your Handwork Cart</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#E6C762] border border-[#D4AF37]/30">
                  {items.length} items
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#9CA3AF]">
                    <ShoppingBag className="w-8 h-8 text-[#D4AF37]/50" />
                  </div>
                  <p className="text-sm text-[#9CA3AF] font-light">Your handcrafted cart is currently empty.</p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider"
                  >
                    Explore Signature Collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4 relative group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#121217]">
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-sm font-bold text-[#F5F0EB] truncate font-serif">
                        {item.product.title}
                      </h4>
                      <p className="text-xs text-[#9CA3AF]">Size: {item.selectedSize.name}</p>

                      {item.customText && (
                        <p className="text-[11px] text-[#E6C762] truncate">
                          Text: "{item.customText}"
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-bold text-[#E6C762]">
                          {item.pricingType === 'CUSTOM_QUOTE'
                            ? 'Custom Quote'
                            : `₹${((item.product.price + item.selectedSize.priceModifier) * item.quantity).toLocaleString('en-IN')}`}
                        </span>

                        {/* Quantity control */}
                        <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-[#9CA3AF] hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-[#9CA3AF] hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 text-[#9CA3AF] hover:text-red-400 opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & WhatsApp Order CTA */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#121217] space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9CA3AF]">Est. Fixed Subtotal</span>
                  <span className="text-lg font-bold text-[#F5F0EB] font-serif">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <p className="text-[11px] text-[#9CA3AF] leading-snug">
                  ✨ Custom quote items will be calculated & confirmed by our master artist on WhatsApp.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Order to WhatsApp</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
