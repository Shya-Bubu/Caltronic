# Mathematical Foundations

> Formal definitions and the sampling theorem.

---

## Formal Definitions

### Continuous-Time Signal

A function $x: \mathbb{R} \rightarrow \mathbb{R}$ (or $\mathbb{C}$)

$$x(t), \quad t \in \mathbb{R}$$

The signal is defined for every real value of $t$.

### Discrete-Time Signal

A function $x: \mathbb{Z} \rightarrow \mathbb{R}$ (or $\mathbb{C}$)

$$x[n], \quad n \in \mathbb{Z}$$

The signal is defined only for integer values of $n$.

---

## Sampling: CT to DT

Given a continuous-time signal $x(t)$ and sampling period $T_s$:

$$x[n] = x(nT_s), \quad n \in \mathbb{Z}$$

The discrete signal is obtained by evaluating the continuous signal at multiples of $T_s$.

### Sampling Frequency
$$f_s = \frac{1}{T_s} \quad \text{(Hz)}$$

### Angular Sampling Frequency
$$\Omega_s = \frac{2\pi}{T_s} = 2\pi f_s \quad \text{(rad/s)}$$

---

## The Nyquist-Shannon Sampling Theorem

> **Theorem**: A bandlimited signal with maximum frequency $f_{max}$ can be perfectly reconstructed from its samples if:
> $$f_s > 2f_{max}$$

The minimum sampling rate $f_N = 2f_{max}$ is called the **Nyquist rate**.

### Implications
- Sample at Nyquist rate or higher: **perfect reconstruction possible**
- Sample below Nyquist: **aliasing occurs**, information lost forever

---

## Mathematical Operations

| Operation | Continuous-Time | Discrete-Time |
|-----------|-----------------|---------------|
| **Differentiation** | $\frac{dx(t)}{dt}$ | $x[n] - x[n-1]$ (first difference) |
| **Integration** | $\int x(\tau) d\tau$ | $\sum_{k=-\infty}^{n} x[k]$ |
| **Convolution** | $\int x(\tau)h(t-\tau)d\tau$ | $\sum_{k=-\infty}^{\infty} x[k]h[n-k]$ |

Notice: **Integrals ↔ Summations**

---

## Common CT and DT Signals

### Continuous-Time Sinusoid
$$x(t) = A\cos(\omega_0 t + \phi)$$

Where:
- $\omega_0$ = angular frequency (rad/s)
- Period: $T_0 = \frac{2\pi}{\omega_0}$

### Discrete-Time Sinusoid
$$x[n] = A\cos(\Omega_0 n + \phi)$$

Where:
- $\Omega_0$ = digital frequency (rad/sample)
- Periodic if $\frac{\Omega_0}{2\pi}$ is rational

---

## Important Distinction

### CT: Infinite Resolution
- Between any two points, there are infinite more
- $x(1.5)$, $x(1.55)$, $x(1.555)$... all defined

### DT: Finite Samples
- Only integer indices exist
- $x[1]$, $x[2]$... but NOT $x[1.5]$
- Between samples is undefined, not zero

---

## System Classifications

### Continuous-Time Systems
$$y(t) = \mathcal{T}\{x(t)\}$$

Example: RC circuit, described by differential equation:
$$RC\frac{dy(t)}{dt} + y(t) = x(t)$$

### Discrete-Time Systems
$$y[n] = \mathcal{T}\{x[n]\}$$

Example: Moving average filter:
$$y[n] = \frac{1}{M}\sum_{k=0}^{M-1} x[n-k]$$
