'use client';

import { useEffect, useState } from 'react';
import CircuitSchematic from '@/app/components/CircuitSchematic';
import VisualCard from './VisualCard';
import styles from './shared.module.css';

interface CircuitStressSectionProps {
  onCountUpdate: (count: number) => void;
}

export default function CircuitStressSection({ onCountUpdate }: CircuitStressSectionProps) {
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCountUpdate(successCount);
    }, 2000);
    return () => clearTimeout(timer);
  }, [successCount, onCountUpdate]);

  const handleSuccess = () => setSuccessCount((prev) => prev + 1);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>1. Circuit Diagrams (13)</h2>
        <p className={styles.sectionSubtitle}>CircuitSchematic component stress test</p>
      </div>
      <div className={`${styles.grid} ${styles.grid3}`}>
        <VisualCard title="1.1 Voltage Divider" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={400}
            height={300}
            title="Voltage Divider"
            elements={[
              { component: 'voltage-source', x: 70, y: 150, rotation: 90, label: 'V1', value: '10V' },
              { component: 'wire', x1: 70, y1: 120, x2: 70, y2: 70 },
              { component: 'wire', x1: 70, y1: 70, x2: 200, y2: 70 },
              { component: 'wire', x1: 200, y1: 70, x2: 200, y2: 80 },
              { component: 'resistor', x: 200, y: 110, rotation: 90, label: 'R1', value: '10kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 200, y1: 140, x2: 200, y2: 180 },
              { component: 'text', x: 235, y: 176, text: 'Vout = 5V', fontSize: 11, color: '#4ade80', textAnchor: 'start' },
              { component: 'resistor', x: 200, y: 210, rotation: 90, label: 'R2', value: '10kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 200, y1: 240, x2: 200, y2: 250 },
              { component: 'wire', x1: 70, y1: 180, x2: 70, y2: 250 },
              { component: 'wire', x1: 70, y1: 250, x2: 200, y2: 250 },
              { component: 'ground', x: 130, y: 250 },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.2 RC Low-Pass Filter" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={400}
            height={300}
            title="RC Low-Pass Filter"
            elements={[
              { component: 'voltage-source', x: 70, y: 150, rotation: 90, label: 'V1', value: '5V' },
              { component: 'wire', x1: 70, y1: 120, x2: 70, y2: 80 },
              { component: 'wire', x1: 70, y1: 80, x2: 190, y2: 80 },
              { component: 'resistor', x: 220, y: 80, label: 'R1', value: '1kΩ', labelPosition: 'top' },
              { component: 'wire', x1: 250, y1: 80, x2: 310, y2: 80 },
              { component: 'wire', x1: 310, y1: 80, x2: 310, y2: 140 },
              { component: 'capacitor', x: 310, y: 170, rotation: 90, label: 'C1', value: '100nF', labelPosition: 'right' },
              { component: 'wire', x1: 310, y1: 200, x2: 310, y2: 250 },
              { component: 'wire', x1: 70, y1: 180, x2: 70, y2: 250 },
              { component: 'wire', x1: 70, y1: 250, x2: 310, y2: 250 },
              { component: 'ground', x: 190, y: 250 },
              { component: 'text', x: 332, y: 80, text: 'Vout', fontSize: 12, textAnchor: 'start' },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.3 RL Series Circuit" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={400}
            height={300}
            title="RL Series Circuit"
            elements={[
              { component: 'voltage-source', x: 70, y: 150, rotation: 90, label: 'V1', value: '5V' },
              { component: 'wire', x1: 70, y1: 120, x2: 70, y2: 80 },
              { component: 'wire', x1: 70, y1: 80, x2: 190, y2: 80 },
              { component: 'resistor', x: 220, y: 80, label: 'R1', value: '100Ω', labelPosition: 'top' },
              { component: 'wire', x1: 250, y1: 80, x2: 310, y2: 80 },
              { component: 'wire', x1: 310, y1: 80, x2: 310, y2: 120 },
              { component: 'inductor', x: 310, y: 150, rotation: 90, label: 'L1', value: '10mH', labelPosition: 'right' },
              { component: 'wire', x1: 310, y1: 180, x2: 310, y2: 250 },
              { component: 'wire', x1: 70, y1: 180, x2: 70, y2: 250 },
              { component: 'wire', x1: 70, y1: 250, x2: 310, y2: 250 },
              { component: 'ground', x: 190, y: 250 },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.4 RLC Series Circuit" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={500}
            height={350}
            title="RLC Series Circuit"
            elements={[
              { component: 'voltage-source', x: 80, y: 180, rotation: 90, label: 'V1', value: '10V' },
              { component: 'wire', x1: 80, y1: 150, x2: 80, y2: 90 },
              { component: 'wire', x1: 80, y1: 90, x2: 220, y2: 90 },
              { component: 'resistor', x: 250, y: 90, label: 'R1', value: '100Ω', labelPosition: 'top' },
              { component: 'wire', x1: 280, y1: 90, x2: 340, y2: 90 },
              { component: 'wire', x1: 340, y1: 90, x2: 340, y2: 130 },
              { component: 'inductor', x: 340, y: 160, rotation: 90, label: 'L1', value: '50mH', labelPosition: 'right' },
              { component: 'wire', x1: 340, y1: 190, x2: 340, y2: 230 },
              { component: 'capacitor', x: 340, y: 260, rotation: 90, label: 'C1', value: '10µF', labelPosition: 'right' },
              { component: 'wire', x1: 340, y1: 290, x2: 340, y2: 310 },
              { component: 'wire', x1: 80, y1: 210, x2: 80, y2: 310 },
              { component: 'wire', x1: 80, y1: 310, x2: 340, y2: 310 },
              { component: 'ground', x: 210, y: 310 },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.5 Wheatstone Bridge" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={600}
            height={400}
            title="Wheatstone Bridge"
            elements={[
              { component: 'voltage-source', x: 80, y: 200, rotation: 90, label: 'V1', value: '10V' },
              { component: 'wire', x1: 80, y1: 170, x2: 80, y2: 130 },
              { component: 'wire', x1: 80, y1: 130, x2: 240, y2: 130 },
              { component: 'wire', x1: 240, y1: 130, x2: 240, y2: 180 },
              { component: 'wire', x1: 240, y1: 130, x2: 360, y2: 130 },
              { component: 'wire', x1: 360, y1: 130, x2: 360, y2: 180 },
              { component: 'resistor', x: 240, y: 210, rotation: 90, label: 'R1', value: '1kΩ', labelPosition: 'left' },
              { component: 'resistor', x: 360, y: 210, rotation: 90, label: 'R2', value: '2kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 240, y1: 240, x2: 240, y2: 260 },
              { component: 'wire', x1: 360, y1: 240, x2: 360, y2: 260 },
              { component: 'wire', x1: 240, y1: 260, x2: 360, y2: 260 },
              { component: 'resistor', x: 240, y: 290, rotation: 90, label: 'R3', value: '1kΩ', labelPosition: 'left' },
              { component: 'resistor', x: 360, y: 290, rotation: 90, label: 'R4', value: '2kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 240, y1: 320, x2: 240, y2: 340 },
              { component: 'wire', x1: 360, y1: 320, x2: 360, y2: 340 },
              { component: 'wire', x1: 240, y1: 340, x2: 360, y2: 340 },
              { component: 'wire', x1: 80, y1: 230, x2: 80, y2: 340 },
              { component: 'wire', x1: 80, y1: 340, x2: 240, y2: 340 },
              { component: 'ground', x: 300, y: 340 },
              { component: 'text', x: 300, y: 255, text: 'G', fontSize: 14, color: '#fbbf24' },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.6 Op-Amp Inverting Amplifier" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={500}
            height={350}
            title="Op-Amp Inverting Amplifier"
            elements={[
              { component: 'voltage-source', x: 70, y: 130, rotation: 90, label: 'Vin', value: '' },
              { component: 'wire', x1: 70, y1: 100, x2: 70, y2: 90 },
              { component: 'wire', x1: 70, y1: 90, x2: 170, y2: 90 },
              { component: 'resistor', x: 200, y: 90, label: 'Rin', value: '10kΩ', labelPosition: 'top' },
              { component: 'wire', x1: 230, y1: 90, x2: 260, y2: 90 },
              { component: 'wire', x1: 260, y1: 90, x2: 260, y2: 128 },
              { component: 'wire', x1: 260, y1: 128, x2: 320, y2: 128 },
              { component: 'op-amp', x: 350, y: 140, label: '' },
              { component: 'wire', x1: 260, y1: 90, x2: 260, y2: 60 },
              { component: 'wire', x1: 260, y1: 60, x2: 320, y2: 60 },
              { component: 'resistor', x: 350, y: 60, label: 'Rf', value: '100kΩ', labelPosition: 'top' },
              { component: 'wire', x1: 380, y1: 60, x2: 430, y2: 60 },
              { component: 'wire', x1: 430, y1: 60, x2: 430, y2: 140 },
              { component: 'wire', x1: 380, y1: 140, x2: 450, y2: 140 },
              { component: 'text', x: 460, y: 140, text: 'Vout', fontSize: 11, textAnchor: 'start' },
              { component: 'wire', x1: 320, y1: 152, x2: 320, y2: 250 },
              { component: 'ground', x: 320, y: 250 },
              { component: 'wire', x1: 70, y1: 160, x2: 70, y2: 250 },
              { component: 'ground', x: 70, y: 250 },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.7 Op-Amp Non-Inverting" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={500}
            height={350}
            title="Op-Amp Non-Inverting Amplifier"
            elements={[
              { component: 'voltage-source', x: 70, y: 180, rotation: 90, label: 'Vin', value: '' },
              { component: 'wire', x1: 70, y1: 150, x2: 200, y2: 150 },
              { component: 'wire', x1: 200, y1: 150, x2: 200, y2: 172 },
              { component: 'wire', x1: 200, y1: 172, x2: 320, y2: 172 },
              { component: 'op-amp', x: 350, y: 160, label: '' },
              { component: 'wire', x1: 380, y1: 160, x2: 450, y2: 160 },
              { component: 'text', x: 460, y: 160, text: 'Vout', fontSize: 11, textAnchor: 'start' },
              { component: 'wire', x1: 380, y1: 160, x2: 440, y2: 160 },
              { component: 'wire', x1: 440, y1: 160, x2: 440, y2: 220 },
              { component: 'wire', x1: 440, y1: 220, x2: 420, y2: 220 },
              { component: 'resistor', x: 390, y: 220, label: 'R2', value: '90kΩ', labelPosition: 'top' },
              { component: 'wire', x1: 360, y1: 220, x2: 300, y2: 220 },
              { component: 'wire', x1: 300, y1: 220, x2: 300, y2: 148 },
              { component: 'wire', x1: 300, y1: 148, x2: 320, y2: 148 },
              { component: 'resistor', x: 300, y: 260, rotation: 90, label: 'R1', value: '10kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 300, y1: 220, x2: 300, y2: 230 },
              { component: 'wire', x1: 300, y1: 290, x2: 300, y2: 320 },
              { component: 'ground', x: 300, y: 320 },
              { component: 'wire', x1: 70, y1: 210, x2: 70, y2: 320 },
              { component: 'ground', x: 70, y: 320 },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.8 Diode Half-Wave Rectifier" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={500}
            height={350}
            title="Half-Wave Rectifier"
            elements={[
              { component: 'voltage-source', x: 80, y: 170, rotation: 90, label: 'VAC', value: '~' },
              { component: 'wire', x1: 80, y1: 140, x2: 80, y2: 100 },
              { component: 'wire', x1: 80, y1: 100, x2: 230, y2: 100 },
              { component: 'diode', x: 260, y: 100, label: 'D1', labelPosition: 'top' },
              { component: 'wire', x1: 290, y1: 100, x2: 360, y2: 100 },
              { component: 'wire', x1: 360, y1: 100, x2: 360, y2: 170 },
              { component: 'resistor', x: 360, y: 200, rotation: 90, label: 'RL', value: '1kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 360, y1: 230, x2: 360, y2: 280 },
              { component: 'wire', x1: 80, y1: 200, x2: 80, y2: 280 },
              { component: 'wire', x1: 80, y1: 280, x2: 360, y2: 280 },
              { component: 'ground', x: 220, y: 280 },
              { component: 'text', x: 382, y: 100, text: 'Vout', fontSize: 11, textAnchor: 'start' },
            ]}
          />
          <div className={styles.missingComponent}>
            Note: Diode component available in CircuitSchematic
          </div>
        </VisualCard>

        <VisualCard title="1.9 Full-Wave Bridge Rectifier" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={600}
            height={400}
            title="Bridge Rectifier"
            elements={[
              { component: 'voltage-source', x: 80, y: 210, rotation: 90, label: 'VAC', value: '~' },

              { component: 'diode', x: 300, y: 140, label: 'D1' },
              { component: 'diode', x: 370, y: 210, rotation: 90, label: 'D2' },
              { component: 'diode', x: 300, y: 280, label: 'D3' },
              { component: 'diode', x: 230, y: 210, rotation: 90, label: 'D4' },

              { component: 'wire', x1: 270, y1: 140, x2: 230, y2: 140 },
              { component: 'wire', x1: 230, y1: 140, x2: 230, y2: 180 },

              { component: 'wire', x1: 330, y1: 140, x2: 370, y2: 140 },
              { component: 'wire', x1: 370, y1: 140, x2: 370, y2: 180 },

              { component: 'wire', x1: 370, y1: 240, x2: 370, y2: 280 },
              { component: 'wire', x1: 370, y1: 280, x2: 330, y2: 280 },

              { component: 'wire', x1: 230, y1: 240, x2: 230, y2: 280 },
              { component: 'wire', x1: 230, y1: 280, x2: 270, y2: 280 },

              { component: 'wire', x1: 80, y1: 180, x2: 230, y2: 180 },
              { component: 'wire', x1: 80, y1: 240, x2: 370, y2: 240 },

              { component: 'wire', x1: 330, y1: 140, x2: 470, y2: 140 },
              { component: 'wire', x1: 470, y1: 140, x2: 470, y2: 180 },
              { component: 'resistor', x: 470, y: 210, rotation: 90, label: 'RL', value: '1kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 470, y1: 240, x2: 470, y2: 280 },
              { component: 'wire', x1: 470, y1: 280, x2: 270, y2: 280 },

              { component: 'ground', x: 470, y: 280 },
              { component: 'text', x: 490, y: 140, text: 'Vout', fontSize: 11, textAnchor: 'start' },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.10 LED Circuit" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={400}
            height={300}
            title="LED with Current Limiting"
            elements={[
              { component: 'voltage-source', x: 70, y: 150, rotation: 90, label: 'V1', value: '5V' },
              { component: 'wire', x1: 70, y1: 120, x2: 70, y2: 80 },
              { component: 'wire', x1: 70, y1: 80, x2: 190, y2: 80 },
              { component: 'resistor', x: 220, y: 80, label: 'R1', value: '330Ω', labelPosition: 'top' },
              { component: 'wire', x1: 250, y1: 80, x2: 300, y2: 80 },
              { component: 'wire', x1: 300, y1: 80, x2: 300, y2: 120 },
              { component: 'diode', x: 300, y: 150, rotation: 90, label: 'LED', labelPosition: 'right' },
              { component: 'wire', x1: 300, y1: 180, x2: 300, y2: 250 },
              { component: 'wire', x1: 70, y1: 180, x2: 70, y2: 250 },
              { component: 'wire', x1: 70, y1: 250, x2: 300, y2: 250 },
              { component: 'ground', x: 185, y: 250 },
            ]}
          />
          <div className={styles.missingComponent}>
            Note: Using diode symbol for LED (specialized LED symbol could be added)
          </div>
        </VisualCard>

        <VisualCard title="1.11 Capacitors in Parallel" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={600}
            height={400}
            title="Parallel Capacitors"
            elements={[
              { component: 'voltage-source', x: 80, y: 200, rotation: 90, label: 'V1', value: '10V' },
              { component: 'wire', x1: 80, y1: 170, x2: 80, y2: 130 },
              { component: 'wire', x1: 80, y1: 130, x2: 220, y2: 130 },
              { component: 'wire', x1: 220, y1: 130, x2: 340, y2: 130 },
              { component: 'wire', x1: 340, y1: 130, x2: 460, y2: 130 },

              { component: 'wire', x1: 220, y1: 130, x2: 220, y2: 220 },
              { component: 'wire', x1: 340, y1: 130, x2: 340, y2: 220 },
              { component: 'wire', x1: 460, y1: 130, x2: 460, y2: 220 },
              { component: 'capacitor', x: 220, y: 250, rotation: 90, label: 'C1', value: '10µF', labelPosition: 'left' },
              { component: 'capacitor', x: 340, y: 250, rotation: 90, label: 'C2', value: '22µF', labelPosition: 'left' },
              { component: 'capacitor', x: 460, y: 250, rotation: 90, label: 'C3', value: '47µF', labelPosition: 'right' },
              { component: 'wire', x1: 220, y1: 280, x2: 220, y2: 320 },
              { component: 'wire', x1: 340, y1: 280, x2: 340, y2: 320 },
              { component: 'wire', x1: 460, y1: 280, x2: 460, y2: 320 },

              { component: 'wire', x1: 220, y1: 320, x2: 460, y2: 320 },
              { component: 'wire', x1: 80, y1: 230, x2: 80, y2: 320 },
              { component: 'wire', x1: 80, y1: 320, x2: 220, y2: 320 },
              { component: 'ground', x: 340, y: 320 },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.12 Common Emitter Amplifier" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={600}
            height={400}
            title="Common Emitter Amplifier"
            elements={[
              { component: 'voltage-source', x: 70, y: 140, rotation: 90, label: 'Vin', value: '~' },
              { component: 'wire', x1: 70, y1: 110, x2: 150, y2: 110 },
              { component: 'capacitor', x: 180, y: 110, label: 'C1', value: '10µF', labelPosition: 'top' },
              { component: 'wire', x1: 210, y1: 110, x2: 260, y2: 110 },
              { component: 'wire', x1: 260, y1: 110, x2: 260, y2: 140 },
              { component: 'resistor', x: 260, y: 170, rotation: 90, label: 'R1', value: '100kΩ', labelPosition: 'left' },
              { component: 'wire', x1: 260, y1: 200, x2: 260, y2: 240 },
              { component: 'resistor', x: 260, y: 270, rotation: 90, label: 'R2', value: '22kΩ', labelPosition: 'left' },
              { component: 'wire', x1: 260, y1: 300, x2: 260, y2: 340 },
              { component: 'wire', x1: 70, y1: 170, x2: 70, y2: 340 },
              { component: 'wire', x1: 70, y1: 340, x2: 260, y2: 340 },
              { component: 'ground', x: 160, y: 340 },

              { component: 'resistor', x: 380, y: 120, rotation: 90, label: 'Rc', value: '4.7kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 380, y1: 90, x2: 380, y2: 70 },
              { component: 'wire', x1: 300, y1: 70, x2: 460, y2: 70 },
              { component: 'text', x: 470, y: 70, text: 'Vcc', fontSize: 11, textAnchor: 'start' },
              { component: 'wire', x1: 380, y1: 150, x2: 380, y2: 195 },
              { component: 'wire', x1: 380, y1: 195, x2: 370, y2: 195 },
              { component: 'wire', x1: 260, y1: 220, x2: 340, y2: 220 },
              { component: 'wire', x1: 370, y1: 245, x2: 370, y2: 270 },
              { component: 'wire', x1: 370, y1: 270, x2: 380, y2: 270 },
              { component: 'resistor', x: 380, y: 300, rotation: 90, label: 'Re', value: '1kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 380, y1: 330, x2: 380, y2: 340 },
              { component: 'ground', x: 380, y: 340 },
              { component: 'npn', x: 360, y: 220, label: 'Q1' },
            ]}
          />
        </VisualCard>

        <VisualCard title="1.13 Two-Stage CE Amplifier" onSuccess={handleSuccess}>
          <CircuitSchematic
            width={800}
            height={500}
            title="Two-Stage Common Emitter Amplifier"
            elements={[
              { component: 'wire', x1: 120, y1: 70, x2: 700, y2: 70 },
              { component: 'text', x: 710, y: 70, text: 'Vcc', fontSize: 12, textAnchor: 'start' },

              { component: 'text', x: 50, y: 170, text: 'Input', fontSize: 11, textAnchor: 'start' },
              { component: 'wire', x1: 80, y1: 170, x2: 110, y2: 170 },
              { component: 'capacitor', x: 140, y: 170, label: 'C1', value: '10µF', labelPosition: 'top' },
              { component: 'wire', x1: 170, y1: 170, x2: 220, y2: 170 },

              { component: 'resistor', x: 220, y: 120, rotation: 90, label: 'R1', value: '47kΩ', labelPosition: 'left' },
              { component: 'wire', x1: 220, y1: 70, x2: 220, y2: 90 },
              { component: 'wire', x1: 220, y1: 150, x2: 220, y2: 170 },
              { component: 'resistor', x: 220, y: 250, rotation: 90, label: 'R2', value: '10kΩ', labelPosition: 'left' },
              { component: 'wire', x1: 220, y1: 170, x2: 220, y2: 220 },

              { component: 'resistor', x: 300, y: 100, rotation: 90, label: 'R3', value: '4.7kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 300, y1: 70, x2: 300, y2: 70 },
              { component: 'wire', x1: 300, y1: 130, x2: 300, y2: 175 },
              { component: 'wire', x1: 300, y1: 175, x2: 370, y2: 175 },

              { component: 'wire', x1: 220, y1: 200, x2: 270, y2: 200 },
              { component: 'wire', x1: 300, y1: 225, x2: 300, y2: 270 },
              { component: 'resistor', x: 300, y: 300, rotation: 90, label: 'R4', value: '1kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 300, y1: 330, x2: 300, y2: 420 },
              { component: 'capacitor', x: 360, y: 300, rotation: 90, label: 'C2', value: '100µF', labelPosition: 'right' },
              { component: 'wire', x1: 360, y1: 270, x2: 300, y2: 270 },
              { component: 'wire', x1: 360, y1: 330, x2: 360, y2: 420 },
              { component: 'npn', x: 290, y: 200, label: 'Q1' },

              { component: 'capacitor', x: 400, y: 175, label: 'C3', value: '10µF', labelPosition: 'top' },
              { component: 'wire', x1: 430, y1: 175, x2: 470, y2: 175 },

              { component: 'resistor', x: 470, y: 110, rotation: 90, label: 'R5', value: '47kΩ', labelPosition: 'left' },
              { component: 'wire', x1: 470, y1: 70, x2: 470, y2: 80 },
              { component: 'wire', x1: 470, y1: 140, x2: 470, y2: 200 },
              { component: 'resistor', x: 470, y: 250, rotation: 90, label: 'R6', value: '10kΩ', labelPosition: 'left' },
              { component: 'wire', x1: 470, y1: 200, x2: 470, y2: 220 },

              { component: 'resistor', x: 550, y: 100, rotation: 90, label: 'R7', value: '4.7kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 550, y1: 70, x2: 550, y2: 70 },
              { component: 'wire', x1: 550, y1: 130, x2: 550, y2: 175 },
              { component: 'wire', x1: 550, y1: 175, x2: 620, y2: 175 },

              { component: 'wire', x1: 470, y1: 200, x2: 520, y2: 200 },
              { component: 'wire', x1: 550, y1: 225, x2: 550, y2: 270 },
              { component: 'resistor', x: 550, y: 300, rotation: 90, label: 'R8', value: '1kΩ', labelPosition: 'right' },
              { component: 'wire', x1: 550, y1: 330, x2: 550, y2: 420 },
              { component: 'npn', x: 540, y: 200, label: 'Q2' },

              { component: 'capacitor', x: 650, y: 175, label: 'C4', value: '10µF', labelPosition: 'top' },
              { component: 'wire', x1: 680, y1: 175, x2: 730, y2: 175 },
              { component: 'text', x: 740, y: 175, text: 'Output', fontSize: 11, textAnchor: 'start' },

              { component: 'wire', x1: 220, y1: 280, x2: 220, y2: 420 },
              { component: 'wire', x1: 470, y1: 280, x2: 470, y2: 420 },
              { component: 'wire', x1: 120, y1: 420, x2: 700, y2: 420 },
              { component: 'ground', x: 220, y: 420 },
              { component: 'ground', x: 300, y: 420 },
              { component: 'ground', x: 360, y: 420 },
              { component: 'ground', x: 470, y: 420 },
              { component: 'ground', x: 550, y: 420 },
            ]}
          />
        </VisualCard>
      </div>
    </section>
  );
}
