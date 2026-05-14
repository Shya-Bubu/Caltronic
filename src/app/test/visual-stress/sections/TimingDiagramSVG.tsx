'use client';

import React from 'react';

/**
 * TimingDiagramSVG - Parses WaveJSON and renders actual timing waveforms
 * 
 * Wave characters:
 * - 'p'/'P' = clock pulse (square wave: rise→fall per character)
 * - 'n'/'N' = negative clock (fall→rise per character)
 * - '0'/'l' = low level
 * - '1'/'h' = high level  
 * - 'H'     = high (capital H draws thicker or same as h)
 * - 'L'     = low
 * - '.'     = continue previous state
 * - '='     = data bus (label from data[] array)
 * - 'x'/'X' = undefined / don't care
 * - 'z'/'Z' = high impedance
 */

interface Signal {
  name: string;
  wave: string;
  data?: string[];
  period?: number;
}

interface WaveformData {
  signal: (Signal | Record<string, never>)[];
  head?: { text: string };
}

interface TimingDiagramSVGProps {
  waveform: WaveformData;
}

type WaveState = 'high' | 'low' | 'mid' | 'x' | 'z' | 'bus';

export default function TimingDiagramSVG({ waveform }: TimingDiagramSVGProps) {
  const signals = (waveform.signal || []).filter(s => s && (s as Signal).wave) as Signal[];
  const title = waveform.head?.text || '';
  
  const LANE_HEIGHT = 48;
  const TITLE_HEIGHT = title ? 32 : 8;
  const NAME_WIDTH = 90;
  const CYCLE_WIDTH = 40;
  const WAVE_HIGH = 4;
  const WAVE_LOW = 32;
  const WAVE_MID = 18;
  
  // Calculate max wave length for width
  const maxWaveLen = Math.max(...signals.map(s => s.wave.length), 8);
  const totalWidth = NAME_WIDTH + maxWaveLen * CYCLE_WIDTH + 20;
  const totalHeight = TITLE_HEIGHT + signals.length * LANE_HEIGHT + 12;
  
  return (
    <svg 
      width="100%" 
      height={totalHeight} 
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      style={{ background: '#0f172a', borderRadius: '6px', border: '1px solid #1e293b' }}
    >
      {/* Title */}
      {title && (
        <text x={totalWidth / 2} y={22} textAnchor="middle" 
              fill="#e2e8f0" fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif">
          {title}
        </text>
      )}
      
      {/* Grid lines */}
      {Array.from({ length: maxWaveLen + 1 }, (_, i) => (
        <line key={`grid-${i}`}
          x1={NAME_WIDTH + i * CYCLE_WIDTH} y1={TITLE_HEIGHT}
          x2={NAME_WIDTH + i * CYCLE_WIDTH} y2={totalHeight - 4}
          stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,4"
        />
      ))}
      
      {/* Signal lanes */}
      {signals.map((signal, idx) => {
        const laneY = TITLE_HEIGHT + idx * LANE_HEIGHT;
        return (
          <g key={idx}>
            {/* Lane background */}
            <rect x={0} y={laneY} width={totalWidth} height={LANE_HEIGHT} 
                  fill={idx % 2 === 0 ? 'rgba(30,41,59,0.3)' : 'transparent'} />
            
            {/* Signal name */}
            <text x={8} y={laneY + WAVE_MID + 5} 
                  fill="#94a3b8" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="500">
              {signal.name}
            </text>
            
            {/* Waveform */}
            {renderWaveform(signal, NAME_WIDTH, laneY, CYCLE_WIDTH, WAVE_HIGH, WAVE_LOW, WAVE_MID)}
          </g>
        );
      })}
    </svg>
  );
}

