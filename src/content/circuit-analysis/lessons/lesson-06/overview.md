# Series and Parallel Resonance

> Resonance is one of the most powerful phenomena in all of electrical engineering — it's how radios tune to stations, how MRI machines image the human body, and how crystal oscillators keep time in every digital device.

## What You'll Learn

This lesson takes you from the impedance of a series RLC circuit to the duality of parallel resonance, covering:

1. **Series resonance condition** — when inductive and capacitive reactances cancel ($\omega_o L = 1/\omega_o C$), leaving purely resistive impedance.
2. **Resonant frequency** — $\omega_o = 1/\sqrt{LC}$ and its derivation from the impedance equation.
3. **Frequency response** — the current magnitude curve, half-power frequencies $\omega_1$ and $\omega_2$, and the bandwidth $B = \omega_2 - \omega_1$.
4. **Parallel resonance** — the admittance approach and how duality maps every series result to a parallel counterpart.
5. **Quality factor $Q$** — measuring resonance sharpness, energy exchange between $L$ and $C$, and frequency selectivity.

## Why This Matters

Every wireless communication system, every filter circuit, and every oscillator relies on resonance. The quality factor $Q$ determines whether a circuit is a sharp bandpass filter (high $Q$) or a broad, unselective one (low $Q$). Understanding resonance is essential for RF design, audio engineering, power systems, and biomedical instrumentation.

## Prerequisites

- Lesson 05: AC Phasors & Impedance — you need to be comfortable with complex impedance $Z = R + j(X_L - X_C)$ and phasor notation.
