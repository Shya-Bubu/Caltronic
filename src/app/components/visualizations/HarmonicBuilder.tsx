'use client';

import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { D3_SHARED } from './d3-theme';

export interface HarmonicBuilderProps {
    width?: number;
    height?: number;
    title?: string;
    preset?: 'custom' | 'square' | 'triangle' | 'sawtooth';
}

interface Harmonic {
    k: number;
    amplitude: number;
    enabled: boolean;
}

export default function HarmonicBuilder({
    width = 600,
    height = 400,
    title = 'Harmonic Builder',
    preset = 'custom',
}: HarmonicBuilderProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const theme = useD3Theme();

    // Harmonics state: 1st, 3rd, 5th, 7th (odd harmonics for demo)
    const [harmonics, setHarmonics] = useState<Harmonic[]>([
        { k: 1, amplitude: 1.0, enabled: true },
        { k: 3, amplitude: 0.33, enabled: true },
        { k: 5, amplitude: 0.2, enabled: true },
        { k: 7, amplitude: 0.14, enabled: true },
    ]);

    const [dcOffset, setDcOffset] = useState(0);

    // Apply preset
    useEffect(() => {
        if (preset === 'square') {
            // Square wave: 4/π * (sin(t) + sin(3t)/3 + sin(5t)/5 + ...)
            setHarmonics([
                { k: 1, amplitude: 1.0, enabled: true },
                { k: 3, amplitude: 0.33, enabled: true },
                { k: 5, amplitude: 0.2, enabled: true },
                { k: 7, amplitude: 0.14, enabled: true },
            ]);
        } else if (preset === 'triangle') {
            // Triangle wave: 8/π² * (sin(t) - sin(3t)/9 + sin(5t)/25 - ...)
            setHarmonics([
                { k: 1, amplitude: 1.0, enabled: true },
                { k: 3, amplitude: 0.11, enabled: true },
                { k: 5, amplitude: 0.04, enabled: true },
                { k: 7, amplitude: 0.02, enabled: true },
            ]);
        } else if (preset === 'sawtooth') {
            // Sawtooth: 2/π * (sin(t) - sin(2t)/2 + sin(3t)/3 - ...)
            setHarmonics([
                { k: 1, amplitude: 1.0, enabled: true },
                { k: 2, amplitude: 0.5, enabled: true },
                { k: 3, amplitude: 0.33, enabled: true },
                { k: 4, amplitude: 0.25, enabled: true },
            ]);
        }
    }, [preset]);

    // Generate waveform data
    const generateWaveform = () => {
        const points: { t: number; y: number }[] = [];
        const duration = 2 * Math.PI;
        const steps = 300;

        for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * duration;
            let y = dcOffset;

            harmonics.forEach(h => {
                if (h.enabled) {
                    y += h.amplitude * Math.sin(h.k * t);
                }
            });

            points.push({ t, y });
        }
        return points;
    };

    // Generate individual harmonic data
    const generateHarmonicWave = (harmonic: Harmonic) => {
        const points: { t: number; y: number }[] = [];
        const duration = 2 * Math.PI;
        const steps = 100;

        for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * duration;
            const y = harmonic.amplitude * Math.sin(harmonic.k * t);
            points.push({ t, y });
        }
        return points;
    };

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const controlHeight = 160;
        const margin = { top: title ? 35 : 15, right: 20, bottom: 30, left: 45 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom - controlHeight;

        const waveformData = generateWaveform();
        const maxY = Math.max(2, d3.max(waveformData, d => Math.abs(d.y)) || 2);

        const xScale = d3.scaleLinear().domain([0, 2 * Math.PI]).range([0, innerWidth]);
        const yScale = d3.scaleLinear().domain([-maxY, maxY]).range([innerHeight, 0]);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Background
        g.append('rect')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        // Grid
        g.append('line')
            .attr('x1', 0).attr('x2', innerWidth)
            .attr('y1', yScale(0)).attr('y2', yScale(0))
            .attr('stroke', theme.axis)
            .attr('stroke-width', 1);

        // Individual harmonics (faded)
        const colors = [theme.signalSecondary, '#f59e0b', '#10b981', '#8b5cf6'];
        harmonics.forEach((h, i) => {
            if (h.enabled) {
                const harmonicData = generateHarmonicWave(h);
                const line = d3.line<{ t: number; y: number }>()
                    .x(d => xScale(d.t))
                    .y(d => yScale(d.y))
                    .curve(d3.curveMonotoneX);

                g.append('path')
                    .datum(harmonicData)
                    .attr('fill', 'none')
                    .attr('stroke', colors[i % colors.length])
                    .attr('stroke-width', 1)
                    .attr('stroke-opacity', 0.4)
                    .attr('stroke-dasharray', '4,4')
                    .attr('d', line);
            }
        });

        // Combined waveform
        const combinedLine = d3.line<{ t: number; y: number }>()
            .x(d => xScale(d.t))
            .y(d => yScale(d.y))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(waveformData)
            .attr('fill', 'none')
            .attr('stroke', theme.signalPrimary)
            .attr('stroke-width', 2.5)
            .attr('d', combinedLine);

        // Axis labels
        g.append('text')
            .attr('x', innerWidth - 5)
            .attr('y', yScale(0) - 8)
            .attr('fill', theme.textMuted)
            .attr('font-size', 11)
            .attr('font-family', D3_SHARED.fontMono)
            .attr('text-anchor', 'end')
            .text('t');

        // Legend
        const legendY = innerHeight + 15;
        harmonics.forEach((h, i) => {
            if (h.enabled) {
                const x = i * 100;
                g.append('line')
                    .attr('x1', x).attr('x2', x + 20)
                    .attr('y1', legendY).attr('y2', legendY)
                    .attr('stroke', colors[i % colors.length])
                    .attr('stroke-width', 2);
                g.append('text')
                    .attr('x', x + 25)
                    .attr('y', legendY + 4)
                    .attr('fill', theme.textMuted)
                    .attr('font-size', 10)
                    .attr('font-family', D3_SHARED.fontMono)
                    .text(`k=${h.k}`);
            }
        });

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

    }, [harmonics, dcOffset, width, height, title, theme]);

    const updateHarmonic = (index: number, field: 'amplitude' | 'enabled', value: number | boolean) => {
        setHarmonics(prev => {
            const updated = [...prev];
            if (field === 'amplitude') {
                updated[index] = { ...updated[index], amplitude: value as number };
            } else {
                updated[index] = { ...updated[index], enabled: value as boolean };
            }
            return updated;
        });
    };

    const sliderStyle: React.CSSProperties = {
        width: 100,
        accentColor: theme.signalPrimary,
    };

    const labelStyle: React.CSSProperties = {
        fontFamily: D3_SHARED.fontMono,
        fontSize: 11,
        color: theme.textMuted,
        minWidth: 35,
        textAlign: 'right',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <svg
                ref={svgRef}
                width={width}
                height={height - 160}
                style={{
                    background: theme.background,
                    borderRadius: 8,
                    display: 'block',
                }}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                padding: '12px',
                background: theme.surface,
                borderRadius: 6,
                fontFamily: D3_SHARED.fontFamily,
                fontSize: 12,
                color: theme.text,
            }}>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>Adjust Harmonics:</div>
                {harmonics.map((h, i) => (
                    <div key={h.k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <input
                            type="checkbox"
                            checked={h.enabled}
                            onChange={(e) => updateHarmonic(i, 'enabled', e.target.checked)}
                        />
                        <span style={{ minWidth: 60, color: theme.textMuted }}>
                            Harmonic {h.k}:
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={h.amplitude}
                            onChange={(e) => updateHarmonic(i, 'amplitude', Number(e.target.value))}
                            style={sliderStyle}
                            disabled={!h.enabled}
                        />
                        <span style={labelStyle}>{h.amplitude.toFixed(2)}</span>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                    <span style={{ minWidth: 80, color: theme.textMuted }}>DC Offset:</span>
                    <input
                        type="range"
                        min={-1}
                        max={1}
                        step={0.1}
                        value={dcOffset}
                        onChange={(e) => setDcOffset(Number(e.target.value))}
                        style={sliderStyle}
                    />
                    <span style={labelStyle}>{dcOffset.toFixed(1)}</span>
                </div>
            </div>
        </div>
    );
}
