## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **The EFS pair**: analysis and synthesis equations using complex exponentials
- **Euler's formula**: $e^{j\theta} = \cos\theta + j\sin\theta$
- **Conjugate symmetry**: for real signals, $X_{-k} = X_k^*$
- **Symmetry properties**: even signals have real $X_k$; odd signals have imaginary $X_k$
- The FS coefficients of the square pulse train

</details>

---

## Why a Second Form?

Up to now, we've worked exclusively with the **Exponential Fourier Series (EFS)**, which uses complex exponentials $e^{jk\omega_0 t}$ as basis functions. It's mathematically elegant and compact.

But there's a problem: when you sit in a lab and measure a signal on an oscilloscope, you see real voltages — cosines and sines — not complex exponentials rotating in the complex plane. The **Trigonometric Fourier Series (TFS)** re-expresses the same decomposition using cosines and sines, which are the "real" oscillations you see and hear.

> **Why This Matters**: The TFS is what most engineering textbooks use first. It connects directly to physical oscillations: $a_k \cos(k\omega_0 t)$ is a physical oscillation you can see on a scope. Understanding both forms — and how to convert between them — gives you flexibility to use whichever is more convenient for a given problem.

---

## The Trigonometric Fourier Series

### The Formula

For a real periodic signal $x(t)$ with period $T_0$ and fundamental frequency $\omega_0 = 2\pi/T_0$:

$$\boxed{x(t) = a_0 + \sum_{k=1}^{\infty}\left[a_k\cos(k\omega_0 t) + b_k\sin(k\omega_0 t)\right]}$$

where:

$$a_0 = \frac{1}{T_0}\int_{T_0} x(t)\,dt \qquad \text{(average value)}$$

$$a_k = \frac{2}{T_0}\int_{T_0} x(t)\cos(k\omega_0 t)\,dt \qquad (k \geq 1)$$

$$b_k = \frac{2}{T_0}\int_{T_0} x(t)\sin(k\omega_0 t)\,dt \qquad (k \geq 1)$$

[[visual:efs-to-tfs-diagram]]

### Deriving from the EFS

Start with the EFS synthesis equation and group positive and negative $k$ terms:

$$x(t) = X_0 + \sum_{k=1}^{\infty}\left(X_k\,e^{jk\omega_0 t} + X_{-k}\,e^{-jk\omega_0 t}\right)$$

For real signals, $X_{-k} = X_k^*$. Writing $X_k = |X_k|e^{j\phi_k}$:

$$x(t) = X_0 + \sum_{k=1}^{\infty} 2|X_k|\cos(k\omega_0 t + \phi_k)$$

Expanding $\cos(k\omega_0 t + \phi_k) = \cos\phi_k\cos(k\omega_0 t) - \sin\phi_k\sin(k\omega_0 t)$, we get:

$$a_k = 2|X_k|\cos\phi_k = 2\text{Re}(X_k)$$
$$b_k = -2|X_k|\sin\phi_k = -2\text{Im}(X_k)$$

### Conversion Formulas

[[visual:tfs-coefficients-relation]]

| Direction | Formula |
|-----------|---------|
| EFS → TFS | $a_0 = X_0$, $a_k = 2\text{Re}(X_k)$, $b_k = -2\text{Im}(X_k)$ |
| TFS → EFS | $X_0 = a_0$, $X_k = \frac{a_k - jb_k}{2}$ for $k \geq 1$ |

These conversions are essential for moving between the two representations.

<details>
<summary><strong>Pause & Think</strong>: If X_k is purely real (even signal), what happens to b_k?</summary>

If $X_k \in \mathbb{R}$, then $\text{Im}(X_k) = 0$, so $b_k = -2\text{Im}(X_k) = 0$. All sine terms vanish — the TFS contains only cosines. This makes perfect sense: an even signal is symmetric, and cosines are symmetric. No sines (odd functions) are needed to represent an even function.

</details>

---

## Orthogonality: Why This All Works

### The Core Idea

The entire Fourier Series framework rests on one mathematical fact: **orthogonality**. The set of functions $\{1, \cos(\omega_0 t), \sin(\omega_0 t), \cos(2\omega_0 t), \sin(2\omega_0 t), \ldots\}$ is an **orthogonal set** over one period.

Two functions $f(t)$ and $g(t)$ are **orthogonal** over $[0, T_0]$ if:

$$\int_0^{T_0} f(t)\,g(t)\,dt = 0$$

### The Orthogonality Relations

The three critical identities:

**Cosine–Cosine:**
$$\int_0^{T_0} \cos(m\omega_0 t)\cos(n\omega_0 t)\,dt = \begin{cases} T_0, & m = n = 0 \\ T_0/2, & m = n \neq 0 \\ 0, & m \neq n \end{cases}$$

[[visual:orthogonal-cosines]]

**Sine–Sine:**
$$\int_0^{T_0} \sin(m\omega_0 t)\sin(n\omega_0 t)\,dt = \begin{cases} T_0/2, & m = n \neq 0 \\ 0, & m \neq n \end{cases}$$

**Cosine–Sine:**
$$\int_0^{T_0} \cos(m\omega_0 t)\sin(n\omega_0 t)\,dt = 0 \qquad \text{for all } m, n$$

[[visual:cos-sin-orthogonal]]

