# Quality Factor, Energy Exchange, and Selectivity

> **Why This Matters**: The quality factor $Q$ is arguably the single most important parameter in resonant circuit design. It simultaneously controls the bandwidth, the voltage/current magnification, the energy efficiency, and the selectivity. In this concept, we derive $Q$ from first principles — the ratio of stored energy to dissipated energy — revealing its deep physical meaning.

## The Physical Definition of Q

The lecture derives the fundamental definition:

$$Q = 2\pi \frac{\text{energy stored in the circuit}}{\text{energy dissipated per cycle}}$$

This is the **basic** (physics-level) definition, valid for any resonant system — electrical, mechanical, acoustic, or optical.

[[visual:q-energy-definition]]

## Energy in L and C at Resonance

At resonance the current is $i(t) = \frac{V_m}{R}\cos(\omega_o t)$ and the capacitor voltage is $v_C(t) = \frac{V_m}{R} \cdot \frac{1}{\omega_o C}\sin(\omega_o t)$.

### Inductor Energy

$$w_L(t) = \frac{1}{2}Li^2 = \frac{V_m^2 L}{2R^2}\cos^2(\omega_o t) \text{ Joules}$$

### Capacitor Energy

$$w_C(t) = \frac{1}{2}Cv_C^2 = \frac{V_m^2 L}{2R^2}\sin^2(\omega_o t) \text{ Joules}$$

Note: the coefficient is $V_m^2 L / 2R^2$ for **both** — this is because at resonance, $1/\omega_o^2 C^2 \cdot C/2 = L/2$ (using $\omega_o^2 = 1/LC$).

### Total Stored Energy

$$w_S = w_L + w_C = \frac{V_m^2 L}{2R^2}\left[\cos^2(\omega_o t) + \sin^2(\omega_o t)\right] = \frac{V_m^2 L}{2R^2} \text{ Joules}$$

[[visual:energy-exchange]]

The total stored energy is **constant** — energy oscillates between $L$ and $C$ but the sum never changes!

> **Key Insight**: At resonance, the total energy in the circuit doesn't fluctuate. When the inductor energy is maximum, the capacitor energy is zero, and vice versa. The energy "sloshes" back and forth every quarter cycle, like water in a U-tube.

<details>
<summary><strong>Pause & Think</strong>: The inductor energy peaks at t=0 (cos²=1) and the capacitor energy peaks at t=T/4 (sin²=1). What physical process transfers energy between them?</summary>

The **current** transfers energy. When inductor energy is maximum (peak current), it starts to decrease as current drops. The decreasing current charges the capacitor. When the capacitor is fully charged (zero current), all energy is in the electric field. Then the capacitor discharges, rebuilding current and returning energy to the inductor's magnetic field.

This is the same principle as a pendulum: kinetic energy (inductor) ↔ potential energy (capacitor), with the total constant.

</details>

## Energy Dissipated per Cycle

The resistor dissipates power continuously:

$$P = \frac{1}{2}I^2 R = \frac{V_m^2}{2R}$$

Over one complete cycle of period $T = 2\pi/\omega_o$:

$$w_D = P \cdot T = \frac{V_m^2}{2R} \cdot \frac{2\pi}{\omega_o} = \frac{\pi V_m^2}{R\omega_o}$$

## Deriving Q from Energy

$$Q = 2\pi \frac{w_S}{w_D} = 2\pi \frac{V_m^2 L / 2R^2}{\pi V_m^2 / R\omega_o} = 2\pi \cdot \frac{L\omega_o}{2\pi R} = \frac{\omega_o L}{R}$$

[[visual:q-derivation]]

This confirms the circuit-level formula! The $Q$ we've been using ($\omega_o L/R$) is exactly the energy ratio definition with the $2\pi$ scaling.

## Q as Multiple Metrics

The quality factor appears in many equivalent forms:

[[visual:q-multiple-forms]]

