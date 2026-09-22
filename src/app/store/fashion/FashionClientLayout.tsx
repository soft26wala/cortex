'use client';

import React, { useState } from 'react';
import { StoreAnnouncementBar } from '@/components/store/StoreAnnouncementBar';
import { StoreHeader } from '@/components/store/StoreHeader';
import { StoreFooter } from '@/components/store/StoreFooter';
import { SearchModal } from '@/components/store/SearchModal';
import { CartDrawer } from '@/components/store/CartDrawer';
import { WishlistDrawer } from '@/components/store/WishlistDrawer';
import { CustomDesignModal } from '@/components/store/CustomDesignModal';
import { MobileBottomNav } from '@/components/store/MobileBottomNav';

export const FashionClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070D0B] text-[#F5F0EB] font-sans selection:bg-[#D4AF37] selection:text-black">
      <StoreAnnouncementBar />
      <StoreHeader onOpenSearch={() => setIsSearchOpen(true)} />
      
      <main className="pb-16 md:pb-0">{children}</main>

      <StoreFooter />

      {/* Global Store Drawers & Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer />
      <WishlistDrawer />
      <CustomDesignModal />
      <MobileBottomNav />
    </div>
  );
};
