'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { getCurveStyles, D3_SHARED, type CurveType } from './d3-theme';

export interface VICurvePlotProps {
    curveType: CurveType | 'pn-junction' | 'glow' | 'bilateral';
    resistance?: number;
    width?: number;
    height?: number;
    showGrid?: boolean;
    showAxis?: boolean;
    title?: string;
    showLoadLine?: boolean;
    loadLineParams?: { Vb: number; Rb: number };
}

// V-I curve generators
const curveGenerators: Record<string, (R?: number) => { v: number; i: number }[]> = {
    linear: (R = 1) => {
        const points: { v: number; i: number }[] = [];
        for (let v = -2; v <= 2; v += 0.1) {
            points.push({ v, i: v / R });
        }
        return points;
    },
    open: () => {
        const points: { v: number; i: number }[] = [];
        for (let v = -2; v <= 2; v += 0.1) {
            points.push({ v, i: 0 });
        }
        return points;
    },
    short: () => {
        const points: { v: number; i: number }[] = [];
        for (let i = -2; i <= 2; i += 0.1) {
            points.push({ v: 0, i });
        }
        return points;
    },
    diode: () => {
        const points: { v: number; i: number }[] = [];
        for (let v = -2; v <= 0; v += 0.1) {
            points.push({ v, i: 0 });
        }
        for (let i = 0; i <= 2; i += 0.1) {
            points.push({ v: 0, i });
        }
        return points;
    },
    'pn-junction': () => {
        const Is = 1e-9;
        const Vt = 0.026;
        const points: { v: number; i: number }[] = [];
        for (let v = -2; v <= 0.7; v += 0.02) {
            const i = Is * (Math.exp(v / Vt) - 1);
            points.push({ v, i: Math.max(-0.1, Math.min(i, 2)) });
        }
        return points;
    },
    tunnel: () => {
        const points: { v: number; i: number }[] = [];
        for (let v = 0; v <= 1; v += 0.02) {
            const i = 6 * v - 11 * v * v + 6 * v * v * v;
            points.push({ v, i });
        }
        return points;
    },
    zener: () => {
        const points: { v: number; i: number }[] = [];
        const Vz = -0.7;
        for (let i = -2; i <= 0; i += 0.1) {
            points.push({ v: Vz + i * 0.05, i });
        }
        for (let v = Vz; v <= 0; v += 0.05) {
            points.push({ v, i: 0 });
        }
        for (let v = 0; v <= 0.7; v += 0.02) {
            const i = 1e-9 * (Math.exp(v / 0.026) - 1);
            points.push({ v, i: Math.min(i, 2) });
        }
        return points;
    },
    glow: () => {
        const points: { v: number; i: number }[] = [];
        for (let i = 0; i <= 2; i += 0.05) {
            const v = 0.5 + 1.5 * Math.sin((i - 1) * Math.PI / 2);
            points.push({ v, i });
        }
        return points;
    },
    bilateral: () => {
        const R = 1;
        const points: { v: number; i: number }[] = [];
        for (let v = -2; v <= 2; v += 0.1) {
            points.push({ v, i: v / R });
        }
        return points;
    },
};

export default function VICurvePlot({
    curveType,
    resistance = 1,
    width = 300,
    height = 300,
    showGrid = true,
    showAxis = true,
    title,
    showLoadLine = false,
    loadLineParams,
}: VICurvePlotProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const theme = useD3Theme();
    const curveStyles = useMemo(() => getCurveStyles(theme), [theme]);

    const data = useMemo(() => {
        const generator = curveGenerators[curveType] || curveGenerators.linear;
        return generator(resistance);
    }, [curveType, resistance]);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const margin = { top: title ? 35 : 20, right: 20, bottom: 35, left: 45 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleLinear().domain([-2.2, 2.2]).range([0, innerWidth]);
        const yScale = d3.scaleLinear().domain([-2.2, 2.2]).range([innerHeight, 0]);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Background
        g.append('rect')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        // Grid
        if (showGrid) {
            const gridValues = [-2, -1, 0, 1, 2];
            gridValues.forEach(val => {
                g.append('line')
                    .attr('x1', xScale(val)).attr('x2', xScale(val))
                    .attr('y1', 0).attr('y2', innerHeight)
                    .attr('stroke', val === 0 ? theme.axis : theme.grid)
                    .attr('stroke-width', val === 0 ? 1.5 : 1)
                    .attr('stroke-dasharray', val === 0 ? '' : D3_SHARED.gridDash);
                g.append('line')
                    .attr('x1', 0).attr('x2', innerWidth)
                    .attr('y1', yScale(val)).attr('y2', yScale(val))
                    .attr('stroke', val === 0 ? theme.axis : theme.grid)
                    .attr('stroke-width', val === 0 ? 1.5 : 1)
                    .attr('stroke-dasharray', val === 0 ? '' : D3_SHARED.gridDash);
            });
        }

        // Axis labels
        if (showAxis) {
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
        }

        // Curve
        const style = curveStyles[curveType as keyof typeof curveStyles] || { color: theme.signalPrimary, dash: '' };

        if (curveType === 'short') {
            g.append('line')
                .attr('x1', xScale(0)).attr('x2', xScale(0))
                .attr('y1', yScale(-2)).attr('y2', yScale(2))
                .attr('stroke', style.color)
                .attr('stroke-width', D3_SHARED.strokeWidth.thick)
                .attr('stroke-dasharray', style.dash);
        } else {
            const line = d3.line<{ v: number; i: number }>()
                .x(d => xScale(d.v))
                .y(d => yScale(d.i))
                .curve(curveType === 'diode' ? d3.curveLinear : d3.curveMonotoneX);

            g.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', style.color)
                .attr('stroke-width', D3_SHARED.strokeWidth.thick)
                .attr('stroke-dasharray', style.dash)
                .attr('d', line);
        }

        // Load line
        if (showLoadLine && loadLineParams) {
            const { Vb, Rb } = loadLineParams;
            const loadLineData = [{ v: 0, i: Vb / Rb }, { v: Vb, i: 0 }];
            const loadLine = d3.line<{ v: number; i: number }>()
                .x(d => xScale(d.v))
                .y(d => yScale(d.i));

            g.append('path')
                .datum(loadLineData)
                .attr('fill', 'none')
                .attr('stroke', curveStyles.loadLine.color)
                .attr('stroke-width', D3_SHARED.strokeWidth.normal)
                .attr('stroke-dasharray', curveStyles.loadLine.dash)
                .attr('d', loadLine);
        }

        // Title
        if (title) {
            svg.append('text')
                .attr('x', width / 2)
                .attr('y', 20)
                .attr('fill', theme.text)
                .attr('font-size', 13)
                .attr('font-family', D3_SHARED.fontFamily)
                .attr('font-weight', 500)
                .attr('text-anchor', 'middle')
                .text(title);
        }

    }, [data, curveType, width, height, showGrid, showAxis, title, showLoadLine, loadLineParams, theme, curveStyles]);

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
