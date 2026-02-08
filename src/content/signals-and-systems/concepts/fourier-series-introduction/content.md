# Fourier Series Introduction

> **Why This Matters**: The Fourier series reveals that ANY periodic signal is secretly a sum of simple sinusoids. This transforms complex time-domain problems into simple frequency-domain arithmetic.

---

## The Big Idea

Every periodic signal can be decomposed into a sum of sinusoids at harmonically related frequencies:

[[visual:fourier-decomposition]]

$$x(t) = \text{DC} + \text{fundamental} + \text{harmonics}$$

**Fundamental frequency**: $f_0 = 1/T$ (or $\omega_0 = 2\pi/T$)
**Harmonics**: $2f_0, 3f_0, 4f_0, \ldots$

---

## Why Sinusoids?

Sinusoids are special because they are **eigenfunctions of LTI systems**:

$$e^{j\omega t} \to \boxed{\text{LTI}} \to H(\omega) \cdot e^{j\omega t}$$

[[visual:eigenfunction-property]]

Input a sinusoid, get the SAME sinusoid back (just scaled and phase-shifted). This makes frequency-domain analysis incredibly powerful!

---

## Mathematical Form

### Exponential Fourier Series

$$x(t) = \sum_{k=-\infty}^{\infty} c_k e^{jk\omega_0 t}$$

where $c_k$ are the **Fourier coefficients**.

[[visual:exponential-series]]

### Trigonometric Form

$$x(t) = a_0 + \sum_{n=1}^{\infty} [a_n \cos(n\omega_0 t) + b_n \sin(n\omega_0 t)]$$

<details>
<summary>🧠 <strong>Pause & Think</strong>: How are exponential and trig forms related?</summary>

Using Euler's formula: $e^{j\theta} = \cos\theta + j\sin\theta$

$c_k e^{jk\omega_0 t} + c_{-k} e^{-jk\omega_0 t}$ can be expressed as cosine and sine terms.

For real signals: $c_{-k} = c_k^*$ (complex conjugate)
</details>

---

## Physical Interpretation

[[visual:spectrum-visualization]]

The Fourier series gives us a **spectrum**—a picture of how much of each frequency is present:

| Coefficient | Meaning |
|------------|---------|
| $c_0$ | DC (average value) |
| $c_1, c_{-1}$ | Fundamental frequency content |
| $c_2, c_{-2}$ | Second harmonic |
| $|c_k|$ | Amplitude of k-th harmonic |
| $\angle c_k$ | Phase of k-th harmonic |

---

## Example: Square Wave

A square wave is one of the most important examples:

[[visual:square-wave-fourier]]

$$x(t) = \frac{4}{\pi}\left[\sin(\omega_0 t) + \frac{1}{3}\sin(3\omega_0 t) + \frac{1}{5}\sin(5\omega_0 t) + \ldots\right]$$

Only ODD harmonics! This reveals the signal's symmetry.

---

## Summary

| Concept | Description |
|---------|-------------|
| Fourier Series | Decomposes periodic signals into sinusoids |
| Fundamental freq | $\omega_0 = 2\pi/T$ |
| Harmonics | Integer multiples of $\omega_0$ |
| $c_k$ | Complex coefficients giving amplitude and phase |
| Spectrum | Plot of $|c_k|$ vs frequency |
