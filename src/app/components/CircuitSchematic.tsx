'use client';

/**
 * CIRCUIT SCHEMATIC — Declarative JSON → SVG Circuit Renderer
 * 
 * Renders circuit diagrams from a JSON element list using the existing
 * IEEE-standard SVG components from CircuitSymbols.tsx.
 * 
 * Usage in visuals.json:
 * {
 *   "type": "circuit-schematic",
 *   "title": "Simple Resistor Circuit",
 *   "elements": [
 *     { "component": "resistor", "x": 200, "y": 80, "label": "R", "value": "100Ω" },
 *     { "component": "wire", "x1": 60, "y1": 80, "x2": 170, "y2": 80 },
 *     ...
 *   ]
 * }
 */

import {
    CircuitDiagram,
    Resistor, ResistorIEC, Capacitor, Inductor,
    Diode as DiodeSym, VoltageSource, CurrentSource,
    OpAmp, Switch, Ground, Wire, JunctionNode,
    CurrentArrow, VoltageMark,
} from '@/app/components/diagrams';

// Element descriptor from JSON
interface CircuitElement {
    component: string;
    x?: number;
    y?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    rotation?: number;
    label?: string;
    labelPosition?: 'top' | 'bottom' | 'left' | 'right';
    value?: string;
    color?: string;
    closed?: boolean;
    // Text annotation
    text?: string;
    fontSize?: number;
    fontStyle?: string;
    textAnchor?: string;
}

interface CircuitSchematicProps {
    elements: CircuitElement[];
    width?: number;
    height?: number;
    title?: string;
    description?: string;
}

// Map component name → React component
function renderElement(el: CircuitElement, idx: number) {
    const key = `el-${idx}`;
    const common = {
        x: el.x ?? 0,
        y: el.y ?? 0,
        rotation: el.rotation ?? 0,
        label: el.label,
        labelPosition: el.labelPosition,
        value: el.value,
        color: el.color,
    };

    switch (el.component) {
        case 'resistor':
            return <Resistor key={key} {...common} />;
        case 'resistor-iec':
            return <ResistorIEC key={key} {...common} />;
        case 'capacitor':
            return <Capacitor key={key} {...common} />;
        case 'inductor':
            return <Inductor key={key} {...common} />;
        case 'diode':
            return <DiodeSym key={key} {...common} />;
        case 'voltage-source':
            return <VoltageSource key={key} {...common} />;
        case 'current-source':
            return <CurrentSource key={key} {...common} />;
        case 'op-amp':
            return <OpAmp key={key} {...common} />;
        case 'switch':
            return <Switch key={key} {...common} closed={el.closed} />;
        case 'ground':
            return <Ground key={key} x={common.x} y={common.y} rotation={common.rotation} color={common.color} />;
        case 'wire':
            return <Wire key={key} x1={el.x1 ?? 0} y1={el.y1 ?? 0} x2={el.x2 ?? 0} y2={el.y2 ?? 0} color={el.color} />;
        case 'junction':
            return <JunctionNode key={key} x={common.x} y={common.y} color={common.color} />;
        case 'current-arrow':
            return <CurrentArrow key={key} {...common} />;
        case 'voltage-mark':
            return <VoltageMark key={key} {...common} />;
        case 'text':
            return (
                <text
                    key={key}
                    x={el.x ?? 0}
                    y={el.y ?? 0}
                    fill={el.color || 'var(--sim-text)'}
                    fontSize={el.fontSize ?? 11}
                    fontFamily="var(--font-sans)"
                    fontStyle={el.fontStyle || 'normal'}
                    textAnchor={(el.textAnchor as 'start' | 'middle' | 'end') || 'middle'}
                >
                    {el.text || el.label || ''}
                </text>
            );
        default:
            return null;
    }
}

export default function CircuitSchematic({
    elements,
    width = 400,
    height = 250,
    title,
    description,
}: CircuitSchematicProps) {
    return (
        <div style={{ marginBlock: '1.5rem' }}>
            <CircuitDiagram width={width} height={height} title={title} caption={description}>
                {elements.map((el, i) => renderElement(el, i))}
            </CircuitDiagram>
        </div>
    );
}
