import { create } from 'zustand';

interface WishlistState {
  items: string[]; // product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  addToWishlist: (productId) => set((state) =>
    state.items.includes(productId)
      ? state
      : { items: [...state.items, productId] }
  ),
  removeFromWishlist: (productId) => set((state) => ({
    items: state.items.filter((id) => id !== productId),
  })),
  isWishlisted: (productId) => get().items.includes(productId),
  clearWishlist: () => set({ items: [] }),
}));