## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **EFS pair**: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$ and $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$
- **Square pulse FS**: $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$
- **Magnitude and phase spectra** of a periodic signal
- The concepts of orthogonality and harmonic structure

</details>

---

## Why Properties?

Evaluating the analysis integral from scratch for every new signal is tedious and error-prone. Imagine you've already computed the FS of a square pulse train. Now someone shifts it by $t_0$ seconds and asks for the new FS. Do you really want to re-evaluate that integral?

The answer is **no** — and you don't have to. **Properties** are shortcuts that let you derive the FS of a modified signal directly from the FS of the original signal, *without re-integrating*.

> **Why This Matters**: Properties transform the FS from a brute-force calculation tool into an elegant **algebraic manipulation framework**. Learn these four properties well, and you'll save enormous time on exams and in practice. Your professor emphasises them heavily — and for good reason.

In this concept, we cover four fundamental properties: **linearity**, **time shifting**, **time reversal**, and **time scaling**.

---

## Property 1: Linearity

### Statement

If $x(t) \xleftrightarrow{} X_k$ and $y(t) \xleftrightarrow{} Y_k$ are periodic with the **same** fundamental frequency $\omega_0$, then:

$$\boxed{\alpha\,x(t) + \beta\,y(t) \xleftrightarrow{} \alpha\,X_k + \beta\,Y_k}$$

for any constants $\alpha$ and $\beta$.

[[visual:linearity-demo]]

### Why Same $\omega_0$?

This is the critical condition that many students overlook. The FS coefficients $X_k$ and $Y_k$ are indexed by the same integer $k$, and the $k$-th coefficient corresponds to frequency $k\omega_0$. If $x(t)$ and $y(t)$ have *different* fundamental frequencies, their spectra sit on different frequency grids — you can't add $X_k$ and $Y_k$ at the same $k$ because they mean different things.

Think of it visually: the X spectrum has spikes at $\omega_0, 2\omega_0, 3\omega_0, \ldots$ The Y spectrum has spikes at $\omega_0', 2\omega_0', 3\omega_0', \ldots$ These only align if $\omega_0 = \omega_0'$.

[[visual:linearity-spectrum-add]]

### How to Use It

Given a composite signal that is a sum of simpler signals sharing the same $\omega_0$:
1. Compute the FS of each component separately
2. Scale each set of coefficients by the corresponding constant
3. Add the results

<details>
<summary><strong>Pause & Think</strong>: Can you use linearity on x(t) = sin(3t) + cos(5t)?</summary>

Check: $\omega_1 = 3$, $\omega_2 = 5$. Is $\omega_2/\omega_1 = 5/3$ rational? Yes! So both share a common fundamental frequency $\omega_0 = \text{GCD}(3,5) = 1$. Here $\sin(3t)$ has $X_{\pm 3}$ nonzero, and $\cos(5t)$ has $X_{\pm 5}$ nonzero. Linearity applies with $\omega_0 = 1$, and you can add their coefficient sets.

</details>

---

## Property 2: Time Shifting

### Statement

If $x(t) \xleftrightarrow{} X_k$, then:

$$\boxed{x(t - t_0) \xleftrightarrow{} X_k\,e^{-jk\omega_0 t_0}}$$

### What This Means — The Key Insight

Shifting a signal in time **does not change the magnitudes** $|X_k|$ — it only changes the **phases** $\angle X_k$.

Specifically:
- $|X_k'| = |X_k|$ — magnitude is unchanged (because $|e^{-jk\omega_0 t_0}| = 1$)
- $\angle X_k' = \angle X_k - k\omega_0 t_0$ — phase shifts linearly in $k$

This is profound: **what frequencies are present** and **how strong they are** is unchanged by a time shift. Only the *relative timing* changes.

[[visual:time-shift-original-vs-shifted]]

### Derivation

In the synthesis equation, replace $t$ with $t - t_0$:

