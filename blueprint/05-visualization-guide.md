# 05 — Visualization Guide: D3.js Interactive Elements

**Purpose:** Complete guide to creating visualizations using D3.js for Caltronic V2

---

## Overview

Caltronic V2 uses **D3.js (Data-Driven Documents)** for all programmatically-generated visualizations. This approach ensures:
- **Theme adaptivity** (auto-switch between light/dark mode)
- **Interactivity** (hover, zoom, pan where appropriate)
- **Responsiveness** (works on all screen sizes)
- **No AI generation** (code-based, reproducible, precise)

---

## Visualization Philosophy

### DO ✅
- Use D3.js for standard signal/system visualizations
- Make visuals interactive when it aids understanding
- Ensure light/dark mode compatibility
- Center visuals within their container
- Provide clear titles and descriptions

### DON'T ❌
- Use AI image generators (ever!)
- Create static PNG/JPG diagrams (unless from lecture notes)
- Overcomplicate with unnecessary animations
- Assume screen size (make responsive)

---

## Visual Types Available

### 1. `d3-waveform`
**Use for:** Signal plots, time-domain representations

**Supported Waveforms:**
- `sine` — Continuous or discrete sinusoidal
- `square` — Square wave
- `step` — Unit step function u(t)
- `impulse` — Dirac delta δ(t)
- `exponential` — Exponential decay/growth
- `sawtooth` — Sawtooth wave

**Modes:**
- `continuous` — Smooth curve
- `discrete` — Stem plot (samples)

**JSON Specification:**
```json
{
  "id": "v1",
  "type": "d3-waveform",
  "title": "Continuous Sine Wave",
  "description": "A sinusoidal signal x(t) = A sin(2πft)",
  "placement": "intuition",
  "waveType": "sine",
  "mode": "continuous",
  "params": {
    "amplitude": 1.0,
    "frequency": 1.0,
    "phase": 0,
    "duration": 2.0
  }
}
```

**Parameters (Optional):**
- `amplitude`: default 1.0
- `frequency`: default 1.0 Hz
- `phase`: default 0 radians
- `duration`: default 2.0 seconds
- `samplingRate`: default 100 Hz (discrete mode)

**Rendering:** Component will render in the specified `placement` tab (intuition/engineering/mathematics/exam).

---

### 2. `d3-block-diagram`
**Use for:** System interconnections, signal flow, feedback loops

**JSON Specification:**
```json
{
  "id": "v2",
  "type": "d3-block-diagram",
  "title": "System Input-Output Model",
  "description": "Basic system representation: input → system → output",
  "placement": "intuition",
  "blocks": [
    {
      "id": "input",
      "label": "x(t)",
      "x": 50,
      "y": 50,
      "type": "input"
    },
    {
      "id": "system",
      "label": "H",
      "x": 200,
      "y": 40,
      "width": 100,
      "height": 60
    },
    {
      "id": "output",
      "label": "y(t)",
      "x": 400,
      "y": 50,
      "type": "output"
    }
  ],
  "connections": [
    {
      "from": "input",
      "to": "system",
      "fromSide": "right",
      "toSide": "left"
    },
    {
      "from": "system",
      "to": "output",
      "fromSide": "right",
      "toSide": "left"
    }
  ]
}
```

**Block Types:**
- `input` — Circular input node
- `output` — Circular output node
- `system` — Rectangular system block
- `summing` — Summing junction (circle with +/-)
- `branch` — Signal branch point

**Connection Sides:**
- `left`, `right`, `top`, `bottom`

---

### 3. `d3-iv-curve`
**Use for:** Component characteristics (diodes, transistors), load lines

**JSON Specification:**
```json
{
  "id": "v3",
  "type": "d3-iv-curve",
  "title": "Ideal Diode I-V Characteristic",
  "description": "Current vs voltage for an ideal diode (vertical line at V=0)",
  "placement": "engineering",
  "curveType": "ideal-diode",
  "showLoadLine": false,
  "axes": {
    "xLabel": "Voltage (V)",
    "yLabel": "Current (mA)",
    "xRange": [-2, 2],
    "yRange": [0, 50]
  }
}
```

