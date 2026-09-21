import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      addItem: (item) => set((state) => ({ items: [...state.items, item], isCartOpen: true })), // open cart on add
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity,
                  totalPrice: i.unitPrice * quantity,
                }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      getSubtotal: () => get().items.reduce((total, item) => total + item.totalPrice, 0),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: "jenny-cart-storage",
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI state
    }
  )
);
