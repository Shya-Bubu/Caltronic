# Continuous-Time Fourier Transform

> **Why This Matters**: The Fourier Transform extends frequency analysis to ALL signals—not just periodic ones. It's the gateway to understanding filtering, modulation, and the complete frequency content of real-world signals.

---

## From Fourier Series to Fourier Transform

Fourier series works for periodic signals. But what about aperiodic signals?

[[visual:series-to-transform]]

**Key insight**: Think of an aperiodic signal as periodic with $T \to \infty$:
- Harmonics $k\omega_0$ become continuous: $k\omega_0 \to \omega$
- Coefficients $c_k$ become spectral density: $c_k \to X(\omega)/2\pi$
- Summation becomes integration

---

## The Transform Pair

### Forward Transform (Analysis)
$$X(\omega) = \int_{-\infty}^{\infty} x(t) e^{-j\omega t} dt$$

### Inverse Transform (Synthesis)
$$x(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} X(\omega) e^{j\omega t} d\omega$$

[[visual:transform-pair]]

**Notation**: $x(t) \leftrightarrow X(\omega)$ or $\mathcal{F}\{x\} = X$

---

## Essential Transform Pairs

[[visual:transform-pairs-table]]

| Signal $x(t)$ | Transform $X(\omega)$ |
|--------------|---------------------|
| $\delta(t)$ | $1$ |
| $1$ | $2\pi\delta(\omega)$ |
| $e^{-at}u(t)$, $a>0$ | $\frac{1}{a + j\omega}$ |
| $e^{-a|t|}$ | $\frac{2a}{a^2 + \omega^2}$ |
| $\text{rect}(t/\tau)$ | $\tau \cdot \text{sinc}(\omega\tau/2\pi)$ |
| $\text{sinc}(Wt/\pi)$ | $\frac{\pi}{W}\text{rect}(\omega/2W)$ |

---

## Interpreting the Spectrum

$X(\omega)$ is generally complex:
- $|X(\omega)|$ = **magnitude spectrum** (amplitude at each frequency)
- $\angle X(\omega)$ = **phase spectrum** (phase shift at each frequency)

[[visual:magnitude-phase-spectrum]]

<details>
<summary>🧠 <strong>Pause & Think</strong>: What does the phase spectrum tell us?</summary>

Phase determines the TIME ALIGNMENT of frequency components. Two signals can have the same magnitude spectrum but very different appearance if their phases differ.

Example: A shifted pulse has the same $|X(\omega)|$ but different $\angle X(\omega)$.
</details>

---

## The Convolution Theorem

The most powerful result for LTI systems:

$$x(t) * h(t) \leftrightarrow X(\omega) \cdot H(\omega)$$

[[visual:convolution-theorem]]

**Convolution in time = Multiplication in frequency!**

This transforms difficult convolution integrals into simple multiplication.

---

## Summary

| Concept | Formula |
|---------|---------|
| Forward FT | $X(\omega) = \int x(t)e^{-j\omega t}dt$ |
| Inverse FT | $x(t) = \frac{1}{2\pi}\int X(\omega)e^{j\omega t}d\omega$ |
| Convolution | $x*h \leftrightarrow XH$ |
| Magnitude | $|X(\omega)|$ = amplitude spectrum |
| Phase | $\angle X(\omega)$ = phase spectrum |

