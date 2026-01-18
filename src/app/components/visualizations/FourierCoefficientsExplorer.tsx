'use client';

import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { D3_SHARED } from './d3-theme';

export interface FourierCoefficientsExplorerProps {
    width?: number;
    height?: number;
    title?: string;
}

export default function FourierCoefficientsExplorer({
    width = 700,
    height = 450,
    title = 'Fourier Coefficients Explorer',
}: FourierCoefficientsExplorerProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const theme = useD3Theme();

    const [dc, setDc] = useState(0);
    const [a1, setA1] = useState(1.0);
    const [a3, setA3] = useState(0.33);
    const [showNegative, setShowNegative] = useState(true);

    // Calculate Fourier coefficients from amplitudes
    const getCoefficients = () => {
        // For sin waves: X_k = A_k / 2j = A_k * e^(-jπ/2) / 2
        // Magnitude: |X_k| = A_k / 2
        const coeffs: { k: number; magnitude: number; phase: number }[] = [];

        // DC
        coeffs.push({ k: 0, magnitude: Math.abs(dc), phase: dc >= 0 ? 0 : Math.PI });

        // k = ±1
        if (a1 > 0) {
            coeffs.push({ k: 1, magnitude: a1 / 2, phase: -Math.PI / 2 });
            if (showNegative) {
                coeffs.push({ k: -1, magnitude: a1 / 2, phase: Math.PI / 2 });
            }
        }

        // k = ±3
        if (a3 > 0) {
            coeffs.push({ k: 3, magnitude: a3 / 2, phase: -Math.PI / 2 });
            if (showNegative) {
                coeffs.push({ k: -3, magnitude: a3 / 2, phase: Math.PI / 2 });
            }
        }

        return coeffs;
    };

    // Generate time domain signal
    const generateSignal = () => {
        const points: { t: number; y: number }[] = [];
        const duration = 4 * Math.PI;
        const steps = 200;

        for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * duration;
            const y = dc + a1 * Math.sin(t) + a3 * Math.sin(3 * t);
            points.push({ t, y });
        }
        return points;
    };

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const controlHeight = 100;
        const margin = { top: title ? 35 : 15, right: 20, bottom: 30, left: 45 };
        const totalHeight = height - controlHeight;

        // Split into two panels
        const panelGap = 20;
        const panelWidth = (width - margin.left - margin.right - panelGap) / 2;
        const panelHeight = totalHeight - margin.top - margin.bottom;

        const signalData = generateSignal();
        const maxY = Math.max(2, d3.max(signalData, d => Math.abs(d.y)) || 2);

        // Time domain scales
        const xTimeScale = d3.scaleLinear().domain([0, 4 * Math.PI]).range([0, panelWidth]);
        const yTimeScale = d3.scaleLinear().domain([-maxY, maxY]).range([panelHeight, 0]);

        // Frequency domain scales
        const coeffs = getCoefficients();
        const kRange = showNegative ? [-4, 4] : [0, 4];
        const xFreqScale = d3.scaleLinear().domain(kRange).range([0, panelWidth]);
        const maxMag = Math.max(1, d3.max(coeffs, c => c.magnitude) || 1);
        const yMagScale = d3.scaleLinear().domain([0, maxMag * 1.2]).range([panelHeight / 2 - 10, 0]);
        const yPhaseScale = d3.scaleLinear().domain([-Math.PI, Math.PI]).range([panelHeight / 2 - 10, 0]);

        // Left panel: Time domain
        const gTime = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        gTime.append('rect')
            .attr('width', panelWidth)
            .attr('height', panelHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        gTime.append('line')
            .attr('x1', 0).attr('x2', panelWidth)
            .attr('y1', yTimeScale(0)).attr('y2', yTimeScale(0))
            .attr('stroke', theme.axis);

        const signalLine = d3.line<{ t: number; y: number }>()
            .x(d => xTimeScale(d.t))
            .y(d => yTimeScale(d.y))
            .curve(d3.curveMonotoneX);

        gTime.append('path')
            .datum(signalData)
            .attr('fill', 'none')
            .attr('stroke', theme.signalPrimary)
            .attr('stroke-width', 2)
            .attr('d', signalLine);

        gTime.append('text')
            .attr('x', panelWidth / 2)
            .attr('y', -8)
            .attr('fill', theme.textMuted)
            .attr('font-size', 11)
            .attr('font-family', D3_SHARED.fontFamily)
            .attr('text-anchor', 'middle')
            .text('Time Domain: x(t)');

        // Right panel: Frequency domain
        const gFreq = svg.append('g')
            .attr('transform', `translate(${margin.left + panelWidth + panelGap},${margin.top})`);

        gFreq.append('rect')
            .attr('width', panelWidth)
            .attr('height', panelHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        // Magnitude spectrum (top half)
        const magY = 0;
        gFreq.append('text')
            .attr('x', panelWidth / 2)
            .attr('y', magY - 8)
            .attr('fill', theme.textMuted)
            .attr('font-size', 11)
            .attr('font-family', D3_SHARED.fontFamily)
            .attr('text-anchor', 'middle')
            .text('Magnitude |Xₖ|');

        gFreq.append('line')
            .attr('x1', 0).attr('x2', panelWidth)
            .attr('y1', magY + panelHeight / 2 - 15).attr('y2', magY + panelHeight / 2 - 15)
            .attr('stroke', theme.axis);

        coeffs.forEach(c => {
            const x = xFreqScale(c.k);
            const barHeight = yMagScale(0) - yMagScale(c.magnitude);

            gFreq.append('line')
                .attr('x1', x).attr('x2', x)
                .attr('y1', magY + yMagScale(0)).attr('y2', magY + yMagScale(c.magnitude))
                .attr('stroke', theme.signalPrimary)
                .attr('stroke-width', 3);

            gFreq.append('circle')
                .attr('cx', x)
                .attr('cy', magY + yMagScale(c.magnitude))
                .attr('r', 4)
                .attr('fill', theme.signalPrimary);

            gFreq.append('text')
                .attr('x', x)
                .attr('y', magY + panelHeight / 2 - 5)
                .attr('fill', theme.textDim)
                .attr('font-size', 9)
                .attr('font-family', D3_SHARED.fontMono)
                .attr('text-anchor', 'middle')
                .text(c.k);
        });

        // Phase spectrum (bottom half)
        const phaseY = panelHeight / 2 + 10;
        gFreq.append('text')
            .attr('x', panelWidth / 2)
            .attr('y', phaseY)
            .attr('fill', theme.textMuted)
            .attr('font-size', 11)
            .attr('font-family', D3_SHARED.fontFamily)
            .attr('text-anchor', 'middle')
            .text('Phase ∠Xₖ');

        gFreq.append('line')
            .attr('x1', 0).attr('x2', panelWidth)
            .attr('y1', phaseY + (panelHeight / 2 - 10) / 2).attr('y2', phaseY + (panelHeight / 2 - 10) / 2)
            .attr('stroke', theme.axis);

        coeffs.forEach(c => {
            if (c.k === 0 && c.magnitude === 0) return;

            const x = xFreqScale(c.k);

            gFreq.append('line')
                .attr('x1', x).attr('x2', x)
                .attr('y1', phaseY + yPhaseScale(0)).attr('y2', phaseY + yPhaseScale(c.phase))
                .attr('stroke', theme.signalSecondary)
                .attr('stroke-width', 2);

            gFreq.append('circle')
                .attr('cx', x)
                .attr('cy', phaseY + yPhaseScale(c.phase))
                .attr('r', 3)
                .attr('fill', theme.signalSecondary);
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

    }, [dc, a1, a3, showNegative, width, height, title, theme]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <svg
                ref={svgRef}
                width={width}
                height={height - 100}
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
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: theme.textMuted, minWidth: 60 }}>DC (X₀):</span>
                        <input
                            type="range"
                            min={-1}
                            max={1}
                            step={0.1}
                            value={dc}
                            onChange={(e) => setDc(Number(e.target.value))}
                            style={{ width: 80, accentColor: theme.signalPrimary }}
                        />
                        <span style={{ fontFamily: D3_SHARED.fontMono, minWidth: 35 }}>{dc.toFixed(1)}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: theme.textMuted, minWidth: 60 }}>A₁:</span>
                        <input
                            type="range"
                            min={0}
                            max={2}
                            step={0.1}
                            value={a1}
                            onChange={(e) => setA1(Number(e.target.value))}
                            style={{ width: 80, accentColor: theme.signalPrimary }}
                        />
                        <span style={{ fontFamily: D3_SHARED.fontMono, minWidth: 35 }}>{a1.toFixed(1)}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: theme.textMuted, minWidth: 60 }}>A₃:</span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={a3}
                            onChange={(e) => setA3(Number(e.target.value))}
                            style={{ width: 80, accentColor: theme.signalPrimary }}
                        />
                        <span style={{ fontFamily: D3_SHARED.fontMono, minWidth: 35 }}>{a3.toFixed(2)}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                        type="checkbox"
                        checked={showNegative}
                        onChange={(e) => setShowNegative(e.target.checked)}
                    />
                    <span style={{ color: theme.textMuted }}>Show negative frequencies (conjugate symmetry)</span>
                </div>
            </div>
        </div>
    );
}
