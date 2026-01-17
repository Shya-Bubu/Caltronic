# Engineering Applications

> From microphones to medical devices — systems in practice.

---

## The Input-Output Model

Every engineered device can be modeled as a system:

```
x(t) → [System] → y(t)
```

Where:
- $x(t)$ = input signal
- $y(t)$ = output signal
- The system defines the **transformation**

This simple model is incredibly powerful. It lets us analyze everything from audio amplifiers to rocket control systems.

---

## Transducers: Signal Converters

A **transducer** converts one type of physical signal to another.

| Transducer | Input | Output |
|------------|-------|--------|
| **Microphone** | Sound (pressure) | Voltage |
| **Speaker** | Voltage | Sound (pressure) |
| **Thermocouple** | Temperature | Voltage |
| **Photodiode** | Light | Current |
| **Strain gauge** | Mechanical stress | Resistance change |

### Why Electrical?

Notice how many transducers convert TO electrical signals. Why?

Because electrical signals are:
- **Easy to process** (amplify, filter, digitize)
- **Easy to transmit** (wires, wireless)
- **Easy to store** (digital memory)

This is why EE is foundational to all engineering.

[[visual:v3]]

---

## Block Diagrams

Engineers use **block diagrams** to represent systems:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Microphone  │ →   │  Amplifier  │ →   │   Speaker   │
└─────────────┘     └─────────────┘     └─────────────┘
   (Transducer)        (System)           (Transducer)
```

Each block is a system. Arrows show signal flow.

### Cascade (Series) Connection
Systems in sequence: output of one becomes input of next.

### Parallel Connection
Same input goes to multiple systems, outputs combined.

### Feedback Connection
Output is fed back to influence the input — the basis of control systems.

---

## Practical Example: Audio Mixer

An audio mixing console:

1. **Inputs**: Multiple microphones (acoustic → electrical)
2. **Processing**: Equalization, compression (electrical → electrical)
3. **Mixing**: Combine channels (multiple → one)
4. **Output**: To speakers or recording (electrical → acoustic or digital)

Each stage is a system. The entire console is a larger system.

---

## Design Implications

When designing a system, engineers must consider:

| Aspect | Question |
|--------|----------|
| **Bandwidth** | What frequency range must it handle? |
| **Gain** | How much should it amplify? |
| **Noise** | What unwanted signals will corrupt the output? |
| **Linearity** | Does doubling input double output? |
| **Stability** | Will it oscillate uncontrollably? |

All these questions will be answered as this course progresses.
