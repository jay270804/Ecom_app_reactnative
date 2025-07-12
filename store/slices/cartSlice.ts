import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  selectedAddressId: string | null;
  setSelectedAddressId: (addressId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      selectedAddressId: null,
      addToCart: (product, quantity = 1) => set((state) => {
        const idx = state.items.findIndex((item) => item.product.id === product.id);
        if (idx !== -1) {
          // Already in cart, update quantity
          const items = [...state.items];
          items[idx].quantity += quantity;
          return { items };
        }
        return { items: [...state.items, { product, quantity }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId),
      })),
      updateQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          return {
            items: state.items.filter((item) => item.product.id !== productId),
          };
        }
        return {
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        };
      }),
      clearCart: () => set({ items: [], selectedAddressId: null }),
      isInCart: (productId) => {
        return get().items.some((item) => item.product.id === productId);
      },
      setSelectedAddressId: (addressId) => set({ selectedAddressId: addressId }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);