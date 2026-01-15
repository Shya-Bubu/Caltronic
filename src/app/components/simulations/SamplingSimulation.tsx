'use client';

import { useState, useMemo, useCallback } from 'react';
import SignalPlot from './SignalPlot';
import styles from './Simulation.module.css';

/**
 * SAMPLING SIMULATION
 * 
 * Purpose: Demonstrate how sampling works and what causes aliasing
 * Concept: Continuous vs Discrete Signals
 * 
 * Controls:
 * - Signal frequency (1-50 Hz)
 * - Sampling frequency (1-100 Hz)
 * 
 * Key Insight: When fs < 2*f_signal, aliasing occurs
 */
export default function SamplingSimulation() {
    const [signalFreq, setSignalFreq] = useState(5); // Hz
    const [samplingFreq, setSamplingFreq] = useState(20); // Hz

    // Nyquist check
    const nyquistLimit = 2 * signalFreq;
    const isAliasing = samplingFreq < nyquistLimit;

    // Generate continuous signal data (dense points)
    const continuousData = useMemo(() => {
        const points = [];
        const duration = 1; // 1 second
        const numPoints = 500;

        for (let i = 0; i <= numPoints; i++) {
            const t = (i / numPoints) * duration;
            const value = Math.sin(2 * Math.PI * signalFreq * t);
            points.push({ t, value });
        }
        return points;
    }, [signalFreq]);

    // Generate sampled points
    const sampledData = useMemo(() => {
        const points = [];
        const duration = 1;
        const samplingPeriod = 1 / samplingFreq;
        const numSamples = Math.floor(duration / samplingPeriod);

        for (let i = 0; i <= numSamples; i++) {
            const t = i * samplingPeriod;
            if (t <= duration) {
                const value = Math.sin(2 * Math.PI * signalFreq * t);
                points.push({ t, value, sampled: value });
            }
        }
        return points;
    }, [signalFreq, samplingFreq]);

    // Generate aliased signal (what would be reconstructed from samples)
    const aliasedData = useMemo(() => {
        if (!isAliasing) return [];

        // Calculate aliased frequency
        const fAlias = Math.abs(signalFreq - Math.round(signalFreq / samplingFreq) * samplingFreq);

        const points = [];
        const duration = 1;
        const numPoints = 500;

        for (let i = 0; i <= numPoints; i++) {
            const t = (i / numPoints) * duration;
            const value = Math.sin(2 * Math.PI * fAlias * t);
            points.push({ t, aliased: value });
        }
        return points;
    }, [signalFreq, samplingFreq, isAliasing]);

    // Merge data for combined plot
    const combinedData = useMemo(() => {
        const merged = continuousData.map((point) => ({
            t: point.t,
            continuous: point.value,
            sampled: undefined as number | undefined,
            aliased: undefined as number | undefined,
        }));

        // Add sampled points
        sampledData.forEach((sample) => {
            const idx = merged.findIndex((p) => Math.abs(p.t - sample.t) < 0.001);
            if (idx >= 0) {
                merged[idx].sampled = sample.value;
            }
        });

        // Add aliased signal if aliasing
        if (isAliasing && aliasedData.length > 0) {
            aliasedData.forEach((point, i) => {
                if (i < merged.length) {
                    merged[i].aliased = point.aliased;
                }
            });
        }

        return merged;
    }, [continuousData, sampledData, aliasedData, isAliasing]);

    return (
        <div className={styles.simulation}>
            <div className={styles.header}>
                <h3 className={styles.title}>🔬 Sampling Visualizer</h3>
                <p className={styles.subtitle}>
                    See how sampling rate affects signal representation
                </p>
            </div>

            <div className={styles.controls}>
                <div className={styles.sliderGroup}>
                    <label className={styles.label}>
                        Signal Frequency: <span className={styles.value}>{signalFreq} Hz</span>
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={50}
                        step={1}
                        value={signalFreq}
                        onChange={(e) => setSignalFreq(Number(e.target.value))}
                        className={styles.slider}
                    />
                </div>

                <div className={styles.sliderGroup}>
                    <label className={styles.label}>
                        Sampling Frequency: <span className={styles.value}>{samplingFreq} Hz</span>
                        <span className={isAliasing ? styles.warning : styles.ok}>
                            {isAliasing ? ' ⚠️ ALIASING' : ' ✓ OK'}
                        </span>
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={100}
                        step={1}
                        value={samplingFreq}
                        onChange={(e) => setSamplingFreq(Number(e.target.value))}
                        className={styles.slider}
                    />
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Nyquist Rate:</span>
                    <span className={styles.infoValue}>{nyquistLimit} Hz</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Sampling Period:</span>
                    <span className={styles.infoValue}>{(1 / samplingFreq * 1000).toFixed(1)} ms</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Samples/Period:</span>
                    <span className={styles.infoValue}>{(samplingFreq / signalFreq).toFixed(1)}</span>
                </div>
            </div>

            <SignalPlot
                data={combinedData}
                lines={[
                    { dataKey: 'continuous', name: 'Original Signal', color: '#00ff88', strokeWidth: 2 },
                    ...(isAliasing ? [{ dataKey: 'aliased', name: 'Aliased Signal', color: '#ff4444', strokeWidth: 2, strokeDasharray: '5 5' }] : []),
                    { dataKey: 'sampled', name: 'Samples', color: '#ffcc00', dot: true, strokeWidth: 0 },
                ]}
                title="Continuous Signal with Discrete Samples"
                xLabel="Time (s)"
                yLabel="Amplitude"
                height={200}
                xDomain={[0, 1]}
                yDomain={[-1.5, 1.5]}
            />

            <div className={styles.insight}>
                {isAliasing ? (
                    <>
                        <strong>⚠️ Aliasing Detected!</strong> The sampling rate ({samplingFreq} Hz) is below
                        the Nyquist rate ({nyquistLimit} Hz). The red dashed line shows what the reconstructed
                        signal would look like — a lower frequency that doesn&apos;t match the original!
                    </>
                ) : (
                    <>
                        <strong>✓ No Aliasing</strong> The sampling rate ({samplingFreq} Hz) exceeds
                        the Nyquist rate ({nyquistLimit} Hz) by {((samplingFreq / nyquistLimit - 1) * 100).toFixed(0)}%.
                        The original signal can be perfectly reconstructed from these samples.
                    </>
                )}
            </div>
        </div>
    );
}
