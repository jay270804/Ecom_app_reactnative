import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '../api/client';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // React Native specific optimizations
      staleTime: 1000 * 60 * 5, // 5 minutes - data is fresh for 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes - keep unused data in cache for 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff

      // React Native specific settings
      refetchOnWindowFocus: false, // Not applicable in React Native
      refetchOnReconnect: true, // Refetch when network reconnects
      refetchOnMount: true, // Refetch when component mounts
    },
    mutations: {
      // Mutation default options
      retry: 1, // Retry failed mutations once
      retryDelay: 1000,
    },
  },
});

// Query keys factory for better type safety and consistency
export const queryKeys = {
  // Auth related queries
  auth: {
    profile: ['auth', 'profile'] as const,
    user: (id: string) => ['auth', 'user', id] as const,
  },

  // Products related queries
  products: {
    all: (params?: any) => ['products', 'all', params] as const,
    byId: (id: string) => ['products', 'byId', id] as const,
    byCategory: (categoryId: string, params?: any) =>
      ['products', 'byCategory', categoryId, params] as const,
    byBrand: (brandId: string, params?: any) =>
      ['products', 'byBrand', brandId, params] as const,
    search: (query: string, params?: any) =>
      ['products', 'search', query, params] as const,
    filters: {
      metadata: ['products', 'filters', 'metadata'] as const,
    },
  },

  // Categories related queries
  categories: {
    all: (params?: any) => ['categories', 'all', params] as const,
    byId: (id: string) => ['categories', 'byId', id] as const,
  },

  // Brands related queries
  brands: {
    all: (params?: any) => ['brands', 'all', params] as const,
    byId: (id: string) => ['brands', 'byId', id] as const,
  },
} as const;