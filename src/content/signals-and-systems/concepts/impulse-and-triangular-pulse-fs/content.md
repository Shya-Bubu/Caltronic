## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From the previous concepts:
- **EFS analysis equation**: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$
- **Differentiation property**: $x'(t) \xleftrightarrow{} jk\omega_0\,X_k$
- **Integration property**: $\int x(t)\,dt \xleftrightarrow{} X_k/(jk\omega_0)$
- **Sifting property of $\delta(t)$**: $\int f(t)\,\delta(t-t_0)\,dt = f(t_0)$
- **Square pulse FS**: $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$ with $1/k$ decay

</details>

---

## Two Signals, One Deep Connection

In this concept, we compute the Fourier Series of two seemingly unrelated signals — the **periodic impulse train** and the **triangular pulse train** — and discover that they are connected by integration.

These are the two extreme cases of periodic signals:
- The impulse train is the **least smooth** periodic signal imaginable: infinitely sharp spikes
- The triangular wave is **much smoother**: continuous everywhere (though it has corners)

Understanding both, and the integration chain that connects them, locks in the smoothness–decay relationship from the previous concept.

> **Why This Matters**: The impulse train is the most fundamental testing signal in engineering — it appears in sampling theory, convolution, and system identification. The triangular wave demonstrates how integration creates smoothing. Together, they complete the picture of how signal smoothness determines spectral decay.

---

## Part 1: The Periodic Impulse Train

### The Signal

A periodic impulse train $\delta_T(t)$ is an infinite sum of equally-spaced Dirac delta functions:

$$\delta_T(t) = \sum_{m=-\infty}^{\infty} \delta(t - mT_0)$$

Each impulse has zero duration but unit area. The spacing between impulses is $T_0$.

[[visual:impulse-train-waveform]]

### Computing the FS Coefficients

Apply the analysis equation with the integration window $[-T_0/2, +T_0/2]$. Within this window, there is only one impulse at $t = 0$:

$$X_k = \frac{1}{T_0}\int_{-T_0/2}^{+T_0/2} \delta(t)\,e^{-jk\omega_0 t}\,dt$$

Now use the **sifting property**: the impulse $\delta(t)$ samples the integrand at $t = 0$:

$$X_k = \frac{1}{T_0}\,e^{-jk\omega_0 \cdot 0} = \frac{1}{T_0}$$

[[visual:impulse-derivation-diagram]]

$$\boxed{X_k = \frac{1}{T_0} \quad \text{for all } k}$$

### The Remarkable Result

Every coefficient is the same constant $1/T_0$ — regardless of $k$. The magnitude spectrum is **perfectly flat**.

[[visual:impulse-flat-spectrum]]

> **Key Insight**: The impulse train contains **all harmonics equally**. It has no preference for any frequency — every harmonic from $k = 0$ to $k = \pm\infty$ has the same weight. This is why it's the ultimate "test signal": it excites every frequency equally.

### Physical Interpretation

Why does an infinitely sharp spike need all frequencies equally? Because representing an infinitely narrow feature requires contributions from arbitrarily high frequencies. If you removed any harmonics, the impulse would widen. The flat spectrum is a direct consequence of the extreme concentration in time.

This is the **bandwidth–duration trade-off** at its most extreme:
- **Narrowest possible pulse** (zero duration) → **widest possible spectrum** (flat, infinite bandwidth)

<details>
<summary><strong>Pause & Think</strong>: As T₀ increases (impulses spread further apart), what happens to the spectrum?</summary>

$X_k = 1/T_0$ gets smaller for all $k$. The spectrum is still flat, but lower in amplitude. This makes sense: with a longer period, there's more "zero time" between impulses, so the average energy per period decreases. The harmonic spacing also decreases ($\omega_0 = 2\pi/T_0$ becomes smaller), so the spectral lines get denser but weaker.

</details>

---

## Part 2: The Triangular Pulse Train

### The Signal

A periodic triangular wave $\Lambda_T(t)$ has a peak at $t = 0$ and ramps linearly to zero at $t = \pm T_1$, then repeats with period $T_0$:

$$\Lambda(t) = \begin{cases} 1 - \frac{|t|}{T_1}, & |t| \leq T_1 \\ 0, & T_1 < |t| \leq T_0/2 \end{cases}$$

[[visual:triangular-pulse-waveform]]

This signal is **continuous everywhere** but has **corners** at $t = 0$ (peak) and $t = \pm T_1$ (base). Compared to the square pulse, it's one degree smoother.

### Deriving the FS Using the Integration Property

Here's an elegant shortcut. Instead of evaluating the analysis integral directly (messy!), use the **integration property** and the known FS of the square pulse.

The triangular pulse is the **definite integral** of the square pulse (up to scaling). Specifically, if the square pulse has coefficients $X_k^{\text{sq}} = \frac{\sin(k\omega_0 T_1)}{k\pi}$, then the triangular pulse coefficients are:

$$X_k^{\text{tri}} = \frac{X_k^{\text{sq}}}{jk\omega_0} = \frac{\sin(k\omega_0 T_1)}{jk^2\pi\omega_0}$$

