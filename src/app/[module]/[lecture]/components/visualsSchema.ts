export type VisualType = 'diagram' | 'block-diagram' | 'table' | 'signal-plot' | string;

export interface VisualRoot {
  conceptId?: string;
  visuals?: VisualItem[];
  metadata?: unknown;
}

export interface VisualItem {
  id?: string;
  title?: string;
  type?: VisualType;
  description?: string;
  elements?: unknown;
  columns?: unknown;
  rows?: unknown;
  // Circuit analysis specific props
  curveType?: string;
  circuitType?: string;
  // Image specific props
  src?: string;
  caption?: string;
}

export type SignalPlotMode = 'continuous' | 'discrete';

export interface SignalPlotElements {
  simulation: 'SignalPlot';
  signal: {
    kind: 'sin';
    mode: SignalPlotMode;
    amplitude?: number;
    frequency?: number;
    sampleRate?: number; // only used for discrete
  };
  view?: {
    durationSeconds?: number; // time window for continuous (default 1)
    samples?: number; // samples for continuous polyline (default 400)
    points?: number; // points for discrete (default 32)
  };
}

export interface TimeDomainPlotElements {
  simulation: 'TimeDomainPlot';
  signal: {
    kind: 'sin';
    mode: SignalPlotMode;
    amplitude?: number;
    frequency?: number;
    sampleRate?: number; // only used for discrete
  };
  view?: {
    durationSeconds?: number;
    samples?: number;
    points?: number;
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parseVisualRoot(value: unknown): VisualRoot | null {
  if (!isObject(value)) return null;

  const visualsRaw = value.visuals;
  const visuals: VisualItem[] | undefined = Array.isArray(visualsRaw)
    ? visualsRaw.filter(isObject).map((v) => {
      // Preserve ALL properties from the original visual item
      // This is critical for d3-iv-curve curves array, block diagram blocks/connections, etc.
      const item: VisualItem & Record<string, unknown> = {
        // Spread all original properties first
        ...v,
        // Then override with validated string properties
        id: typeof v.id === 'string' ? v.id : undefined,
        title: typeof v.title === 'string' ? v.title : undefined,
        type: typeof v.type === 'string' ? (v.type as VisualType) : undefined,
        description: typeof v.description === 'string' ? v.description : undefined,
        // Circuit analysis specific props
        curveType: typeof v.curveType === 'string' ? v.curveType : undefined,
        circuitType: typeof v.circuitType === 'string' ? v.circuitType : undefined,
        // Image specific props
        src: typeof v.src === 'string' ? v.src : undefined,
        caption: typeof v.caption === 'string' ? v.caption : undefined,
      };
      return item;
    })
    : undefined;

  return {
    conceptId: typeof value.conceptId === 'string' ? value.conceptId : undefined,
    visuals,
    metadata: (value as Record<string, unknown>).metadata,
  };
}


export function isSignalPlotElements(value: unknown): value is SignalPlotElements {
  if (!isObject(value)) return false;
  if (value.simulation !== 'SignalPlot') return false;

  const signal = value.signal;
  if (!isObject(signal)) return false;

  if (signal.kind !== 'sin') return false;
  if (signal.mode !== 'continuous' && signal.mode !== 'discrete') return false;

  if ('amplitude' in signal && typeof signal.amplitude !== 'number') return false;
  if ('frequency' in signal && typeof signal.frequency !== 'number') return false;
  if ('sampleRate' in signal && typeof signal.sampleRate !== 'number') return false;

  const view = value.view;
  if (view !== undefined) {
    if (!isObject(view)) return false;
    if ('durationSeconds' in view && typeof view.durationSeconds !== 'number') return false;
    if ('samples' in view && typeof view.samples !== 'number') return false;
    if ('points' in view && typeof view.points !== 'number') return false;
  }

  return true;
}

export function isTimeDomainPlotElements(value: unknown): value is TimeDomainPlotElements {
  if (!isObject(value)) return false;
  if (value.simulation !== 'TimeDomainPlot') return false;

  const signal = value.signal;
  if (!isObject(signal)) return false;

  if (signal.kind !== 'sin') return false;
  if (signal.mode !== 'continuous' && signal.mode !== 'discrete') return false;

  if ('amplitude' in signal && typeof signal.amplitude !== 'number') return false;
  if ('frequency' in signal && typeof signal.frequency !== 'number') return false;
  if ('sampleRate' in signal && typeof signal.sampleRate !== 'number') return false;

  const view = value.view;
  if (view !== undefined) {
    if (!isObject(view)) return false;
    if ('durationSeconds' in view && typeof view.durationSeconds !== 'number') return false;
    if ('samples' in view && typeof view.samples !== 'number') return false;
    if ('points' in view && typeof view.points !== 'number') return false;
  }

  return true;
}
