import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { authService } from '../../lib/api/services';
import { LoginRequest, ProfileUpdateRequest, RegisterRequest, User } from '../../lib/api/types';

// Custom storage adapter for SecureStore
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch {
      // Fallback to console.warn if storage fails
      console.warn('Failed to store auth data securely');
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch {
      // Ignore removal errors
    }
  },
};

export interface AuthState {
  // User data
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  // Loading states
  isLoading: boolean;
  isRefreshing: boolean;

  // Auth status
  isAuthenticated: boolean;
  isInitialized: boolean;

  // Actions
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  updateProfile: (data: ProfileUpdateRequest) => Promise<{ success: boolean; error?: string }>;
  loadProfile: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      isRefreshing: false,
      isAuthenticated: false,
      isInitialized: false,

      // Login action
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true });

        try {
          const response = await authService.login(credentials);

          if (response.success) {
            const { user, accessToken, refreshToken } = response.data;

            set({
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });

            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: response.message || 'Login failed' };
          }
        } catch (error: any) {
          set({ isLoading: false });
          return {
            success: false,
            error: error?.response?.data?.message || error?.message || 'Login failed'
          };
        }
      },

      // Register action
      register: async (userData: RegisterRequest) => {
        set({ isLoading: true });

        try {
          const response = await authService.register(userData);

          if (response.success) {
            const { user, accessToken, refreshToken } = response.data;

            // If tokens are provided on registration, set them
            if (accessToken && refreshToken) {
              set({
                user,
                accessToken,
                refreshToken,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              set({
                user,
                isLoading: false,
              });
            }

            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: response.message || 'Registration failed' };
          }
        } catch (error: any) {
          set({ isLoading: false });
          return {
            success: false,
            error: error?.response?.data?.message || error?.message || 'Registration failed'
          };
        }
      },

      // Logout action
      logout: async () => {
        set({ isLoading: true });

        try {
          // Call logout API if we have a token
          const { accessToken } = get();
          if (accessToken) {
            await authService.logout();
          }
        } catch (error) {
          // Ignore logout API errors, we still want to clear local state
          console.warn('Logout API call failed:', error);
        } finally {
          // Always clear local state
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      // Refresh access token action
      refreshAccessToken: async () => {
        const { refreshToken } = get();

        if (!refreshToken) {
          return false;
        }

        set({ isRefreshing: true });

        try {
          const response = await authService.refreshToken(refreshToken);

          if (response.success) {
            const { accessToken, refreshToken: newRefreshToken } = response.data;

            set({
              accessToken,
              refreshToken: newRefreshToken,
              isRefreshing: false,
            });

            return true;
          } else {
            // Refresh failed, clear auth state
            set({
              user: null,
              accessToken: null,
              refreshToken: null,
              isAuthenticated: false,
              isRefreshing: false,
            });
            return false;
          }
        } catch (error: any) {
          // Refresh failed, clear auth state
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isRefreshing: false,
          });
          return false;
        }
      },

      // Update profile action
      updateProfile: async (data: ProfileUpdateRequest) => {
        set({ isLoading: true });

        try {
          const response = await authService.updateProfile(data);

          if (response.success) {
            set({
              user: response.data.user,
              isLoading: false,
            });

            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: response.message || 'Profile update failed' };
          }
        } catch (error: any) {
          set({ isLoading: false });
          return {
            success: false,
            error: error?.response?.data?.message || error?.message || 'Profile update failed'
          };
        }
      },

      // Load user profile
      loadProfile: async () => {
        const { accessToken } = get();

        if (!accessToken) {
          set({ isInitialized: true });
          return;
        }

        try {
          const response = await authService.getProfile();

          if (response.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isInitialized: true,
            });
          } else {
            // Profile load failed, clear auth state
            set({
              user: null,
              accessToken: null,
              refreshToken: null,
              isAuthenticated: false,
              isInitialized: true,
            });
          }
        } catch (error: any) {
          // Profile load failed, clear auth state
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isInitialized: true,
          });
        }
      },

      // Clear auth state (for testing or manual logout)
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          isRefreshing: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);