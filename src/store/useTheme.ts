import { create } from 'zustand';

export type Theme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  radius: string; 
  spacing: string; 
};

const defaultTheme: Theme = {
  primary: '#4f46e5', 
  secondary: '#06b6d4',
  background: '#ffffff',
  text: '#111827',
  radius: '0.5rem',
  spacing: '1rem'
};

interface ThemeState {
  theme: Theme;
  setTheme: (t: Partial<Theme>) => void;
  resetTheme: () => void;
}

export const useTheme = create<ThemeState>((set) => ({
  theme: defaultTheme,
  setTheme: (patch) => set((s) => ({ theme: { ...s.theme, ...patch } })),
  resetTheme: () => set({ theme: defaultTheme })
}));
