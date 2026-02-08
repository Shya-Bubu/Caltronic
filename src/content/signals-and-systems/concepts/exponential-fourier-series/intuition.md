# Exponential Fourier Series

> **Why This Matters**: Computing Fourier coefficients is the practical skill that turns theory into application. Master the coefficient formula and you can analyze any periodic signal.

---

## The Analysis Equation

Given a periodic signal $x(t)$ with period $T$, the Fourier coefficients are:

$$c_k = \frac{1}{T}\int_T x(t) e^{-jk\omega_0 t} dt$$

[[visual:analysis-equation]]

where:
- $\omega_0 = 2\pi/T$ is the fundamental frequency
- The integral is over any complete period
- $k$ ranges from $-\infty$ to $\infty$

---

## Computing Coefficients: Step by Step

### Example: Rectangular Pulse Train

[[visual:pulse-train-example]]

Let $x(t)$ be a periodic rectangular pulse train with:
- Period $T$
- Pulse width $\tau$
- Amplitude $A$

**Step 1**: Identify period and limits of integration

**Step 2**: Substitute into the formula:
$$c_k = \frac{1}{T}\int_{-\tau/2}^{\tau/2} A e^{-jk\omega_0 t} dt$$

**Step 3**: Evaluate the integral:
$$c_k = \frac{A}{T} \cdot \frac{e^{jk\omega_0\tau/2} - e^{-jk\omega_0\tau/2}}{jk\omega_0}$$

**Step 4**: Simplify using $\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$:
$$c_k = \frac{A\tau}{T} \cdot \frac{\sin(k\omega_0\tau/2)}{k\omega_0\tau/2} = \frac{A\tau}{T} \text{sinc}\left(\frac{k\omega_0\tau}{2\pi}\right)$$

---

## The Sinc Function

The **sinc function** appears constantly in Fourier analysis:

$$\text{sinc}(x) = \frac{\sin(\pi x)}{\pi x}$$

[[visual:sinc-function]]

Properties:
- $\text{sinc}(0) = 1$
- $\text{sinc}(n) = 0$ for nonzero integers $n$
- Decays as $1/x$ for large $|x|$

---

## Key Coefficient Formulas

| Signal | $c_k$ |
|--------|-------|
| Square wave | $\frac{2}{jk\pi}$ for odd $k$, 0 for even |
| Triangle wave | $\frac{-4}{k^2\pi^2}$ for odd $k$, 0 for even |
| Pulse train | $\frac{A\tau}{T}\text{sinc}(k\tau/T)$ |
| Sawtooth | $\frac{j}{k\pi}(-1)^{k+1}$ |

---

## Symmetry Properties

[[visual:symmetry-properties]]

| Signal Property | Coefficient Property |
|-----------------|---------------------|
| Real signal | $c_{-k} = c_k^*$ |
| Even signal | $c_k$ real |
| Odd signal | $c_k$ purely imaginary |
| Half-wave symmetric | Only odd harmonics |

---

## Summary

| Formula | Expression |
|---------|------------|
| Synthesis | $x(t) = \sum c_k e^{jk\omega_0 t}$ |
| Analysis | $c_k = \frac{1}{T}\int_T x(t)e^{-jk\omega_0 t}dt$ |
| DC component | $c_0 = \frac{1}{T}\int_T x(t)dt$ |

