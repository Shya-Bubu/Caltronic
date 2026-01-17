'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { useD3Theme } from './useD3Theme';
import { D3_SHARED } from './d3-theme';

interface Block {
    id: string;
    label: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    type?: 'process' | 'sum' | 'branch' | 'input' | 'output';
}

interface Connection {
    from: string;
    to: string;
    label?: string;
    fromSide?: 'right' | 'bottom' | 'left' | 'top';
    toSide?: 'left' | 'top' | 'right' | 'bottom';
}

export interface BlockDiagramProps {
    blocks: Block[];
    connections: Connection[];
    width?: number;
    height?: number;
    title?: string;
}

export default function BlockDiagram({
    blocks,
    connections,
    width = 500,
    height = 200,
    title,
}: BlockDiagramProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const theme = useD3Theme();

    const blockMap = useMemo(() => {
        const map = new Map<string, Block>();
        blocks.forEach(b => map.set(b.id, { ...b, width: b.width || 80, height: b.height || 40 }));
        return map;
    }, [blocks]);

    // Helper to render multiline text (handles \\n in labels)
    const renderMultilineText = (
        parent: d3.Selection<SVGGElement, unknown, null, undefined>,
        text: string,
        x: number,
        y: number,
        fontSize: number,
        fill: string,
        fontFamily: string,
        fontWeight: number = 400
    ) => {
        // Replace literal \\n with actual newline for splitting
        const lines = text.replace(/\\\\n/g, '\n').split('\n');
        const lineHeight = fontSize * 1.2;
        const startY = y - ((lines.length - 1) * lineHeight) / 2;

        const textEl = parent.append('text')
            .attr('x', x)
            .attr('y', startY)
            .attr('fill', fill)
            .attr('font-size', fontSize)
            .attr('font-family', fontFamily)
            .attr('font-weight', fontWeight)
            .attr('text-anchor', 'middle');

        lines.forEach((line, i) => {
            textEl.append('tspan')
                .attr('x', x)
                .attr('dy', i === 0 ? 0 : lineHeight)
                .text(line);
        });
    };

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const margin = { top: title ? 35 : 15, right: 20, bottom: 15, left: 20 };

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Define arrow marker
        svg.append('defs')
            .append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 8)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', theme.signalPrimary);

        // Draw connections
        connections.forEach(conn => {
            const fromBlock = blockMap.get(conn.from);
            const toBlock = blockMap.get(conn.to);
            if (!fromBlock || !toBlock) return;

            const fromSide = conn.fromSide || 'right';
            const toSide = conn.toSide || 'left';

            let x1 = fromBlock.x, y1 = fromBlock.y;
            let x2 = toBlock.x, y2 = toBlock.y;

            const fw = fromBlock.width || 80;
            const fh = fromBlock.height || 40;
            const tw = toBlock.width || 80;
            const th = toBlock.height || 40;

            if (fromSide === 'right') { x1 += fw; y1 += fh / 2; }
            else if (fromSide === 'left') { y1 += fh / 2; }
            else if (fromSide === 'bottom') { x1 += fw / 2; y1 += fh; }
            else if (fromSide === 'top') { x1 += fw / 2; }

            if (toSide === 'left') { y2 += th / 2; }
            else if (toSide === 'right') { x2 += tw; y2 += th / 2; }
            else if (toSide === 'top') { x2 += tw / 2; }
            else if (toSide === 'bottom') { x2 += tw / 2; y2 += th; }

            const midX = (x1 + x2) / 2;
            const path = d3.path();
            path.moveTo(x1, y1);

            if (fromSide === 'right' && toSide === 'left') {
                path.lineTo(midX, y1);
                path.lineTo(midX, y2);
                path.lineTo(x2, y2);
            } else {
                path.lineTo(x2, y2);
            }

            g.append('path')
                .attr('d', path.toString())
                .attr('fill', 'none')
                .attr('stroke', theme.signalPrimary)
                .attr('stroke-width', 2)
                .attr('marker-end', 'url(#arrowhead)');

            if (conn.label) {
                g.append('text')
                    .attr('x', midX)
                    .attr('y', (y1 + y2) / 2 - 8)
                    .attr('fill', theme.textMuted)
                    .attr('font-size', 11)
                    .attr('font-family', D3_SHARED.fontMono)
                    .attr('text-anchor', 'middle')
                    .text(conn.label);
            }
        });

        // Draw blocks
        blocks.forEach(block => {
            const bWidth = block.width || 80;
            const bHeight = block.height || 40;

            if (block.type === 'sum') {
                g.append('circle')
                    .attr('cx', block.x + bWidth / 2)
                    .attr('cy', block.y + bHeight / 2)
                    .attr('r', bHeight / 2)
                    .attr('fill', theme.surface)
                    .attr('stroke', theme.signalTertiary)
                    .attr('stroke-width', 2);

                g.append('text')
                    .attr('x', block.x + bWidth / 2)
                    .attr('y', block.y + bHeight / 2 + 5)
                    .attr('fill', theme.signalTertiary)
                    .attr('font-size', 18)
                    .attr('font-family', D3_SHARED.fontFamily)
                    .attr('text-anchor', 'middle')
                    .text('Σ');
            } else if (block.type === 'input' || block.type === 'output') {
                renderMultilineText(
                    g,
                    block.label,
                    block.x + bWidth / 2,
                    block.y + bHeight / 2 + 5,
                    14,
                    theme.text,
                    D3_SHARED.fontMono
                );
            } else {
                g.append('rect')
                    .attr('x', block.x)
                    .attr('y', block.y)
                    .attr('width', bWidth)
                    .attr('height', bHeight)
                    .attr('fill', theme.surface)
                    .attr('stroke', theme.signalPrimary)
                    .attr('stroke-width', 2)
                    .attr('rx', 4);

                renderMultilineText(
                    g,
                    block.label,
                    block.x + bWidth / 2,
                    block.y + bHeight / 2 + 5,
                    13,
                    theme.text,
                    D3_SHARED.fontFamily,
                    500
                );
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

    }, [blocks, connections, blockMap, width, height, title, theme]);

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
