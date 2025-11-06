import { useState, useEffect } from 'react';
import { Theme } from '../types';

const lightTheme: Theme = {
  primary: '#EDC7B7',
  secondary: '#EEE2DC',
  accent: '#AC3B61',
  background: '#BAB2B5',
  text: '#123C69'
};

const darkTheme: Theme = {
  primary: '#123C69',
  secondary: '#283747',
  accent: '#AC3B61',
  background: '#1C2833',
  text: '#EEE2DC'
};

export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
    setTheme(isDarkMode ? darkTheme : lightTheme);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setTheme(isDark ? lightTheme : darkTheme);
  };

  return { theme, isDark, toggleTheme };
}