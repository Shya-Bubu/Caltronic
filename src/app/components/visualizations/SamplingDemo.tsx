'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { D3_SHARED } from './d3-theme';

export interface SamplingDemoProps {
    signalFrequency?: number;
    initialSamplingRate?: number;
    width?: number;
    height?: number;
    title?: string;
    showControls?: boolean;
}

export default function SamplingDemo({
    signalFrequency = 2,
    initialSamplingRate = 8,
    width = 500,
    height = 300,
    title = 'Sampling & Aliasing Demo',
    showControls = true,
}: SamplingDemoProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [samplingRate, setSamplingRate] = useState(initialSamplingRate);
    const theme = useD3Theme();

    const nyquistRate = signalFrequency * 2;
    const isAliased = samplingRate < nyquistRate;

    const data = useMemo(() => {
        const duration = 2;
        const continuousPoints: { t: number; y: number }[] = [];
        const discretePoints: { t: number; y: number }[] = [];
        const aliasedPoints: { t: number; y: number }[] = [];

        for (let t = 0; t <= duration; t += 0.005) {
            continuousPoints.push({ t, y: Math.sin(2 * Math.PI * signalFrequency * t) });
        }

        const Ts = 1 / samplingRate;
        for (let t = 0; t <= duration; t += Ts) {
            discretePoints.push({ t, y: Math.sin(2 * Math.PI * signalFrequency * t) });
        }

        if (isAliased) {
            const aliasFreq = Math.abs(signalFrequency - samplingRate * Math.round(signalFrequency / samplingRate));
            for (let t = 0; t <= duration; t += 0.01) {
                aliasedPoints.push({ t, y: Math.sin(2 * Math.PI * aliasFreq * t) });
            }
        }

        return { continuousPoints, discretePoints, aliasedPoints };
    }, [signalFrequency, samplingRate, isAliased]);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const controlHeight = showControls ? 50 : 0;
        const margin = { top: title ? 35 : 15, right: 20, bottom: 35, left: 45 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom - controlHeight;

        const xScale = d3.scaleLinear().domain([0, 2]).range([0, innerWidth]);
        const yScale = d3.scaleLinear().domain([-1.3, 1.3]).range([innerHeight, 0]);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Background
        g.append('rect')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        // Grid
        [0, 0.5, 1, 1.5, 2].forEach(val => {
            g.append('line')
                .attr('x1', xScale(val)).attr('x2', xScale(val))
                .attr('y1', 0).attr('y2', innerHeight)
                .attr('stroke', theme.grid)
                .attr('stroke-dasharray', D3_SHARED.gridDash);
        });
        [-1, 0, 1].forEach(val => {
            g.append('line')
                .attr('x1', 0).attr('x2', innerWidth)
                .attr('y1', yScale(val)).attr('y2', yScale(val))
                .attr('stroke', val === 0 ? theme.axis : theme.grid)
                .attr('stroke-dasharray', val === 0 ? '' : D3_SHARED.gridDash);
        });

        // Original signal
        const continuousLine = d3.line<{ t: number; y: number }>()
            .x(d => xScale(d.t))
            .y(d => yScale(d.y))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(data.continuousPoints)
            .attr('fill', 'none')
            .attr('stroke', isAliased ? theme.textDim : theme.signalPrimary)
            .attr('stroke-width', 2)
            .attr('d', continuousLine);

        // Aliased signal
        if (isAliased && data.aliasedPoints.length > 0) {
            g.append('path')
                .datum(data.aliasedPoints)
                .attr('fill', 'none')
                .attr('stroke', theme.signalSecondary)
                .attr('stroke-width', 2)
                .attr('d', continuousLine);
        }

        // Sample points
        data.discretePoints.forEach(d => {
            g.append('line')
                .attr('x1', xScale(d.t)).attr('x2', xScale(d.t))
                .attr('y1', yScale(0)).attr('y2', yScale(d.y))
                .attr('stroke', theme.signalTertiary)
                .attr('stroke-width', 1.5);

            g.append('circle')
                .attr('cx', xScale(d.t))
                .attr('cy', yScale(d.y))
                .attr('r', 4)
                .attr('fill', theme.signalTertiary);
        });

        // Labels
        g.append('text')
            .attr('x', innerWidth - 5)
            .attr('y', yScale(0) - 8)
            .attr('fill', theme.textMuted)
            .attr('font-size', 11)
            .attr('font-family', D3_SHARED.fontMono)
            .attr('text-anchor', 'end')
            .text('t');

        // Status
        const statusY = innerHeight + 25;
        g.append('text')
            .attr('x', 0)
            .attr('y', statusY)
            .attr('fill', isAliased ? theme.danger : theme.success)
            .attr('font-size', 12)
            .attr('font-family', D3_SHARED.fontFamily)
            .text(isAliased ? `⚠ Aliasing! (fs < 2f)` : `✓ No aliasing (fs ≥ 2f)`);

        g.append('text')
            .attr('x', innerWidth)
            .attr('y', statusY)
            .attr('fill', theme.textMuted)
            .attr('font-size', 11)
            .attr('font-family', D3_SHARED.fontMono)
            .attr('text-anchor', 'end')
            .text(`fs = ${samplingRate} Hz, f = ${signalFrequency} Hz`);

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

    }, [data, width, height, title, samplingRate, signalFrequency, isAliased, showControls, theme]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <svg
                ref={svgRef}
                width={width}
                height={height - (showControls ? 40 : 0)}
                style={{
                    background: theme.background,
                    borderRadius: 8,
                    display: 'block',
                }}
            />
            {showControls && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 12px',
                    background: theme.surface,
                    borderRadius: 6,
                    fontFamily: D3_SHARED.fontFamily,
                    fontSize: 13,
                    color: theme.text,
                }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: theme.textMuted }}>Sampling Rate:</span>
                        <input
                            type="range"
                            min={1}
                            max={20}
                            step={0.5}
                            value={samplingRate}
                            onChange={(e) => setSamplingRate(Number(e.target.value))}
                            style={{ width: 120 }}
                        />
                        <span style={{ fontFamily: D3_SHARED.fontMono, minWidth: 50 }}>
                            {samplingRate} Hz
                        </span>
                    </label>
                    <span style={{
                        color: theme.textDim,
                        fontSize: 11,
                        fontFamily: D3_SHARED.fontMono
                    }}>
                        Nyquist: {nyquistRate} Hz
                    </span>
                </div>
            )}
        </div>
    );
}
