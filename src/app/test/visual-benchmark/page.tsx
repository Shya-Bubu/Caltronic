'use client';

/**
 * VISUAL FRAMEWORK BENCHMARK
 * 
 * Tests all candidate visualization libraries side-by-side to evaluate:
 * - Circuit diagrams (tscircuit vs existing CircuitSchematic)
 * - Logic gates (DigitalJS vs SimcirJS)
 * - Block diagrams (React Flow + elkjs vs Mermaid)
 * - Timing diagrams (WaveDrom)
 * - 3D visualization (React Three Fiber)
 */

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import CircuitSchematic from '@/app/components/CircuitSchematic';
import styles from './page.module.css';

// Dynamic imports for heavy libraries
const ReactFlowSection = dynamic(() => import('./sections/ReactFlowSection'), { ssr: false });
const ThreeSection = dynamic(() => import('./sections/ThreeSection'), { ssr: false });
const TscircuitSection = dynamic(() => import('./sections/TscircuitSection'), { ssr: false });
const WaveDromSection = dynamic(() => import('./sections/WaveDromSection'), { ssr: false });
const MermaidSection = dynamic(() => import('./sections/MermaidSection'), { ssr: false });
const CustomLogicGatesSection = dynamic(() => import('./sections/DigitalJSSection'), { ssr: false });

export default function VisualBenchmarkPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Visual Framework Benchmark</h1>
        <p>Evaluating visualization libraries for Caltronic V2</p>
      </header>

      {/* SECTION A: Circuit Diagrams */}
      <section className={styles.section}>
        <h2>A. Circuit Diagrams — RC Low-Pass Filter</h2>
        <p className={styles.description}>
          Comparing tscircuit (left) vs existing CircuitSchematic (right)
        </p>
        <div className={styles.comparison}>
          <div className={styles.candidate}>
            <h3>tscircuit</h3>
            <TscircuitSection />
          </div>
          <div className={styles.candidate}>
            <h3>Existing CircuitSchematic</h3>
            <CircuitSchematic
              width={400}
              height={300}
              title="RC Low-Pass Filter"
              elements={[
                // Voltage source
                { component: 'voltage-source', x: 60, y: 120, rotation: 90, label: 'V1', value: '5V' },
                // Wire from V+ to R1
                { component: 'wire', x1: 60, y1: 90, x2: 60, y2: 60 },
                { component: 'wire', x1: 60, y1: 60, x2: 140, y2: 60 },
                // Resistor R1
                { component: 'resistor', x: 200, y: 60, label: 'R1', value: '1kΩ', labelPosition: 'top' },
                // Wire from R1 to C1
                { component: 'wire', x1: 230, y1: 60, x2: 280, y2: 60 },
                { component: 'junction', x: 280, y: 60 },
                { component: 'wire', x1: 280, y1: 60, x2: 280, y2: 100 },
                // Capacitor C1
                { component: 'capacitor', x: 280, y: 140, rotation: 90, label: 'C1', value: '100nF', labelPosition: 'right' },
                // Wire from C1 to ground
                { component: 'wire', x1: 280, y1: 170, x2: 280, y2: 200 },
                { component: 'ground', x: 280, y: 200 },
                // Wire from V- to ground
                { component: 'wire', x1: 60, y1: 150, x2: 60, y2: 200 },
                { component: 'ground', x: 60, y: 200 },
                // Output label
                { component: 'text', x: 300, y: 60, text: 'Vout', fontSize: 12 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION B: Logic Gates */}
      <section className={styles.section}>
        <h2>B. Logic Gates — Half Adder</h2>
        <p className={styles.description}>
          Custom SVG interactive logic gates (DigitalJS rejected due to jQuery dependency)
        </p>
        <div className={styles.single}>
          <div className={styles.candidate}>
            <h3>Custom SVG Logic Gates (Interactive)</h3>
            <CustomLogicGatesSection />
          </div>
        </div>
      </section>

      {/* SECTION C: Block Diagrams */}
      <section className={styles.section}>
        <h2>C. Block Diagrams — Feedback Control Loop</h2>
        <p className={styles.description}>
          Comparing React Flow + elkjs (left) vs Mermaid (right)
        </p>
        <div className={styles.comparison}>
          <div className={styles.candidate}>
            <h3>React Flow + elkjs</h3>
            <ReactFlowSection />
          </div>
          <div className={styles.candidate}>
            <h3>Mermaid</h3>
            <MermaidSection />
          </div>
        </div>
      </section>

      {/* SECTION D: Timing Diagrams */}
      <section className={styles.section}>
        <h2>D. Timing Diagrams — SPI Protocol</h2>
        <p className={styles.description}>
          WaveDrom smoke test
        </p>
        <div className={styles.single}>
          <div className={styles.candidate}>
            <h3>WaveDrom</h3>
            <WaveDromSection />
          </div>
        </div>
      </section>

      {/* SECTION E: 3D Visualization */}
      <section className={styles.section}>
        <h2>E. 3D Visualization — Interactive Scene</h2>
        <p className={styles.description}>
          React Three Fiber smoke test
        </p>
        <div className={styles.single}>
          <div className={styles.candidate}>
            <h3>React Three Fiber</h3>
            <ThreeSection />
          </div>
        </div>
      </section>
    </div>
  );
}
