'use client';

import { useEffect, useRef, useState } from 'react';

const mermaidDiagram = `
graph LR
    R["R(s)"] --> SUM["Σ"]
    SUM --> G["G(s)"]
    G --> P["P(s)"]
    P --> Y["Y(s)"]
    Y --> |feedback| SUM
`;

export default function MermaidSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function renderMermaid() {
      try {
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#1e293b',
            primaryTextColor: '#e2e8f0',
            primaryBorderColor: '#475569',
            lineColor: '#4ade80',
            secondaryColor: '#334155',
            tertiaryColor: '#0f172a',
            background: '#0f172a',
            mainBkg: '#1e293b',
            secondBkg: '#334155',
            textColor: '#e2e8f0',
            border1: '#475569',
            border2: '#64748b',
            arrowheadColor: '#4ade80',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            fontSize: '14px',
          },
        });

        if (containerRef.current) {
          const { svg } = await mermaid.render('mermaid-diagram', mermaidDiagram);
          containerRef.current.innerHTML = svg;
          
          // Apply additional styling to the SVG
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.maxWidth = '600px';
          }
          
          setSuccess(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to render Mermaid');
        console.error('Mermaid error:', err);
      }
    }

    renderMermaid();
  }, []);

  if (error) {
    return (
      <div style={{ color: '#ef4444', padding: '2rem', textAlign: 'center' }}>
        <p>❌ Failed to render Mermaid</p>
        <p style={{ fontSize: '0.9rem', color: '#a3a3a3', marginTop: '0.5rem', fontFamily: 'monospace' }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div 
        ref={containerRef} 
        style={{ 
          minHeight: '300px', 
          background: '#0f172a', 
          borderRadius: '8px',
          border: '1px solid #1e293b',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} 
      />
      {success && (
        <p style={{ color: '#34d399', marginTop: '1rem', fontSize: '0.9rem' }}>
          ✓ Mermaid rendered with dark theme
        </p>
      )}
    </div>
  );
}
