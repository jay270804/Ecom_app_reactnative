import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = 'http://192.168.120.74:8000'; // For physical device
// const API_BASE_URL = 'http://10.0.2.2:8000'; // For Android emulator
// const API_BASE_URL = 'http://localhost:8000'; // For iOS simulator

console.log('🔧 [API CLIENT] Using base URL:', API_BASE_URL);

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Error types
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API Client class
class ApiClient {
  private axiosInstance: AxiosInstance;
  private authStore: any = null; // Will be set after store initialization

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          // Get token from auth store if available
          if (this.authStore) {
            const accessToken = this.authStore.getState().accessToken;
            if (accessToken) {
              config.headers.Authorization = `Bearer ${accessToken}`;
            }
          }
        } catch (error) {
          console.error('Error getting auth token:', error);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for automatic token refresh
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 (Unauthorized) and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh the token
            if (this.authStore) {
              const refreshSuccess = await this.authStore.getState().refreshAccessToken();

              if (refreshSuccess) {
                // Get the new token and retry the original request
                const newAccessToken = this.authStore.getState().accessToken;
                if (newAccessToken) {
                  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                  return this.axiosInstance(originalRequest);
                }
              }
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // If refresh fails, the auth store will clear the tokens
          }
        }

        // Handle other errors
        if (error.response) {
          // Server responded with error status
          const { status, data } = error.response;
          const errorMessage = data?.message || error.message || 'An error occurred';
          throw new ApiError(status, errorMessage, data);
        } else if (error.request) {
          // Network error
          throw new ApiError(0, 'Network error. Please check your connection.');
        } else {
          // Other error
          throw new ApiError(0, error.message || 'An error occurred');
        }
      }
    );
  }

  // Method to set the auth store reference
  setAuthStore(authStore: any) {
    this.authStore = authStore;
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, { params });
    return response.data;
  }

  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    console.log('🌐 [API CLIENT] Making POST request to:', endpoint);
    console.log('📤 [API CLIENT] Request data:', data);
    console.log('🔧 [API CLIENT] Request config:', config);

    try {
      const response = await this.axiosInstance.post<T>(endpoint, data, config);
      console.log('✅ [API CLIENT] POST request successful');
      console.log('📥 [API CLIENT] Response status:', response.status);
      console.log('📥 [API CLIENT] Response data:', response.data);
      return response.data;
    } catch (error) {
      console.log('❌ [API CLIENT] POST request failed');
      console.log('💥 [API CLIENT] Error details:', error);
      throw error;
    }
  }

  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, config);
    return response.data;
  }

  // For file uploads (multipart/form-data)
  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export the base URL for use in other parts of the app
export { API_BASE_URL };

