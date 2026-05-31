import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface Discount {
  code: string;
  type: string;
  value: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  discount: Discount | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  applyDiscount: (discount: Discount) => void;
  removeDiscount: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      discount: null,
      addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          (i) => i.productId === item.productId && i.size === item.size
        );
        
        if (existingItemIndex >= 0) {
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += item.quantity;
          return { items: updatedItems, isOpen: true };
        }
        
        return { items: [...state.items, item], isOpen: true };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
      })),
      updateQuantity: (id, qty) => set((state) => ({
        items: state.items.map((i) => 
          i.id === id ? { ...i, quantity: qty } : i
        )
      })),
      clearCart: () => set({ items: [], discount: null }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      applyDiscount: (discount) => set({ discount }),
      removeDiscount: () => set({ discount: null }),
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discount;
        if (!discount) return subtotal;
        
        if (discount.type === 'percentage') {
          return subtotal * (1 - (discount.value / 100));
        } else {
          return Math.max(0, subtotal - discount.value);
        }
      },
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'solene-cart-storage',
      partialize: (state) => ({ items: state.items, discount: state.discount }),
    }
  )
);