function renderWaveform(
  signal: Signal,
  startX: number,
  laneY: number,
  cycleW: number,
  highY: number,
  lowY: number,
  midY: number,
) {
  const wave = signal.wave;
  const dataArr = signal.data || [];
  const period = signal.period || 1;
  const w = cycleW * period;
  
  let currentState: WaveState = 'mid';
  let dataIdx = 0;
  const elements: React.JSX.Element[] = [];
  
  // Helper: get Y position for a state
  const yOf = (st: WaveState) => {
    switch (st) {
      case 'high': return laneY + highY;
      case 'low': return laneY + lowY;
      default: return laneY + midY;
    }
  };

  for (let i = 0; i < wave.length; i++) {
    const ch = wave[i];
    const x1 = startX + i * w;
    const x2 = x1 + w;
    const prevY = yOf(currentState);
    
    switch (ch) {
      case 'p':
      case 'P': {
        // Clock pulse: low→high→low within one period (full square pulse)
        const yH = laneY + highY;
        const yL = laneY + lowY;
        const xMid = x1 + w / 2;
        
        // Transition from previous state to low
        if (currentState !== 'low') {
          elements.push(
            <line key={`t-${i}`} x1={x1} y1={prevY} x2={x1} y2={yL}
                  stroke="#22d3ee" strokeWidth="2" />
          );
        }
        // Rise at start
        elements.push(
          <line key={`r-${i}`} x1={x1} y1={yL} x2={x1} y2={yH}
                stroke="#22d3ee" strokeWidth="2" />
        );
        // High for half period
        elements.push(
          <line key={`h-${i}`} x1={x1} y1={yH} x2={xMid} y2={yH}
                stroke="#22d3ee" strokeWidth="2" />
        );
        // Fall at midpoint
        elements.push(
          <line key={`f-${i}`} x1={xMid} y1={yH} x2={xMid} y2={yL}
                stroke="#22d3ee" strokeWidth="2" />
        );
        // Low for second half
        elements.push(
          <line key={`l-${i}`} x1={xMid} y1={yL} x2={x2} y2={yL}
                stroke="#22d3ee" strokeWidth="2" />
        );
        currentState = 'low';
        break;
      }
      
      case 'n':
      case 'N': {
        // Negative clock: high→low→high
        const yH = laneY + highY;
        const yL = laneY + lowY;
        const xMid = x1 + w / 2;
        
        if (currentState !== 'high') {
          elements.push(
            <line key={`t-${i}`} x1={x1} y1={prevY} x2={x1} y2={yH}
                  stroke="#22d3ee" strokeWidth="2" />
          );
        }
        elements.push(
          <line key={`h-${i}`} x1={x1} y1={yH} x2={xMid} y2={yH} stroke="#22d3ee" strokeWidth="2" />
        );
        elements.push(
          <line key={`f-${i}`} x1={xMid} y1={yH} x2={xMid} y2={yL} stroke="#22d3ee" strokeWidth="2" />
        );
        elements.push(
          <line key={`l-${i}`} x1={xMid} y1={yL} x2={x2} y2={yL} stroke="#22d3ee" strokeWidth="2" />
        );
        elements.push(
          <line key={`r2-${i}`} x1={x2} y1={yL} x2={x2} y2={yH} stroke="#22d3ee" strokeWidth="2" />
        );
        currentState = 'high';
        break;
      }
      
      case '1':
      case 'h':
      case 'H': {
        const yH = laneY + highY;
        // Transition up if needed
        if (currentState !== 'high') {
          elements.push(
            <line key={`t-${i}`} x1={x1} y1={prevY} x2={x1} y2={yH}
                  stroke="#22d3ee" strokeWidth="2" />
          );
        }
        // Hold high
        elements.push(
          <line key={`s-${i}`} x1={x1} y1={yH} x2={x2} y2={yH}
                stroke="#22d3ee" strokeWidth="2" />
        );
        currentState = 'high';
        break;
      }
      
      case '0':
      case 'l':
      case 'L': {
        const yL = laneY + lowY;
        // Transition down if needed
        if (currentState !== 'low') {
          elements.push(
            <line key={`t-${i}`} x1={x1} y1={prevY} x2={x1} y2={yL}
                  stroke="#22d3ee" strokeWidth="2" />
          );
        }
        // Hold low
        elements.push(
          <line key={`s-${i}`} x1={x1} y1={yL} x2={x2} y2={yL}
                stroke="#22d3ee" strokeWidth="2" />
        );
        currentState = 'low';
        break;
      }
      
      case '.': {
        // Continue previous state
        const y = yOf(currentState);
        if (currentState === 'bus') {
          // Extend bus region
          elements.push(
            <line key={`bt-${i}`} x1={x1} y1={laneY + highY} x2={x2} y2={laneY + highY}
                  stroke="#22d3ee" strokeWidth="1.5" />
          );
          elements.push(
            <line key={`bb-${i}`} x1={x1} y1={laneY + lowY} x2={x2} y2={laneY + lowY}
                  stroke="#22d3ee" strokeWidth="1.5" />
          );
          elements.push(
            <rect key={`bf-${i}`} x={x1} y={laneY + highY} width={w} height={lowY - highY}
                  fill="rgba(34,211,238,0.08)" />
          );
        } else if (currentState === 'x') {
          // Extend undefined region
          elements.push(
            <rect key={`xf-${i}`} x={x1} y={laneY + highY} width={w} height={lowY - highY}
                  fill="url(#crosshatch)" opacity="0.4" />
          );
        } else {
          elements.push(
            <line key={`s-${i}`} x1={x1} y1={y} x2={x2} y2={y}
                  stroke="#22d3ee" strokeWidth="2" />
          );
        }
        break;
      }
      
      case '=': {
        // Data bus with label
        const yH = laneY + highY;
        const yL = laneY + lowY;
        const yM = laneY + midY;
        const label = dataArr[dataIdx] || '';
        dataIdx++;
        const chevron = 6;
        
        // X-transition at left edge
        elements.push(
          <line key={`xt-${i}`} x1={x1} y1={yH} x2={x1 + chevron} y2={yM}
                stroke="#22d3ee" strokeWidth="1.5" />
        );
        elements.push(
          <line key={`xb-${i}`} x1={x1} y1={yL} x2={x1 + chevron} y2={yM}
                stroke="#22d3ee" strokeWidth="1.5" />
        );
        
        // Top and bottom lines
        elements.push(
          <line key={`bt-${i}`} x1={x1 + chevron} y1={yH} x2={x2 - chevron} y2={yH}
                stroke="#22d3ee" strokeWidth="1.5" />
        );
        elements.push(
          <line key={`bb-${i}`} x1={x1 + chevron} y1={yL} x2={x2 - chevron} y2={yL}
                stroke="#22d3ee" strokeWidth="1.5" />
        );
        
        // X-transition at right edge  
        elements.push(
          <line key={`xtr-${i}`} x1={x2 - chevron} y1={yH} x2={x2} y2={yM}
                stroke="#22d3ee" strokeWidth="1.5" />
        );
        elements.push(
          <line key={`xbr-${i}`} x1={x2 - chevron} y1={yL} x2={x2} y2={yM}
                stroke="#22d3ee" strokeWidth="1.5" />
        );
        
        // Fill
        const fillPath = `M ${x1 + chevron} ${yH} L ${x2 - chevron} ${yH} L ${x2} ${yM} L ${x2 - chevron} ${yL} L ${x1 + chevron} ${yL} L ${x1} ${yM} Z`;
        elements.push(
          <path key={`fill-${i}`} d={fillPath} fill="rgba(34,211,238,0.1)" />
        );
        
        // Label text
        if (label) {
          elements.push(
            <text key={`txt-${i}`} x={x1 + w / 2} y={yM + 4}
                  textAnchor="middle" fill="#22d3ee" fontSize="10"
                  fontFamily="'JetBrains Mono', monospace" fontWeight="500">
              {label}
            </text>
          );
        }
        
        currentState = 'bus';
        break;
      }
      
      case 'x':
      case 'X': {
        // Undefined state — crosshatched region
        const yH = laneY + highY;
        const yL = laneY + lowY;
        const yM = laneY + midY;
        
        // Transition to middle if needed
        if (currentState !== 'x' && currentState !== 'mid') {
          elements.push(
            <line key={`t-${i}`} x1={x1} y1={prevY} x2={x1} y2={yM}
                  stroke="#22d3ee" strokeWidth="1.5" />
          );
        }
        
        // Hatched rectangle
        elements.push(
          <rect key={`xr-${i}`} x={x1} y={yH} width={w} height={yL - yH}
                fill="#475569" fillOpacity="0.2" stroke="#475569" strokeWidth="0.5" />
        );
        // Cross lines
        for (let j = 0; j < w; j += 8) {
          elements.push(
            <line key={`xh-${i}-${j}`} x1={x1 + j} y1={yH} x2={x1 + j + 8} y2={yL}
                  stroke="#475569" strokeWidth="0.5" opacity="0.5" />
          );
        }
        
        currentState = 'x';
        break;
      }
      
      case 'z':
      case 'Z': {
        // High impedance — dashed line at mid
        const yM = laneY + midY;
        
        if (currentState !== 'z' && currentState !== 'mid') {
          elements.push(
            <line key={`t-${i}`} x1={x1} y1={prevY} x2={x1} y2={yM}
                  stroke="#22d3ee" strokeWidth="1.5" />
          );
        }
        
        elements.push(
          <line key={`z-${i}`} x1={x1} y1={yM} x2={x2} y2={yM}
                stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4,3" />
        );
        currentState = 'z';
        break;
      }
      
      default:
        // Unknown character — skip
        break;
    }
  }
  
  return <g>{elements}</g>;
}
