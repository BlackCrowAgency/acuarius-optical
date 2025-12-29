import React, { useEffect } from 'react';

export const withTheme = (Story: any, context: any) => {
  const theme = context?.globals?.theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);                 // Tailwind dark mode
    root.setAttribute('data-theme', isDark ? 'dark' : 'light'); // Tokens CSS
  }, [theme]);

  return <Story />;
};
