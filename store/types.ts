// Common types used across the store
export type ThemeMode = 'light' | 'dark' | 'system';

// Add other common types here as needed
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}