'use client';

import { useEffect, useState } from 'react';
import { getD3Theme, type D3Theme } from './d3-theme';

/**
 * Hook to detect current theme mode and return appropriate D3 theme
 * Listens for changes to the data-theme attribute on document root
 */
export function useD3Theme(): D3Theme {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            const root = document.documentElement;
            const theme = root.getAttribute('data-theme');
            setIsDarkMode(theme !== 'light');
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

    return getD3Theme(isDarkMode);
}
