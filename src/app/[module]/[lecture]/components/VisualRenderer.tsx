import SignalPlot from './SignalPlot';
import TimeDomainPlot from './TimeDomainPlot';
import type { VisualItem } from './visualsSchema';
import { isSignalPlotElements, isTimeDomainPlotElements } from './visualsSchema';

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
