'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  links?: { label: string; url: string }[];
}

const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ['handwork', 'resin', 'frame', 'art', 'photo frame', 'handmade'],
    answer: '🎨 **Handwork Studio** specializes in bespoke optical epoxy resin art, custom rose/gold leaf photo frames, personalized name plates, ocean wave wall clocks, and wedding bouquet preservation. Every piece is handcrafted in India.',
    links: [
      { label: 'Visit Handwork Store', url: '/store/handwork' },
      { label: 'Create Custom Frame', url: '/store/handwork#custom-design' }
    ]
  },
  {
    keywords: ['admin', 'panel', 'dashboard', 'handworkadmin', 'cdo', 'manage'],
    answer: '👑 **Handwork Studio Admin Panel** is accessible to user roles (`admin`, `handworkadmin`, `cdo`, `super admin`). From the Admin Panel, you can add/edit product titles, change prices, update frame pictures, manage customer orders, and add YouTube craft videos.',
    links: [
      { label: 'Open Admin Studio', url: '/store/handwork/admin' }
    ]
  },
  {
    keywords: ['custom', 'photo', 'order', 'preview', 'how to order', 'upload'],
    answer: '🖼️ **How to Order a Custom Frame:**\n1. Go to `/store/handwork`\n2. Select a frame design from the catalog dropdown.\n3. Upload your photo — it will preview live inside the resin frame cutout window!\n4. Enter your custom engraving text & special date.\n5. Click **Submit Frame Order** to save to DB & connect on WhatsApp.',
    links: [
      { label: 'Go to Custom Studio', url: '/store/handwork#custom-design' }
    ]
  },
  {
    keywords: ['fashion', 'apparel', 'saree', 'pashmina', 'cloth', 'wear'],
    answer: '👗 **Luxury Apparel & Weaves** offers handcrafted Pashmina shawls, zardozi embroidered royal velvet jackets, Kanjeevaram silk sarees, and heritage handloom weaves.',
    links: [
      { label: 'Explore Fashion Collection', url: '/store/fashion' }
    ]
  },
  {
    keywords: ['price', 'quote', 'cost', 'payment', 'custom quote'],
    answer: '💰 **Pricing & Payment:**\n- Fixed Price items start from ₹1,499.\n- Custom Quotes depend on size, resin volume, and raw gold leaf/flower inclusions.\n- Prices can be reviewed and edited directly from the Admin Panel!',
    links: [
      { label: 'View Signature Collection', url: '/store/handwork#collections' }
    ]
  },
  {
    keywords: ['shipping', 'delivery', 'time', 'days', 'track'],
    answer: '🚚 **Shipping & Delivery:**\n- Handcrafted pieces take 3-5 business days to cast and polish.\n- Products ship securely wrapped in bubble wrap and luxury presentation packaging with nationwide tracking.',
    links: []
  },
  {
    keywords: ['contact', 'whatsapp', 'phone', 'support', 'help', 'number'],
    answer: '📞 **Contact & WhatsApp Support:**\n- You can chat directly with our master artisan on WhatsApp for custom mockups or inquiries.',
    links: [
      { label: 'Chat on WhatsApp', url: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}` }
    ]
  },
  {
    keywords: ['cortex', 'services', 'saas', 'web', 'ai', 'platform'],
    answer: '⚡ **Cortex Web Solutions** builds high-converting enterprise SaaS applications, custom e-commerce marketplaces, WhatsApp AI automation agents, and bespoke web platforms.',
    links: [
      { label: 'Explore Ecosystem', url: '/store' }
    ]
  }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: '👋 Hi! Welcome to **Cortex Web Solutions & Handwork Studio**.\nHow can I help you today? Feel free to ask about our custom resin frames, ordering process, admin panel, or pricing!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      links: [
        { label: '🎨 Handwork Store', url: '/store/handwork' },
        { label: '👑 Admin Studio', url: '/store/handwork/admin' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const findBestAnswer = (query: string) => {
    const q = query.toLowerCase();
    
    // Check against knowledge base keywords
    for (const item of FAQ_KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => q.includes(kw))) {
        return {
          answer: item.answer,
          links: item.links
        };
      }
    }

    // Default friendly response
    return {
      answer: `🤖 Thanks for asking! Our platform specializes in custom handmade resin art, personalized frames, and enterprise web solutions.\n\nFor specific questions about your order or custom mockups, feel free to connect directly with our master artisan on WhatsApp!`,
      links: [
        { label: '🎨 Explore Handwork Store', url: '/store/handwork' },
        { label: '💬 Chat on WhatsApp', url: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}` }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate smart bot response delay
    setTimeout(() => {
      const response = findBestAnswer(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        links: response.links
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const quickChips = [
    '🎨 Handwork Resin Store',
    '🖼️ How to Order Custom Frame',
    '👑 Where is Admin Panel?',
    '💰 Pricing & Custom Quotes',
    '🚚 Shipping Time',
    '💬 WhatsApp Support'
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C762] to-[#C5A059] text-black shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center border-2 border-white/40"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <MessageSquare className="w-6 h-6 fill-black" />
          )}

          {/* Glowing pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#D4AF37]/30 blur-sm animate-pulse pointer-events-none" />
          
          {/* Notification Badge */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0A0A0E] flex items-center justify-center text-[9px] font-bold text-white">
              1
            </span>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-24 right-4 sm:right-8 z-50 w-[92vw] sm:w-[420px] max-h-[600px] h-[80vh] bg-[#0D0D12]/95 backdrop-blur-2xl border border-[#D4AF37]/40 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden text-[#F5F0EB]"
          >
            {/* Chat Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#121217] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A059] text-black font-bold flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold font-serif text-[#F5F0EB]">Cortex AI Q&A Assistant</h3>
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  </div>
                  <p className="text-[10px] text-[#9CA3AF]">Site Q&A • Handwork Store • Admin Info</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: 'welcome-1',
                        sender: 'bot',
                        text: '👋 Hi! How can I help you today?',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        links: [{ label: '🎨 Handwork Store', url: '/store/handwork' }]
                      }
                    ])
                  }
                  className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/5"
                  title="Clear Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-light leading-relaxed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6C762] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      ✨
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl space-y-2 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold rounded-tr-none shadow-lg'
                        : 'bg-white/5 border border-white/10 text-[#F5F0EB] rounded-tl-none shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Action Links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/10">
                        {msg.links.map((lnk, idx) => (
                          <Link
                            key={idx}
                            href={lnk.url}
                            target={lnk.url.startsWith('http') ? '_blank' : '_self'}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6C762] hover:bg-[#D4AF37] hover:text-black transition-colors"
                          >
                            <span>{lnk.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    )}

                    <span
                      className={`block text-[9px] text-right mt-1 ${
                        msg.sender === 'user' ? 'text-black/60' : 'text-[#9CA3AF]'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2 items-center text-xs text-[#9CA3AF]">
                  <div className="w-7 h-7 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6C762] flex items-center justify-center shrink-0 font-bold">
                    ✨
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6C762] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6C762] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6C762] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* FAQ Quick Chips */}
            <div className="px-4 py-2 bg-[#070709] border-t border-white/5 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
              <span className="text-[10px] text-[#9CA3AF] shrink-0">FAQ:</span>
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#E6C762] whitespace-nowrap hover:border-[#D4AF37] transition-colors shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-white/10 bg-[#121217] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask anything about our site, custom frames or orders..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0EB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4AF37]"
              />

              <button
                type="submit"
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-bold shadow-lg hover:brightness-110 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}