| Formula | What it measures |
|---------|-----------------|
| $Q = \omega_o L/R$ | Ratio of inductive reactance to resistance at resonance |
| $Q = 1/\omega_o CR$ | Ratio of capacitive reactance to resistance at resonance |
| $Q = \omega_o/B$ | Centre frequency divided by bandwidth |
| $Q = 2\pi w_S/w_D$ | Energy stored / energy dissipated per cycle |
| $Q = V_L/V_s = V_C/V_s$ | Voltage magnification factor (series) |
| $Q = I_L/I_s = I_C/I_s$ | Current magnification factor (parallel) |

All of these are **the same number** for any given circuit.

## The Capacitor Stress Example

The lecture presents a cautionary worked example:

**Problem**: Design an RLC circuit for resonance at $f = 1$ kHz using a $L = 0.02$ H inductor with $Q = 200$. Source: $V_s = 10\angle 0°$ V. Capacitor rated at 300 V.

**Solution**:
- $\omega_o = 2\pi \times 1000 = 2000\pi$ rad/s
- $C = 1/\omega_o^2 L = 1.27\ \mu$F
- $R = \omega_o L/Q = 2000\pi \times 0.02/200 = 0.628\ \Omega$
- $I = V_s/R = 10/0.628 = 15.9$ A

The voltage across the capacitor:

$$|V_C| = Q \times V_s = 200 \times 10 = 2000 \text{ V}$$

**But the capacitor is only rated at 300 V!** This would destroy it.

[[visual:capacitor-stress]]

<details>
<summary><strong>Pause & Think</strong>: The lecture notes that when the circuit was actually constructed, the measured current was less than the calculated 15.9A. Why?</summary>

Real inductors have **internal resistance** (wire resistance). The lecture uses R = 0.628 Ω as the *required* Q-setting resistance, but the real inductor already has some internal resistance that adds to R. If the inductor's internal resistance is, say, 1 Ω, then total R = 1.628 Ω, and:
- $I = V/R = 10/1.628 = 6.14$ A (less than 15.9 A)
- $Q = \omega_o L/R_{total} = 77$ (less than 200)
- $V_C = Q \times V_s = 770$ V (still dangerous, but less than 2000 V)

Real circuit measurements always include parasitic resistances that reduce Q from the ideal value.

</details>

## Selectivity: Frequency Discrimination

High Q means high selectivity — the circuit strongly favours frequencies near $\omega_o$ and rejects others:

[[visual:selectivity-q-comparison]]

| Q value | Bandwidth | Selectivity | Application |
|---------|-----------|-------------|-------------|
| 5–10 | Wide | Low | Broadband amplifiers |
| 50–100 | Medium | Medium | Audio filters |
| 200–500 | Narrow | High | Radio receivers |
| 1000+ | Very narrow | Very high | Crystal oscillators |

[[visual:falstad-rlc-resonance]]

<details>
<summary><strong>Pause & Think</strong>: A crystal oscillator can have Q > 10,000. If ω₀ = 2π × 32,768 (watch crystal), what is the bandwidth?</summary>

$B = \omega_o/Q = 2\pi \times 32768 / 10000 \approx 20.6$ rad/s $≈ 3.3$ Hz.

The crystal passes only a 3.3 Hz window centred on 32,768 Hz. This extreme selectivity is why quartz crystals keep time so precisely — they oscillate at almost exactly one frequency with almost zero drift.

</details>

## Summary

- **Fundamental Q definition**: $Q = 2\pi \times$ (stored energy / energy dissipated per cycle)
- **Energy oscillation**: $w_L + w_C = \text{constant}$ at resonance; energy swings between L (magnetic) and C (electric)
- **Q equivalences**: $\omega_o L/R = 1/\omega_o CR = \omega_o/B = V_L/V_s = 2\pi w_S/w_D$
- **Practical danger**: Voltage magnification of Q means component ratings must handle $Q \times V_s$
- **Selectivity**: Higher Q → narrower bandwidth → more frequency-selective

> **Q unifies resonance**: it connects the circuit parameters ($L$, $R$), the frequency response ($B$, $\omega_o$), the energy physics ($w_S$, $w_D$), and the voltage/current magnification — all in one number.
