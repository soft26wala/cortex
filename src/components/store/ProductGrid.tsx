'use client';

import React from 'react';
import { Product } from '@/types/store';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center bg-[#0D0D12] rounded-3xl border border-white/10 p-8">
        <p className="text-lg text-[#F5F0EB]/70 font-light">No handmade pieces matched your current filter criteria.</p>
        <p className="text-xs text-[#9CA3AF] mt-2">Try clearing your filters or search for another keyword like "resin" or "frame".</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
