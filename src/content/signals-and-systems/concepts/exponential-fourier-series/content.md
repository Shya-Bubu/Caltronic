## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From the previous concept:
- **Periodic signals**: $x(t) = x(t + mT_0)$ with fundamental period $T_0$
- **Fundamental frequency**: $\omega_0 = 2\pi/T_0$
- **Euler's formula**: $e^{j\theta} = \cos\theta + j\sin\theta$
- **Inter-domain idea**: the same signal has equivalent representations in time and frequency

</details>

---

## 🎯 The Central Question

The previous concept showed that trigonometric periodic signals can be expanded into complex exponentials using Euler's formula. But **what about periodic signals that aren't neat sines and cosines?** How do we find the Fourier coefficients of a square wave, a triangular wave, or *any* arbitrary periodic waveform?

The answer is the **Exponential Fourier Series (EFS)** — a pair of formulas that form the backbone of all frequency-domain analysis for periodic signals.

---

## 📖 The EFS Pair

### Synthesis equation — building $x(t)$ from its components

Any periodic signal $x(t)$ with fundamental frequency $\omega_0$ can be written as:

$$x(t) = \sum_{k=-\infty}^{\infty} X_k \, e^{jk\omega_0 t}$$

This says: $x(t)$ is an **infinite weighted sum** of complex exponentials $e^{jk\omega_0 t}$, where $k$ ranges over all integers. The weight on the $k$-th exponential is the complex number $X_k$.

### Analysis equation — finding the coefficients

Given $x(t)$, the coefficients are computed by:

$$X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$$

The integral runs over **any one complete period** $T_0$. You are free to choose whichever interval is most convenient (e.g. $[0, T_0]$ or $[-T_0/2, +T_0/2]$).

> **The analysis equation is the workhorse of this topic.** Almost every exam problem requires evaluating this integral for a specific signal.

---

## 🔬 Understanding the Analysis Integral

### Why does it work?

The key insight lies in the **orthogonality** of complex exponentials. When you multiply $x(t)$ by $e^{-jk\omega_0 t}$ and integrate over $T_0$:

1. Every term $X_m \, e^{jm\omega_0 t}$ with $m \neq k$ produces $\int_{T_0} e^{j(m-k)\omega_0 t}\,dt = 0$
2. Only the term with $m = k$ survives, giving $X_k \cdot T_0$
3. Dividing by $T_0$ isolates $X_k$

This is like a "frequency sieve" — the operator $\frac{1}{T_0}\int_{T_0}(\cdot)\,e^{-jk\omega_0 t}\,dt$ extracts *exactly* the $k$-th coefficient and discards all others.

### Why zero?

For $m \neq k$, the exponent $e^{j(m-k)\omega_0 t}$ is a complex exponential at a non-zero harmonic frequency. Its real part is $\cos((m-k)\omega_0 t)$ and its imaginary part is $\sin((m-k)\omega_0 t)$. Both integrate to zero over a complete number of cycles — positive and negative areas cancel perfectly.

### The special case: $k = 0$

$$X_0 = \frac{1}{T_0}\int_{T_0} x(t)\,dt$$

This is simply the **average value** (DC component) of the signal. The $e^{-j \cdot 0 \cdot t} = 1$ factor disappears, leaving a plain average.

---

## 📐 Step-by-Step: Computing EFS Coefficients

Follow this systematic procedure for any periodic signal:

### Step 1: Identify $T_0$ and $\omega_0$
From the signal definition or diagram, determine the fundamental period and frequency.

### Step 2: Compute $X_0$ separately
$$X_0 = \frac{1}{T_0}\int_{T_0} x(t)\,dt$$
This is often simpler than the general case since there's no exponential factor.

### Step 3: Compute $X_k$ for $k \neq 0$
$$X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$$

**Choose your integration window wisely!** Pick the interval that makes the integral simplest. For symmetric signals, $[-T_0/2, +T_0/2]$ often works best.

### Step 4: Express $X_k$ in polar form
Write $X_k = |X_k|\,e^{j\angle X_k}$ to prepare for magnitude and phase plots.

### Step 5: Draw the magnitude and phase spectra
Plot $|X_k|$ vs $k$ and $\angle X_k$ vs $k$ as stem (line spectrum) plots.

---

## 🧠 Key Properties of EFS Coefficients

| Property | Statement |
|----------|-----------|
| $X_k$ is complex | Each coefficient has magnitude and phase |
| DC component | $X_0$ = average value of $x(t)$ |
| Harmonics | $X_1$ = fundamental, $X_2$ = 2nd harmonic, $X_3$ = 3rd harmonic |
| Decay | $|X_k| \to 0$ as $|k| \to \infty$ for finite-power signals |
| Convergence | Adding more harmonics gives a better approximation to $x(t)$ |

---

## 💡 Important Observations

### The Gibbs phenomenon
When approximating a discontinuous signal (like a square wave) with a finite number of harmonics, there is always an **overshoot** near the discontinuity of about 9%. This overshoot does *not* diminish as you add more terms — it just gets narrower. This is the Gibbs phenomenon.

### Choosing the integration interval
The analysis integral can be evaluated over *any* contiguous interval of length $T_0$. Smart choices can dramatically simplify the maths:
- For a pulse centred at the origin: use $[-T_0/2, +T_0/2]$
- For a signal starting at $t = 0$: use $[0, T_0]$

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Forgetting the $1/T_0$ factor | The analysis equation divides by $T_0$ |
| Integrating over the wrong interval | Must integrate over exactly one period $T_0$ |
| Confusing the sign in the exponent | Analysis: $e^{-jk\omega_0 t}$ (minus sign). Synthesis: $e^{+jk\omega_0 t}$ (plus sign) |
| Computing only positive $k$ values | $k$ runs from $-\infty$ to $+\infty$ — negative harmonics exist |
| Assuming $X_k$ is always real | $X_k$ is complex in general; it's real only for even, real signals |

---

## 📝 Summary

- The **Exponential Fourier Series** consists of the analysis–synthesis pair.
- **Analysis**: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$ extracts the $k$-th coefficient.
- **Synthesis**: $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$ reconstructs the signal from all coefficients.
- **Orthogonality** of complex exponentials is the mathematical engine behind the extraction process.
- $X_0$ is the DC/average value; $X_1$ is the fundamental; higher $k$ are harmonics.
- Choose your integration interval strategically to simplify computation.
