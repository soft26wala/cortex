'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCustomDesignStore } from '@/store/useCustomDesignStore';
import { CustomDesignForm } from './CustomDesignForm';

export const CustomDesignModal: React.FC = () => {
  const { isOpen, closeModal, selectedProductType, selectedSize } = useCustomDesignStore();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto py-10 px-4 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl z-10"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <CustomDesignForm
            initialProductType={selectedProductType}
            initialSize={selectedSize}
            onSubmitted={closeModal}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
