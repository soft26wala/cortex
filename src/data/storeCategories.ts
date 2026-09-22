import { ProductCategory } from '@/types/store';

export const STORE_CATEGORIES: ProductCategory[] = [
  {
    id: 'cat-handwork',
    slug: 'handwork',
    name: 'Handwork & Resin Art',
    description: 'Custom epoxy designs, memory preservation frames, personalized name plates & luxury handmade decor.',
    image: '/images/handwork/hero.jpg',
    active: true,
    itemCount: 8,
    badge: 'FLAGSHIP STORE'
  },
  {
    id: 'cat-home-decor',
    slug: 'home-decor',
    name: 'Artisan Home Decor',
    description: 'Handcrafted ceramic vases, brass sculptures & ambient lighting creations.',
    image: '/images/handwork/clock.jpg',
    active: false,
    itemCount: 0,
    badge: 'COMING SOON'
  },
  {
    id: 'cat-fashion',
    slug: 'fashion',
    name: 'Luxury Apparel & Weaves',
    description: 'Handwoven Banarasi silks, certified Kashmiri Pashminas, bespoke Zardozi couture & artisan weaves.',
    image: '/images/fashion/saree.jpg',
    active: true,
    itemCount: 8,
    badge: 'HERITAGE STORE'
  },
  {
    id: 'cat-digital',
    slug: 'digital-products',
    name: 'Digital Art & 3D Assets',
    description: 'High-resolution digital wall art, 3D printable designs & bespoke design templates.',
    image: '/images/handwork/hero.jpg',
    active: false,
    itemCount: 0,
    badge: 'COMING SOON'
  }
];
