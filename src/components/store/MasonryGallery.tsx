'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, Send, Heart } from 'lucide-react';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  sizeTag: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Crimson Rose Memory Arch',
    category: 'Wedding',
    image: '/images/handwork/hero.jpg',
    caption: 'Preserved bridal roses with 24K gold flaking encased in optical epoxy.',
    sizeTag: '8x10 inch'
  },
  {
    id: 'g2',
    title: 'The Sharma Family Name Inlay',
    category: 'Names',
    image: '/images/handwork/name_art.jpg',
    caption: 'Metallic champagne typography on beveled obsidian acrylic.',
    sizeTag: '5x10 inch'
  },
  {
    id: 'g3',
    title: 'Turquoise Wave Horizon Clock',
    category: 'Decor',
    image: '/images/handwork/clock.jpg',
    caption: 'Hand-poured liquid ocean waves with brass Roman numerals.',
    sizeTag: '16 inch diameter'
  },
  {
    id: 'g4',
    title: 'Forever Couple Monogram',
    category: 'Couples',
    image: '/images/handwork/name_art.jpg',
    caption: 'Dual layer couple photo frame with anniversary vows engraved.',
    sizeTag: '8x10 inch'
  },
  {
    id: 'g5',
    title: 'Preserved Baby Footprint Keepsake',
    category: 'Memories',
    image: '/images/handwork/hero.jpg',
    caption: 'Newborn hospital metrics & footprints preserved in soft pearl resin.',
    sizeTag: '6x8 inch'
  },
  {
    id: 'g6',
    title: 'Golden Leaves Hexagon Clock',
    category: 'Custom',
    image: '/images/handwork/clock.jpg',
    caption: 'Custom geometric wall sculpture created for a private residence in Mumbai.',
    sizeTag: '24 inch statement'
  }
];

const GALLERY_TABS = ['All', 'Couples', 'Wedding', 'Names', 'Memories', 'Decor', 'Custom'];

export const MasonryGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const openCustomModal = useCustomDesignStore((state) => state.openModal);

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeTab === 'All' ? true : item.category === activeTab
  );

  return (
    <section id="gallery" className="py-20 bg-[#0A0A0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E6C762] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Masterpiece Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#F5F0EB]">
            Made By Hand. Made To Be Remembered.
          </h2>
          <p className="text-sm text-[#9CA3AF] font-light">
            Explore recent custom orders handcrafted by our master resin studio.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {GALLERY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-[#D4AF37] text-black shadow-lg'
                  : 'bg-white/5 border border-white/10 text-[#F5F0EB]/80 hover:border-[#D4AF37]/50 hover:text-[#E6C762]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#121217] border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer shadow-xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

              {/* Hover Details */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <span className="text-[10px] uppercase font-bold text-[#E6C762] tracking-wider block">
                  {item.category} • {item.sizeTag}
                </span>
                <h4 className="text-base font-bold font-serif text-[#F5F0EB] mt-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-[#9CA3AF] line-clamp-1 mt-1 font-light">
                  {item.caption}
                </p>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[#E6C762]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-4xl bg-[#0D0D12] border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Image */}
                <div className="relative aspect-square md:aspect-auto w-full h-full min-h-[300px] bg-[#121217]">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right Info */}
                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6C762]">
                      {selectedItem.category} Piece
                    </span>
                    <h3 className="text-2xl font-bold font-serif text-[#F5F0EB]">
                      {selectedItem.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] font-light leading-relaxed">
                      {selectedItem.caption}
                    </p>
                    <div className="text-xs text-[#F5F0EB]/80 pt-2 border-t border-white/10">
                      <span>Dimensions: </span>
                      <strong className="text-[#E6C762]">{selectedItem.sizeTag}</strong>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <p className="text-xs text-[#9CA3AF]">Love this design idea? Order a similar custom piece crafted for your memory.</p>
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        openCustomModal(selectedItem.title);
                      }}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Order Similar Custom Piece</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
