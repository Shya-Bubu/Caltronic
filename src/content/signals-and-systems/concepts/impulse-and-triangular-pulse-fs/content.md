## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- EFS analysis equation: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$
- Delta function sifting property: $\int f(t)\delta(t-t_0)\,dt = f(t_0)$
- Square pulse FS pair from Lesson 04
- Differentiation property: $x'(t) \leftrightarrow jk\omega_0 X_k$
- Relationship between step function and delta function: $\frac{d}{dt}u(t) = \delta(t)$

</details>

---

## 🎯 Why These Two Pairs?

The **impulse train** and **triangular pulse train** are two fundamental FS pairs that every engineer should know by heart. Together with the square pulse train from Lesson 04, they form the core set of "building blocks" for Fourier analysis.

- The impulse train has a beautifully simple spectrum (all coefficients equal!)
- The triangular pulse demonstrates the power of the differentiation property as a derivation tool

---

## 📖 FS of the Impulse Train

### Definition

The impulse train (or Dirac comb) with period $T_0$ is:

$$\delta_{T_0}(t) = \sum_{n=-\infty}^{\infty} \delta(t - nT_0)$$

It's a sequence of equally spaced delta functions, one every $T_0$ seconds.

### Finding $X_0$

$$X_0 = \frac{1}{T_0}\int_{-T_0/2}^{T_0/2} \delta(t)\,dt = \frac{1}{T_0} \cdot 1 = \frac{1}{T_0}$$

We chose the integration window $[-T_0/2, T_0/2]$ so only $\delta(t)$ at $t = 0$ falls inside.

### Finding $X_k$

$$X_k = \frac{1}{T_0}\int_{-T_0/2}^{T_0/2} \delta(t)\,e^{-jk\omega_0 t}\,dt$$

By the sifting property, $\delta(t)$ picks out the value of $e^{-jk\omega_0 t}$ at $t = 0$:

$$X_k = \frac{1}{T_0} \cdot e^{0} = \frac{1}{T_0}$$

### The result

$$X_k = \frac{1}{T_0} \quad \text{for ALL } k$$

**Every single FS coefficient is the same.** This is remarkable and deeply meaningful.

### Interpretation: Why Are All Coefficients Equal?

The delta function is the **sharpest possible signal** — it has zero width and infinite height. Sharp signals require high-frequency content (remember the sharpening discussion from the differentiation property). But the impulse is so sharp that even at $k \to \infty$, the high-frequency components don't decay. It has **infinite bandwidth**.

Compare this with the square pulse, where $X_k \propto \frac{\sin(k\omega_0 T_1)}{k\pi}$, which decays as $1/k$. The square pulse has sharp edges but finite width — it needs high frequencies but they eventually diminish.

### Symmetry Check

The impulse train is **real and even** ($\delta(-t) = \delta(t)$). Our symmetry properties say the coefficients should be purely real and even. Indeed, $X_k = 1/T_0$ is real and the same for all $k$ ✓

---

## 📖 FS of the Triangular Pulse Train

### Setup

Consider a triangular waveform with period $T_0 = 2$:
- Rises linearly from 0 to 1 over $[0, 1]$
- Falls linearly from 1 to 0 over $[1, 2]$
- Repeats periodically

The function in one period $[0, 2]$: $x(t) = t/2$ for $0 \leq t \leq 2$ (simplified example from the lecture).

### The Naïve Approach (Don't Do This)

Substitute into the analysis integral: $X_k = \frac{1}{2}\int_0^2 \frac{t}{2} e^{-jk\pi t}\,dt$

This requires integration by parts. It works, but it's tedious and error-prone for more complex waveforms.

### The Smart Approach: Differentiate First

**Step 1: Find $X_0$ directly** (always do this first)

$$X_0 = \frac{1}{T_0}\int_0^{T_0} x(t)\,dt = \text{area under triangle}/T_0 = \frac{1}{2}$$

**Step 2: Differentiate x(t)**

$$x'(t) = \frac{1}{2} \text{ (the slope)} - \delta(t-nT_0) \text{ (at jumps)}$$

The derivative has two parts:
- A constant $1/2$ between jump points (the gradient of the ramp)
- Negative delta functions at each discontinuity (where the triangle drops from 1 back to 0)

**Step 3: Find $X'_k$**

The constant part contributes to $X'_0$ only (DC). For $k \neq 0$, only the impulse train contributes:

$$X'_k = -\frac{1}{T_0} \quad (k \neq 0)$$

(Impulse train with spacing $T_0$ and amplitude $-1$)

**Step 4: Recover $X_k$**

$$X_k = \frac{X'_k}{jk\omega_0} = \frac{-1/T_0}{jk\omega_0}$$

Substitute $\omega_0 = 2\pi/T_0$:

$$X_k = \frac{-1/T_0}{jk \cdot 2\pi/T_0} = \frac{-1}{j2\pi k} = \frac{j}{2\pi k}$$

### Why the Smart Method Wins

| Method | Steps | Difficulty |
|--------|-------|-----------|
| Direct integration | Integration by parts (possibly repeated) | Tedious |
| Differentiation property | Differentiate (trivial) → known pair → divide | Simple |

For parabolic or higher-order waveforms, the advantage is even greater — you might need to differentiate twice.

---

## 📐 Standard FS Pairs Summary

| Signal | $X_k$ | Key feature |
|--------|--------|-------------|
| Square pulse train | $\frac{\sin(k\omega_0 T_1)}{k\pi}$ | Decays as $1/k$ (sharp edges) |
| Impulse train | $\frac{1}{T_0}$ (all $k$) | No decay (infinitely sharp) |
| Triangular pulse | $\propto \frac{1}{k^2}$ | Faster decay (smoother signal) |

Observe the pattern: **smoother signal → faster coefficient decay**. Triangular (smooth) decays as $1/k^2$; square (sharp edges) as $1/k$; impulse (infinitely sharp) doesn't decay at all.

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Forgetting delta functions when differentiating discontinuous signals | Finite jumps produce delta functions in the derivative |
| Trying to integrate with the naïve method for complex waveforms | Use differentiation property — it's almost always simpler |
| Thinking the impulse train FS should decay | It doesn't — the delta function has infinite bandwidth |
| Not finding $X_0$ separately | Always compute $X_0$ first, then use properties for $k \neq 0$ |

---

## 📝 Summary

- **Impulse train**: $X_k = 1/T_0$ for all $k$ — flat spectrum, infinite bandwidth
- **Triangular pulse**: derived via differentiation property, decays as $1/k^2$
- The "differentiate → find FS of simpler signal → divide by $jk\omega_0$" technique is a powerful exam tool
- Smoother signals have faster-decaying FS coefficients
