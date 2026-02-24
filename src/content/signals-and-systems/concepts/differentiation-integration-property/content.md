## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From Lesson 04:
- **EFS pair**: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$ and $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$
- **FS properties**: linearity, time shifting, time reversal, time scaling
- **Symmetry**: real signals have conjugate symmetric $X_k$
- **Square pulse FS**: $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$

</details>

---

## The Big Question

You already know how to find Fourier coefficients using the analysis integral, and how to modify them using properties like time shift and reversal. But what happens to the spectrum when you **differentiate** or **integrate** a periodic signal?

This question is more than academic. Differentiation and integration are the most fundamental operations in circuit analysis and signal processing. Capacitors integrate current to produce voltage. Inductors differentiate flux. Filters smoothe (integrate) or sharpen (differentiate) signals. Understanding how these operations transform the spectrum is essential for connecting time-domain behaviour to frequency-domain design.

> **Why This Matters**: The differentiation and integration properties reveal that these operations are *frequency-selective filters*. Differentiation is a highpass filter; integration is a lowpass filter. Once you see this, you'll understand why smooth signals have fast-decaying spectra and why sharp edges need high-frequency content.

---

## The Differentiation Property

### Statement

If $x(t) \xleftrightarrow{} X_k$, then:

$$\boxed{\frac{d}{dt}x(t) \xleftrightarrow{} jk\omega_0\,X_k}$$

Differentiating in time corresponds to multiplying each FS coefficient by $jk\omega_0$.

### Derivation

Start from the synthesis equation and differentiate both sides:

$$\frac{d}{dt}x(t) = \frac{d}{dt}\sum_{k=-\infty}^{\infty} X_k\,e^{jk\omega_0 t} = \sum_{k=-\infty}^{\infty} X_k \cdot jk\omega_0\,e^{jk\omega_0 t}$$

Reading off the new coefficients: $X_k' = jk\omega_0\,X_k$. The derivation is one step — the derivative of $e^{jk\omega_0 t}$ brings down $jk\omega_0$ as a factor.

[[visual:diff-int-block-diagram]]

### What Does Multiplication by $jk\omega_0$ Mean?

Let's unpack the factor $jk\omega_0$ into its two effects:

1. **The $k$ factor (magnitude)**: The $k$-th harmonic is multiplied by $|k|$. This means:
   - The fundamental ($k = 1$) is unchanged in magnitude
   - The 3rd harmonic is amplified 3×
   - The 10th harmonic is amplified 10×
   - Higher harmonics are amplified *more* — this is **highpass filtering**

2. **The $j$ factor (phase)**: Each coefficient is multiplied by $j = e^{j\pi/2}$, adding $+90°$ to the phase. This converts sines to cosines and vice versa.

[[visual:highpass-lowpass-bars]]

> **Key Insight**: Differentiation is a *highpass filter* because it amplifies high-frequency components relative to low-frequency ones. That's why derivatives of smooth signals look jagged — the small high-frequency ripples get magnified.

---

## The Integration Property

### Statement

If $x(t) \xleftrightarrow{} X_k$, then for $k \neq 0$:

$$\boxed{\int x(t)\,dt \xleftrightarrow{} \frac{X_k}{jk\omega_0}}$$

Integrating in time divides each coefficient by $jk\omega_0$.

> **Watch Out**: The $k = 0$ case needs special treatment. Integration can add an arbitrary constant (the "$+C$" from calculus), and the DC component of the integral depends on the initial conditions. In most FS problems, the $k = 0$ term is handled separately or the integral is defined to have zero mean.

### What Does Division by $jk\omega_0$ Mean?

The inverse of the differentiation effect:

1. **The $1/k$ factor (magnitude)**: The $k$-th harmonic is divided by $|k|$:
   - The fundamental is unchanged
   - The 3rd harmonic is attenuated to $1/3$ of its original value
   - The 10th harmonic is attenuated to $1/10$
   - Higher harmonics are suppressed *more* — this is **lowpass filtering**

2. **The $1/j = -j$ factor (phase)**: Adds $-90°$ to the phase of each coefficient.

[[visual:spectrum-sharpening]]

[[visual:spectrum-smoothing]]

---

## Physical Interpretation: Sharpening vs Smoothing

This is where the property becomes truly illuminating. Let's connect the math to what you see in the time domain.

### Differentiation Sharpens

A signal with many significant high harmonics has sharp features — edges, corners, spikes. Differentiation *amplifies* these high harmonics, making the output even sharper. That's why:
- The derivative of a smooth sine wave is another smooth wave (cosine)
- The derivative of a ramp (sawtooth) produces impulses at the discontinuities

[[visual:sawtooth-original]]

[[visual:differentiation-time-domain]]

### Integration Smooths

Integration does the opposite — it suppresses high harmonics, rounding off sharp features. That's why:
- The integral of a square wave is a triangular wave (sharp edges become smooth ramps)
- The integral of an impulse train is a step function (sharp spikes become flat levels)

[[visual:integration-smoothing-demo]]

<details>
<summary><strong>Pause & Think</strong>: Why does a square wave have 1/k coefficient decay, but a triangular wave has 1/k² decay?</summary>