But be careful — this approach gives the correct result only after properly adjusting for scaling and DC. The direct calculation gives the triangular coefficients as following a **sinc² envelope**:

$$\boxed{X_k \propto \operatorname{sinc}^2\left(\frac{k\omega_0 T_1}{\pi}\right) \propto \frac{1}{k^2}}$$

The key point: the decay is $1/k^2$, exactly one power faster than the square pulse's $1/k$.

### Why $1/k^2$ Decay?

The triangular wave is the integral of the square wave. Integration divides each coefficient by $jk\omega_0$, adding an extra $1/k$ to the decay:

$$\frac{1}{k} \xrightarrow{\text{integrate}} \frac{1}{k} \times \frac{1}{k} = \frac{1}{k^2}$$

[[visual:triangular-spectrum]]

[[visual:square-vs-triangle-spectrum]]

---

## The Integration Chain

Now step back and see how impulse, square, and triangular waves form a hierarchy connected by integration:

[[visual:integration-chain-diagram]]

| Signal | Smoothness | FS decay | Spectrum shape |
|--------|-----------|----------|---------------|
| **Impulse train** | Maximally discontinuous | $|X_k| = \text{const}$ (no decay) | Flat |
| **Square wave** | Jump discontinuities | $|X_k| \propto 1/k$ | sinc envelope |
| **Triangular wave** | Continuous, corners | $|X_k| \propto 1/k^2$ | sinc² envelope |
| **Smoother wave** | Differentiable | $|X_k| \propto 1/k^3$ or faster | sinc³ or faster |

Each integration step:
1. **Smooths the signal**: removes one level of discontinuity
2. **Adds $1/k$ to the decay**: the spectrum falls off faster
3. **Adds $-90°$ of phase**: rotates all coefficients

This chain is one of the most important conceptual frameworks in signal processing. It tells you *exactly* how signal smoothness connects to spectral content.

<details>
<summary><strong>Pause & Think</strong>: What signal do you get if you integrate the triangular wave?</summary>

You get something even smoother — a piecewise-parabolic (quadratic) wave that is differentiable everywhere (no corners, only changes in curvature). Its FS coefficients would decay as $1/k^3$ — the sinc³ envelope. Each integration removes one type of discontinuity and adds one power of $1/k$ to the decay.

</details>

---

## Convergence Comparison

The practical impact of faster decay is dramatic. Compare reconstruction quality with the same number of harmonics:

[[visual:tri-vs-square-convergence]]

With just 5 harmonics:
- The **triangular wave** reconstruction is nearly perfect — the $1/k^2$ decay means terms beyond $k = 5$ are negligible
- The **square wave** reconstruction still has visible Gibbs overshoot — the $1/k$ decay means harmonics beyond $k = 5$ are still significant

[[visual:triangle-reconstruction-sim]]

This is why triangular waves are "easier" signals from a Fourier perspective — they converge much more quickly.

---

## Worked Example

**Given**: Impulse train with $T_0 = 4$ seconds.

**Find**: FS coefficients and the synthesis equation.

**Solution**:

$$X_k = \frac{1}{T_0} = \frac{1}{4} = 0.25 \quad \text{for all } k$$

$$\omega_0 = \frac{2\pi}{4} = \frac{\pi}{2}$$

The synthesis equation becomes:

$$\delta_T(t) = \sum_{k=-\infty}^{\infty} \frac{1}{4}\,e^{jk\frac{\pi}{2}t} = \frac{1}{4}\sum_{k=-\infty}^{\infty} e^{jk\frac{\pi}{2}t}$$

This is a remarkable identity: an infinite sum of equally-weighted complex exponentials produces a train of delta functions. It's one of the deepest results in Fourier analysis.

[[visual:coefficient-decay-explorer]]

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Forgetting the sifting property: $\int f(t)\delta(t)\,dt = f(0)$ | The integral doesn't "spread" — $\delta(t)$ samples the integrand at $t = 0$ |
| Expecting the impulse spectrum to decay | It doesn't! $X_k = 1/T_0$ for all $k$ — the spectrum is flat |
| Confusing $1/k$ and $1/k^2$ decay | Square wave: $1/k$ (discontinuities). Triangular wave: $1/k^2$ (continuous, corners) |
| Computing triangular FS from scratch | Use the integration property on the square wave FS — much faster |
| Forgetting the DC component when using integration | Integration can change the average value; handle $X_0$ separately |

---

## Summary

- The **periodic impulse train** has $X_k = 1/T_0$ for all $k$ — a flat spectrum that contains every harmonic equally. It is the extreme case of the bandwidth–duration trade-off.
- The **triangular pulse train** has coefficients following a sinc² envelope with $1/k^2$ decay — faster than the square wave's $1/k$ because the triangular wave is smoother.
- The **integration chain** — impulse $\to$ square $\to$ triangle — each step integrates, smooths the signal, and adds $1/k$ to the spectral decay rate.
- Faster decay = fewer harmonics needed = better convergence with finite terms.
- Use the **integration property** to derive the triangular FS from the square pulse FS, avoiding direct integration.
