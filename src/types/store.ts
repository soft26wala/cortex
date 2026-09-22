export type PricingType = 'FIXED_PRICE' | 'CUSTOM_QUOTE';

export type OccasionTag = 
  | 'Wedding'
  | 'Anniversary'
  | 'Birthday'
  | 'Memorial'
  | 'Baby Name'
  | 'Couple'
  | 'Home Decor'
  | 'Personalized';

export type MaterialTag = 
  | 'Ultra-Clear Epoxy Resin'
  | 'Real Gold Leaf (24K)'
  | 'Preserved Natural Botanicals'
  | 'Solid Teak Wood Base'
  | 'Metallic Pigments'
  | 'Acrylic Typography';

export interface ProductSize {
  id: string;
  name: string;
  dimensions: string;
  priceModifier: number; // For fixed price adders
}

export interface ProductCustomOption {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'textarea' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  price: number;
  startingPrice?: number;
  images: string[];
  thumbnail: string;
  tags: string[];
  occasion?: OccasionTag;
  available: boolean;
  customizable: boolean;
  sizes: ProductSize[];
  materials: string[];
  dimensions?: string;
  careInstructions?: string;
  shippingInfo?: string;
  featured?: boolean;
  bestseller?: boolean;
  limited?: boolean;
  rating: number;
  reviewCount: number;
  pricingType: PricingType;
  customOptions?: ProductCustomOption[];
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  active: boolean;
  itemCount: number;
  badge?: string;
}

export interface CustomDesignRequest {
  productType: string;
  size: string;
  nameOrText?: string;
  date?: string;
  message?: string;
  quote?: string;
  colorPreference?: string;
  theme?: string;
  customIdea: string;
  referenceImageName?: string;
  customerName?: string;
  customerPhone?: string;
  createdAt?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
  customText?: string;
  customDate?: string;
  customColors?: string;
  customNote?: string;
  pricingType: PricingType;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  occasion: string;
  size: string;
  customizableOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
}

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  productTitle: string;
  verifiedPurchase: boolean;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';

export interface HandworkOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  productTitle: string;
  productType: string;
  selectedSize: string;
  customText?: string;
  customDate?: string;
  colorTheme?: string;
  customIdea?: string;
  referenceImage?: string;
  pricingType: PricingType;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface HandworkVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  description: string;
  category?: string;
  featured?: boolean;
  createdAt: string;
}

