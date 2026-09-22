'use client';

import React from 'react';
import { FilterState } from '@/types/store';
import { Filter, SlidersHorizontal, Check } from 'lucide-react';

interface CategoryFilterProps {
  filterState: FilterState;
  onChange: (newState: FilterState) => void;
  categories: string[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  filterState,
  onChange,
  categories,
}) => {
  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Customer Rating', value: 'rating' },
  ];

  return (
    <div className="bg-[#0D0D12] border border-white/10 rounded-2xl p-4 sm:p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => onChange({ ...filterState, category: 'All' })}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filterState.category === 'All'
                ? 'bg-[#D4AF37] text-black shadow-lg'
                : 'bg-white/5 border border-white/10 text-[#F5F0EB]/80 hover:border-[#D4AF37]/50 hover:text-[#E6C762]'
            }`}
          >
            All Pieces
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ ...filterState, category: cat })}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterState.category === cat
                  ? 'bg-[#D4AF37] text-black shadow-lg'
                  : 'bg-white/5 border border-white/10 text-[#F5F0EB]/80 hover:border-[#D4AF37]/50 hover:text-[#E6C762]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting & Additional Toggles */}
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-xs text-[#F5F0EB]/80 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterState.customizableOnly}
              onChange={(e) =>
                onChange({ ...filterState, customizableOnly: e.target.checked })
              }
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37]"
            />
            <span>Customizable Only</span>
          </label>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#E6C762]" />
            <select
              value={filterState.sortBy}
              onChange={(e) =>
                onChange({ ...filterState, sortBy: e.target.value as any })
              }
              className="bg-black/60 border border-white/15 text-[#F5F0EB] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0D0D12] text-white">
                  Sort: {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
