'use client';

import { useState, useMemo } from 'react';
import SignalPlot from './SignalPlot';
import styles from './Simulation.module.css';

/**
 * ENERGY vs POWER SIGNAL SIMULATION
 * 
 * Purpose: Visualize energy and power calculations for different signals
 * Concept: Energy and Power Signals
 * 
 * Controls:
 * - Signal type (pulse, sinusoid, DC)
 * - Pulse width / Duration
 * - Amplitude
 * 
 * Key Insight: Energy signals have finite E, Power signals have finite P
 */
export default function EnergyPowerSimulation() {
    const [signalType, setSignalType] = useState<'pulse' | 'sinusoid' | 'exponential'>('pulse');
    const [amplitude, setAmplitude] = useState(1);
    const [width, setWidth] = useState(0.5); // pulse width or decay constant

    // Calculate energy and power
    const { energy, power, isEnergy, isPower } = useMemo(() => {
        if (signalType === 'pulse') {
            // Rectangular pulse: E = A² * 2T (finite)
            const E = amplitude * amplitude * 2 * width;
            return { energy: E, power: 0, isEnergy: true, isPower: false };
        } else if (signalType === 'sinusoid') {
            // Sinusoid: E = ∞, P = A²/2 (finite)
            const P = amplitude * amplitude / 2;
            return { energy: Infinity, power: P, isEnergy: false, isPower: true };
        } else {
            // Exponential decay: E = A²/(2α) where α is decay rate
            const alpha = 1 / width;
            const E = amplitude * amplitude / (2 * alpha);
            return { energy: E, power: 0, isEnergy: true, isPower: false };
        }
    }, [signalType, amplitude, width]);

    // Generate signal data
    const data = useMemo(() => {
        const points = [];
        const duration = 3;
        const numPoints = 500;

        for (let i = 0; i <= numPoints; i++) {
            const t = (i / numPoints) * duration - duration / 2;
            let value = 0;
            let squared = 0;

            if (signalType === 'pulse') {
                value = Math.abs(t) <= width ? amplitude : 0;
            } else if (signalType === 'sinusoid') {
                value = amplitude * Math.sin(2 * Math.PI * 2 * t);
            } else {
                // Exponential decay (causal)
                value = t >= 0 ? amplitude * Math.exp(-t / width) : 0;
            }

            squared = value * value;

            points.push({
                t,
                signal: value,
                squared,
            });
        }
        return points;
    }, [signalType, amplitude, width]);

    // Shade area data for energy visualization
    const areaData = useMemo(() => {
        return data.map((p) => ({
            t: p.t,
            area: signalType === 'sinusoid' ? 0 : p.squared * 0.5,
        }));
    }, [data, signalType]);

    return (
        <div className={styles.simulation}>
            <div className={styles.header}>
                <h3 className={styles.title}>⚡ Energy vs Power Calculator</h3>
                <p className={styles.subtitle}>
                    Compare energy and power signals interactively
                </p>
            </div>

            <div className={styles.controls}>
                <div className={styles.sliderGroup}>
                    <label className={styles.label}>Signal Type:</label>
                    <select
                        value={signalType}
                        onChange={(e) => setSignalType(e.target.value as 'pulse' | 'sinusoid' | 'exponential')}
                        className={styles.select}
                    >
                        <option value="pulse">Rectangular Pulse (Energy)</option>
                        <option value="exponential">Exponential Decay (Energy)</option>
                        <option value="sinusoid">Sinusoid (Power)</option>
                    </select>
                </div>

                <div className={styles.sliderGroup}>
                    <label className={styles.label}>
                        Amplitude: <span className={styles.value}>{amplitude.toFixed(1)}</span>
                    </label>
                    <input
                        type="range"
                        min={0.1}
                        max={2}
                        step={0.1}
                        value={amplitude}
                        onChange={(e) => setAmplitude(Number(e.target.value))}
                        className={styles.slider}
                    />
                </div>

                <div className={styles.sliderGroup}>
                    <label className={styles.label}>
                        {signalType === 'pulse' ? 'Half-Width' : signalType === 'exponential' ? 'Time Constant' : 'N/A'}:
                        <span className={styles.value}>
                            {signalType !== 'sinusoid' ? `${width.toFixed(2)} s` : '—'}
                        </span>
                    </label>
                    <input
                        type="range"
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className={styles.slider}
                        disabled={signalType === 'sinusoid'}
                    />
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Energy E:</span>
                    <span className={styles.infoValue}>
                        {energy === Infinity ? '∞' : energy.toFixed(3)}
                    </span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Power P:</span>
                    <span className={styles.infoValue}>
                        {power === 0 ? '0' : power.toFixed(3)}
                    </span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Classification:</span>
                    <span className={styles.infoValue} style={{ color: isEnergy ? '#00ff88' : '#ffcc00' }}>
                        {isEnergy ? 'ENERGY Signal' : 'POWER Signal'}
                    </span>
                </div>
            </div>

            <SignalPlot
                data={data}
                lines={[
                    { dataKey: 'signal', name: 'x(t)', color: '#00ff88', strokeWidth: 2 },
                    { dataKey: 'squared', name: '|x(t)|²', color: '#ffcc00', strokeWidth: 1.5, strokeDasharray: '4 4' },
                ]}
                title={`${signalType === 'pulse' ? 'Rectangular Pulse' : signalType === 'sinusoid' ? 'Sinusoidal Signal' : 'Exponential Decay'}`}
                xLabel="Time (s)"
                yLabel="Amplitude"
                height={200}
            />

            <div className={styles.formula}>
                {isEnergy ? (
                    <>E = ∫|x(t)|² dt = <strong>{energy.toFixed(3)}</strong> (finite)</>
                ) : (
                    <>P = lim(T→∞) (1/2T) ∫|x(t)|² dt = <strong>{power.toFixed(3)}</strong></>
                )}
            </div>

            <div className={styles.insight}>
                <strong>{isEnergy ? '⚡ Energy Signal' : '🔌 Power Signal'}</strong> —
                {isEnergy ? (
                    ` This signal has finite total energy (${energy.toFixed(3)}) and zero average power. It "runs out" over time, like a battery.`
                ) : (
                    ` This signal has infinite energy but finite average power (${power.toFixed(3)}). It continues forever, like a power plant.`
                )}
            </div>
        </div>
    );
}
