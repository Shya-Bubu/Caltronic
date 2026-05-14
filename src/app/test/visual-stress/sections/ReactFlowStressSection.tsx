'use client';

import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  MarkerType,
  Position,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import VisualCard from './VisualCard';
import styles from './shared.module.css';

interface ReactFlowStressSectionProps {
  onCountUpdate: (count: number) => void;
}

// ─── Node Styling ───
const nodeStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#e2e8f0',
  border: '2px solid #475569',
  borderRadius: '8px',
  padding: '10px 16px',
  fontSize: '13px',
  fontWeight: '600',
  width: 120,
  textAlign: 'center' as const,
};

// ─── Edge factory ───
function makeEdge(
  id: string,
  source: string,
  target: string,
  feedback = false
): Edge {
  return {
    id,
    source,
    target,
    type: 'smoothstep',
    animated: feedback,
    style: { stroke: feedback ? '#fbbf24' : '#4ade80', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: feedback ? '#fbbf24' : '#4ade80',
      width: 15,
      height: 15,
    },
  };
}

// ─── Node factory ───
function makeNode(
  id: string,
  label: string,
  x: number,
  y: number
): Node {
  return {
    id,
    data: { label },
    position: { x, y },
    style: nodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
}

// ─── Diagram 4.1: Feedback Control Loop ───
const d41Nodes: Node[] = [
  makeNode('r', 'R(s)', 0, 80),
  makeNode('sum', 'Σ', 180, 80),
  makeNode('g', 'G(s)', 360, 80),
  makeNode('p', 'P(s)', 540, 80),
  makeNode('y', 'Y(s)', 720, 80),
];
const d41Edges: Edge[] = [
  makeEdge('e1', 'r', 'sum'),
  makeEdge('e2', 'sum', 'g'),
  makeEdge('e3', 'g', 'p'),
  makeEdge('e4', 'p', 'y'),
  makeEdge('e5', 'y', 'sum', true),
];

// ─── Diagram 4.2: PID Controller ───
const d42Nodes: Node[] = [
  makeNode('r', 'R(s)', 0, 80),
  makeNode('sum', 'Σ', 180, 80),
  makeNode('pid', 'PID', 360, 80),
  makeNode('plant', 'Plant G(s)', 540, 80),
  makeNode('y', 'Y(s)', 720, 80),
  makeNode('sensor', 'Sensor H(s)', 360, 240),
];
const d42Edges: Edge[] = [
  makeEdge('e1', 'r', 'sum'),
  makeEdge('e2', 'sum', 'pid'),
  makeEdge('e3', 'pid', 'plant'),
  makeEdge('e4', 'plant', 'y'),
  makeEdge('e5', 'y', 'sensor', true),
  makeEdge('e6', 'sensor', 'sum', true),
];

// ─── Diagram 4.3: Communication System ───
const d43Nodes: Node[] = [
  makeNode('src', 'Source', 0, 80),
  makeNode('enc', 'Encoder', 160, 80),
  makeNode('mod', 'Modulator', 320, 80),
  makeNode('ch', 'Channel', 480, 80),
  makeNode('demod', 'Demodulator', 640, 80),
  makeNode('dec', 'Decoder', 820, 80),
  makeNode('sink', 'Sink', 980, 80),
  makeNode('noise', 'Noise', 480, 240),
];
const d43Edges: Edge[] = [
  makeEdge('e1', 'src', 'enc'),
  makeEdge('e2', 'enc', 'mod'),
  makeEdge('e3', 'mod', 'ch'),
  makeEdge('e4', 'ch', 'demod'),
  makeEdge('e5', 'demod', 'dec'),
  makeEdge('e6', 'dec', 'sink'),
  makeEdge('e7', 'noise', 'ch'),
];

// ─── Diagram 4.4: Signal Processing Pipeline ───
const d44Nodes: Node[] = [
  makeNode('mic', 'Mic', 0, 80),
  makeNode('preamp', 'Pre-amp', 160, 80),
  makeNode('adc', 'ADC', 320, 80),
  makeNode('filter', 'Digital Filter', 480, 80),
  makeNode('fft', 'FFT', 660, 80),
  makeNode('display', 'Display', 820, 80),
  makeNode('coeff', 'Coeff Memory', 480, 240),
];
const d44Edges: Edge[] = [
  makeEdge('e1', 'mic', 'preamp'),
  makeEdge('e2', 'preamp', 'adc'),
  makeEdge('e3', 'adc', 'filter'),
  makeEdge('e4', 'filter', 'fft'),
  makeEdge('e5', 'fft', 'display'),
  makeEdge('e6', 'coeff', 'filter'),
];

// ─── Diagram 4.5: Power Distribution ───
const d45Nodes: Node[] = [
  makeNode('gen', 'Generator', 0, 120),
  makeNode('tx1', 'Step-up TX', 180, 120),
  makeNode('line', 'Transmission', 360, 120),
  makeNode('tx2', 'Step-down TX', 540, 120),
  makeNode('dist', 'Distribution', 720, 120),
  makeNode('ind', 'Industrial', 920, 20),
  makeNode('com', 'Commercial', 920, 120),
  makeNode('res', 'Residential', 920, 220),
];
const d45Edges: Edge[] = [
  makeEdge('e1', 'gen', 'tx1'),
  makeEdge('e2', 'tx1', 'line'),
  makeEdge('e3', 'line', 'tx2'),
  makeEdge('e4', 'tx2', 'dist'),
  makeEdge('e5', 'dist', 'ind'),
  makeEdge('e6', 'dist', 'com'),
  makeEdge('e7', 'dist', 'res'),
];

// ─── Diagram 4.6: Multi-Loop Control ───
const d46Nodes: Node[] = [
  makeNode('r1', 'R1', 0, 80),
  makeNode('s1', 'Σ1', 180, 80),
  makeNode('g1', 'G1', 360, 80),
  makeNode('s2', 'Σ2', 540, 80),
  makeNode('g2', 'G2', 720, 80),
  makeNode('g3', 'G3', 900, 80),
  makeNode('y', 'Y', 1080, 80),
  makeNode('h1', 'H1', 630, 220),
  makeNode('h2', 'H2', 450, 320),
];
const d46Edges: Edge[] = [
  makeEdge('e1', 'r1', 's1'),
  makeEdge('e2', 's1', 'g1'),
  makeEdge('e3', 'g1', 's2'),
  makeEdge('e4', 's2', 'g2'),
  makeEdge('e5', 'g2', 'g3'),
  makeEdge('e6', 'g3', 'y'),
  makeEdge('e7', 'g2', 'h1', true),
  makeEdge('e8', 'h1', 's2', true),
  makeEdge('e9', 'y', 'h2', true),
  makeEdge('e10', 'h2', 's1', true),
];

// ─── All diagrams ───
const diagrams = [
  { title: '4.1 Feedback Control Loop', nodes: d41Nodes, edges: d41Edges },
  { title: '4.2 PID Controller', nodes: d42Nodes, edges: d42Edges },
  { title: '4.3 Communication System', nodes: d43Nodes, edges: d43Edges },
  { title: '4.4 Signal Processing Pipeline', nodes: d44Nodes, edges: d44Edges },
  { title: '4.5 Power Distribution', nodes: d45Nodes, edges: d45Edges },
  { title: '4.6 Multi-Loop Control', nodes: d46Nodes, edges: d46Edges },
];

// ─── Main Section Component ───
export default function ReactFlowStressSection({ onCountUpdate }: ReactFlowStressSectionProps) {
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => onCountUpdate(successCount), 2000);
    return () => clearTimeout(timer);
  }, [successCount, onCountUpdate]);

  const handleSuccess = () => setSuccessCount(prev => prev + 1);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>4. Block Diagrams (6)</h2>
        <p className={styles.sectionSubtitle}>React Flow with manual layout — no ELK</p>
      </div>
      <div className={`${styles.grid} ${styles.grid2}`}>
        {diagrams.map((d, i) => (
          <VisualCard key={i} title={d.title} onSuccess={handleSuccess}>
            <div style={{ width: '100%', height: '350px' }}>
              <ReactFlow
                nodes={d.nodes}
                edges={d.edges}
                fitView
                fitViewOptions={{ padding: 0.25 }}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                proOptions={{ hideAttribution: true }}
                style={{ background: '#0f172a' }}
              />
            </div>
          </VisualCard>
        ))}
      </div>

      {/* Force edge visibility — nuclear CSS override */}
      <style>{`
        .react-flow__edge-path {
          stroke-width: 2px !important;
        }
        .react-flow__arrowhead polyline {
          fill: #4ade80 !important;
          stroke: #4ade80 !important;
        }
      `}</style>
    </section>
  );
}
