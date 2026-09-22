import { create } from 'zustand';

interface CustomDesignState {
  isOpen: boolean;
  selectedProductType: string;
  selectedSize: string;
  openModal: (productType?: string, size?: string) => void;
  closeModal: () => void;
  setProductType: (type: string) => void;
  setSize: (size: string) => void;
}

export const useCustomDesignStore = create<CustomDesignState>((set) => ({
  isOpen: false,
  selectedProductType: 'Resin Frame',
  selectedSize: 'Medium',
  openModal: (productType, size) => 
    set({ 
      isOpen: true, 
      ...(productType ? { selectedProductType: productType } : {}),
      ...(size ? { selectedSize: size } : {})
    }),
  closeModal: () => set({ isOpen: false }),
  setProductType: (type) => set({ selectedProductType: type }),
  setSize: (size) => set({ selectedSize: size }),
}));
