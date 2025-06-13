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
  image: any; // React Native ImageSourcePropType
  discountPercentage?: number; // Optional discount percentage (0-100)
  discountedPrice?: number; // Calculated discounted price
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}