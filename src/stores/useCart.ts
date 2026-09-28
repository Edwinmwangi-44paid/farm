import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "../types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === product.id);
          
          if (existingItem) {
            // Prevent adding more than available quantity
            const newQuantity = Math.min(existingItem.quantity + quantity, product.availableQuantity);
            return {
              items: state.items.map(item => 
                item.productId === product.id ? { ...item, quantity: newQuantity } : item
              )
            };
          }
          
          return { items: [...state.items, { productId: product.id, quantity }] };
        });
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map(item => 
            item.productId === productId ? { ...item, quantity } : item
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: "farm-market-cart",
    }
  )
);
