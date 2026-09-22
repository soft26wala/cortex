import type { Metadata } from 'next';
import React from 'react';
import { FashionClientLayout } from './FashionClientLayout';

export const metadata: Metadata = {
  title: 'Luxury Apparel & Handwoven Weaves | CortexStack Store',
  description:
    'Discover handloomed Banarasi silks, certified Kashmiri Pashminas, bespoke royal Zardozi sherwanis, and heritage Indian weaves. Handwoven Indian Luxury.',
  keywords: [
    'Banarasi Silk Saree',
    'Kashmiri Pashmina Shawl',
    'Royal Zardozi Sherwani',
    'Kanjeevaram Temple Silk',
    'Bespoke Indian Couture',
    'Lucknowi Chikankari Organza',
    'CortexStack Luxury Apparel'
  ],
  openGraph: {
    title: 'Luxury Apparel & Handwoven Weaves | CortexStack Store',
    description:
      'Handloomed Banarasi silks, certified Kashmiri Pashminas, and bespoke hand-embroidered couture.',
    url: 'https://cortestack.com/store/fashion',
    siteName: 'Luxury Apparel & Weaves by CortexStack',
    images: [
      {
        url: '/images/fashion/saree.jpg',
        width: 1200,
        height: 630,
        alt: 'Handwoven Banarasi Silk Saree'
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
};

export default function FashionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <FashionClientLayout>{children}</FashionClientLayout>;
}
