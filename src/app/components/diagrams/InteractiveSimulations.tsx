'use client';

/**
 * INTERACTIVE SIMULATION COMPONENTS
 * 
 * React-based interactive simulations with sliders/controls.
 * For Circuit Analysis: Ohm's Law explorer, V-I curve manipulator, load-line analysis.
 * For Signals: Waveform generator, convolution demo, sampling.
 * For Digital: Logic gate simulator.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { EngineeringPlot, generateLinearVI, generateDiodeVI, generateSineWave, type PlotCurve, type PlotAnnotation } from './EngineeringPlot';
import { CircuitDiagram, Resistor, VoltageSource, Wire, Ground, JunctionNode, CurrentArrow, VoltageMark, Diode } from './CircuitSymbols';

// ─────────────────────────────────────────────
// Slider component for simulations
// ─────────────────────────────────────────────
interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (val: number) => void;
}

function SliderControl({ label, value, min, max, step, unit = '', onChange }: SliderControlProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.4rem 0',
      fontFamily: 'var(--font-sans)',
    }}>
      <label style={{ fontSize: '0.85rem', color: 'var(--sim-text)', minWidth: '80px', fontWeight: 500 }}>
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ flex: 1, accentColor: 'var(--accent)', cursor: 'pointer' }}
      />
      <span style={{
        fontSize: '0.85rem',
        color: 'var(--sim-text-strong)',
        fontFamily: 'var(--font-mono)',
        minWidth: '65px',
        textAlign: 'right',
        fontWeight: 600,
      }}>
        {value.toFixed(step < 1 ? 2 : 0)}{unit}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// OHMS LAW SIMULATOR
// Shows circuit + V-I plot side by side
// ─────────────────────────────────────────────
export function OhmsLawSimulator({ title }: { title?: string }) {
  const [resistance, setResistance] = useState(100);
  const [voltage, setVoltage] = useState(5);

  const current = voltage / resistance;
  const power = voltage * current;

  const viCurve: PlotCurve[] = useMemo(() => [{
    id: 'linear',
    label: `R = ${resistance}Ω`,
    points: generateLinearVI(resistance, [-10, 10]),
  }], [resistance]);

  const operatingPoint: PlotAnnotation[] = useMemo(() => [{
    x: voltage,
    y: current,
    label: `Q (${voltage}V, ${(current * 1000).toFixed(1)}mA)`,
    color: 'var(--sim-warning)',
  }], [voltage, current]);

  return (
    <div style={{
      margin: '1.5rem 0',
      padding: '1.25rem',
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
    }}>
      {title && (
        <div style={{
          fontWeight: 650,
          fontSize: '1rem',
          color: 'var(--sim-text-strong)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-sans)',
        }}>
          {title}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Circuit Diagram */}
        <div>
          <CircuitDiagram width={280} height={200} title="Circuit">
            <VoltageSource x={60} y={100} rotation={90} label="V" value={`${voltage}V`} />
            <Wire x1={60} y1={70} x2={60} y2={40} />
            <Wire x1={60} y1={40} x2={220} y2={40} />
            <Resistor x={160} y={40} label="R" value={`${resistance}Ω`} />
            <Wire x1={190} y1={40} x2={220} y2={40} />
            <Wire x1={220} y1={40} x2={220} y2={130} />
            <Wire x1={220} y1={130} x2={60} y2={130} />
            <CurrentArrow x={110} y={32} label={`i = ${(current * 1000).toFixed(1)}mA`} />
            <Ground x={140} y={130} />
          </CircuitDiagram>

          {/* Readouts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
          }}>
            <div style={{ padding: '0.4rem 0.6rem', background: 'var(--code-bg)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--sim-text)' }}>I = </span>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{(current * 1000).toFixed(2)} mA</span>
            </div>
            <div style={{ padding: '0.4rem 0.6rem', background: 'var(--code-bg)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--sim-text)' }}>P = </span>
              <span style={{ color: 'var(--sim-accent-alt)', fontWeight: 600 }}>{(power * 1000).toFixed(2)} mW</span>
            </div>
          </div>
        </div>

        {/* V-I Plot */}
        <EngineeringPlot
          title="V-I Characteristic"
          width={280}
          height={250}
          xAxis={{ label: 'Voltage', min: -10, max: 10, unit: 'V', tickCount: 4 }}
          yAxis={{ label: 'Current', min: -0.1, max: 0.1, unit: 'A', tickCount: 4 }}
          curves={viCurve}
          annotations={operatingPoint}
          centeredAxes
          showLegend={false}
        />
      </div>

      {/* Controls */}
      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        <SliderControl label="Resistance" value={resistance} min={10} max={1000} step={10} unit="Ω" onChange={setResistance} />
        <SliderControl label="Voltage" value={voltage} min={-10} max={10} step={0.5} unit="V" onChange={setVoltage} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LOAD LINE ANALYSIS SIMULATOR
