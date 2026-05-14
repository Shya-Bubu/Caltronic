'use client';

import { useEffect, useState } from 'react';
import VisualCard from './VisualCard';
import styles from './shared.module.css';

interface LogicGatesStressSectionProps {
  onCountUpdate: (count: number) => void;
}

// Helper function to calculate logic outputs
const calculateLogic = {
  AND: (a: boolean, b: boolean) => a && b,
  OR: (a: boolean, b: boolean) => a || b,
  NOT: (a: boolean) => !a,
  NAND: (a: boolean, b: boolean) => !(a && b),
  NOR: (a: boolean, b: boolean) => !(a || b),
  XOR: (a: boolean, b: boolean) => a !== b,
  XNOR: (a: boolean, b: boolean) => a === b,
};

interface GateShapeProps {
  x: number;
  y: number; // center y
  width?: number;
  height?: number;
  label?: string;
}

const gateStyle = {
  fill: '#1e293b',
  stroke: '#64748b',
  text: '#94a3b8',
};

function AndGateSVG({ x, y, width = 60, height = 40, label = 'AND' }: GateShapeProps) {
  const top = y - height / 2;
  const bottom = y + height / 2;
  const right = x + width;
  return (
    <g>
      <path
        d={`M ${x} ${top} L ${x} ${bottom} Q ${right} ${bottom} ${right} ${y} Q ${right} ${top} ${x} ${top} Z`}
        fill={gateStyle.fill}
        stroke={gateStyle.stroke}
        strokeWidth="1.5"
      />
      <text x={x + width * 0.35} y={y + 4} fill={gateStyle.text} fontSize="10" fontWeight="500">{label}</text>
    </g>
  );
}

function OrGateSVG({ x, y, width = 60, height = 40, label = 'OR' }: GateShapeProps) {
  const top = y - height / 2;
  const bottom = y + height / 2;
  const right = x + width;
  return (
    <g>
      <path
        d={`M ${x} ${top} Q ${x + width * 0.35} ${y} ${x} ${bottom} Q ${x + width * 0.7} ${bottom} ${right} ${y} Q ${x + width * 0.7} ${top} ${x} ${top} Z`}
        fill={gateStyle.fill}
        stroke={gateStyle.stroke}
        strokeWidth="1.5"
      />
      <text x={x + width * 0.4} y={y + 4} fill={gateStyle.text} fontSize="10" fontWeight="500">{label}</text>
    </g>
  );
}

function XorGateSVG({ x, y, width = 60, height = 40, label = 'XOR' }: GateShapeProps) {
  const top = y - height / 2;
  const bottom = y + height / 2;
  return (
    <g>
      <path
        d={`M ${x - 8} ${top} Q ${x + width * 0.2} ${y} ${x - 8} ${bottom}`}
        fill="none"
        stroke={gateStyle.stroke}
        strokeWidth="1.5"
      />
      <OrGateSVG x={x} y={y} width={width} height={height} label={label} />
    </g>
  );
}

function NandGateSVG({ x, y, width = 60, height = 40, label = 'NAND' }: GateShapeProps) {
  return (
    <g>
      <AndGateSVG x={x} y={y} width={width} height={height} label={label} />
      <circle cx={x + width + 4} cy={y} r="4" fill="none" stroke={gateStyle.stroke} strokeWidth="1.5" />
    </g>
  );
}

function NorGateSVG({ x, y, width = 60, height = 40, label = 'NOR' }: GateShapeProps) {
  return (
    <g>
      <OrGateSVG x={x} y={y} width={width} height={height} label={label} />
      <circle cx={x + width + 4} cy={y} r="4" fill="none" stroke={gateStyle.stroke} strokeWidth="1.5" />
    </g>
  );
}

function NotGateSVG({ x, y, width = 36, height = 30, label = 'NOT' }: GateShapeProps) {
  const top = y - height / 2;
  const bottom = y + height / 2;
  const tipX = x + width - 8;
  return (
    <g>
      <path d={`M ${x} ${top} L ${x} ${bottom} L ${tipX} ${y} Z`} fill={gateStyle.fill} stroke={gateStyle.stroke} strokeWidth="1.5" />
      <circle cx={tipX + 4} cy={y} r="4" fill="none" stroke={gateStyle.stroke} strokeWidth="1.5" />
      <text x={x + 6} y={y + 4} fill={gateStyle.text} fontSize="8" fontWeight="500">{label}</text>
    </g>
  );
}