**Curve Types:**
- `ideal-diode` — Vertical line at V=0
- `real-diode` — Exponential I = Is(e^(V/Vt) - 1)
- `linear-resistor` — Straight line I = V/R
- `piecewise-linear` — Multi-segment approximation

**Optional Parameters:**
- `loadLine`: { Vs, Rs } for load line overlay
- `operatingPoint`: { V, I } to highlight Q-point

---

### 4. `d3-phasor`
**Use for:** AC circuit analysis, complex number visualization

**JSON Specification:**
```json
{
  "id": "v4",
  "type": "d3-phasor",
  "title": "Voltage Phasor Diagram",
  "description": "AC voltage represented as rotating vector in complex plane",
  "placement": "mathematics",
  "phasors": [
    {
      "label": "V1",
      "magnitude": 10,
      "angle": 30,
      "color": "#3b82f6"
    },
    {
      "label": "V2",
      "magnitude": 8,
      "angle": 120,
      "color": "#ef4444"
    }
  ],
  "showGrid": true,
  "animate": true
}
```

**Parameters:**
- `magnitude`: Length of phasor
- `angle`: Angle in degrees (0° = positive real axis)
- `color`: Hex color code
- `showGrid`: Show polar/cartesian grid
- `animate`: Rotate phasors at frequency

---

### 5. `d3-simulation` (Interactive)
**Use for:** Parameter exploration, "what-if" scenarios

**JSON Specification:**
```json
{
  "id": "v5",
  "type": "d3-simulation",
  "title": "RC Circuit Step Response",
  "description": "Adjust R and C to see how the time constant τ = RC affects the response",
  "placement": "engineering",
  "simulationType": "rc-step-response",
  "controls": [
    {
      "parameter": "R",
      "label": "Resistance (kΩ)",
      "min": 1,
      "max": 100,
      "default": 10,
      "step": 1
    },
    {
      "parameter": "C",
      "label": "Capacitance (μF)",
      "min": 0.1,
      "max": 100,
      "default": 10,
      "step": 0.1
    }
  ]
}
```

**Simulation Types (Predefined):**
- `rc-step-response` — RC charging/discharging
- `sampling-demo` — Nyquist sampling visualization
- `aliasing-demo` — Aliasing effect demonstration
- `frequency-response` — Bode plot explorer

**Controls:**
- Slider-based parameter adjustment
- Real-time plot update
- Reset button

---

## Theme Adaptivity

All D3 visualizations must support light and dark modes.

### Color Palette

**Light Mode:**
```javascript
const lightTheme = {
  background: '#ffffff',
  foreground: '#000000',
  gridLines: '#e5e7eb',
  primary: '#3b82f6',      // Blue
  secondary: '#10b981',    // Green
  accent: '#f59e0b',       // Orange
  text: '#1f2937'
};
```

**Dark Mode:**
```javascript
const darkTheme = {
  background: '#0f172a',
  foreground: '#e2e8f0',
  gridLines: '#334155',
  primary: '#60a5fa',      // Lighter blue
  secondary: '#34d399',    // Lighter green
  accent: '#fbbf24',       // Lighter orange
  text: '#e2e8f0'
};
```

### Implementation Pattern
```javascript
// React component detects theme
const theme = useTheme(); // 'light' or 'dark'
const colors = theme === 'dark' ? darkTheme : lightTheme;

// Pass to D3 rendering
svg.style('background-color', colors.background);
axes.style('stroke', colors.gridLines);
plot.style('stroke', colors.primary);
```

---

## Responsive Sizing

All visualizations should:
1. Use **percentage-based widths** (default: 100% of container)
2. Maintain **aspect ratios** (e.g., 16:9 for waveforms)
3. **Resize on window resize** events

