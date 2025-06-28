import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, brandService, categoryService, productService } from '../api/services';
import {
    LoginRequest,
    ProductFilters,
    ProfileUpdateRequest,
    RegisterRequest,
} from '../api/types';
import { queryKeys } from './queryClient';

// Auth Hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all queries on logout
      queryClient.clear();
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authService.refreshToken(refreshToken),
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => authService.requestPasswordReset({ email }),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: { email: string; token: string; newPassword: string }) =>
      authService.resetPassword(data),
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: () => authService.getProfile(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401 (unauthorized)
      if (error?.status === 401) return false;
      return failureCount < 3;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileUpdateRequest) => authService.updateProfile(data),
    onSuccess: () => {
      // Invalidate and refetch profile
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

// Product Hooks (Read-only for client app)
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: queryKeys.products.all(filters),
    queryFn: () => productService.getAll(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.byId(id),
    queryFn: () => productService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProductsByCategory = (categoryId: string, filters?: ProductFilters) => {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryId, filters),
    queryFn: () => productService.getAll({ ...filters, categoryId }),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useProductsByBrand = (brandId: string, filters?: ProductFilters) => {
  return useQuery({
    queryKey: queryKeys.products.byBrand(brandId, filters),
    queryFn: () => productService.getAll({ ...filters, brandId }),
    enabled: !!brandId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useProductFilters = () => {
  return useQuery({
    queryKey: queryKeys.products.filters.metadata,
    queryFn: () => productService.getFilterMetadata(),
    staleTime: 1000 * 60 * 30, // 30 minutes - filter metadata doesn't change often
  });
};

// Category Hooks (Read-only for client app)
export const useCategories = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: queryKeys.categories.all(params),
    queryFn: () => categoryService.getAll(params),
    staleTime: 1000 * 60 * 10, // 10 minutes - categories don't change often
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: queryKeys.categories.byId(id),
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Brand Hooks (Read-only for client app)
export const useBrands = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: queryKeys.brands.all(params),
    queryFn: () => brandService.getAll(params),
    staleTime: 1000 * 60 * 10, // 10 minutes - brands don't change often
  });
};

export const useBrand = (id: string) => {
  return useQuery({
    queryKey: queryKeys.brands.byId(id),
    queryFn: () => brandService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};