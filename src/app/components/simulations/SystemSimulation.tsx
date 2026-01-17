'use client';

import { useState, useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import styles from './Simulation.module.css';

/**
 * SYSTEM I/O SIMULATION
 * 
 * Purpose: Visualize how a system transforms input to output
 * Concept: Signal and System Foundations
 * 
 * Controls:
 * - Input signal type
 * - System type (amplifier, attenuator, delay, inverter)
 * - System parameter (gain, delay amount)
 * 
 * Key Insight: Output = System(Input)
 */
export default function SystemSimulation() {
    const [inputType, setInputType] = useState<'sine' | 'step' | 'pulse'>('sine');
    const [systemType, setSystemType] = useState<'amplifier' | 'attenuator' | 'delay' | 'inverter'>('amplifier');
    const [parameter, setParameter] = useState(2); // Gain or delay

    // Generate input and output signals
    const data = useMemo(() => {
        const points = [];
        const duration = 2;
        const numPoints = 500;

        for (let i = 0; i <= numPoints; i++) {
            const t = (i / numPoints) * duration;
            let input = 0;

            // Generate input signal
            if (inputType === 'sine') {
                input = Math.sin(2 * Math.PI * 2 * t);
            } else if (inputType === 'step') {
                input = t >= 0.5 ? 1 : 0;
            } else {
                // Pulse centered at t = 1
                input = t >= 0.8 && t <= 1.2 ? 1 : 0;
            }

            // Apply system transformation
            let output = input;
            let tDelayed = t;

            if (systemType === 'amplifier') {
                output = input * parameter;
            } else if (systemType === 'attenuator') {
                output = input / parameter;
            } else if (systemType === 'delay') {
                // For delay, we need to look at earlier time
                const delayAmount = parameter * 0.1; // Scale parameter to reasonable delay
                tDelayed = t - delayAmount;

                if (inputType === 'sine') {
                    output = tDelayed >= 0 ? Math.sin(2 * Math.PI * 2 * tDelayed) : 0;
                } else if (inputType === 'step') {
                    output = tDelayed >= 0.5 ? 1 : 0;
                } else {
                    output = tDelayed >= 0.8 && tDelayed <= 1.2 ? 1 : 0;
                }
            } else if (systemType === 'inverter') {
                output = -input;
            }

            points.push({ t, input, output });
        }
        return points;
    }, [inputType, systemType, parameter]);

    // System description
    const systemDescription = useMemo(() => {
        switch (systemType) {
            case 'amplifier':
                return `y(t) = ${parameter}x(t)`;
            case 'attenuator':
                return `y(t) = x(t)/${parameter}`;
            case 'delay':
                return `y(t) = x(t - ${(parameter * 0.1).toFixed(1)})`;
            case 'inverter':
                return 'y(t) = -x(t)';
            default:
                return 'y(t) = x(t)';
        }
    }, [systemType, parameter]);

    return (
        <div className={styles.simulation}>
            <div className={styles.header}>
                <h3 className={styles.title}>📦 System Input/Output Visualizer</h3>
                <p className={styles.subtitle}>
                    See how a system transforms signals
                </p>
            </div>

            {/* Block diagram representation */}
            <div className={styles.blockDiagram}>
                <div className={styles.block + ' ' + styles.inputBlock}>
                    <span>x(t)</span>
                    <span className={styles.blockLabel}>Input</span>
                </div>
                <div className={styles.arrow}>→</div>
                <div className={styles.block + ' ' + styles.systemBlock}>
                    <span>T{'{·}'}</span>
                    <span className={styles.blockLabel}>{systemType.charAt(0).toUpperCase() + systemType.slice(1)}</span>
                </div>
                <div className={styles.arrow}>→</div>
                <div className={styles.block + ' ' + styles.outputBlock}>
                    <span>y(t)</span>
                    <span className={styles.blockLabel}>Output</span>
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.sliderGroup}>
                    <label className={styles.label}>Input Signal:</label>
                    <select
                        value={inputType}
                        onChange={(e) => setInputType(e.target.value as 'sine' | 'step' | 'pulse')}
                        className={styles.select}
                    >
                        <option value="sine">Sinusoid</option>
                        <option value="step">Step Function</option>
                        <option value="pulse">Rectangular Pulse</option>
                    </select>
                </div>

                <div className={styles.sliderGroup}>
                    <label className={styles.label}>System Type:</label>
                    <select
                        value={systemType}
                        onChange={(e) => setSystemType(e.target.value as 'amplifier' | 'attenuator' | 'delay' | 'inverter')}
                        className={styles.select}
                    >
                        <option value="amplifier">Amplifier (Gain)</option>
                        <option value="attenuator">Attenuator</option>
                        <option value="delay">Time Delay</option>
                        <option value="inverter">Inverter</option>
                    </select>
                </div>

                {(systemType === 'amplifier' || systemType === 'attenuator' || systemType === 'delay') && (
                    <div className={styles.sliderGroup}>
                        <label className={styles.label}>
                            {systemType === 'delay' ? 'Delay' : 'Gain'}:
                            <span className={styles.value}>
                                {systemType === 'delay' ? `${(parameter * 0.1).toFixed(1)}s` : parameter.toFixed(1)}
                            </span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={5}
                            step={0.5}
                            value={parameter}
                            onChange={(e) => setParameter(Number(e.target.value))}
                            className={styles.slider}
                        />
                    </div>
                )}
            </div>

            <div className={styles.formula}>
                {systemDescription}
            </div>

            <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="t"
                            stroke="#888"
                            tick={{ fill: '#888', fontSize: 11 }}
                            domain={[0, 2]}
                            label={{ value: 'Time (s)', position: 'bottom', fill: '#888', fontSize: 12 }}
                        />
                        <YAxis
                            stroke="#888"
                            tick={{ fill: '#888', fontSize: 11 }}
                            label={{ value: 'Amplitude', angle: -90, position: 'insideLeft', fill: '#888', fontSize: 12 }}
                        />
                        <ReferenceLine y={0} stroke="#555" strokeWidth={1} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1a1a2e',
                                border: '1px solid #333',
                                borderRadius: '4px',
                                color: '#fff',
                                fontSize: '12px',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="input"
                            name="Input x(t)"
                            stroke="#00ccff"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="output"
                            name="Output y(t)"
                            stroke="#ff8844"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={styles.legendLine} style={{ background: '#00ccff' }} />
                    <span>Input x(t)</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={styles.legendLine} style={{ background: '#ff8844' }} />
                    <span>Output y(t)</span>
                </div>
            </div>

            <div className={styles.insight}>
                <strong>System: {systemType.charAt(0).toUpperCase() + systemType.slice(1)}</strong> —
                {systemType === 'amplifier' && ` Multiplies the signal by ${parameter}. The output has ${parameter}× the amplitude.`}
                {systemType === 'attenuator' && ` Divides the signal by ${parameter}. The output has 1/${parameter} the amplitude.`}
                {systemType === 'delay' && ` Shifts the signal ${(parameter * 0.1).toFixed(1)} seconds to the right. The output reproduces the input, but later.`}
                {systemType === 'inverter' && ' Multiplies by -1. The output is the mirror image about the time axis.'}
            </div>
        </div>
    );
}
