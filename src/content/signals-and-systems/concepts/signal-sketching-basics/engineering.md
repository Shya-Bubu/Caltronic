# Engineering Applications

> Signal shapes in real systems.

---

## Why Engineers Care About Pulse Shapes

Different pulse shapes have different:
- **Bandwidth** — how much frequency spectrum they occupy
- **Energy distribution** — concentrated or spread out
- **Interference properties** — do adjacent pulses overlap?

This matters for communication system design.

---

## Common Standard Pulses

| Pulse | Shape | Use Case |
|-------|-------|----------|
| **Rectangular** | Flat top, sharp edges | Simple switches, gates |
| **Triangular** | Linear slopes, peak | Smoothed digital signals |
| **Raised Cosine** | Smooth, no sharp edges | Communications (minimizes interference) |
| **Gaussian** | Bell curve | Radio, radar (optimal bandwidth) |

---

## Pulse Shaping in Communications

### Problem
Rectangular pulses have infinite bandwidth (sharp edges = high frequencies).

### Solution
Use **raised cosine** or other smooth pulses to:
- Limit bandwidth
- Reduce inter-symbol interference
- Improve spectral efficiency

---

## The Sinc Function

The **sinc function** is fundamental:
$$\text{sinc}(t) = \frac{\sin(\pi t)}{\pi t}$$

Properties:
- sinc(0) = 1
- sinc(n) = 0 for all integers n ≠ 0
- Its Fourier transform is a rectangle!

This connects pulse shapes to frequency content.

---

## Test and Measurement

Engineers use standard pulses to:
- **Test system response** — apply pulse, observe output
- **Characterize systems** — impulse response reveals everything
- **Debug circuits** — known input → expected output

---

## Signal Generators

Lab equipment generates standard waveforms:
- Square waves (rectangular pulses)
- Triangle waves
- Sinusoids
- Arbitrary waveforms (custom shapes)

Understanding pulse mathematics lets you specify exactly what you need.
