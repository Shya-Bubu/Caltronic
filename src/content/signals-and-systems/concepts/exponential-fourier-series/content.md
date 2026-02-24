## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From the previous concept:
- **Periodic signals**: $x(t) = x(t + mT_0)$ with fundamental period $T_0$
- **Fundamental frequency**: $\omega_0 = 2\pi/T_0$
- **Euler's formula**: $e^{j\theta} = \cos\theta + j\sin\theta$
- **Inter-domain idea**: the same signal has equivalent representations in time and frequency
- You extracted Fourier coefficients by manually converting sines to complex exponentials

If you feel solid on the previous concept, you're perfectly set up for this one.

</details>

---

## The Central Question

The previous concept showed that a neat sum of sines and cosines can be expanded into complex exponentials using Euler's formula. You spotted the coefficients by inspection. But what about periodic signals that *aren't* neat trigonometric sums? How do you find the Fourier coefficients of a square wave, a triangular wave, or any arbitrary periodic waveform?

You need a **general-purpose machine** — a formula that takes *any* periodic signal as input and produces its Fourier coefficients as output. That machine is the **Exponential Fourier Series (EFS)**.

> **Why This Matters**: The EFS is the single most important pair of equations in this course. Every concept from this point forward — properties, symmetry, Parseval's theorem, and LTI system analysis — builds directly on these two formulas.

---

## The EFS Pair

The EFS consists of two equations that work together like a lock and key.

### The Synthesis Equation — Building $x(t)$ from Its Components

Any periodic signal $x(t)$ with fundamental frequency $\omega_0$ can be written as:

$$\boxed{x(t) = \sum_{k=-\infty}^{\infty} X_k \, e^{jk\omega_0 t}}$$

This says: $x(t)$ is an **infinite weighted sum** of complex exponentials $e^{jk\omega_0 t}$, where $k$ ranges over all integers (positive, negative, and zero). The weight on the $k$-th exponential is the complex number $X_k$.

### The Analysis Equation — Finding the Coefficients

Given $x(t)$, the coefficients are computed by:

$$\boxed{X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt}$$

The integral runs over **any one complete period** $T_0$. You are free to choose whichever interval is most convenient — $[0, T_0]$ or $[-T_0/2, +T_0/2]$ or anything else of length $T_0$.

[[visual:efs-block-diagram]]

Notice the beautiful symmetry between these equations. Synthesis *adds up* exponentials with $+jk\omega_0 t$ in the exponent. Analysis *integrates against* exponentials with $-jk\omega_0 t$ in the exponent. The sign change is deliberate — it's what makes the extraction work.

> The analysis equation is the workhorse of this entire topic. Almost every exam problem requires evaluating this integral for a specific signal. Get comfortable with it.

---

## Why Does the Analysis Integral Work?

This is the part most textbooks skip or rush through. Let's not do that — understanding *why* the analysis integral extracts exactly the right coefficient is the key to really owning this material.

### The Orthogonality of Complex Exponentials

Here's the fundamental mathematical fact that makes everything work:

$$\frac{1}{T_0}\int_{T_0} e^{jm\omega_0 t} \cdot e^{-jk\omega_0 t}\,dt = \frac{1}{T_0}\int_{T_0} e^{j(m-k)\omega_0 t}\,dt = \begin{cases} 1 & \text{if } m = k \\ 0 & \text{if } m \neq k \end{cases}$$

When $m \neq k$, the integrand $e^{j(m-k)\omega_0 t}$ is a complex exponential at a non-zero frequency. Its real part, $\cos((m-k)\omega_0 t)$, oscillates symmetrically above and below zero. Over a full period, the positive and negative areas cancel *exactly*.

[[visual:orthogonality-cancellation]]

When $m = k$, the integrand becomes $e^{j \cdot 0 \cdot t} = 1$ — a constant. Integrating a constant over $T_0$ and dividing by $T_0$ gives 1.

### The "Frequency Sieve"

Now let's see what happens when you apply the analysis formula to the full signal. Substitute the synthesis equation for $x(t)$:

