import { useAppStore } from '@/store/store';
import { useColorScheme } from 'nativewind';
import { Colors } from '@/constants/Colors';

/**
 * Simple theme hook using Zustand store
 * Provides theme state and actions without React Context overhead
 */
export function useTheme() {
  const { colorScheme } = useColorScheme();
  const { mode, isDark, isLight, setTheme, toggleTheme } = useAppStore();

  // Get current theme (light/dark)
  const currentTheme = colorScheme as 'light' | 'dark';

  return {
    // Current theme state
    theme: currentTheme,
    mode, // user preference (light/dark/system)
    isDark,
    isLight,
    colors: Colors[currentTheme],

    // Theme actions
    setTheme,
    toggleTheme,

    // Utility functions
    getColor: (colorToken: string) => `rgb(var(--${colorToken}))`,
  };
}