The last one is the most remarkable: cosines and sines at *any* frequency are always orthogonal. This is because $\cos(m\omega_0 t)\sin(n\omega_0 t)$ is always an odd function of $t$ (relative to the midpoint), so its integral over a full period is zero.

[[visual:orthogonality-grid]]

### Why Orthogonality Matters

Orthogonality is what makes the analysis formulas work. When you multiply both sides of the TFS by $\cos(n\omega_0 t)$ and integrate, every term vanishes except the one with $k = n$:

$$\int_0^{T_0} x(t)\cos(n\omega_0 t)\,dt = a_n \cdot \frac{T_0}{2}$$

Solving for $a_n$ gives the analysis formula. Without orthogonality, the terms would mix and you couldn't isolate individual coefficients.

> **Key Insight**: Orthogonality means each basis function is "independent" — it carries information that no other basis function can provide. This is why the FS decomposition is unique.

---

## Symmetry in the TFS

The symmetry properties you learned for the EFS translate cleanly to the TFS:

[[visual:even-odd-tfs-symmetry]]

| Signal property | EFS result | TFS result |
|----------------|-----------|-----------|
| **Real + Even** | $X_k$ real, even | $b_k = 0$ (cosines only) |
| **Real + Odd** | $X_k$ imaginary, odd | $a_k = 0$, $a_0 = 0$ (sines only) |
| **General real** | $X_{-k} = X_k^*$ | Both $a_k$ and $b_k$ present |

This makes the TFS very intuitive:
- **Even signals** need only cosines (even functions)
- **Odd signals** need only sines (odd functions)
- **General signals** need both

---

## Worked Example: Square Wave TFS

The standard 50% duty cycle square wave (amplitude ±1, real and odd) has only sine terms:

$$x(t) = \frac{4}{\pi}\sum_{k=1,3,5,\ldots} \frac{1}{k}\sin(k\omega_0 t) = \frac{4}{\pi}\left[\sin(\omega_0 t) + \frac{1}{3}\sin(3\omega_0 t) + \frac{1}{5}\sin(5\omega_0 t) + \cdots\right]$$

[[visual:tfs-square-wave]]

Notice:
- Only **odd** harmonics ($k = 1, 3, 5, \ldots$) survive. This is because of the **half-wave symmetry**: $x(t + T_0/2) = -x(t)$.
- All $a_k = 0$ because the signal is odd.
- The coefficients decay as $1/k$ — consistent with the jump discontinuities.

[[visual:tfs-reconstruction-sim]]

Try the interactive above — build the square wave by adding $\sin(\omega_0 t)$, then $\frac{1}{3}\sin(3\omega_0 t)$, then $\frac{1}{5}\sin(5\omega_0 t)$, and watch it converge.

---

## EFS vs TFS: When to Use Which

Both representations contain the same information. Here's a guide:

| Situation | Prefer |
|-----------|--------|
| Deriving properties, proofs | EFS (more compact) |
| Lab measurements, physical interpretation | TFS (real oscillations) |
| Even or odd signals | TFS (cosine-only or sine-only) |
| Complex signals or systems theory | EFS |
| General computation | Either — use whichever your professor expects |

[[visual:efs-vs-tfs-waveform]]

<details>
<summary><strong>Pause & Think</strong>: Can you always convert between EFS and TFS?</summary>

For **real** signals, yes — always. The conversion formulas are exact. For **complex** signals (rare in practice), the TFS doesn't apply directly because it assumes real-valued output. In that case, you must use the EFS.

</details>

---

## Testing Orthogonality Interactively

[[visual:orthogonality-explorer-sim]]

Select two different harmonics $m$ and $n$ in the interactive above. Watch the product function oscillate symmetrically around zero — the positive and negative areas cancel perfectly. This visual "proof" of orthogonality makes the abstract inner product formula concrete and memorable.

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Forgetting the factor of 2 in $a_k = 2\text{Re}(X_k)$ | The EFS splits energy between $+k$ and $-k$; the TFS combines them, hence the 2× factor |
| Confusing the sign: $b_k = -2\text{Im}(X_k)$ | Note the **minus** sign — it comes from the convention in the expansion |
| Assuming the TFS works for complex signals | The TFS is only for real signals. Complex signals require the EFS |
| Writing sines for even signals or cosines for odd signals | Even signals → cosines only ($b_k = 0$); odd signals → sines only ($a_k = 0$) |
| Integrating over $[0, 2\pi]$ when $T_0 \neq 2\pi$ | The integration period is $T_0$, not $2\pi$. Be careful with the limits |

---

## Summary

- The **Trigonometric Fourier Series** decomposes real periodic signals into cosines and sines: $x(t) = a_0 + \sum_{k=1}^{\infty}[a_k\cos(k\omega_0 t) + b_k\sin(k\omega_0 t)]$.
- **Conversion formulas**: $a_k = 2\text{Re}(X_k)$, $b_k = -2\text{Im}(X_k)$, and $X_k = (a_k - jb_k)/2$.
- **Orthogonality** is the mathematical foundation: different harmonics are independent, and cosines are always orthogonal to sines.
- **Even signals** have only cosine terms; **odd signals** have only sine terms.
- The EFS and TFS contain identical information — use whichever is more convenient for your problem.