$$X_k = \frac{1}{T_0}\int_{T_0} \left(\sum_m X_m\,e^{jm\omega_0 t}\right) e^{-jk\omega_0 t}\,dt = \sum_m X_m \underbrace{\frac{1}{T_0}\int_{T_0} e^{j(m-k)\omega_0 t}\,dt}_{= \delta_{mk}}$$

By orthogonality, every term with $m \neq k$ vanishes. Only $m = k$ survives, giving $X_k \cdot 1 = X_k$. The formula is self-consistent!

[[visual:frequency-sieve-diagram]]

Think of it as a **frequency sieve**: multiplying by $e^{-jk\omega_0 t}$ and integrating is like shaking a sieve that lets *only* the $k$-th harmonic grain fall through. All other grains bounce off and contribute zero.

<details>
<summary><strong>Pause & Think</strong>: If orthogonality failed — if the cross-terms didn't integrate to zero — what would go wrong?</summary>

You wouldn't be able to isolate individual coefficients. Each $X_k$ would be contaminated by contributions from other harmonics. The clean separation of frequency components that makes Fourier analysis so powerful would collapse entirely. Orthogonality is the foundation of everything.

</details>

---

## The Special Case: $k = 0$

Setting $k = 0$ in the analysis equation:

$$X_0 = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-j \cdot 0 \cdot t}\,dt = \frac{1}{T_0}\int_{T_0} x(t)\,dt$$

The exponential factor disappears (it becomes 1), and you're left with the **average value** of $x(t)$ over one period. This is the **DC component** — the constant offset around which the signal oscillates.

[[visual:dc-component-area]]

Geometrically, $X_0$ is the height of a rectangle whose area equals the area under one period of the signal. In the plot above, the dashed line shows $X_0 = 2$, which is exactly the average height of the waveform.

> **Key Insight**: Always compute $X_0$ first, separately. It's simpler (no complex exponential to deal with) and gives you immediate physical meaning — the average value.

---

## Step-by-Step Procedure for Computing EFS Coefficients

Here is a systematic five-step procedure that works for *any* periodic signal:

[[visual:efs-step-by-step]]

### Step 1: Identify $T_0$ and $\omega_0$

From the signal definition or diagram, determine the fundamental period and compute $\omega_0 = 2\pi/T_0$.

### Step 2: Compute $X_0$ separately

$$X_0 = \frac{1}{T_0}\int_{T_0} x(t)\,dt$$

This is often much simpler than the general formula because there is no exponential factor.

### Step 3: Compute $X_k$ for $k \neq 0$

$$X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$$

**Choose your integration window wisely!** Pick the interval that makes the integral simplest:
- For a pulse centred at the origin → use $[-T_0/2, +T_0/2]$
- For a signal starting at $t = 0$ → use $[0, T_0]$
- For a symmetric signal → choose symmetric limits to exploit even/odd properties

[[visual:integration-window-choice]]

### Step 4: Express $X_k$ in polar form

Write $X_k = |X_k|\,e^{j\angle X_k}$ to separate the magnitude (amplitude) from the phase (timing).

### Step 5: Draw the magnitude and phase spectra

Plot $|X_k|$ vs $k$ and $\angle X_k$ vs $k$ as stem plots. These line spectra show you exactly which harmonics are present and how strong each one is.

<details>
<summary><strong>Pause & Think</strong>: Why does the analysis integral use a minus sign (e^{−jkω₀t}) while the synthesis uses a plus sign (e^{+jkω₀t})?</summary>

The opposite signs are what create the orthogonality "sieve." When analysis multiplies by $e^{-jk\omega_0 t}$ and synthesis has $e^{+jm\omega_0 t}$, the product becomes $e^{j(m-k)\omega_0 t}$. Only when $m = k$ does this become $e^0 = 1$ (a constant). If both used the same sign, you'd get $e^{j(m+k)\omega_0 t}$, which would never simplify to a constant when $m = k$ (unless $k = 0$).

</details>

---

## Fourier Synthesis in Action

Let's see the synthesis equation come alive. The interactive builder below lets you add harmonics one at a time and watch a signal assemble from nothing:

