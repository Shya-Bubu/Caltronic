'use client';

import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { D3_SHARED } from './d3-theme';

export interface SignalDecomposerProps {
    width?: number;
    height?: number;
    title?: string;
    signalType?: 'square' | 'triangle' | 'sawtooth';
}

export default function SignalDecomposer({
    width = 600,
    height = 420,
    title = 'Fourier Series Reconstruction',
    signalType: initialSignal = 'square',
}: SignalDecomposerProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const theme = useD3Theme();

    const [numHarmonics, setNumHarmonics] = useState(5);
    const [signalType, setSignalType] = useState(initialSignal);

    // Generate original signal
    const generateOriginal = (t: number): number => {
        const normalized = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        switch (signalType) {
            case 'square':
                return normalized < Math.PI ? 1 : -1;
            case 'triangle':
                if (normalized < Math.PI) {
                    return -1 + (2 * normalized / Math.PI);
                } else {
                    return 1 - (2 * (normalized - Math.PI) / Math.PI);
                }
            case 'sawtooth':
                return -1 + normalized / Math.PI;
            default:
                return 0;
        }
    };

    // Generate Fourier approximation
    const generateApproximation = (t: number): number => {
        let sum = 0;

        switch (signalType) {
            case 'square':
                // Square wave: Σ (4/πk) sin(kt) for odd k
                for (let k = 1; k <= numHarmonics * 2 - 1; k += 2) {
                    sum += (4 / (Math.PI * k)) * Math.sin(k * t);
                }
                break;
            case 'triangle':
                // Triangle wave: Σ (8/π²k²) (-1)^((k-1)/2) sin(kt) for odd k
                for (let k = 1; k <= numHarmonics * 2 - 1; k += 2) {
                    const sign = Math.pow(-1, (k - 1) / 2);
                    sum += (8 / (Math.PI * Math.PI * k * k)) * sign * Math.sin(k * t);
                }
                break;
            case 'sawtooth':
                // Sawtooth: Σ (2/πk) (-1)^(k+1) sin(kt)
                for (let k = 1; k <= numHarmonics; k++) {
                    const sign = Math.pow(-1, k + 1);
                    sum += (2 / (Math.PI * k)) * sign * Math.sin(k * t);
                }
                break;
        }

        return sum;
    };

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const controlHeight = 80;
        const margin = { top: title ? 35 : 15, right: 20, bottom: 40, left: 45 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom - controlHeight;

        // Generate data
        const duration = 4 * Math.PI;
        const steps = 400;
        const originalData: { t: number; y: number }[] = [];
        const approxData: { t: number; y: number }[] = [];

        for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * duration - 2 * Math.PI;
            originalData.push({ t, y: generateOriginal(t) });
            approxData.push({ t, y: generateApproximation(t) });
        }

        const xScale = d3.scaleLinear().domain([-2 * Math.PI, 2 * Math.PI]).range([0, innerWidth]);
        const yScale = d3.scaleLinear().domain([-1.5, 1.5]).range([innerHeight, 0]);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Background
        g.append('rect')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        // Grid
        [-Math.PI, 0, Math.PI].forEach(val => {
            g.append('line')
                .attr('x1', xScale(val)).attr('x2', xScale(val))
                .attr('y1', 0).attr('y2', innerHeight)
                .attr('stroke', val === 0 ? theme.axis : theme.grid)
                .attr('stroke-dasharray', val === 0 ? '' : D3_SHARED.gridDash);
        });

        g.append('line')
            .attr('x1', 0).attr('x2', innerWidth)
            .attr('y1', yScale(0)).attr('y2', yScale(0))
            .attr('stroke', theme.axis);

        // Original signal (stepped for discontinuous)
        const originalLine = d3.line<{ t: number; y: number }>()
            .x(d => xScale(d.t))
            .y(d => yScale(d.y))
            .curve(signalType === 'square' ? d3.curveStepAfter : d3.curveLinear);

        g.append('path')
            .datum(originalData)
            .attr('fill', 'none')
            .attr('stroke', theme.textDim)
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '6,4')
            .attr('d', originalLine);

        // Fourier approximation
        const approxLine = d3.line<{ t: number; y: number }>()
            .x(d => xScale(d.t))
            .y(d => yScale(d.y))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(approxData)
            .attr('fill', 'none')
            .attr('stroke', theme.signalPrimary)
            .attr('stroke-width', 2)
            .attr('d', approxLine);

        // Calculate MSE
        let mse = 0;
        for (let i = 0; i < originalData.length; i++) {
            const diff = originalData[i].y - approxData[i].y;
            mse += diff * diff;
        }
        mse /= originalData.length;

        // Legend
        const legendY = innerHeight + 20;

        g.append('line')
            .attr('x1', 0).attr('x2', 25)
            .attr('y1', legendY).attr('y2', legendY)
            .attr('stroke', theme.textDim)
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '6,4');

        g.append('text')
            .attr('x', 30)
            .attr('y', legendY + 4)
            .attr('fill', theme.textMuted)
            .attr('font-size', 11)
            .attr('font-family', D3_SHARED.fontFamily)
            .text('Original');

        g.append('line')
            .attr('x1', 100).attr('x2', 125)
            .attr('y1', legendY).attr('y2', legendY)
            .attr('stroke', theme.signalPrimary)
            .attr('stroke-width', 2);

        g.append('text')
            .attr('x', 130)
            .attr('y', legendY + 4)
            .attr('fill', theme.textMuted)
            .attr('font-size', 11)
            .attr('font-family', D3_SHARED.fontFamily)
            .text(`${numHarmonics}-harmonic approximation`);

        g.append('text')
            .attr('x', innerWidth)
            .attr('y', legendY + 4)
            .attr('fill', theme.textDim)
            .attr('font-size', 10)
            .attr('font-family', D3_SHARED.fontMono)
            .attr('text-anchor', 'end')
            .text(`MSE: ${mse.toFixed(4)}`);

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

    }, [numHarmonics, signalType, width, height, title, theme]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <svg
                ref={svgRef}
                width={width}
                height={height - 80}
                style={{
                    background: theme.background,
                    borderRadius: 8,
                    display: 'block',
                }}
            />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '12px',
                background: theme.surface,
                borderRadius: 6,
                fontFamily: D3_SHARED.fontFamily,
                fontSize: 12,
                color: theme.text,
                flexWrap: 'wrap',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: theme.textMuted }}>Signal:</span>
                    <select
                        value={signalType}
                        onChange={(e) => setSignalType(e.target.value as 'square' | 'triangle' | 'sawtooth')}
                        style={{
                            padding: '4px 8px',
                            background: theme.background,
                            border: `1px solid ${theme.grid}`,
                            borderRadius: 4,
                            color: theme.text,
                            fontFamily: D3_SHARED.fontFamily,
                            fontSize: 12,
                        }}
                    >
                        <option value="square">Square Wave</option>
                        <option value="triangle">Triangle Wave</option>
                        <option value="sawtooth">Sawtooth Wave</option>
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: theme.textMuted }}>Harmonics:</span>
                    <input
                        type="range"
                        min={1}
                        max={15}
                        step={1}
                        value={numHarmonics}
                        onChange={(e) => setNumHarmonics(Number(e.target.value))}
                        style={{ width: 120, accentColor: theme.signalPrimary }}
                    />
                    <span style={{ fontFamily: D3_SHARED.fontMono, minWidth: 25 }}>
                        {numHarmonics}
                    </span>
                </div>

                <div style={{ fontSize: 10, color: theme.textDim, fontStyle: 'italic' }}>
                    Notice Gibbs phenomenon at discontinuities!
                </div>
            </div>
        </div>
    );
}
