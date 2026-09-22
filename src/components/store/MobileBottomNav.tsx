'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useStoreCart } from '@/store/useStoreCart';
import { useStoreWishlist } from '@/store/useStoreWishlist';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const cartTotal = useStoreCart((state) => state.getTotalItems());
  const openCart = useStoreCart((state) => state.openCart);

  const wishlistTotal = useStoreWishlist((state) => state.items.length);
  const openWishlist = useStoreWishlist((state) => state.openWishlist);

  const openCustomModal = useCustomDesignStore((state) => state.openModal);

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0A0E]/90 backdrop-blur-xl border-t border-[#D4AF37]/20 py-2 px-4 flex items-center justify-around text-center">
      <Link
        href="/store/handwork"
        className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
          pathname === '/store/handwork' ? 'text-[#E6C762]' : 'text-[#9CA3AF]'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>

      <Link
        href="/store/handwork#collections"
        className="flex flex-col items-center gap-1 text-[10px] font-medium text-[#9CA3AF] hover:text-[#E6C762]"
      >
        <Compass className="w-5 h-5" />
        <span>Explore</span>
      </Link>

      <button
        onClick={() => openCustomModal()}
        className="flex flex-col items-center gap-1 text-[10px] font-bold text-[#E6C762]"
      >
        <div className="p-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black shadow-lg">
          <Sparkles className="w-5 h-5" />
        </div>
        <span>Custom</span>
      </button>

      <button
        onClick={openWishlist}
        className="flex flex-col items-center gap-1 text-[10px] font-medium text-[#9CA3AF] hover:text-[#E6C762] relative"
      >
        <Heart className="w-5 h-5" />
        <span>Wishlist</span>
        {wishlistTotal > 0 && (
          <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-black font-bold text-[9px] flex items-center justify-center">
            {wishlistTotal}
          </span>
        )}
      </button>

      <button
        onClick={openCart}
        className="flex flex-col items-center gap-1 text-[10px] font-medium text-[#9CA3AF] hover:text-[#E6C762] relative"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Cart</span>
        {cartTotal > 0 && (
          <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-black font-bold text-[9px] flex items-center justify-center">
            {cartTotal}
          </span>
        )}
      </button>
    </div>
  );
};
