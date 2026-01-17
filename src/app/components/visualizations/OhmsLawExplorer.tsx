'use client';

import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { D3_SHARED } from './d3-theme';

export interface OhmsLawExplorerProps {
    width?: number;
    height?: number;
    title?: string;
}

export default function OhmsLawExplorer({
    width = 600,
    height = 400,
    title = "Ohm's Law Explorer"
}: OhmsLawExplorerProps) {
    const [voltage, setVoltage] = useState(5); // Volts
    const [resistance, setResistance] = useState(100); // Ohms
    const svgRef = useRef<SVGSVGElement>(null);
    const theme = useD3Theme();

    // Calculate derived values
    const current = voltage / resistance; // Amperes
    const power = voltage * current; // Watts

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 40, right: 20, bottom: 40, left: 50 };
        const plotWidth = (Number(width) * 0.6) - margin.left - margin.right;
        const plotHeight = Number(height) - margin.top - margin.bottom;

        // Create IV plot
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Scales
        const maxV = 10;
        const maxI = maxV / 10; // For 10Ω minimum
        const xScale = d3.scaleLinear().domain([0, maxV]).range([0, plotWidth]);
        const yScale = d3.scaleLinear().domain([0, maxI]).range([plotHeight, 0]);

        // Background
        g.append('rect')
            .attr('width', plotWidth)
            .attr('height', plotHeight)
            .attr('fill', theme.surface)
            .attr('rx', 4);

        // Grid
        const gridValues = [0, maxV / 4, maxV / 2, (3 * maxV) / 4, maxV];
        gridValues.forEach(val => {
            g.append('line')
                .attr('x1', xScale(val)).attr('x2', xScale(val))
                .attr('y1', 0).attr('y2', plotHeight)
                .attr('stroke', theme.grid)
                .attr('stroke-dasharray', D3_SHARED.gridDash);
        });
        const gridIValues = [0, maxI / 4, maxI / 2, (3 * maxI) / 4, maxI];
        gridIValues.forEach(val => {
            g.append('line')
                .attr('x1', 0).attr('x2', plotWidth)
                .attr('y1', yScale(val)).attr('y2', yScale(val))
                .attr('stroke', theme.grid)
                .attr('stroke-dasharray', D3_SHARED.gridDash);
        });

        // Axes
        const xAxis = d3.axisBottom(xScale).ticks(5);
        const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(d => `${(Number(d) * 1000).toFixed(0)}m`);

        g.append('g')
            .attr('transform', `translate(0,${plotHeight})`)
            .call(xAxis)
            .attr('color', theme.text)
            .attr('font-size', 11);

        g.append('g')
            .call(yAxis)
            .attr('color', theme.text)
            .attr('font-size', 11);

        // Axis labels
        g.append('text')
            .attr('x', plotWidth / 2)
            .attr('y', plotHeight + 35)
            .attr('fill', theme.text)
            .attr('font-size', 12)
            .attr('text-anchor', 'middle')
            .text('Voltage (V)');

        g.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -plotHeight / 2)
            .attr('y', -38)
            .attr('fill', theme.text)
            .attr('font-size', 12)
            .attr('text-anchor', 'middle')
            .text('Current (A)');

        // IV characteristic line (V = IR → I = V/R)
        const lineData = [
            { v: 0, i: 0 },
            { v: maxV, i: maxV / resistance }
        ];

        const line = d3.line<{ v: number; i: number }>()
            .x(d => xScale(d.v))
            .y(d => yScale(d.i));

        g.append('path')
            .datum(lineData)
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', theme.signalPrimary)
            .attr('stroke-width', 3);

        // Operating point
        g.append('circle')
            .attr('cx', xScale(voltage))
            .attr('cy', yScale(current))
            .attr('r', 6)
            .attr('fill', theme.signalSecondary)
            .attr('stroke', theme.background)
            .attr('stroke-width', 2);

        // Dashed lines to axes
        g.append('line')
            .attr('x1', xScale(voltage)).attr('x2', xScale(voltage))
            .attr('y1', yScale(current)).attr('y2', plotHeight)
            .attr('stroke', theme.signalSecondary)
            .attr('stroke-dasharray', '4,4')
            .attr('opacity', 0.6);

        g.append('line')
            .attr('x1', 0).attr('x2', xScale(voltage))
            .attr('y1', yScale(current)).attr('y2', yScale(current))
            .attr('stroke', theme.signalSecondary)
            .attr('stroke-dasharray', '4,4')
            .attr('opacity', 0.6);

        // Title
        svg.append('text')
            .attr('x', Number(width) / 2)
            .attr('y', 20)
            .attr('fill', theme.text)
            .attr('font-size', 14)
            .attr('font-weight', 600)
            .attr('text-anchor', 'middle')
            .text(title);

    }, [voltage, resistance, width, height, title, theme]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            background: theme.surface,
            borderRadius: 12,
            border: `1px solid ${theme.grid}`,
            maxWidth: 700,
            margin: '0 auto',
        }}>
            {/* Controls Row - Top */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                padding: '0.5rem 0',
            }}>
                {/* Voltage Slider */}
                <div>
                    <label style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                        color: theme.text,
                        fontSize: '0.9rem'
                    }}>
                        <span>⚡ Voltage</span>
                        <strong style={{ color: theme.signalPrimary }}>{voltage.toFixed(1)} V</strong>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={voltage}
                        onChange={(e) => setVoltage(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                </div>

                {/* Resistance Slider */}
                <div>
                    <label style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                        color: theme.text,
                        fontSize: '0.9rem'
                    }}>
                        <span>Ω Resistance</span>
                        <strong style={{ color: theme.signalSecondary }}>{resistance.toFixed(0)} Ω</strong>
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={resistance}
                        onChange={(e) => setResistance(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                </div>
            </div>

            {/* Calculated Values Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
            }}>
                <div style={{
                    padding: '0.75rem',
                    background: theme.background,
                    borderRadius: 8,
                    textAlign: 'center',
                    border: `1px solid ${theme.grid}`,
                }}>
                    <div style={{ fontSize: '0.75rem', color: theme.textMuted, marginBottom: '0.25rem' }}>
                        Current (I = V/R)
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: theme.signalPrimary }}>
                        {(current * 1000).toFixed(2)} mA
                    </div>
                </div>

                <div style={{
                    padding: '0.75rem',
                    background: theme.background,
                    borderRadius: 8,
                    textAlign: 'center',
                    border: `1px solid ${theme.grid}`,
                }}>
                    <div style={{ fontSize: '0.75rem', color: theme.textMuted, marginBottom: '0.25rem' }}>
                        Power (P = VI)
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: theme.signalSecondary }}>
                        {(power * 1000).toFixed(2)} mW
                    </div>
                </div>

                <div style={{
                    padding: '0.75rem',
                    background: theme.background,
                    borderRadius: 8,
                    textAlign: 'center',
                    border: `1px solid ${theme.grid}`,
                }}>
                    <div style={{ fontSize: '0.75rem', color: theme.textMuted, marginBottom: '0.25rem' }}>
                        Conductance (G)
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: theme.signalTertiary }}>
                        {(1000 / resistance).toFixed(3)} mS
                    </div>
                </div>
            </div>

            {/* SVG Plot - Centered */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg
                    ref={svgRef}
                    width={Math.min(Number(width), 500)}
                    height={Math.min(Number(height), 350)}
                    style={{
                        background: theme.background,
                        borderRadius: 8,
                        border: `1px solid ${theme.grid}`,
                    }}
                />
            </div>

            {/* Tip */}
            <div style={{
                padding: '0.5rem 0.75rem',
                background: `${theme.signalPrimary}10`,
                borderRadius: 6,
                fontSize: '0.8rem',
                color: theme.textMuted,
                textAlign: 'center',
            }}>
                Drag sliders to see how the operating point moves on the IV curve
            </div>
        </div>
    );
}
