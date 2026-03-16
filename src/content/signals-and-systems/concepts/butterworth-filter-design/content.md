# Butterworth Filter Design

> **Why This Matters**: Among all practical filter designs, the **Butterworth filter** holds a special status — it achieves the **flattest possible passband** for a given filter order. It's the "default" filter in engineering: whenever you need a smooth, well-behaved low-pass filter without ripple, Butterworth is your first choice. Understanding its derivation, pole placement, and frequency scaling gives you a complete design workflow.

## Starting Point: The Two-Pole System

Recall the standard second-order transfer function:

$$H(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

where $\omega_n$ is the natural frequency and $\zeta$ is the damping ratio. This system's behaviour as a filter depends critically on $\zeta$.

[[visual:two-pole-system-bode]]

### Effect of Damping Ratio on Filter Behaviour

Your lecture notes present a key observation:
- For $\zeta \geq 1/\sqrt{2}$: the system behaves as a **low-pass filter** — the magnitude decreases monotonically
- For $0 < \zeta < 1$: the system shows a **resonance peak** near $\omega_n$, behaving more like a band-pass filter

The transition between these behaviours happens at the critical value $\zeta = 1/\sqrt{2}$.

[[visual:damping-ratio-comparison]]

> **Key Insight**: The choice $\zeta = 1/\sqrt{2} \approx 0.707$ is not arbitrary — it's the exact value that makes the passband **maximally flat**. This is the Butterworth condition.

## The Butterworth Condition: $\zeta = 1/\sqrt{2}$

When $\zeta = 1/\sqrt{2}$, the passband is **maximally flat** — meaning the variation of $|H(\omega)|$ across the passband is minimised. The transfer function becomes:

$$H_B(s) = \frac{\omega_n^2}{s^2 + \sqrt{2}\,\omega_n s + \omega_n^2}$$

Note how $2\zeta\omega_n = 2 \times \frac{1}{\sqrt{2}} \times \omega_n = \sqrt{2}\,\omega_n$.

[[visual:butterworth-transfer-function]]

## Pole Locations

The poles of $H_B(s)$ are found by setting the denominator to zero:

$$s^2 + \sqrt{2}\,\omega_n s + \omega_n^2 = 0$$

$$s = \frac{-\sqrt{2}\,\omega_n \pm \sqrt{2\omega_n^2 - 4\omega_n^2}}{2} = \frac{-\sqrt{2}\,\omega_n \pm j\sqrt{2}\,\omega_n}{2}$$

$$\boxed{s = -\frac{\omega_n}{\sqrt{2}} \pm j\frac{\omega_n}{\sqrt{2}}}$$

[[visual:butterworth-poles-s-plane]]

The two poles lie at $45°$ angles from the negative real axis, on a circle of radius $\omega_n$ in the left half-plane. This $45°$ placement is the geometric signature of the 2nd-order Butterworth filter.

## Deriving the Magnitude Response

Substituting $s = j\omega$ into $H_B(s)$:

$$H_B(j\omega) = \frac{\omega_n^2}{-\omega^2 + j\sqrt{2}\,\omega_n\omega + \omega_n^2} = \frac{\omega_n^2}{(\omega_n^2 - \omega^2) + j\sqrt{2}\,\omega_n\omega}$$

The magnitude is:

$$|H_B(\omega)| = \frac{\omega_n^2}{\sqrt{(\omega_n^2 - \omega^2)^2 + 2\omega_n^2\omega^2}}$$

Let's simplify the denominator. Expanding:

$$(\omega_n^2 - \omega^2)^2 + 2\omega_n^2\omega^2 = \omega_n^4 - 2\omega_n^2\omega^2 + \omega^4 + 2\omega_n^2\omega^2 = \omega_n^4 + \omega^4$$

This beautifully collapses to:

$$|H_B(\omega)| = \frac{\omega_n^2}{\sqrt{\omega_n^4 + \omega^4}} = \frac{1}{\sqrt{1 + \left(\frac{\omega}{\omega_n}\right)^4}}$$

$$\boxed{|H_B(\omega)| = \frac{1}{\sqrt{1 + \left(\frac{\omega}{\omega_n}\right)^4}}}$$

[[visual:butterworth-magnitude-derivation]]

<details>
<summary><strong>Pause & Think</strong>: What is |H_B(ωn)|? Verify the 3 dB point.</summary>

At $\omega = \omega_n$: $|H_B(\omega_n)| = 1/\sqrt{1 + 1} = 1/\sqrt{2} \approx 0.707$. This is exactly the 3 dB point! So $\omega_n$ is the 3 dB cutoff frequency for the Butterworth filter. The design is perfectly calibrated.

</details>

## Phase Response

The phase of the Butterworth filter is:

$$\angle H_B(\omega) = -\arctan\left(\frac{\sqrt{2}\,\omega_n\omega}{\omega_n^2 - \omega^2}\right)$$

[[visual:butterworth-magnitude-phase-plot]]

At $\omega = 0$: phase = $0°$. At $\omega = \omega_n$: phase = $-90°$. At $\omega \to \infty$: phase → $-180°$.

## Comparison: 1-Pole, 2-Pole, and Butterworth

Your lecture notes compare three filters:
- **1-pole** (first order): $H(s) = 2/(s+2)$, gentle 20 dB/decade rolloff
- **2-pole, $\zeta = 1$** (critically damped): monotonic but not maximally flat
- **2-pole, $\zeta = 1/\sqrt{2}$** (Butterworth): maximally flat passband, 40 dB/decade rolloff

[[visual:lecture-comparison-plot]]

The Butterworth filter gives the flattest passband AND a steeper rolloff than first-order — making it the ideal compromise.

## N-Pole Butterworth Filter

The beauty of the Butterworth design extends to any order $N$. The general $N$th-order Butterworth magnitude response is:

$$\boxed{|H_B(\omega)| = \frac{1}{\sqrt{1 + \left(\frac{\omega}{\omega_n}\right)^{2N}}}}$$

[[visual:n-pole-magnitude-comparison]]

As $N$ increases:
- The passband becomes flatter
- The transition becomes sharper (steeper rolloff)
- The response more closely approximates the ideal rectangular shape
- But the filter becomes more complex (more components)

### Pole Placement for N-Pole Butterworth

All $N$ poles lie on a **semicircle** of radius $\omega_c$ in the **open left half-plane**, symmetrically placed about the negative real axis.

[[visual:lecture-pole-placement]]

**Key rules:**
- Poles are evenly spaced by $180°/N$ around the semicircle
- If $N$ is **odd**, one pole sits on the negative real axis
- If $N$ is **even**, all poles come in complex conjugate pairs
- The angle between adjacent poles is always $180°/N$

The transfer function is constructed from these poles:

$$H_B(s) = \frac{(-1)^N s_1 s_2 \cdots s_N}{(s - s_1)(s - s_2) \cdots (s - s_N)}$$

## Standard Butterworth Transfer Functions

For the normalised case ($\omega_c = 1$ rad/s):

[[visual:standard-butterworth-table]]

| Order $N$ | $H_B(s)$ | Poles |
|-----------|----------|-------|
| 1 | $\frac{1}{s + 1}$ | $s = -1$ |
| 2 | $\frac{1}{s^2 + \sqrt{2}\,s + 1}$ | $s = -\frac{1}{\sqrt{2}} \pm j\frac{1}{\sqrt{2}}$ |
| 3 | $\frac{1}{s^3 + 2s^2 + 2s + 1}$ | $s = -1, \; -\frac{1}{2} \pm j\frac{\sqrt{3}}{2}$ |
| 4 | $\frac{1}{s^4 + 2.613s^3 + 3.414s^2 + 2.613s + 1}$ | Two complex pairs |

<details>
<summary><strong>Pause & Think</strong>: For N = 2 Butterworth with ωc = 1 rad/s, verify |H_B(1)| = 1/√2.</summary>

$|H_B(j1)| = 1/\sqrt{1 + 1^4} = 1/\sqrt{2}$. ✓ The 3 dB point is at exactly $\omega = \omega_c = 1$ rad/s, confirming the normalised design.

</details>

## Frequency Scaling

The standard Butterworth tables above are all for $\omega_c = 1$ rad/s. To design a filter with any desired cutoff frequency $\omega_c$, use **frequency scaling**:

$$\text{Replace } s \text{ with } \frac{s}{\omega_c} \quad \text{(or equivalently, } \omega \text{ with } \frac{\omega}{\omega_c}\text{)}$$

[[visual:frequency-scaling-example]]

**Example:** For a 2nd-order Butterworth with $\omega_c = 1000$ rad/s:

$$H_B(s) = \frac{1}{\left(\frac{s}{1000}\right)^2 + \sqrt{2}\left(\frac{s}{1000}\right) + 1} = \frac{10^6}{s^2 + 1414s + 10^6}$$

And the magnitude response becomes:

$$|H_B(\omega)| = \frac{1}{\sqrt{1 + \left(\frac{\omega}{1000}\right)^4}}$$

The 3 dB point is now at $\omega = 1000$ rad/s instead of 1 rad/s.

[[visual:lecture-scaling-page]]

<details>
<summary><strong>Pause & Think</strong>: For a 3rd-order Butterworth with cutoff at 2π×1000 rad/s (1 kHz), what substitution do you make in the normalised H₃(s)?</summary>

Replace $s$ with $s/(2\pi \times 1000)$ in $H_3(s) = 1/(s^3 + 2s^2 + 2s + 1)$. This scales all pole locations by the factor $\omega_c = 2\pi \times 1000 \approx 6283$ rad/s, placing the 3 dB point at exactly 1 kHz.

</details>

## Summary

- A two-pole system with $\zeta = 1/\sqrt{2}$ gives the **Butterworth filter** — maximally flat passband
- The transfer function is $H_B(s) = \omega_n^2/(s^2 + \sqrt{2}\omega_n s + \omega_n^2)$
- The magnitude response is $|H_B(\omega)| = 1/\sqrt{1 + (\omega/\omega_n)^{2N}}$ for $N$th-order
- The 3 dB point occurs exactly at $\omega = \omega_n$
- All $N$ poles lie on a semicircle of radius $\omega_c$ in the left half-plane, spaced $180°/N$ apart
- **Frequency scaling**: substitute $s/\omega_c$ for $s$ to shift the cutoff from 1 rad/s to $\omega_c$
- Standard normalised transfer functions ($H_1$ through $H_4$) are available in tables

> The Butterworth filter is your gateway to practical analog filter design. Its maximally-flat philosophy makes it the natural first choice whenever passband flatness is the priority.
