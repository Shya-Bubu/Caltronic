'use client';

/**
 * CIRCUIT SYMBOLS LIBRARY - IEEE/IEC Standard SVG Components
 * 
 * Professional-grade circuit schematic symbols rendered as pure React SVG.
 * Each symbol follows IEEE Std 315 / IEC 60617 conventions.
 * 
 * Symbols accept position (x, y), rotation, and label props.
 * All dimensions are in SVG user units; default viewBox alignment assumed.
 */

import React from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface SymbolProps {
  x: number;
  y: number;
  rotation?: number; // degrees, default 0 (horizontal)
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  value?: string; // e.g. "1kΩ", "10μF"
  color?: string;
  strokeWidth?: number;
}

interface WireProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  strokeWidth?: number;
}

interface NodeProps {
  x: number;
  y: number;
  color?: string;
  radius?: number;
}

// ─────────────────────────────────────────────
// Helper: transform string
// ─────────────────────────────────────────────
function tx(x: number, y: number, rotation: number = 0): string {
  if (rotation === 0) return `translate(${x}, ${y})`;
  return `translate(${x}, ${y}) rotate(${rotation})`;
}

function labelOffset(pos: string = 'top', rotation: number = 0): { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' } {
  // Normalize rotation
  const r = ((rotation % 360) + 360) % 360;
  const isVertical = r === 90 || r === 270;

  if (isVertical) {
    switch (pos) {
      case 'left': return { dx: -14, dy: 4, anchor: 'end' };
      case 'right': return { dx: 14, dy: 4, anchor: 'start' };
      default: return { dx: -14, dy: 4, anchor: 'end' };
    }
  }

  switch (pos) {
    case 'top': return { dx: 0, dy: -12, anchor: 'middle' };
    case 'bottom': return { dx: 0, dy: 18, anchor: 'middle' };
    case 'left': return { dx: -20, dy: 4, anchor: 'end' };
    case 'right': return { dx: 20, dy: 4, anchor: 'start' };
    default: return { dx: 0, dy: -12, anchor: 'middle' };
  }
}

// ─────────────────────────────────────────────
// WIRE
// ─────────────────────────────────────────────
export function Wire({ x1, y1, x2, y2, color = 'var(--sim-text)', strokeWidth = 2 }: WireProps) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />;
}

// ─────────────────────────────────────────────
// JUNCTION NODE (filled dot)
// ─────────────────────────────────────────────
export function JunctionNode({ x, y, color = 'var(--sim-text)', radius = 3.5 }: NodeProps) {
  return <circle cx={x} cy={y} r={radius} fill={color} />;
}

// ─────────────────────────────────────────────
// GROUND SYMBOL
// ─────────────────────────────────────────────
export function Ground({ x, y, rotation = 0, color = 'var(--sim-text)', strokeWidth = 2 }: Omit<SymbolProps, 'label'>) {
  return (
    <g transform={tx(x, y, rotation)}>
      <line x1={0} y1={0} x2={0} y2={8} stroke={color} strokeWidth={strokeWidth} />
      <line x1={-10} y1={8} x2={10} y2={8} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1={-6} y1={13} x2={6} y2={13} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1={-2} y1={18} x2={2} y2={18} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>
  );
}

