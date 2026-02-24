## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From the previous concepts:
- **EFS analysis equation**: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$
- **Computing $X_0$** as the average value
- **Choosing the integration interval** strategically (symmetric limits for symmetric signals)
- **Orthogonality** of complex exponentials — why the analysis integral isolates each coefficient

If the analysis integral still feels abstract, this concept will make it concrete.

</details>

---

## Why the Square Pulse Train?

We've built the machinery of the EFS. Now it's time to *use* it. The square pulse train is the first non-trivial worked example, and it's worth studying carefully for three reasons:

1. **The sinc function emerges.** It produces a closed-form answer involving $\sin(x)/x$ — a function you'll encounter everywhere in signal processing, communications, and sampling theory.
2. **It demonstrates the bandwidth–duration trade-off** — one of the most profound principles in all of engineering.
3. **You'll see it in the lab.** When you connect a square wave generator to a spectrum analyser, the coefficients you calculate here are the exact lines you'll observe on the screen.

> **Why This Matters**: The square pulse is not just an academic exercise. It is the canonical example that reveals the deep relationship between a signal's shape in time and its spectrum in frequency. Every concept that follows builds on insights from this example.

---

## The Signal

A square pulse train $x(t)$ is defined as follows:

- **Amplitude**: 1 within the pulse, 0 outside
- **Pulse width**: $2T_1$ (centred at the origin, extending from $-T_1$ to $+T_1$)
- **Period**: $T_0$ (the interval between successive pulse centres)

[[visual:square-pulse-train]]

Mathematically, define one pulse as a rectangular gate function:

$$g(t) = \begin{cases} 1, & |t| < T_1 \\ 0, & \text{otherwise} \end{cases}$$

Then the periodic square pulse train is its infinite repetition:

$$x(t) = \sum_{m=-\infty}^{\infty} g(t - mT_0)$$

This creates an infinite train of identical rectangular pulses, each of width $2T_1$, spaced $T_0$ apart. The ratio $2T_1/T_0$ is the **duty cycle** — the fraction of each period during which the signal is "on."

[[visual:pulse-duty-cycle-sim]]

Play with the interactive above. Change the pulse width and period. Notice how the duty cycle changes — it will soon connect directly to the DC component $X_0$.

---

## Computing the Fourier Coefficients

Let's apply the systematic procedure from the previous concept. We choose the integration window $[-T_0/2, +T_0/2]$ — centred at the origin, to exploit the symmetry of the pulse.

### Step 1: Identify $T_0$ and $\omega_0$

Given directly: period $T_0$, so $\omega_0 = 2\pi/T_0$.

### Step 2: The DC Component $X_0$

$$X_0 = \frac{1}{T_0}\int_{-T_0/2}^{+T_0/2} x(t)\,dt = \frac{1}{T_0}\int_{-T_1}^{+T_1} 1 \cdot dt = \frac{2T_1}{T_0}$$

This is exactly the **duty cycle**. If the pulse is on for half the period ($T_1 = T_0/4$, so $2T_1 = T_0/2$), the average value is $0.5$. This makes intuitive sense — the signal spends half its time at 1 and half at 0.

> **Key Insight**: $X_0$ = duty cycle. This is one of the most important quick-check results. If your calculation gives a DC component that doesn't match the duty cycle, something has gone wrong.

### Step 3: $X_k$ for $k \neq 0$

[[visual:integration-setup]]

Since $x(t) = 0$ outside $[-T_1, +T_1]$, the integral simplifies:

$$X_k = \frac{1}{T_0}\int_{-T_1}^{+T_1} 1 \cdot e^{-jk\omega_0 t}\,dt$$

Now evaluate — this is a standard exponential integral:

$$X_k = \frac{1}{T_0}\left[\frac{e^{-jk\omega_0 t}}{-jk\omega_0}\right]_{-T_1}^{+T_1}$$

$$= \frac{1}{T_0} \cdot \frac{e^{-jk\omega_0 T_1} - e^{+jk\omega_0 T_1}}{-jk\omega_0}$$

Recognise the numerator? It's $-2j\sin(k\omega_0 T_1)$ from Euler's formula:

