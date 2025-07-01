// Common types used across the store
export type ThemeMode = 'light' | 'dark' | 'system';

// Add other common types here as needed
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Product {
  id: string; // mapped from _id
  name: string;
  description: string;
  coverImage: string; // URL to main image
  images: string[]; // URLs to additional images
  price: number;
  discountPercentage?: number;
  discountedPrice?: number;
  stockUnit: number;
  tags?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}