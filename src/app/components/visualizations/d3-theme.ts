/**
 * D3.js Theme Configuration
 * Unified visual style for all Caltronic visualizations
 * Supports both dark and light modes
 */

// Dark mode theme (default)
export const D3_THEME_DARK = {
    // Background & Grid
    background: '#0e1218',
    surface: '#141a22',
    grid: 'rgba(231, 238, 247, 0.12)',
    gridMajor: 'rgba(231, 238, 247, 0.25)',
    axis: 'rgba(231, 238, 247, 0.5)',

    // Signal Colors (Primary Palette)
    signalPrimary: '#6b8cff',     // Blue - main signals
    signalSecondary: '#ff8b6b',   // Orange/Coral - secondary
    signalTertiary: '#4ecdc4',    // Cyan/Teal - discrete samples
    signalQuaternary: '#a78bfa',  // Purple - tertiary signals

    // Accent Colors
    highlight: '#ffd93d',         // Yellow - emphasis
    success: '#22c55e',           // Green - valid regions
    warning: '#f59e0b',           // Amber - caution
    danger: '#ef4444',            // Red - active regions

    // Text
    text: '#e7eef7',
    textMuted: 'rgba(231, 238, 247, 0.6)',
    textDim: 'rgba(231, 238, 247, 0.4)',
} as const;

// Light mode theme
export const D3_THEME_LIGHT = {
    // Background & Grid
    background: '#ffffff',
    surface: '#f8fafc',
    grid: 'rgba(30, 41, 59, 0.12)',
    gridMajor: 'rgba(30, 41, 59, 0.25)',
    axis: 'rgba(30, 41, 59, 0.6)',

    // Signal Colors (slightly deeper for light bg)
    signalPrimary: '#3b5bdb',     // Deeper blue
    signalSecondary: '#e64a19',   // Deeper orange
    signalTertiary: '#00897b',    // Deeper teal
    signalQuaternary: '#7c3aed',  // Deeper purple

    // Accent Colors
    highlight: '#f59e0b',         // Amber
    success: '#16a34a',           // Deeper green
    warning: '#d97706',           // Deeper amber
    danger: '#dc2626',            // Deeper red

    // Text
    text: '#1e293b',
    textMuted: 'rgba(30, 41, 59, 0.6)',
    textDim: 'rgba(30, 41, 59, 0.4)',
} as const;

// Eye Comfort theme - Low contrast, muted colors for reduced eye strain
export const D3_THEME_EYE_COMFORT = {
    // Background & Grid - Low contrast
    background: '#1c1c1c',
    surface: '#222222',
    grid: 'rgba(255, 255, 255, 0.06)',
    gridMajor: 'rgba(255, 255, 255, 0.1)',
    axis: 'rgba(255, 255, 255, 0.25)',

    // Signal Colors - Muted, low saturation
    signalPrimary: '#7a8a7a',     // Muted sage green
    signalSecondary: '#9a8a7a',   // Muted tan
    signalTertiary: '#7a9a9a',    // Muted teal
    signalQuaternary: '#8a7a9a',  // Muted purple

    // Accent Colors - Subdued
    highlight: '#a09060',         // Muted gold
    success: '#6a8a6a',           // Muted green
    warning: '#9a8060',           // Muted amber
    danger: '#9a6a6a',            // Muted red

    // Text - Low contrast
    text: '#a0a0a0',
    textMuted: 'rgba(160, 160, 160, 0.6)',
    textDim: 'rgba(160, 160, 160, 0.4)',
} as const;

// Shared constants (mode-independent)
export const D3_SHARED = {
    // Typography
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontMono: 'JetBrains Mono, Consolas, monospace',

    // Line Styles
    strokeWidth: {
        thin: 1,
        normal: 2,
        thick: 3,
        heavy: 4,
    },

    // Grid dash patterns
    gridDash: '4 4',
    axisTickSize: 6,

    // Animations
    transitionDuration: 300,
    transitionEasing: 'ease-out',
} as const;

// Helper function to get theme based on mode
export function getD3Theme(mode: 'dark' | 'light' | 'eye-comfort') {
    let colors;
    if (mode === 'light') {
        colors = D3_THEME_LIGHT;
    } else if (mode === 'eye-comfort') {
        colors = D3_THEME_EYE_COMFORT;
    } else {
        colors = D3_THEME_DARK;
    }
    return { ...colors, ...D3_SHARED };
}

// Type for the combined theme
export type D3Theme = ReturnType<typeof getD3Theme>;

// Default export for backward compatibility (dark mode)
export const D3_THEME = { ...D3_THEME_DARK, ...D3_SHARED };

// Curve styles that adapt to theme
export function getCurveStyles(theme: D3Theme) {
    return {
        linear: { color: theme.signalPrimary, dash: '' },
        diode: { color: theme.signalSecondary, dash: '' },
        tunnel: { color: theme.signalTertiary, dash: '' },
        zener: { color: theme.signalQuaternary, dash: '' },
        open: { color: theme.textMuted, dash: '8 4' },
        short: { color: theme.textMuted, dash: '8 4' },
        loadLine: { color: theme.highlight, dash: '6 3' },
        operatingPoint: { color: theme.highlight, dash: '' },
        'pn-junction': { color: theme.signalSecondary, dash: '' },
        glow: { color: theme.signalTertiary, dash: '' },
        bilateral: { color: theme.signalPrimary, dash: '' },
    } as const;
}

// Signal styles that adapt to theme
export function getSignalStyles(theme: D3Theme) {
    return {
        continuous: { color: theme.signalPrimary, mode: 'line' },
        discrete: { color: theme.signalTertiary, mode: 'stem' },
        impulse: { color: theme.signalSecondary, mode: 'arrow' },
        step: { color: theme.signalPrimary, mode: 'step' },
        noise: { color: theme.textMuted, mode: 'line' },
    } as const;
}

// Legacy exports for backward compatibility
export const CURVE_STYLES = getCurveStyles(D3_THEME);
export const SIGNAL_STYLES = getSignalStyles(D3_THEME);

export type CurveType = keyof ReturnType<typeof getCurveStyles>;
export type SignalType = keyof ReturnType<typeof getSignalStyles>;
