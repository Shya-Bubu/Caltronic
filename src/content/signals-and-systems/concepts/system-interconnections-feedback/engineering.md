# System Interconnections and Feedback - Engineering Applications

> **Engineering perspective**: Understanding how systems connect enables you to design complex systems from simple building blocks.

---

## 1. Cascade (Series) Connections

### Audio Signal Chain
Microphone → Preamplifier → Equalizer → Power Amplifier → Speaker

Each stage processes the signal in sequence. Overall gain = product of individual gains.

### Filter Design
Low-pass → High-pass = Band-pass filter
Multiple stages for sharper roll-off

---

## 2. Parallel Connections

### Audio Mixing
Multiple audio sources combined into one output.
Y = Source₁ + Source₂ + ... + Sourceₙ

### Redundant Systems
Critical systems use parallel redundancy. If one fails, others continue.

---

## 3. Feedback in Practice

### Temperature Control (Thermostat)
1. Set desired temperature (reference)
2. Measure actual temperature (output)
3. Compare: error = desired - actual
4. Turn heating ON if error > threshold

### Motor Speed Control
1. Reference: desired RPM
2. Tachometer measures actual RPM
3. Controller adjusts voltage based on error
4. Motor adjusts to match reference

### Cruise Control
Same principle applied to vehicle speed.

---

## 4. Stability Considerations

Feedback can cause oscillation if:
- Loop gain too high
- Phase shift approaches 180° at crossover

**Bode plot analysis** prevents instability.

---

## Key Takeaway

Cascade multiplies, parallel adds, feedback provides robustness but risks instability.
