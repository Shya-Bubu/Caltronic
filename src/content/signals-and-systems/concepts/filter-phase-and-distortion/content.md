# Filter Phase and Distortion

> **Why This Matters**: You might think a filter's job is done once you know which frequencies it passes and blocks. But there's a hidden danger — even if the magnitude response is perfect, a bad phase response can **scramble the shape of your signal**. Understanding phase distortion is essential for designing filters that preserve signal fidelity.

## Beyond Magnitude: The Phase Story

In the previous concept, we focused entirely on $|H(\omega)|$ — which frequencies pass and which don't. But the complete frequency response is:

$$H(\omega) = |H(\omega)| \cdot e^{j\angle H(\omega)}$$

The phase function $\angle H(\omega)$ determines the **time shift** applied to each frequency component. If different frequencies get different time shifts, they arrive at the output at different times — and the signal's shape is distorted.

[[visual:magnitude-vs-phase-importance]]

## The Distortionless Condition

For a filter to pass a signal **without any distortion** (preserving its shape exactly), the phase must vary **linearly** with frequency over the entire passband:

$$\angle H(\omega) = -\omega t_d$$

where $t_d$ is a constant called the **propagation delay** or **group delay**.

[[visual:linear-phase-example]]

This is a critical result. Let's understand why it works.

> **Key Insight**: A linear phase $\angle H(\omega) = -\omega t_d$ means every frequency component experiences the same time delay $t_d$. The output is just a delayed copy of the input — $y(t) = x(t - t_d)$ — with no shape change.

## Why Linear Phase Preserves Shape

Consider a signal with two frequency components $\omega_0$ and $\omega_1$:

$$x(t) = A_0 \cos(\omega_0 t) + A_1 \cos(\omega_1 t)$$

When this passes through a filter with $|H(\omega)| = 1$ (ideal passband) and $\angle H(\omega) = -\omega t_d$ (linear phase), the output for each component is:

$$y_0(t) = A_0 |H(\omega_0)| \cos(\omega_0 t - \omega_0 t_d) = A_0 \cos(\omega_0(t - t_d))$$

$$y_1(t) = A_1 |H(\omega_1)| \cos(\omega_1 t - \omega_1 t_d) = A_1 \cos(\omega_1(t - t_d))$$

The total output is:

$$y(t) = A_0 \cos(\omega_0(t - t_d)) + A_1 \cos(\omega_1(t - t_d))$$

[[visual:two-freq-linear-phase]]

Both components are shifted by the **same time delay** $t_d$. The sum looks identical to the original, just delayed — **no distortion**.

<details>
<summary><strong>Pause & Think</strong>: If |H(ω₀)| = |H(ω₁)| (equal magnitudes in passband) and ∠H is linear, what condition ensures zero distortion?</summary>

The two conditions together — flat magnitude AND linear phase over the passband — guarantee distortionless transmission. The flat magnitude ensures no amplitude distortion (both frequencies preserved equally), and the linear phase ensures no phase distortion (both arrive at the same time shift).

</details>

## What Happens Without Linear Phase — Constant Phase

Now let's see what goes wrong. Suppose the phase is **constant** instead of linear:

$$\angle H(\omega) = C \quad (\text{constant, independent of } \omega)$$

The output becomes:

$$y(t) = A_0 |H(\omega_0)| \cos(\omega_0 t - C) + A_1 |H(\omega_1)| \cos(\omega_1 t - C)$$

Rewriting each term:

$$y_0(t) = A_0 \cos\left[\omega_0\left(t - \frac{C}{\omega_0}\right)\right], \quad y_1(t) = A_1 \cos\left[\omega_1\left(t - \frac{C}{\omega_1}\right)\right]$$

[[visual:constant-phase-distortion]]

The time delays are **different**: $C/\omega_0$ for the first component and $C/\omega_1$ for the second. The two components arrive at the output at different times — their relative timing has changed. The resulting sum **looks different from the original** — this is **phase distortion**.

> **Watch Out**: Even though both frequencies passed with unity magnitude, the signal shape was destroyed because of the non-linear phase. This is why phase matters!

## The Complete Ideal LPF Response

With both conditions — ideal rectangular magnitude AND linear phase — the complete frequency response of an ideal low-pass filter is:

$$H(\omega) = \begin{cases} 1 \cdot e^{-j\omega t_d}, & |\omega| < B \\ 0, & \text{elsewhere} \end{cases}$$

which can be written as:

$$H(\omega) = P_{2B}(\omega) \cdot e^{-j\omega t_d}$$

[[visual:complete-ideal-lpf]]

where $P_{2B}(\omega)$ is the rectangular pulse function of width $2B$ centred at $\omega = 0$.

Over the passband:
- $|H(\omega)| = 1$ — all frequencies pass at full strength
- $\angle H(\omega) = -\omega t_d$ — linear phase, pure time delay

This is the most complete specification of the ideal LPF. It tells you not just what frequencies pass, but that they pass without any shape distortion.

[[visual:lecture-phase-diagram]]

## Visualising the Block Diagram

Think of it this way: the input signal enters the filter. Each frequency component $\omega$ gets multiplied by $|H(\omega)|$ (magnitude selection) and shifted by $-\omega t_d$ (linear phase delay). At the output, all components recombine — shifted in time by $t_d$ but otherwise preserving their relative amplitudes and phases.

[[visual:filter-block-diagram]]

<details>
<summary><strong>Pause & Think</strong>: A filter has ∠H(ω) = −2ω over its passband. What is the time delay of the output?</summary>

Comparing $\angle H(\omega) = -\omega t_d$ with $\angle H(\omega) = -2\omega$, we get $t_d = 2$ seconds. Every frequency component in the passband is delayed by exactly 2 seconds, so the output is $y(t) = x(t - 2)$.

</details>

## Summary

- The **magnitude response** $|H(\omega)|$ determines which frequencies pass — but the **phase response** $\angle H(\omega)$ determines whether the signal shape is preserved
- **Linear phase** $\angle H(\omega) = -\omega t_d$ produces a pure time delay with no distortion
- **Non-linear phase** (e.g., constant phase) causes different frequency components to arrive at different times → phase distortion
- The complete ideal LPF: $H(\omega) = P_{2B}(\omega) \cdot e^{-j\omega t_d}$ combines rectangular magnitude with linear phase
- Both conditions (flat magnitude + linear phase) are needed for truly distortionless filtering

> Next, we'll discover something surprising: this ideal filter, despite its mathematical elegance, is physically impossible to build.