export default function LogicGatesStressSection({ onCountUpdate }: LogicGatesStressSectionProps) {
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCountUpdate(successCount);
    }, 1500);
    return () => clearTimeout(timer);
  }, [successCount, onCountUpdate]);

  const handleSuccess = () => setSuccessCount(prev => prev + 1);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>2. Logic Gates (10)</h2>
        <p className={styles.sectionSubtitle}>Custom SVG interactive logic gates</p>
      </div>
      <div className={`${styles.grid} ${styles.grid3}`}>
        
        {/* 2.1 - All Basic Gates */}
        <VisualCard title="2.1 All Basic Gates" onSuccess={handleSuccess}>
          <AllBasicGates />
        </VisualCard>

        {/* 2.2 - Half Adder */}
        <VisualCard title="2.2 Half Adder" onSuccess={handleSuccess}>
          <HalfAdder />
        </VisualCard>

        {/* 2.3 - Full Adder */}
        <VisualCard title="2.3 Full Adder" onSuccess={handleSuccess}>
          <FullAdder />
        </VisualCard>

        {/* 2.4 - SR Latch */}
        <VisualCard title="2.4 SR Latch (NOR)" onSuccess={handleSuccess}>
          <SRLatch />
        </VisualCard>

        {/* 2.5 - D Flip-Flop */}
        <VisualCard title="2.5 D Flip-Flop" onSuccess={handleSuccess}>
          <DFlipFlop />
        </VisualCard>

        {/* 2.6 - 2-to-1 Multiplexer */}
        <VisualCard title="2.6 2-to-1 Multiplexer" onSuccess={handleSuccess}>
          <Multiplexer2to1 />
        </VisualCard>

        {/* 2.7 - 4-to-1 Multiplexer */}
        <VisualCard title="2.7 4-to-1 Multiplexer" onSuccess={handleSuccess}>
          <Multiplexer4to1 />
        </VisualCard>

        {/* 2.8 - 2-to-4 Decoder */}
        <VisualCard title="2.8 2-to-4 Decoder" onSuccess={handleSuccess}>
          <Decoder2to4 />
        </VisualCard>

        {/* 2.9 - 4-bit Ripple Carry Adder */}
        <VisualCard title="2.9 4-bit Ripple Carry Adder" onSuccess={handleSuccess}>
          <RippleCarryAdder />
        </VisualCard>

        {/* 2.10 - Simple ALU */}
        <VisualCard title="2.10 Simple 2-bit ALU" onSuccess={handleSuccess}>
          <SimpleALU />
        </VisualCard>

      </div>
    </section>
  );
}

