import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/store';

interface StoreWishlistState {
  items: Product[];
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlistDrawer: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useStoreWishlist = create<StoreWishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),
      toggleWishlistDrawer: () => set((state) => ({ isOpen: !state.isOpen })),

      toggleWishlist: (product) => {
        const items = get().items;
        const exists = items.some((p) => p.id === product.id);
        if (exists) {
          set({ items: items.filter((p) => p.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'cortex-handwork-wishlist',
    }
  )
);
