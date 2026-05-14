'use client';

import { useEffect, useState, useRef } from 'react';

export default function TscircuitSection() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('Loading tscircuit...');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadTscircuit() {
      try {
        // APPROACH 1: Try React components
        setMessage('Trying Approach 1: React components...');
        const tscircuit = await import('tscircuit');
        console.log('tscircuit exports:', Object.keys(tscircuit));
        
        // Check if Circuit component exists
        if (tscircuit.Circuit) {
          setMessage('✓ Found Circuit component - tscircuit uses React components');
          return;
        }

        // APPROACH 2: Try SchematicViewer
        setMessage('Trying Approach 2: SchematicViewer...');
        try {
          const schematicViewer = await import('@tscircuit/schematic-viewer');
          console.log('schematic-viewer exports:', Object.keys(schematicViewer));
          
          if (schematicViewer.SchematicViewer || schematicViewer.default) {
            setMessage('✓ Found SchematicViewer - requires circuit-json format');
            return;
          }
        } catch (viewerErr) {
          console.log('SchematicViewer not available:', viewerErr);
        }

        // APPROACH 3: Check what's actually available
        setMessage('Analyzing tscircuit exports...');
        const exports = Object.keys(tscircuit);
        
        if (exports.length === 0) {
          setError('tscircuit has no exports - library may be incompatible with browser environment');
        } else {
          setMessage(`⚠️ tscircuit loaded but no standard rendering API found. Available exports: ${exports.slice(0, 10).join(', ')}${exports.length > 10 ? '...' : ''}`);
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tscircuit');
        console.error('tscircuit error:', err);
      }
    }
    
    loadTscircuit();
  }, []);

  if (error) {
    return (
      <div style={{ color: '#ef4444', padding: '2rem', textAlign: 'center' }}>
        <p>❌ tscircuit cannot render client-side</p>
        <p style={{ fontSize: '0.9rem', color: '#a3a3a3', marginTop: '0.5rem', fontFamily: 'monospace' }}>
          {error}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '1rem' }}>
          Verdict: Reject tscircuit - requires server-side rendering or build-time compilation
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div ref={containerRef} style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#a3a3a3', fontSize: '0.95rem', textAlign: 'center' }}>
          {message}
        </p>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '1rem', textAlign: 'center' }}>
        Note: tscircuit is primarily a circuit design tool, not a browser-based schematic renderer
      </p>
    </div>
  );
}
