import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, HandworkOrder, HandworkVideo, OrderStatus } from '@/types/store';
import { HANDWORK_PRODUCTS } from '@/data/handworkProducts';

interface HandworkAdminState {
  products: Product[];
  orders: HandworkOrder[];
  videos: HandworkVideo[];

  // Product Actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Order Actions
  addOrder: (order: Omit<HandworkOrder, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => HandworkOrder;
  updateOrderStatus: (id: string, status: OrderStatus, adminNotes?: string) => void;
  updateOrderPrice: (id: string, newPrice: number) => void;

  // Video Actions
  addVideo: (title: string, youtubeUrl: string, description: string, category?: string) => void;
  deleteVideo: (id: string) => void;

  // Store Management
  clearAllDemoData: () => void;
  loadSampleData: () => void;
}

const INITIAL_VIDEOS: HandworkVideo[] = [
  {
    id: 'vid-01',
    title: 'Handmade Resin Frame Crafting & Gold Leaf Inlay',
    youtubeUrl: 'https://www.youtube.com/watch?v=l917j0L-t8A',
    youtubeId: 'l917j0L-t8A',
    description: 'Watch how master artisans craft optical resin photo frames with gold leaf flecks and preserved crimson roses.',
    category: 'Handmade Frames',
    featured: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'vid-02',
    title: 'Personalized Resin Name Plate Making Process',
    youtubeUrl: 'https://www.youtube.com/watch?v=rX7Q_Z3o8iE',
    youtubeId: 'rX7Q_Z3o8iE',
    description: 'Step-by-step casting of champagne gold acrylic typography in deep obsidian resin with white baby breath flowers.',
    category: 'Name Plates',
    featured: true,
    createdAt: '2026-02-15'
  },
  {
    id: 'vid-03',
    title: 'Preserving Wedding Bouquet Flowers in Resin Block',
    youtubeUrl: 'https://www.youtube.com/watch?v=J---aiyznGQ',
    youtubeId: 'J---aiyznGQ',
    description: 'Preserving wedding bouquet roses and memories into a crystal clear optical resin hexagon prism block.',
    category: 'Preservation',
    featured: true,
    createdAt: '2026-02-20'
  }
];

const INITIAL_ORDERS: HandworkOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'HW-2026-8801',
    customerName: 'Aakash Verma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'aakash.verma@example.com',
    productTitle: 'Royal Resin Frame',
    productType: 'Resin Frame',
    selectedSize: 'Medium (8x10 inch)',
    customText: 'Aakash & Simran',
    customDate: '14.02.2025',
    colorTheme: '24K Gold Leaf & Crimson Roses',
    customIdea: 'Please add 24K gold foil flakes on the top right corner around our photo.',
    pricingType: 'FIXED_PRICE',
    totalPrice: 3299,
    status: 'In Progress',
    createdAt: '2026-03-18'
  },
  {
    id: 'ord-102',
    orderNumber: 'HW-2026-8802',
    customerName: 'Priya & Rohan',
    customerPhone: '+91 99887 76655',
    productTitle: 'Golden Bloom Name Art',
    productType: 'Name Plate',
    selectedSize: 'Grand Entrance (8x14 inch)',
    customText: 'The Mehta Residence - EST. 2024',
    colorTheme: 'Champagne Gold & Baby Breath',
    customIdea: 'Gold lettering with dense white baby breath border.',
    pricingType: 'CUSTOM_QUOTE',
    totalPrice: 2999,
    status: 'Pending',
    createdAt: '2026-03-20'
  }
];

export const extractYoutubeId = (url: string): string => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : 'l917j0L-t8A';
};

export const useHandworkAdminStore = create<HandworkAdminState>()(
  persist(
    (set, get) => ({
      products: [],
      orders: [],
      videos: [],

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `hw-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0]
        };
        set({ products: [newProduct, ...get().products] });
      },

      updateProduct: (id, updatedFields) => {
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...updatedFields } : p
          )
        });
      },

      deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) });
      },

      addOrder: (orderData) => {
        const orderNum = `HW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const newOrder: HandworkOrder = {
          ...orderData,
          id: `ord-${Date.now()}`,
          orderNumber: orderNum,
          status: 'Pending',
          createdAt: new Date().toISOString().split('T')[0]
        };
        set({ orders: [newOrder, ...get().orders] });
        return newOrder;
      },

      updateOrderStatus: (id, status, adminNotes) => {
        set({
          orders: get().orders.map((o) =>
            o.id === id ? { ...o, status, ...(adminNotes ? { adminNotes } : {}) } : o
          )
        });
      },

      updateOrderPrice: (id, newPrice) => {
        set({
          orders: get().orders.map((o) =>
            o.id === id ? { ...o, totalPrice: newPrice } : o
          )
        });
      },

      addVideo: (title, youtubeUrl, description, category = 'Artisan Craft') => {
        const ytId = extractYoutubeId(youtubeUrl);
        const newVideo: HandworkVideo = {
          id: `vid-${Date.now()}`,
          title,
          youtubeUrl,
          youtubeId: ytId,
          description,
          category,
          featured: true,
          createdAt: new Date().toISOString().split('T')[0]
        };
        set({ videos: [newVideo, ...get().videos] });
      },

      deleteVideo: (id) => {
        set({ videos: get().videos.filter((v) => v.id !== id) });
      },

      clearAllDemoData: () => {
        set({ products: [], orders: [], videos: [] });
      },

      loadSampleData: () => {
        set({
          products: HANDWORK_PRODUCTS,
          orders: INITIAL_ORDERS,
          videos: INITIAL_VIDEOS
        });
      }
    }),
    {
      name: 'cortex-handwork-admin-store'
    }
  )
);
