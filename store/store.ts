import { create } from 'zustand';
import { createThemeSlice, ThemeSlice } from './slices/themeSlice';

// Combine all slices
export interface AppState extends ThemeSlice {
  // Add other slices here as they're created
  // auth: AuthSlice;
  // cart: CartSlice;
  // products: ProductsSlice;
  // search: SearchSlice;
}

// Create the store
export const useAppStore = create<AppState>()((...args) => ({
  ...createThemeSlice(...args),
  // Add other slices here
  // ...createAuthSlice(...args),
  // ...createCartSlice(...args),
  // ...createProductsSlice(...args),
  // ...createSearchSlice(...args),
}));