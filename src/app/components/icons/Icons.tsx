/**
 * SVG Icons for CalTronic V2
 * 
 * Professional, minimal icons for academic UI
 */

import React from 'react';

interface IconProps {
    size?: number;
    color?: string;
    className?: string;
}

/**
 * Bullet icon for lists and resources
 */
export function BulletIcon({ size = 16, color = 'currentColor', className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <circle cx="8" cy="8" r="3" fill={color} />
        </svg>
    );
}

/**
 * Resource/Book icon
 */
export function ResourceIcon({ size = 18, color = 'currentColor', className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}

/**
 * Divider/Separator line
 */
export function DividerIcon({ size = 24, color = 'currentColor', className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

/**
 * Concept bullet icon (diamond shape)
 */
export function ConceptBullet({ size = 12, color = 'currentColor', className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 12 12"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <rect
                x="6"
                y="0.5"
                width="7.5"
                height="7.5"
                rx="1"
                transform="rotate(45 6 0.5)"
                fill={color}
            />
        </svg>
    );
}

/**
 * Video/Play icon for resources
 */
export function VideoIcon({ size = 18, color = 'currentColor', className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
    );
}

/**
 * Lecture/Graduation cap icon
 */
export function LectureIcon({ size = 18, color = 'currentColor', className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    );
}

/**
 * Checkmark icon for completion
 */
export function CheckIcon({ size = 18, color = 'currentColor', className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
