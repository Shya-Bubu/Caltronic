'use client';

import { useEffect, useRef, useState } from 'react';

const spiWaveform = {
  signal: [
    { name: 'CLK', wave: 'p........' },
    { name: 'MOSI', wave: 'x.=.=.=.x', data: ['A5', '3C', '7E'] },
    { name: 'MISO', wave: 'x.=.=.=.x', data: ['FF', '24', 'B1'] },
    { name: 'CS', wave: '10......1' }
  ],
  head: { text: 'SPI Transfer' }
};

export default function WaveDromSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function renderWaveDrom() {
      try {
        // Try to load WaveDrom
        const wavedromModule = await import('wavedrom');
        const wavedrom = wavedromModule.default || wavedromModule;
        
        if (!containerRef.current) return;

        // APPROACH 1: Try using processAll with script tag
        try {
          const scriptId = 'wavedrom-script-' + Date.now();
          const script = document.createElement('script');
          script.type = 'WaveDrom';
          script.id = scriptId;
          script.textContent = JSON.stringify(spiWaveform);
          containerRef.current.appendChild(script);
          
          if (wavedrom.processAll) {
            wavedrom.processAll();
            setSuccess(true);
            return;
          } else if (wavedrom.ProcessAll) {
            wavedrom.ProcessAll();
            setSuccess(true);
            return;
          }
        } catch (err) {
          console.log('processAll approach failed:', err);
        }

        // APPROACH 2: Try renderWaveForm
        try {
          if (wavedrom.renderWaveForm) {
            const tempId = 'wavedrom-temp-' + Date.now();
            const tempDiv = document.createElement('div');
            tempDiv.id = tempId;
            document.body.appendChild(tempDiv);
            
            wavedrom.renderWaveForm(0, spiWaveform, tempId);
            
            const svg = tempDiv.querySelector('svg');
            if (svg && containerRef.current) {
              containerRef.current.innerHTML = '';
              containerRef.current.appendChild(svg.cloneNode(true));
              document.body.removeChild(tempDiv);
              setSuccess(true);
              return;
            }
            document.body.removeChild(tempDiv);
          }
        } catch (err) {
          console.log('renderWaveForm approach failed:', err);
        }

        // APPROACH 3: Fallback to custom SVG timing diagram
        if (containerRef.current && !success) {
          containerRef.current.innerHTML = renderCustomTimingDiagram();
          setSuccess(true);
        }
        
      } catch (err: any) {
        // If all approaches fail, render custom SVG
        if (containerRef.current) {
          containerRef.current.innerHTML = renderCustomTimingDiagram();
          setSuccess(true);
        }
        console.error('WaveDrom error (using fallback):', err);
      }
    }

    renderWaveDrom();
  }, []);

  // Fallback: Custom SVG timing diagram
  function renderCustomTimingDiagram(): string {
    return `
      <svg width="100%" height="200" viewBox="0 0 600 200" style="background: #fff; border-radius: 4px;">
        <style>
          .signal-name { font-family: monospace; font-size: 12px; fill: #333; }
          .signal-line { stroke: #2563eb; stroke-width: 2; fill: none; }
          .signal-data { font-family: monospace; font-size: 10px; fill: #2563eb; text-anchor: middle; }
          .title { font-family: sans-serif; font-size: 14px; fill: #333; font-weight: 600; }
        </style>
        
        <!-- Title -->
        <text x="300" y="20" class="title" text-anchor="middle">SPI Transfer</text>
        
        <!-- CLK Signal -->
        <text x="10" y="55" class="signal-name">CLK</text>
        <path d="M 80 60 L 100 60 L 100 40 L 120 40 L 120 60 L 140 60 L 140 40 L 160 40 L 160 60 L 180 60 L 180 40 L 200 40 L 200 60 L 220 60 L 220 40 L 240 40 L 240 60 L 260 60 L 260 40 L 280 40 L 280 60 L 300 60 L 300 40 L 320 40 L 320 60 L 340 60" class="signal-line" />
        
        <!-- MOSI Signal -->
        <text x="10" y="95" class="signal-name">MOSI</text>
        <path d="M 80 100 L 100 100 L 100 80 L 140 80 L 140 100 L 180 100 L 180 80 L 220 80 L 220 100 L 260 100 L 260 80 L 300 80 L 300 100 L 340 100" class="signal-line" />
        <text x="120" y="75" class="signal-data">A5</text>
        <text x="200" y="75" class="signal-data">3C</text>
        <text x="280" y="75" class="signal-data">7E</text>
        
        <!-- MISO Signal -->
        <text x="10" y="135" class="signal-name">MISO</text>
        <path d="M 80 140 L 100 140 L 100 120 L 140 120 L 140 140 L 180 140 L 180 120 L 220 120 L 220 140 L 260 140 L 260 120 L 300 120 L 300 140 L 340 140" class="signal-line" />
        <text x="120" y="115" class="signal-data">FF</text>
        <text x="200" y="115" class="signal-data">24</text>
        <text x="280" y="115" class="signal-data">B1</text>
        
        <!-- CS Signal -->
        <text x="10" y="175" class="signal-name">CS</text>
        <path d="M 80 160 L 100 160 L 100 180 L 320 180 L 320 160 L 340 160" class="signal-line" />
      </svg>
    `;
  }

  if (error && !success) {
    return (
      <div style={{ color: '#ef4444', padding: '2rem', textAlign: 'center' }}>
        <p>❌ Failed to render WaveDrom</p>
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
          minHeight: '200px', 
          borderRadius: '4px',
          padding: '1rem'
        }} 
      />
      {success && (
        <p style={{ color: '#34d399', marginTop: '1rem', fontSize: '0.9rem' }}>
          ✓ Timing diagram rendered (WaveDrom or custom SVG fallback)
        </p>
      )}
    </div>
  );
}
