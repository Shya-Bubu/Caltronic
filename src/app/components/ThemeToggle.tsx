'use client';

import { useEffect, useState } from 'react';

import styles from './ThemeToggle.module.css';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'caltronic:theme';

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const existing = document.documentElement.dataset.theme;
  return existing === 'light' ? 'light' : 'dark';
}

function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore
  }
}

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    setThemeState(getInitialTheme());
  }, []);

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      aria-pressed={isLight}
      onClick={() => {
        const next: Theme = isLight ? 'dark' : 'light';
        setTheme(next);
        setThemeState(next);
      }}
    >
      {isLight ? (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden
          className={styles.icon}
        >
          <path
            fill="currentColor"
            d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 4.22a1 1 0 0 1 1.41 0l.7.7a1 1 0 1 1-1.41 1.41l-.7-.7a1 1 0 0 1 0-1.41Zm13.45 13.45a1 1 0 0 1 1.41 0l.7.7a1 1 0 1 1-1.41 1.41l-.7-.7a1 1 0 0 1 0-1.41ZM19.78 4.22a1 1 0 0 1 0 1.41l-.7.7a1 1 0 1 1-1.41-1.41l.7-.7a1 1 0 0 1 1.41 0ZM6.33 17.67a1 1 0 0 1 0 1.41l-.7.7a1 1 0 1 1-1.41-1.41l.7-.7a1 1 0 0 1 1.41 0Z"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden
          className={styles.icon}
        >
          <path
            fill="currentColor"
            d="M21 14.2A7.3 7.3 0 0 1 9.8 3a.9.9 0 0 1 1.2 1.2 5.5 5.5 0 0 0 7.6 7.6.9.9 0 0 1 1.2 1.2Z"
          />
        </svg>
      )}
      <span className={styles.label}>{isLight ? 'Light' : 'Dark'}</span>
    </button>
  );
}
