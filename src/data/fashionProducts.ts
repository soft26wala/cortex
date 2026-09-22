import { Product, ProductReview } from '@/types/store';

export const FASHION_PRODUCTS: Product[] = [
  {
    id: 'fsh-01',
    slug: 'royal-banarasi-silk-saree',
    title: 'Royal Banarasi Kadwa Zari Saree',
    subtitle: 'Pure Mulberry Silk with hand-woven 24K tested gold Zari brocade',
    category: 'Silk Sarees',
    description: 'A masterpiece from the master weavers of Varanasi. Handloomed over 45 days using pure Mulberry silk and real tested gold Zari. Features intricate Kadwa floral motifs and royal Katan silk texture.',
    price: 18999,
    startingPrice: 14999,
    images: [
      '/images/fashion/saree.jpg',
      '/images/fashion/pashmina.jpg',
      '/images/fashion/sherwani.jpg'
    ],
    thumbnail: '/images/fashion/saree.jpg',
    tags: ['HERITAGE WEAVE', 'HANDWOVEN', 'GI CERTIFIED', 'BESTSELLER'],
    occasion: 'Wedding',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Standard Saree + Unstitched Blouse (5.5m + 0.8m)', dimensions: '5.5 Meters', priceModifier: 0 },
      { id: 's2', name: 'Saree + Custom Tailored Blouse (Padded/Zari)', dimensions: 'Bespoke Fit', priceModifier: 2500 }
    ],
    materials: [
      '100% Pure Mulberry Katan Silk',
      'Tested 24K Gold Zari Thread',
      'Handloomed in Varanasi, Uttar Pradesh'
    ],
    dimensions: '5.5m Saree + 80cm Blouse Fabric',
    careInstructions: 'Dry clean only. Store wrapped in pure muslin cloth.',
    shippingInfo: 'Includes Silk Mark Certification. Ships in 2-4 business days in a luxury wooden saree trunk.',
    featured: true,
    bestseller: true,
    limited: true,
    rating: 4.98,
    reviewCount: 45,
    pricingType: 'FIXED_PRICE',
    customOptions: [
      { id: 'c1', label: 'Bespoke Blouse Neckline', type: 'select', options: ['Deep Sweetheart', 'Royal High Collar', 'Traditional Round', 'Sleeveless Glass'], required: false },
      { id: 'c2', label: 'Bust & Waist Measurements (Inches)', type: 'text', placeholder: 'e.g. Bust: 36, Waist: 30' }
    ],
    createdAt: '2026-02-01'
  },
  {
    id: 'fsh-02',
    slug: 'imperial-kashmiri-pashmina-shawl',
    title: 'Imperial Kashmiri Sozni Pashmina',
    subtitle: 'Hand-spun Grade-A Changthangi Cashmere with needle Sozni embroidery',
    category: 'Pashmina & Shawls',
    description: 'Woven from hand-spun Changthangi goat fiber in the valleys of Kashmir. Takes over 600 hours of painstaking hand needle Sozni embroidery featuring traditional Paisley and Chinar leaf motifs.',
    price: 24499,
    startingPrice: 18999,
    images: [
      '/images/fashion/pashmina.jpg',
      '/images/fashion/saree.jpg',
      '/images/fashion/sherwani.jpg'
    ],
    thumbnail: '/images/fashion/pashmina.jpg',
    tags: ['ROYAL HERITAGE', 'KASHMIRI PASHMINA', 'HAND EMBROIDERED', 'EXCLUSIVE'],
    occasion: 'Personalized',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Full Shawl (100cm x 200cm)', dimensions: '100cm x 200cm', priceModifier: 0 },
      { id: 's2', name: 'Grand Stole (70cm x 200cm)', dimensions: '70cm x 200cm', priceModifier: -3000 }
    ],
    materials: [
      '100% Certified Pashmina Cashmere (14.5 micron)',
      'Hand-spun Silk Needlework',
      'Crafted in Srinagar, Kashmir'
    ],
    dimensions: '100cm x 200cm',
    careInstructions: 'Dry clean only. Pass through ring tested for authentic softness.',
    shippingInfo: 'Includes Pashmark authenticity tag. Ships in 3 business days.',
    featured: true,
    bestseller: true,
    rating: 5.0,
    reviewCount: 38,
    pricingType: 'FIXED_PRICE',
    createdAt: '2026-02-10'
  },
  {
    id: 'fsh-03',
    slug: 'royal-zardozi-velvet-sherwani',
    title: 'Royal Zardozi Velvet Sherwani',
    subtitle: 'Deep crimson micro-velvet with hand-embroidered Zardozi & Dabka threadwork',
    category: 'Menswear Couture',
    description: 'Designed for royal groom celebrations. Crafted from deep crimson Italian micro-velvet adorned with hand-stitched Zardozi metallic coils, pearl embellishments, and antique brass buttons.',
    price: 32000,
    startingPrice: 18000,
    images: [
      '/images/fashion/sherwani.jpg',
      '/images/fashion/saree.jpg',
      '/images/fashion/pashmina.jpg'
    ],
    thumbnail: '/images/fashion/sherwani.jpg',
    tags: ['BESPOKE COUTURE', 'BRIDAL MENSWEAR', 'ZARDOZI', 'CUSTOM FIT'],
    occasion: 'Wedding',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Standard Fit (38 / 40 / 42)', dimensions: 'Chest 38"-42"', priceModifier: 0 },
      { id: 's2', name: 'Bespoke Tailored Measure + Churidar Set', dimensions: 'Custom Fit', priceModifier: 4000 }
    ],
    materials: [
      'Imported Deep Crimson Micro-Velvet',
      'Handcrafted Zardozi & Metallic Dabka',
      'Antique Brass Coin Buttons'
    ],
    dimensions: 'Bespoke Length & Chest',
    careInstructions: 'Specialist dry clean only.',
    shippingInfo: 'Custom tailored in 10-14 days. Delivered with custom garment bag & wooden hanger.',
    featured: true,
    bestseller: false,
    limited: true,
    rating: 4.95,
    reviewCount: 21,
    pricingType: 'CUSTOM_QUOTE',
    createdAt: '2026-02-15'
  },
  {
    id: 'fsh-04',
    slug: 'heritage-kanjeevaram-temple-brocade',
    title: 'Heritage Kanjeevaram Temple Brocade',
    subtitle: 'Heavy weight South silk with woven zari Korvai borders',
    category: 'Silk Sarees',
    description: 'Authentic Kanchipuram silk woven with interlocking Korvai border technique. Features temple architecture borders, peacock pallu motifs, and rich lustrous silk weight.',
    price: 22999,
    startingPrice: 16999,
    images: [
      '/images/fashion/saree.jpg',
      '/images/fashion/pashmina.jpg'
    ],
    thumbnail: '/images/fashion/saree.jpg',
    tags: ['KANJEEVARAM', 'SOUTH SILK', 'TEMPLE BORDER', 'HERITAGE'],
    occasion: 'Wedding',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Standard Saree + Blouse Fabric', dimensions: '6.2 Meters', priceModifier: 0 }
    ],
    materials: ['100% Pure Mulberry South Silk', 'Heavy Gold Zari Inlay'],
    dimensions: '5.5m Saree + 80cm Blouse',
    careInstructions: 'Dry clean only.',
    shippingInfo: 'Dispatched in 3-5 days.',
    featured: false,
    bestseller: true,
    rating: 4.91,
    reviewCount: 29,
    pricingType: 'FIXED_PRICE',
    createdAt: '2026-02-20'
  },
  {
    id: 'fsh-05',
    slug: 'lucknowi-chikankari-organza-anarkali',
    title: 'Lucknowi Chikankari Organza Anarkali',
    subtitle: 'Hand-stitched Shadow-work Chikankari on silk organza',
    category: 'Couture Dresses',
    description: 'Delicate hand-embroidered Lucknowi Chikankari featuring Bakhiya, Tepchi, and Phanda stitches on crisp ivory silk organza with hand-cut scalloped borders.',
    price: 14499,
    startingPrice: 9999,
    images: [
      '/images/fashion/saree.jpg',
      '/images/fashion/sherwani.jpg'
    ],
    thumbnail: '/images/fashion/saree.jpg',
    tags: ['CHIKANKARI', 'LUCKNOWI', 'ORGANZA', 'ELEGANT'],
    occasion: 'Anniversary',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Ready-to-Wear (S / M / L)', dimensions: 'Standard', priceModifier: 0 },
      { id: 's2', name: 'Custom Tailored Stitching', dimensions: 'Custom Fit', priceModifier: 1500 }
    ],
    materials: ['Silk Organza', 'Pure Cotton Thread Embroidery'],
    dimensions: 'Custom Length',
    careInstructions: 'Dry clean only.',
    shippingInfo: 'Handcrafted in 5 business days.',
    featured: false,
    bestseller: false,
    rating: 4.88,
    reviewCount: 16,
    pricingType: 'FIXED_PRICE',
    createdAt: '2026-02-25'
  },
  {
    id: 'fsh-06',
    slug: 'handwoven-chanderi-tissue-dupatta',
    title: 'Handwoven Chanderi Metallic Dupatta',
    subtitle: 'Sheer silk-cotton tissue with hand-blocked gold foil prints',
    category: 'Pashmina & Shawls',
    description: 'Lightweight sheer Chanderi weave with gold tissue threads running through the warp. Finished with hand-stitched gota patti borders and tassel accents.',
    price: 8999,
    startingPrice: 5999,
    images: [
      '/images/fashion/pashmina.jpg',
      '/images/fashion/saree.jpg'
    ],
    thumbnail: '/images/fashion/pashmina.jpg',
    tags: ['CHANDERI', 'DUPATTA', 'GOLD METALLIC', 'LIGHTWEIGHT'],
    occasion: 'Personalized',
    available: true,
    customizable: false,
    sizes: [
      { id: 's1', name: 'Standard Dupatta (2.5 Meters)', dimensions: '2.5m x 1m', priceModifier: 0 }
    ],
    materials: ['Chanderi Silk Tissue', 'Real Metallic Thread'],
    dimensions: '2.5m x 1m',
    careInstructions: 'Dry clean only.',
    shippingInfo: 'Dispatched in 2 days.',
    featured: false,
    bestseller: false,
    rating: 4.85,
    reviewCount: 14,
    pricingType: 'FIXED_PRICE',
    createdAt: '2026-03-01'
  },
  {
    id: 'fsh-07',
    slug: 'raw-silk-nehru-jacket',
    title: 'Raw Silk Bespoke Nehru Jacket',
    subtitle: 'Hand-loomed Bhagalpuri Raw Silk with solid brass crest buttons',
    category: 'Menswear Couture',
    description: 'Sophisticated sleeveless jacket crafted from hand-spun Bhagalpuri raw silk. Features mandarin collar, structured chest padding, and vintage brass royal crest buttons.',
    price: 11499,
    startingPrice: 7999,
    images: [
      '/images/fashion/sherwani.jpg',
      '/images/fashion/pashmina.jpg'
    ],
    thumbnail: '/images/fashion/sherwani.jpg',
    tags: ['RAW SILK', 'NEHRU JACKET', 'MENSWEAR', 'BESPOKE'],
    occasion: 'Personalized',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Standard Chest 38-44', dimensions: 'Standard', priceModifier: 0 },
      { id: 's2', name: 'Bespoke Tailored Fit', dimensions: 'Custom', priceModifier: 1200 }
    ],
    materials: ['Bhagalpuri Raw Silk', 'Cotton Satin Lining', 'Brass Crest Buttons'],
    dimensions: 'Custom Chest & Waist',
    careInstructions: 'Dry clean only.',
    shippingInfo: 'Handcrafted in 5 days.',
    featured: false,
    bestseller: true,
    rating: 4.94,
    reviewCount: 32,
    pricingType: 'FIXED_PRICE',
    createdAt: '2026-03-05'
  },
  {
    id: 'fsh-08',
    slug: 'handloomed-tussar-silk-wrap',
    title: 'Handloomed Tussar Silk Regal Wrap',
    subtitle: 'Wild Tussar silk with hand-painted Kalamkari border',
    category: 'Pashmina & Shawls',
    description: 'Eco-friendly wild Tussar silk with rich textured golden sheen. Features hand-painted Kalamkari mythology panels along the borders.',
    price: 9499,
    startingPrice: 6499,
    images: [
      '/images/fashion/pashmina.jpg',
      '/images/fashion/saree.jpg'
    ],
    thumbnail: '/images/fashion/pashmina.jpg',
    tags: ['TUSSAR SILK', 'KALAMKARI', 'HAND-PAINTED', 'ARTISAN'],
    occasion: 'Personalized',
    available: true,
    customizable: true,
    sizes: [
      { id: 's1', name: 'Standard Wrap (2.2m x 0.9m)', dimensions: '2.2m x 0.9m', priceModifier: 0 }
    ],
    materials: ['Wild Tussar Silk', 'Natural Vegetable Dyes'],
    dimensions: '2.2m x 0.9m',
    careInstructions: 'Dry clean only.',
    shippingInfo: 'Dispatched in 3 days.',
    featured: true,
    bestseller: false,
    rating: 4.90,
    reviewCount: 18,
    pricingType: 'CUSTOM_QUOTE',
    createdAt: '2026-03-10'
  }
];

export const FASHION_REVIEWS: ProductReview[] = [
  {
    id: 'fr1',
    author: 'Sunita Singhania',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '1 week ago',
    comment: 'The Banarasi Kadwa Saree is pure perfection. The silk weight and real gold zari sheen feel so regal. Delivered in a gorgeous wooden saree trunk!',
    productTitle: 'Royal Banarasi Kadwa Zari Saree',
    verifiedPurchase: true
  },
  {
    id: 'fr2',
    author: 'Rajiv & Radhika Mehta',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Ordered the custom Zardozi Velvet Sherwani for our wedding reception. The bespoke measurement fitting on WhatsApp was seamless. Truly Sabyasachi-level finish!',
    productTitle: 'Royal Zardozi Velvet Sherwani',
    verifiedPurchase: true
  }
];
