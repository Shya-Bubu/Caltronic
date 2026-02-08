# Engineering Application

## Setting Up Your Op-Amp Circuit

[[visual:diag-engineering-01]]

### Power Supply Connection

**CRITICAL**: Always connect power BEFORE connecting inputs!

| Connection | Pin | Voltage |
|------------|-----|---------|
| V+ | Pin 7 | +15V |
| V- | Pin 4 | -15V |

**Common mistakes to avoid:**
- ❌ Reversing +15V and -15V (may destroy the chip)
- ❌ Forgetting to connect V− (Pin 4) — circuit won't work!
- ❌ Connecting power with signal already applied

### Function Generator Setup

For this lab, you'll typically use:
- **Amplitude**: 1V peak-to-peak (Vpp)
- **Frequency**: 200 Hz – 2 kHz
- **Waveforms**: Sinusoidal, square, triangular

### Oscilloscope Configuration

Use **dual-channel mode** to see input and output simultaneously:
- **CH1**: Input signal (Vi)
- **CH2**: Output signal (Vo)
- **Coupling**: DC coupling (to see DC offsets)
- **Trigger**: Usually on CH1 (input)

## Breadboard Layout Tips

**Pro tips:**
1. Keep wires short to minimize noise
2. Use consistent color coding (red = +, blue = −, green = signal)
3. Place bypass capacitors (0.1µF) between power rails and ground

## Measuring Gain

**Voltage Gain** = Vo(peak-to-peak) / Vi(peak-to-peak)

Example measurement:
- Vi = 1V pp
- Vo = 17.7V pp
- Gain = 17.7/1 = 17.7

**Compare with theoretical**: If using R2/R1 = 39kΩ/2.2kΩ = 17.7 ✓

## Observing Saturation

When you increase input voltage beyond a certain point:

1. Output starts clipping (flat tops/bottoms)
2. Waveform becomes distorted
3. This is **saturation** — output cannot exceed ±14V

**Lab tip**: For Activity 1, step 3 asks you to find this saturation point!

---

*For the mathematical derivations, continue to the Mathematics layer.*
