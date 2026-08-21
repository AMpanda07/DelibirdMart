import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [colorScheme, setColorSchemeState] = useState(() => {
    return localStorage.getItem('colorScheme') || 'red';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-color-scheme', colorScheme);
    localStorage.setItem('colorScheme', colorScheme);

    const schemeMap = {
      red:     { primary: '#EE1515', secondary: '#DC2626', gradient: 'linear-gradient(135deg, #EE1515 0%, #C40D0D 100%)', glow: 'rgba(238, 21, 21, 0.4)' },
      blue:    { primary: '#2563EB', secondary: '#1D4ED8', gradient: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)', glow: 'rgba(37, 99, 235, 0.4)' },
      cyan:    { primary: '#06B6D4', secondary: '#0284C7', gradient: 'linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)', glow: 'rgba(6, 182, 212, 0.4)' },
      yellow:  { primary: '#EAB308', secondary: '#CA8A04', gradient: 'linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)', glow: 'rgba(234, 179, 8, 0.4)' },
      emerald: { primary: '#10B981', secondary: '#059669', gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', glow: 'rgba(16, 185, 129, 0.4)' },
      purple:  { primary: '#A855F7', secondary: '#7E22CE', gradient: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)', glow: 'rgba(168, 85, 247, 0.4)' },
    };

    const config = schemeMap[colorScheme] || schemeMap.red;
    root.style.setProperty('--brand-primary', config.primary);
    root.style.setProperty('--brand-secondary', config.secondary);
    root.style.setProperty('--brand-gradient', config.gradient);
    root.style.setProperty('--brand-glow', config.glow);
    root.style.setProperty('--red-primary', config.primary);
    root.style.setProperty('--red-glow', config.glow);
    root.style.setProperty('--border-accent', config.glow);
    root.style.setProperty('--border-focus', config.primary);
  }, [colorScheme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setColorScheme = useCallback((scheme) => {
    setColorSchemeState(scheme);
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark',
      colorScheme,
      setColorScheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
