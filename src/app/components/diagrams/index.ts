/**
 * CALTRONIC v3 — Diagram & Simulation Library Index
 * 
 * Barrel export for all new diagram components.
 * Usage examples:
 *   import { Resistor, Capacitor, CircuitDiagram } from '@/app/components/diagrams';
 *   import { EngineeringPlot, generateLinearVI } from '@/app/components/diagrams';
 *   import { OhmsLawSimulator, LoadLineSimulator } from '@/app/components/diagrams';
 */

// IEEE/IEC standard circuit symbols (pure React+SVG)
export {
  Resistor,
  ResistorIEC,
  Capacitor,
  Inductor,
  Diode,
  VoltageSource,
  CurrentSource,
  OpAmp,
  Switch,
  Ground,
  Wire,
  JunctionNode,
  CurrentArrow,
  VoltageMark,
  CircuitDiagram,
} from './CircuitSymbols';

// Professional engineering plots with hover crosshair
export {
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
} from './EngineeringPlot';

// Interactive simulations (slider-driven, React state)
export {
  OhmsLawSimulator,
  LoadLineSimulator,
  DiodeCircuitSimulator,
  PWLExplorer,
  WaveformSimulator,
} from './InteractiveSimulations';
