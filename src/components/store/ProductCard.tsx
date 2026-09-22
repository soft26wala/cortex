'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowUpRight, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types/store';
import { useStoreWishlist } from '@/store/useStoreWishlist';
import { useStoreCart } from '@/store/useStoreCart';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isInWishlist = useStoreWishlist((state) => state.isInWishlist(product.id));
  const toggleWishlist = useStoreWishlist((state) => state.toggleWishlist);
  const addItem = useStoreCart((state) => state.addItem);
  const openCustomModal = useCustomDesignStore((state) => state.openModal);

  const primaryImage = product.thumbnail || product.images[0] || '/images/handwork/hero.jpg';
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.pricingType === 'CUSTOM_QUOTE') {
      openCustomModal(product.title);
    } else {
      addItem(product, product.sizes[0], 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#0D0D12]/90 rounded-2xl border border-white/10 hover:border-[#D4AF37]/40 overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#121217]">
        {/* Main Image */}
        <Image
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-black/30 opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Badges & Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${
                tag === 'BESTSELLER'
                  ? 'bg-[#D4AF37]/90 text-black border-[#D4AF37]'
                  : tag === 'CUSTOM'
                  ? 'bg-purple-900/80 text-purple-200 border-purple-500/50'
                  : 'bg-black/60 text-[#F5F0EB] border-white/20'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md border transition-all z-10 ${
            isInWishlist
              ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg scale-110'
              : 'bg-black/40 border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-black' : ''}`} />
        </button>

        {/* Quick View / Action Button on Hover */}
        <div className="absolute bottom-4 inset-x-4 flex items-center gap-2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <Link
            href={`/store/handwork/product/${product.slug}`}
            className="flex-1 py-2.5 px-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-[#F5F0EB] font-medium text-xs flex items-center justify-center gap-2 hover:border-[#D4AF37] hover:text-[#E6C762] transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </Link>
          <button
            onClick={handleQuickAction}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.pricingType === 'CUSTOM_QUOTE' ? 'Custom Quote' : 'Add'}</span>
          </button>
        </div>
      </div>

      {/* Card Information Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-1">
            <span>{product.category}</span>
            {product.rating && (
              <span className="flex items-center gap-1 text-[#E6C762]">
                ★ {product.rating} ({product.reviewCount})
              </span>
            )}
          </div>
          
          <Link href={`/store/handwork/product/${product.slug}`}>
            <h3 className="text-lg font-bold font-serif text-[#F5F0EB] group-hover:text-[#E6C762] transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {product.subtitle && (
            <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-1 font-light">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div>
            {product.pricingType === 'CUSTOM_QUOTE' ? (
              <div>
                <span className="text-[11px] text-[#9CA3AF] block">Starting from</span>
                <span className="text-base font-bold text-[#E6C762] font-serif">
                  ₹{product.startingPrice?.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-xs text-[#9CA3AF] block">Fixed Craft Price</span>
                <span className="text-lg font-bold text-[#F5F0EB] font-serif">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>

          <Link
            href={`/store/handwork/product/${product.slug}`}
            className="p-2 rounded-full border border-white/10 group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/10 text-[#F5F0EB] group-hover:text-[#E6C762] transition-all"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
