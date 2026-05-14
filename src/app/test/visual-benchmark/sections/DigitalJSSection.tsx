'use client';

import { useState } from 'react';

export default function CustomLogicGatesSection() {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  // Calculate outputs
  const sum = inputA !== inputB; // XOR
  const carry = inputA && inputB; // AND

  return (
    <div>
      <p style={{ color: '#fbbf24', marginBottom: '1rem', fontSize: '0.9rem' }}>
        ⚠️ DigitalJS rejected (jQuery dependency) — using custom SVG instead
      </p>
      
      {/* Interactive controls */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          onClick={() => setInputA(!inputA)}
          style={{
            padding: '8px 16px',
            background: inputA ? '#4ade80' : '#334155',
            color: inputA ? '#0a0a0a' : '#e2e8f0',
            border: '1px solid #475569',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
          }}
        >
          Input A: {inputA ? '1' : '0'}
        </button>
        <button
          onClick={() => setInputB(!inputB)}
          style={{
            padding: '8px 16px',
            background: inputB ? '#4ade80' : '#334155',
            color: inputB ? '#0a0a0a' : '#e2e8f0',
            border: '1px solid #475569',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
          }}
        >
          Input B: {inputB ? '1' : '0'}
        </button>
        <div style={{ marginLeft: 'auto', color: '#a3a3a3', fontSize: '0.85rem' }}>
          Sum: <span style={{ color: sum ? '#4ade80' : '#64748b', fontWeight: '600' }}>{sum ? '1' : '0'}</span>
          {' | '}
          Carry: <span style={{ color: carry ? '#4ade80' : '#64748b', fontWeight: '600' }}>{carry ? '1' : '0'}</span>
        </div>
      </div>

      {/* SVG Half-Adder Circuit */}
      <svg width="600" height="300" viewBox="0 0 600 300" style={{ background: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b' }}>
        {/* Input A */}
        <text x="20" y="80" fill="#e2e8f0" fontSize="14" fontWeight="600">A</text>
        <line x1="40" y1="75" x2="120" y2="75" stroke={inputA ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <circle cx="120" cy="75" r="3" fill={inputA ? '#4ade80' : '#64748b'} />
        
        {/* Input B */}
        <text x="20" y="180" fill="#e2e8f0" fontSize="14" fontWeight="600">B</text>
        <line x1="40" y1="175" x2="120" y2="175" stroke={inputB ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <circle cx="120" cy="175" r="3" fill={inputB ? '#4ade80' : '#64748b'} />
        
        {/* Wires from A to gates */}
        <line x1="120" y1="75" x2="180" y2="75" stroke={inputA ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <line x1="120" y1="75" x2="120" y2="200" stroke={inputA ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <line x1="120" y1="200" x2="180" y2="200" stroke={inputA ? '#4ade80' : '#64748b'} strokeWidth="2" />
        
        {/* Wires from B to gates */}
        <line x1="120" y1="175" x2="150" y2="175" stroke={inputB ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <line x1="150" y1="175" x2="150" y2="95" stroke={inputB ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <line x1="150" y1="95" x2="180" y2="95" stroke={inputB ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <line x1="150" y1="175" x2="150" y2="220" stroke={inputB ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <line x1="150" y1="220" x2="180" y2="220" stroke={inputB ? '#4ade80' : '#64748b'} strokeWidth="2" />
        
        {/* XOR Gate (top) */}
        <g>
          {/* Extra curved line for XOR */}
          <path d="M 175 60 Q 185 85 175 110" fill="none" stroke="#64748b" strokeWidth="1.5" />
          {/* Main OR shape */}
          <path d="M 180 60 Q 190 85 180 110" fill="none" stroke="#64748b" strokeWidth="2" />
          <path d="M 180 60 Q 260 60 280 85" fill="none" stroke="#64748b" strokeWidth="2" />
          <path d="M 180 110 Q 260 110 280 85" fill="none" stroke="#64748b" strokeWidth="2" />
          <path d="M 180 60 L 180 110" fill="none" stroke="#64748b" strokeWidth="2" />
          <circle cx="280" cy="85" r="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <text x="220" y="90" fill="#e2e8f0" fontSize="12" fontWeight="600">XOR</text>
        </g>
        
        {/* AND Gate (bottom) */}
        <g>
          <path d="M 180 185 L 180 235 Q 180 235 230 235 Q 280 235 280 210 Q 280 185 230 185 Q 180 185 180 185 Z" 
                fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <text x="215" y="215" fill="#e2e8f0" fontSize="12" fontWeight="600">AND</text>
        </g>
        
        {/* Output wires */}
        <line x1="288" y1="85" x2="450" y2="85" stroke={sum ? '#4ade80' : '#64748b'} strokeWidth="2" />
        <line x1="280" y1="210" x2="450" y2="210" stroke={carry ? '#4ade80' : '#64748b'} strokeWidth="2" />
        
        {/* Output labels */}
        <text x="460" y="90" fill="#e2e8f0" fontSize="14" fontWeight="600">Sum (S)</text>
        <text x="460" y="215" fill="#e2e8f0" fontSize="14" fontWeight="600">Carry (C)</text>
        
        {/* Output indicators */}
        <circle cx="570" cy="85" r="8" fill={sum ? '#4ade80' : '#334155'} stroke="#64748b" strokeWidth="2" />
        <circle cx="570" cy="210" r="8" fill={carry ? '#4ade80' : '#334155'} stroke="#64748b" strokeWidth="2" />
      </svg>
      
      <p style={{ color: '#34d399', marginTop: '1rem', fontSize: '0.9rem' }}>
        ✓ Custom SVG logic gates with interactive inputs
      </p>
    </div>
  );
}
