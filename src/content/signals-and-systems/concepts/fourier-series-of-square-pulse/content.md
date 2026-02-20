## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From the previous concepts:
- **EFS analysis equation**: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$
- **Computing $X_0$** as the average value
- **Choosing the integration interval** strategically

</details>

---

## 🎯 Why the Square Pulse Train?

The square pulse train is the **first non-trivial worked example** of the EFS in action. It's important for three reasons:

1. It produces a **closed-form answer** involving the sinc function — a function you'll encounter everywhere in signal processing.
2. It demonstrates how a **discontinuous, piecewise** signal decomposes into smooth sinusoids.
3. It directly relates to the **spectrum analyser laboratory** — you will literally see these coefficients on the screen.

---

## 📖 The Signal

A square pulse train $x(t)$ is defined as follows:

- Amplitude: $1$ (within the pulse), $0$ (outside)
- Pulse width: $2T_1$ (centred at the origin)
- Fundamental period: $T_0$

Mathematically, define one pulse:

$$g(t) = \begin{cases} 1, & |t| < T_1 \\ 0, & \text{otherwise} \end{cases}$$

Then the periodic extension is:

$$x(t) = \sum_{m=-\infty}^{\infty} g(t - mT_0)$$

This creates an infinite train of identical rectangular pulses, each of width $2T_1$, spaced $T_0$ apart.

---

## 🔬 Computing the FS Coefficients

### Step 1: $X_0$ (DC component)

$$X_0 = \frac{1}{T_0}\int_{-T_0/2}^{+T_0/2} x(t)\,dt = \frac{1}{T_0}\int_{-T_1}^{+T_1} 1 \cdot dt = \frac{2T_1}{T_0}$$

This makes intuitive sense: $X_0$ is the fraction of the period during which the pulse is "on." It's the **duty cycle**.

### Step 2: $X_k$ for $k \neq 0$

$$X_k = \frac{1}{T_0}\int_{-T_1}^{+T_1} 1 \cdot e^{-jk\omega_0 t}\,dt$$

We chose $[-T_0/2, +T_0/2]$ as our integration window, but since $x(t) = 0$ outside $[-T_1, +T_1]$, we only integrate where the signal is non-zero.

**Evaluating the integral:**

$$X_k = \frac{1}{T_0}\left[\frac{e^{-jk\omega_0 t}}{-jk\omega_0}\right]_{-T_1}^{+T_1}$$

$$= \frac{1}{T_0} \cdot \frac{e^{-jk\omega_0 T_1} - e^{+jk\omega_0 T_1}}{-jk\omega_0}$$

$$= \frac{1}{T_0} \cdot \frac{-(e^{jk\omega_0 T_1} - e^{-jk\omega_0 T_1})}{-jk\omega_0}$$

$$= \frac{1}{T_0} \cdot \frac{2\sin(k\omega_0 T_1)}{k\omega_0}$$

Since $\omega_0 T_0 = 2\pi$:

$$\boxed{X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}}$$

### Observation: $X_k$ is entirely **real**

This is because the square pulse train (centred at the origin) is an **even** signal: $x(t) = x(-t)$. For even, real signals, all FS coefficients are real.

---

## 📐 The Sinc Envelope

The formula $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$ follows a **sinc-like envelope**:

$$\text{sinc}(u) = \frac{\sin(\pi u)}{\pi u}$$

Key features of this spectrum:

| Feature | Detail |
|---------|--------|
| **Main lobe** | Centred at $k = 0$, containing most of the energy |
| **Zero crossings** | At $k = \pm\frac{n\pi}{\omega_0 T_1}$ for integer $n$ |
| **Decay** | Envelope decays as $1/(k\pi)$ — slow decay (due to discontinuities) |
| **All real** | No phase variation (signal is even and real) |

### Example: $T_0 = 4$, $2T_1 = 1$ (25% duty cycle)

- $\omega_0 = 2\pi/4 = \pi/2$
- $T_1 = 0.5$
- $X_0 = 2 \times 0.5 / 4 = 0.25$
- $X_1 = \sin(\pi/4)/\pi = \frac{\sqrt{2}/2}{\pi} \approx 0.225$
- $X_2 = \sin(\pi/2)/(2\pi) = 1/(2\pi) \approx 0.159$

---

## 💡 Physical Interpretation

### What does the spectrum tell us?

1. **Main lobe width** $\propto 1/T_1$: narrower pulses → wider spectrum → higher bandwidth needed
2. **Slow $1/k$ decay**: the discontinuities in the square pulse require many high harmonics to represent faithfully — this is a **wideband** signal
3. **DC component** = duty cycle: the average value is simply the fraction of time the pulse is high

### The bandwidth–duration trade-off

> **Narrow pulses need wide bandwidth; wide pulses need narrow bandwidth.**

This is a fundamental trade-off that appears everywhere: radar, communications, audio, and image processing. The square pulse train is the canonical example.

---

## 🔗 Convergence and Reconstruction

If you truncate the series and sum only $N$ harmonics:

$$x_N(t) = \sum_{k=-N}^{N} X_k\,e^{jk\omega_0 t}$$

- For small $N$: smooth, rounded waveform (misses the sharp edges)
- For large $N$: good approximation, but with Gibbs overshoot at the edges (~9%)
- As $N \to \infty$: converges to $x(t)$ at all continuous points; converges to the midpoint at discontinuities

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Using wrong limits for the integral | Only integrate where $x(t) \neq 0$ (i.e., $[-T_1, +T_1]$) |
| Forgetting to simplify $\omega_0 T_0 = 2\pi$ | This cancellation gives the clean $\frac{1}{k\pi}$ factor |
| Confusing $2T_1$ (pulse width) with $T_1$ | The pulse extends from $-T_1$ to $+T_1$, so the total width is $2T_1$ |
| Expecting complex $X_k$ | The centred square pulse is even → $X_k$ is real |

---

## 📝 Summary

- The square pulse train with amplitude 1, width $2T_1$, period $T_0$ has: $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$, $X_0 = \frac{2T_1}{T_0}$
- The spectrum follows a **sinc envelope** with main lobe width inversely proportional to $T_1$
- Narrow pulses = wide bandwidth (many harmonics needed); wide pulses = narrow bandwidth
- This is a **real-valued** spectrum because the signal is real and even
- The $1/k$ decay rate is characteristic of signals with **discontinuities**
