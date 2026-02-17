'use client';

/**
 * ENGINEERING PLOT LIBRARY - Professional SVG Plots
 * 
 * High-quality, theme-aware plots for V-I curves, signal waveforms,
 * Bode plots, and mathematical functions.
 * 
 * Uses pure React+SVG (no D3 dependency for basic plots).
 * Supports interactive hover, multiple curves, gridlines, annotations.
 */

import React, { useMemo, useCallback, useState, useRef } from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface PlotPoint {
  x: number;
  y: number;
}

export interface PlotCurve {
  id: string;
  label: string;
  points: PlotPoint[];
  color?: string;
  strokeWidth?: number;
  dashed?: boolean;
  /** For annotation: a single point on the curve */
  annotation?: { x: number; y: number; label: string };
}

export interface AxisConfig {
  label: string;
  min: number;
  max: number;
  unit?: string;
  tickCount?: number;
}

export interface PlotAnnotation {
  x: number;
  y: number;
  label: string;
  color?: string;
  type?: 'point' | 'vertical-line' | 'horizontal-line' | 'region';
}

export interface EngineeringPlotProps {
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
  xAxis: AxisConfig;
  yAxis: AxisConfig;
  curves: PlotCurve[];
  annotations?: PlotAnnotation[];
  showGrid?: boolean;
  showLegend?: boolean;
  showOrigin?: boolean;
  /** Whether axes cross at origin (0,0) or at bottom-left */
  centeredAxes?: boolean;
  className?: string;
}

// ─────────────────────────────────────────────
// Color palette for curves
// ─────────────────────────────────────────────
const CURVE_COLORS = [
  'var(--accent)',
  '#22d3ee', // cyan
  '#f59e0b', // amber
  '#ef4444', // red
  '#10b981', // emerald
  '#a855f7', // purple
  '#f97316', // orange
];

// ─────────────────────────────────────────────
// Helper: Generate tick values
// ─────────────────────────────────────────────
function generateTicks(min: number, max: number, count: number = 5): number[] {
  const ticks: number[] = [];
  const step = (max - min) / count;
  for (let i = 0; i <= count; i++) {
    const val = min + step * i;
    ticks.push(Math.abs(val) < 1e-10 ? 0 : val);
  }
  return ticks;
}

