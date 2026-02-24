## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- The EFS analysis and synthesis equations
- Complex conjugate: $(a + jb)^* = a - jb$, and $|z^*| = |z|$, $\angle z^* = -\angle z$
- Even function: $x(t) = x(-t)$; Odd function: $x(t) = -x(-t)$
- Time reversal property: $x(-t) \xleftrightarrow{} X_{-k}$
- The square pulse FS from the previous concept: all real because the pulse is centred (even)

</details>

---

## Why Symmetry Matters

Not every periodic signal has arbitrary complex FS coefficients. Signals with special symmetries — **real**, **even**, **odd**, or combinations thereof — impose powerful constraints on $X_k$ that drastically reduce both the computation and the complexity of the result.

Here's what symmetry gives you:

1. **Half the work**: You only compute $X_k$ for $k \geq 0$ and fill in $k < 0$ by symmetry
2. **Predictable form**: You know *before computing* whether $X_k$ will be real, imaginary, or complex
3. **Built-in error check**: If your result violates the symmetry constraints, you know immediately that something went wrong

> **Why This Matters**: In exams, recognising symmetry before you start computing is like seeing the answer key before the test. It tells you what the result *should* look like, which makes computation faster and verification effortless.

---

## Conjugate Symmetry: The Foundation (Real Signals)

This is the most fundamental symmetry property. If $x(t)$ is **real** (which covers almost all physical signals), then:

$$\boxed{X_{-k} = X_k^*}$$

This is called **conjugate symmetry** (or Hermitian symmetry).

[[visual:conjugate-symmetry-diagram]]

### What This Implies

Conjugate symmetry has four immediate consequences:

| Quantity | Property | Visual meaning |
|----------|----------|---------------|
| Magnitude: $|X_{-k}|$ | $= |X_k|$ | Magnitude spectrum is **even** (mirror symmetric) |
| Phase: $\angle X_{-k}$ | $= -\angle X_k$ | Phase spectrum is **odd** (anti-symmetric) |
| Real part: $\text{Re}(X_{-k})$ | $= \text{Re}(X_k)$ | Real part is even |
| Imaginary part: $\text{Im}(X_{-k})$ | $= -\text{Im}(X_k)$ | Imaginary part is odd |

### Why?

For real $x(t)$, take the complex conjugate of the analysis equation:

$$X_k^* = \left(\frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt\right)^* = \frac{1}{T_0}\int_{T_0} x(t)^*\,e^{+jk\omega_0 t}\,dt$$

Since $x(t)$ is real, $x(t)^* = x(t)$, and the integral becomes:

$$X_k^* = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-j(-k)\omega_0 t}\,dt = X_{-k}$$

[[visual:mag-phase-real-signal]]

### Practical Significance

You only need to compute $X_k$ for $k \geq 0$. The negative-$k$ coefficients come free: $X_{-1} = X_1^*$, $X_{-2} = X_2^*$, and so on. This halves your work immediately.

<details>
<summary><strong>Pause & Think</strong>: You compute X₃ = 2 − j for some real signal. What is X_{−3}?</summary>

By conjugate symmetry: $X_{-3} = X_3^* = 2 + j$. The real part stays the same, the imaginary part flips sign. Also: $|X_{-3}| = |X_3| = \sqrt{5}$, and $\angle X_{-3} = -\angle X_3$.

</details>

---

## Real and Even Signals

Now suppose $x(t)$ is **both real and even**: $x(t) = x(-t)$. What extra constraint does this add?

[[visual:even-signal-waveform]]

We combine two facts:

1. **Real signal**: $X_{-k} = X_k^*$
2. **Even signal**: From the time reversal property, $x(-t) = x(t)$ implies $X_{-k} = X_k$

Together: $X_k^* = X_k$, which means the imaginary part of $X_k$ is zero.

$$\boxed{\text{Real + Even} \implies X_k \text{ is purely real and even}: X_k = X_{-k} \in \mathbb{R}}$$

[[visual:real-even-spectrum]]

### Classic Example

The centred square pulse train (from the previous concept) is real and even. Its coefficients $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$ are indeed all real numbers — positive, negative, or zero, but never complex. No phase plot is needed because every phase is either 0 (for positive $X_k$) or $\pi$ (for negative $X_k$).

### Simplified Integration

Because the signal is even, the complex exponential in the analysis integral can be replaced by a cosine:

$$X_k = \frac{2}{T_0}\int_0^{T_0/2} x(t)\,\cos(k\omega_0 t)\,dt$$

You integrate over only **half** a period with a real integrand. No complex arithmetic at all!

---

## Real and Odd Signals

Now suppose $x(t)$ is **real and odd**: $x(t) = -x(-t)$.

[[visual:odd-signal-waveform]]

Combining facts:

1. **Real signal**: $X_{-k} = X_k^*$
2. **Odd signal**: $x(-t) = -x(t)$ implies $X_{-k} = -X_k$

Together: $X_k^* = -X_k$, which means the real part is zero.

$$\boxed{\text{Real + Odd} \implies X_k \text{ is purely imaginary and odd}: X_k = -X_{-k}, \quad X_0 = 0}$$

[[visual:real-odd-spectrum]]

### Why $X_0 = 0$?

$X_0$ is the average value of $x(t)$. For an odd signal, positive and negative lobes cancel perfectly over any symmetric interval, so the average is always zero. This is a quick sanity check.

### Simplified Integration

For odd signals:

$$X_k = \frac{-j \cdot 2}{T_0}\int_0^{T_0/2} x(t)\,\sin(k\omega_0 t)\,dt$$

