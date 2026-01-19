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

// New D3.js visualization components
import {
  Waveform,
  VICurvePlot,
  SamplingDemo,
  BlockDiagram as D3BlockDiagram,
  OhmsLawExplorer,
  HarmonicBuilder,
  SignalDecomposer,
  FourierCoefficientsExplorer,
  TimeShiftExplorer,
} from '@/app/components/visualizations';

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

  // ===== NEW D3.js COMPONENTS =====

  // D3 Waveform (sine, square, step, impulse, etc.)
  if (type === 'd3-waveform') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const waveItem = item as any;
    const waveType = (waveItem.waveType && typeof waveItem.waveType === 'string')
      ? waveItem.waveType as 'sine' | 'cosine' | 'square' | 'step' | 'impulse' | 'ramp' | 'triangle' | 'rect'
      : 'sine';
    const mode = (waveItem.mode && waveItem.mode === 'discrete') ? 'discrete' : 'continuous';

    return (
      <div style={{ marginBlock: '1rem', width: '100%', overflowX: 'auto' }}>
        <Waveform
          type={waveType}
          mode={mode}
          title={title}
          width={600}
          height={200}
        />
        {description && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            {description}
          </div>
        )}
      </div>
    );
  }

  // D3 Simulation (interactive simulations with controls)
  if (type === 'd3-simulation') {
    const simulationType = ('simulationType' in item && typeof item.simulationType === 'string')
      ? item.simulationType : 'generic';

    // For time-varying-resistor or ohms-law, use OhmsLawExplorer
    if (simulationType === 'time-varying-resistor' || simulationType === 'ohms-law') {
      return (
        <div style={{ marginBlock: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <OhmsLawExplorer title={title || 'Interactive Simulation'} width={600} height={400} />
          {description && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 600 }}>
              {description}
            </div>
          )}
        </div>
      );
    }

    // Generic simulation placeholder
    return (
      <div style={{
        marginBlock: '1rem',
        padding: '2rem',
        border: '2px dashed var(--border)',
        borderRadius: 'var(--radius)',
        textAlign: 'center',
        color: 'var(--muted)',
        background: 'rgba(59, 130, 246, 0.05)',
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>
          🔧 {title || 'Interactive Simulation'}
        </div>
        <div style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          Simulation type: {simulationType}
        </div>
        {description && <div style={{ fontSize: '0.85rem' }}>{description}</div>}
      </div>
    );
  }

  // D3 V-I Curve Plot (supports both d3-vi-curve and d3-iv-curve)
  // Uses MultiCurvePlot for full curves array support with individual parameters
  if (type === 'd3-vi-curve' || type === 'd3-iv-curve') {
    // Import dynamically to avoid circular deps
    const MultiCurvePlot = require('@/app/components/visualizations/MultiCurvePlot').default;

    // Get curves array from item
    const curves = ('curves' in item && Array.isArray(item.curves)) ? item.curves : [];

    // Legacy support: if no curves array but has curveType, create single curve
    if (curves.length === 0 && 'curveType' in item && typeof item.curveType === 'string') {
      curves.push({ type: item.curveType });
    }

    // Fallback to linear if still empty
    if (curves.length === 0) {
      curves.push({ type: 'linear-resistor', resistance: 100 });
    }

    return (
      <div style={{ marginBlock: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MultiCurvePlot
          curves={curves}
          title={title}
          width={340}
          height={340}
          showLegend={curves.length > 1}
        />
        {description && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 340 }}>
            {description}
          </div>
        )}
      </div>
    );
  }

  // D3 Sampling Demo (interactive aliasing)
  if (type === 'd3-sampling') {
    const signalFreq = ('signalFrequency' in item && typeof item.signalFrequency === 'number')
      ? item.signalFrequency
      : 2;

    return (
      <div style={{ marginBlock: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SamplingDemo
          signalFrequency={signalFreq}
          title={title}
          width={520}
          height={320}
          showControls={true}
        />
        {description && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 520 }}>
            {description}
          </div>
        )}
      </div>
    );
  }

  // D3 Block Diagram (DSL-based)
  if (type === 'd3-block-diagram') {
    const blocks = ('blocks' in item && Array.isArray(item.blocks)) ? item.blocks : [];
    const connections = ('connections' in item && Array.isArray(item.connections)) ? item.connections : [];

    return (
      <div style={{ marginBlock: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflowX: 'auto' }}>
        <D3BlockDiagram
          blocks={blocks}
          connections={connections}
          title={title}
          width={520}
          height={180}
        />
        {description && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 520 }}>
            {description}
          </div>
        )}
      </div>
    );
  }

  // D3 Ohm's Law Explorer (Interactive Simulation)
  if (type === 'd3-ohms-law-explorer' || type === 'd3-ohms-law') {
    return (
      <div style={{ marginBlock: '1.5rem' }}>
        <OhmsLawExplorer
          title={title}
          width={700}
          height={400}
        />
        {description && (
          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            {description}
          </div>
        )}
      </div>
    );
  }

  // ===== FOURIER SERIES SIMULATIONS =====

  // D3 Harmonic Builder (Interactive)
  if (type === 'd3-harmonic-builder') {
    const preset = ('preset' in item && typeof item.preset === 'string')
      ? item.preset as 'custom' | 'square' | 'triangle' | 'sawtooth'
      : 'custom';

    return (
      <div style={{ marginBlock: '1.5rem' }}>
        <HarmonicBuilder
          title={title}
          width={600}
          height={400}
          preset={preset}
        />
        {description && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            {description}
          </div>
        )}
      </div>
    );
  }

  // D3 Signal Decomposer (Fourier Reconstruction)
  if (type === 'd3-signal-decomposer') {
    const signalType = ('signalType' in item && typeof item.signalType === 'string')
      ? item.signalType as 'square' | 'triangle' | 'sawtooth'
      : 'square';

    return (
      <div style={{ marginBlock: '1.5rem' }}>
        <SignalDecomposer
          title={title}
          width={600}
          height={420}
          signalType={signalType}
        />
        {description && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            {description}
          </div>
        )}
      </div>
    );
  }

  // D3 Fourier Coefficients Explorer
  if (type === 'd3-fourier-coefficients') {
    return (
      <div style={{ marginBlock: '1.5rem' }}>
        <FourierCoefficientsExplorer
          title={title}
          width={700}
          height={450}
        />
        {description && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            {description}
          </div>
        )}
      </div>
    );
  }

  // D3 Time Shift Explorer
  if (type === 'd3-time-shift') {
    return (
      <div style={{ marginBlock: '1.5rem' }}>
        <TimeShiftExplorer
          title={title}
          width={650}
          height={450}
        />
        {description && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 650, marginLeft: 'auto', marginRight: 'auto' }}>
            {description}
          </div>
        )}
      </div>
    );
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

