/**
 * Engineering Diagrams - Dynamic SVG illustrations for technical concepts
 * 
 * These are precise, graph-style diagrams for signals, circuits, and system concepts.
 * Similar to diagrams you'd see in textbooks and lecture notes.
 * 
 * UPDATED: VICurve and SimpleCircuit now accept props to render different curve types.
 */

import React from 'react';
import styles from './EngineeringDiagrams.module.css';

interface DiagramProps {
    title?: string;
    caption?: string;
    className?: string;
}

// Extended props for VICurve to support different curve types
interface VICurveProps extends DiagramProps {
    curveType?: 'linear' | 'diode' | 'tunnel' | 'open' | 'short' | 'glow' | 'pn-junction' | 'bilateral';
}

// Extended props for SimpleCircuit to support different circuit types
interface CircuitProps extends DiagramProps {
    circuitType?: 'resistor' | 'series' | 'parallel' | 'voltage-divider' | 'diode';
}

/**
 * Simple Block Diagram - System representation
 */
export function BlockDiagram({ title, caption, className }: DiagramProps) {
    return (
        <figure className={`${styles.diagram} ${className || ''}`}>
            {title && <div className={styles.diagramTitle}>{title}</div>}
            <svg viewBox="0 0 400 200" className={styles.svg}>
                {/* Grid background */}
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--sim-border)" strokeWidth="0.5" opacity="0.3" />
                    </pattern>
                </defs>
                <rect width="400" height="200" fill="url(#grid)" />

                {/* Input */}
                <text x="30" y="105" className={styles.label}>x(t)</text>
                <line x1="70" y1="100" x2="140" y2="100" stroke="var(--sim-text)" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* System Block */}
                <rect x="140" y="70" width="120" height="60" fill="var(--panel)" stroke="var(--accent)" strokeWidth="2" rx="4" />
                <text x="200" y="105" textAnchor="middle" className={styles.systemLabel}>System</text>
                <text x="200" y="120" textAnchor="middle" className={styles.systemSubLabel}>H(s)</text>

                {/* Output */}
                <line x1="260" y1="100" x2="330" y2="100" stroke="var(--sim-text)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="350" y="105" className={styles.label}>y(t)</text>

                {/* Arrow marker definition */}
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="var(--sim-text)" />
                    </marker>
                </defs>
            </svg>
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
}

/**
 * Sine Wave - Continuous signal representation
 */
export function SineWaveDiagram({ title, caption, className }: DiagramProps) {
    // Generate sine wave path
    const points = 200;
    const width = 400;
    const height = 200;
    const amplitude = 60;
    const frequency = 2;
    const centerY = height / 2;

    let path = `M 0 ${centerY}`;
    for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        const y = centerY - amplitude * Math.sin((i / points) * frequency * 2 * Math.PI);
        path += ` L ${x} ${y}`;
    }

    return (
        <figure className={`${styles.diagram} ${className || ''}`}>
            {title && <div className={styles.diagramTitle}>{title}</div>}
            <svg viewBox="0 0 400 200" className={styles.svg}>
                {/* Axes */}
                <line x1="20" y1="100" x2="380" y2="100" stroke="var(--sim-text)" strokeWidth="1.5" />
                <line x1="30" y1="20" x2="30" y2="180" stroke="var(--sim-text)" strokeWidth="1.5" />

                {/* Axis labels */}
                <text x="385" y="105" className={styles.axisLabel}>t</text>
                <text x="20" y="15" className={styles.axisLabel}>x(t)</text>

                {/* Sine wave */}
                <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" />

                {/* Grid lines */}
                <line x1="30" y1="40" x2="380" y2="40" stroke="var(--sim-border)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
                <line x1="30" y1="160" x2="380" y2="160" stroke="var(--sim-border)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
            </svg>
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
}

/**
 * Discrete Signal - Stem plot representation
 */