The triangular wave is the *integral* of a square wave. Integration divides each coefficient by $jk\omega_0$, adding an extra factor of $1/k$ to the decay. So $1/k$ (square wave) becomes $1/k \times 1/k = 1/k^2$ (triangular wave). Smoother signals have faster-decaying coefficients — this is a universal principle.

</details>

---

## The Smoothness–Decay Connection

This property reveals one of the deepest relationships in Fourier analysis:

$$\text{Smoother signal} \iff \text{Faster decay of } |X_k|$$

Here's the precise chain:

| Signal type | Smoothness | Coefficient decay | Why? |
|-------------|-----------|-------------------|------|
| Impulse train | Maximally discontinuous | No decay ($|X_k|$ = const) | Needs all harmonics equally |
| Square wave | Jump discontinuities | $1/k$ | Integrating impulse train once |
| Triangular wave | Continuous, corners | $1/k^2$ | Integrating square wave |
| Smooth (no corners) | Differentiable | $1/k^3$ or faster | Integrating again |

Each integration adds a factor of $1/k$ to the decay rate. Each differentiation removes one.

[[visual:diff-int-explorer]]

---

## Phase Effects

Don't forget the phase! The factor $j = e^{j\pi/2}$ in the differentiation property means every coefficient gets a $+90°$ phase shift. The factor $1/j = e^{-j\pi/2}$ in the integration property gives $-90°$.

[[visual:phase-shift-diagram]]

For real signals, this phase rotation converts:
- $\sin \to \cos$ (differentiation)
- $\cos \to -\sin$ (differentiation)
- $\sin \to -\cos$ (integration)
- $\cos \to \sin$ (integration)

This is consistent with what you know from calculus: $\frac{d}{dt}\sin(t) = \cos(t)$, $\frac{d}{dt}\cos(t) = -\sin(t)$.

---

## Worked Example

**Given**: Square pulse train with $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$.

**Find**: FS of its derivative $x'(t)$.

**Solution**: Apply the differentiation property:

$$X_k' = jk\omega_0 \cdot \frac{\sin(k\omega_0 T_1)}{k\pi} = \frac{j\omega_0 \sin(k\omega_0 T_1)}{\pi}$$

Notice that the $k$ in $jk\omega_0$ cancels the $k$ in the denominator $k\pi$! The derivative coefficients no longer decay with $k$ — they oscillate but stay bounded. This makes physical sense: the derivative of a square wave has impulses (infinite peaks), which need non-decaying harmonics to represent.

<details>
<summary><strong>Pause & Think</strong>: If you integrate the square pulse train instead, how fast do the resulting coefficients decay?</summary>

Integration gives $X_k^{\text{int}} = X_k/(jk\omega_0) = \frac{\sin(k\omega_0 T_1)}{jk^2\pi\omega_0}$. The decay is now $1/k^2$ — one power faster than the original $1/k$. The integral of a square wave is a triangular wave, which is continuous (no jumps), consistent with the faster decay.

</details>

---

## Repeated Application

You can apply these properties repeatedly:

| Operation | FS coefficient | Physical effect |
|-----------|---------------|-----------------|
| $x(t)$ | $X_k$ | Original signal |
| $x'(t)$ | $jk\omega_0\,X_k$ | Sharpened |
| $x''(t)$ | $(jk\omega_0)^2 X_k = -k^2\omega_0^2\,X_k$ | Further sharpened |
| $\int x(t)\,dt$ | $X_k/(jk\omega_0)$ | Smoothed |
| $\int\int x(t)\,dt^2$ | $X_k/(jk\omega_0)^2 = -X_k/(k^2\omega_0^2)$ | Further smoothed |

Each differentiation adds a power of $k$ to the numerator; each integration adds a power of $k$ to the denominator.

[[visual:decay-rate-comparison]]

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Forgetting the $j$ in $jk\omega_0$ | Differentiation multiplies by $jk\omega_0$, not $k\omega_0$ — the $j$ adds a 90° phase shift |
| Applying integration to $k = 0$ without care | $X_0/(j \cdot 0 \cdot \omega_0) = X_0/0$ — undefined! The DC component of the integral must be handled separately |
| Thinking differentiation always increases signal energy | It amplifies high harmonics but the total energy depends on the specific spectrum |
| Confusing decay rate with convergence speed | Faster decay means fewer harmonics are needed, but the Gibbs phenomenon still applies at discontinuities |

---

## Summary

- **Differentiation property**: $x'(t) \xleftrightarrow{} jk\omega_0\,X_k$ — multiplies by $jk\omega_0$, a **highpass filter** that amplifies high harmonics and adds +90° phase.
- **Integration property**: $\int x(t)\,dt \xleftrightarrow{} X_k/(jk\omega_0)$ — divides by $jk\omega_0$, a **lowpass filter** that attenuates high harmonics and adds −90° phase.
- **Smoothness–decay connection**: each integration adds $1/k$ to the coefficient decay rate. Smoother signals have faster-decaying spectra.
- The $k = 0$ term requires special handling for integration.
- These properties are the mathematical foundation of filtering, which you'll explore further when we study LTI systems and the FS.
