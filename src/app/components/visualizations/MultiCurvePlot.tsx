'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { D3_SHARED } from './d3-theme';

// Curve definition matching visuals.json structure
export interface CurveData {
    type: string;
    label?: string;
    color?: string;
    dashed?: boolean;
    // Linear resistor params
    resistance?: number;
    // Voltage/current source params
    voltage?: number;
    current?: number;
    internalResistance?: number;
    // View range overrides
    vRange?: [number, number];
    iRange?: [number, number];
}

export interface MultiCurvePlotProps {
    curves: CurveData[];
    title?: string;
    description?: string;
    width?: number;
    height?: number;
    showGrid?: boolean;
    showLegend?: boolean;
    // Axis ranges (auto-calculated if not provided)
    vRange?: [number, number];
    iRange?: [number, number];
}

// Default axis range
const DEFAULT_RANGE: [number, number] = [-2.5, 2.5];

// Curve point generator functions - each returns array of {v, i} points
const curveGenerators: Record<string, (params: CurveData) => { v: number; i: number }[]> = {

    // LINEAR RESISTOR: i = v/R (straight line through origin)
    'linear-resistor': (params) => {
        const R = params.resistance || 100;
        // Normalize resistance to reasonable slope (R in Ω, but we display in normalized units)
        // For display: use conductance G = 1/R, scaled appropriately
        const G = 1 / Math.max(R, 0.001);
        const slope = Math.min(Math.max(G * 100, 0.1), 10); // Clamp slope for visibility

        const points: { v: number; i: number }[] = [];
        for (let v = -2.5; v <= 2.5; v += 0.1) {
            points.push({ v, i: v * slope });
        }
        return points;
    },

    // OPEN CIRCUIT: i = 0 for all v (horizontal line on v-axis)
    'open-circuit': () => {
        const points: { v: number; i: number }[] = [];
        for (let v = -2.5; v <= 2.5; v += 0.1) {
            points.push({ v, i: 0 });
        }
        return points;
    },

    // SHORT CIRCUIT: v = 0 for all i (vertical line on i-axis)
    'short-circuit': () => {
        const points: { v: number; i: number }[] = [];
        for (let i = -2.5; i <= 2.5; i += 0.1) {
            points.push({ v: 0, i });
        }
        return points;
    },

    // IDEAL DIODE: i = 0 for v < 0, v = 0 for i > 0 (L-shaped)
    'ideal-diode': () => {
        const points: { v: number; i: number }[] = [];
        // Horizontal segment: i = 0 for v < 0
        for (let v = -2.5; v <= 0; v += 0.1) {
            points.push({ v, i: 0 });
        }
        // Vertical segment: v = 0 for i > 0
        for (let i = 0; i <= 2.5; i += 0.1) {
            points.push({ v: 0, i });
        }
        return points;
    },

    // VOLTAGE SOURCE: v = V₀ (vertical line at V₀)
    'voltage-source': (params) => {
        const V0 = params.voltage || 1;
        const points: { v: number; i: number }[] = [];
        for (let i = -2.5; i <= 2.5; i += 0.1) {
            points.push({ v: V0, i });
        }
        return points;
    },

    // CURRENT SOURCE: i = I₀ (horizontal line at I₀)
    'current-source': (params) => {
        const I0 = params.current || 1;
        const points: { v: number; i: number }[] = [];
        for (let v = -2.5; v <= 2.5; v += 0.1) {
            points.push({ v, i: I0 });
        }
        return points;
    },

    // REAL VOLTAGE SOURCE: v = V₀ - I·Rint (sloped line)
    'real-voltage-source': (params) => {
        const V0 = params.voltage || 10;
        const Rint = params.internalResistance || 50;
        const points: { v: number; i: number }[] = [];
        // Line from (V0, 0) to (0, V0/Rint)
        const Imax = V0 / Rint;
        for (let i = -0.5; i <= Imax + 0.5; i += 0.05) {
            const v = V0 - i * Rint;
            if (v >= -2.5 && v <= 2.5) {
                points.push({ v, i });
            }
        }
        return points;
    },

    // PN-JUNCTION DIODE: exponential i = Is(e^(v/Vt) - 1)
    'pn-junction': () => {
        const Is = 1e-12;
        const Vt = 0.026; // Thermal voltage at room temp
        const points: { v: number; i: number }[] = [];
        for (let v = -2; v <= 0.7; v += 0.02) {
            let i = Is * (Math.exp(v / Vt) - 1);
            // Clamp for display
            i = Math.max(-0.5, Math.min(i, 2.5));
            points.push({ v, i });
        }
        return points;
    },

    // TUNNEL DIODE: N-shaped curve with negative resistance region
    'tunnel': () => {
        const points: { v: number; i: number }[] = [];
        for (let v = 0; v <= 1.2; v += 0.02) {
            // Cubic approximation: peak at v≈0.3, valley at v≈0.7
            const i = 6 * v - 11 * v * v + 6 * v * v * v;
            points.push({ v, i });
        }
        return points;
    },

    // ZENER DIODE: forward + reverse breakdown
    'zener': (params) => {
        const Vz = params.voltage || 5.1; // Zener voltage
        const points: { v: number; i: number }[] = [];

        // Reverse breakdown region
        for (let i = -2; i <= 0; i += 0.1) {
            points.push({ v: -Vz + i * 0.05, i });
        }
        // Forward region (like normal diode)
        for (let v = -Vz; v <= 0; v += 0.05) {
            points.push({ v, i: 0 });
        }
        for (let v = 0; v <= 0.7; v += 0.02) {
            const i = 1e-9 * (Math.exp(v / 0.026) - 1);
            points.push({ v, i: Math.min(i, 2) });
        }
        return points;
    },

    // GLOW DISCHARGE: S-shaped negative resistance
    'glow': () => {
        const points: { v: number; i: number }[] = [];
        for (let i = 0; i <= 2; i += 0.05) {
            const v = 0.5 + 1.5 * Math.sin((i - 1) * Math.PI / 2);
            points.push({ v, i });
        }
        return points;
    },

    // BILATERAL (symmetric): same as linear
    'bilateral': (params) => {
        return curveGenerators['linear-resistor'](params);
    },

    // DEFAULT LINEAR: simple y = x line
    'linear': (params) => {
        const R = params.resistance || 1;
        const points: { v: number; i: number }[] = [];
        for (let v = -2.5; v <= 2.5; v += 0.1) {
            points.push({ v, i: v / R });
        }
        return points;
    },
};

