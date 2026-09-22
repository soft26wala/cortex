import type { Metadata } from 'next';
import React from 'react';
import { HandworkClientLayout } from './HandworkClientLayout';

export const metadata: Metadata = {
  title: 'Handmade Resin Art & Custom Designs | Handwork by CortexStack',
  description:
    'Discover premium handmade resin art, personalized frames and custom designs crafted specially for your memories. Your Memory. Your Design. Handmade.',
  keywords: [
    'Handmade Resin Art',
    'Custom Resin Frame',
    'Personalized Name Plate',
    'Wedding Flower Preservation',
    'Couple Memory Frame',
    'Epoxy Art India',
    'Handwork CortexStack'
  ],
  openGraph: {
    title: 'Handmade Resin Art & Custom Designs | Handwork by CortexStack',
    description:
      'Premium handmade resin art, personalized frames and custom creations designed around your story.',
    url: 'https://cortestack.com/store/handwork',
    siteName: 'Handwork by CortexStack',
    images: [
      {
        url: '/images/handwork/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Handwork Premium Resin Art'
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
};

export default function HandworkLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <HandworkClientLayout>{children}</HandworkClientLayout>;
}