[[visual:harmonic-builder-efs]]

Start with just the DC component — you get a flat line. Add the fundamental ($k = \pm 1$) — a sinusoid appears. Add the 3rd harmonic, then the 5th, then the 7th. If you're building a square wave, you'll see the flat tops and steep edges emerge as more odd harmonics accumulate.

Now try the coefficient explorer to see the reverse direction:

[[visual:coefficient-calculator]]

---

## The Gibbs Phenomenon

When approximating a discontinuous signal (like a square wave) with a finite number of harmonics, something surprising happens. There is always an **overshoot** near the discontinuity — about 9% of the jump height. This overshoot does *not* diminish as you add more terms. It just gets narrower.

[[visual:square-wave-reconstruction]]

In the plot above, notice how the 11-harmonic approximation is excellent in the flat regions but still overshoots at the jumps. This is the **Gibbs phenomenon**, and it is a fundamental limitation — not a bug in your calculation.

[[visual:gibbs-phenomenon]]

> **Watch Out**: The Gibbs phenomenon is a favourite exam topic. Examiners love asking "Does the overshoot disappear as $N \to \infty$?" The answer is no — the overshoot height stays at ~9%, but its width approaches zero.

---

## Key Properties of EFS Coefficients

| Property | Statement | Why it matters |
|----------|-----------|---------------|
| $X_k$ is complex | Each coefficient has magnitude $|X_k|$ and phase $\angle X_k$ | Need both to reconstruct the signal |
| DC component | $X_0$ = average value of $x(t)$ | Physical interpretation: the offset |
| Harmonics | $X_1$ = fundamental, $X_k$ = $k$-th harmonic | Higher $k$ = finer detail |
| Decay | $|X_k| \to 0$ as $|k| \to \infty$ | Finite-power signals have diminishing harmonics |
| Convergence | More harmonics → better approximation | But Gibbs overshoot persists at discontinuities |

<details>
<summary><strong>Pause & Think</strong>: The EFS uses an infinite sum from k = −∞ to +∞. But can we ever compute infinitely many coefficients? How do we use the EFS in practice?</summary>

In practice, we compute a finite number of coefficients — say $k = -N$ to $+N$. Because $|X_k| \to 0$, the high-$k$ terms contribute very little. For most engineering purposes, truncating to the first 10–20 harmonics captures 99%+ of the signal's power. Parseval's theorem (coming in Lesson 05) makes this precise.

</details>

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Forgetting the $1/T_0$ factor | The analysis equation divides by $T_0$ — without it, your result is off by a factor of $T_0$ |
| Integrating over the wrong interval | Must integrate over exactly one period $T_0$, any contiguous interval of length $T_0$ |
| Confusing the sign in the exponent | Analysis: $e^{-jk\omega_0 t}$ (minus). Synthesis: $e^{+jk\omega_0 t}$ (plus). They must differ |
| Computing only positive $k$ values | $k$ runs from $-\infty$ to $+\infty$ — negative harmonics are real and physical |
| Assuming $X_k$ is always real | $X_k$ is complex in general; it's real only for specific symmetry conditions (covered next) |
| Choosing an inconvenient integration window | Pick symmetric limits for symmetric signals to exploit even/odd simplifications |

---

## Summary

Here are the ideas that will carry you through the rest of this lesson:

- The **Exponential Fourier Series** consists of the analysis–synthesis pair — two equations that convert between the time domain and the frequency domain.
- **Analysis**: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$ extracts the $k$-th coefficient using orthogonality as its filter.
- **Synthesis**: $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$ reconstructs the signal by summing weighted complex exponentials.
- **Orthogonality** of complex exponentials is the mathematical engine — it makes the frequency sieve work.
- $X_0$ is the DC/average value. $X_1$ is the fundamental. Higher $k$ carry finer detail.
- The **Gibbs phenomenon** causes ~9% overshoot at discontinuities, regardless of how many harmonics you use.
- Choose your integration interval strategically to simplify computation.

In the next concept, we'll apply this machinery to a concrete signal — the square pulse train — and see the celebrated **sinc function** emerge.