// Default colors for curves without specified color
const DEFAULT_COLORS = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Amber
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
    '#ec4899', // Pink
    '#84cc16', // Lime
];

export default function MultiCurvePlot({
    curves,
    title,
    description,
    width = 320,
    height = 320,
    showGrid = true,
    showLegend = true,
    vRange = DEFAULT_RANGE,
    iRange = DEFAULT_RANGE,
}: MultiCurvePlotProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const theme = useD3Theme();

    // Generate all curve data
    const curveDatasets = useMemo(() => {
        return curves.map((curve, idx) => {
            const generator = curveGenerators[curve.type] || curveGenerators['linear'];
            const points = generator(curve);
            return {
                ...curve,
                points,
                color: curve.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
            };
        });
    }, [curves]);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const margin = {
            top: title ? 35 : 20,
            right: 20,
            bottom: 35,
            left: 45
        };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Scales
        const xScale = d3.scaleLinear()
            .domain(vRange)
            .range([0, innerWidth]);
        const yScale = d3.scaleLinear()
            .domain(iRange)
            .range([innerHeight, 0]);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Background
        g.append('rect')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        // Grid lines
        if (showGrid) {
            const gridValues = [-2, -1, 0, 1, 2];
            gridValues.forEach(val => {
                // Vertical grid lines
                g.append('line')
                    .attr('x1', xScale(val)).attr('x2', xScale(val))
                    .attr('y1', 0).attr('y2', innerHeight)
                    .attr('stroke', val === 0 ? theme.axis : theme.grid)
                    .attr('stroke-width', val === 0 ? 1.5 : 1)
                    .attr('stroke-dasharray', val === 0 ? '' : D3_SHARED.gridDash);
                // Horizontal grid lines
                g.append('line')
                    .attr('x1', 0).attr('x2', innerWidth)
                    .attr('y1', yScale(val)).attr('y2', yScale(val))
                    .attr('stroke', val === 0 ? theme.axis : theme.grid)
                    .attr('stroke-width', val === 0 ? 1.5 : 1)
                    .attr('stroke-dasharray', val === 0 ? '' : D3_SHARED.gridDash);
            });
        }

        // Axis labels
        g.append('text')
            .attr('x', innerWidth - 5)
            .attr('y', yScale(0) - 8)
            .attr('fill', theme.text)
            .attr('font-size', 12)
            .attr('font-family', D3_SHARED.fontMono)
            .attr('text-anchor', 'end')
            .text('v');

        g.append('text')
            .attr('x', xScale(0) + 8)
            .attr('y', 15)
            .attr('fill', theme.text)
            .attr('font-size', 12)
            .attr('font-family', D3_SHARED.fontMono)
            .text('i');

        // Draw each curve
        curveDatasets.forEach((curveData) => {
            const { points, color, dashed, type } = curveData;

            // Special case for vertical lines (short-circuit, voltage-source)
            if (type === 'short-circuit' || type === 'voltage-source') {
                const xVal = points[0]?.v ?? 0;
                g.append('line')
                    .attr('x1', xScale(xVal)).attr('x2', xScale(xVal))
                    .attr('y1', yScale(iRange[0])).attr('y2', yScale(iRange[1]))
                    .attr('stroke', color)
                    .attr('stroke-width', 2.5)
                    .attr('stroke-dasharray', dashed ? '6,4' : '');
            } else {
                // General path for other curves
                const line = d3.line<{ v: number; i: number }>()
                    .x(d => xScale(d.v))
                    .y(d => yScale(d.i))
                    .curve(type === 'ideal-diode' ? d3.curveLinear : d3.curveMonotoneX);

                g.append('path')
                    .datum(points)
                    .attr('fill', 'none')
                    .attr('stroke', color)
                    .attr('stroke-width', 2.5)
                    .attr('stroke-dasharray', dashed ? '6,4' : '')
                    .attr('d', line);
            }
        });

        // Legend
        if (showLegend && curveDatasets.some(c => c.label)) {
            const legendG = g.append('g')
                .attr('transform', `translate(${innerWidth - 10}, 10)`);

            let yOffset = 0;
            curveDatasets.forEach((curveData) => {
                if (!curveData.label) return;

                const itemG = legendG.append('g')
                    .attr('transform', `translate(0, ${yOffset})`);

                itemG.append('line')
                    .attr('x1', -30).attr('x2', -10)
                    .attr('y1', 0).attr('y2', 0)
                    .attr('stroke', curveData.color)
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', curveData.dashed ? '4,2' : '');

                itemG.append('text')
                    .attr('x', -35)
                    .attr('y', 4)
                    .attr('fill', theme.textMuted)
                    .attr('font-size', 10)
                    .attr('font-family', D3_SHARED.fontFamily)
                    .attr('text-anchor', 'end')
                    .text(curveData.label);

                yOffset += 16;
            });
        }

        // Title
        if (title) {
            svg.append('text')
                .attr('x', width / 2)
                .attr('y', 18)
                .attr('fill', theme.text)
                .attr('font-size', 13)
                .attr('font-family', D3_SHARED.fontFamily)
                .attr('font-weight', 500)
                .attr('text-anchor', 'middle')
                .text(title);
        }

    }, [curveDatasets, width, height, showGrid, showLegend, title, vRange, iRange, theme]);

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            style={{
                background: theme.background,
                borderRadius: 8,
                display: 'block',
            }}
        />
    );
}