$$= \frac{1}{T_0} \cdot \frac{-2j\sin(k\omega_0 T_1)}{-jk\omega_0} = \frac{1}{T_0} \cdot \frac{2\sin(k\omega_0 T_1)}{k\omega_0}$$

Since $\omega_0 T_0 = 2\pi$, we get $T_0 = 2\pi/\omega_0$, and the $\omega_0$ cancels beautifully:

$$\boxed{X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}}$$

[[visual:derivation-block-diagram]]

### Why Is $X_k$ Entirely Real?

Notice there are no imaginary parts — every $X_k$ is a real number (positive or negative). This isn't a coincidence. The square pulse centred at the origin is an **even** signal: $x(t) = x(-t)$. We'll prove formally in the symmetry concept that even, real signals always have purely real FS coefficients.

<details>
<summary><strong>Pause & Think</strong>: What happens to X_k if you shift the pulse so it starts at t = 0 instead of being centred at the origin?</summary>

The signal becomes $x(t - T_1)$ — shifted right by $T_1$. By the time-shift property (which you'll study in the next concept), the new coefficients become $X_k' = X_k \cdot e^{-jk\omega_0 T_1}$. The magnitudes $|X_k|$ stay the same, but the coefficients pick up a phase factor and become complex. The spectrum shape (sinc envelope) is unchanged — only the phases shift.

</details>

---

## The Sinc Envelope

The formula $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$ samples a continuous function known as the **sinc function**:

$$\operatorname{sinc}(u) = \frac{\sin(\pi u)}{\pi u}$$

By convention, $\operatorname{sinc}(0) = 1$ (the limit). The FS coefficients $X_k$ sit on equally-spaced samples of a scaled sinc.

[[visual:sinc-continuous-envelope]]

### Key Features of the Sinc Spectrum

| Feature | Detail |
|---------|--------|
| **Main lobe** | Centred at $k = 0$, width inversely proportional to $T_1$ |
| **Zero crossings** | At $k = n\pi/(\omega_0 T_1)$ for positive integers $n$ |
| **Side lobes** | Alternating sign, decaying as $1/k$ |
| **All real** | No phase variation — the signal is even and real |
| **$1/k$ decay** | Slow decay caused by the **discontinuities** in the square pulse |

[[visual:sinc-spectrum-bar]]

> **Watch Out**: The $1/k$ decay is the signature of a discontinuous signal. Smooth signals have much faster coefficient decay (e.g., $1/k^2$ or $1/k^3$). This slow decay means many harmonics are needed to faithfully represent a square wave — it's an inherently wideband signal.

---

## Worked Numerical Example

Let's compute specific values for $T_0 = 4$, $2T_1 = 1$ (so $T_1 = 0.5$, duty cycle = 25%):

- $\omega_0 = 2\pi/4 = \pi/2$
- $X_0 = 2(0.5)/4 = 0.25$
- $X_1 = \frac{\sin(1 \cdot \frac{\pi}{2} \cdot 0.5)}{1 \cdot \pi} = \frac{\sin(\pi/4)}{\pi} = \frac{\sqrt{2}/2}{\pi} \approx 0.225$
- $X_2 = \frac{\sin(2 \cdot \frac{\pi}{2} \cdot 0.5)}{2\pi} = \frac{\sin(\pi/2)}{2\pi} = \frac{1}{2\pi} \approx 0.159$
- $X_3 = \frac{\sin(3\pi/4)}{3\pi} \approx 0.075$
- $X_4 = \frac{\sin(\pi)}{4\pi} = 0$ — the first zero crossing!

The zero at $k = 4$ occurs because $k\omega_0 T_1 = 4 \cdot \frac{\pi}{2} \cdot 0.5 = \pi$, and $\sin(\pi) = 0$. In general, zeros occur at $k = n \cdot T_0/(2T_1)$ for positive integers $n$.

<details>
<summary><strong>Pause & Think</strong>: For a 50% duty cycle (2T₁ = T₀/2), which harmonics vanish?</summary>

With $T_1 = T_0/4$, zeros occur at $k = n \cdot T_0/2T_1 = n \cdot 2 = 2, 4, 6, \ldots$ — all **even** harmonics vanish! Only odd harmonics survive. This is the classic result for a **symmetric square wave** (50% duty cycle). Try it in the interactive below.

</details>

---

## The Bandwidth–Duration Trade-off

Here is one of the most important results in all of signal processing, and the square pulse makes it beautifully clear.

[[visual:bandwidth-duration-compare]]

Look at the comparison above:

- **Wide pulse** (50% duty cycle): The spectrum is concentrated in the main lobe with rapid decay. Few harmonics carry most of the energy = **narrow bandwidth**.
- **Narrow pulse** (12.5% duty cycle): The spectrum spreads across many harmonics before decaying. Many harmonics are significant = **wide bandwidth**.

The principle:

$$\text{Narrow in time} \longleftrightarrow \text{Broad in frequency}$$
$$\text{Broad in time} \longleftrightarrow \text{Narrow in frequency}$$

This is not a coincidence or an approximation — it is a **mathematical certainty** built into the structure of the Fourier transform. You cannot have a signal that is simultaneously narrow in both time and frequency. This trade-off governs the design of communications systems, radar pulses, medical imaging, and audio processing.

---

## Convergence and Reconstruction

What happens when you truncate the infinite series and sum only the first $N$ harmonics?

$$x_N(t) = \sum_{k=-N}^{N} X_k\,e^{jk\omega_0 t}$$

[[visual:reconstruction-harmonics]]

Try adding harmonics one by one. You'll observe:

- **$N = 1$**: A smooth cosine — nothing like a square pulse
- **$N = 5$**: The flat top begins to form, with visible ripples
- **$N = 21$**: Excellent approximation in the flat regions, but ~9% overshoot at the edges (Gibbs phenomenon)

[[visual:convergence-comparison]]

As $N \to \infty$:
- The series converges to $x(t)$ at **all continuous points**
- At **discontinuities**, it converges to the **midpoint**: $(0 + 1)/2 = 0.5$
- The Gibbs overshoot gets **narrower** but never disappears — its height stays at ~9%

---

## Exploring Duty Cycle and Spectrum Shape

[[visual:duty-cycle-spectrum-sim]]

Use the interactive explorer to see how changing the duty cycle reshapes the spectrum. Notice these patterns:

- At 50% duty cycle, all even harmonics vanish
- As the duty cycle decreases toward 0%, the spectrum flattens (all harmonics become equal in magnitude — approaching an impulse train)
- As the duty cycle increases toward 100%, the spectrum narrows toward a single spike at $k = 0$ (approaching a DC signal)

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Using full window when signal is nonzero only on $[-T_1, T_1]$ | Only integrate where $x(t) \neq 0$ — saves effort and avoids errors |
| Forgetting to simplify $\omega_0 T_0 = 2\pi$ | This cancellation produces the clean $1/(k\pi)$ denominator |
| Confusing $2T_1$ (pulse width) with $T_1$ | The pulse extends from $-T_1$ to $+T_1$; total width is $2T_1$ |
| Expecting complex $X_k$ | For an even, centred pulse, $X_k$ is real. Complex $X_k$ appears only when the pulse is asymmetric or shifted |
| Thinking $1/k$ decay means fast convergence | It's actually slow — discontinuities require many harmonics |

---

## Summary

- The square pulse train with amplitude 1, width $2T_1$, and period $T_0$ has: $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$ and $X_0 = \frac{2T_1}{T_0}$ (the duty cycle).
- The spectrum follows a **sinc envelope** with main lobe width inversely proportional to $T_1$.
- **Bandwidth–duration trade-off**: narrow pulses need wide bandwidth; wide pulses need narrow bandwidth. This is fundamental and inescapable.
- The spectrum is **entirely real** because the signal is real and even.
- $1/k$ decay indicates **discontinuities** — many harmonics are needed for faithful reconstruction.
- At discontinuities, the Gibbs phenomenon causes ~9% overshoot that never vanishes.

Up next, we'll study the powerful properties that let you find FS coefficients *without* re-evaluating the integral from scratch.
