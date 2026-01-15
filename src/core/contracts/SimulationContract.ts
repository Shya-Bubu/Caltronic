/**
 * SIMULATION CONTRACT
 * 
 * PURPOSE:
 * Define the structure for interactive simulations that feel like labs, not widgets.
 * Each simulation has clear controls, learning goals, and danger zones.
 * 
 * USAGE:
 * Simulations are embedded in concept content and rendered by a unified SimulationView component.
 */

/**
 * Simulation control parameter
 */
export interface SimulationControl {
    /** Parameter identifier (e.g., "R", "C", "frequency") */
    id: string;
    /** Display label for the control */
    label: string;
    /** Unit of measurement */
    unit: string;
    /** Minimum value */
    min: number;
    /** Maximum value */
    max: number;
    /** Step increment */
    step: number;
    /** Default value */
    defaultValue: number;
}

/**
 * Simulation contract for interactive learning elements
 */
export interface SimulationContract {
    /** Unique identifier for the simulation */
    id: string;

    /** Display title (e.g., "RC Circuit Step Response") */
    title: string;

    /** Brief description of what the simulation demonstrates */
    description: string;

    /** Learning goal - what the student should understand after interacting */
    learningGoal: string;

    /** Concept this simulation belongs to */
    conceptId: string;

    /** Adjustable parameters */
    controls: SimulationControl[];

    /** 
     * Danger zones - parameter combinations that cause edge-case behavior
     * Used to highlight when simulation approaches undefined/unstable regions
     * Example: ["R → 0", "C → 0", "frequency → ∞"]
     */
    dangerZones: string[];

    /** Type of visualization */
    visualType: 'plot' | 'circuit' | 'waveform' | 'block-diagram' | 'custom';

    /** Optional: Canvas/SVG rendering function identifier */
    renderer?: string;
}

/**
 * EXAMPLE SIMULATION:
 * 
 * {
 *   "id": "rc_step_response",
 *   "title": "RC Circuit Step Response",
 *   "description": "Explore how resistance and capacitance affect the charging time of an RC circuit",
 *   "learningGoal": "Understand how time constant τ = RC affects response speed",
 *   "conceptId": "rc-circuits",
 *   "controls": [
 *     { "id": "R", "label": "Resistance", "unit": "Ω", "min": 100, "max": 10000, "step": 100, "defaultValue": 1000 },
 *     { "id": "C", "label": "Capacitance", "unit": "μF", "min": 1, "max": 100, "step": 1, "defaultValue": 10 }
 *   ],
 *   "dangerZones": ["R → 0", "C → 0"],
 *   "visualType": "plot"
 * }
 */
