import SignalPlot from './SignalPlot';
import TimeDomainPlot from './TimeDomainPlot';
import {
  BlockDiagram as LegacyBlockDiagram,
  SineWaveDiagram,
  DiscreteStemPlot,
  SimpleCircuit,
  VICurve as LegacyVICurve,
  FrequencySpectrum,
  StepFunction,
} from './EngineeringDiagrams';
import type { VisualItem } from './visualsSchema';
import { isSignalPlotElements, isTimeDomainPlotElements } from './visualsSchema';


// NEW v3 diagram & simulation components (React+SVG, no D3 dependency)
import {
  EngineeringPlot,
  generateLinearVI,
  generateDiodeVI,
  generateIdealDiodeVI,
  generateTunnelDiodeVI,
  generateOpenCircuitVI,
  generateShortCircuitVI,
  generateSineWave,
  generateStepFunction,
  generateExponentialDecay,
  CircuitDiagram,
  Resistor, ResistorIEC, Capacitor, Inductor, Diode as DiodeSym,
  VoltageSource, CurrentSource, OpAmp, Switch, Ground, Wire,
  JunctionNode, CurrentArrow, VoltageMark,
  OhmsLawSimulator,
  LoadLineSimulator,
  DiodeCircuitSimulator,
  PWLExplorer,
  WaveformSimulator,
} from '@/app/components/diagrams';

// Plotly.js interactive chart component (client-only)
import PlotlyChart from '@/app/components/PlotlyChart';

// Phase 2: Declarative circuit diagrams and Falstad simulator
import CircuitSchematic from '@/app/components/CircuitSchematic';
import FalstadEmbed from '@/app/components/FalstadEmbed';

export default function VisualRenderer({
  item,
  fallbackTitle,
}: {
  item: VisualItem;
  fallbackTitle?: string;
}) {
  const title = item.title ?? fallbackTitle;
  const description = item.description;
  const type = item.type ?? 'unknown';

  // ===== PLOTLY.JS INTERACTIVE CHARTS =====
  if (type === 'plotly') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plotItem = item as any;
    const traces = Array.isArray(plotItem.traces) ? plotItem.traces : [];
    const plotLayout = typeof plotItem.layout === 'object' ? plotItem.layout : {};
    return (
      <PlotlyChart
        traces={traces}
        layout={plotLayout}
        title={title}
        description={description}
        width={plotItem.width}
        height={plotItem.height}
        centeredAxes={plotItem.centeredAxes}
      />
    );
  }

  // ===== CIRCUIT SCHEMATICS (declarative JSON → SVG) =====
  if (type === 'circuit-schematic') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schematicItem = item as any;
    const elements = Array.isArray(schematicItem.elements) ? schematicItem.elements : [];
    return (
      <CircuitSchematic
        elements={elements}
        width={schematicItem.width}
        height={schematicItem.height}
        title={title}
        description={description}
      />
    );
  }

  // ===== FALSTAD INTERACTIVE SIMULATOR (iframe embed) =====
  if (type === 'falstad-sim') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const falstadItem = item as any;
    return (
      <FalstadEmbed
        circuitText={falstadItem.circuitText}
        title={title}
        description={description}
        height={falstadItem.height}
      />
    );
  }

  // ===== OHM'S LAW INTERACTIVE SIMULATOR =====
  if (type === 'ohms-law-sim') {
    return <OhmsLawSimulator title={title || "Ohm's Law Explorer"} />;
  }


// ===== EXISTING COMPONENTS =====


if (type === 'time-domain' && isTimeDomainPlotElements(item.elements)) {
  const cfg = item.elements;
  return (
    <TimeDomainPlot
      title={title}
      description={description}
      mode={cfg.signal.mode}
      initialAmplitude={cfg.signal.amplitude}
      initialFrequency={cfg.signal.frequency}
      sampleRate={cfg.signal.sampleRate}
      durationSeconds={cfg.view?.durationSeconds}
      samples={cfg.view?.samples}
      points={cfg.view?.points}
    />
  );
}

if (type === 'signal-plot' && isSignalPlotElements(item.elements)) {
  const cfg = item.elements;
  return (
    <SignalPlot
      title={title}
      description={description}
      mode={cfg.signal.mode}
      initialAmplitude={cfg.signal.amplitude}
      initialFrequency={cfg.signal.frequency}
      sampleRate={cfg.signal.sampleRate}
      durationSeconds={cfg.view?.durationSeconds}
      samples={cfg.view?.samples}
      points={cfg.view?.points}
    />
  );
}

// Legacy Engineering Diagrams
if (type === 'block-diagram') {
  return <LegacyBlockDiagram title={title} caption={description} />;
}

if (type === 'sine-wave') {
  return <SineWaveDiagram title={title} caption={description} />;
}

if (type === 'discrete-stem') {
  return <DiscreteStemPlot title={title} caption={description} />;
}

if (type === 'circuit') {
  const circuitType = 'circuitType' in item && typeof item.circuitType === 'string'
    ? item.circuitType as 'resistor' | 'series' | 'parallel' | 'diode'
    : 'resistor';
  return <SimpleCircuit title={title} caption={description} circuitType={circuitType} />;
}