function formatTick(val: number): string {
  if (Math.abs(val) < 1e-10) return '0';
  if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(1)}k`;
  if (Math.abs(val) < 0.01) return val.toExponential(1);
  if (Number.isInteger(val)) return val.toString();
  return val.toFixed(2);
}

// ─────────────────────────────────────────────
// MAIN PLOT COMPONENT
// ─────────────────────────────────────────────
export function EngineeringPlot({
  title,
  caption,
  width = 500,
  height = 350,
  xAxis,
  yAxis,
  curves,
  annotations = [],
  showGrid = true,
  showLegend = true,
  showOrigin = true,
  centeredAxes = false,
  className,
}: EngineeringPlotProps) {
  // Plot area margins
  const margin = { top: 20, right: 30, bottom: 45, left: 55 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;

  // Scale functions
  const scaleX = useCallback((val: number) => {
    return margin.left + ((val - xAxis.min) / (xAxis.max - xAxis.min)) * plotW;
  }, [xAxis.min, xAxis.max, plotW, margin.left]);

  const scaleY = useCallback((val: number) => {
    return margin.top + plotH - ((val - yAxis.min) / (yAxis.max - yAxis.min)) * plotH;
  }, [yAxis.min, yAxis.max, plotH, margin.top]);

  // Ticks
  const xTicks = useMemo(() => generateTicks(xAxis.min, xAxis.max, xAxis.tickCount || 5), [xAxis]);
  const yTicks = useMemo(() => generateTicks(yAxis.min, yAxis.max, yAxis.tickCount || 5), [yAxis]);

  // Build SVG paths for each curve
  const curvePaths = useMemo(() => {
    return curves.map((curve, ci) => {
      if (curve.points.length === 0) return { ...curve, path: '', color: curve.color || CURVE_COLORS[ci % CURVE_COLORS.length] };
      const pts = curve.points
        .filter(p => p.x >= xAxis.min && p.x <= xAxis.max && p.y >= yAxis.min && p.y <= yAxis.max)
        .map(p => `${scaleX(p.x)},${scaleY(p.y)}`);
      if (pts.length === 0) return { ...curve, path: '', color: curve.color || CURVE_COLORS[ci % CURVE_COLORS.length] };
      return {
        ...curve,
        path: `M ${pts.join(' L ')}`,
        color: curve.color || CURVE_COLORS[ci % CURVE_COLORS.length],
      };
    });
  }, [curves, xAxis, yAxis, scaleX, scaleY]);

  // Hover state
  const [hoverInfo, setHoverInfo] = useState<{ x: number; y: number; dataX: number; dataY: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const svgY = ((e.clientY - rect.top) / rect.height) * height;
    const dataX = xAxis.min + ((svgX - margin.left) / plotW) * (xAxis.max - xAxis.min);
    const dataY = yAxis.max - ((svgY - margin.top) / plotH) * (yAxis.max - yAxis.min);
    if (dataX >= xAxis.min && dataX <= xAxis.max && dataY >= yAxis.min && dataY <= yAxis.max) {
      setHoverInfo({ x: svgX, y: svgY, dataX, dataY });
    } else {
      setHoverInfo(null);
    }
  }, [width, height, xAxis, yAxis, margin, plotW, plotH]);

  // Origin lines for centered axes
  const originX = scaleX(0);
  const originY = scaleY(0);
  const hasOriginX = xAxis.min <= 0 && xAxis.max >= 0;
  const hasOriginY = yAxis.min <= 0 && yAxis.max >= 0;

  return (
    <figure className={className} style={{ margin: '1.5rem 0', textAlign: 'center' }}>
      {title && (
        <div style={{
          fontWeight: 600,
          fontSize: '0.95rem',
          color: 'var(--sim-text-strong)',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-sans)',
        }}>
          {title}
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{
          maxWidth: `${width}px`,
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverInfo(null)}
      >
        {/* Grid */}
        {showGrid && (
          <g opacity={0.15}>
            {xTicks.map((tick, i) => (
              <line key={`xg-${i}`} x1={scaleX(tick)} y1={margin.top} x2={scaleX(tick)} y2={margin.top + plotH} stroke="var(--sim-text)" strokeDasharray="3 3" />
            ))}
            {yTicks.map((tick, i) => (
              <line key={`yg-${i}`} x1={margin.left} y1={scaleY(tick)} x2={margin.left + plotW} y2={scaleY(tick)} stroke="var(--sim-text)" strokeDasharray="3 3" />
            ))}
          </g>
        )}

        {/* Axes */}
        {centeredAxes && hasOriginX ? (
          <>
            {/* Centered X axis */}
            <line x1={margin.left} y1={originY} x2={margin.left + plotW} y2={originY} stroke="var(--sim-text)" strokeWidth={1.5} />
            {/* Arrowhead */}
            <polygon points={`${margin.left + plotW + 4},${originY} ${margin.left + plotW - 2},${originY - 3} ${margin.left + plotW - 2},${originY + 3}`} fill="var(--sim-text)" />
          </>
        ) : (
          <line x1={margin.left} y1={margin.top + plotH} x2={margin.left + plotW} y2={margin.top + plotH} stroke="var(--sim-text)" strokeWidth={1.5} />
        )}

        {centeredAxes && hasOriginY ? (
          <>
            {/* Centered Y axis */}
            <line x1={originX} y1={margin.top} x2={originX} y2={margin.top + plotH} stroke="var(--sim-text)" strokeWidth={1.5} />
            {/* Arrowhead */}
            <polygon points={`${originX},${margin.top - 4} ${originX - 3},${margin.top + 2} ${originX + 3},${margin.top + 2}`} fill="var(--sim-text)" />
          </>
        ) : (
          <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + plotH} stroke="var(--sim-text)" strokeWidth={1.5} />
        )}

        {/* Tick labels */}
        {xTicks.map((tick, i) => (
          <text key={`xt-${i}`} x={scaleX(tick)} y={margin.top + plotH + 18} textAnchor="middle" fill="var(--sim-text)" fontSize="10" fontFamily="var(--font-mono)">
            {formatTick(tick)}
          </text>
        ))}
        {yTicks.map((tick, i) => (
          <text key={`yt-${i}`} x={margin.left - 8} y={scaleY(tick) + 3} textAnchor="end" fill="var(--sim-text)" fontSize="10" fontFamily="var(--font-mono)">
            {formatTick(tick)}
          </text>
        ))}

        {/* Axis labels */}
        <text x={margin.left + plotW / 2} y={height - 5} textAnchor="middle" fill="var(--sim-text-strong)" fontSize="12" fontFamily="var(--font-sans)">
          {xAxis.label}{xAxis.unit ? ` (${xAxis.unit})` : ''}
        </text>
        <text x={14} y={margin.top + plotH / 2} textAnchor="middle" fill="var(--sim-text-strong)" fontSize="12" fontFamily="var(--font-sans)" transform={`rotate(-90, 14, ${margin.top + plotH / 2})`}>
          {yAxis.label}{yAxis.unit ? ` (${yAxis.unit})` : ''}
        </text>

        {/* Origin marker */}
        {showOrigin && centeredAxes && hasOriginX && hasOriginY && (
          <text x={originX + 6} y={originY + 14} fill="var(--sim-text)" fontSize="10" fontFamily="var(--font-mono)">0</text>
        )}

        {/* Curves */}
        {curvePaths.map((curve, ci) => (
          <path
            key={curve.id || ci}
            d={curve.path}
            fill="none"
            stroke={curve.color}
            strokeWidth={curve.strokeWidth || 2.5}
            strokeDasharray={curve.dashed ? '6 3' : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Annotations */}
        {annotations.map((ann, i) => {
          const ax = scaleX(ann.x);
          const ay = scaleY(ann.y);
          const annColor = ann.color || 'var(--sim-warning)';

          if (ann.type === 'vertical-line') {
            return (
              <g key={`ann-${i}`}>
                <line x1={ax} y1={margin.top} x2={ax} y2={margin.top + plotH} stroke={annColor} strokeWidth={1.5} strokeDasharray="4 3" />
                <text x={ax} y={margin.top - 4} textAnchor="middle" fill={annColor} fontSize="10" fontFamily="var(--font-sans)">{ann.label}</text>
              </g>
            );
          }

          if (ann.type === 'horizontal-line') {
            return (
              <g key={`ann-${i}`}>
                <line x1={margin.left} y1={ay} x2={margin.left + plotW} y2={ay} stroke={annColor} strokeWidth={1.5} strokeDasharray="4 3" />
                <text x={margin.left + plotW + 4} y={ay + 3} textAnchor="start" fill={annColor} fontSize="10" fontFamily="var(--font-sans)">{ann.label}</text>
              </g>
            );
          }

          // Default: point annotation
          return (
            <g key={`ann-${i}`}>
              <circle cx={ax} cy={ay} r={5} fill={annColor} />
              <text x={ax + 8} y={ay - 6} fill={annColor} fontSize="10" fontWeight="600" fontFamily="var(--font-sans)">{ann.label}</text>
            </g>
          );
        })}

        {/* Curve annotation points */}
        {curvePaths.map((curve, ci) => {
          if (!curve.annotation) return null;
          const ax = scaleX(curve.annotation.x);
          const ay = scaleY(curve.annotation.y);
          return (
            <g key={`ca-${ci}`}>
              <circle cx={ax} cy={ay} r={4} fill={curve.color} stroke="var(--bg)" strokeWidth={2} />
              <text x={ax + 8} y={ay - 5} fill={curve.color} fontSize="10" fontWeight="600" fontFamily="var(--font-sans)">{curve.annotation.label}</text>
            </g>
          );
        })}

        {/* Hover crosshair */}
        {hoverInfo && (
          <g>
            <line x1={hoverInfo.x} y1={margin.top} x2={hoverInfo.x} y2={margin.top + plotH} stroke="var(--sim-text)" strokeWidth={0.5} opacity={0.4} />
            <line x1={margin.left} y1={hoverInfo.y} x2={margin.left + plotW} y2={hoverInfo.y} stroke="var(--sim-text)" strokeWidth={0.5} opacity={0.4} />
            <rect x={hoverInfo.x + 8} y={hoverInfo.y - 22} width={95} height={20} rx={4} fill="var(--bg)" stroke="var(--border)" strokeWidth={1} opacity={0.9} />
            <text x={hoverInfo.x + 12} y={hoverInfo.y - 8} fill="var(--sim-text-strong)" fontSize="10" fontFamily="var(--font-mono)">
              ({formatTick(hoverInfo.dataX)}, {formatTick(hoverInfo.dataY)})
            </text>
          </g>
        )}

        {/* Legend */}
        {showLegend && curves.length > 1 && (
          <g>
            {curvePaths.map((curve, ci) => (
              <g key={`legend-${ci}`} transform={`translate(${margin.left + 10}, ${margin.top + 10 + ci * 18})`}>
                <line x1={0} y1={0} x2={20} y2={0} stroke={curve.color} strokeWidth={2.5} strokeDasharray={curve.dashed ? '4 2' : undefined} />
                <text x={25} y={4} fill="var(--sim-text-strong)" fontSize="10" fontFamily="var(--font-sans)">{curve.label}</text>
              </g>
            ))}
          </g>
        )}
      </svg>

      {caption && (
        <figcaption style={{
          marginTop: '0.5rem',
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

// ─────────────────────────────────────────────
// HELPER: Generate V-I curve data
// ─────────────────────────────────────────────
export function generateLinearVI(resistance: number, vRange: [number, number] = [-5, 5], points: number = 100): PlotPoint[] {
  const data: PlotPoint[] = [];
  for (let i = 0; i <= points; i++) {
    const v = vRange[0] + (i / points) * (vRange[1] - vRange[0]);
    data.push({ x: v, y: v / resistance });
  }
  return data;
}

export function generateDiodeVI(Is: number = 1e-12, Vt: number = 0.026, vRange: [number, number] = [-1, 0.8], points: number = 200): PlotPoint[] {
  const data: PlotPoint[] = [];
  for (let i = 0; i <= points; i++) {
    const v = vRange[0] + (i / points) * (vRange[1] - vRange[0]);
    const current = Is * (Math.exp(v / Vt) - 1);
    // Clamp to reasonable range
    const clampedI = Math.max(Math.min(current, 0.1), -Is * 2);
    data.push({ x: v, y: clampedI });
  }
  return data;
}

export function generateIdealDiodeVI(): PlotPoint[] {
  // Ideal diode: v ≤ 0 → i = 0; v = 0, i ≥ 0 → vertical line
  return [
    { x: -5, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 5 },
  ];
}

export function generateTunnelDiodeVI(points: number = 200): PlotPoint[] {
  const data: PlotPoint[] = [];
  for (let i = 0; i <= points; i++) {
    const v = (i / points) * 0.8;
    let current: number;
    if (v < 0.15) {
      current = v * 20; // rising
    } else if (v < 0.35) {
      current = 3 - (v - 0.15) * 12; // falling (NDR region)
    } else {
      current = 0.6 + (v - 0.35) * 6; // rising again
    }
    data.push({ x: v, y: current });
  }
  return data;
}

export function generateOpenCircuitVI(): PlotPoint[] {
  return [{ x: -5, y: 0 }, { x: 5, y: 0 }];
}

export function generateShortCircuitVI(): PlotPoint[] {
  return [{ x: 0, y: -5 }, { x: 0, y: 5 }];
}

// ─────────────────────────────────────────────
// HELPER: Generate signal waveforms
// ─────────────────────────────────────────────
export function generateSineWave(freq: number = 1, amp: number = 1, phase: number = 0, tRange: [number, number] = [0, 2], points: number = 300): PlotPoint[] {
  const data: PlotPoint[] = [];
  for (let i = 0; i <= points; i++) {
    const t = tRange[0] + (i / points) * (tRange[1] - tRange[0]);
    data.push({ x: t, y: amp * Math.sin(2 * Math.PI * freq * t + phase) });
  }
  return data;
}

export function generateStepFunction(tRange: [number, number] = [-1, 3], stepAt: number = 0, amp: number = 1, points: number = 300): PlotPoint[] {
  const data: PlotPoint[] = [];
  for (let i = 0; i <= points; i++) {
    const t = tRange[0] + (i / points) * (tRange[1] - tRange[0]);
    data.push({ x: t, y: t >= stepAt ? amp : 0 });
  }
  return data;
}

export function generateExponentialDecay(tau: number = 1, amp: number = 1, tRange: [number, number] = [0, 5], points: number = 300): PlotPoint[] {
  const data: PlotPoint[] = [];
  for (let i = 0; i <= points; i++) {
    const t = tRange[0] + (i / points) * (tRange[1] - tRange[0]);
    data.push({ x: t, y: amp * Math.exp(-t / tau) });
  }
  return data;
}
