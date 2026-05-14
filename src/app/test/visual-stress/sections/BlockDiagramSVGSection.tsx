'use client';

import { useEffect, useState } from 'react';
import VisualCard from './VisualCard';
import styles from './shared.module.css';

interface BlockDiagramSVGSectionProps {
  onCountUpdate: (count: number) => void;
}

const forwardColor = '#4ade80';
const feedbackColor = '#fbbf24';

interface BlockProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
}

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
}

interface PolyArrowProps {
  points: Array<[number, number]>;
  color?: string;
  dashed?: boolean;
}

function arrowHeadPoints(x1: number, y1: number, x2: number, y2: number, size = 8): string {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
  return `${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`;
}

function Block({ x, y, width = 120, height = 52, label }: BlockProps) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill="#1e293b" stroke="#475569" strokeWidth="2" />
      <text x={x + width / 2} y={y + height / 2 + 4} textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600">
        {label}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color = forwardColor, dashed = false }: ArrowProps) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" strokeDasharray={dashed ? '8 5' : undefined} />
      <polygon points={arrowHeadPoints(x1, y1, x2, y2)} fill={color} />
    </g>
  );
}

function PolyArrow({ points, color = feedbackColor, dashed = false }: PolyArrowProps) {
  const pts = points.map(([x, y]) => `${x},${y}`).join(' ');
  const [x1, y1] = points[points.length - 2];
  const [x2, y2] = points[points.length - 1];
  return (
    <g>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeDasharray={dashed ? '8 5' : undefined} />
      <polygon points={arrowHeadPoints(x1, y1, x2, y2)} fill={color} />
    </g>
  );
}

function SumNode({ x, y, size = 44 }: { x: number; y: number; size?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={size / 2} fill="#1e293b" stroke="#475569" strokeWidth="2" />
      <text x={x} y={y + 5} textAnchor="middle" fill="#e2e8f0" fontSize="18" fontWeight="700">Σ</text>
      <text x={x - 14} y={y - 14} textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="700">+</text>
      <text x={x - 14} y={y + 18} textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="700">−</text>
    </g>
  );
}

function Diagram41() {
  return (
    <svg width="100%" viewBox="0 0 850 200" style={{ background: '#0f172a', borderRadius: '4px' }}>
      <g className="wires">
        <Arrow x1={110} y1={60} x2={148} y2={60} />
        <Arrow x1={192} y1={60} x2={250} y2={60} />
        <Arrow x1={370} y1={60} x2={430} y2={60} />
        <Arrow x1={550} y1={60} x2={610} y2={60} />
        <PolyArrow points={[[610, 60], [700, 60], [700, 150], [170, 150], [170, 82]]} dashed />
      </g>
      <g className="blocks">
        <Block x={20} y={34} width={90} label="R(s)" />
        <SumNode x={170} y={60} />
        <Block x={250} y={34} label="G(s)" />
        <Block x={430} y={34} label="P(s)" />
        <Block x={610} y={34} width={90} label="Y(s)" />
      </g>
    </svg>
  );
}

function Diagram42() {
  return (
    <svg width="100%" viewBox="0 0 850 280" style={{ background: '#0f172a', borderRadius: '4px' }}>
      <g className="wires">
        <Arrow x1={110} y1={60} x2={148} y2={60} />
        <Arrow x1={192} y1={60} x2={250} y2={60} />
        <Arrow x1={370} y1={60} x2={430} y2={60} />
        <Arrow x1={550} y1={60} x2={610} y2={60} />
        <PolyArrow points={[[610, 60], [760, 60], [760, 206], [430, 206], [310, 206], [170, 206], [170, 82]]} dashed />
      </g>
      <g className="blocks">
        <Block x={20} y={34} width={90} label="R(s)" />
        <SumNode x={170} y={60} />
        <Block x={250} y={34} label="PID" />
        <Block x={430} y={34} label="Plant" />
        <Block x={610} y={34} width={90} label="Y(s)" />
        <Block x={310} y={180} label="H(s)" />
      </g>
    </svg>
  );
}

function Diagram43() {
  return (
    <svg width="100%" viewBox="0 0 1100 240" style={{ background: '#0f172a', borderRadius: '4px' }}>
      <g className="wires">
        <Arrow x1={140} y1={60} x2={170} y2={60} />
        <Arrow x1={290} y1={60} x2={320} y2={60} />
        <Arrow x1={440} y1={60} x2={470} y2={60} />
        <Arrow x1={600} y1={60} x2={620} y2={60} />
        <Arrow x1={760} y1={60} x2={780} y2={60} />
        <Arrow x1={910} y1={60} x2={940} y2={60} />
        <PolyArrow points={[[490, 160], [490, 120], [535, 120], [535, 87]]} color={forwardColor} />
      </g>
      <g className="blocks">
        <Block x={20} y={34} label="Source" />
        <Block x={170} y={34} label="Encoder" />
        <Block x={320} y={34} label="Modulator" />
        <Block x={470} y={34} width={130} label="Channel" />
        <Block x={620} y={34} width={140} label="Demod" />
        <Block x={780} y={34} label="Decoder" />
        <Block x={940} y={34} label="Sink" />
        <Block x={430} y={160} width={120} label="Noise" />
      </g>
    </svg>
  );
}

