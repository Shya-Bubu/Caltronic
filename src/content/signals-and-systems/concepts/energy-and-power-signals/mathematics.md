# Mathematical Foundations

> Rigorous definitions and calculation techniques.

---

## Energy of a Signal

For a continuous-time signal $x(t)$:

$$E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt$$

For discrete-time:
$$E = \sum_{n=-\infty}^{\infty} |x[n]|^2$$

The absolute value squared handles complex signals.

---

## Power of a Signal

For a continuous-time signal:

$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 \, dt$$

For discrete-time:
$$P = \lim_{N \to \infty} \frac{1}{2N+1} \sum_{n=-N}^{N} |x[n]|^2$$

---

## Classification Rules

| Condition | Classification |
|-----------|----------------|
| $0 < E < \infty$ | Energy signal |
| $0 < P < \infty$ | Power signal |
| $E = \infty$ and $P = 0$ | Neither (rare) |
| $E = 0$ | Zero signal |

**Important**: If $E < \infty$, then $P = 0$ (always).

---

## Worked Example 1: Rectangular Pulse

$$x(t) = \begin{cases} A & |t| \leq T \\ 0 & |t| > T \end{cases}$$

**Energy:**
$$E = \int_{-T}^{T} A^2 \, dt = A^2 \cdot 2T = 2A^2T$$

Since $E < \infty$, this is an **energy signal**.

**Power:**
$$P = 0$$ (finite energy → zero average power)

---

## Worked Example 2: Sinusoid

$$x(t) = A\cos(\omega_0 t)$$

**Energy:**
$$E = \int_{-\infty}^{\infty} A^2\cos^2(\omega_0 t) \, dt = \infty$$

**Power:**
$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} A^2\cos^2(\omega_0 t) \, dt = \frac{A^2}{2}$$

Since $P < \infty$, this is a **power signal**.

---

## Worked Example 3: Decaying Exponential

$$x(t) = e^{-at}u(t), \quad a > 0$$

**Energy:**
$$E = \int_0^{\infty} e^{-2at} \, dt = \frac{1}{2a}$$

Finite! This is an **energy signal**.

---

## For Periodic Signals

If $x(t)$ is periodic with period $T_0$:

$$P = \frac{1}{T_0} \int_0^{T_0} |x(t)|^2 \, dt$$

Average over one period equals average over all time.

---

## Key Identities

### Sinusoid Power
$$x(t) = A\cos(\omega t) \Rightarrow P = \frac{A^2}{2}$$

### DC Power
$$x(t) = A \Rightarrow P = A^2$$

### Sum of Independent Periodic Signals
$$P_{total} = P_1 + P_2 + \cdots$$

(if frequencies are harmonically unrelated)