// ─────────────────────────────────────────────
// RESISTOR (IEEE zigzag style)
// Horizontal: left terminal at (-30,0), right terminal at (30,0)
// ─────────────────────────────────────────────
export function Resistor({
  x, y, rotation = 0, label, labelPosition = 'top', value, color = 'var(--sim-text)', strokeWidth = 2
}: SymbolProps) {
  const lo = labelOffset(labelPosition, rotation);
  return (
    <g transform={tx(x, y, rotation)}>
      {/* Lead-in wires */}
      <line x1={-30} y1={0} x2={-20} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <line x1={20} y1={0} x2={30} y2={0} stroke={color} strokeWidth={strokeWidth} />
      {/* Zigzag body */}
      <polyline
        points="-20,0 -16,-8 -8,8 0,-8 8,8 16,-8 20,0"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={strokeWidth + 0.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Label */}
      {label && (
        <text x={lo.dx} y={lo.dy} textAnchor={lo.anchor} fill="var(--sim-text-strong)" fontSize="11" fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
      {value && (
        <text x={lo.dx} y={lo.dy + (labelPosition === 'top' ? -13 : 13)} textAnchor={lo.anchor} fill="var(--sim-text)" fontSize="10" fontFamily="var(--font-sans)">
          {value}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// RESISTOR (IEC rectangular box style)
// ─────────────────────────────────────────────
export function ResistorIEC({
  x, y, rotation = 0, label, labelPosition = 'top', value, color = 'var(--sim-text)', strokeWidth = 2
}: SymbolProps) {
  const lo = labelOffset(labelPosition, rotation);
  return (
    <g transform={tx(x, y, rotation)}>
      <line x1={-30} y1={0} x2={-18} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <line x1={18} y1={0} x2={30} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <rect x={-18} y={-7} width={36} height={14} fill="none" stroke="var(--accent)" strokeWidth={strokeWidth + 0.5} rx={1} />
      {label && (
        <text x={lo.dx} y={lo.dy} textAnchor={lo.anchor} fill="var(--sim-text-strong)" fontSize="11" fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
      {value && (
        <text x={lo.dx} y={lo.dy + (labelPosition === 'top' ? -13 : 13)} textAnchor={lo.anchor} fill="var(--sim-text)" fontSize="10" fontFamily="var(--font-sans)">
          {value}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// CAPACITOR
// Left terminal at (-30,0), right terminal at (30,0)
// ─────────────────────────────────────────────
export function Capacitor({
  x, y, rotation = 0, label, labelPosition = 'top', value, color = 'var(--sim-text)', strokeWidth = 2
}: SymbolProps) {
  const lo = labelOffset(labelPosition, rotation);
  return (
    <g transform={tx(x, y, rotation)}>
      <line x1={-30} y1={0} x2={-4} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <line x1={4} y1={0} x2={30} y2={0} stroke={color} strokeWidth={strokeWidth} />
      {/* Two parallel plates */}
      <line x1={-4} y1={-12} x2={-4} y2={12} stroke="var(--accent)" strokeWidth={strokeWidth + 0.5} strokeLinecap="round" />
      <line x1={4} y1={-12} x2={4} y2={12} stroke="var(--accent)" strokeWidth={strokeWidth + 0.5} strokeLinecap="round" />
      {label && (
        <text x={lo.dx} y={lo.dy} textAnchor={lo.anchor} fill="var(--sim-text-strong)" fontSize="11" fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
      {value && (
        <text x={lo.dx} y={lo.dy + (labelPosition === 'top' ? -13 : 13)} textAnchor={lo.anchor} fill="var(--sim-text)" fontSize="10" fontFamily="var(--font-sans)">
          {value}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// INDUCTOR
// Left terminal at (-30,0), right terminal at (30,0)
// ─────────────────────────────────────────────
export function Inductor({
  x, y, rotation = 0, label, labelPosition = 'top', value, color = 'var(--sim-text)', strokeWidth = 2
}: SymbolProps) {
  const lo = labelOffset(labelPosition, rotation);
  return (
    <g transform={tx(x, y, rotation)}>
      <line x1={-30} y1={0} x2={-18} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <line x1={18} y1={0} x2={30} y2={0} stroke={color} strokeWidth={strokeWidth} />
      {/* Four bumps (arcs) */}
      <path
        d="M -18 0 C -18 -12, -9 -12, -9 0 C -9 -12, 0 -12, 0 0 C 0 -12, 9 -12, 9 0 C 9 -12, 18 -12, 18 0"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={strokeWidth + 0.5}
        strokeLinecap="round"
      />
      {label && (
        <text x={lo.dx} y={lo.dy} textAnchor={lo.anchor} fill="var(--sim-text-strong)" fontSize="11" fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
      {value && (
        <text x={lo.dx} y={lo.dy + (labelPosition === 'top' ? -13 : 13)} textAnchor={lo.anchor} fill="var(--sim-text)" fontSize="10" fontFamily="var(--font-sans)">
          {value}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// DIODE (triangle + bar)
// Anode at (-30,0), Cathode at (30,0)
// ─────────────────────────────────────────────
export function Diode({
  x, y, rotation = 0, label, labelPosition = 'top', value, color = 'var(--sim-text)', strokeWidth = 2
}: SymbolProps) {
  const lo = labelOffset(labelPosition, rotation);
  return (
    <g transform={tx(x, y, rotation)}>
      <line x1={-30} y1={0} x2={-10} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <line x1={10} y1={0} x2={30} y2={0} stroke={color} strokeWidth={strokeWidth} />
      {/* Triangle */}
      <polygon points="-10,-10 -10,10 10,0" fill="none" stroke="var(--accent)" strokeWidth={strokeWidth + 0.5} strokeLinejoin="round" />
      {/* Cathode bar */}
      <line x1={10} y1={-10} x2={10} y2={10} stroke="var(--accent)" strokeWidth={strokeWidth + 0.5} strokeLinecap="round" />
      {label && (
        <text x={lo.dx} y={lo.dy} textAnchor={lo.anchor} fill="var(--sim-text-strong)" fontSize="11" fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// VOLTAGE SOURCE (circle with + −)
// Left terminal at (-30,0), right terminal at (30,0)
// ─────────────────────────────────────────────
export function VoltageSource({
  x, y, rotation = 0, label, labelPosition = 'top', value, color = 'var(--sim-text)', strokeWidth = 2
}: SymbolProps) {
  const lo = labelOffset(labelPosition, rotation);
  return (
    <g transform={tx(x, y, rotation)}>
      <line x1={-30} y1={0} x2={-14} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <line x1={14} y1={0} x2={30} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <circle cx={0} cy={0} r={14} fill="none" stroke="var(--accent)" strokeWidth={strokeWidth + 0.5} />
      {/* Plus sign */}
      <line x1={-7} y1={0} x2={-3} y2={0} stroke="var(--accent)" strokeWidth={1.5} />
      <line x1={-5} y1={-2} x2={-5} y2={2} stroke="var(--accent)" strokeWidth={1.5} />
      {/* Minus sign */}
      <line x1={3} y1={0} x2={7} y2={0} stroke="var(--accent)" strokeWidth={1.5} />
      {label && (
        <text x={lo.dx} y={lo.dy} textAnchor={lo.anchor} fill="var(--sim-text-strong)" fontSize="11" fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
      {value && (
        <text x={lo.dx} y={lo.dy + (labelPosition === 'top' ? -13 : 13)} textAnchor={lo.anchor} fill="var(--sim-text)" fontSize="10" fontFamily="var(--font-sans)">
          {value}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// CURRENT SOURCE (circle with arrow)
// Left terminal at (-30,0), right terminal at (30,0)
// ─────────────────────────────────────────────
export function CurrentSource({
  x, y, rotation = 0, label, labelPosition = 'top', value, color = 'var(--sim-text)', strokeWidth = 2
}: SymbolProps) {
  const lo = labelOffset(labelPosition, rotation);
  return (
    <g transform={tx(x, y, rotation)}>
      <line x1={-30} y1={0} x2={-14} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <line x1={14} y1={0} x2={30} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <circle cx={0} cy={0} r={14} fill="none" stroke="var(--accent)" strokeWidth={strokeWidth + 0.5} />
      {/* Arrow pointing right (current direction) */}
      <line x1={-6} y1={0} x2={6} y2={0} stroke="var(--accent)" strokeWidth={2} />
      <polygon points="6,0 1,-3 1,3" fill="var(--accent)" />
      {label && (
        <text x={lo.dx} y={lo.dy} textAnchor={lo.anchor} fill="var(--sim-text-strong)" fontSize="11" fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
      {value && (
        <text x={lo.dx} y={lo.dy + (labelPosition === 'top' ? -13 : 13)} textAnchor={lo.anchor} fill="var(--sim-text)" fontSize="10" fontFamily="var(--font-sans)">
          {value}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// OP-AMP (triangle)
// Inverting input at (-30, -12), Non-inverting at (-30, 12), Output at (30, 0)
// ─────────────────────────────────────────────
export function OpAmp({
  x, y, rotation = 0, label, color = 'var(--sim-text)', strokeWidth = 2
}: SymbolProps) {
  return (
    <g transform={tx(x, y, rotation)}>
      {/* Leads */}
      <line x1={-30} y1={-12} x2={-18} y2={-12} stroke={color} strokeWidth={strokeWidth} />
      <line x1={-30} y1={12} x2={-18} y2={12} stroke={color} strokeWidth={strokeWidth} />
      <line x1={18} y1={0} x2={30} y2={0} stroke={color} strokeWidth={strokeWidth} />
      {/* Triangle body */}
      <polygon points="-18,-24 -18,24 18,0" fill="none" stroke="var(--accent)" strokeWidth={strokeWidth + 0.5} strokeLinejoin="round" />
      {/* − sign at inverting input */}
      <text x={-14} y={-9} fontSize="12" fontWeight="bold" fill="var(--accent)" fontFamily="var(--font-sans)">−</text>
      {/* + sign at non-inverting input */}
      <text x={-14} y={16} fontSize="12" fontWeight="bold" fill="var(--accent)" fontFamily="var(--font-sans)">+</text>
      {label && (
        <text x={0} y={-28} textAnchor="middle" fill="var(--sim-text-strong)" fontSize="11" fontFamily="var(--font-sans)">{label}</text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// CURRENT ARROW (annotation)
// ─────────────────────────────────────────────
export function CurrentArrow({
  x, y, rotation = 0, label, color = 'var(--sim-accent-alt)', strokeWidth = 1.5
}: SymbolProps) {
  return (
    <g transform={tx(x, y, rotation)}>
      <line x1={-12} y1={0} x2={12} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <polygon points="12,0 7,-3 7,3" fill={color} />
      {label && (
        <text x={0} y={-6} textAnchor="middle" fill={color} fontSize="10" fontStyle="italic" fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// VOLTAGE POLARITY MARKS (+ and −)
// ─────────────────────────────────────────────
export function VoltageMark({
  x, y, rotation = 0, label = 'v', color = 'var(--sim-accent-alt)'
}: SymbolProps) {
  return (
    <g transform={tx(x, y, rotation)}>
      <text x={0} y={-10} textAnchor="middle" fill={color} fontSize="10" fontWeight="bold" fontFamily="var(--font-sans)">+</text>
      <text x={0} y={14} textAnchor="middle" fill={color} fontSize="10" fontWeight="bold" fontFamily="var(--font-sans)">−</text>
      {label && (
        <text x={10} y={3} textAnchor="start" fill={color} fontSize="10" fontStyle="italic" fontFamily="var(--font-sans)">{label}</text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// SWITCH
// ─────────────────────────────────────────────
export function Switch({
  x, y, rotation = 0, label, labelPosition = 'top', color = 'var(--sim-text)', strokeWidth = 2
}: SymbolProps & { closed?: boolean }) {
  const lo = labelOffset(labelPosition, rotation);
  return (
    <g transform={tx(x, y, rotation)}>
      <line x1={-30} y1={0} x2={-8} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <line x1={8} y1={0} x2={30} y2={0} stroke={color} strokeWidth={strokeWidth} />
      <circle cx={-8} cy={0} r={3} fill={color} />
      <circle cx={8} cy={0} r={3} fill={color} />
      {/* Open switch arm */}
      <line x1={-8} y1={0} x2={8} y2={-10} stroke="var(--accent)" strokeWidth={strokeWidth + 0.5} strokeLinecap="round" />
      {label && (
        <text x={lo.dx} y={lo.dy} textAnchor={lo.anchor} fill="var(--sim-text-strong)" fontSize="11" fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────
// CIRCUIT DIAGRAM CONTAINER
// ─────────────────────────────────────────────
export interface CircuitDiagramProps {
  width?: number;
  height?: number;
  viewBox?: string;
  title?: string;
  caption?: string;
  children?: React.ReactNode;
  className?: string;
}

export function CircuitDiagram({
  width = 500,
  height = 300,
  viewBox,
  title,
  caption,
  children,
  className,
}: CircuitDiagramProps) {
  const vb = viewBox || `0 0 ${width} ${height}`;
  return (
    <figure
      className={className}
      style={{
        margin: '1.5rem 0',
        padding: '1rem',
        background: 'var(--panel)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        textAlign: 'center',
      }}
    >
      {title && (
        <div style={{
          fontWeight: 600,
          fontSize: '0.95rem',
          color: 'var(--sim-text-strong)',
          marginBottom: '0.75rem',
          fontFamily: 'var(--font-sans)',
        }}>
          {title}
        </div>
      )}
      <svg
        viewBox={vb}
        width="100%"
        style={{
          maxWidth: `${width}px`,
          height: 'auto',
          display: 'block',
          margin: '0 auto',
        }}
      >
        {children}
      </svg>
      {caption && (
        <figcaption style={{
          marginTop: '0.75rem',
          fontSize: '0.85rem',
          color: 'var(--sim-text)',
          fontStyle: 'italic',
          fontFamily: 'var(--font-sans)',
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
