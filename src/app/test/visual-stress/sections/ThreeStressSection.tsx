'use client';

import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import VisualCard from './VisualCard';
import styles from './shared.module.css';

interface ThreeStressSectionProps {
  onCountUpdate: (count: number) => void;
}

export default function ThreeStressSection({ onCountUpdate }: ThreeStressSectionProps) {
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    // Report count after 3D scenes have rendered
    const timer = setTimeout(() => {
      onCountUpdate(successCount);
    }, 2000);
    return () => clearTimeout(timer);
  }, [successCount, onCountUpdate]);

  const handleSuccess = () => setSuccessCount(prev => prev + 1);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>5. 3D Scenes (5)</h2>
        <p className={styles.sectionSubtitle}>React Three Fiber interactive 3D visualizations</p>
      </div>
      <div className={`${styles.grid} ${styles.grid3}`}>
        
        <VisualCard title="5.1 Wireframe Torus Knot" onSuccess={handleSuccess}>
          <div style={{ width: '100%', height: '300px', background: '#111', borderRadius: '4px' }}>
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
        </VisualCard>

        <VisualCard title="5.2 3D Surface Plot" onSuccess={handleSuccess}>
          <div style={{ width: '100%', height: '300px', background: '#111', borderRadius: '4px' }}>
            <Canvas camera={{ position: [5, 5, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <SurfacePlot />
              <OrbitControls />
              <gridHelper args={[10, 10]} />
            </Canvas>
          </div>
        </VisualCard>

        <VisualCard title="5.3 3D Vector Field" onSuccess={handleSuccess}>
          <div style={{ width: '100%', height: '300px', background: '#111', borderRadius: '4px' }}>
            <Canvas camera={{ position: [6, 6, 6] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <VectorField />
              <OrbitControls />
              <gridHelper args={[10, 10]} />
            </Canvas>
          </div>
        </VisualCard>

        <VisualCard title="5.4 Motor Cross-Section" onSuccess={handleSuccess}>
          <div style={{ width: '100%', height: '300px', background: '#111', borderRadius: '4px' }}>
            <Canvas camera={{ position: [4, 2, 4] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <MotorCrossSection />
              <OrbitControls />
            </Canvas>
          </div>
        </VisualCard>

        <VisualCard title="5.5 Electromagnetic Field Lines" onSuccess={handleSuccess}>
          <div style={{ width: '100%', height: '300px', background: '#111', borderRadius: '4px' }}>
            <Canvas camera={{ position: [5, 3, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <Solenoid />
              <OrbitControls />
            </Canvas>
          </div>
        </VisualCard>

      </div>
    </section>
  );
}

function SurfacePlot() {
  const meshRef = useRef<any>(null);
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    const geometry = meshRef.current.geometry;
    const positions = geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = Math.sin(x) * Math.cos(y);
      positions.setZ(i, z);
    }
    
    positions.needsUpdate = true;
    // @ts-ignore - computeVertexNormals signature varies by three.js version
    geometry.computeVertexNormals();
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0] as [number, number, number]}>
      <planeGeometry args={[6, 6, 30, 30]} />
      <meshStandardMaterial color="#3b82f6" wireframe={false} />
    </mesh>
  );
}

function VectorField() {
  const arrows = [];
  for (let x = -2; x <= 2; x++) {
    for (let y = -2; y <= 2; y++) {
      for (let z = -2; z <= 2; z++) {
        const magnitude = Math.sqrt(y*y + x*x + z*z);
        const color = magnitude > 2 ? '#ef4444' : '#3b82f6';
        arrows.push(
          <group key={`${x}-${y}-${z}`} position={[x, y, z] as [number, number, number]}>
            <mesh rotation={[0, 0, Math.atan2(y, -x)] as [number, number, number]}>
              <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        );
      }
    }
  }
  return <>{arrows}</>;
}

function MotorCrossSection() {
  const rotorRef = useRef<any>(null);
  
  // @ts-ignore - useFrame signature varies by react-three-fiber version
  useFrame(() => {
    if (rotorRef.current) {
      rotorRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Stator (outer cylinder) */}
      <mesh>
        <cylinderGeometry args={[2, 2, 3, 32]} />
        <meshStandardMaterial color="#64748b" transparent opacity={0.3} />
      </mesh>
      
      {/* Rotor (inner cylinder) - rotating */}
      <mesh ref={rotorRef}>
        <cylinderGeometry args={[1, 1, 3, 32]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      
      {/* Shaft */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 4, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      
      {/* Coils (4 rectangles around stator) */}
      {[0, Math.PI/2, Math.PI, 3*Math.PI/2].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 2.2, 0, Math.sin(angle) * 2.2] as [number, number, number]} 
              rotation={[0, angle, 0] as [number, number, number]}>
          <boxGeometry args={[0.3, 2, 0.5]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      ))}
    </group>
  );
}

function Solenoid() {
  const rings = [];
  for (let i = 0; i < 8; i++) {
    rings.push(
      <mesh key={i} position={[0, i * 0.5 - 2, 0] as [number, number, number]} rotation={[Math.PI / 2, 0, 0] as [number, number, number]}>
        <torusGeometry args={[0.8, 0.1, 16, 32]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    );
  }
  
  return (
    <group>
      {rings}
      {/* Field lines (simplified as curves) */}
      {[-1, 0, 1].map((offset, i) => (
        <mesh key={`line-${i}`} position={[offset, 0, 0] as [number, number, number]}>
          <torusGeometry args={[2, 0.05, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#4ade80" />
        </mesh>
      ))}
    </group>
  );
}
