'use client';

import { useEffect, useState, useRef } from 'react';

import styles from './ThemeToggle.module.css';

type Theme = 'dark' | 'light' | 'eye-comfort';

const STORAGE_KEY = 'caltronic:theme';

const THEME_CONFIG: Record<Theme, { label: string; icon: string }> = {
  dark: {
    label: 'Dark',
    icon: 'moon',
  },
  light: {
    label: 'Light',
    icon: 'sun',
  },
  'eye-comfort': {
    label: 'Eye Comfort',
    icon: 'eye',
  },
};

const THEME_ORDER: Theme[] = ['dark', 'light', 'eye-comfort'];

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const existing = document.documentElement.dataset.theme;
  if (existing === 'light') return 'light';
  if (existing === 'eye-comfort') return 'eye-comfort';
  return 'dark';
}

function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore
  }
}

// Icon components
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
    <path
      fill="currentColor"
      d="M21 14.2A7.3 7.3 0 0 1 9.8 3a.9.9 0 0 1 1.2 1.2 5.5 5.5 0 0 0 7.6 7.6.9.9 0 0 1 1.2 1.2Z"
    />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
    <path
      fill="currentColor"
      d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 4.22a1 1 0 0 1 1.41 0l.7.7a1 1 0 1 1-1.41 1.41l-.7-.7a1 1 0 0 1 0-1.41Zm13.45 13.45a1 1 0 0 1 1.41 0l.7.7a1 1 0 1 1-1.41 1.41l-.7-.7a1 1 0 0 1 0-1.41ZM19.78 4.22a1 1 0 0 1 0 1.41l-.7.7a1 1 0 1 1-1.41-1.41l.7-.7a1 1 0 0 1 1.41 0ZM6.33 17.67a1 1 0 0 1 0 1.41l-.7.7a1 1 0 1 1-1.41-1.41l.7-.7a1 1 0 0 1 1.41 0Z"
    />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
    <path
      fill="currentColor"
      d="M12 1l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 1zM5 3v2h2V3H5zm12 0v2h2V3h-2zM5 19v2h2v-2H5zm12 0v2h2v-2h-2z"
    />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
    <path
      fill="currentColor"
      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
    />
  </svg>
);

const getIcon = (theme: Theme) => {
  switch (THEME_CONFIG[theme].icon) {
    case 'sun':
      return <SunIcon />;
    case 'sparkle':
      return <SparkleIcon />;
    case 'eye':
      return <EyeIcon />;
    default:
      return <MoonIcon />;
  }
};

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setThemeState(getInitialTheme());
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (next: Theme) => {
    setTheme(next);
    setThemeState(next);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        type="button"
        className={styles.toggle}
        aria-label="Select theme"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.icon}>{getIcon(theme)}</span>
        <span className={styles.label}>{THEME_CONFIG[theme].label}</span>
        <svg
          viewBox="0 0 24 24"
          width="12"
          height="12"
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          aria-hidden
        >
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox" aria-label="Theme options">
          {THEME_ORDER.map((t) => (
            <button
              key={t}
              type="button"
              role="option"
              aria-selected={theme === t}
              className={`${styles.option} ${theme === t ? styles.optionActive : ''}`}
              onClick={() => handleSelect(t)}
            >
              <span className={styles.optionIcon}>{getIcon(t)}</span>
              <span>{THEME_CONFIG[t].label}</span>
              {theme === t && (
                <svg viewBox="0 0 24 24" width="14" height="14" className={styles.check}>
                  <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
