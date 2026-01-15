'use client';

import { useState, useMemo } from 'react';
import SignalPlot from './SignalPlot';
import styles from './Simulation.module.css';

/**
 * SIGNAL TRANSFORM SIMULATION
 * 
 * Purpose: Visualize time shifting, scaling, and reversal
 * Concept: Signal Sketching Basics
 * 
 * Controls:
 * - Time shift (a)
 * - Time scale (b)
 * - Base signal type
 * 
 * Key Insight: x(at + b) = scale by 1/a, then shift by -b/a
 */
export default function TransformSimulation() {
    const [timeShift, setTimeShift] = useState(0);
    const [timeScale, setTimeScale] = useState(1);
    const [signalType, setSignalType] = useState<'rect' | 'tri' | 'step'>('rect');

    // Generate base signal
    const baseSignal = useMemo(() => {
        const points = [];
        const range = 4; // -2 to 2
        const numPoints = 500;

        for (let i = 0; i <= numPoints; i++) {
            const t = (i / numPoints) * range - range / 2;
            let value = 0;

            if (signalType === 'rect') {
                // rect(t) = 1 for |t| <= 0.5
                value = Math.abs(t) <= 0.5 ? 1 : 0;
            } else if (signalType === 'tri') {
                // tri(t) = 1 - |t| for |t| <= 1
                value = Math.abs(t) <= 1 ? 1 - Math.abs(t) : 0;
            } else {
                // u(t) = step function
                value = t >= 0 ? 1 : 0;
            }

            points.push({ t, original: value });
        }
        return points;
    }, [signalType]);

    // Generate transformed signal x(at + b) where a = timeScale, b = timeShift
    const transformedSignal = useMemo(() => {
        const points = [];
        const range = 6;
        const numPoints = 500;

        for (let i = 0; i <= numPoints; i++) {
            const t = (i / numPoints) * range - range / 2;

            // For x(at + b), the value at time t equals x evaluated at (a*t + b)
            const tTransformed = timeScale * t + timeShift;

            let value = 0;

            if (signalType === 'rect') {
                value = Math.abs(tTransformed) <= 0.5 ? 1 : 0;
            } else if (signalType === 'tri') {
                value = Math.abs(tTransformed) <= 1 ? 1 - Math.abs(tTransformed) : 0;
            } else {
                value = tTransformed >= 0 ? 1 : 0;
            }

            points.push({ t, transformed: value });
        }
        return points;
    }, [timeScale, timeShift, signalType]);

    // Merge for plotting
    const combinedData = useMemo(() => {
        return transformedSignal.map((point, i) => {
            // Find corresponding original point
            const origIdx = Math.round((point.t + 2) / 4 * 500);
            const original = baseSignal[Math.max(0, Math.min(origIdx, baseSignal.length - 1))]?.original || 0;

            return {
                t: point.t,
                original,
                transformed: point.transformed,
            };
        });
    }, [baseSignal, transformedSignal]);

    // Calculate effective parameters
    const effectiveShift = timeScale !== 0 ? -timeShift / timeScale : 0;
    const isCompressed = Math.abs(timeScale) > 1;
    const isReversed = timeScale < 0;

    return (
        <div className={styles.simulation}>
            <div className={styles.header}>
                <h3 className={styles.title}>🎨 Signal Transform Visualizer</h3>
                <p className={styles.subtitle}>
                    Shift, scale, and reverse signals interactively
                </p>
            </div>

            <div className={styles.controls}>
                <div className={styles.sliderGroup}>
                    <label className={styles.label}>Base Signal:</label>
                    <select
                        value={signalType}
                        onChange={(e) => setSignalType(e.target.value as 'rect' | 'tri' | 'step')}
                        className={styles.select}
                    >
                        <option value="rect">rect(t) — Rectangle</option>
                        <option value="tri">tri(t) — Triangle</option>
                        <option value="step">u(t) — Unit Step</option>
                    </select>
                </div>

                <div className={styles.sliderGroup}>
                    <label className={styles.label}>
                        Time Scale (a): <span className={styles.value}>{timeScale.toFixed(1)}</span>
                    </label>
                    <input
                        type="range"
                        min={-2}
                        max={2}
                        step={0.1}
                        value={timeScale}
                        onChange={(e) => setTimeScale(Number(e.target.value))}
                        className={styles.slider}
                    />
                </div>

                <div className={styles.sliderGroup}>
                    <label className={styles.label}>
                        Time Shift (b): <span className={styles.value}>{timeShift.toFixed(1)}</span>
                    </label>
                    <input
                        type="range"
                        min={-2}
                        max={2}
                        step={0.1}
                        value={timeShift}
                        onChange={(e) => setTimeShift(Number(e.target.value))}
                        className={styles.slider}
                    />
                </div>
            </div>

            <div className={styles.formula}>
                x({timeScale.toFixed(1)}t {timeShift >= 0 ? '+' : ''} {timeShift.toFixed(1)})
            </div>

            <div className={styles.info}>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Scaling:</span>
                    <span className={styles.infoValue}>
                        {isCompressed ? 'Compressed' : Math.abs(timeScale) < 1 && timeScale !== 0 ? 'Stretched' : 'None'}
                        {isReversed && ' + Reversed'}
                    </span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Effective Shift:</span>
                    <span className={styles.infoValue}>
                        {effectiveShift.toFixed(2)} units {effectiveShift > 0 ? '(left)' : effectiveShift < 0 ? '(right)' : ''}
                    </span>
                </div>
            </div>

            <SignalPlot
                data={combinedData}
                lines={[
                    { dataKey: 'original', name: 'x(t)', color: '#888888', strokeWidth: 2, strokeDasharray: '5 5' },
                    { dataKey: 'transformed', name: `x(${timeScale}t + ${timeShift})`, color: '#00ff88', strokeWidth: 2 },
                ]}
                title="Original vs Transformed Signal"
                xLabel="Time (t)"
                yLabel="Amplitude"
                height={350}
                xDomain={[-3, 3]}
                yDomain={[-0.5, 1.5]}
            />

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={styles.legendLine} style={{ background: '#888888' }} />
                    <span>Original x(t)</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={styles.legendLine} style={{ background: '#00ff88' }} />
                    <span>Transformed x({timeScale}t + {timeShift})</span>
                </div>
            </div>

            <div className={styles.insight}>
                <strong>Transform: x({timeScale.toFixed(1)}t {timeShift >= 0 ? '+' : ''} {timeShift.toFixed(1)})</strong>
                <br />
                {Math.abs(timeScale) > 1 && 'The signal is compressed (happens faster). '}
                {Math.abs(timeScale) < 1 && Math.abs(timeScale) > 0 && 'The signal is stretched (happens slower). '}
                {isReversed && 'Negative scale reverses the signal in time. '}
                {timeShift !== 0 && `The effective shift is ${Math.abs(effectiveShift).toFixed(2)} units ${effectiveShift > 0 ? 'to the left' : 'to the right'}.`}
            </div>
        </div>
    );
}
