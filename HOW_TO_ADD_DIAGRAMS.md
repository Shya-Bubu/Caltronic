# How to Add Engineering Diagrams to Your Content

Engineering diagrams are now fully integrated! Here's how to use them.

## Available Diagram Types

Add these to your `visuals.json` files:

### 1. Block Diagram
```json
{
    "id": "v1",
    "type": "block-diagram",
    "title": "System Input-Output Model",
    "description": "Input x(t) → System H(s) → Output y(t)",
    "placement": "intuition"
}
```

### 2. Sine Wave
```json
{
    "id": "v2",
    "type": "sine-wave",
    "title": "Continuous Signal",
    "description": "x(t) = A sin(2πft)",
    "placement": "intuition"
}
```

### 3. Discrete Stem Plot
```json
{
    "id": "v3",
    "type": "discrete-stem",
    "title": "Discrete Signal",
    "description": "Sampled signal x[n]",
    "placement": "engineering"
}
```

### 4. Circuit Diagram
```json
{
    "id": "v4",
    "type": "circuit",
    "title": "Basic DC Circuit",
    "description": "Voltage source and resistor",
    "placement": "engineering"
}
```

### 5. VI Curve
```json
{
    "id": "v5",
    "type": "vi-curve",
    "title": "Voltage-Current Characteristic",
    "description": "I-V relationship with operating point Q",
    "placement": "exam"
}
```

### 6. Frequency Spectrum
```json
{
    "id": "v6",
    "type": "frequency-spectrum",
    "title": "Frequency Domain",
    "description": "Magnitude spectrum |X(f)|",
    "placement": "mathematics"
}
```

### 7. Step Function
```json
{
    "id": "v7",
    "type": "step-function",
    "title": "Unit Step",
    "description": "Heaviside function u(t)",
    "placement": "mathematics"
}
```

## Where to Add Them

Edit the `visuals.json` file in each concept folder:

```
src/content/signals-and-systems/concepts/
    └── your-concept-name/
        └── visuals.json  ← Add diagrams here
```

## Placement Options

- `"intuition"` - Shows in Intuition tab
- `"engineering"` - Shows in Engineering tab
- `"mathematics"` - Shows in Mathematics tab
- `"exam"` - Shows in Exam tab

## Example: Complete visuals.json

```json
{
    "conceptId": "my-concept",
    "visuals": [
        {
            "id": "v1",
            "type": "block-diagram",
            "title": "System Overview",
            "description": "How the system processes signals",
            "placement": "intuition"
        },
        {
            "id": "v2",
            "type": "sine-wave",
            "title": "Input Signal",
            "description": "Continuous sine wave",
            "placement": "engineering"
        }
    ]
}
```

## Already Added Diagrams

✅ **signal-and-system-foundations** - 5 diagrams
✅ **energy-and-power-signals** - 4 diagrams

Navigate to these concepts to see the diagrams in action!

## Features

- **Automatic rendering** - Just add to JSON, diagrams appear automatically
- **Theme-aware** - Works in both dark and light modes
- **Responsive** - Scales perfectly on mobile
- **Professional** - Textbook-quality precision

Refresh your browser to see the diagrams!
