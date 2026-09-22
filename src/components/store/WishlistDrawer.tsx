'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useStoreWishlist } from '@/store/useStoreWishlist';
import { useStoreCart } from '@/store/useStoreCart';

export const WishlistDrawer: React.FC = () => {
  const { items, isOpen, closeWishlist, toggleWishlist } = useStoreWishlist();
  const addItem = useStoreCart((state) => state.addItem);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeWishlist}
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
                <Heart className="w-5 h-5 text-[#E6C762] fill-[#E6C762]" />
                <h2 className="text-lg font-bold font-serif text-[#F5F0EB]">Your Saved Pieces</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#E6C762]">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeWishlist}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <Heart className="w-10 h-10 text-[#D4AF37]/40 mx-auto" />
                  <p className="text-sm text-[#9CA3AF]">You haven't saved any handcrafted pieces yet.</p>
                </div>
              ) : (
                items.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4 relative"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#121217]">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-sm font-bold text-[#F5F0EB] truncate font-serif">
                        {product.title}
                      </h4>
                      <span className="text-xs font-bold text-[#E6C762] block">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => {
                            addItem(product, product.sizes[0], 1);
                            toggleWishlist(product);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black font-bold text-[11px] flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Cart</span>
                        </button>
                        <Link
                          href={`/store/handwork/product/${product.slug}`}
                          onClick={closeWishlist}
                          className="px-3 py-1.5 rounded-lg border border-white/20 text-[#F5F0EB] font-medium text-[11px]"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-3 right-3 text-[#9CA3AF] hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
