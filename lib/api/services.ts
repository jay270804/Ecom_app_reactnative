import { apiClient } from './client';
import {
    ApiResponse,
    Brand,
    Category,
    FilterMetadata,
    LoginRequest,
    LoginResponse,
    PaginatedResponse,
    PasswordResetConfirmRequest,
    PasswordResetRequest,
    Product,
    ProductFilters,
    ProfileUpdateRequest,
    RegisterRequest,
    RegisterResponse,
    User,
} from './types';

// Auth Services
export const authService = {
  // Register user
  register: async (data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    console.log('🔧 [AUTH SERVICE] Register called with data:', {
      ...data,
      password: '[HIDDEN]'
    });
    console.log('🌐 [AUTH SERVICE] Making POST request to /api/auth/register');

    try {
      const response = await apiClient.post<ApiResponse<RegisterResponse>>('/api/auth/register', data);
      console.log('✅ [AUTH SERVICE] Register API call successful:', response);
      return response;
    } catch (error) {
      console.log('❌ [AUTH SERVICE] Register API call failed:', error);
      throw error;
    }
  },

  // Login user
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    console.log('🔧 [AUTH SERVICE] Login called with email:', data.email);
    console.log('🌐 [AUTH SERVICE] Making POST request to /api/auth/login');

    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>('/api/auth/login', data);
      console.log('✅ [AUTH SERVICE] Login API call successful:', response);
      return response;
    } catch (error) {
      console.log('❌ [AUTH SERVICE] Login API call failed:', error);
      throw error;
    }
  },

  // Logout user
  logout: async (): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>('/api/auth/logout');
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> => {
    return apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/api/auth/refresh-token', { refreshToken });
  },

  // Request password reset
  requestPasswordReset: async (data: PasswordResetRequest): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>('/api/auth/request-password-reset', data);
  },

  // Reset password
  resetPassword: async (data: PasswordResetConfirmRequest): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>('/api/auth/reset-password', data);
  },

  // Verify email
  verifyEmail: async (userId: string, token: string): Promise<ApiResponse<void>> => {
    return apiClient.get<ApiResponse<void>>(`/api/auth/verify-email/${userId}/${token}`);
  },

  // Get user profile
  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiClient.get<ApiResponse<{ user: User }>>('/api/auth/profile');
  },

  // Update user profile
  updateProfile: async (data: ProfileUpdateRequest): Promise<ApiResponse<{ user: User }>> => {
    return apiClient.put<ApiResponse<{ user: User }>>('/api/auth/profile', data);
  },
};

// Product Services (Read-only for client app)
export const productService = {
  // Get all products with filters
  getAll: async (filters?: ProductFilters): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    return apiClient.get<ApiResponse<PaginatedResponse<Product>>>('/api/products', filters);
  },

  // Get product by ID
  getById: async (id: string): Promise<ApiResponse<Product>> => {
    return apiClient.get<ApiResponse<Product>>(`/api/products/${id}`);
  },

  // Get filter metadata
  getFilterMetadata: async (): Promise<ApiResponse<FilterMetadata>> => {
    return apiClient.get<ApiResponse<FilterMetadata>>('/api/products/filters/metadata');
  },
};

// Category Services (Read-only for client app)
export const categoryService = {
  // Get all categories
  getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<ApiResponse<PaginatedResponse<Category>>> => {
    return apiClient.get<ApiResponse<PaginatedResponse<Category>>>('/api/categories', params);
  },

  // Get category by ID
  getById: async (id: string): Promise<ApiResponse<Category>> => {
    return apiClient.get<ApiResponse<Category>>(`/api/categories/${id}`);
  },
};

// Brand Services (Read-only for client app)
export const brandService = {
  // Get all brands
  getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<ApiResponse<PaginatedResponse<Brand>>> => {
    return apiClient.get<ApiResponse<PaginatedResponse<Brand>>>('/api/brands', params);
  },

  // Get brand by ID
  getById: async (id: string): Promise<ApiResponse<Brand>> => {
    return apiClient.get<ApiResponse<Brand>>(`/api/brands/${id}`);
  },
};

// Address Services
export const addressService = {
  // Get all addresses for the user
  getAll: async (): Promise<any[]> => {
    const res = await apiClient.get<any[]>('/api/addresses');
    return res;
  },
  // Create a new address
  create: async (address: any): Promise<any> => {
    return apiClient.post<any>('/api/addresses', address);
  },
  // Delete an address by ID
  delete: async (id: string): Promise<any> => {
    return apiClient.delete<any>(`/api/addresses/${id}`);
  },
};

// Order & Payment Services
export const orderService = {
  // Create Razorpay order
  createRazorpayOrder: async (amount: number, currency: string = 'INR'): Promise<any> => {
    return apiClient.post<any>('/api/payments/create-order', { amount, currency });
  },
  // Verify payment and create order
  verifyPaymentAndCreateOrder: async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    orderItems: Array<{ product: string; quantity: number; price: number }>;
    shippingAddress: string;
  }): Promise<any> => {
    return apiClient.post<any>('/api/payments/verify', data);
  },
  // Get all orders for the user
  getOrders: async (): Promise<any[]> => {
    return apiClient.get<any[]>('/api/orders');
  },
  // Get order by ID
  getOrderById: async (id: string): Promise<any> => {
    return apiClient.get<any>(`/api/orders/${id}`);
  },
};