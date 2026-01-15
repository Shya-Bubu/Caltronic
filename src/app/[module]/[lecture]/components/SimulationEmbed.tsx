'use client';

import dynamic from 'next/dynamic';
import styles from '../../../components/simulations/Simulation.module.css';

// Dynamically import simulations to avoid SSR issues with recharts
const SamplingSimulation = dynamic(
    () => import('../../../components/simulations/SamplingSimulation'),
    { ssr: false, loading: () => <SimulationLoader name="Sampling" /> }
);

const NoiseSimulation = dynamic(
    () => import('../../../components/simulations/NoiseSimulation'),
    { ssr: false, loading: () => <SimulationLoader name="Noise" /> }
);

const EnergyPowerSimulation = dynamic(
    () => import('../../../components/simulations/EnergyPowerSimulation'),
    { ssr: false, loading: () => <SimulationLoader name="Energy/Power" /> }
);

const TransformSimulation = dynamic(
    () => import('../../../components/simulations/TransformSimulation'),
    { ssr: false, loading: () => <SimulationLoader name="Transform" /> }
);

const SystemSimulation = dynamic(
    () => import('../../../components/simulations/SystemSimulation'),
    { ssr: false, loading: () => <SimulationLoader name="System I/O" /> }
);

function SimulationLoader({ name }: { name: string }) {
    return (
        <div className={styles.simulation} style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#888', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
                <div>Loading {name} Simulation...</div>
            </div>
        </div>
    );
}

/**
 * Map of simulation IDs to their components
 */
const SIMULATION_MAP: Record<string, React.ComponentType> = {
    'sampling': SamplingSimulation,
    'sampling-visualizer': SamplingSimulation,
    'noise': NoiseSimulation,
    'noise-overlay': NoiseSimulation,
    'snr': NoiseSimulation,
    'energy-power': EnergyPowerSimulation,
    'energy': EnergyPowerSimulation,
    'power': EnergyPowerSimulation,
    'transform': TransformSimulation,
    'signal-transform': TransformSimulation,
    'shift-scale': TransformSimulation,
    'system': SystemSimulation,
    'system-io': SystemSimulation,
    'input-output': SystemSimulation,
};

interface SimulationEmbedProps {
    simulationId: string;
}

/**
 * Embed an interactive simulation by ID
 * 
 * Usage in markdown:
 * [[simulation:sampling]]
 * [[simulation:noise]]
 * [[simulation:energy-power]]
 * [[simulation:transform]]
 * [[simulation:system]]
 */
export default function SimulationEmbed({ simulationId }: SimulationEmbedProps) {
    const SimulationComponent = SIMULATION_MAP[simulationId.toLowerCase()];

    if (!SimulationComponent) {
        return (
            <div className={styles.simulation} style={{ border: '1px solid #ff4444' }}>
                <div style={{ textAlign: 'center', color: '#ff4444', padding: '2rem' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
                    <div>Unknown simulation: <code>{simulationId}</code></div>
                    <div style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                        Available: sampling, noise, energy-power, transform, system
                    </div>
                </div>
            </div>
        );
    }

    return <SimulationComponent />;
}
