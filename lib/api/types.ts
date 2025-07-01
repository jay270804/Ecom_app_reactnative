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

// Product creation/update types
export interface CreateProductRequest {
  name: string;
  summary: string;
  description: string;
  price: number;
  stockUnit: number;
  discountPercentage: number;
  categoryId: string;
  brandId: string;
  images?: string[];
  tags?: string[];
  coverImage?: File;
}

export interface UpdateProductRequest {
  name?: string;
  summary?: string;
  description?: string;
  price?: number;
  stockUnit?: number;
  discountPercentage?: number;
  categoryId?: string;
  brandId?: string;
  images?: string[];
  tags?: string[];
  coverImage?: File;
}

// Category creation/update types
export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
}

// Brand creation/update types
export interface CreateBrandRequest {
  name: string;
  description: string;
}

export interface UpdateBrandRequest {
  name?: string;
  description?: string;
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