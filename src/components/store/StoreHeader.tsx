'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, Youtube, ShieldCheck, Settings } from 'lucide-react';
import { useStoreCart } from '@/store/useStoreCart';
import { useStoreWishlist } from '@/store/useStoreWishlist';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';
import { useSessionStore } from '@/store/session.store';

interface StoreHeaderProps {
  onOpenSearch: () => void;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartTotal = useStoreCart((state) => state.getTotalItems());
  const openCart = useStoreCart((state) => state.openCart);

  const wishlistTotal = useStoreWishlist((state) => state.items.length);
  const openWishlist = useStoreWishlist((state) => state.openWishlist);

  const openCustomModal = useCustomDesignStore((state) => state.openModal);
  const { user } = useSessionStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (pathname === '/store/handwork' || pathname === path) {
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '/store/handwork' },
    { name: 'Collections', href: '/store/handwork#collections' },
    { name: 'Custom Design', href: '/store/handwork#custom-design' },
    { name: 'Craft Videos', href: '/store/handwork#videos' },
    { name: 'Gallery', href: '/store/handwork#gallery' },
    { name: 'How It Works', href: '/store/handwork#how-it-works' },
    { name: 'Admin Studio', href: '/store/handwork/admin', isAdmin: true }
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0E]/90 backdrop-blur-2xl border-b border-[#D4AF37]/25 shadow-2xl py-3.5'
          : 'bg-[#0A0A0E]/80 backdrop-blur-xl border-b border-white/10 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/store/handwork" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#0A0A0E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-lg group-hover:border-[#D4AF37] transition-all">
            <Sparkles className="w-5 h-5 text-[#E6C762] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider font-serif text-[#F5F0EB]">
                HANDWORK
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#E6C762] border border-[#D4AF37]/30">
                LUXURY ART
              </span>
            </div>
            <p className="text-[10px] text-[#9CA3AF] tracking-widest uppercase">by CortexStack</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            if (link.isAdmin) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6C762] font-semibold text-xs flex items-center gap-1.5 hover:bg-[#D4AF37]/30 transition-all shadow-md"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Admin Studio</span>
                </Link>
              );
            }
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-[#E6C762] ${
                  isActive ? 'text-[#E6C762]' : 'text-[#F5F0EB]/90'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Search, Wishlist, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#F5F0EB]/90 hover:text-[#E6C762] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all"
            aria-label="Search Store"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={openWishlist}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#F5F0EB]/90 hover:text-[#E6C762] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all relative"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistTotal > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black font-bold text-[10px] flex items-center justify-center">
                {wishlistTotal}
              </span>
            )}
          </button>

          <button
            onClick={openCart}
            className="p-2.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#C5A059]/20 border border-[#D4AF37]/40 text-[#E6C762] hover:bg-[#D4AF37]/30 transition-all relative flex items-center gap-2 px-3.5"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-semibold">Cart</span>
            {cartTotal > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-black font-bold text-[10px] flex items-center justify-center">
                {cartTotal}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#F5F0EB]"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0E] border-b border-[#D4AF37]/20 px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setMobileMenuOpen(false);
                }}
                className={`text-base font-medium transition-colors py-2 border-b border-white/5 flex items-center justify-between ${
                  link.isAdmin ? 'text-[#E6C762] font-bold' : 'text-[#F5F0EB] hover:text-[#E6C762]'
                }`}
              >
                <span>{link.name}</span>
                {link.isAdmin && <Settings className="w-4 h-4 text-[#E6C762]" />}
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCustomModal();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-sm tracking-wider uppercase shadow-lg"
            >
              Start Custom Design
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
