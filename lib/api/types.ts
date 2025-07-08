// Base API response structure
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

// Pagination types
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  products: T[];
  pagination: PaginationInfo;
}

// User types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: number;
  DOB?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user: User;
  accessToken?: string;
  refreshToken?: string;
}

// Product types
export interface ProductImageSizes {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  original: string;
  srcset: string;
}

export interface Product {
  _id: string;
  name: string;
  summary: string;
  description: string;
  coverImage: string;
  images: string[];
  stockUnit: number;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
  categoryId: Category | string;
  brandId: Brand | string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  coverImageSizes?: ProductImageSizes;
}

// Category types
export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Brand types
export interface Brand {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Product filters
export interface ProductFilters {
  page?: number;
  limit?: number;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'createdAt' | 'price' | 'name';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// Filter metadata
export interface FilterMetadata {
  categories: Category[];
  brands: Brand[];
  priceRange: {
    min: number;
    max: number;
  };
}

// Auth request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  DOB?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  DOB?: string;
  profileImage?: string;
}

// User management types (admin only)
export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  role?: 'user' | 'admin';
  isActive?: boolean;
  emailVerified?: boolean;
}

// Address type
export interface Address {
  _id: string;
  userId: string;
  title: string;
  AddrLine1: string;
  AddrLine2?: string;
  city: string;
  state: string;
  PIN: string;
  landmark?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Order item type
export interface OrderItem {
  product: string; // product id
  quantity: number;
  price: number;
}

// Order type
export interface Order {
  _id: string;
  userId: string;
  orderItems: OrderItem[];
  shippingAddress: string | Address;
  orderTotal: number;
  orderStatus: string;
  paymentStatus: string;
  paymentId?: string;
  razorpayOrderId?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Razorpay order type
export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string | null;
  status: string;
  attempts: number;
  created_at: number;
  notes: any[];
  offer_id: string | null;
}

// Payment verification request
export interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderItems: OrderItem[];
  shippingAddress: string;
}

// Payment verification response (could be order)
export interface PaymentVerificationResponse {
  order: Order;
  message: string;
  success: boolean;
}