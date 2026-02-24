## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From your **A-Level Combined Maths**:
- **Trigonometry**: $\sin$, $\cos$, period of $\sin(\omega t)$ is $2\pi/\omega$
- **Complex numbers** (basic): $j^2 = -1$, polar form $re^{j\theta}$
- **Euler's formula**: $e^{j\theta} = \cos\theta + j\sin\theta$

From **Lessons 1–3**:
- Signal types: continuous vs discrete, energy vs power
- Basic operations: time shifting $x(t - t_0)$, time scaling $x(\alpha t)$, reversal $x(-t)$
- Unit impulse $\delta(t)$ and unit step $u(t)$

If any of this feels rusty, don't worry — we'll revisit what we need as we go. The goal here is a fresh start.

</details>

---

## Why Should You Care About Periodicity?

Think about the sounds you hear every day. A guitar string vibrates at a steady pitch — the same waveform repeating hundreds of times per second. Your heartbeat on an ECG monitor traces the same shape over and over. The AC mains voltage in your wall socket completes 50 cycles every second.

All of these are **periodic signals** — signals that repeat themselves exactly after a fixed time interval. And here's why this matters for engineering: periodic signals are by far the most common class of signals you'll encounter, and they have a beautiful mathematical structure that lets us decompose them into simple building blocks.

> **Why This Matters**: Everything you will learn about Fourier analysis — the single most important analytical tool in electrical engineering — rests on understanding periodicity. If you understand this concept deeply, the rest of the course unfolds naturally.

[[visual:periodic-sine-wave]]

The simplest periodic signal is the sine wave above. But periodicity is much more general than just sine waves. Let's build the formal framework.

---

## What Makes a Signal Periodic?

A signal $x(t)$ is **periodic** if there exists some positive constant $T_0$ such that:

$$x(t) = x(t + mT_0), \quad \text{for all integers } m$$

The smallest such $T_0$ is called the **fundamental period**. Let's unpack what this really means.

Pick any point on the signal — any point at all, at some time $t$. Now move forward by exactly $T_0$ seconds. You find the *identical* value. Move forward by another $T_0$ — still the same. Move backward by $T_0$ — same again. The signal is an infinite carbon copy of itself in both directions.

[[visual:signal-generator-explore]]

Play with the interactive explorer above. Notice something important: when you increase the frequency, the period gets shorter. When you decrease the frequency, the period gets longer. They are inversely related. Let's formalise this.

### The Three Fundamental Quantities

Every periodic signal is completely characterised by three related quantities. They are just different ways of expressing the same information:

| Quantity | Symbol | Definition | Units | Physical meaning |
|----------|--------|-----------|-------|-----------------|
| Fundamental period | $T_0$ | Smallest repeat interval | seconds | How long before the pattern repeats |
| Fundamental frequency | $f_0 = \frac{1}{T_0}$ | Repetitions per second | Hz | How many cycles per second |
| Angular frequency | $\omega_0 = \frac{2\pi}{T_0} = 2\pi f_0$ | Radians per second | rad/s | How fast the angle sweeps |

The angular frequency $\omega_0$ is the one you'll use most in this course, because it appears directly in the complex exponential $e^{j\omega_0 t}$.

<details>
<summary><strong>Pause & Think</strong>: The clock on your wall ticks once per second. What are T₀, f₀, and ω₀ for the tick signal?</summary>

$T_0 = 1$ second (one tick per second), so $f_0 = 1/T_0 = 1$ Hz, and $\omega_0 = 2\pi \cdot 1 = 2\pi$ rad/s $\approx 6.28$ rad/s.

</details>

---

## Working With Composite Periodic Signals

Here's where it gets interesting. Real signals are almost never pure sine waves. They are sums of multiple sinusoids at different frequencies. The question is: **when is such a sum still periodic?**

Consider the signal:

$$x(t) = 11 + 4\sin(5t) + \frac{4}{3}\sin(15t)$$

[[visual:periodic-signal-composite]]

This signal has three components:

| Component | Frequency | Period |
|-----------|-----------|--------|
| DC: $11$ | 0 | ∞ (constant) |
| $4\sin(5t)$ | $\omega_1 = 5$ | $T_1 = 2\pi/5$ |
| $\frac{4}{3}\sin(15t)$ | $\omega_2 = 15$ | $T_2 = 2\pi/15$ |

Is the sum periodic? Yes — because $\omega_2 / \omega_1 = 15/5 = 3$, which is a **rational number**. The fundamental period is $T_0 = 2\pi/5$ (the period of the **slowest** component), and $\omega_0 = 5$ rad/s.

