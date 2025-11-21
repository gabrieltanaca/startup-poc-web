'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const stored =
      typeof window !== 'undefined' ? (localStorage.getItem('app_theme') as Theme) : null;

    if (stored) setThemeState(stored);
  }, []);

  useEffect(() => {
    const classList = document.documentElement.classList;

    if (typeof document !== 'undefined') {
      if (theme === 'dark') classList.add('dark');
      else classList.remove('dark');
    }

    try {
      localStorage.setItem('app_theme', theme);
    } catch (e) {
      console.error('ERROR in ThemeContext:', e);
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((s) => (s === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