Again, half-period integration with a real integrand — the result is multiplied by $-j$ to make it purely imaginary.

[[visual:half-integration-diagram]]

<details>
<summary><strong>Pause & Think</strong>: A sawtooth wave is real and odd. Without computing anything, what can you predict about its FS coefficients?</summary>

They must be: (1) purely imaginary (no real part), (2) anti-symmetric ($X_k = -X_{-k}$), and (3) $X_0 = 0$. When you do the computation, you'll find $X_k = j/(k\pi)$ for a standard sawtooth — exactly matching these predictions.

</details>

---

## Complete Symmetry Table

[[visual:symmetry-table-diagram]]

| Signal property | Constraint on $X_k$ |
|----------------|---------------------|
| **Real** | $X_{-k} = X_k^*$ (conjugate symmetric) |
| **Real & Even** | $X_k$ is real and even: $X_k = X_{-k} \in \mathbb{R}$ |
| **Real & Odd** | $X_k$ is purely imaginary and odd: $X_k = -X_{-k}$, $X_0 = 0$ |
| **Purely Imaginary** | $X_{-k} = -X_k^*$ (anti-Hermitian) |
| **Even (general)** | $X_k = X_{-k}$ (coefficients are even) |
| **Odd (general)** | $X_k = -X_{-k}$, $X_0 = 0$ |

> **Key Insight**: The constraints are additive. "Real" gives you one constraint. Adding "even" or "odd" gives a second, stronger constraint. Each one eliminates more free parameters from the problem.

---

## Even–Odd Decomposition

What if your signal is real but neither purely even nor purely odd? Every real signal can be decomposed:

$$x(t) = \underbrace{\frac{x(t) + x(-t)}{2}}_{x_e(t) \text{ (even part)}} + \underbrace{\frac{x(t) - x(-t)}{2}}_{x_o(t) \text{ (odd part)}}$$

[[visual:even-odd-decomposition]]

This decomposition is incredibly useful because:
- The even part $x_e(t)$ produces **real** FS coefficients
- The odd part $x_o(t)$ produces **imaginary** FS coefficients
- The full $X_k = \underbrace{\text{Re}(X_k)}_{\text{from } x_e(t)} + j\underbrace{\text{Im}(X_k)}_{\text{from } x_o(t)}$

So the real part of each coefficient comes *only* from the even part of the signal, and the imaginary part comes *only* from the odd part.

---

## Using Symmetry as a Verification Tool

Here's a practical workflow you should always follow after computing FS coefficients:

1. **Is $x(t)$ real?** → Check that $X_{-k} = X_k^*$. If not, you have an error.
2. **Is $x(t)$ even?** → $X_k$ should be real. If you see imaginary parts, re-check.
3. **Is $x(t)$ odd?** → $X_k$ should be purely imaginary with $X_0 = 0$.
4. **Check $X_0$ independently**: It should equal the average value of $x(t)$ over one period. This is the easiest coefficient to verify.

> **You're doing great** — symmetry might seem abstract now, but once you start using it on problems, you'll find it's like having a cheat code. It tells you what the answer *should* look like before you even begin.

[[visual:symmetry-explorer-sim]]

Explore the interactive above — toggle symmetry properties on and off and watch the constraints appear in the spectrum.

---

## Application: Simplifying Integration

[[visual:half-integration-diagram]]

Using symmetry doesn't just tell you the form of $X_k$ — it actually simplifies the *integration* itself:

| Signal symmetry | Integration formula | Simplification |
|----------------|-------------------|----------------|
| Real + Even | $X_k = \frac{2}{T_0}\int_0^{T_0/2} x(t)\cos(k\omega_0 t)\,dt$ | Half-period, real cosine kernel |
| Real + Odd | $X_k = \frac{-2j}{T_0}\int_0^{T_0/2} x(t)\sin(k\omega_0 t)\,dt$ | Half-period, real sine kernel |
| General real | Full integral: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$ | No simplification |

The even and odd formulas avoid complex arithmetic entirely — a major practical advantage, especially under exam time pressure.

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Assuming all real signals have real $X_k$ | Only **real + even** signals have purely real $X_k$. General real signals have complex $X_k$ satisfying conjugate symmetry |
| Forgetting $X_0 = 0$ for odd signals | The average of an odd function is always zero |
| Confusing "even $X_k$" with "real $X_k$" | Even means $X_k = X_{-k}$; real means $\text{Im}(X_k) = 0$. For real even signals, both hold |
| Not using symmetry to simplify integration | Always check symmetry first — it can halve your computation |
| Assuming shifted pulses are still even | $x(t - t_0)$ is only even if $t_0 = 0$. A shifted pulse is generally neither even nor odd |

---

## Summary

- **Conjugate symmetry** ($X_{-k} = X_k^*$) holds for all real signals. Magnitude is even, phase is odd.
- **Real + Even** signals have purely real, even coefficients — no imaginary part. Use cosine kernel for half-period integration.
- **Real + Odd** signals have purely imaginary, odd coefficients with $X_0 = 0$. Use sine kernel for half-period integration.
- **Any real signal** decomposes into even + odd parts, and the FS coefficients split accordingly: real from even part, imaginary from odd part.
- Use symmetry as a **verification tool**: check your computed $X_k$ against the expected symmetry before submitting your answer.

This wraps up Lesson 04 — Fourier Series Part I. In the next lesson, we'll explore differentiation/integration properties, Parseval's theorem, and how LTI systems interact with the FS.
