'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';

export default function ThreeSection() {
  const [error, setError] = useState<string | null>(null);

  try {
    return (
      <div>
        <div style={{ width: '100%', height: '400px', background: '#111', borderRadius: '4px' }}>
          <Canvas camera={{ position: [3, 3, 3] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <mesh>
              <torusKnotGeometry args={[1, 0.3, 128, 32]} />
              <meshStandardMaterial color="#4f46e5" wireframe />
            </mesh>
            <OrbitControls />
            <gridHelper args={[10, 10]} />
          </Canvas>
        </div>
        <p style={{ color: '#34d399', marginTop: '1rem', fontSize: '0.9rem' }}>
          ✓ React Three Fiber working — use mouse to orbit
        </p>
      </div>
    );
  } catch (err) {
    return (
      <div style={{ color: '#ef4444', padding: '2rem', textAlign: 'center' }}>
        <p>❌ Failed to render 3D scene</p>
        <p style={{ fontSize: '0.9rem', color: '#a3a3a3', marginTop: '0.5rem', fontFamily: 'monospace' }}>
          {err instanceof Error ? err.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}