if (type === 'vi-curve') {
  const curveType = 'curveType' in item && typeof item.curveType === 'string'
    ? item.curveType as 'linear' | 'diode' | 'tunnel' | 'open' | 'short' | 'glow' | 'pn-junction' | 'bilateral'
    : 'linear';
  return <LegacyVICurve title={title} caption={description} curveType={curveType} />;
}

if (type === 'frequency-spectrum') {
  return <FrequencySpectrum title={title} caption={description} />;
}

if (type === 'step-function') {
  return <StepFunction title={title} caption={description} />;
}

// ===== v3 COMPONENTS (React+SVG, no D3) =====

// v3 Ohm's Law interactive simulator (circuit + V-I plot)
if (type === 'v3-ohms-law') {
  return <OhmsLawSimulator title={title || "Ohm's Law Explorer"} />;
}

// v3 Load-line analysis simulator
if (type === 'v3-load-line') {
  return <LoadLineSimulator title={title || 'Load-Line Analysis'} />;
}

// v3 Diode circuit simulator
if (type === 'v3-diode-circuit') {
  return <DiodeCircuitSimulator title={title || 'Diode Circuit Simulator'} />;
}

// v3 PWL approximation explorer
if (type === 'v3-pwl-explorer') {
  return <PWLExplorer title={title || 'Piecewise-Linear Approximation'} />;
}

// v3 Waveform/signal simulator
if (type === 'v3-waveform') {
  return <WaveformSimulator title={title || 'Waveform Generator'} />;
}

// v3 Engineering plot (for V-I curves, signal plots, etc.)
if (type === 'v3-plot') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plotItem = item as any;
  const curves = plotItem.curves || [];
  const xAxis = plotItem.xAxis || { label: 'x', min: -5, max: 5 };
  const yAxis = plotItem.yAxis || { label: 'y', min: -5, max: 5 };
  return (
    <div style={{ marginBlock: '1.5rem' }}>
      <EngineeringPlot
        title={title}
        width={plotItem.width || 480}
        height={plotItem.height || 320}
        xAxis={xAxis}
        yAxis={yAxis}
        curves={curves}
        annotations={plotItem.annotations}
        centeredAxes={plotItem.centeredAxes}
        showLegend={curves.length > 1}
      />
      {description && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          {description}
        </div>
      )}
    </div>
  );
}

// v3 Circuit diagram (declarative SVG circuit)
if (type === 'v3-circuit') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circuitItem = item as any;
  // Circuit diagrams render using children DSL in content, so we show a labeled container
  return (
    <div style={{ marginBlock: '1.5rem', textAlign: 'center' }}>
      <CircuitDiagram
        width={circuitItem.width || 400}
        height={circuitItem.height || 250}
        title={title}
      >
        {/* Circuit elements are composed in content-specific components */}
      </CircuitDiagram>
      {description && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {description}
        </div>
      )}
    </div>
  );
}

// Static image from lecture notes
if (type === 'image' && 'src' in item && typeof item.src === 'string') {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1rem',
      background: 'rgba(255,255,255,0.01)',
    }}>
      {title && <div style={{ fontWeight: 650, marginBottom: '0.75rem', color: 'var(--text)' }}>{title}</div>}
      <img
        src={item.src}
        alt={title || 'Diagram'}
        style={{
          width: '100%',
          maxWidth: '800px',
          height: 'auto',
          borderRadius: 'var(--radius)',
          display: 'block',
          margin: '0 auto',
        }}
      />
      {'caption' in item && typeof item.caption === 'string' && item.caption && (
        <div style={{
          marginTop: '0.75rem',
          fontSize: '0.9rem',
          color: 'var(--muted)',
          fontStyle: 'italic',
        }}>
          {item.caption}
        </div>
      )}
    </div>
  );
}

// Image Gallery type (for concepts that have multiple related images)
if (type === 'image-gallery') {
  const images = ('images' in item && Array.isArray(item.images)) ? item.images : [];

  return (
    <div style={{ marginBlock: '1rem', textAlign: 'center' }}>
      {title && (
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem' }}>
          {title}
        </div>
      )}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        {images.map((img, idx) => (
          <div key={idx} style={{ maxWidth: 300 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt || title || 'Gallery image'}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 8,
                border: '1px solid var(--border)',
              }}
            />
            {img.caption && (
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--muted)',
                fontStyle: 'italic',
              }}>
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>
      {description && (
        <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0.75rem auto 0' }}>
          {description}
        </div>
      )}
    </div>
  );
}

return (
  <div style={{
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '0.9rem 1rem',
    color: 'var(--muted)',
    background: 'rgba(255,255,255,0.01)',
  }}>
    <div style={{ fontWeight: 650, color: 'var(--text)' }}>{title ?? 'Visual'}</div>
    {description ? <div style={{ marginTop: '0.35rem' }}>{description}</div> : null}
    <div style={{ marginTop: '0.5rem' }}>No renderer for visual type: {String(type)}</div>
  </div>
);
}