// Shows source + resistor load line vs device curve
// ─────────────────────────────────────────────
export function LoadLineSimulator({ title }: { title?: string }) {
  const [vs, setVs] = useState(5);
  const [rl, setRl] = useState(100);

  // Load line: v = Vs - i*RL → i = (Vs - v) / RL
  const loadLine: PlotCurve[] = useMemo(() => {
    const pts = [];
    for (let v = -1; v <= vs + 1; v += 0.05) {
      pts.push({ x: v, y: (vs - v) / rl });
    }
    return [{
      id: 'load-line',
      label: `Load Line (Vs=${vs}V, RL=${rl}Ω)`,
      points: pts,
      color: 'var(--sim-accent-alt)',
      dashed: true,
    }];
  }, [vs, rl]);

  // Device curve (linear resistor R=200Ω for now)
  const deviceCurve: PlotCurve[] = useMemo(() => [{
    id: 'device',
    label: 'Device (R=200Ω)',
    points: generateLinearVI(200, [-1, 8]),
  }], []);

  // Operating point: intersection
  // V = Vs * Rd / (Rd + RL), I = Vs / (Rd + RL)
  const Rd = 200;
  const opV = vs * Rd / (Rd + rl);
  const opI = vs / (Rd + rl);

  const annotations: PlotAnnotation[] = useMemo(() => [
    { x: opV, y: opI, label: `Q (${opV.toFixed(2)}V, ${(opI * 1000).toFixed(1)}mA)`, color: 'var(--sim-warning)' },
    { x: vs, y: 0, label: `Vs=${vs}V`, color: 'var(--sim-accent-alt)', type: 'point' as const },
  ], [opV, opI, vs]);

  return (
    <div style={{
      margin: '1.5rem 0',
      padding: '1.25rem',
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
    }}>
      {title && (
        <div style={{
          fontWeight: 650,
          fontSize: '1rem',
          color: 'var(--sim-text-strong)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-sans)',
        }}>{title}</div>
      )}

      <EngineeringPlot
        width={480}
        height={320}
        xAxis={{ label: 'Voltage', min: -1, max: 8, unit: 'V', tickCount: 5 }}
        yAxis={{ label: 'Current', min: -0.01, max: 0.06, unit: 'A', tickCount: 5 }}
        curves={[...deviceCurve, ...loadLine]}
        annotations={annotations}
        centeredAxes
      />

      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        <SliderControl label="Source Voltage" value={vs} min={1} max={12} step={0.5} unit="V" onChange={setVs} />
        <SliderControl label="Load Resistance" value={rl} min={10} max={500} step={10} unit="Ω" onChange={setRl} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DIODE CIRCUIT SIMULATOR
// ─────────────────────────────────────────────
export function DiodeCircuitSimulator({ title }: { title?: string }) {
  const [vs, setVs] = useState(5);
  const [rl, setRl] = useState(1000);

  // Diode V-I curve
  const diodeCurve: PlotCurve[] = useMemo(() => [{
    id: 'diode',
    label: 'PN Junction',
    points: generateDiodeVI(1e-12, 0.026, [-0.5, 0.8], 300),
  }], []);

  // Load line
  const loadLine: PlotCurve[] = useMemo(() => {
    const pts = [];
    for (let v = -0.5; v <= vs; v += 0.01) {
      pts.push({ x: v, y: (vs - v) / rl });
    }
    return [{
      id: 'load-line',
      label: `Load Line`,
      points: pts,
      color: 'var(--sim-accent-alt)',
      dashed: true,
    }];
  }, [vs, rl]);

  return (
    <div style={{
      margin: '1.5rem 0',
      padding: '1.25rem',
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
    }}>
      {title && (
        <div style={{
          fontWeight: 650,
          fontSize: '1rem',
          color: 'var(--sim-text-strong)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-sans)',
        }}>{title}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start' }}>
        <CircuitDiagram width={260} height={180} title="Diode Circuit">
          <VoltageSource x={50} y={90} rotation={90} label="Vs" value={`${vs}V`} />
          <Wire x1={50} y1={60} x2={50} y2={30} />
          <Wire x1={50} y1={30} x2={130} y2={30} />
          <Diode x={130} y={30} label="D" />
          <Wire x1={160} y1={30} x2={210} y2={30} />
          <Resistor x={210} y={70} rotation={90} label="RL" value={`${rl}Ω`} />
          <Wire x1={210} y1={100} x2={210} y2={120} />
          <Wire x1={210} y1={120} x2={50} y2={120} />
          <Ground x={130} y={120} />
        </CircuitDiagram>

        <EngineeringPlot
          title="Operating Point Analysis"
          width={260}
          height={240}
          xAxis={{ label: 'v_D', min: -0.5, max: 1, unit: 'V', tickCount: 4 }}
          yAxis={{ label: 'i_D', min: -0.001, max: 0.01, unit: 'A', tickCount: 4 }}
          curves={[...diodeCurve, ...loadLine]}
          centeredAxes
        />
      </div>

      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        <SliderControl label="Source (Vs)" value={vs} min={0} max={12} step={0.5} unit="V" onChange={setVs} />
        <SliderControl label="Load (RL)" value={rl} min={100} max={10000} step={100} unit="Ω" onChange={setRl} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PWL (Piecewise Linear) EXPLORER
// ─────────────────────────────────────────────
export function PWLExplorer({ title }: { title?: string }) {
  const [breakpoint, setBreakpoint] = useState(0.6);
  const [slopeBelow, setSlopeBelow] = useState(0.001);
  const [slopeAbove, setSlopeAbove] = useState(0.05);

  // Generate PWL approximation
  const pwlCurve: PlotCurve[] = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let v = -1; v <= 1.5; v += 0.01) {
      let i: number;
      if (v < breakpoint) {
        i = slopeBelow * (v - breakpoint);
      } else {
        i = slopeAbove * (v - breakpoint);
      }
      pts.push({ x: v, y: i });
    }
    return [{
      id: 'pwl',
      label: 'PWL Model',
      points: pts,
      color: 'var(--sim-accent-alt)',
    }];
  }, [breakpoint, slopeBelow, slopeAbove]);

  // Actual diode curve for comparison
  const diodeCurve: PlotCurve[] = useMemo(() => [{
    id: 'actual',
    label: 'Actual Diode',
    points: generateDiodeVI(1e-12, 0.026, [-1, 1.5], 300),
    dashed: true,
  }], []);

  return (
    <div style={{
      margin: '1.5rem 0',
      padding: '1.25rem',
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
    }}>
      {title && (
        <div style={{
          fontWeight: 650,
          fontSize: '1rem',
          color: 'var(--sim-text-strong)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-sans)',
        }}>{title}</div>
      )}

      <EngineeringPlot
        width={450}
        height={300}
        xAxis={{ label: 'Voltage', min: -1, max: 1.5, unit: 'V', tickCount: 5 }}
        yAxis={{ label: 'Current', min: -0.01, max: 0.05, unit: 'A', tickCount: 5 }}
        curves={[...diodeCurve, ...pwlCurve]}
        annotations={[{
          x: breakpoint,
          y: 0,
          label: `V_bp = ${breakpoint.toFixed(2)}V`,
          type: 'vertical-line',
          color: 'var(--sim-formula)',
        }]}
        centeredAxes
      />

      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        <SliderControl label="Breakpoint" value={breakpoint} min={0} max={1} step={0.05} unit="V" onChange={setBreakpoint} />
        <SliderControl label="Slope (off)" value={slopeBelow} min={0} max={0.01} step={0.001} unit="S" onChange={setSlopeBelow} />
        <SliderControl label="Slope (on)" value={slopeAbove} min={0.01} max={0.1} step={0.005} unit="S" onChange={setSlopeAbove} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// WAVEFORM GENERATOR SIMULATION
// ─────────────────────────────────────────────
export function WaveformSimulator({ title }: { title?: string }) {
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [phase, setPhase] = useState(0);

  const curve: PlotCurve[] = useMemo(() => [{
    id: 'sine',
    label: `sin(2π·${frequency}t + ${phase.toFixed(1)})`,
    points: generateSineWave(frequency, amplitude, phase, [-1, 3], 400),
  }], [frequency, amplitude, phase]);

  return (
    <div style={{
      margin: '1.5rem 0',
      padding: '1.25rem',
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
    }}>
      {title && (
        <div style={{
          fontWeight: 650,
          fontSize: '1rem',
          color: 'var(--sim-text-strong)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-sans)',
        }}>{title}</div>
      )}

      <EngineeringPlot
        width={500}
        height={280}
        xAxis={{ label: 'Time', min: -1, max: 3, unit: 's', tickCount: 4 }}
        yAxis={{ label: 'Amplitude', min: -2, max: 2, tickCount: 4 }}
        curves={curve}
        centeredAxes
        showLegend={false}
      />

      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        <SliderControl label="Frequency" value={frequency} min={0.5} max={5} step={0.5} unit="Hz" onChange={setFrequency} />
        <SliderControl label="Amplitude" value={amplitude} min={0.1} max={2} step={0.1} unit="" onChange={setAmplitude} />
        <SliderControl label="Phase" value={phase} min={0} max={6.28} step={0.1} unit="rad" onChange={setPhase} />
      </div>
    </div>
  );
}