function Diagram44() {
  return (
    <svg width="100%" viewBox="0 0 950 240" style={{ background: '#0f172a', borderRadius: '4px' }}>
      <g className="wires">
        <Arrow x1={140} y1={60} x2={160} y2={60} />
        <Arrow x1={280} y1={60} x2={300} y2={60} />
        <Arrow x1={420} y1={60} x2={440} y2={60} />
        <Arrow x1={560} y1={60} x2={590} y2={60} />
        <Arrow x1={710} y1={60} x2={730} y2={60} />
        <PolyArrow points={[[490, 160], [490, 120], [500, 120], [500, 87]]} color={forwardColor} />
      </g>
      <g className="blocks">
        <Block x={20} y={34} label="Mic" />
        <Block x={160} y={34} label="Pre-amp" />
        <Block x={300} y={34} label="ADC" />
        <Block x={440} y={34} label="Filter" />
        <Block x={590} y={34} label="FFT" />
        <Block x={730} y={34} label="Display" />
        <Block x={420} y={160} width={140} label="Coeff Memory" />
      </g>
    </svg>
  );
}

function Diagram45() {
  return (
    <svg width="100%" viewBox="0 0 1050 260" style={{ background: '#0f172a', borderRadius: '4px' }}>
      <g className="wires">
        <Arrow x1={140} y1={100} x2={170} y2={100} />
        <Arrow x1={290} y1={100} x2={340} y2={100} />
        <Arrow x1={470} y1={100} x2={510} y2={100} />
        <Arrow x1={640} y1={100} x2={680} y2={100} />
        <PolyArrow points={[[800, 100], [820, 100], [820, 46], [840, 46]]} color={forwardColor} />
        <PolyArrow points={[[800, 100], [820, 100], [820, 126], [840, 126]]} color={forwardColor} />
        <PolyArrow points={[[800, 100], [820, 100], [820, 226], [840, 226]]} color={forwardColor} />
      </g>
      <g className="blocks">
        <Block x={20} y={74} label="Generator" />
        <Block x={170} y={74} label="Step-up" />
        <Block x={340} y={74} width={130} label="Transmission" />
        <Block x={510} y={74} width={130} label="Step-down" />
        <Block x={680} y={74} width={120} label="Distribution" />
        <Block x={840} y={20} width={160} label="Industrial" />
        <Block x={840} y={100} width={160} label="Commercial" />
        <Block x={840} y={200} width={160} label="Residential" />
      </g>
    </svg>
  );
}

function Diagram46() {
  return (
    <svg width="100%" viewBox="0 0 1200 340" style={{ background: '#0f172a', borderRadius: '4px' }}>
      <g className="wires">
        <Arrow x1={110} y1={60} x2={148} y2={60} />
        <Arrow x1={192} y1={60} x2={230} y2={60} />
        <Arrow x1={340} y1={60} x2={378} y2={60} />
        <Arrow x1={422} y1={60} x2={460} y2={60} />
        <Arrow x1={570} y1={60} x2={620} y2={60} />
        <Arrow x1={730} y1={60} x2={780} y2={60} />
        <PolyArrow points={[[570, 60], [650, 60], [650, 206], [620, 206], [500, 206], [400, 206], [400, 82]]} dashed />
        <PolyArrow points={[[890, 60], [980, 60], [980, 296], [470, 296], [350, 296], [170, 296], [170, 82]]} dashed />
      </g>
      <g className="blocks">
        <Block x={20} y={34} width={90} label="R1" />
        <SumNode x={170} y={60} />
        <Block x={230} y={34} width={110} label="G1" />
        <SumNode x={400} y={60} />
        <Block x={460} y={34} width={110} label="G2" />
        <Block x={620} y={34} width={110} label="G3" />
        <Block x={780} y={34} width={110} label="Y" />
        <Block x={500} y={180} label="H1" />
        <Block x={350} y={270} label="H2" />
      </g>
    </svg>
  );
}

export default function BlockDiagramSVGSection({ onCountUpdate }: BlockDiagramSVGSectionProps) {
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
        <p className={styles.sectionSubtitle}>Pure SVG block diagrams with explicit arrows and feedback routing</p>
      </div>
      <div className={`${styles.grid} ${styles.grid2}`}>
        <VisualCard title="4.1 Feedback Control Loop" onSuccess={handleSuccess}><Diagram41 /></VisualCard>
        <VisualCard title="4.2 PID Controller" onSuccess={handleSuccess}><Diagram42 /></VisualCard>
        <VisualCard title="4.3 Communication System" onSuccess={handleSuccess}><Diagram43 /></VisualCard>
        <VisualCard title="4.4 Signal Processing Pipeline" onSuccess={handleSuccess}><Diagram44 /></VisualCard>
        <VisualCard title="4.5 Power Distribution" onSuccess={handleSuccess}><Diagram45 /></VisualCard>
        <VisualCard title="4.6 Multi-Loop Control" onSuccess={handleSuccess}><Diagram46 /></VisualCard>
      </div>
    </section>
  );
}
