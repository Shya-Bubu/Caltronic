## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From **Lessons 1–3**:
- **Signal types**: continuous vs discrete, energy vs power
- **Basic operations**: time shifting $x(t - t_0)$, time scaling $x(\alpha t)$, reversal $x(-t)$
- **Unit impulse** $\delta(t)$ and unit step $u(t)$
- **Euler's formula**: $e^{j\theta} = \cos\theta + j\sin\theta$

</details>

---

## 🎯 Why Inter-Domain Analysis?

All of your previous work analysed signals on the **time axis** alone. But time is just one way to "look at" a signal. The same signal can be represented on a completely different axis — say the **frequency axis** — and that representation is *equally valid* and *uniquely identifies* the same signal.

Think of it like this: if you look at a building from the front, you see a rectangle. From the side, you see a different rectangle. Both views describe the same building, but they emphasise different features. Frequency-domain analysis does exactly this for signals.

### Why bother with another domain?

1. **Simplification**: operations that are messy in time (like convolution) become simple multiplication in frequency.
2. **Physical insight**: you can see *which frequencies* a signal contains and how strong they are.
3. **Engineering tools**: spectrum analysers, filters, and modulators all operate in the frequency domain.

> The key insight: $x(t)$ in the time domain and $X(f)$ in the frequency domain are two faces of the **same** signal. Neither is more "real" than the other.

---

## 📖 Periodic Signals — Formal Definition

A signal $x(t)$ is **periodic** if it satisfies:

$$x(t) = x(t + mT_0), \quad m \in \mathbb{Z}$$

for some positive constant $T_0$. The smallest such $T_0$ is the **fundamental period**.

### What does this mean geometrically?

Pick any point on the signal at time $t$. Move forward by exactly $T_0$ seconds. You find the *identical* value. Move forward by $2T_0$, $3T_0$, ... — still the same. The signal repeats itself indefinitely in both directions.

### The "building blocks" of periodicity

Every periodic signal is characterised by three related quantities:

| Quantity | Symbol | Definition | Units |
|----------|--------|-----------|-------|
| Fundamental period | $T_0$ | Smallest repeat interval | seconds |
| Fundamental frequency | $f_0 = \frac{1}{T_0}$ | Repetitions per second | Hz |
| Angular frequency | $\omega_0 = \frac{2\pi}{T_0} = 2\pi f_0$ | Radians per second | rad/s |

### Quick check: is it periodic?

Given $x(t) = 11 + 4\sin(5t) + \frac{4}{3}\sin(15t)$:

- The $\sin(5t)$ term has period $\frac{2\pi}{5}$
- The $\sin(15t)$ term has period $\frac{2\pi}{15}$
- Both periods are multiples of $\frac{2\pi}{15}$

The fundamental period is $T_0 = \frac{2\pi}{5}$ (the *largest* period among the components), and $\omega_0 = 5$ rad/s.

> **Common trap**: the fundamental period is *not* the period of the fastest component — it's determined by the component with the *lowest* frequency (the GCD of all frequencies).

---

## 🔬 Inter-Domain Representation

The idea of inter-domain analysis is beautifully simple:

> **Every periodic signal can be written as a sum of complex exponentials** $e^{jk\omega_0 t}$, each weighted by a complex coefficient $X_k$.

This means that instead of describing the signal as "the voltage that wiggles like *this* over time," we can equivalently say: "this signal has an 11-unit DC component, a sinusoid of amplitude 4 at frequency $\omega_0 = 5$, and a sinusoid of amplitude $\frac{4}{3}$ at $3\omega_0 = 15$."

### From time to coefficients — the example

For $x(t) = 11 + 4\sin(5t) + \frac{4}{3}\sin(15t)$:

Using Euler's formula, $\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$:

$$x(t) = 11 + 4 \cdot \frac{e^{j5t} - e^{-j5t}}{2j} + \frac{4}{3} \cdot \frac{e^{j15t} - e^{-j15t}}{2j}$$

Simplifying the $\frac{1}{2j}$ terms using $\frac{1}{j} = -j = e^{-j\pi/2}$:

$$x(t) = 11\,e^{j \cdot 0 \cdot t} + 2e^{-j\pi/2}\,e^{j5t} + \frac{2}{3}e^{-j\pi/2}\,e^{j15t} + 2e^{j\pi/2}\,e^{-j5t} + \frac{2}{3}e^{j\pi/2}\,e^{-j15t}$$

So the Fourier Series coefficients are:

$$X_0 = 11, \quad X_1 = 2e^{-j\pi/2}, \quad X_3 = \frac{2}{3}e^{-j\pi/2}, \quad X_{-1} = 2e^{j\pi/2}, \quad X_{-3} = \frac{2}{3}e^{j\pi/2}$$

### Magnitude and phase plots

The coefficients form two plots on the $k$ axis:
- **Magnitude spectrum** $|X_k|$: shows $11$ at $k=0$, $2$ at $k=\pm1$, $\frac{2}{3}$ at $k=\pm3$
- **Phase spectrum** $\angle X_k$: shows $-\pi/2$ at $k=+1,+3$ and $+\pi/2$ at $k=-1,-3$

These two plots together are a **complete, unique** representation of the original signal — no information is lost.

---

## 🧠 Key Properties of Periodic Signals

1. **Periodic signals are power signals**: they have infinite energy but finite average power.
2. **The DC component** $X_0$ is exactly the average value of $x(t)$ over one period.
3. **$X_1$ is the fundamental component**, $X_2$ is the second harmonic, $X_3$ is the third harmonic, etc.
4. **Higher harmonics carry finer detail** — the "ripples" in the signal shape.
5. As $k \to \infty$, the coefficients $|X_k| \to 0$ for well-behaved signals (they must, because the signal has finite power).

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Confusing $T_0$ with the period of the fastest component | $T_0$ is the *largest* period — determined by the *lowest* frequency |
| Forgetting that $X_k$ are complex numbers | Always write $X_k = |X_k|e^{j\angle X_k}$ or $a + jb$ |
| Assuming the magnitude plot is the full picture | You need *both* magnitude and phase to reconstruct the signal |
| Ignoring the $k=0$ (DC) term | $X_0$ is the average — it's often the largest coefficient |

---

## 📝 Summary

- A periodic signal repeats with fundamental period $T_0$ and fundamental frequency $\omega_0 = 2\pi/T_0$.
- **Inter-domain analysis** represents the same signal on the frequency axis using complex coefficients $X_k$.
- The Fourier Series coefficients $X_k$ are complex numbers with magnitude $|X_k|$ and phase $\angle X_k$.
- The magnitude and phase spectra together form a complete, unique representation of any periodic signal.
- This foundation enables *all* subsequent frequency-domain analysis in signals and systems.
