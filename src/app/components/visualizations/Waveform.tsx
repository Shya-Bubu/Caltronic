'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { getSignalStyles, D3_SHARED } from './d3-theme';

export interface WaveformProps {
    type: 'sine' | 'cosine' | 'square' | 'step' | 'impulse' | 'ramp' | 'triangle' | 'rect';
    amplitude?: number;
    frequency?: number;
    phase?: number;
    mode?: 'continuous' | 'discrete';
    samples?: number;
    duration?: number;
    width?: number;
    height?: number;
    showGrid?: boolean;
    showAxis?: boolean;
    title?: string;
    interactive?: boolean;
}

// Signal generation functions
const signalGenerators: Record<string, (t: number, A: number, f: number, phi: number) => number> = {
    sine: (t, A, f, phi) => A * Math.sin(2 * Math.PI * f * t + phi),
    cosine: (t, A, f, phi) => A * Math.cos(2 * Math.PI * f * t + phi),
    square: (t, A, f, phi) => A * Math.sign(Math.sin(2 * Math.PI * f * t + phi)),
    step: (t, A) => t >= 0 ? A : 0,
    impulse: (t, A) => Math.abs(t) < 0.01 ? A * 50 : 0,
    ramp: (t, A) => t >= 0 ? A * t : 0,
    triangle: (t, A, f) => A * (2 * Math.abs(2 * (t * f - Math.floor(t * f + 0.5))) - 1),
    rect: (t, A) => Math.abs(t) <= 0.5 ? A : 0,
};

export default function Waveform({
    type,
    amplitude = 1,
    frequency = 1,
    phase = 0,
    mode = 'continuous',
    samples = 200,
    duration = 2,
    width = 400,
    height = 200,
    showGrid = true,
    showAxis = true,
    title,
}: WaveformProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const theme = useD3Theme();
    const signalStyles = useMemo(() => getSignalStyles(theme), [theme]);

    const data = useMemo(() => {
        const generator = signalGenerators[type] || signalGenerators.sine;
        const points: { t: number; y: number }[] = [];

        const tMin = type === 'step' || type === 'impulse' || type === 'ramp' ? -duration / 4 : -duration / 2;
        const tMax = type === 'step' || type === 'impulse' || type === 'ramp' ? duration * 0.75 : duration / 2;

        for (let i = 0; i <= samples; i++) {
            const t = tMin + (i / samples) * (tMax - tMin);
            points.push({ t, y: generator(t, amplitude, frequency, phase) });
        }
        return { points, tMin, tMax };
    }, [type, amplitude, frequency, phase, samples, duration]);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const margin = { top: title ? 30 : 15, right: 20, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Scales
        const xScale = d3.scaleLinear()
            .domain([data.tMin, data.tMax])
            .range([0, innerWidth]);

        const yMax = Math.max(amplitude * 1.2, 1.2);
        const yScale = d3.scaleLinear()
            .domain([-yMax, yMax])
            .range([innerHeight, 0]);

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
            const xTicks = xScale.ticks(10);
            g.selectAll('.grid-v')
                .data(xTicks)
                .enter()
                .append('line')
                .attr('class', 'grid-v')
                .attr('x1', d => xScale(d))
                .attr('x2', d => xScale(d))
                .attr('y1', 0)
                .attr('y2', innerHeight)
                .attr('stroke', theme.grid)
                .attr('stroke-dasharray', D3_SHARED.gridDash);

            const yTicks = yScale.ticks(6);
            g.selectAll('.grid-h')
                .data(yTicks)
                .enter()
                .append('line')
                .attr('class', 'grid-h')
                .attr('x1', 0)
                .attr('x2', innerWidth)
                .attr('y1', d => yScale(d))
                .attr('y2', d => yScale(d))
                .attr('stroke', theme.grid)
                .attr('stroke-dasharray', D3_SHARED.gridDash);
        }

        // Axes
        if (showAxis) {
            g.append('line')
                .attr('x1', 0)
                .attr('x2', innerWidth)
                .attr('y1', yScale(0))
                .attr('y2', yScale(0))
                .attr('stroke', theme.axis)
                .attr('stroke-width', 1);

            const yAxisX = data.tMin <= 0 && data.tMax >= 0 ? xScale(0) : 0;
            g.append('line')
                .attr('x1', yAxisX)
                .attr('x2', yAxisX)
                .attr('y1', 0)
                .attr('y2', innerHeight)
                .attr('stroke', theme.axis)
                .attr('stroke-width', 1);

            g.append('text')
                .attr('x', innerWidth)
                .attr('y', yScale(0) - 5)
                .attr('fill', theme.textMuted)
                .attr('font-size', 11)
                .attr('font-family', D3_SHARED.fontFamily)
                .attr('text-anchor', 'end')
                .text('t');

            g.append('text')
                .attr('x', yAxisX + 5)
                .attr('y', 12)
                .attr('fill', theme.textMuted)
                .attr('font-size', 11)
                .attr('font-family', D3_SHARED.fontFamily)
                .text('x(t)');
        }

        // Signal
        const signalStyle = mode === 'discrete' ? signalStyles.discrete : signalStyles.continuous;

        if (mode === 'continuous') {
            const line = d3.line<{ t: number; y: number }>()
                .x(d => xScale(d.t))
                .y(d => yScale(d.y))
                .curve(type === 'step' ? d3.curveStepAfter : d3.curveMonotoneX);

            g.append('path')
                .datum(data.points)
                .attr('fill', 'none')
                .attr('stroke', signalStyle.color)
                .attr('stroke-width', D3_SHARED.strokeWidth.normal)
                .attr('d', line);
        } else {
            const discretePoints = data.points.filter((_, i) => i % Math.floor(samples / 20) === 0);

            discretePoints.forEach(d => {
                g.append('line')
                    .attr('x1', xScale(d.t))
                    .attr('x2', xScale(d.t))
                    .attr('y1', yScale(0))
                    .attr('y2', yScale(d.y))
                    .attr('stroke', signalStyle.color)
                    .attr('stroke-width', D3_SHARED.strokeWidth.normal);

                g.append('circle')
                    .attr('cx', xScale(d.t))
                    .attr('cy', yScale(d.y))
                    .attr('r', 4)
                    .attr('fill', signalStyle.color);
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

    }, [data, width, height, showGrid, showAxis, title, mode, amplitude, type, theme, signalStyles]);

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
