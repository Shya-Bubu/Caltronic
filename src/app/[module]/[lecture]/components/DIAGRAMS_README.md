# Engineering Diagrams Usage Examples

These diagrams can be imported and used in lecture content components.

## Available Diagrams

1. **BlockDiagram** - System block representation with input/output
2. **SineWaveDiagram** - Continuous sinusoidal signal
3. **DiscreteStemPlot** - Discrete-time signal stem plot
4. **SimpleCircuit** - Basic circuit with voltage source and resistor
5. **VICurve** - Voltage-current characteristic curve
6. **FrequencySpectrum** - Frequency domain magnitude spectrum
7. **StepFunction** - Unit step signal visualization

## Usage in TSX/MDX

```tsx
import { 
    BlockDiagram, 
    SineWaveDiagram, 
    DiscreteStemPlot,
    SimpleCircuit,
    VICurve,
    FrequencySpectrum,
    StepFunction 
} from './components/EngineeringDiagrams';

// Example usage:
<SineWaveDiagram 
    title="Continuous Sinusoidal Signal" 
    caption="A continuous-time sine wave x(t) = A sin(2πft)"
/>

<BlockDiagram 
    title="Linear Time-Invariant System" 
    caption="Input-output relationship for an LTI system"
/>

<DiscreteStemPlot 
    title="Discrete Signal Representation" 
    caption="Discrete-time samples x[n] shown as stems"
/>

<SimpleCircuit 
    title="Basic DC Circuit" 
    caption="Circuit with voltage source V and resistor R"
/>

<VICurve 
    title="Resistor I-V Characteristic" 
    caption="Linear voltage-current relationship (Ohm's Law)"
/>

<FrequencySpectrum 
    title="Frequency Domain Representation" 
    caption="Magnitude spectrum |X(f)| showing frequency components"
/>

<StepFunction 
    title="Unit Step Function" 
    caption="Heaviside step function u(t), zero for t<0 and one for t≥0"
/>
```

## Features

- **Responsive**: All diagrams scale properly on mobile devices
- **Theme-aware**: Uses CSS variables that adapt to dark/light modes
- **Precise**: Graph-style precision suitable for academic content
- **Customizable**: Props for title, caption, and className
- **Professional**: Clean, textbook-quality appearance

## Styling

Diagrams use:
- `var(--sim-text)` for axes and labels
- `var(--accent)` for signal/curve lines
- `var(--sim-border)` for grid lines
- `var(--panel)` for background
- `var(--font-mono)` for mathematical labels

All colors automatically adapt to the current theme (dark/light).