> **Watch Out**: The fundamental period is determined by the *lowest* frequency component, not the fastest. Many students get this backwards. The fastest component (at $15$ rad/s) has the shortest period, but the *fundamental* period is the longest — it's the time it takes for *all* components to complete their respective cycles simultaneously.

[[visual:period-frequency-explorer]]

### When Is a Sum NOT Periodic?

A sum $x(t) = \sin(\omega_1 t) + \sin(\omega_2 t)$ is periodic **only if** $\omega_1/\omega_2$ is rational. If it is irrational, the two sinusoids never re-align, and the sum never exactly repeats.

For example, $\sin(\pi t) + \sin(\sqrt{2}\,t)$ is not periodic, because $\pi/\sqrt{2}$ is irrational.

<details>
<summary><strong>Pause & Think</strong>: Is x(t) = cos(6t) + sin(8t) periodic? If so, what is T₀?</summary>

The frequencies are $\omega_1 = 6$ and $\omega_2 = 8$. Their ratio is $6/8 = 3/4$ — rational! So yes, it's periodic. The fundamental frequency is $\omega_0 = \text{GCD}(6, 8) = 2$ rad/s, giving $T_0 = 2\pi/2 = \pi$ seconds.

</details>

---

## The Big Idea: Inter-Domain Analysis

Now we reach the most profound idea in this entire concept — and arguably one of the most important ideas in all of engineering.

All of your previous work has analysed signals on the **time axis** alone. You looked at $x(t)$ — a function that tells you the signal's value at every instant. But time is just one way to "look at" a signal. The same signal can be represented on a completely different axis — the **frequency axis** — and that representation is equally valid, complete, and unique.

Think of it like viewing a building. From the front, you see a rectangle. From the side, you see a different shape. Both views describe the same building, but they reveal different features. Frequency-domain analysis does exactly this for signals.

[[visual:inter-domain-block-diagram]]

> **Key Insight**: $x(t)$ in the time domain and $\{X_k\}$ in the frequency domain are two faces of the **same signal**. Neither is more "real" than the other. You can go back and forth between them without losing any information.

### Why Bother With Another Domain?

There are three compelling reasons:

1. **Simplification**: Operations that are messy in time (like convolution) become simple multiplication in frequency. You'll see this payoff in Lesson 05.
2. **Physical insight**: You can see *which frequencies* a signal contains and how strong each one is. This is invisible in the time domain.
3. **Engineering tools**: Spectrum analysers, filters, modulators, and equalizers all operate in the frequency domain. Understanding this domain makes you fluent in the language these tools speak.

---

## From Time to Frequency: The Euler's Formula Connection

The bridge between domains is **Euler's formula**:

$$e^{j\theta} = \cos\theta + j\sin\theta$$

This means every complex exponential $e^{j\omega t}$ simultaneously encodes a cosine (real part) and a sine (imaginary part) at frequency $\omega$. The complex exponential is the natural "atom" of periodic signals.

[[visual:euler-unit-circle]]

The diagram above shows $e^{j\theta}$ tracing the unit circle in the complex plane. As $\theta$ increases, the point sweeps around the circle. Its horizontal projection gives $\cos\theta$ and its vertical projection gives $\sin\theta$. This geometric picture is essential — keep it in your mind as we move forward.

Using the inverse Euler formulas:

$$\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}, \qquad \cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}$$

we can rewrite any sum of sines and cosines as a sum of complex exponentials. Let's do this for our example signal.

---

## Worked Example: Extracting the Fourier Coefficients

Starting with $x(t) = 11 + 4\sin(5t) + \frac{4}{3}\sin(15t)$:

Convert each sinusoid using $\sin\theta = (e^{j\theta} - e^{-j\theta})/(2j)$ and noting that $1/(2j) = -j/2 = (1/2)e^{-j\pi/2}$:

$$4\sin(5t) = 4 \cdot \frac{e^{j5t} - e^{-j5t}}{2j} = 2e^{-j\pi/2}\,e^{j5t} + 2e^{j\pi/2}\,e^{-j5t}$$

$$\frac{4}{3}\sin(15t) = \frac{4}{3} \cdot \frac{e^{j15t} - e^{-j15t}}{2j} = \frac{2}{3}e^{-j\pi/2}\,e^{j15t} + \frac{2}{3}e^{j\pi/2}\,e^{-j15t}$$

Combining everything, with $\omega_0 = 5$:

$$x(t) = 11\,e^{j \cdot 0 \cdot t} + 2e^{-j\pi/2}\,e^{j\omega_0 t} + 2e^{j\pi/2}\,e^{-j\omega_0 t} + \tfrac{2}{3}e^{-j\pi/2}\,e^{j3\omega_0 t} + \tfrac{2}{3}e^{j\pi/2}\,e^{-j3\omega_0 t}$$