**Example:**
```javascript
const container = d3.select('#visual-container');
const width = container.node().offsetWidth;
const height = width * 0.5625; // 16:9 aspect ratio

svg.attr('width', width)
   .attr('height', height)
   .attr('viewBox', `0 0 ${width} ${height}`);

// Listen for resize
window.addEventListener('resize', () => {
  // Re-render with new dimensions
});
```

---

## Accessibility

### Labels and Descriptions
- Every visual must have a `title` and `description`
- Description explains what the visual shows (displayed as caption)

### Keyboard Navigation
- Interactive simulations should be keyboard-accessible
- Sliders: arrow keys to adjust

### Alternative Text
- SVG elements should have `<title>` tags for screen readers
- Important data points should have text labels

---

## Example: Complete Waveform Visual

**visuals.json:**
```json
{
  "conceptId": "signal-sketching-basics",
  "visuals": [
    {
      "id": "v1",
      "type": "d3-waveform",
      "title": "Continuous Sine Wave",
      "description": "A pure sinusoidal signal x(t) = sin(2πt) with amplitude 1 and frequency 1 Hz.",
      "placement": "intuition",
      "waveType": "sine",
      "mode": "continuous",
      "params": {
        "amplitude": 1.0,
        "frequency": 1.0,
        "phase": 0,
        "duration": 2.0
      }
    },
    {
      "id": "v2",
      "type": "d3-waveform",
      "title": "Discrete Sine Wave",
      "description": "Same signal sampled at 10 Hz, showing discrete-time representation x[n].",
      "placement": "intuition",
      "waveType": "sine",
      "mode": "discrete",
      "params": {
        "amplitude": 1.0,
        "frequency": 1.0,
        "samplingRate": 10,
        "duration": 2.0
      }
    }
  ]
}
```

**Rendered Output:**
- Two SVG plots, one above the other
- First: smooth sine curve
- Second: stem plot with sample markers
- Both in theme colors (blue for light, lighter blue for dark)
- Captions below each plot

---

## Best Practices

### 1. Keep It Simple
Don't over-animate or over-complicate. The visual should:
- Clarify a concept
- Not distract from learning
- Load quickly

### 2. Annotate Key Points
Add text labels to important features:
- Peak values
- Zero crossings
- Time constants
- Operating points

### 3. Use Consistent Notation
- Match lecture note symbols (x(t), y(n), H, etc.)
- Use standard electrical symbols for diagrams

### 4. Test in Both Themes
Before finalizing:
- Switch to dark mode and verify contrast
- Check that gridlines are visible
- Ensure text is readable

### 5. Provide Context
- Title should be descriptive
- Description should explain WHY this visual matters
- Link back to equation in markdown if applicable

---

## Common Patterns

### Pattern 1: Show Continuous vs Discrete
```json
[
  { "mode": "continuous", "placement": "intuition" },
  { "mode": "discrete", "placement": "engineering" }
]
```
Helps students see the sampling process.

### Pattern 2: System Flow
```
Input → System → Output
```
Use `d3-block-diagram` with 3 blocks and 2 connections.

### Pattern 3: Interactive Exploration
Use `d3-simulation` when students should "play" with parameters:
- Time constants (RC, RL circuits)
- Frequency response (filters)
- Sampling rates (aliasing)

---

## Troubleshooting

### Visual Doesn't Render
- Check JSON syntax (use online validator)
- Verify `type` matches available types
- Ensure `placement` is valid tab name

### Wrong Colors in Dark Mode
- Check theme detection in component
- Verify color palette uses theme variable

### Visual Too Small/Large
- Check container width calculation
- Adjust aspect ratio if needed
- Test on mobile viewport

---

## Future Expansions

Potential new visual types:
- `d3-bode-plot` — Frequency response magnitude/phase
- `d3-pole-zero` — s-plane or z-plane plots
- `d3-constellation` — Digital modulation diagrams
- `d3-circuit-schematic` — Rendered circuit from netlist

**Process:** Define JSON spec → Implement React component → Add to visual renderer

---

**Visuals should teach, not just illustrate. Every visual must have a clear pedagogical purpose.**
