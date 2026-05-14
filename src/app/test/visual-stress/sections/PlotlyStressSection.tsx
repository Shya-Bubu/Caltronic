'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import VisualCard from './VisualCard';
import styles from './shared.module.css';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface PlotlyStressSectionProps {
  onCountUpdate: (count: number) => void;
}

export default function PlotlyStressSection({ onCountUpdate }: PlotlyStressSectionProps) {
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    // Report count after Plotly charts have rendered
    const timer = setTimeout(() => {
      onCountUpdate(successCount);
    }, 2000);
    return () => clearTimeout(timer);
  }, [successCount, onCountUpdate]);

  const handleSuccess = () => setSuccessCount(prev => prev + 1);

  // Generate data for plots
  const diodeV = Array.from({ length: 100 }, (_, i) => (i - 50) / 50);
  const diodeI = diodeV.map(v => 1e-12 * (Math.exp(v / 0.026) - 1));

  const freq = Array.from({ length: 200 }, (_, i) => Math.pow(10, i / 50 - 1));
  const RC = 1000 * 1e-6;
  const bodeMag = freq.map(f => -20 * Math.log10(Math.sqrt(1 + Math.pow(2 * Math.PI * f * RC, 2))));
  const bodePhase = freq.map(f => -Math.atan(2 * Math.PI * f * RC) * 180 / Math.PI);

  const time = Array.from({ length: 200 }, (_, i) => i / 100);
  const zeta = 0.3;
  const wn = 10;
  const wd = wn * Math.sqrt(1 - zeta * zeta);
  const stepResp = time.map(t => 1 - Math.exp(-zeta * wn * t) * Math.cos(wd * t + Math.atan(zeta / Math.sqrt(1 - zeta * zeta))) / Math.sqrt(1 - zeta * zeta));

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>6. Scientific Plots (8)</h2>
        <p className={styles.sectionSubtitle}>Plotly.js interactive charts</p>
      </div>
      <div className={`${styles.grid} ${styles.grid2}`}>
        
        <VisualCard title="6.1 Diode V-I Characteristic" onSuccess={handleSuccess}>
          <Plot
            data={[{
              x: diodeV,
              y: diodeI,
              type: 'scatter',
              mode: 'lines',
              line: { color: '#3b82f6', width: 2 },
              name: 'Diode I-V'
            }]}
            layout={{
              autosize: true,
              height: 300,
              title: { text: 'Diode V-I Curve', font: { size: 14 } },
              xaxis: { title: { text: 'Voltage (V)', font: { size: 12 } }, color: '#94a3b8', gridcolor: '#1e293b' },
              yaxis: { title: { text: 'Current (A)', font: { size: 12 } }, type: 'log', color: '#94a3b8', gridcolor: '#1e293b' },
              paper_bgcolor: '#0a0a0a',
              plot_bgcolor: '#111',
              font: { color: '#e2e8f0' },
              margin: { t: 50, b: 60, l: 70, r: 20 }
            }}
            config={{ displayModeBar: true, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </VisualCard>

        <VisualCard title="6.2 Bode Plot" onSuccess={handleSuccess}>
          <Plot
            data={[
              {
                x: freq,
                y: bodeMag,
                type: 'scatter',
                mode: 'lines',
                line: { color: '#3b82f6', width: 2 },
                name: 'Magnitude',
                xaxis: 'x',
                yaxis: 'y'
              },
              {
                x: freq,
                y: bodePhase,
                type: 'scatter',
                mode: 'lines',
                line: { color: '#f59e0b', width: 2 },
                name: 'Phase',
                xaxis: 'x2',
                yaxis: 'y2'
              }
            ]}
            layout={{
              autosize: true,
              height: 400,
              grid: { rows: 2, columns: 1, pattern: 'independent', roworder: 'top to bottom' },
              title: { text: 'Bode Plot (RC Filter)', font: { size: 14 } },
              xaxis: {
                title: { text: '' },
                type: 'log',
                color: '#94a3b8',
                gridcolor: '#1e293b',
                showticklabels: false
              },
              yaxis: { title: { text: 'Magnitude (dB)', font: { size: 11 } }, color: '#94a3b8', gridcolor: '#1e293b' },
              xaxis2: { title: { text: 'Frequency (Hz)', font: { size: 11 } }, type: 'log', color: '#94a3b8', gridcolor: '#1e293b' },
              yaxis2: { title: { text: 'Phase (deg)', font: { size: 11 } }, color: '#94a3b8', gridcolor: '#1e293b' },
              paper_bgcolor: '#0a0a0a',
              plot_bgcolor: '#111',
              font: { color: '#e2e8f0', size: 10 },
              margin: { t: 50, b: 70, l: 60, r: 20 }
            }}
            config={{ displayModeBar: true, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </VisualCard>

        <VisualCard title="6.3 Step Response" onSuccess={handleSuccess}>
          <Plot
            data={[{
              x: time,
              y: stepResp,
              type: 'scatter',
              mode: 'lines',
              line: { color: '#10b981', width: 2 },
              name: 'Step Response'
            }]}
            layout={{
              autosize: true,
              height: 300,
              title: { text: 'Underdamped Step Response (ζ=0.3)', font: { size: 14 } },
              xaxis: { title: { text: 'Time (s)', font: { size: 12 } }, color: '#94a3b8', gridcolor: '#1e293b' },
              yaxis: { title: { text: 'Amplitude', font: { size: 12 } }, range: [0, 1.5], color: '#94a3b8', gridcolor: '#1e293b' },
              paper_bgcolor: '#0a0a0a',
              plot_bgcolor: '#111',
              font: { color: '#e2e8f0' },
              margin: { t: 50, b: 60, l: 60, r: 20 }
            }}
            config={{ displayModeBar: true, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </VisualCard>

        <VisualCard title="6.4 FFT Spectrum" onSuccess={handleSuccess}>
          <Plot
            data={[{
              x: [0, 50, 120, 200, 300],
              y: [0.1, 1.0, 0.5, 0.05, 0.02],
              type: 'bar',
              marker: { color: '#8b5cf6' },
              name: 'Magnitude'
            }]}
            layout={{
              autosize: true,
              height: 300,
              title: { text: 'FFT Frequency Spectrum', font: { size: 14 } },
              xaxis: { title: { text: 'Frequency (Hz)', font: { size: 12 } }, color: '#94a3b8', gridcolor: '#1e293b' },
              yaxis: { title: { text: 'Magnitude', font: { size: 12 } }, color: '#94a3b8', gridcolor: '#1e293b' },
              paper_bgcolor: '#0a0a0a',
              plot_bgcolor: '#111',
              font: { color: '#e2e8f0' },
              margin: { t: 50, b: 60, l: 60, r: 20 }
            }}
            config={{ displayModeBar: true, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </VisualCard>

        <VisualCard title="6.5 Nyquist Plot" onSuccess={handleSuccess}>
          <Plot
            data={[{
              x: Array.from({ length: 100 }, (_, i) => -Math.cos(i / 10)),
              y: Array.from({ length: 100 }, (_, i) => Math.sin(i / 10)),
              type: 'scatter',
              mode: 'lines',
              line: { color: '#ec4899', width: 2 },
              name: 'H(jω)'
            }]}
            layout={{
              autosize: true,
              height: 300,
              title: { text: 'Nyquist Plot', font: { size: 14 } },
              xaxis: { title: { text: 'Real', font: { size: 12 } }, range: [-2, 2], color: '#94a3b8', gridcolor: '#1e293b' },
              yaxis: { title: { text: 'Imaginary', font: { size: 12 } }, range: [-2, 2], color: '#94a3b8', gridcolor: '#1e293b' },
              paper_bgcolor: '#0a0a0a',
              plot_bgcolor: '#111',
              font: { color: '#e2e8f0' },
              margin: { t: 50, b: 60, l: 60, r: 20 }
            }}
            config={{ displayModeBar: true, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </VisualCard>

        <VisualCard title="6.6 Lissajous Figures" onSuccess={handleSuccess}>
          <Plot
            data={[
              {
                x: Array.from({ length: 200 }, (_, i) => Math.sin(3 * i / 20)),
                y: Array.from({ length: 200 }, (_, i) => Math.sin(2 * i / 20)),
                type: 'scatter',
                mode: 'lines',
                line: { color: '#06b6d4', width: 2 },
                name: '3:2'
              },
              {
                x: Array.from({ length: 200 }, (_, i) => Math.sin(3 * i / 20)),
                y: Array.from({ length: 200 }, (_, i) => Math.sin(4 * i / 20)),
                type: 'scatter',
                mode: 'lines',
                line: { color: '#f59e0b', width: 2 },
                name: '3:4'
              }
            ]}
            layout={{
              autosize: true,
              height: 300,
              title: { text: 'Lissajous Figures', font: { size: 14 } },
              xaxis: { title: { text: 'x = sin(at)', font: { size: 12 } }, range: [-1.2, 1.2], color: '#94a3b8', gridcolor: '#1e293b' },
              yaxis: { title: { text: 'y = sin(bt)', font: { size: 12 } }, range: [-1.2, 1.2], color: '#94a3b8', gridcolor: '#1e293b' },
              paper_bgcolor: '#0a0a0a',
              plot_bgcolor: '#111',
              font: { color: '#e2e8f0' },
              margin: { t: 50, b: 60, l: 60, r: 20 }
            }}
            config={{ displayModeBar: true, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </VisualCard>

        <VisualCard title="6.7 3D Surface Plot" onSuccess={handleSuccess}>
          <Plot
            data={[{
              type: 'surface' as const,
              z: Array.from({ length: 30 }, (_, i) => 
                Array.from({ length: 30 }, (_, j) => {
                  const x = (i - 15) / 5;
                  const y = (j - 15) / 5;
                  const r = Math.sqrt(x * x + y * y);
                  return r === 0 ? 1 : Math.sin(r) / r;
                })
              ),
              colorscale: 'Viridis'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }] as any}
            layout={{
              autosize: true,
              height: 300,
              title: { text: '3D Sinc Function', font: { size: 14 } },
              paper_bgcolor: '#0a0a0a',
              font: { color: '#e2e8f0' },
              margin: { t: 50, b: 20, l: 20, r: 20 }
            }}
            config={{ displayModeBar: true, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </VisualCard>

        <VisualCard title="6.8 Multi-Trace Comparison" onSuccess={handleSuccess}>
          <Plot
            data={[0.1, 0.3, 0.5, 0.7, 1.0].map((z) => {
              const wn = 10;
              const wd = wn * Math.sqrt(1 - z * z);
              return {
                x: time,
                y: time.map(t => z < 1 ? 1 - Math.exp(-z * wn * t) * Math.cos(wd * t + Math.atan(z / Math.sqrt(1 - z * z))) / Math.sqrt(1 - z * z) : 1 - Math.exp(-wn * t) * (1 + wn * t)),
                type: 'scatter',
                mode: 'lines',
                name: `ζ=${z}`,
                line: { width: 2 }
              };
            })}
            layout={{
              autosize: true,
              height: 300,
              title: { text: 'Step Response — Various Damping Ratios', font: { size: 14 } },
              xaxis: { title: { text: 'Time (s)', font: { size: 12 } }, color: '#94a3b8', gridcolor: '#1e293b' },
              yaxis: { title: { text: 'Amplitude', font: { size: 12 } }, range: [0, 1.5], color: '#94a3b8', gridcolor: '#1e293b' },
              paper_bgcolor: '#0a0a0a',
              plot_bgcolor: '#111',
              font: { color: '#e2e8f0' },
              margin: { t: 50, b: 60, l: 60, r: 20 }
            }}
            config={{ displayModeBar: true, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d'] }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </VisualCard>

      </div>
    </section>
  );
}