$$x(t-t_0) = \sum_k X_k\,e^{jk\omega_0(t-t_0)} = \sum_k \underbrace{(X_k\,e^{-jk\omega_0 t_0})}_{X_k'}\,e^{jk\omega_0 t}$$

The factor $e^{-jk\omega_0 t_0}$ has magnitude 1, so it rotates each coefficient in the complex plane without changing its length.

### Why Higher Harmonics Get More Phase Shift

[[visual:time-shift-phase-effect]]

The phase change is $-k\omega_0 t_0$ — proportional to the harmonic number $k$. A shift of $t_0$ seconds represents more wave cycles at higher frequencies. The 5th harmonic "sees" a 5× larger phase shift than the fundamental, because it completes 5 cycles in the same interval.

[[visual:shift-magnitude-unchanged]]

Try the interactive above — drag the time shift slider and watch only the phase spectrum tilt while the magnitude spectrum stays perfectly still.

---

## Property 3: Time Reversal

### Statement

If $x(t) \xleftrightarrow{} X_k$, then:

$$\boxed{x(-t) \xleftrightarrow{} X_{-k}}$$

### What This Means

Reversing a signal in time **mirrors** its FS coefficients about $k = 0$. The coefficient at index $k$ moves to index $-k$, and vice versa.

[[visual:time-reversal-demo]]

### Derivation

$$x(-t) = \sum_k X_k\,e^{jk\omega_0(-t)} = \sum_k X_k\,e^{-jk\omega_0 t}$$

Substituting $m = -k$:

$$= \sum_m X_{-m}\,e^{jm\omega_0 t}$$

So the FS coefficient of $x(-t)$ at index $m$ is $X_{-m}$.

### Connection to Conjugate Symmetry

For **real signals**, we know that $X_{-k} = X_k^*$ (conjugate symmetry). So time reversal of a real signal gives $X_k^*$ — the coefficients are conjugated. This means:
- Magnitudes stay the same: $|X_{-k}| = |X_k|$
- Phases flip sign: $\angle X_{-k} = -\angle X_k$

> **Watch Out**: The identity $X_{-k} = X_k^*$ only holds for **real** signals. For complex signals, $X_{-k}$ and $X_k^*$ are different, and time reversal gives $X_{-k}$, not the conjugate.

---

## Property 4: Time Scaling

### Statement

If $x(t)$ is periodic with period $T_0$ and FS coefficients $X_k$, then $x(\alpha t)$ (for $\alpha > 0$) is periodic with period $T_0/\alpha$ and the **FS coefficients remain the same**: $X_k$.

$$\boxed{x(\alpha t) \xleftrightarrow{} X_k \quad \text{with new period } T_0/\alpha}$$

### What Changes and What Doesn't

| Aspect | $x(t)$ | $x(\alpha t)$ |
|--------|--------|---------------|
| Period | $T_0$ | $T_0/\alpha$ |
| Fundamental frequency | $\omega_0$ | $\alpha\omega_0$ |
| FS coefficients | $X_k$ | $X_k$ (unchanged!) |
| Harmonic spacing | $\omega_0$ apart | $\alpha\omega_0$ apart |

[[visual:time-scaling-compression]]

### Derivation

$$x(\alpha t) = \sum_k X_k\,e^{jk\omega_0 (\alpha t)} = \sum_k X_k\,e^{jk(\alpha\omega_0)t}$$

The coefficients $X_k$ are unchanged — only the frequency grid is rescaled from $k\omega_0$ to $k\alpha\omega_0$.

### Physical Intuition

Speeding up a signal ($\alpha > 1$) compresses it in time. The period shortens, the harmonics spread further apart on the frequency axis. But the *weights* on each harmonic don't change — only the spacing between them does.

[[visual:time-scaling-freq-axis]]

<details>
<summary><strong>Pause & Think</strong>: You know the FS of a 1 kHz square wave. Someone asks for the FS of a 2 kHz square wave (same duty cycle). Do you need to re-integrate?</summary>

No! Time scaling with $\alpha = 2$ gives you a 2 kHz square wave with the same coefficients $X_k$. The period halves (from 1 ms to 0.5 ms), the harmonics are now at 2 kHz, 4 kHz, 6 kHz, ... instead of 1 kHz, 2 kHz, 3 kHz, ... but each harmonic has the same weight $X_k$.

</details>

---

## Properties Summary Table

[[visual:properties-summary-diagram]]

| Property | Time Domain | FS Coefficients | What changes? |
|----------|------------|-----------------|---------------|
| **Linearity** | $\alpha x(t) + \beta y(t)$ | $\alpha X_k + \beta Y_k$ | Coefficients combine (same $\omega_0$ required) |
| **Time Shift** | $x(t - t_0)$ | $X_k\,e^{-jk\omega_0 t_0}$ | Phase only; magnitude unchanged |
| **Time Reversal** | $x(-t)$ | $X_{-k}$ | Indices mirror about $k = 0$ |
| **Time Scaling** | $x(\alpha t)$ | $X_k$ (period → $T_0/\alpha$) | Period and harmonic spacing; coefficients unchanged |

[[visual:properties-walk-through-sim]]

Try the interactive explorer — apply each property to a base signal and see the immediate effect on both the waveform and the spectrum.

---

## Combining Properties

The real power comes from chaining properties together. Here's a typical exam scenario:

**Given**: FS of square pulse $x(t)$ centred at origin with $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$.

**Find**: FS of $y(t) = 3x(2t - 4)$.

**Solution**:
1. Factor out the scaling: $y(t) = 3x(2(t - 2))$
2. Time scaling by $\alpha = 2$: $x(2t) \xleftrightarrow{} X_k$ with new period $T_0/2$
3. Time shift by $t_0 = 2$: $x(2(t-2)) \xleftrightarrow{} X_k\,e^{-jk(2\omega_0)(2)}$
4. Scaling by 3: $3x(2(t-2)) \xleftrightarrow{} 3X_k\,e^{-j4k\omega_0}$

Four lines, no integrals — that is the power of properties.

> **You're doing great** — these four properties seem deceptively simple, but they unlock an enormous range of problems. With practice, you'll use them instinctively.

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Using linearity when $\omega_0$ values differ | Linearity requires the **same** fundamental frequency |
| Wrong sign: $e^{+jk\omega_0 t_0}$ instead of $e^{-jk\omega_0 t_0}$ | Time shift uses **minus** sign: $e^{-jk\omega_0 t_0}$ |
| Thinking time shift changes magnitudes | Only phase changes; $|X_k'| = |X_k|$ always |
| Confusing $X_{-k}$ with $X_k^*$ for general signals | They are equal **only** for real signals |
| Not factoring out scaling before applying time shift | Always write $x(\alpha t - c) = x(\alpha(t - c/\alpha))$ first |

---

## Summary

- **Linearity**: Combine FS coefficients of signals sharing the same $\omega_0$ by weighted addition.
- **Time shift**: Delays only affect phase, not magnitude — $X_k' = X_k\,e^{-jk\omega_0 t_0}$.
- **Time reversal**: Mirrors coefficients — $x(-t) \to X_{-k}$.
- **Time scaling**: Compresses/stretches the period but keeps coefficients unchanged.
- **Chain properties** for compound transformations: factor, then apply one property at a time.
- These are exam shortcuts — memorise the table and use them to avoid re-integrating.

Next up: symmetry properties, where we'll see how the shape of a signal (even, odd, half-wave symmetric) constrains the form of its FS coefficients.