export function DiscreteStemPlot({ title, caption, className }: DiagramProps) {
    const samples = 16;
    const width = 400;
    const height = 200;
    const amplitude = 60;
    const centerY = height / 2;
    const padding = 40;
    const plotWidth = width - 2 * padding;

    const stems = [];
    for (let i = 0; i < samples; i++) {
        const x = padding + (i / (samples - 1)) * plotWidth;
        const value = amplitude * Math.sin((i / samples) * 4 * Math.PI);
        const y = centerY - value;
        stems.push({ x, y });
    }

    return (
        <figure className={`${styles.diagram} ${className || ''}`}>
            {title && <div className={styles.diagramTitle}>{title}</div>}
            <svg viewBox="0 0 400 200" className={styles.svg}>
                {/* Axes */}
                <line x1="30" y1="100" x2="380" y2="100" stroke="var(--sim-text)" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="180" stroke="var(--sim-text)" strokeWidth="1.5" />

                {/* Axis labels */}
                <text x="385" y="105" className={styles.axisLabel}>n</text>
                <text x="25" y="15" className={styles.axisLabel}>x[n]</text>

                {/* Stems */}
                {stems.map((stem, i) => (
                    <g key={i}>
                        <line
                            x1={stem.x}
                            y1={centerY}
                            x2={stem.x}
                            y2={stem.y}
                            stroke="var(--accent)"
                            strokeWidth="2"
                        />
                        <circle
                            cx={stem.x}
                            cy={stem.y}
                            r="4"
                            fill="var(--accent)"
                        />
                    </g>
                ))}
            </svg>
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
}

/**
 * Simple Circuit Diagram - Dynamic circuit types
 */
export function SimpleCircuit({ title, caption, className, circuitType = 'resistor' }: CircuitProps) {
    // Different circuit layouts based on type
    const renderCircuit = () => {
        switch (circuitType) {
            case 'series':
                return (
                    <>
                        {/* Voltage source */}
                        <circle cx="60" cy="100" r="20" fill="none" stroke="var(--sim-text)" strokeWidth="2" />
                        <text x="60" y="90" textAnchor="middle" className={styles.smallLabel}>+</text>
                        <text x="60" y="115" textAnchor="middle" className={styles.smallLabel}>-</text>

                        {/* Wire from + */}
                        <line x1="60" y1="80" x2="60" y2="50" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="60" y1="50" x2="340" y2="50" stroke="var(--sim-text)" strokeWidth="2" />

                        {/* R1 */}
                        <path d="M 120 50 L 130 60 L 150 40 L 170 60 L 190 40 L 200 50"
                            fill="none" stroke="var(--accent)" strokeWidth="2.5" />
                        <text x="160" y="35" textAnchor="middle" className={styles.smallLabel}>R1</text>

                        {/* R2 */}
                        <path d="M 240 50 L 250 60 L 270 40 L 290 60 L 310 40 L 320 50"
                            fill="none" stroke="var(--sim-accent-alt)" strokeWidth="2.5" />
                        <text x="280" y="35" textAnchor="middle" className={styles.smallLabel}>R2</text>

                        {/* Wire to ground */}
                        <line x1="340" y1="50" x2="340" y2="100" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="340" y1="100" x2="60" y2="100" stroke="var(--sim-text)" strokeWidth="2" />
                    </>
                );

            case 'parallel':
                return (
                    <>
                        {/* Voltage source */}
                        <circle cx="60" cy="100" r="20" fill="none" stroke="var(--sim-text)" strokeWidth="2" />
                        <text x="60" y="90" textAnchor="middle" className={styles.smallLabel}>+</text>
                        <text x="60" y="115" textAnchor="middle" className={styles.smallLabel}>-</text>

                        {/* Top wire */}
                        <line x1="60" y1="80" x2="60" y2="50" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="60" y1="50" x2="340" y2="50" stroke="var(--sim-text)" strokeWidth="2" />

                        {/* Junction nodes */}
                        <circle cx="150" cy="50" r="3" fill="var(--sim-text)" />
                        <circle cx="250" cy="50" r="3" fill="var(--sim-text)" />
                        <circle cx="150" cy="150" r="3" fill="var(--sim-text)" />
                        <circle cx="250" cy="150" r="3" fill="var(--sim-text)" />

                        {/* R1 vertical */}
                        <line x1="150" y1="50" x2="150" y2="70" stroke="var(--sim-text)" strokeWidth="2" />
                        <path d="M 150 70 L 160 80 L 140 100 L 160 120 L 150 130"
                            fill="none" stroke="var(--accent)" strokeWidth="2.5" />
                        <text x="170" y="100" className={styles.smallLabel}>R1</text>
                        <line x1="150" y1="130" x2="150" y2="150" stroke="var(--sim-text)" strokeWidth="2" />

                        {/* R2 vertical */}
                        <line x1="250" y1="50" x2="250" y2="70" stroke="var(--sim-text)" strokeWidth="2" />
                        <path d="M 250 70 L 260 80 L 240 100 L 260 120 L 250 130"
                            fill="none" stroke="var(--sim-accent-alt)" strokeWidth="2.5" />
                        <text x="270" y="100" className={styles.smallLabel}>R2</text>
                        <line x1="250" y1="130" x2="250" y2="150" stroke="var(--sim-text)" strokeWidth="2" />

                        {/* Bottom wire */}
                        <line x1="60" y1="120" x2="60" y2="150" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="60" y1="150" x2="340" y2="150" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="340" y1="150" x2="340" y2="50" stroke="var(--sim-text)" strokeWidth="2" />
                    </>
                );

            case 'diode':
                return (
                    <>
                        {/* Voltage source */}
                        <circle cx="80" cy="100" r="25" fill="none" stroke="var(--sim-text)" strokeWidth="2" />
                        <text x="80" y="90" textAnchor="middle" className={styles.label}>+</text>
                        <text x="80" y="115" textAnchor="middle" className={styles.label}>-</text>

                        {/* Wire from + */}
                        <line x1="80" y1="75" x2="80" y2="40" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="80" y1="40" x2="200" y2="40" stroke="var(--sim-text)" strokeWidth="2" />

                        {/* Diode symbol */}
                        <polygon points="200,25 200,55 230,40" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
                        <line x1="230" y1="25" x2="230" y2="55" stroke="var(--accent)" strokeWidth="2.5" />
                        <text x="215" y="20" textAnchor="middle" className={styles.smallLabel}>D</text>

                        {/* Wire to ground */}
                        <line x1="230" y1="40" x2="330" y2="40" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="330" y1="40" x2="330" y2="100" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="330" y1="100" x2="80" y2="100" stroke="var(--sim-text)" strokeWidth="2" />
                    </>
                );

            default: // resistor
                return (
                    <>
                        {/* Voltage source */}
                        <circle cx="80" cy="100" r="25" fill="none" stroke="var(--sim-text)" strokeWidth="2" />
                        <text x="80" y="85" textAnchor="middle" className={styles.label}>+</text>
                        <text x="80" y="120" textAnchor="middle" className={styles.label}>-</text>
                        <text x="80" y="140" textAnchor="middle" className={styles.smallLabel}>V</text>

                        {/* Wire from + terminal */}
                        <line x1="80" y1="75" x2="80" y2="40" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="80" y1="40" x2="250" y2="40" stroke="var(--sim-text)" strokeWidth="2" />

                        {/* Resistor */}
                        <path d="M 250 40 L 260 50 L 280 30 L 300 50 L 320 30 L 330 40"
                            fill="none" stroke="var(--accent)" strokeWidth="2.5" />
                        <text x="290" y="25" textAnchor="middle" className={styles.label}>R</text>

                        {/* Wire to ground */}
                        <line x1="330" y1="40" x2="330" y2="100" stroke="var(--sim-text)" strokeWidth="2" />
                        <line x1="330" y1="100" x2="80" y2="100" stroke="var(--sim-text)" strokeWidth="2" />

                        {/* Current arrow */}
                        <defs>
                            <marker id="current-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <polygon points="0 0, 10 3, 0 6" fill="var(--sim-accent-alt)" />
                            </marker>
                        </defs>
                        <line x1="150" y1="35" x2="200" y2="35" stroke="var(--sim-accent-alt)" strokeWidth="1.5" markerEnd="url(#current-arrow)" />
                        <text x="175" y="28" textAnchor="middle" className={styles.smallLabel} fill="var(--sim-accent-alt)">I</text>
                    </>
                );
        }
    };

    return (
        <figure className={`${styles.diagram} ${className || ''}`}>
            {title && <div className={styles.diagramTitle}>{title}</div>}
            <svg viewBox="0 0 400 200" className={styles.svg}>
                {renderCircuit()}
            </svg>
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
}

/**
 * VI Curve - Dynamic Voltage-Current characteristic
 * Now supports multiple curve types for different components
 */
export function VICurve({ title, caption, className, curveType = 'linear' }: VICurveProps) {
    const width = 400;
    const height = 200;
    const padding = 50;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;
    const centerX = padding + plotWidth / 2;
    const centerY = padding + plotHeight / 2;

    // Generate path based on curve type
    const generatePath = (): string => {
        const points = 100;
        let path = '';

        switch (curveType) {
            case 'linear':
                // Straight line through origin: i = v/R (slope = 1/R)
                path = `M ${padding} ${height - padding}`;
                for (let i = 0; i <= points; i++) {
                    const t = i / points;
                    const x = padding + t * plotWidth;
                    const y = height - padding - t * plotHeight;
                    path += ` L ${x} ${y}`;
                }
                break;

            case 'open':
                // Horizontal line at i=0 (open circuit, R=infinity)
                path = `M ${padding} ${centerY} L ${padding + plotWidth} ${centerY}`;
                break;

            case 'short':
                // Vertical line at v=0 (short circuit, R=0)
                path = `M ${centerX} ${padding} L ${centerX} ${height - padding}`;
                break;

            case 'diode':
                // Ideal diode: negative v-axis + positive i-axis (L-shaped)
                path = `M ${padding} ${centerY} L ${centerX} ${centerY} L ${centerX} ${padding}`;
                break;

            case 'pn-junction':
                // Exponential curve for real diode
                path = `M ${padding} ${centerY + 5}`;
                for (let i = 0; i <= points; i++) {
                    const t = i / points;
                    const v = -1 + t * 2; // v from -1 to +1
                    const x = centerX + v * (plotWidth / 2);
                    // Exponential: i = Is(e^(v/Vt) - 1)
                    const iNorm = v > 0 ? Math.min(1, (Math.exp(v * 5) - 1) / 50) : 0;
                    const y = centerY - iNorm * (plotHeight / 2);
                    path += ` L ${x} ${y}`;
                }
                break;

            case 'tunnel':
                // N-shaped curve with negative resistance region
                path = `M ${padding} ${height - padding}`;
                for (let i = 0; i <= points; i++) {
                    const t = i / points;
                    const v = t; // normalized voltage 0 to 1
                    // Create N-shape: rises, falls, rises
                    let iNorm;
                    if (v < 0.25) {
                        iNorm = v * 3; // rise to peak
                    } else if (v < 0.5) {
                        iNorm = 0.75 - (v - 0.25) * 2; // fall (negative resistance)
                    } else {
                        iNorm = 0.25 + (v - 0.5) * 1.5; // rise again
                    }
                    const x = padding + t * plotWidth;
                    const y = height - padding - iNorm * plotHeight;
                    path += ` L ${x} ${y}`;
                }
                break;

            case 'glow':
                // S-shaped curve for glow tube (current-controlled)
                path = `M ${padding} ${height - padding}`;
                for (let i = 0; i <= points; i++) {
                    const t = i / points;
                    // Create S-shape that folds back
                    let vNorm, iNorm;
                    if (t < 0.3) {
                        vNorm = t * 2;
                        iNorm = t;
                    } else if (t < 0.5) {
                        vNorm = 0.6 - (t - 0.3) * 1.5;
                        iNorm = t;
                    } else {
                        vNorm = 0.3 + (t - 0.5) * 1.4;
                        iNorm = t;
                    }
                    const x = padding + vNorm * plotWidth;
                    const y = height - padding - iNorm * plotHeight;
                    path += ` L ${x} ${y}`;
                }
                break;

            case 'bilateral':
                // Symmetric about origin (like a varistor)
                path = `M ${padding} ${height - padding - 10}`;
                for (let i = 0; i <= points; i++) {
                    const t = (i / points) * 2 - 1; // -1 to +1
                    const x = centerX + t * (plotWidth / 2);
                    // Symmetric cubic
                    const y = centerY - Math.pow(t, 3) * (plotHeight / 2);
                    path += ` L ${x} ${y}`;
                }
                break;

            default:
                path = `M ${padding} ${height - padding} L ${padding + plotWidth} ${padding}`;
        }

        return path;
    };

    // Get operating point position based on curve type
    const getOperatingPoint = () => {
        switch (curveType) {
            case 'tunnel':
                return { x: centerX - 40, y: centerY - 20, label: 'Q (NDR)' };
            case 'pn-junction':
                return { x: centerX + 30, y: centerY - 30, label: 'Q' };
            case 'open':
            case 'short':
            case 'diode':
                return null; // No operating point for these
            default:
                return { x: centerX, y: centerY, label: 'Q' };
        }
    };

    const operatingPoint = getOperatingPoint();

    return (
        <figure className={`${styles.diagram} ${className || ''}`}>
            {title && <div className={styles.diagramTitle}>{title}</div>}
            <svg viewBox="0 0 400 200" className={styles.svg}>
                {/* Axes */}
                <line x1={padding} y1={centerY} x2={padding + plotWidth} y2={centerY} stroke="var(--sim-text)" strokeWidth="1.5" />
                <line x1={centerX} y1={padding} x2={centerX} y2={height - padding} stroke="var(--sim-text)" strokeWidth="1.5" />

                {/* Axis labels */}
                <text x={padding + plotWidth + 10} y={centerY + 5} className={styles.axisLabel}>V</text>
                <text x={centerX - 15} y={padding - 5} className={styles.axisLabel}>I</text>

                {/* Origin label */}
                <text x={centerX + 5} y={centerY + 15} className={styles.smallLabel}>0</text>

                {/* Grid */}
                <line x1={padding} y1={padding + plotHeight * 0.25} x2={padding + plotWidth} y2={padding + plotHeight * 0.25}
                    stroke="var(--sim-border)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
                <line x1={padding} y1={padding + plotHeight * 0.75} x2={padding + plotWidth} y2={padding + plotHeight * 0.75}
                    stroke="var(--sim-border)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

                {/* VI Curve */}
                <path d={generatePath()} fill="none" stroke="var(--accent)" strokeWidth="3" />

                {/* Operating point (if applicable) */}
                {operatingPoint && (
                    <>
                        <circle cx={operatingPoint.x} cy={operatingPoint.y} r="5" fill="var(--sim-warning)" />
                        <text x={operatingPoint.x + 10} y={operatingPoint.y - 5} className={styles.smallLabel} fill="var(--sim-warning)">
                            {operatingPoint.label}
                        </text>
                    </>
                )}
            </svg>
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
}

/**
 * Frequency Spectrum - Magnitude plot
 */
export function FrequencySpectrum({ title, caption, className }: DiagramProps) {
    const bars = [
        { freq: 0, mag: 0.2 },
        { freq: 1, mag: 0.8 },
        { freq: 2, mag: 0.3 },
        { freq: 3, mag: 0.6 },
        { freq: 4, mag: 0.15 },
        { freq: 5, mag: 0.4 },
        { freq: 6, mag: 0.1 },
    ];

    const width = 400;
    const height = 200;
    const padding = 50;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;
    const barWidth = plotWidth / (bars.length * 2);

    return (
        <figure className={`${styles.diagram} ${className || ''}`}>
            {title && <div className={styles.diagramTitle}>{title}</div>}
            <svg viewBox="0 0 400 200" className={styles.svg}>
                {/* Axes */}
                <line x1="40" y1="160" x2="370" y2="160" stroke="var(--sim-text)" strokeWidth="1.5" />
                <line x1="40" y1="160" x2="40" y2="30" stroke="var(--sim-text)" strokeWidth="1.5" />

                {/* Axis labels */}
                <text x="380" y="165" className={styles.axisLabel}>f</text>
                <text x="25" y="25" className={styles.axisLabel}>|X(f)|</text>

                {/* Bars */}
                {bars.map((bar, i) => {
                    const x = 60 + (i / bars.length) * plotWidth;
                    const barHeight = bar.mag * plotHeight;
                    const y = 160 - barHeight;
                    return (
                        <rect
                            key={i}
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            fill="var(--accent)"
                            opacity="0.8"
                        />
                    );
                })}
            </svg>
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
}

/**
 * Step Function - Unit step signal
 */
export function StepFunction({ title, caption, className }: DiagramProps) {
    return (
        <figure className={`${styles.diagram} ${className || ''}`}>
            {title && <div className={styles.diagramTitle}>{title}</div>}
            <svg viewBox="0 0 400 200" className={styles.svg}>
                {/* Axes */}
                <line x1="30" y1="140" x2="380" y2="140" stroke="var(--sim-text)" strokeWidth="1.5" />
                <line x1="200" y1="30" x2="200" y2="170" stroke="var(--sim-text)" strokeWidth="1.5" />

                {/* Axis labels */}
                <text x="385" y="145" className={styles.axisLabel}>t</text>
                <text x="185" y="25" className={styles.axisLabel}>u(t)</text>

                {/* Step function */}
                <line x1="30" y1="140" x2="200" y2="140" stroke="var(--accent)" strokeWidth="3" />
                <line x1="200" y1="140" x2="200" y2="60" stroke="var(--accent)" strokeWidth="3" strokeDasharray="4 4" />
                <line x1="200" y1="60" x2="380" y2="60" stroke="var(--accent)" strokeWidth="3" />

                {/* Step height label */}
                <line x1="190" y1="60" x2="210" y2="60" stroke="var(--sim-text)" strokeWidth="1" />
                <text x="180" y="65" textAnchor="end" className={styles.smallLabel}>1</text>

                {/* Origin marker */}
                <circle cx="200" cy="140" r="3" fill="var(--sim-text)" />
                <text x="205" y="155" className={styles.smallLabel}>0</text>
            </svg>
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
}

/**
 * Export all diagrams
 */
export default {
    BlockDiagram,
    SineWaveDiagram,
    DiscreteStemPlot,
    SimpleCircuit,
    VICurve,
    FrequencySpectrum,
    StepFunction,
};
