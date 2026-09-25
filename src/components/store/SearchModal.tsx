'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useHandworkAdminStore } from '@/store/useHandworkAdminStore';
import { Product } from '@/types/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const products = useHandworkAdminStore.getState().products;
    const q = query.toLowerCase();
    const filtered = products.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.occasion && p.occasion.toLowerCase().includes(q))
      );
    });
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const quickTags = ['Couple', 'Wedding', 'Name Art', 'Resin Clock', 'Preservation', 'Birthday'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-[#0D0D12] border border-[#D4AF37]/30 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Top Search Input */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3 bg-[#121217]">
            <Search className="w-5 h-5 text-[#E6C762] shrink-0" />
            <input
              type="text"
              placeholder="Search handcrafted pieces (e.g. couple, name art, wedding, clock)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-[#F5F0EB] text-sm sm:text-base focus:outline-none placeholder-[#9CA3AF]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#9CA3AF] hover:text-white"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#F5F0EB] hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto space-y-4">
            {/* Quick Suggestion Tags */}
            {!query && (
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E6C762] block">
                  Popular Custom Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#F5F0EB]/80 hover:border-[#D4AF37]/50 hover:text-[#E6C762] transition-all"
                    >
                      ✨ {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Grid */}
            {query && results.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs text-[#9CA3AF] block">
                  Found {results.length} handcrafted pieces matching "{query}"
                </span>
                <div className="space-y-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/store/handwork/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 transition-all group"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#121217]">
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#F5F0EB] group-hover:text-[#E6C762] truncate">
                          {product.title}
                        </h4>
                        <p className="text-xs text-[#9CA3AF] truncate">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#E6C762] font-serif block">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#E6C762] ml-auto mt-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results state */}
            {query && results.length === 0 && (
              <div className="py-12 text-center text-[#9CA3AF]">
                <p className="text-sm">No exact matches found for "{query}".</p>
                <p className="text-xs mt-1">Want a custom piece tailored to your idea?</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
