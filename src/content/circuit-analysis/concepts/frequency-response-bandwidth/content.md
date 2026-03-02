# Frequency Response, Bandwidth, and Half-Power Frequencies

> **Why This Matters**: The resonance peak isn't infinitely sharp — it has a **width** that determines how selective the circuit is. The bandwidth and half-power frequencies tell you the range of frequencies that the circuit lets through. This is the foundation of **filter design**: every radio tuner, every audio equaliser, and every communication receiver is designed by controlling bandwidth.

## Current Magnitude vs Frequency

The current in a series RLC circuit is:

$$I = |I| = \frac{V_m}{\sqrt{R^2 + (\omega L - 1/\omega C)^2}}$$

[[visual:current-frequency-response]]

At resonance ($\omega = \omega_o$), $I_{max} = V_m/R$.

The shape of this curve — tall and narrow, or short and wide — is determined by $R$ relative to $L$ and $C$.

## Half-Power Frequencies

At certain frequencies $\omega_1$ and $\omega_2$, the power dissipation drops to **half** its maximum value:

$$P(\omega_1) = P(\omega_2) = \frac{V_m^2}{4R} = \frac{1}{2} P_{max}$$

Since $P \propto I^2$, the half-power condition means:

$$I = \frac{I_{max}}{\sqrt{2}} = \frac{0.707 \cdot V_m}{R}$$

[[visual:half-power-frequencies]]

This occurs when $|Z| = \sqrt{2}R$, i.e., when $|\omega L - 1/\omega C| = R$.

### Deriving ω₁ and ω₂

Setting the net reactance equal to $\pm R$:

$$\omega L - \frac{1}{\omega C} = \pm R$$

Rearranging to a quadratic in $\omega$:

$$\omega^2 \mp \frac{R}{L}\omega - \frac{1}{LC} = 0$$

Solving (taking only positive roots):

$$\omega_1 = -\frac{R}{2L} + \sqrt{\left(\frac{R}{2L}\right)^2 + \frac{1}{LC}}$$

$$\omega_2 = +\frac{R}{2L} + \sqrt{\left(\frac{R}{2L}\right)^2 + \frac{1}{LC}}$$

[[visual:half-power-derivation]]

> **Key Insight**: $\omega_1$ and $\omega_2$ are **not** symmetrically placed around $\omega_o$ on a linear frequency scale. However, their **geometric mean** equals $\omega_o$: $\omega_o = \sqrt{\omega_1 \cdot \omega_2}$.

<details>
<summary><strong>Pause & Think</strong>: Why is ω₀ the geometric mean (not arithmetic mean) of ω₁ and ω₂?</summary>

From the derivation:
$$\omega_1 \cdot \omega_2 = \left[-\frac{R}{2L} + \sqrt{\cdots}\right]\left[\frac{R}{2L} + \sqrt{\cdots}\right] = \left(\sqrt{\cdots}\right)^2 - \left(\frac{R}{2L}\right)^2 = \frac{1}{LC} = \omega_o^2$$

So $\omega_o^2 = \omega_1 \omega_2$ exactly. The arithmetic mean $(\omega_1 + \omega_2)/2$ would only equal $\omega_o$ if the response were symmetrical, which it isn't on a linear frequency scale (but it is approximately symmetrical on a logarithmic scale for high Q).

</details>

## Bandwidth

The **bandwidth** $B$ is the difference between the two half-power frequencies:

$$B = \omega_2 - \omega_1 = \frac{R}{L} \text{ rad/s}$$

[[visual:bandwidth-illustration]]

This remarkably simple result says:
- **Larger R** → wider bandwidth (less selective)
- **Larger L** → narrower bandwidth (more selective)
- Bandwidth is **independent of C** (C affects where $\omega_o$ is, not how wide the peak is)

### Bandwidth and Quality Factor

Since $Q = \omega_o L/R$, we can write:

