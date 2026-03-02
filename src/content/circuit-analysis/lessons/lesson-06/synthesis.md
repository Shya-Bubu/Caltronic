# Synthesis: Series and Parallel Resonance

## The Big Picture

| Concept | Series | Parallel |
|---------|--------|----------|
| **Driving variable** | Voltage source | Current source |
| **Resonance condition** | $X_L = X_C$ → $Z = R$ (min) | $B_L = B_C$ → $Y = G$ (min) |
| **Resonant frequency** | $\omega_o = 1/\sqrt{LC}$ | $\omega_o = 1/\sqrt{LC}$ |
| **Current at resonance** | Maximum ($V_m/R$) | Maximum in L and C |
| **Quality factor** | $Q = \omega_o L/R$ | $Q = \omega_o RC$ or $Q = R/\omega_o L$ |
| **Bandwidth** | $B = R/L = \omega_o/Q$ | $B = 1/RC = \omega_o/Q$ |

## Key Takeaways

1. **Resonance = reactance cancellation** — the imaginary parts of impedance (or admittance) cancel, leaving a purely real response.
2. **$\omega_o = 1/\sqrt{LC}$** is universal — it's the same for series and parallel resonance; only $Q$ and bandwidth differ.
3. **$Q$ controls everything** — higher $Q$ means sharper peak, narrower bandwidth, more energy stored, more selective filtering.
4. **Energy oscillates** — at resonance, total stored energy is constant as it swings between $L$ (magnetic) and $C$ (electric) every quarter cycle.
5. **Duality** — swap $R \leftrightarrow 1/R$, $L \leftrightarrow C$, $V \leftrightarrow I$, and every series result maps to its parallel counterpart.

## Looking Ahead

Resonance is the foundation for **filter design** (lowpass, highpass, bandpass, bandstop), **oscillator circuits** (Colpitts, Hartley, crystal), and **impedance matching** in RF systems.