// Component implementations (simplified for space)
function AllBasicGates() {
  const [inputs, setInputs] = useState({ a: false, b: false });
  
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setInputs(prev => ({ ...prev, a: !prev.a }))} 
                style={{ padding: '4px 12px', background: inputs.a ? '#4ade80' : '#334155', 
                        color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          A: {inputs.a ? '1' : '0'}
        </button>
        <button onClick={() => setInputs(prev => ({ ...prev, b: !prev.b }))} 
                style={{ padding: '4px 12px', background: inputs.b ? '#4ade80' : '#334155', 
                        color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          B: {inputs.b ? '1' : '0'}
        </button>
      </div>
      <svg width="300" height="400" viewBox="0 0 300 400" style={{ background: '#0f172a', borderRadius: '4px' }}>
        {/* AND */}
        <text x="10" y="30" fill="#e2e8f0" fontSize="12">AND</text>
        <path d="M 60 20 L 60 40 Q 60 40 80 40 Q 100 40 100 30 Q 100 20 80 20 Q 60 20 60 20 Z" 
              fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="110" cy="30" r="6" fill={calculateLogic.AND(inputs.a, inputs.b) ? '#4ade80' : '#334155'} />
        
        {/* OR */}
        <text x="10" y="80" fill="#e2e8f0" fontSize="12">OR</text>
        <path d="M 60 65 Q 70 75 60 85 Q 90 85 100 75 Q 90 65 60 65 Z" 
              fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="110" cy="75" r="6" fill={calculateLogic.OR(inputs.a, inputs.b) ? '#4ade80' : '#334155'} />
        
        {/* NOT */}
        <text x="10" y="125" fill="#e2e8f0" fontSize="12">NOT</text>
        <path d="M 60 110 L 60 130 L 90 120 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="95" cy="120" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
        <circle cx="110" cy="120" r="6" fill={calculateLogic.NOT(inputs.a) ? '#4ade80' : '#334155'} />
        
        {/* NAND */}
        <text x="10" y="170" fill="#e2e8f0" fontSize="12">NAND</text>
        <path d="M 60 155 L 60 175 Q 60 175 80 175 Q 100 175 100 165 Q 100 155 80 155 Q 60 155 60 155 Z" 
              fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="105" cy="165" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
        <circle cx="120" cy="165" r="6" fill={calculateLogic.NAND(inputs.a, inputs.b) ? '#4ade80' : '#334155'} />
        
        {/* NOR */}
        <text x="10" y="215" fill="#e2e8f0" fontSize="12">NOR</text>
        <path d="M 60 200 Q 70 210 60 220 Q 90 220 100 210 Q 90 200 60 200 Z" 
              fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="105" cy="210" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
        <circle cx="120" cy="210" r="6" fill={calculateLogic.NOR(inputs.a, inputs.b) ? '#4ade80' : '#334155'} />
        
        {/* XOR */}
        <text x="10" y="260" fill="#e2e8f0" fontSize="12">XOR</text>
        <path d="M 55 245 Q 65 255 55 265" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <path d="M 60 245 Q 70 255 60 265 Q 90 265 100 255 Q 90 245 60 245 Z" 
              fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="110" cy="255" r="6" fill={calculateLogic.XOR(inputs.a, inputs.b) ? '#4ade80' : '#334155'} />
        
        {/* XNOR */}
        <text x="10" y="305" fill="#e2e8f0" fontSize="12">XNOR</text>
        <path d="M 55 290 Q 65 300 55 310" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <path d="M 60 290 Q 70 300 60 310 Q 90 310 100 300 Q 90 290 60 290 Z" 
              fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="105" cy="300" r="4" fill="none" stroke="#64748b" strokeWidth="2" />
        <circle cx="120" cy="300" r="6" fill={calculateLogic.XNOR(inputs.a, inputs.b) ? '#4ade80' : '#334155'} />
      </svg>
    </div>
  );
}

function HalfAdder() {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const sum = inputA !== inputB;
  const carry = inputA && inputB;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setInputA(!inputA)} 
                style={{ padding: '4px 12px', background: inputA ? '#4ade80' : '#334155', 
                        color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          A: {inputA ? '1' : '0'}
        </button>
        <button onClick={() => setInputB(!inputB)} 
                style={{ padding: '4px 12px', background: inputB ? '#4ade80' : '#334155', 
                        color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          B: {inputB ? '1' : '0'}
        </button>
      </div>
      <svg width="300" height="200" viewBox="0 0 300 200" style={{ background: '#0f172a', borderRadius: '4px' }}>
        <text x="10" y="50" fill="#e2e8f0" fontSize="14">A</text>
        <line x1="30" y1="45" x2="80" y2="45" stroke={inputA ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <text x="10" y="120" fill="#e2e8f0" fontSize="14">B</text>
        <line x1="30" y1="115" x2="80" y2="115" stroke={inputB ? '#4ade80' : '#64748b'} strokeWidth="2" />
        
        {/* XOR gate */}
        <path d="M 75 30 Q 85 45 75 60" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <path d="M 80 30 Q 90 45 80 60 Q 130 60 150 45 Q 130 30 80 30 Z" 
              fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <text x="105" y="50" fill="#e2e8f0" fontSize="11">XOR</text>
        <line x1="150" y1="45" x2="250" y2="45" stroke={sum ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <text x="260" y="50" fill="#e2e8f0" fontSize="14">Sum</text>
        
        {/* AND gate */}
        <path d="M 80 100 L 80 130 Q 80 130 110 130 Q 150 130 150 115 Q 150 100 110 100 Q 80 100 80 100 Z" 
              fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <text x="105" y="120" fill="#e2e8f0" fontSize="11">AND</text>
        <line x1="150" y1="115" x2="250" y2="115" stroke={carry ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <text x="260" y="120" fill="#e2e8f0" fontSize="14">Carry</text>
      </svg>
    </div>
  );
}

// Simplified placeholders for remaining components
function FullAdder() {
  const [inputs, setInputs] = useState({ a: false, b: false, cin: false });
  const axorb = inputs.a !== inputs.b;
  const sum = axorb !== inputs.cin;
  const and1 = inputs.a && inputs.b;
  const and2 = axorb && inputs.cin;
  const cout = and1 || and2;

  const wire = (on: boolean) => on ? '#4ade80' : '#475569';

  // Truth table (A B Cin | Sum Cout):
  // 0 0 0 | 0 0
  // 0 0 1 | 1 0
  // 0 1 0 | 1 0
  // 0 1 1 | 0 1
  // 1 0 0 | 1 0
  // 1 0 1 | 0 1
  // 1 1 0 | 0 1
  // 1 1 1 | 1 1
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {(['a', 'b', 'cin'] as const).map(k => (
          <button key={k} onClick={() => setInputs(p => ({ ...p, [k]: !p[k] }))}
            style={{ padding: '3px 10px', background: inputs[k] ? '#4ade80' : '#334155',
                     color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
            {k.toUpperCase()}: {inputs[k] ? '1' : '0'}
          </button>
        ))}
        <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: 'auto' }}>
          Sum: {sum ? '1' : '0'} | Cout: {cout ? '1' : '0'}
        </span>
      </div>
      <svg width="100%" viewBox="0 0 700 260" style={{ background: '#0f172a', borderRadius: '4px' }}>
        <g className="wires">
          {/* A branch to XOR1 and AND1 */}
          <line x1="20" y1="40" x2="80" y2="40" stroke={wire(inputs.a)} strokeWidth="2" />
          <line x1="80" y1="40" x2="80" y2="38" stroke={wire(inputs.a)} strokeWidth="2" />
          <line x1="80" y1="38" x2="140" y2="38" stroke={wire(inputs.a)} strokeWidth="2" />
          <line x1="80" y1="40" x2="80" y2="148" stroke={wire(inputs.a)} strokeWidth="2" />
          <line x1="80" y1="148" x2="140" y2="148" stroke={wire(inputs.a)} strokeWidth="2" />

          {/* B branch to XOR1 and AND1 */}
          <line x1="20" y1="80" x2="100" y2="80" stroke={wire(inputs.b)} strokeWidth="2" />
          <line x1="100" y1="80" x2="100" y2="62" stroke={wire(inputs.b)} strokeWidth="2" />
          <line x1="100" y1="62" x2="140" y2="62" stroke={wire(inputs.b)} strokeWidth="2" />
          <line x1="100" y1="80" x2="100" y2="172" stroke={wire(inputs.b)} strokeWidth="2" />
          <line x1="100" y1="172" x2="140" y2="172" stroke={wire(inputs.b)} strokeWidth="2" />

          {/* XOR1 output branch to XOR2 and AND2 */}
          <line x1="220" y1="50" x2="260" y2="50" stroke={wire(axorb)} strokeWidth="2" />
          <line x1="260" y1="50" x2="260" y2="48" stroke={wire(axorb)} strokeWidth="2" />
          <line x1="260" y1="48" x2="300" y2="48" stroke={wire(axorb)} strokeWidth="2" />
          <line x1="260" y1="50" x2="260" y2="158" stroke={wire(axorb)} strokeWidth="2" />
          <line x1="260" y1="158" x2="300" y2="158" stroke={wire(axorb)} strokeWidth="2" />

          {/* Cin branch to XOR2 and AND2 */}
          <line x1="20" y1="220" x2="280" y2="220" stroke={wire(inputs.cin)} strokeWidth="2" />
          <line x1="280" y1="220" x2="280" y2="72" stroke={wire(inputs.cin)} strokeWidth="2" />
          <line x1="280" y1="72" x2="300" y2="72" stroke={wire(inputs.cin)} strokeWidth="2" />
          <line x1="280" y1="220" x2="280" y2="182" stroke={wire(inputs.cin)} strokeWidth="2" />
          <line x1="280" y1="182" x2="300" y2="182" stroke={wire(inputs.cin)} strokeWidth="2" />

          {/* Sum output */}
          <line x1="380" y1="60" x2="640" y2="60" stroke={wire(sum)} strokeWidth="2" />

          {/* AND paths to OR */}
          <line x1="220" y1="160" x2="420" y2="160" stroke={wire(and1)} strokeWidth="2" />
          <line x1="420" y1="160" x2="420" y2="148" stroke={wire(and1)} strokeWidth="2" />
          <line x1="420" y1="148" x2="460" y2="148" stroke={wire(and1)} strokeWidth="2" />
          <line x1="380" y1="170" x2="440" y2="170" stroke={wire(and2)} strokeWidth="2" />
          <line x1="440" y1="170" x2="440" y2="172" stroke={wire(and2)} strokeWidth="2" />
          <line x1="440" y1="172" x2="460" y2="172" stroke={wire(and2)} strokeWidth="2" />

          {/* Cout output */}
          <line x1="540" y1="160" x2="640" y2="160" stroke={wire(cout)} strokeWidth="2" />
        </g>
        <g className="gates">
          <XorGateSVG x={140} y={50} width={80} height={48} />
          <XorGateSVG x={300} y={60} width={80} height={48} />
          <AndGateSVG x={140} y={160} width={80} height={48} />
          <AndGateSVG x={300} y={170} width={80} height={48} />
          <OrGateSVG x={460} y={160} width={80} height={48} />
        </g>
        <g className="labels">
          <text x="8" y="44" fill="#e2e8f0" fontSize="12" fontWeight="600">A</text>
          <text x="8" y="84" fill="#e2e8f0" fontSize="12" fontWeight="600">B</text>
          <text x="0" y="224" fill="#e2e8f0" fontSize="12" fontWeight="600">Cin</text>
          <text x="648" y="64" fill="#e2e8f0" fontSize="12" fontWeight="600">Sum</text>
          <text x="648" y="164" fill="#e2e8f0" fontSize="12" fontWeight="600">Cout</text>
          <circle cx="632" cy="60" r="6" fill={sum ? '#4ade80' : '#334155'} />
          <circle cx="632" cy="160" r="6" fill={cout ? '#4ade80' : '#334155'} />
          <circle cx="80" cy="40" r="3" fill="#4ade80" />
          <circle cx="100" cy="80" r="3" fill="#4ade80" />
          <circle cx="260" cy="50" r="3" fill="#4ade80" />
          <circle cx="280" cy="220" r="3" fill="#4ade80" />
        </g>
      </svg>
    </div>
  );
}

function SRLatch() {
  const [s, setS] = useState(false);
  const [r, setR] = useState(false);
  const q = s && !r;
  const qBar = r && !s;

  const wire = (on: boolean) => on ? '#4ade80' : '#475569';

  // Truth table (S R | Q(next) Q̄(next)):
  // 0 0 | hold    hold
  // 0 1 | 0       1
  // 1 0 | 1       0
  // 1 1 | invalid invalid
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => { setS(!s); if (!s) setR(false); }}
          style={{ padding: '3px 10px', background: s ? '#4ade80' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
          S: {s ? '1' : '0'}
        </button>
        <button onClick={() => { setR(!r); if (!r) setS(false); }}
          style={{ padding: '3px 10px', background: r ? '#4ade80' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
          R: {r ? '1' : '0'}
        </button>
        <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: 'auto' }}>Q: {q ? '1' : '0'} | Q̄: {qBar ? '1' : '0'}</span>
      </div>
      <svg width="100%" viewBox="0 0 520 260" style={{ background: '#0f172a', borderRadius: '4px' }}>
        <g className="wires">
          <line x1="20" y1="38" x2="200" y2="38" stroke={wire(s)} strokeWidth="2" />
          <line x1="20" y1="172" x2="200" y2="172" stroke={wire(r)} strokeWidth="2" />
          <line x1="284" y1="50" x2="470" y2="50" stroke={wire(q)} strokeWidth="2" />
          <line x1="284" y1="160" x2="470" y2="160" stroke={wire(qBar)} strokeWidth="2" />

          {/* Q -> NOR2 input (right, down, left, up) */}
          <line x1="284" y1="50" x2="330" y2="50" stroke="#22d3ee" strokeWidth="2" />
          <line x1="330" y1="50" x2="330" y2="190" stroke="#22d3ee" strokeWidth="2" />
          <line x1="330" y1="190" x2="220" y2="190" stroke="#22d3ee" strokeWidth="2" />
          <line x1="220" y1="190" x2="220" y2="148" stroke="#22d3ee" strokeWidth="2" />
          <line x1="220" y1="148" x2="200" y2="148" stroke="#22d3ee" strokeWidth="2" />

          {/* Q̄ -> NOR1 input (right, up, left, down) */}
          <line x1="284" y1="160" x2="360" y2="160" stroke="#fbbf24" strokeWidth="2" />
          <line x1="360" y1="160" x2="360" y2="90" stroke="#fbbf24" strokeWidth="2" />
          <line x1="360" y1="90" x2="240" y2="90" stroke="#fbbf24" strokeWidth="2" />
          <line x1="240" y1="90" x2="240" y2="62" stroke="#fbbf24" strokeWidth="2" />
          <line x1="240" y1="62" x2="200" y2="62" stroke="#fbbf24" strokeWidth="2" />
        </g>
        <g className="gates">
          <NorGateSVG x={200} y={50} width={80} height={48} />
          <NorGateSVG x={200} y={160} width={80} height={48} />
        </g>
        <g className="labels">
          <text x="6" y="42" fill="#e2e8f0" fontSize="12" fontWeight="600">S</text>
          <text x="6" y="176" fill="#e2e8f0" fontSize="12" fontWeight="600">R</text>
          <text x="476" y="54" fill="#e2e8f0" fontSize="12" fontWeight="600">Q</text>
          <text x="476" y="164" fill="#e2e8f0" fontSize="12" fontWeight="600">Q̄</text>
          <circle cx="460" cy="50" r="6" fill={q ? '#4ade80' : '#334155'} />
          <circle cx="460" cy="160" r="6" fill={qBar ? '#4ade80' : '#334155'} />
        </g>
      </svg>
    </div>
  );
}

function DFlipFlop() {
  const [d, setD] = useState(false);
  const [clk, setClk] = useState(false);
  const [q, setQ] = useState(false);

  const handleClk = () => {
    const newClk = !clk;
    setClk(newClk);
    if (newClk) setQ(d); // Rising edge capture
  };

  const wire = (on: boolean) => on ? '#4ade80' : '#475569';

  // Truth table (on CLK rising edge):
  // D CLK↑ | Q(next)
  // 0  ↑   | 0
  // 1  ↑   | 1
  // (no rising edge => hold previous Q)
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setD(!d)}
          style={{ padding: '3px 10px', background: d ? '#4ade80' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
          D: {d ? '1' : '0'}
        </button>
        <button onClick={handleClk}
          style={{ padding: '3px 10px', background: clk ? '#fbbf24' : '#334155', color: clk ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
          CLK: {clk ? '↑' : '↓'}
        </button>
        <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: 'auto' }}>Q: {q ? '1' : '0'}</span>
      </div>
      <svg width="100%" viewBox="0 0 700 300" style={{ background: '#0f172a', borderRadius: '4px' }}>
        <g className="wires">
          {/* D -> NOT and NAND1 */}
          <line x1="30" y1="150" x2="70" y2="150" stroke={wire(d)} strokeWidth="2" />
          <line x1="70" y1="150" x2="100" y2="150" stroke={wire(d)} strokeWidth="2" />
          <line x1="70" y1="150" x2="70" y2="50" stroke={wire(d)} strokeWidth="2" />
          <line x1="70" y1="50" x2="220" y2="50" stroke={wire(d)} strokeWidth="2" />

          {/* D̄ from NOT -> NAND2 */}
          <line x1="136" y1="150" x2="170" y2="150" stroke={wire(!d)} strokeWidth="2" />
          <line x1="170" y1="150" x2="170" y2="180" stroke={wire(!d)} strokeWidth="2" />
          <line x1="170" y1="180" x2="220" y2="180" stroke={wire(!d)} strokeWidth="2" />

          {/* CLK fan-out to NAND1 and NAND2 */}
          <line x1="30" y1="250" x2="190" y2="250" stroke={wire(clk)} strokeWidth="2" />
          <line x1="190" y1="250" x2="190" y2="70" stroke={wire(clk)} strokeWidth="2" />
          <line x1="190" y1="70" x2="220" y2="70" stroke={wire(clk)} strokeWidth="2" />
          <line x1="190" y1="250" x2="190" y2="200" stroke={wire(clk)} strokeWidth="2" />
          <line x1="190" y1="200" x2="220" y2="200" stroke={wire(clk)} strokeWidth="2" />

          {/* NAND1/NAND2 outputs to NAND3/NAND4 */}
          <line x1="294" y1="60" x2="350" y2="60" stroke={wire(d && clk)} strokeWidth="2" />
          <line x1="350" y1="60" x2="350" y2="50" stroke={wire(d && clk)} strokeWidth="2" />
          <line x1="350" y1="50" x2="430" y2="50" stroke={wire(d && clk)} strokeWidth="2" />
          <line x1="294" y1="190" x2="350" y2="190" stroke={wire((!d) && clk)} strokeWidth="2" />
          <line x1="350" y1="190" x2="350" y2="200" stroke={wire((!d) && clk)} strokeWidth="2" />
          <line x1="350" y1="200" x2="430" y2="200" stroke={wire((!d) && clk)} strokeWidth="2" />

          {/* Cross-coupling NAND3 <-> NAND4 (routed around) */}
          <line x1="494" y1="60" x2="560" y2="60" stroke={wire(q)} strokeWidth="2" />
          <line x1="560" y1="60" x2="560" y2="180" stroke={wire(q)} strokeWidth="2" />
          <line x1="560" y1="180" x2="430" y2="180" stroke={wire(q)} strokeWidth="2" />
          <line x1="494" y1="190" x2="590" y2="190" stroke={wire(!q)} strokeWidth="2" />
          <line x1="590" y1="190" x2="590" y2="70" stroke={wire(!q)} strokeWidth="2" />
          <line x1="590" y1="70" x2="430" y2="70" stroke={wire(!q)} strokeWidth="2" />

          {/* Outputs */}
          <line x1="494" y1="60" x2="640" y2="60" stroke={wire(q)} strokeWidth="2" />
          <line x1="494" y1="190" x2="640" y2="190" stroke={wire(!q)} strokeWidth="2" />
        </g>
        <g className="gates">
          <NotGateSVG x={100} y={150} />
          <NandGateSVG x={220} y={60} />
          <NandGateSVG x={220} y={190} />
          <NandGateSVG x={430} y={60} />
          <NandGateSVG x={430} y={190} />
        </g>
        <g className="labels">
          <text x="10" y="154" fill="#e2e8f0" fontSize="12" fontWeight="600">D</text>
          <text x="2" y="254" fill="#e2e8f0" fontSize="12" fontWeight="600">CLK</text>
          <text x="648" y="64" fill="#e2e8f0" fontSize="12" fontWeight="600">Q</text>
          <text x="648" y="194" fill="#e2e8f0" fontSize="12" fontWeight="600">Q̄</text>
          <circle cx="632" cy="60" r="6" fill={q ? '#4ade80' : '#334155'} />
          <circle cx="632" cy="190" r="6" fill={!q ? '#4ade80' : '#334155'} />
          <circle cx="70" cy="150" r="3" fill="#4ade80" />
          <circle cx="190" cy="250" r="3" fill="#4ade80" />
        </g>
      </svg>
    </div>
  );
}

function Multiplexer2to1() {
  const [s, setS] = useState(false);
  const [i0, setI0] = useState(false);
  const [i1, setI1] = useState(true);
  const y = s ? i1 : i0;
  const wire = (on: boolean) => on ? '#4ade80' : '#475569';

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => setS(!s)} style={{ padding: '3px 8px', background: s ? '#fbbf24' : '#334155', color: s ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>S: {s ? '1' : '0'}</button>
        <button onClick={() => setI0(!i0)} style={{ padding: '3px 8px', background: i0 ? '#4ade80' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>I0: {i0 ? '1' : '0'}</button>
        <button onClick={() => setI1(!i1)} style={{ padding: '3px 8px', background: i1 ? '#4ade80' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>I1: {i1 ? '1' : '0'}</button>
        <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: 'auto' }}>Y: {y ? '1' : '0'}</span>
      </div>
      <svg width="100%" viewBox="0 0 420 220" style={{ background: '#0f172a', borderRadius: '4px' }}>
        <g className="wires">
          <line x1="40" y1="70" x2="180" y2="70" stroke={wire(i0)} strokeWidth="2" />
          <line x1="40" y1="150" x2="180" y2="150" stroke={wire(i1)} strokeWidth="2" />
          <line x1="230" y1="30" x2="230" y2="50" stroke={wire(s)} strokeWidth="2" />
          <line x1="260" y1="110" x2="360" y2="110" stroke={wire(y)} strokeWidth="2" />
        </g>
        <g className="gates">
          <polygon points="180,50 260,80 260,140 180,170" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        </g>
        <g className="labels">
          <text x="18" y="74" fill="#e2e8f0" fontSize="11">I0</text>
          <text x="18" y="154" fill="#e2e8f0" fontSize="11">I1</text>
          <text x="222" y="24" fill="#fbbf24" fontSize="11">S</text>
          <text x="206" y="114" fill="#e2e8f0" fontSize="13" fontWeight="700">MUX</text>
          <text x="212" y="129" fill="#94a3b8" fontSize="10">2:1</text>
          <text x="368" y="114" fill="#e2e8f0" fontSize="11">Y</text>
          <circle cx="360" cy="110" r="6" fill={y ? '#4ade80' : '#334155'} />
        </g>
      </svg>
    </div>
  );
}

function Multiplexer4to1() {
  const [s, setS] = useState(0);
  const [inputs, setInputs] = useState([false, true, false, true]);
  const y = inputs[s];
  const wire = (on: boolean) => on ? '#4ade80' : '#475569';

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        <button onClick={() => setS((s + 1) % 4)} style={{ padding: '3px 8px', background: '#fbbf24', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>S: {s}</button>
        {inputs.map((v, i) => (
          <button key={i} onClick={() => setInputs(p => p.map((x, j) => j === i ? !x : x))}
            style={{ padding: '3px 6px', background: v ? '#4ade80' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>
            I{i}: {v ? '1' : '0'}
          </button>
        ))}
        <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: 'auto' }}>Y: {y ? '1' : '0'}</span>
      </div>
      <svg width="100%" viewBox="0 0 500 280" style={{ background: '#0f172a', borderRadius: '4px' }}>
        <g className="wires">
          {inputs.map((v, i) => (
            <line key={i} x1="40" y1={70 + i * 40} x2="220" y2={70 + i * 40} stroke={wire(v)} strokeWidth="2" />
          ))}
          <line x1="275" y1="20" x2="275" y2="40" stroke="#fbbf24" strokeWidth="2" />
          <line x1="330" y1="140" x2="440" y2="140" stroke={wire(y)} strokeWidth="2" />
        </g>
        <g className="gates">
          <polygon points="220,40 330,70 330,210 220,240" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        </g>
        <g className="labels">
          {inputs.map((_, i) => (
            <g key={i}>
              <text x="16" y={74 + i * 40} fill="#e2e8f0" fontSize="10">I{i}</text>
              {s === i && <circle cx="212" cy={70 + i * 40} r="3" fill="#fbbf24" />}
            </g>
          ))}
          <text x="266" y="16" fill="#fbbf24" fontSize="10">S={s}</text>
          <text x="258" y="138" fill="#e2e8f0" fontSize="13" fontWeight="700">MUX</text>
          <text x="264" y="154" fill="#94a3b8" fontSize="10">4:1</text>
          <text x="448" y="144" fill="#e2e8f0" fontSize="11">Y</text>
          <circle cx="440" cy="140" r="6" fill={y ? '#4ade80' : '#334155'} />
        </g>
      </svg>
    </div>
  );
}

function Decoder2to4() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const sel = (b ? 2 : 0) + (a ? 1 : 0);
  const outputs = [0, 1, 2, 3].map(i => i === sel);
  const wire = (on: boolean) => on ? '#4ade80' : '#475569';

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setA(!a)} style={{ padding: '3px 10px', background: a ? '#4ade80' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>A0: {a ? '1' : '0'}</button>
        <button onClick={() => setB(!b)} style={{ padding: '3px 10px', background: b ? '#4ade80' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>A1: {b ? '1' : '0'}</button>
        <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: 'auto' }}>Active: Y{sel}</span>
      </div>
      <svg width="100%" viewBox="0 0 640 240" style={{ background: '#0f172a', borderRadius: '4px' }}>
        <g className="wires">
          {/* A and B input buses */}
          <line x1="40" y1="70" x2="330" y2="70" stroke={wire(a)} strokeWidth="2" />
          <line x1="40" y1="170" x2="340" y2="170" stroke={wire(b)} strokeWidth="2" />

          {/* Inverted rails from NOT gates */}
          <line x1="202" y1="70" x2="260" y2="70" stroke={wire(!a)} strokeWidth="2" />
          <line x1="202" y1="170" x2="230" y2="170" stroke={wire(!b)} strokeWidth="2" />

          {/* Y0 = A'·B' */}
          <line x1="230" y1="170" x2="230" y2="42" stroke={wire(!b)} strokeWidth="2" />
          <line x1="230" y1="42" x2="360" y2="42" stroke={wire(!b)} strokeWidth="2" />
          <line x1="260" y1="70" x2="260" y2="58" stroke={wire(!a)} strokeWidth="2" />
          <line x1="260" y1="58" x2="360" y2="58" stroke={wire(!a)} strokeWidth="2" />

          {/* Y1 = A'·B */}
          <line x1="260" y1="70" x2="260" y2="92" stroke={wire(!a)} strokeWidth="2" />
          <line x1="260" y1="92" x2="360" y2="92" stroke={wire(!a)} strokeWidth="2" />
          <line x1="300" y1="170" x2="300" y2="108" stroke={wire(b)} strokeWidth="2" />
          <line x1="300" y1="108" x2="360" y2="108" stroke={wire(b)} strokeWidth="2" />

          {/* Y2 = A·B' */}
          <line x1="280" y1="70" x2="280" y2="142" stroke={wire(a)} strokeWidth="2" />
          <line x1="280" y1="142" x2="360" y2="142" stroke={wire(a)} strokeWidth="2" />
          <line x1="240" y1="170" x2="240" y2="158" stroke={wire(!b)} strokeWidth="2" />
          <line x1="240" y1="158" x2="360" y2="158" stroke={wire(!b)} strokeWidth="2" />

          {/* Y3 = A·B */}
          <line x1="320" y1="70" x2="320" y2="192" stroke={wire(a)} strokeWidth="2" />
          <line x1="320" y1="192" x2="360" y2="192" stroke={wire(a)} strokeWidth="2" />
          <line x1="340" y1="170" x2="340" y2="208" stroke={wire(b)} strokeWidth="2" />
          <line x1="340" y1="208" x2="360" y2="208" stroke={wire(b)} strokeWidth="2" />

          {outputs.map((on, i) => (
            <line key={i} x1="430" y1={50 + i * 50} x2="560" y2={50 + i * 50} stroke={wire(on)} strokeWidth="2" />
          ))}
        </g>
        <g className="gates">
          <NotGateSVG x={170} y={70} />
          <NotGateSVG x={170} y={170} />
          <AndGateSVG x={360} y={50} width={70} height={32} />
          <AndGateSVG x={360} y={100} width={70} height={32} />
          <AndGateSVG x={360} y={150} width={70} height={32} />
          <AndGateSVG x={360} y={200} width={70} height={32} />
        </g>
        <g className="labels">
          <text x="16" y="74" fill="#e2e8f0" fontSize="11">A0</text>
          <text x="16" y="174" fill="#e2e8f0" fontSize="11">A1</text>
          {outputs.map((on, i) => (
            <g key={i}>
              <circle cx="560" cy={50 + i * 50} r="5" fill={on ? '#4ade80' : '#334155'} />
              <text x="570" y={54 + i * 50} fill="#e2e8f0" fontSize="10">Y{i}</text>
            </g>
          ))}
          <circle cx="170" cy="70" r="3" fill="#4ade80" />
          <circle cx="170" cy="170" r="3" fill="#4ade80" />
          <circle cx="202" cy="70" r="3" fill="#4ade80" />
          <circle cx="202" cy="170" r="3" fill="#4ade80" />
        </g>
      </svg>
    </div>
  );
}

function RippleCarryAdder() {
  const [a, setA] = useState(5); // 4-bit: 0101
  const [b, setB] = useState(3); // 4-bit: 0011
  const sum = a + b;
  const wire = (on: boolean) => on ? '#4ade80' : '#475569';

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => setA((a + 1) % 16)} style={{ padding: '3px 8px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>A: {a.toString(2).padStart(4, '0')} ({a})</button>
        <button onClick={() => setB((b + 1) % 16)} style={{ padding: '3px 8px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>B: {b.toString(2).padStart(4, '0')} ({b})</button>
        <span style={{ color: '#94a3b8', fontSize: '10px', marginLeft: 'auto' }}>Sum: {sum.toString(2).padStart(5, '0')} ({sum})</span>
      </div>
      <svg width="100%" viewBox="0 0 520 160" style={{ background: '#0f172a', borderRadius: '4px' }}>
        {/* 4 Full Adder blocks chained */}
        {[0, 1, 2, 3].map(i => {
          const bitA = (a >> i) & 1;
          const bitB = (b >> i) & 1;
          const partialSum = (sum >> i) & 1;
          const carry = i < 3 ? ((a & ((1 << (i + 1)) - 1)) + (b & ((1 << (i + 1)) - 1))) >> (i + 1) : (sum >> 4) & 1;
          const x = 20 + i * 125;
          return (
            <g key={i}>
              <rect x={x} y="40" width="100" height="70" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              <text x={x + 35} y="65" fill="#e2e8f0" fontSize="11" fontWeight="600">FA{i}</text>
              <text x={x + 25} y="82" fill="#94a3b8" fontSize="9">Full Adder</text>
              {/* A input */}
              <text x={x + 20} y="35" fill="#3b82f6" fontSize="9">A{i}={bitA}</text>
              <line x1={x + 30} y1="36" x2={x + 30} y2="40" stroke={wire(!!bitA)} strokeWidth="2" />
              {/* B input */}
              <text x={x + 55} y="35" fill="#8b5cf6" fontSize="9">B{i}={bitB}</text>
              <line x1={x + 65} y1="36" x2={x + 65} y2="40" stroke={wire(!!bitB)} strokeWidth="2" />
              {/* Sum output */}
              <line x1={x + 50} y1="110" x2={x + 50} y2="140" stroke={wire(!!partialSum)} strokeWidth="2" />
              <text x={x + 40} y="152" fill="#4ade80" fontSize="9">S{i}={partialSum}</text>
              {/* Carry out */}
              {i < 3 && (
                <line x1={x + 100} y1="75" x2={x + 125} y2="75" stroke={wire(!!carry)} strokeWidth="2" />
              )}
              {i === 3 && (
                <>
                  <line x1={x + 100} y1="75" x2={x + 115} y2="75" stroke={wire(!!((sum >> 4) & 1))} strokeWidth="2" />
                  <text x={x + 105} y="68" fill="#fbbf24" fontSize="9">Cout</text>
                </>
              )}
              {/* Carry label */}
              {i < 3 && <text x={x + 104} y="70" fill="#fbbf24" fontSize="8">C{i}</text>}
            </g>
          );
        })}
        {/* Cin = 0 */}
        <text x="5" y="78" fill="#94a3b8" fontSize="9">Cin=0</text>
        <line x1="15" y1="75" x2="20" y2="75" stroke="#475569" strokeWidth="2" />
      </svg>
    </div>
  );
}

function SimpleALU() {
  const [mode, setMode] = useState(0);
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const ops = ['AND', 'OR', 'ADD'];
  const results = [a & b, a | b, a + b];
  const result = results[mode];
  const wire = (on: boolean) => on ? '#4ade80' : '#475569';

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        <button onClick={() => setMode((mode + 1) % 3)} style={{ padding: '3px 8px', background: '#f59e0b', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>Mode: {ops[mode]}</button>
        <button onClick={() => setA((a + 1) % 4)} style={{ padding: '3px 8px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>A: {a.toString(2).padStart(2, '0')}</button>
        <button onClick={() => setB((b + 1) % 4)} style={{ padding: '3px 8px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>B: {b.toString(2).padStart(2, '0')}</button>
        <span style={{ color: '#94a3b8', fontSize: '10px', marginLeft: 'auto' }}>Result: {result.toString(2)} ({result})</span>
      </div>
      <svg width="100%" viewBox="0 0 380 200" style={{ background: '#0f172a', borderRadius: '4px' }}>
        {/* ALU shape (pentagon) */}
        <polygon points="130,20 250,20 270,100 250,180 130,180 110,100" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <text x="165" y="95" fill="#e2e8f0" fontSize="16" fontWeight="700">ALU</text>
        <text x="155" y="115" fill="#94a3b8" fontSize="11">2-bit {ops[mode]}</text>

        {/* Input A */}
        <text x="15" y="65" fill="#3b82f6" fontSize="12" fontWeight="500">A = {a.toString(2).padStart(2, '0')}</text>
        <line x1="75" y1="60" x2="130" y2="60" stroke={wire(true)} strokeWidth="2" />

        {/* Input B */}
        <text x="15" y="145" fill="#8b5cf6" fontSize="12" fontWeight="500">B = {b.toString(2).padStart(2, '0')}</text>
        <line x1="75" y1="140" x2="130" y2="140" stroke={wire(true)} strokeWidth="2" />

        {/* Mode select */}
        <text x="170" y="12" fill="#f59e0b" fontSize="10" fontWeight="500">Mode: {ops[mode]}</text>
        <line x1="190" y1="15" x2="190" y2="20" stroke="#f59e0b" strokeWidth="2" />

        {/* Output */}
        <line x1="270" y1="100" x2="340" y2="100" stroke={wire(true)} strokeWidth="2" />
        <circle cx="348" cy="100" r="6" fill="#4ade80" />
        <text x="300" y="90" fill="#e2e8f0" fontSize="12" fontWeight="600">Result</text>
        <text x="305" y="130" fill="#4ade80" fontSize="14" fontWeight="700">{result.toString(2).padStart(3, '0')}</text>
        <text x="340" y="130" fill="#94a3b8" fontSize="11">({result})</text>
      </svg>
    </div>
  );
}

