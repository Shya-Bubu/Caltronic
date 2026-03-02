# Parallel Resonance and Duality

> **Why This Matters**: Series and parallel resonance are **dual** circuits — swap voltage for current, impedance for admittance, and every formula transforms into its parallel counterpart. Understanding this duality means you only need to learn the physics once and can instantly translate results between topologies. Parallel resonance is used in **tank circuits**, **oscillator feedback networks**, and **impedance matching**.

## The Parallel RLC Circuit

Replace the series RLC with a parallel configuration driven by a current source:

[[visual:parallel-rlc-circuit]]

The **input admittance** is:

$$Y = \frac{1}{R} + j\omega C + \frac{1}{j\omega L} = \frac{1}{R} + j\left(\omega C - \frac{1}{\omega L}\right)$$

Note the duality: in series, $Z = R + j(\omega L - 1/\omega C)$. In parallel, $Y = G + j(\omega C - 1/\omega L)$, where $G = 1/R$.

[[visual:series-parallel-duality-table]]

## Parallel Resonance Condition

Resonance occurs when the imaginary part of $Y$ is zero:

$$\omega C - \frac{1}{\omega L} = 0 \implies \omega_o = \frac{1}{\sqrt{LC}} \text{ rad/s}$$

The resonant frequency is **identical** to the series case! This makes sense: $\omega_o$ depends only on $L$ and $C$, and we have the same $L$ and $C$ values.

### At Parallel Resonance

| Property | At resonance ($\omega = \omega_o$) |
|----------|----------------------------------|
| **Admittance** | $Y = 1/R$ (purely conductive, minimum admittance) |
| **Impedance** | $Z = R$ (**maximum** impedance) |
| **Source current** | All flows through $R$ |
| **LC combination** | Acts as an **open circuit** ($B_L + B_C = 0$) |
| **Inductor/capacitor currents** | Can be $Q$ times the source current (current magnification) |

[[visual:parallel-resonance-properties]]

<details>
<summary><strong>Pause & Think</strong>: In series resonance, the LC combination acts as a short circuit. In parallel resonance, it acts as an open circuit. Why are these opposite?</summary>

In series, the reactances (impedances in series) **cancel** → total LC impedance = 0 → short circuit. In parallel, the susceptances (admittances in parallel) cancel → total LC admittance = 0 → infinite impedance → open circuit.

The LC combination at resonance creates a "trap" — current circulates between L and C internally but doesn't flow through the external circuit. This is why parallel resonant circuits are called **tank circuits** — energy "tanks" (oscillates) inside the LC pair.

</details>

## The Duality Table

The lecture emphasises replacing $R, L, C$ in the series formulae with $1/R, C, L$ to get parallel formulae:

[[visual:duality-mapping]]

| Series Parameter | → | Parallel Parameter |
|-----------------|---|-------------------|
| $R$ | ↔ | $1/R$ (conductance $G$) |
| $L$ | ↔ | $C$ |
| $C$ | ↔ | $L$ |
| Voltage $V$ | ↔ | Current $I$ |
| Impedance $Z$ | ↔ | Admittance $Y$ |
| Current maximum | ↔ | Voltage maximum |
| $Q = \omega_o L/R$ | ↔ | $Q = \omega_o RC = R/\omega_o L$ |
| $B = R/L$ | ↔ | $B = 1/RC$ |

## Parallel Admittance Frequency Response

Using the Q-normalised form:

$$Y(j\omega) = \frac{1}{R}\left[1 + jQ\left(\frac{\omega}{\omega_o} - \frac{\omega_o}{\omega}\right)\right]$$

The voltage across the parallel circuit is:

$$V = \frac{I_s}{Y}$$

And the voltage gain (voltage across R normalised to source-driven voltage):

$$G_v(j\omega) = \frac{V_R}{V_1} = \frac{1}{1 + jQ\left(\frac{\omega}{\omega_o} - \frac{\omega_o}{\omega}\right)}$$

[[visual:parallel-frequency-response]]

This has the **same bandpass shape** as the series case, with:
- $|G_v(\omega_o)| = 1$ (unity at resonance)
- $|G_v| = 1/\sqrt{2}$ at the half-power frequencies

<details>
<summary><strong>Pause & Think</strong>: The voltage gain formula for the parallel circuit looks identical to the series case. Is this a coincidence?</summary>

No — it's a direct consequence of duality! The mathematical structure of the series impedance and parallel admittance are identical (just with dual quantities). The normalised transfer function $1/[1 + jQ(\omega/\omega_o - \omega_o/\omega)]$ is universal for any second-order resonant system.

This same form appears in mechanical resonance (spring-mass-damper), acoustic resonance (Helmholtz resonator), and optical resonance (Fabry-Pérot cavity). The Q factor and bandwidth concepts transcend electrical circuits.

</details>

## Parallel Bandwidth

$$B = \frac{1}{RC} = \frac{\omega_o}{Q} \text{ rad/s}$$

The half-power frequencies are derived identically to the series case:

$$\omega_{LO} = \omega_o\left[-\frac{1}{2Q} + \sqrt{\left(\frac{1}{2Q}\right)^2 + 1}\right]$$

$$\omega_{HI} = \omega_o\left[\frac{1}{2Q} + \sqrt{\left(\frac{1}{2Q}\right)^2 + 1}\right]$$

And again: $\omega_o^2 = \omega_{LO} \cdot \omega_{HI}$ (geometric mean is exact).

[[visual:parallel-bandwidth]]

## Selectivity and Filter Applications

The lecture notes state:
- **High Q → small bandwidth** → circuit is very **selective**
- If a wide frequency range passes through a high-Q circuit, **only frequencies within the bandwidth are passed**; others are **attenuated**
- This is exactly the behaviour of a **bandpass filter**

[[visual:selectivity-comparison]]

<details>
<summary><strong>Pause & Think</strong>: A radio station broadcasts at 100 MHz. If your tuner has Q = 200, what bandwidth does it select, and will it reject an adjacent station at 100.5 MHz?</summary>

$B = f_o/Q = 100 \times 10^6 / 200 = 500$ kHz.

Half-power frequencies: approximately $f_o \pm B/2 = 99.75$ MHz to $100.25$ MHz.

The adjacent station at $100.5$ MHz is **0.25 MHz outside** the bandwidth edge. It would be attenuated significantly (well below −3 dB), so yes, you'd reject it. But a station at $100.1$ MHz (within the pass band) would also be received — that could cause interference.

Higher Q (narrower B) would provide better channel separation.

</details>

## Summary

- **Parallel RLC admittance**: $Y = 1/R + j(\omega C - 1/\omega L)$
- **Resonant frequency**: $\omega_o = 1/\sqrt{LC}$ — same as series
- **At resonance**: $Y = 1/R$ (minimum admittance), $Z = R$ (maximum impedance), LC = open circuit
- **Current magnification**: $I_L = I_C = Q \times I_s$ (dual of voltage magnification)
- **Duality**: swap $R ↔ 1/R$, $L ↔ C$, $V ↔ I$ to convert between series and parallel
- **Bandwidth**: $B = 1/RC = \omega_o/Q$
- **Tank circuit**: energy oscillates between L and C at resonance — the basis of oscillators

> **Parallel resonance is the mirror image of series resonance.** The duality principle means you never need to re-derive anything — just apply the substitution table.