Reading off the coefficients of $e^{jk\omega_0 t}$:

$$\boxed{X_0 = 11, \quad X_1 = 2e^{-j\pi/2}, \quad X_{-1} = 2e^{j\pi/2}, \quad X_3 = \tfrac{2}{3}e^{-j\pi/2}, \quad X_{-3} = \tfrac{2}{3}e^{j\pi/2}}$$

All other $X_k = 0$. These five complex numbers completely and uniquely represent the original time-domain signal.

---

## The Magnitude and Phase Spectra

Each coefficient $X_k$ is a complex number with a magnitude $|X_k|$ and a phase $\angle X_k$. Plotting these against $k$ gives two spectra:

[[visual:magnitude-spectrum-bar]]

[[visual:phase-spectrum-bar]]

Notice two beautiful symmetry properties for this real-valued signal:
- **Magnitude spectrum is symmetric**: $|X_{-k}| = |X_k|$ — the magnitude is the same for positive and negative harmonics
- **Phase spectrum is anti-symmetric**: $\angle X_{-k} = -\angle X_k$ — the phases are negated

These are not coincidences — they hold for **all** real-valued periodic signals. You'll study this formally in the symmetry properties concept.

---

## Building Signals From Harmonics

Now let's go the other direction. Given the coefficients $\{X_k\}$, we can reconstruct the signal by adding up the complex exponentials:

$$x(t) = \sum_{k=-\infty}^{\infty} X_k\,e^{jk\omega_0 t}$$

This is called **Fourier synthesis** — building a signal from its harmonic components. Try it yourself:

[[visual:harmonic-builder-demo]]

Start with just the DC component ($X_0 = 11$) — you get a flat line at 11. Add the fundamental ($k = \pm 1$) — you see a sine wave appear. Add the third harmonic ($k = \pm 3$) — the waveform sharpens and develops more detail. This is Fourier series in action.

[[visual:fourier-coefficients-explore]]

> **You're doing great** — this is one of the deepest ideas in the course, and you've already made it through the hardest part. Everything that follows in the next few concepts is building on exactly this foundation.

---

## Key Properties of Periodic Signals

Before we move on, let's collect the essential facts:

1. **Periodic signals are power signals**: They repeat forever, so their total energy is infinite. But their average power $P = \frac{1}{T_0}\int_{T_0} |x(t)|^2\,dt$ is finite.

2. **The DC component** $X_0$ is the **average value** of $x(t)$ over one period. For our example, $X_0 = 11$.

3. **$X_1$ is the fundamental**, $X_2$ is the second harmonic, $X_3$ is the third harmonic, and so on. Higher harmonics carry finer detail.

4. **As $|k| \to \infty$**, the coefficients $|X_k| \to 0$ for well-behaved signals. They must — because the signal has finite power.

5. **Both magnitude AND phase** are needed to reconstruct the signal. The magnitude alone tells you *how much* of each frequency is present; the phase tells you *where* each component is aligned in time.

<details>
<summary><strong>Pause & Think</strong>: If you have the magnitude spectrum |X_k| but throw away the phase spectrum ∠X_k, can you still reconstruct the original signal?</summary>

No! You would know *how much* of each harmonic is present, but not *when* each harmonic peaks. Different phase alignments produce completely different-looking signals even with identical magnitude spectra. Both spectra are essential for a complete representation.

</details>

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Confusing $T_0$ with the period of the fastest component | $T_0$ is the *largest* period — determined by the *lowest* frequency (GCD of all $\omega_k$) |
| Forgetting that $X_k$ are complex numbers | Always write $X_k = |X_k|e^{j\angle X_k}$; they have both magnitude and phase |
| Assuming the magnitude plot alone gives the full picture | You need *both* magnitude and phase to reconstruct the signal |
| Ignoring the $k = 0$ (DC) term | $X_0$ is the average — often the largest coefficient |
| Assuming any sum of sinusoids is periodic | Only if the frequency ratios are *rational* |

---

## Summary

Let's recap the key ideas that will carry you through the rest of this lesson:

- A periodic signal repeats with fundamental period $T_0$, fundamental frequency $f_0 = 1/T_0$, and angular frequency $\omega_0 = 2\pi/T_0$.
- **Inter-domain analysis** represents the same signal on the frequency axis using complex coefficients $X_k$ — this is fully equivalent to the time-domain representation.
- You extract $X_k$ by rewriting sinusoids as complex exponentials using Euler's formula (for now — the general integral method comes in the next concept).
- The magnitude and phase spectra together form a **complete, unique** representation of any periodic signal.
- This foundation enables *all* subsequent frequency-domain analysis. You're now ready for the Exponential Fourier Series.
