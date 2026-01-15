'use client';

import { useState, useMemo } from 'react';
import SignalPlot from './SignalPlot';
import styles from './Simulation.module.css';

/**
 * SIGNAL + NOISE SIMULATION
 * 
 * Purpose: Demonstrate deterministic vs random signals and SNR
 * Concept: Deterministic vs Random Signals
 * 
 * Controls:
 * - Signal amplitude (0.1 - 2)
 * - Noise level (variance: 0 - 1)
 * 
 * Key Insight: SNR = Signal Power / Noise Power
 */
export default function NoiseSimulation() {
    const [signalAmp, setSignalAmp] = useState(1);
    const [noiseLevel, setNoiseLevel] = useState(0.3);
    const [signalFreq] = useState(3); // Fixed frequency

    // Calculate SNR
    const signalPower = signalAmp * signalAmp / 2; // RMS power of sinusoid
    const noisePower = noiseLevel * noiseLevel;
    const snrLinear = noisePower > 0 ? signalPower / noisePower : Infinity;
    const snrDb = noisePower > 0 ? 10 * Math.log10(snrLinear) : Infinity;

    // Generate data with noise
    const data = useMemo(() => {
        const points = [];
        const duration = 2;
        const numPoints = 400;

        // Use deterministic "random" for consistent appearance
        const pseudoRandom = (seed: number) => {
            const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
            return x - Math.floor(x);
        };

        for (let i = 0; i <= numPoints; i++) {
            const t = (i / numPoints) * duration;
            const cleanSignal = signalAmp * Math.sin(2 * Math.PI * signalFreq * t);

            // Box-Muller for Gaussian-like noise
            const u1 = pseudoRandom(i * 1.1);
            const u2 = pseudoRandom(i * 2.3);
            const noise = noiseLevel * Math.sqrt(-2 * Math.log(u1 + 0.001)) * Math.cos(2 * Math.PI * u2);

            const noisySignal = cleanSignal + noise;

            points.push({
                t,
                clean: cleanSignal,
                noisy: noisySignal,
                noise: noise,
            });
        }
        return points;
    }, [signalAmp, noiseLevel, signalFreq]);

    return (
        <div className={styles.simulation}>
            <div className={styles.header}>
                <h3 className={styles.title}>🎛️ Signal vs Noise Visualizer</h3>
                <p className={styles.subtitle}>
                    See how noise affects a deterministic signal
                </p>
            </div>

            <div className={styles.controls}>
                <div className={styles.sliderGroup}>
                    <label className={styles.label}>
                        Signal Amplitude: <span className={styles.value}>{signalAmp.toFixed(1)}</span>
                    </label>
                    <input
                        type="range"
                        min={0.1}
                        max={2}
                        step={0.1}
                        value={signalAmp}
                        onChange={(e) => setSignalAmp(Number(e.target.value))}
                        className={styles.slider}
                    />
                </div>

                <div className={styles.sliderGroup}>
                    <label className={styles.label}>
                        Noise Level (σ): <span className={styles.value}>{noiseLevel.toFixed(2)}</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={noiseLevel}
                        onChange={(e) => setNoiseLevel(Number(e.target.value))}
                        className={styles.slider}
                    />
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Signal Power:</span>
                    <span className={styles.infoValue}>{signalPower.toFixed(3)}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Noise Power:</span>
                    <span className={styles.infoValue}>{noisePower.toFixed(3)}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>SNR:</span>
                    <span className={styles.infoValue}>
                        {snrDb === Infinity ? '∞' : `${snrDb.toFixed(1)} dB`}
                    </span>
                </div>
            </div>

            <SignalPlot
                data={data}
                lines={[
                    { dataKey: 'clean', name: 'Deterministic Signal', color: '#00ff88', strokeWidth: 2 },
                    { dataKey: 'noisy', name: 'Signal + Noise', color: '#ff8844', strokeWidth: 1.5 },
                ]}
                title="Deterministic Signal with Random Noise"
                xLabel="Time (s)"
                yLabel="Amplitude"
                height={350}
                yDomain={[-3, 3]}
            />

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={styles.legendLine} style={{ background: '#00ff88' }} />
                    <span>Clean (Deterministic)</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={styles.legendLine} style={{ background: '#ff8844' }} />
                    <span>With Noise (Random)</span>
                </div>
            </div>

            <div className={styles.insight}>
                <strong>SNR = {snrDb === Infinity ? '∞' : snrDb.toFixed(1)} dB</strong> —
                {snrDb > 20 ? (
                    ' Excellent signal quality. The noise is barely visible.'
                ) : snrDb > 10 ? (
                    ' Good signal quality. Signal is clearly distinguishable.'
                ) : snrDb > 3 ? (
                    ' Moderate quality. Some detail is being lost to noise.'
                ) : (
                    ' Poor quality. Noise is dominating the signal.'
                )}
            </div>
        </div>
    );
}
