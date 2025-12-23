"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface GlowStickyProps {
  text?: string;
}

const GlowStickyPopup: React.FC<GlowStickyProps> = ({ text = "INTERVIEW OPEN" }) => {
  const layers = Array.from({ length: 8 }); // Layers thodi kam kar di readability ke liye

  return (
    <motion.div
      drag
      // Isse aap pure screen par kahi bhi drag kar sakte hain
      dragMomentum={false}
      className="fixed bottom-20 sm:bottom-1 right-auto z-[999] cursor-grab active:cursor-grabbing select-none"
    >
      <Link href="/EventNotificationPage" className="block outline-none">
        <div className="relative w-96 h-16 sm:w-34 flex items-center justify-center">
          
          <figure className="relative preserve-3d animate-wobble pointer-events-none">
            {layers.map((_, index) => {
              const isMain = index === 0;
              const Tag = isMain ? 'h1' : 'span';

              return (
                <Tag
                  key={index}
                  aria-hidden={!isMain}
                  className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    whitespace-nowrap text-center
                    text-2xl font-black uppercase tracking-widest
                    animate-glow transition-all
                  `}
                  style={{
                    fontFamily: "'Concert One', sans-serif",
                    transform: `translate3d(-50%, -50%, ${index * 1.5}px)`,
                    zIndex: 10 - index,
                    // Main text white rahega, baaki layers halki si transparent
                    color: isMain ? "#ffffff" : "rgba(255,255,255,0.1)",
                  }}
                >
                  {text}
                </Tag>
              );
            })}
          </figure>
        </div>
      </Link>

      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
          perspective: 500px;
        }

        @keyframes wobble {
          0%, 100% { transform: rotate3d(1, 1, 0, 15deg); }
          25% { transform: rotate3d(-1, 1, 0, 15deg); }
          50% { transform: rotate3d(-1, -1, 0, 15deg); }
          75% { transform: rotate3d(1, -1, 0, 15deg); }
        }

        @keyframes glow {
          /* Glow ko bahut light rakha hai (30px se 8px-12px kar diya) */
          0%, 100% { text-shadow: 0 0 8px rgba(255, 0, 0, 0.6); }
          25% { text-shadow: 0 0 8px rgba(255, 165, 0, 0.6); }
          50% { text-shadow: 0 0 8px rgba(50, 205, 50, 0.6); }
          75% { text-shadow: 0 0 8px rgba(0, 255, 255, 0.6); }
        }

        .animate-wobble {
          animation: wobble 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 8s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default GlowStickyPopup;