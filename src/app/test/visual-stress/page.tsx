'use client';

/**
 * VISUAL STRESS TEST
 * 
 * Comprehensive stress test of all visualization frameworks with 49 diagrams:
 * - 12 Circuit diagrams (CircuitSchematic)
 * - 10 Logic gate diagrams (Custom SVG)
 * - 8 Timing diagrams (WaveDrom)
 * - 6 Block diagrams (Pure SVG)
 * - 5 3D scenes (React Three Fiber)
 * - 8 Scientific plots (Plotly)
 */

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

// Dynamic imports for heavy components
const CircuitStressSection = dynamic(() => import('./sections/CircuitStressSection'), { ssr: false });
const LogicGatesStressSection = dynamic(() => import('./sections/LogicGatesStressSection'), { ssr: false });
const WaveDromStressSection = dynamic(() => import('./sections/WaveDromStressSection'), { ssr: false });
const BlockDiagramSVGSection = dynamic(() => import('./sections/BlockDiagramSVGSection'), { ssr: false });
const ThreeStressSection = dynamic(() => import('./sections/ThreeStressSection'), { ssr: false });
const PlotlyStressSection = dynamic(() => import('./sections/PlotlyStressSection'), { ssr: false });

export default function VisualStressPage() {
  const [counts, setCounts] = useState({
    circuits: 0,
    logic: 0,
    timing: 0,
    flow: 0,
    three: 0,
    plotly: 0,
  });

  const totalCount = 49;
  const successCount = Object.values(counts).reduce((sum, count) => sum + count, 0);

  const updateCount = useCallback((section: keyof typeof counts, count: number) => {
    setCounts(prev => ({ ...prev, [section]: count }));
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Visual Stress Test</h1>
        <p>Comprehensive framework evaluation with {totalCount} diagrams</p>
        <div className={styles.counter}>
          <span className={styles.success}>{successCount}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.total}>{totalCount}</span>
          <span className={styles.label}>visuals rendered</span>
        </div>
      </header>

      <CircuitStressSection onCountUpdate={(count) => updateCount('circuits', count)} />
      <LogicGatesStressSection onCountUpdate={(count) => updateCount('logic', count)} />
      <WaveDromStressSection onCountUpdate={(count) => updateCount('timing', count)} />
      <BlockDiagramSVGSection onCountUpdate={(count) => updateCount('flow', count)} />
      <ThreeStressSection onCountUpdate={(count) => updateCount('three', count)} />
      <PlotlyStressSection onCountUpdate={(count) => updateCount('plotly', count)} />
    </div>
  );
}
