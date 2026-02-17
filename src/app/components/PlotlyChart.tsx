'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { Data, Layout } from 'plotly.js';

// Use standard react-plotly.js import (which re-exports typed component)
// Dynamic import to prevent SSR (plotly.js needs window/document)
const Plot = dynamic(() => import('react-plotly.js'), {
    ssr: false,
    loading: () => (
        <div
            style={{
                height: 350,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
            }}
        >
            Loading chart…
        </div>
    ),
});

interface PlotlyChartProps {
    traces: Data[];
    layout?: Partial<Layout>;
    title?: string;
    description?: string;
    width?: number;
    height?: number;
    centeredAxes?: boolean;
}

const COLORS = [
    '#3b82f6',
    '#ef4444',
    '#22c55e',
    '#f59e0b',
    '#a855f7',
    '#ec4899',
    '#14b8a6',
    '#f97316',
];

export default function PlotlyChart({
    traces,
    layout: userLayout,
    title,
    description,
    width,
    height = 380,
    centeredAxes = false,
}: PlotlyChartProps) {
    const mergedLayout = useMemo(() => {
        const axisDefaults = {
            gridcolor: 'rgba(148,163,184,0.12)',
            zerolinecolor: 'rgba(148,163,184,0.4)',
            zerolinewidth: centeredAxes ? 2 : 1,
            tickfont: { size: 11, color: '#94a3b8' },
        };

        const result: Partial<Layout> = {
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(15,23,42,0.6)',
            font: {
                color: '#94a3b8',
                family: 'Inter, system-ui, sans-serif',
                size: 12,
            },
            margin: { l: 60, r: 30, t: title ? 50 : 20, b: 50 },
            showlegend: traces.length > 1,
            legend: {
                bgcolor: 'rgba(0,0,0,0)',
                font: { color: '#94a3b8', size: 11 },
                x: 1,
                xanchor: 'right',
                y: 1,
            },
            hovermode: 'closest' as const,
            dragmode: 'zoom' as const,
            xaxis: { ...axisDefaults, ...(userLayout?.xaxis || {}) },
            yaxis: { ...axisDefaults, ...(userLayout?.yaxis || {}) },
            ...userLayout,
        };

        // Re-apply axis merges so userLayout spread doesn't lose defaults
        if (userLayout?.xaxis) {
            result.xaxis = { ...axisDefaults, ...userLayout.xaxis };
        }
        if (userLayout?.yaxis) {
            result.yaxis = { ...axisDefaults, ...userLayout.yaxis };
        }

        if (title) {
            result.title = { text: title, font: { size: 14, color: '#e2e8f0' } };
        }

        // Merge any annotations from userLayout
        if (userLayout?.annotations) {
            result.annotations = userLayout.annotations;
        }

        return result;
    }, [traces.length, title, centeredAxes, userLayout]);

    // Apply default colors to traces without explicit color
    const coloredTraces = useMemo(() => {
        return traces.map((t, i) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const trace = { ...t } as any;
            if (!trace.line?.color) {
                trace.line = { width: 2.5, ...(trace.line || {}), color: COLORS[i % COLORS.length] };
            }
            if (!trace.marker?.color) {
                trace.marker = { size: 6, ...(trace.marker || {}), color: COLORS[i % COLORS.length] };
            }
            return trace as Data;
        });
    }, [traces]);

    return (
        <div
            style={{
                marginBlock: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Plot
                data={coloredTraces}
                layout={mergedLayout}
                config={{
                    responsive: true,
                    displayModeBar: true,
                    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as Plotly.ModeBarDefaultButtons[],
                    displaylogo: false,
                }}
                style={{
                    width: width || '100%',
                    maxWidth: width || 700,
                    height,
                }}
                useResizeHandler
            />
            {description && (
                <div
                    style={{
                        marginTop: '0.5rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        textAlign: 'center',
                        maxWidth: width || 700,
                    }}
                >
                    {description}
                </div>
            )}
        </div>
    );
}
