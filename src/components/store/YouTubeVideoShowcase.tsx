'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, X, Youtube, Film } from 'lucide-react';
import { useHandworkAdminStore } from '@/store/useHandworkAdminStore';
import { HandworkVideo } from '@/types/store';

export const YouTubeVideoShowcase: React.FC = () => {
  const videos = useHandworkAdminStore((state) => state.videos);
  const [activeVideo, setActiveVideo] = useState<HandworkVideo | null>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <section id="videos" className="py-20 bg-[#070709] border-t border-white/10 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D4AF37]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E6C762] text-xs font-bold uppercase tracking-widest">
            <Youtube className="w-4 h-4 text-red-500" />
            <span>Master Artisan Videos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#F5F0EB]">
            Watch Our Master Artisans At Work
          </h2>
          <p className="text-sm text-[#9CA3AF] font-light max-w-2xl mx-auto">
            Explore behind-the-scenes video demonstrations of our optical resin pouring, gold leaf inlaying, and flower preservation techniques.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <motion.div
              key={vid.id}
              whileHover={{ y: -6 }}
              onClick={() => setActiveVideo(vid)}
              className="group relative rounded-3xl overflow-hidden bg-[#0D0D12] border border-white/10 hover:border-[#D4AF37]/50 shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              {/* YouTube Thumbnail Preview */}
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-black/40" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-black ml-1" />
                  </div>
                </div>

                {vid.category && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#E6C762] border border-[#D4AF37]/30">
                    {vid.category}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold font-serif text-[#F5F0EB] group-hover:text-[#E6C762] transition-colors line-clamp-2">
                  {vid.title}
                </h3>
                {vid.description && (
                  <p className="text-xs text-[#9CA3AF] line-clamp-2 font-light">
                    {vid.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        <AnimatePresence>
          {activeVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-4xl bg-[#0D0D12] border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Film className="w-5 h-5 text-[#E6C762]" />
                    <h3 className="text-base font-bold font-serif text-[#F5F0EB] truncate max-w-md sm:max-w-xl">
                      {activeVideo.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Embedded YouTube iFrame */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                <p className="text-xs text-[#9CA3AF] font-light">
                  {activeVideo.description}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