$$B = \frac{\omega_o}{Q} \quad \Longleftrightarrow \quad Q = \frac{\omega_o}{B}$$

This is a fundamental relationship: **Q = centre frequency / bandwidth**.

[[visual:q-bandwidth-relationship]]

## Effect of R on Response Shape

The lecture notes observe that the height of the response curve depends on $R$, while the "width" depends on bandwidth $B = R/L$:

[[visual:r-effect-on-response]]

| $R$ value | $Q$ | Bandwidth | Response |
|-----------|-----|-----------|----------|
| Small | High | Narrow | Sharp, selective |
| Large | Low | Wide | Flat, unselective |

<details>
<summary><strong>Pause & Think</strong>: A circuit with Q=100 at ω₀=10,000 rad/s has bandwidth B=100 rad/s. If you double R, what happens to Q and B?</summary>

Doubling R:
- $Q = \omega_o L/R$: halves → $Q = 50$
- $B = R/L$: doubles → $B = 200$ rad/s
- The resonance peak becomes shorter (lower I_max) and wider (less selective)

The current at resonance also halves: $I_{max} = V_m/R$ → $I_{max}/2$.

</details>

## Approximate Half-Power Frequencies

For **high-Q circuits** ($Q \gg 1$), the half-power frequencies are approximately:

$$\omega_1 \approx \omega_o - \frac{B}{2}$$

$$\omega_2 \approx \omega_o + \frac{B}{2}$$

This symmetric approximation works well when $Q > 10$ (bandwidth is much smaller than $\omega_o$).

## The Voltage Gain Transfer Function

The lecture derives the **bandpass filter** form by expressing the voltage gain $G_v(j\omega) = V_R/V_1$:

$$G_v(j\omega) = \frac{1}{1 + jQ\left(\frac{\omega}{\omega_o} - \frac{\omega_o}{\omega}\right)}$$

With magnitude and phase:

$$M(\omega) = \frac{1}{\sqrt{1 + Q^2\left(\frac{\omega}{\omega_o} - \frac{\omega_o}{\omega}\right)^2}}$$

$$\phi(\omega) = -\tan^{-1}Q\left(\frac{\omega}{\omega_o} - \frac{\omega_o}{\omega}\right)$$

[[visual:bandpass-transfer-function]]

At $\omega = \omega_o$: $M = 1$, $\phi = 0°$. At the half-power frequencies: $M = 1/\sqrt{2}$, $\phi = \pm 45°$.

<details>
<summary><strong>Pause & Think</strong>: The transfer function looks like a bandpass filter — unity gain at ω₀, dropping off on both sides. What type of signal processing is this useful for?</summary>

This is exactly how **radio receivers** work: the series RLC circuit selects signals near $\omega_o$ (the desired station) and rejects all others. By changing L or C (the tuning knob), you shift $\omega_o$ to select different stations. Higher Q means better selectivity (less interference from adjacent channels).

This bandpass characteristic is also used in audio equalisers, spectrum analysers, and communication channel filters.

</details>

## Summary

- **Current response**: $I = V_m / \sqrt{R^2 + (X_L - X_C)^2}$, peaks at $\omega_o$
- **Half-power frequencies**: $\omega_1$, $\omega_2$ where $P = P_{max}/2$, $I = I_{max}/\sqrt{2}$
- **Bandwidth**: $B = \omega_2 - \omega_1 = R/L = \omega_o/Q$
- **Geometric mean**: $\omega_o = \sqrt{\omega_1 \omega_2}$ (exact), but approximately centred for high Q
- **Bandpass filter**: $G_v = 1/[1 + jQ(\omega/\omega_o - \omega_o/\omega)]$, magnitude peaks at 1 with −3dB bandwidth = $B$
- **R controls selectivity**: small R → high Q → narrow bandwidth → sharp, selective response

> **Bandwidth is the engineering metric of resonance.** It tells you how much frequency range your circuit "lets through." The next concept extends these ideas to the parallel RLC topology.
