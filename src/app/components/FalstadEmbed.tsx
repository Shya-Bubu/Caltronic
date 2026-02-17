'use client';

/**
 * FALSTAD CIRCUIT SIMULATOR EMBED
 * 
 * Embeds the Falstad CircuitJS interactive simulator via iframe.
 * Accepts circuit text (exported from Falstad) as a URL parameter.
 * 
 * Usage in visuals.json:
 * {
 *   "type": "falstad-sim",
 *   "title": "Interactive Resistor Circuit",
 *   "circuitText": "$ 1 0.000005 ...",
 *   "height": 450
 * }
 */

import { useState } from 'react';

interface FalstadEmbedProps {
    circuitText?: string;
    title?: string;
    description?: string;
    height?: number;
}

export default function FalstadEmbed({
    circuitText,
    title,
    description,
    height = 450,
}: FalstadEmbedProps) {
    const [loaded, setLoaded] = useState(false);

    // Build Falstad URL with circuit text
    // Use the `cct` parameter (plain-text circuit) instead of `ctz` (which
    // requires pako-compressed base64 — btoa alone is insufficient).
    const baseUrl = 'https://falstad.com/circuit/circuitjs.html';
    const params = new URLSearchParams();
    if (circuitText) {
        params.set('cct', circuitText);
    }
    params.set('running', 'true');
    params.set('whiteBackground', 'false');

    const src = `${baseUrl}?${params.toString()}`;

    return (
        <div style={{ marginBlock: '1.5rem' }}>
            {title && (
                <div style={{
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--sim-text-strong, var(--text))',
                    marginBottom: '0.75rem',
                    textAlign: 'center',
                    fontFamily: 'var(--font-sans)',
                }}>
                    {title}
                </div>
            )}
            <div style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                background: '#1a1a2e',
                position: 'relative',
            }}>
                {!loaded && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        zIndex: 1,
                    }}>
                        Loading Falstad simulator…
                    </div>
                )}
                <iframe
                    src={src}
                    title={title || 'Falstad Circuit Simulator'}
                    width="100%"
                    height={height}
                    style={{
                        border: 'none',
                        display: 'block',
                        opacity: loaded ? 1 : 0,
                        transition: 'opacity 0.3s',
                    }}
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    onLoad={() => setLoaded(true)}
                />
            </div>
            {description && (
                <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    textAlign: 'center',
                    fontStyle: 'italic',
                }}>
                    {description}
                </div>
            )}
        </div>
    );
}
