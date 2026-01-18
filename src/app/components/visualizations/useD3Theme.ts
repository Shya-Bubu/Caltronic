'use client';

import { useEffect, useState } from 'react';
import { getD3Theme, type D3Theme } from './d3-theme';

type ThemeMode = 'dark' | 'light' | 'eye-comfort';

/**
 * Hook to detect current theme mode and return appropriate D3 theme
 * Listens for changes to the data-theme attribute on document root
 */
export function useD3Theme(): D3Theme {
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            const root = document.documentElement;
            const theme = root.getAttribute('data-theme');
            if (theme === 'light') {
                setThemeMode('light');
            } else if (theme === 'eye-comfort') {
                setThemeMode('eye-comfort');
            } else {
                setThemeMode('dark');
            }
        };

        checkTheme();

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    checkTheme();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    return getD3Theme(themeMode);
}

