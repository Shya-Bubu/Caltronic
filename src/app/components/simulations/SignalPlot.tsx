'use client';

import { useState, useMemo, useCallback } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Scatter,
    ScatterChart,
    ComposedChart,
} from 'recharts';
import styles from './SignalPlot.module.css';

/**
 * Data point for signal plots
 * Use 't' for time axis, then any other keys for signal values
 */
interface SignalPoint {
    t: number;
    value?: number;
    [key: string]: number | undefined;
}

/**
 * Signal line configuration
 */
interface SignalLine {
    dataKey: string;
    name: string;
    color: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    dot?: boolean;
}

interface SignalPlotProps {
    /** Array of data points with t (time) and value fields */
    data: SignalPoint[];
    /** Configuration for each signal line */
    lines?: SignalLine[];
    /** X-axis label */
    xLabel?: string;
    /** Y-axis label */
    yLabel?: string;
    /** Plot title */
    title?: string;
    /** Height in pixels */
    height?: number;
    /** Show grid */
    showGrid?: boolean;
    /** Reference lines at y=0 */
    showZeroLine?: boolean;
    /** Domain for X axis [min, max] */
    xDomain?: [number, number];
    /** Domain for Y axis [min, max] */
    yDomain?: [number, number];
}

/**
 * Engineering-style signal plot with dark theme
 * 
 * Styled to look like oscilloscope/MATLAB/Simulink output
 */
export default function SignalPlot({
    data,
    lines = [{ dataKey: 'value', name: 'Signal', color: '#00ff88', strokeWidth: 2 }],
    xLabel = 't',
    yLabel = 'x(t)',
    title,
    height = 300,
    showGrid = true,
    showZeroLine = true,
    xDomain,
    yDomain,
}: SignalPlotProps) {
    return (
        <div className={styles.container}>
            {title && <div className={styles.title}>{title}</div>}
            <ResponsiveContainer width="100%" height={height}>
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    {showGrid && (
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.1)"
                            vertical={true}
                            horizontal={true}
                        />
                    )}

                    <XAxis
                        dataKey="t"
                        stroke="#888"
                        tick={{ fill: '#888', fontSize: 11 }}
                        axisLine={{ stroke: '#444' }}
                        tickLine={{ stroke: '#444' }}
                        domain={xDomain || ['auto', 'auto']}
                        label={{ value: xLabel, position: 'bottom', fill: '#888', fontSize: 12 }}
                    />

                    <YAxis
                        stroke="#888"
                        tick={{ fill: '#888', fontSize: 11 }}
                        axisLine={{ stroke: '#444' }}
                        tickLine={{ stroke: '#444' }}
                        domain={yDomain || ['auto', 'auto']}
                        label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#888', fontSize: 12 }}
                    />

                    {showZeroLine && (
                        <ReferenceLine y={0} stroke="#555" strokeWidth={1} />
                    )}

                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1a1a2e',
                            border: '1px solid #333',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: '12px',
                        }}
                        labelStyle={{ color: '#888' }}
                    />

                    {lines.map((line) => (
                        <Line
                            key={line.dataKey}
                            type="monotone"
                            dataKey={line.dataKey}
                            name={line.name}
                            stroke={line.color}
                            strokeWidth={line.strokeWidth || 2}
                            strokeDasharray={line.strokeDasharray}
                            dot={line.dot === true ? { r: 3, fill: line.color } : false}
                            activeDot={{ r: 5, fill: line.color }}
                            isAnimationActive={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

/**
 * Stem plot for discrete signals (like MATLAB stem())
 */
export function StemPlot({
    data,
    xLabel = 'n',
    yLabel = 'x[n]',
    title,
    height = 300,
    color = '#00ccff',
}: {
    data: { n: number; value: number }[];
    xLabel?: string;
    yLabel?: string;
    title?: string;
    height?: number;
    color?: string;
}) {
    // Convert data to include stem lines
    const stemData = useMemo(() => {
        return data.flatMap((point) => [
            { n: point.n, value: 0, type: 'base' },
            { n: point.n, value: point.value, type: 'top' },
        ]);
    }, [data]);

    return (
        <div className={styles.container}>
            {title && <div className={styles.title}>{title}</div>}
            <ResponsiveContainer width="100%" height={height}>
                <ComposedChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />

                    <XAxis
                        dataKey="n"
                        stroke="#888"
                        tick={{ fill: '#888', fontSize: 11 }}
                        domain={['auto', 'auto']}
                        label={{ value: xLabel, position: 'bottom', fill: '#888', fontSize: 12 }}
                    />

                    <YAxis
                        stroke="#888"
                        tick={{ fill: '#888', fontSize: 11 }}
                        label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#888', fontSize: 12 }}
                    />

                    <ReferenceLine y={0} stroke="#555" strokeWidth={1} />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1a1a2e',
                            border: '1px solid #333',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: '12px',
                        }}
                    />

                    {/* Stem markers (circles at top) */}
                    <Scatter
                        dataKey="value"
                        fill={color}
                        shape="circle"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
