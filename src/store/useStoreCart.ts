import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductSize, PricingType } from '@/types/store';

interface StoreCartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    selectedSize: ProductSize,
    quantity?: number,
    customText?: string,
    customDate?: string,
    customColors?: string,
    customNote?: string
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  generateWhatsAppMessage: () => string;
}

export const useStoreCart = create<StoreCartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (
        product,
        selectedSize,
        quantity = 1,
        customText,
        customDate,
        customColors,
        customNote
      ) => {
        const items = get().items;
        const instanceId = `${product.id}-${selectedSize.id}-${customText || ''}-${customDate || ''}`;
        
        const existingIndex = items.findIndex((i) => i.id === instanceId);
        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex].quantity += quantity;
          set({ items: updated, isOpen: true });
        } else {
          const newItem: CartItem = {
            id: instanceId,
            product,
            selectedSize,
            quantity,
            customText,
            customDate,
            customColors,
            customNote,
            pricingType: product.pricingType,
          };
          set({ items: [...items, newItem], isOpen: true });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          if (item.pricingType === 'CUSTOM_QUOTE') return sum;
          const basePrice = item.product.price + item.selectedSize.priceModifier;
          return sum + basePrice * item.quantity;
        }, 0);
      },

      generateWhatsAppMessage: () => {
        const items = get().items;
        if (items.length === 0) return '';

        let message = `*✨ New Order / Design Request from Handwork by CortexStack*\n\n`;
        items.forEach((item, index) => {
          message += `*Item ${index + 1}: ${item.product.title}*\n`;
          message += `• Size: ${item.selectedSize.name}\n`;
          message += `• Pricing: ${item.pricingType === 'CUSTOM_QUOTE' ? 'Custom Quote Required' : `₹${item.product.price + item.selectedSize.priceModifier}`}\n`;
          message += `• Quantity: ${item.quantity}\n`;
          if (item.customText) message += `• Custom Name/Text: ${item.customText}\n`;
          if (item.customDate) message += `• Date: ${item.customDate}\n`;
          if (item.customColors) message += `• Color Pref: ${item.customColors}\n`;
          if (item.customNote) message += `• Notes: ${item.customNote}\n`;
          message += `\n`;
        });

        const subtotal = get().getSubtotal();
        if (subtotal > 0) {
          message += `*Estimated Fixed Total:* ₹${subtotal.toLocaleString('en-IN')}\n`;
        }
        message += `\nPlease confirm availability and custom craft time. Thank you!`;
        return encodeURIComponent(message);
      },
    }),
    {
      name: 'cortex-handwork-cart',
    }
  )
);
