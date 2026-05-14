'use client';

import { useEffect, useState } from 'react';
import VisualCard from './VisualCard';
import TimingDiagramSVG from './TimingDiagramSVG';
import styles from './shared.module.css';

interface WaveDromStressSectionProps {
  onCountUpdate: (count: number) => void;
}

export default function WaveDromStressSection({ onCountUpdate }: WaveDromStressSectionProps) {
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCountUpdate(successCount);
    }, 1500);
    return () => clearTimeout(timer);
  }, [successCount, onCountUpdate]);

  const handleSuccess = () => setSuccessCount(prev => prev + 1);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>3. Timing Diagrams (8)</h2>
        <p className={styles.sectionSubtitle}>WaveDrom timing diagrams with custom SVG fallback</p>
      </div>
      <div className={`${styles.grid} ${styles.grid2}`}>
        
        <VisualCard title="3.1 Simple Clock Signal" onSuccess={handleSuccess}>
          <TimingDiagramSVG waveform={{
            signal: [{ name: 'CLK', wave: 'p...........' }]
          }} />
        </VisualCard>

        <VisualCard title="3.2 SPI Transfer" onSuccess={handleSuccess}>
          <TimingDiagramSVG waveform={{
            signal: [
              { name: 'CLK', wave: 'p........' },
              { name: 'MOSI', wave: 'x.=.=.=.x', data: ['A5', '3C', '7E'] },
              { name: 'MISO', wave: 'x.=.=.=.x', data: ['FF', '24', 'B1'] },
              { name: 'CS', wave: '10......1' }
            ],
            head: { text: 'SPI Transfer' }
          }} />
        </VisualCard>

        <VisualCard title="3.3 I2C Communication" onSuccess={handleSuccess}>
          <TimingDiagramSVG waveform={{
            signal: [
              { name: 'SCL', wave: '1.0.1.0.1.0.1.0.1.0.1.0.1' },
              { name: 'SDA', wave: '1.0..=.=.=.=.=.=.=.1.0..', data: ['A6','A5','A4','A3','A2','A1','A0','R/W'] }
            ],
            head: { text: 'I2C Start + Address' }
          }} />
        </VisualCard>

        <VisualCard title="3.4 UART Frame" onSuccess={handleSuccess}>
          <TimingDiagramSVG waveform={{
            signal: [
              { name: 'TX', wave: '1.0.=.=.=.=.=.=.=.=.=.1.1', data: ['St','D0','D1','D2','D3','D4','D5','D6','D7','P','Sp'] }
            ],
            head: { text: 'UART 8N1 Frame' }
          }} />
        </VisualCard>

        <VisualCard title="3.5 PWM Duty Cycles" onSuccess={handleSuccess}>
          <TimingDiagramSVG waveform={{
            signal: [
              { name: '25%', wave: 'p..........' },
              { name: '50%', wave: 'hlhlhlhlhl' },
              { name: '75%', wave: 'Hl.Hl.Hl.Hl.Hl.' }
            ],
            head: { text: 'PWM Duty Cycles' }
          }} />
        </VisualCard>

        <VisualCard title="3.6 Memory Read Cycle" onSuccess={handleSuccess}>
          <TimingDiagramSVG waveform={{
            signal: [
              { name: 'CLK', wave: 'p......' },
              { name: 'ADDR', wave: 'x.=...x', data: ['0x4000'] },
              { name: 'RD#', wave: '1.0..1.' },
              { name: 'DATA', wave: 'z...=.z', data: ['0xFF'] },
              { name: 'WAIT#', wave: '1..01..' }
            ],
            head: { text: 'Async Memory Read' }
          }} />
        </VisualCard>

        <VisualCard title="3.7 Request-Acknowledge" onSuccess={handleSuccess}>
          <TimingDiagramSVG waveform={{
            signal: [
              { name: 'CLK', wave: 'p.......' },
              { name: 'REQ', wave: '0.1..0..' },
              { name: 'ACK', wave: '0..1..0.' },
              { name: 'DATA', wave: 'x..=.=.x', data: ['D0', 'D1'] }
            ],
            head: { text: 'Request-Acknowledge Handshake' }
          }} />
        </VisualCard>

        <VisualCard title="3.8 8-bit Parallel Write" onSuccess={handleSuccess}>
          <TimingDiagramSVG waveform={{
            signal: [
              { name: 'CLK', wave: 'p..........' },
              { name: 'WR#', wave: '1.0.1.0.1..' },
              { name: 'ADDR[15:0]', wave: 'x.=.x.=.x..', data: ['0x1000', '0x1001'] },
              { name: 'DATA[7:0]', wave: 'x.=.x.=.x..', data: ['0xAB', '0xCD'] },
              { name: 'READY', wave: '1...1...1..' }
            ],
            head: { text: '8-bit Parallel Write' }
          }} />
        </VisualCard>

      </div>
    </section>
  );
}
