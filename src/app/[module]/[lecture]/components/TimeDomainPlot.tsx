import { useMemo, useState } from 'react';

import styles from './TimeDomainPlot.module.css';

export type TimeDomainMode = 'continuous' | 'discrete';

export interface TimeDomainPlotProps {
  title?: string;
  description?: string;

  mode: TimeDomainMode;
  initialAmplitude?: number;
  initialFrequency?: number;

  // Discrete only
  sampleRate?: number;

  // View
  durationSeconds?: number; // continuous window length (default 1s)
  samples?: number; // continuous polyline points (default 400)
  points?: number; // discrete points count (default 32)
}

type Point = { x: number; y: number };

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) >= 100) return value.toFixed(0);
  if (Math.abs(value) >= 10) return value.toFixed(1);
  return value.toFixed(2);
}

export default function TimeDomainPlot({
  title,
  description,
  mode,
  initialAmplitude = 1,
  initialFrequency = 1,
  sampleRate = 20,
  durationSeconds = 1,
  samples = 400,
  points = 32,
}: TimeDomainPlotProps) {
  const [amplitude, setAmplitude] = useState(() => clamp(initialAmplitude, 0, 5));
  const [frequency, setFrequency] = useState(() => clamp(initialFrequency, 0.1, 10));

  // Fixed viewBox for predictable axes layout
  const width = 900;
  const height = 260;
  const padLeft = 48;
  const padRight = 16;
  const padTop = 18;
  const padBottom = 34;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const yMax = Math.max(0.5, amplitude);
  const yMin = -yMax;

  const yToSvg = (y: number) => {
    const t = (y - yMin) / (yMax - yMin);
    return padTop + (1 - t) * plotH;
  };

  const xToSvg = (t: number, tMin: number, tMax: number) => {
    const u = (t - tMin) / (tMax - tMin);
    return padLeft + u * plotW;
  };

  const continuous = useMemo(() => {
    const tMin = 0;
    const tMax = durationSeconds;
    const count = Math.max(80, Math.floor(samples));

    const pts: Point[] = [];
    for (let i = 0; i < count; i++) {
      const t = tMin + (i / (count - 1)) * (tMax - tMin);
      const y = amplitude * Math.sin(2 * Math.PI * frequency * t);
      pts.push({ x: xToSvg(t, tMin, tMax), y: yToSvg(y) });
    }

    const d = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(' ');

    return { d, tMin, tMax };
  }, [amplitude, frequency, durationSeconds, samples]);

  const discrete = useMemo(() => {
    const N = Math.max(8, Math.floor(points));
    const pts = Array.from({ length: N }, (_, n) => {
      // Discrete-time sampled sine
      const y = amplitude * Math.sin((2 * Math.PI * frequency * n) / sampleRate);
      const x = padLeft + (n / (N - 1)) * plotW;
      return { n, x, y, ySvg: yToSvg(y) };
    });

    return { pts };
  }, [amplitude, frequency, sampleRate, points, padLeft, plotW]);

  const xAxisY = yToSvg(0);

  return (
    <section className={styles.wrap} aria-label="Time-domain plot">
      {(title || description) ? (
        <header className={styles.header}>
          {title ? <h4 className={styles.title}>{title}</h4> : null}
          {description ? <div className={styles.desc}>{description}</div> : null}
        </header>
      ) : null}

      <div className={styles.controls}>
        <div className={styles.control}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Amplitude</span>
            <span className={styles.value}>{formatNumber(amplitude)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={5}
            step={0.05}
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            aria-label="Amplitude"
          />
        </div>

        <div className={styles.control}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Frequency</span>
            <span className={styles.value}>{formatNumber(frequency)}{mode === 'continuous' ? ' Hz' : ''}</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={10}
            step={0.05}
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            aria-label="Frequency"
          />
          {mode === 'discrete' ? (
            <div className={styles.subnote}>
              Discrete: x[n] = A·sin(2π·f·n / Fs), Fs = {formatNumber(sampleRate)} samples/s
            </div>
          ) : (
            <div className={styles.subnote}>
              Continuous: x(t) = A·sin(2π·f·t) over {formatNumber(durationSeconds)} s
            </div>
          )}
        </div>
      </div>

      <div className={styles.plotShell}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={mode === 'continuous' ? 'Continuous time-domain sine plot' : 'Discrete sampled sine plot'}
        >
          <rect
            x={0.5}
            y={0.5}
            width={width - 1}
            height={height - 1}
            fill="transparent"
            stroke="rgba(231, 238, 247, 0.10)"
          />

          {/* Axes */}
          <line
            x1={padLeft}
            y1={xAxisY}
            x2={padLeft + plotW}
            y2={xAxisY}
            stroke="rgba(231, 238, 247, 0.18)"
          />
          <line
            x1={padLeft}
            y1={padTop}
            x2={padLeft}
            y2={padTop + plotH}
            stroke="rgba(231, 238, 247, 0.18)"
          />

          {/* Y ticks */}
          {[-yMax, 0, yMax].map((yVal) => {
            const ySvg = yToSvg(yVal);
            return (
              <g key={yVal}>
                <line
                  x1={padLeft - 6}
                  y1={ySvg}
                  x2={padLeft}
                  y2={ySvg}
                  stroke="rgba(231, 238, 247, 0.18)"
                />
                <text
                  x={padLeft - 10}
                  y={ySvg + 4}
                  textAnchor="end"
                  fontSize={12}
                  fill="rgba(231, 238, 247, 0.65)"
                >
                  {formatNumber(yVal)}
                </text>
              </g>
            );
          })}

          {/* Plot */}
          {mode === 'continuous' ? (
            <path
              d={continuous.d}
              fill="none"
              stroke="rgba(102, 170, 255, 0.9)"
              strokeWidth={2}
            />
          ) : (
            <g>
              {discrete.pts.map((p) => (
                <g key={p.n}>
                  <line
                    x1={p.x}
                    y1={xAxisY}
                    x2={p.x}
                    y2={p.ySvg}
                    stroke="rgba(102, 170, 255, 0.55)"
                    strokeWidth={1.5}
                  />
                  <circle
                    cx={p.x}
                    cy={p.ySvg}
                    r={3.2}
                    fill="rgba(102, 170, 255, 0.9)"
                  />
                </g>
              ))}
            </g>
          )}

          {/* Axis labels */}
          <text
            x={padLeft}
            y={height - 10}
            fontSize={12}
            fill="rgba(231, 238, 247, 0.65)"
          >
            {mode === 'continuous' ? 't (s)' : 'n'}
          </text>
          <text
            x={12}
            y={padTop + 10}
            fontSize={12}
            fill="rgba(231, 238, 247, 0.65)"
          >
            x
          </text>
        </svg>
      </div>
    </section>
  );
}
