import { Product, ProductReview } from '@/types/store';

export const HANDWORK_PRODUCTS: Product[] = [
  {
    id: 'hw-01',
    slug: 'royal-resin-frame',
    title: 'Royal Resin Frame',
    subtitle: 'Preserved crimson botanicals & 24K gold foil casing',
    category: 'Handmade Frames',
    description: 'A breathtaking handcrafted masterpiece combining crystal-clear optical grade resin with preserved crimson rose petals and hand-applied 24K gold leaf flaking. Tailored with a custom photograph cut to precision.',
    price: 2499,
    startingPrice: 1499,
    images: [
      '/images/handwork/hero.jpg',
      '/images/handwork/name_art.jpg',
      '/images/handwork/clock.jpg'
    ],
    thumbnail: '/images/handwork/hero.jpg',
    tags: ['BESTSELLER', 'HANDMADE', 'CUSTOM', 'POPULAR'],
    occasion: 'Wedding',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Small (6x8 inch)', dimensions: '6" x 8"', priceModifier: 0 },
      { id: 's2', name: 'Medium (8x10 inch)', dimensions: '8" x 10"', priceModifier: 800 },
      { id: 's3', name: 'Large (10x12 inch)', dimensions: '10" x 12"', priceModifier: 1500 },
      { id: 's4', name: 'Extra Large (12x16 inch)', dimensions: '12" x 16"', priceModifier: 2500 }
    ],
    materials: [
      'Ultra-Clear Epoxy Resin',
      'Real 24K Gold Leaf Flakes',
      'Preserved Natural Rose Petals',
      'UV-Resistant Protective Sealant'
    ],
    dimensions: '8" x 10" x 0.8"',
    careInstructions: 'Clean gently with a soft micro-fiber cloth. Keep away from direct harsh sunlight for prolonged longevity.',
    shippingInfo: 'Handmade to order in 3-5 business days. Ships securely with bubble wrap and luxury wooden presentation packaging.',
    featured: true,
    bestseller: true,
    limited: true,
    rating: 4.95,
    reviewCount: 38,
    pricingType: 'FIXED_PRICE',
    customOptions: [
      { id: 'c1', label: 'Names to Engrave / Display', type: 'text', placeholder: 'e.g. Eliza & James', required: true },
      { id: 'c2', label: 'Important Date', type: 'date', required: false },
      { id: 'c3', label: 'Custom Quote / Message', type: 'textarea', placeholder: 'e.g. Forever & Always' }
    ],
    createdAt: '2026-01-15'
  },
  {
    id: 'hw-02',
    slug: 'golden-bloom-name-art',
    title: 'Golden Bloom Name Art',
    subtitle: 'Custom acrylic typography encased in floral gold leaf resin',
    category: 'Name Plates',
    description: 'Transform your family name or couple monograms into an eternal heirloom. Features raised champagne-gold metallic lettering surrounded by real white dried baby breath flowers and gold accents.',
    price: 1899,
    startingPrice: 1299,
    images: [
      '/images/handwork/name_art.jpg',
      '/images/handwork/hero.jpg',
      '/images/handwork/clock.jpg'
    ],
    thumbnail: '/images/handwork/name_art.jpg',
    tags: ['CUSTOM', 'HANDMADE', 'NAME ART', 'MUST HAVE'],
    occasion: 'Anniversary',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Standard Desk (5x10 inch)', dimensions: '5" x 10"', priceModifier: 0 },
      { id: 's2', name: 'Grand Entrance (8x14 inch)', dimensions: '8" x 14"', priceModifier: 1100 },
      { id: 's3', name: 'Custom Architecture', dimensions: 'Tailored', priceModifier: 2000 }
    ],
    materials: [
      'Beveled Optical Acrylic',
      'Champagne Gold Metallic Inlay',
      'Dried Baby Breath Flowers',
      'Deep Obsidian Resin Backing'
    ],
    dimensions: '5" x 10" x 0.7"',
    careInstructions: 'Dust softly with microfiber. Avoid abrasive chemical cleansers.',
    shippingInfo: 'Dispatched within 4 days. Includes solid brass desk stands.',
    featured: true,
    bestseller: true,
    rating: 5.0,
    reviewCount: 42,
    pricingType: 'FIXED_PRICE',
    customOptions: [
      { id: 'c1', label: 'Family or Couple Name', type: 'text', placeholder: 'e.g. The Sharma Family / Alex & Sophia', required: true },
      { id: 'c2', label: 'Established Year / Date', type: 'text', placeholder: 'e.g. EST. 2024' }
    ],
    createdAt: '2026-02-01'
  },
  {
    id: 'hw-03',
    slug: 'celestial-ocean-resin-clock',
    title: 'Celestial Ocean Resin Clock',
    subtitle: 'Hand-poured ocean wave resin wall piece with gold Roman numerals',
    category: 'Home Decor',
    description: 'An enchanting focal point for any modern home. Multi-layered liquid turquoise waves poured by hand with metallic pearl veins and brushed gold Roman numerals, powered by a silent sweep clock mechanism.',
    price: 3499,
    startingPrice: 2499,
    images: [
      '/images/handwork/clock.jpg',
      '/images/handwork/hero.jpg',
      '/images/handwork/name_art.jpg'
    ],
    thumbnail: '/images/handwork/clock.jpg',
    tags: ['EXCLUSIVE', 'HANDMADE', 'HOME DECOR', 'LUXURY'],
    occasion: 'Home Decor',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Medium (12 inch diameter)', dimensions: '12" Diameter', priceModifier: 0 },
      { id: 's2', name: 'Large (16 inch diameter)', dimensions: '16" Diameter', priceModifier: 1500 },
      { id: 's3', name: 'Statement (24 inch diameter)', dimensions: '24" Diameter', priceModifier: 3800 }
    ],
    materials: [
      'Natural Teak Wood Base',
      'Pigmented Liquid Epoxy Waves',
      'Solid Brass Hands & Silent Quartz Movement',
      'High-Gloss Diamond Topcoat'
    ],
    dimensions: '16" Diameter x 1.2" Depth',
    careInstructions: 'Battery replacement requires single AA battery. Clean with damp cloth.',
    shippingInfo: 'Carefully crated and insured. Delivered in 5-7 business days.',
    featured: true,
    bestseller: false,
    limited: true,
    rating: 4.92,
    reviewCount: 29,
    pricingType: 'FIXED_PRICE',
    createdAt: '2026-01-20'
  },
  {
    id: 'hw-04',
    slug: 'forever-memories-preservation',
    title: 'Forever Memories Preservation Block',
    subtitle: 'Preserve wedding bouquets, milestone flowers & memory tokens forever',
    category: 'Resin Artwork',
    description: 'Don\'t let your wedding flowers wither away. Send us your special flowers, garlands, or memory keepsakes and we will preserve them forever inside a crystal clear resin block.',
    price: 3999,
    startingPrice: 2499,
    images: [
      '/images/handwork/hero.jpg',
      '/images/handwork/clock.jpg'
    ],
    thumbnail: '/images/handwork/hero.jpg',
    tags: ['CUSTOM', 'WEDDING', 'MEMORY PRESERVATION', 'BESTSELLER'],
    occasion: 'Wedding',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Cube Keepsake (4x4x4 inch)', dimensions: '4" x 4" x 4"', priceModifier: 0 },
      { id: 's2', name: 'Hexagon Prism (6x6x2 inch)', dimensions: '6" x 6" x 2"', priceModifier: 1200 },
      { id: 's3', name: 'Grand Arch (8x10x3 inch)', dimensions: '8" x 10" x 3"', priceModifier: 2500 }
    ],
    materials: [
      'De-aired Crystal Clear Polymer',
      'Customer-Supplied Dried Botanicals',
      'Optional Gold / Silver Foil Accents'
    ],
    dimensions: '6" x 6" x 2.5"',
    careInstructions: 'Keep in temperate environment away from direct heaters.',
    shippingInfo: 'Requires physical bouquet shipping. Handcrafted in 10-14 days after flower receipt.',
    featured: true,
    bestseller: true,
    rating: 4.98,
    reviewCount: 56,
    pricingType: 'CUSTOM_QUOTE',
    createdAt: '2026-02-10'
  },
  {
    id: 'hw-05',
    slug: 'elegant-couple-memory-frame',
    title: 'Elegant Couple Memory Frame',
    subtitle: 'Dual-layered 3D frame with photo depth, date plaque & foliage',
    category: 'Couple Design',
    description: 'Celebrate your love story with a custom layered portrait encased in liquid glass resin. Add your engagement date, wedding vow snippet, or custom initials in glittering gold foil.',
    price: 2899,
    startingPrice: 1799,
    images: [
      '/images/handwork/hero.jpg',
      '/images/handwork/name_art.jpg'
    ],
    thumbnail: '/images/handwork/hero.jpg',
    tags: ['COUPLE', 'ROMANTIC', 'ANNIVERSARY', 'PERSONALIZED'],
    occasion: 'Couple',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Standard (8x10 inch)', dimensions: '8" x 10"', priceModifier: 0 },
      { id: 's2', name: 'Deluxe (10x14 inch)', dimensions: '10" x 14"', priceModifier: 1100 }
    ],
    materials: [
      'Archival Matte Photo Paper',
      'Dual Layer Clear Epoxy Resin',
      'Natural Ferns & Foliage'
    ],
    dimensions: '8" x 10" x 1.0"',
    careInstructions: 'Wipe clean with glass-safe cloth.',
    shippingInfo: 'Handcrafted in 4 business days.',
    featured: false,
    bestseller: true,
    rating: 4.89,
    reviewCount: 23,
    pricingType: 'FIXED_PRICE',
    createdAt: '2026-02-14'
  },
  {
    id: 'hw-06',
    slug: 'baby-name-memory-plate',
    title: 'Baby Name & Birth Metric Plate',
    subtitle: 'Personalized nursery keepsake with birth date, time, weight & height',
    category: 'Baby Name Design',
    description: 'A priceless memory of your little one\'s arrival. Features baby name in soft pastel metallic tones, hospital ribbon option, and engraved birth metrics inside smooth rounded resin.',
    price: 2199,
    startingPrice: 1499,
    images: [
      '/images/handwork/name_art.jpg',
      '/images/handwork/hero.jpg'
    ],
    thumbnail: '/images/handwork/name_art.jpg',
    tags: ['BABY', 'NEWBORN', 'KEEPSAKE', 'CUSTOM'],
    occasion: 'Baby Name',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Nursery Desk (6x8 inch)', dimensions: '6" x 8"', priceModifier: 0 },
      { id: 's2', name: 'Wall Keepsake (9x12 inch)', dimensions: '9" x 12"', priceModifier: 900 }
    ],
    materials: [
      'Food-Safe Non-Toxic Resin',
      'Pastel Pearl Inclusions',
      'Gold Foil Birth Metrics'
    ],
    dimensions: '6" x 8" x 0.6"',
    careInstructions: 'Keep dry and wipe with soft cloth.',
    shippingInfo: 'Handcrafted in 3-5 days.',
    featured: false,
    bestseller: false,
    rating: 4.96,
    reviewCount: 19,
    pricingType: 'FIXED_PRICE',
    createdAt: '2026-02-20'
  },
  {
    id: 'hw-07',
    slug: 'monogram-floral-initial',
    title: 'Monogram Floral Resin Initial',
    subtitle: 'Free-standing 3D initial letter filled with real pressed hydrangeas',
    category: 'Customized Gifts',
    description: 'Elevate your desk, vanity, or shelf with a 6-inch solid resin initial letter filled with preserved colorful hydrangeas, gold leaf, and shimmering mica powder.',
    price: 1499,
    startingPrice: 999,
    images: [
      '/images/handwork/name_art.jpg',
      '/images/handwork/clock.jpg'
    ],
    thumbnail: '/images/handwork/name_art.jpg',
    tags: ['GIFT', 'MONOGRAM', 'HANDMADE', 'AFFORDABLE LUXURY'],
    occasion: 'Personalized',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: '6 Inch Letter', dimensions: '6" Height x 1.5" Depth', priceModifier: 0 },
      { id: 's2', name: '8 Inch Giant Letter', dimensions: '8" Height x 2" Depth', priceModifier: 700 }
    ],
    materials: [
      'High-Density Casting Resin',
      'Preserved Hydrangea Petals',
      'Fine Metallic Glitter'
    ],
    dimensions: '6" x 5" x 1.5"',
    careInstructions: 'Dust gently.',
    shippingInfo: 'Dispatched in 3 days.',
    featured: false,
    bestseller: false,
    rating: 4.91,
    reviewCount: 31,
    pricingType: 'FIXED_PRICE',
    createdAt: '2026-03-01'
  },
  {
    id: 'hw-08',
    slug: 'customized-photo-wall-art',
    title: 'Customized Photo Wall Art Canvas',
    subtitle: 'Large format backlit resin panel with liquid gold veins & your photo',
    category: 'Custom Artwork',
    description: 'Turn your favorite high-resolution photo into a museum-quality artwork. Hand-cast with gold leaf veins, crystalline gloss finish, and hidden warm LED backlighting option.',
    price: 5999,
    startingPrice: 3499,
    images: [
      '/images/handwork/hero.jpg',
      '/images/handwork/clock.jpg',
      '/images/handwork/name_art.jpg'
    ],
    thumbnail: '/images/handwork/hero.jpg',
    tags: ['STATEMENT PIECE', 'CUSTOM', 'LED ART', 'LUXURY'],
    occasion: 'Personalized',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Medium (12x18 inch)', dimensions: '12" x 18"', priceModifier: 0 },
      { id: 's2', name: 'Large (18x24 inch)', dimensions: '18" x 24"', priceModifier: 2500 },
      { id: 's3', name: 'Gallery Wall (24x36 inch)', dimensions: '24" x 36"', priceModifier: 6000 }
    ],
    materials: [
      'Architectural Grade Resin',
      'Custom UV Canvas Print',
      'Embedded Warm 3000K LED Strips (Optional)'
    ],
    dimensions: '18" x 24" x 1.5"',
    careInstructions: 'Plug into 12V adapter for LED glow.',
    shippingInfo: 'Ships in heavy-duty wooden box crate in 7 days.',
    featured: true,
    bestseller: false,
    limited: true,
    rating: 5.0,
    reviewCount: 14,
    pricingType: 'CUSTOM_QUOTE',
    createdAt: '2026-03-05'
  }
];

export const HANDWORK_REVIEWS: ProductReview[] = [
  {
    id: 'r1',
    author: 'Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Sublime craftsmanship! I ordered the Royal Resin Frame with our wedding photo and preserved rose petals. It looks like a high-end museum piece on our mantle.',
    productTitle: 'Royal Resin Frame',
    verifiedPurchase: true
  },
  {
    id: 'r2',
    author: 'Vikram & Meera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '1 month ago',
    comment: 'The Golden Bloom name plate exceeded all our expectations. The champagne gold lettering under clear resin with real white flowers is breathtaking!',
    productTitle: 'Golden Bloom Name Art',
    verifiedPurchase: true
  },
  {
    id: 'r3',
    author: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '3 weeks ago',
    comment: 'We preserved my bridal bouquet in the Forever Memories block. The team walked us through every step on WhatsApp and sent preview photos. 10/10 service!',
    productTitle: 'Forever Memories Preservation Block',
    verifiedPurchase: true
  }
];
