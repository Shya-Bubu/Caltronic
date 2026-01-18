'use client';

import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { D3_SHARED } from './d3-theme';

export interface TimeShiftExplorerProps {
    width?: number;
    height?: number;
    title?: string;
}

export default function TimeShiftExplorer({
    width = 650,
    height = 450,
    title = 'Time Shift Property Demo',
}: TimeShiftExplorerProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const theme = useD3Theme();

    const [timeShift, setTimeShift] = useState(0);
    const omega0 = 1; // Fundamental frequency

    // Generate original signal (composite of harmonics)
    const generateOriginal = (t: number): number => {
        return Math.sin(omega0 * t) + 0.5 * Math.sin(3 * omega0 * t);
    };

    const generateShifted = (t: number): number => {
        return generateOriginal(t - timeShift);
    };

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const controlHeight = 70;
        const margin = { top: title ? 35 : 15, right: 20, bottom: 25, left: 45 };
        const totalHeight = height - controlHeight;

        // Three panels stacked: Time domain, Magnitude, Phase
        const panelGap = 15;
        const panelHeight = (totalHeight - margin.top - margin.bottom - 2 * panelGap) / 3;
        const innerWidth = width - margin.left - margin.right;

        // Generate time domain data
        const duration = 4 * Math.PI;
        const steps = 200;
        const originalData: { t: number; y: number }[] = [];
        const shiftedData: { t: number; y: number }[] = [];

        for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * duration;
            originalData.push({ t, y: generateOriginal(t) });
            shiftedData.push({ t, y: generateShifted(t) });
        }

        // Scales
        const xTimeScale = d3.scaleLinear().domain([0, duration]).range([0, innerWidth]);
        const yTimeScale = d3.scaleLinear().domain([-2, 2]).range([panelHeight, 0]);

        const kValues = [-3, -1, 0, 1, 3];
        const xFreqScale = d3.scaleLinear().domain([-4, 4]).range([0, innerWidth]);
        const yMagScale = d3.scaleLinear().domain([0, 0.6]).range([panelHeight, 0]);
        const yPhaseScale = d3.scaleLinear().domain([-Math.PI, Math.PI]).range([panelHeight, 0]);

        // Calculate coefficients
        const coeffs = [
            { k: -3, mag: 0.25, phaseOrig: Math.PI / 2, phaseShift: Math.PI / 2 + 3 * omega0 * timeShift },
            { k: -1, mag: 0.5, phaseOrig: Math.PI / 2, phaseShift: Math.PI / 2 + 1 * omega0 * timeShift },
            { k: 0, mag: 0, phaseOrig: 0, phaseShift: 0 },
            { k: 1, mag: 0.5, phaseOrig: -Math.PI / 2, phaseShift: -Math.PI / 2 - 1 * omega0 * timeShift },
            { k: 3, mag: 0.25, phaseOrig: -Math.PI / 2, phaseShift: -Math.PI / 2 - 3 * omega0 * timeShift },
        ];

        // Wrap phase to [-π, π]
        const wrapPhase = (p: number) => {
            while (p > Math.PI) p -= 2 * Math.PI;
            while (p < -Math.PI) p += 2 * Math.PI;
            return p;
        };

        // Panel 1: Time Domain
        const gTime = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        gTime.append('rect')
            .attr('width', innerWidth)
            .attr('height', panelHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        gTime.append('line')
            .attr('x1', 0).attr('x2', innerWidth)
            .attr('y1', yTimeScale(0)).attr('y2', yTimeScale(0))
            .attr('stroke', theme.axis);

        const timeLine = d3.line<{ t: number; y: number }>()
            .x(d => xTimeScale(d.t))
            .y(d => yTimeScale(d.y))
            .curve(d3.curveMonotoneX);

        // Original
        gTime.append('path')
            .datum(originalData)
            .attr('fill', 'none')
            .attr('stroke', theme.textDim)
            .attr('stroke-width', 1.5)
            .attr('stroke-dasharray', '5,3')
            .attr('d', timeLine);

        // Shifted
        gTime.append('path')
            .datum(shiftedData)
            .attr('fill', 'none')
            .attr('stroke', theme.signalPrimary)
            .attr('stroke-width', 2)
            .attr('d', timeLine);

        gTime.append('text')
            .attr('x', 5)
            .attr('y', 15)
            .attr('fill', theme.textMuted)
            .attr('font-size', 10)
            .attr('font-family', D3_SHARED.fontFamily)
            .text('Time Domain');

        // Panel 2: Magnitude Spectrum
        const gMag = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top + panelHeight + panelGap})`);

        gMag.append('rect')
            .attr('width', innerWidth)
            .attr('height', panelHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        gMag.append('line')
            .attr('x1', 0).attr('x2', innerWidth)
            .attr('y1', panelHeight - 1).attr('y2', panelHeight - 1)
            .attr('stroke', theme.axis);

        coeffs.forEach(c => {
            if (c.mag > 0) {
                const x = xFreqScale(c.k);

                // Original (dashed, shifted left slightly)
                gMag.append('line')
                    .attr('x1', x - 3).attr('x2', x - 3)
                    .attr('y1', yMagScale(0)).attr('y2', yMagScale(c.mag))
                    .attr('stroke', theme.textDim)
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', '3,2');

                // Shifted (same magnitude!)
                gMag.append('line')
                    .attr('x1', x + 3).attr('x2', x + 3)
                    .attr('y1', yMagScale(0)).attr('y2', yMagScale(c.mag))
                    .attr('stroke', theme.signalPrimary)
                    .attr('stroke-width', 3);

                gMag.append('circle')
                    .attr('cx', x + 3)
                    .attr('cy', yMagScale(c.mag))
                    .attr('r', 4)
                    .attr('fill', theme.signalPrimary);

                gMag.append('text')
                    .attr('x', x)
                    .attr('y', panelHeight - 5)
                    .attr('fill', theme.textDim)
                    .attr('font-size', 9)
                    .attr('font-family', D3_SHARED.fontMono)
                    .attr('text-anchor', 'middle')
                    .text(c.k);
            }
        });

        gMag.append('text')
            .attr('x', 5)
            .attr('y', 15)
            .attr('fill', theme.textMuted)
            .attr('font-size', 10)
            .attr('font-family', D3_SHARED.fontFamily)
            .text('|Xₖ| = UNCHANGED');

        // Panel 3: Phase Spectrum
        const gPhase = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top + 2 * (panelHeight + panelGap)})`);

        gPhase.append('rect')
            .attr('width', innerWidth)
            .attr('height', panelHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        gPhase.append('line')
            .attr('x1', 0).attr('x2', innerWidth)
            .attr('y1', yPhaseScale(0)).attr('y2', yPhaseScale(0))
            .attr('stroke', theme.axis);

        coeffs.forEach(c => {
            if (c.mag > 0) {
                const x = xFreqScale(c.k);
                const origPhase = wrapPhase(c.phaseOrig);
                const shiftPhase = wrapPhase(c.phaseShift);

                // Original phase
                gPhase.append('circle')
                    .attr('cx', x - 4)
                    .attr('cy', yPhaseScale(origPhase))
                    .attr('r', 3)
                    .attr('fill', theme.textDim);

                // Shifted phase
                gPhase.append('circle')
                    .attr('cx', x + 4)
                    .attr('cy', yPhaseScale(shiftPhase))
                    .attr('r', 4)
                    .attr('fill', theme.signalSecondary);

                // Line connecting to show change
                if (timeShift !== 0) {
                    gPhase.append('line')
                        .attr('x1', x - 4).attr('x2', x + 4)
                        .attr('y1', yPhaseScale(origPhase)).attr('y2', yPhaseScale(shiftPhase))
                        .attr('stroke', theme.signalSecondary)
                        .attr('stroke-width', 1)
                        .attr('stroke-opacity', 0.5);
                }
            }
        });

        gPhase.append('text')
            .attr('x', 5)
            .attr('y', 15)
            .attr('fill', theme.textMuted)
            .attr('font-size', 10)
            .attr('font-family', D3_SHARED.fontFamily)
            .text(`∠Xₖ shifts by -kω₀t₀ = -k×${timeShift.toFixed(1)}`);

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

    }, [timeShift, width, height, title, theme, omega0]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <svg
                ref={svgRef}
                width={width}
                height={height - 70}
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
            }}>
                <span style={{ color: theme.textMuted }}>Time Shift t₀:</span>
                <input
                    type="range"
                    min={-3}
                    max={3}
                    step={0.1}
                    value={timeShift}
                    onChange={(e) => setTimeShift(Number(e.target.value))}
                    style={{ width: 180, accentColor: theme.signalPrimary }}
                />
                <span style={{ fontFamily: D3_SHARED.fontMono, minWidth: 50 }}>
                    {timeShift.toFixed(1)} s
                </span>

                <div style={{ marginLeft: 'auto', fontSize: 10, color: theme.textDim }}>
                    Dashed = original, Solid = shifted
                </div>
            </div>
        </div>
    );
}
