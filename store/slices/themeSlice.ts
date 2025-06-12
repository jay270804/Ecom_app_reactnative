import { useColorScheme } from 'nativewind';
import { StateCreator } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  isLight: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export interface ThemeSlice extends ThemeState {}

export const createThemeSlice: StateCreator<ThemeSlice> = (set, get) => ({
  mode: 'system',
  isDark: false,
  isLight: true,

  setTheme: (mode: ThemeMode) => {
    const { setColorScheme } = useColorScheme();
    setColorScheme(mode);

    set((state) => ({
      mode,
      isDark: mode === 'dark' || (mode === 'system' && useColorScheme().colorScheme === 'dark'),
      isLight: mode === 'light' || (mode === 'system' && useColorScheme().colorScheme === 'light'),
    }));
  },

  toggleTheme: () => {
    const currentMode = get().mode;
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    get().setTheme(newMode);
  },
});