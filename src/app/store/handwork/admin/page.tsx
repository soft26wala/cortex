'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  PackageCheck,
  Plus,
  Trash2,
  Edit,
  Youtube,
  Search,
  CheckCircle2,
  Clock,
  Send,
  ArrowLeft,
  DollarSign,
  Eye,
  Film,
  UserCheck,
  Lock,
  RefreshCw,
  Tag
} from 'lucide-react';
import { useSessionStore } from '@/store/session.store';
import { useHandworkAdminStore } from '@/store/useHandworkAdminStore';
import { OrderStatus, Product } from '@/types/store';

export default function HandworkAdminPage() {
  const { user, setAuth } = useSessionStore();
  const {
    products,
    orders,
    videos,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateOrderPrice,
    addVideo,
    deleteVideo,
    clearAllDemoData,
    loadSampleData
  } = useHandworkAdminStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'videos'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('All');
  
  // Product Form State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodTitle, setProdTitle] = useState('');
  const [prodSubtitle, setProdSubtitle] = useState('');
  const [prodCategory, setProdCategory] = useState('Resin Frame');
  const [prodPrice, setProdPrice] = useState(2499);
  const [prodStartingPrice, setProdStartingPrice] = useState(1499);
  const [prodImageUrl, setProdImageUrl] = useState('/images/handwork/hero.jpg');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPricingType, setProdPricingType] = useState<'FIXED_PRICE' | 'CUSTOM_QUOTE'>('FIXED_PRICE');

  // Video Form State
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [vidTitle, setVidTitle] = useState('');
  const [vidUrl, setVidUrl] = useState('');
  const [vidDesc, setVidDesc] = useState('');
  const [vidCategory, setVidCategory] = useState('Resin Crafting');

  // Image Presets for quick selection
  const imagePresets = [
    { label: 'Hero Frame', url: '/images/handwork/hero.jpg' },
    { label: 'Name Art', url: '/images/handwork/name_art.jpg' },
    { label: 'Ocean Clock', url: '/images/handwork/clock.jpg' },
    { label: 'Resin Art', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80' },
    { label: 'Floral Preservation', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' }
  ];

  // Role Access Validation: Allow Super Admin, Admin, HandworkAdmin, CDO
  const userRole = (user?.role || 'Guest').toLowerCase();
  const isAuthorized =
    userRole.includes('admin') ||
    userRole.includes('cdo') ||
    userRole.includes('handwork') ||
    userRole.includes('super');

  const handleGrantAccess = () => {
    setAuth('demo-token', 'demo-refresh', {
      id: user?.id || 'usr_admin',
      name: user?.name || 'Handwork Admin',
      email: user?.email || 'admin@cortestack.com',
      role: 'HandworkAdmin / CDO'
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title: prodTitle,
        subtitle: prodSubtitle,
        category: prodCategory,
        price: Number(prodPrice),
        startingPrice: Number(prodStartingPrice),
        thumbnail: prodImageUrl,
        images: [prodImageUrl, '/images/handwork/name_art.jpg'],
        description: prodDesc,
        pricingType: prodPricingType
      });
    } else {
      addProduct({
        slug: prodTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: prodTitle,
        subtitle: prodSubtitle || 'Handmade Bespoke Resin Creation',
        category: prodCategory,
        description: prodDesc || 'Handcrafted luxury resin creation.',
        price: Number(prodPrice),
        startingPrice: Number(prodStartingPrice),
        images: [prodImageUrl, '/images/handwork/name_art.jpg'],
        thumbnail: prodImageUrl,
        tags: ['HANDMADE', 'NEW', 'CUSTOM'],
        available: true,
        customizable: true,
        sizes: [{ id: 's1', name: 'Standard', dimensions: '8x10', priceModifier: 0 }],
        materials: ['Optical Epoxy Resin', 'Gold Leaf Inlay'],
        rating: 5.0,
        reviewCount: 1,
        pricingType: prodPricingType
      });
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vidUrl) return;
    addVideo(vidTitle || 'Crafting Process Video', vidUrl, vidDesc, vidCategory);
    setShowVideoModal(false);
    setVidTitle('');
    setVidUrl('');
    setVidDesc('');
  };

  const filteredOrders = orders.filter((o) =>
    orderFilter === 'All' ? true : o.status === orderFilter
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#070D0B] text-[#F5F0EB] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0D1512] border border-[#D4AF37]/30 shadow-2xl">
          <div className="flex items-center gap-3">
            <Link
              href="/store/handwork"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#F5F0EB] hover:text-[#E6C762]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-serif text-[#F5F0EB]">
                  Handwork Studio Admin Panel
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#E6C762] border border-[#D4AF37]/40 uppercase">
                  Role: {user?.role || 'CDO / HandworkAdmin'}
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                Full dynamic control: Products, Titles, Images, Prices, YouTube Videos & Orders.
              </p>
            </div>
          </div>

          {/* Quick Store Management Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all demo data? Store will be completely empty until you add items.')) {
                  clearAllDemoData();
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 font-bold text-xs hover:bg-red-900 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Demo Data</span>
            </button>

            <button
              onClick={() => {
                loadSampleData();
              }}
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-[#E6C762] font-bold text-xs hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Sample Products</span>
            </button>

            <div className="flex items-center gap-3 bg-black/40 border border-white/10 p-2 px-3 rounded-2xl ml-1">
              <UserCheck className="w-4 h-4 text-[#25D366]" />
              <div className="text-xs">
                <span className="font-bold block text-[#F5F0EB] text-[11px]">{user?.name || 'Handwork Admin'}</span>
              </div>
              {!isAuthorized && (
                <button
                  onClick={handleGrantAccess}
                  className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-black font-bold text-[10px] uppercase"
                >
                  Grant Access
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#0D1512] border border-white/10 space-y-2">
            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Total Orders</span>
            <div className="text-3xl font-bold font-serif text-[#F5F0EB]">{orders.length}</div>
            <p className="text-[11px] text-[#25D366] flex items-center gap-1">
              <PackageCheck className="w-3.5 h-3.5" /> Persistent Order Queue
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D1512] border border-white/10 space-y-2">
            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Catalog Products</span>
            <div className="text-3xl font-bold font-serif text-[#E6C762]">{products.length}</div>
            <p className="text-[11px] text-[#9CA3AF]">Live on /store/handwork</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D1512] border border-white/10 space-y-2">
            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">YouTube Craft Videos</span>
            <div className="text-3xl font-bold font-serif text-red-400">{videos.length}</div>
            <p className="text-[11px] text-[#9CA3AF]">Playing in Storefront Showcase</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D1512] border border-white/10 space-y-2">
            <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Estimated Revenue</span>
            <div className="text-3xl font-bold font-serif text-[#F5F0EB]">₹{totalRevenue.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-[#E6C762]">Custom Quotes + Fixed Sales</p>
          </div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#D4AF37] text-black shadow-lg'
                : 'bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Custom Requests ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#D4AF37] text-black shadow-lg'
                : 'bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Product Catalog & Price Manager ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'videos'
                ? 'bg-[#D4AF37] text-black shadow-lg'
                : 'bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Youtube className="w-4 h-4" />
            <span>YouTube Videos Showcase ({videos.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS & CUSTOM REQUESTS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              {['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    orderFilter === st
                      ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#E6C762]'
                      : 'bg-white/5 border border-white/10 text-[#9CA3AF]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="bg-[#0D1512] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#F5F0EB]">
                  <thead className="bg-[#070D0B] text-[#9CA3AF] uppercase text-[10px] border-b border-white/10">
                    <tr>
                      <th className="p-4">Order #</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Item & Size</th>
                      <th className="p-4">Custom Text / Idea</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-light">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-[#9CA3AF]">
                          No orders matched the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-bold text-[#E6C762] font-mono">
                            {ord.orderNumber}
                            <span className="block text-[10px] text-[#9CA3AF] font-normal">{ord.createdAt}</span>
                          </td>

                          <td className="p-4 font-medium">
                            <span className="block font-bold text-[#F5F0EB]">{ord.customerName}</span>
                            <span className="text-[#9CA3AF]">{ord.customerPhone}</span>
                          </td>

                          <td className="p-4">
                            <span className="font-serif font-bold text-[#F5F0EB] block">{ord.productTitle}</span>
                            <span className="text-[#9CA3AF] text-[11px]">{ord.selectedSize}</span>
                          </td>

                          <td className="p-4 max-w-xs">
                            {ord.customText && (
                              <p className="text-[#E6C762] truncate">Text: "{ord.customText}"</p>
                            )}
                            {ord.customIdea && (
                              <p className="text-[#9CA3AF] line-clamp-2 text-[11px] mt-0.5">{ord.customIdea}</p>
                            )}
                          </td>

                          <td className="p-4 font-bold text-[#E6C762]">
                            ₹{ord.totalPrice.toLocaleString('en-IN')}
                            <button
                              onClick={() => {
                                const val = prompt('Set new custom price (₹):', String(ord.totalPrice));
                                if (val && !isNaN(Number(val))) updateOrderPrice(ord.id, Number(val));
                              }}
                              className="text-[10px] text-[#9CA3AF] block underline hover:text-white"
                            >
                              Edit Price
                            </button>
                          </td>

                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                ord.status === 'Completed'
                                  ? 'bg-green-900/50 text-green-300 border border-green-500/40'
                                  : ord.status === 'In Progress'
                                  ? 'bg-amber-900/50 text-amber-300 border border-amber-500/40'
                                  : ord.status === 'Cancelled'
                                  ? 'bg-red-900/50 text-red-300 border border-red-500/40'
                                  : 'bg-blue-900/50 text-blue-300 border border-blue-500/40'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>

                          <td className="p-4 text-right space-x-2">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="bg-black/80 border border-white/20 text-[#F5F0EB] text-[11px] rounded-lg px-2 py-1 focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG & PRICE MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9CA3AF]">Manage prices, thumbnails, titles, and custom tags.</span>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProdTitle('');
                  setProdCategory('Resin Frame');
                  setProdPrice(2499);
                  setProdStartingPrice(1499);
                  setProdImageUrl('/images/handwork/hero.jpg');
                  setProdDesc('');
                  setShowProductModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Handcrafted Piece</span>
              </button>
            </div>

            {/* Products Grid Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-5 rounded-3xl bg-[#0D1512] border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#070D0B] shrink-0 border border-white/10">
                      <Image src={prod.thumbnail} alt={prod.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#E6C762] uppercase font-bold tracking-wider block">
                        {prod.category}
                      </span>
                      <h4 className="text-base font-bold font-serif text-[#F5F0EB] truncate">{prod.title}</h4>
                      <p className="text-xs text-[#9CA3AF] line-clamp-1 font-light">{prod.description}</p>

                      <div className="pt-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-[#E6C762] font-serif">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.startingPrice && (
                          <span className="text-[10px] text-[#9CA3AF]">
                            (Start ₹{prod.startingPrice})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setEditingProduct(prod);
                        setProdTitle(prod.title);
                        setProdSubtitle(prod.subtitle || '');
                        setProdCategory(prod.category);
                        setProdPrice(prod.price);
                        setProdStartingPrice(prod.startingPrice || 1499);
                        setProdImageUrl(prod.thumbnail);
                        setProdDesc(prod.description);
                        setProdPricingType(prod.pricingType);
                        setShowProductModal(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#F5F0EB] hover:border-[#D4AF37] hover:text-[#E6C762] flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Details & Price</span>
                    </button>

                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: YOUTUBE VIDEOS SHOWCASE MANAGER */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9CA3AF]">Configure YouTube video URLs to play live in the Storefront Craft Showcase.</span>
              <button
                onClick={() => setShowVideoModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add YouTube Craft Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="p-5 rounded-3xl bg-[#0D1512] border border-white/10 hover:border-red-500/40 transition-all space-y-3"
                >
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-red-400 font-bold uppercase block">{vid.category}</span>
                    <h4 className="text-sm font-bold text-[#F5F0EB] line-clamp-1">{vid.title}</h4>
                    <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-1">{vid.description}</p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
                    <span className="text-[10px] text-[#9CA3AF] font-mono">ID: {vid.youtubeId}</span>
                    <button
                      onClick={() => deleteVideo(vid.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: EDIT / ADD PRODUCT */}
        <AnimatePresence>
          {showProductModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xl bg-[#0D1512] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl"
              >
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <h3 className="text-lg font-bold font-serif text-[#F5F0EB]">
                    {editingProduct ? 'Edit Handcrafted Piece' : 'Add New Handcrafted Piece'}
                  </h3>
                  <button onClick={() => setShowProductModal(false)} className="text-[#9CA3AF] hover:text-white">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                  <div>
                    <label className="text-[#9CA3AF] block mb-1">Product Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Gold Resin Frame"
                      value={prodTitle}
                      onChange={(e) => setProdTitle(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[#9CA3AF] block mb-1">Subtitle / Short Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Preserved crimson botanicals & 24K gold foil"
                      value={prodSubtitle}
                      onChange={(e) => setProdSubtitle(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9CA3AF] block mb-1">Category</label>
                      <input
                        type="text"
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#9CA3AF] block mb-1">Pricing Type</label>
                      <select
                        value={prodPricingType}
                        onChange={(e) => setProdPricingType(e.target.value as any)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                      >
                        <option value="FIXED_PRICE">Fixed Price</option>
                        <option value="CUSTOM_QUOTE">Custom Quote</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#9CA3AF] block mb-1">Fixed Price (₹)</label>
                      <input
                        type="number"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(Number(e.target.value))}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#9CA3AF] block mb-1">Starting Price (₹)</label>
                      <input
                        type="number"
                        value={prodStartingPrice}
                        onChange={(e) => setProdStartingPrice(Number(e.target.value))}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#9CA3AF] block mb-1">Image URL / Path</label>
                    <input
                      type="text"
                      value={prodImageUrl}
                      onChange={(e) => setProdImageUrl(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                    />
                    
                    {/* Quick Image Presets */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-[#9CA3AF]">Pick Preset Image:</span>
                      {imagePresets.map((preset) => (
                        <button
                          type="button"
                          key={preset.label}
                          onClick={() => setProdImageUrl(preset.url)}
                          className={`text-[10px] px-2 py-0.5 rounded-lg border transition-colors ${
                            prodImageUrl === preset.url
                              ? 'bg-[#D4AF37]/30 border-[#D4AF37] text-[#E6C762]'
                              : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:text-white'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[#9CA3AF] block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-[#F5F0EB]"
                    />
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowProductModal(false)}
                      className="px-4 py-2 rounded-xl border border-white/20 text-[#9CA3AF]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold uppercase"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL: ADD YOUTUBE VIDEO */}
        <AnimatePresence>
          {showVideoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#0D1512] border border-[#D4AF37]/40 rounded-3xl p-6 space-y-4 shadow-2xl text-xs"
              >
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <h3 className="text-base font-bold font-serif text-[#F5F0EB]">Add YouTube Craft Video</h3>
                  <button onClick={() => setShowVideoModal(false)} className="text-[#9CA3AF]">✕</button>
                </div>

                <form onSubmit={handleSaveVideo} className="space-y-4">
                  <div>
                    <label className="text-[#9CA3AF] block mb-1">Video Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Resin Flower Preservation Tutorial"
                      value={vidTitle}
                      onChange={(e) => setVidTitle(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[#9CA3AF] block mb-1">YouTube URL / Link</label>
                    <input
                      type="url"
                      required
                      placeholder="e.g. https://www.youtube.com/watch?v=l917j0L-t8A"
                      value={vidUrl}
                      onChange={(e) => setVidUrl(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[#9CA3AF] block mb-1">Category / Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Resin Frames / Name Plates"
                      value={vidCategory}
                      onChange={(e) => setVidCategory(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#F5F0EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[#9CA3AF] block mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Brief video description..."
                      value={vidDesc}
                      onChange={(e) => setVidDesc(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-[#F5F0EB]"
                    />
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowVideoModal(false)}
                      className="px-4 py-2 rounded-xl border border-white/20 text-[#9CA3AF]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase"
                    >
                      Add Video to DB
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
