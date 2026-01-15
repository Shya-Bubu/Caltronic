# Exam Preparation

> Common traps, examiner framing, and grading patterns.

---

## Typical Questions

### Type 1: Classification (3-5 marks)

**Q: Classify the following as energy or power signals:**
1. $x(t) = e^{-2t}u(t)$
2. $x(t) = 5\cos(100\pi t)$
3. $x(t) = 3$ (DC)

**A:**
1. **Energy** — decays to zero, finite integral
2. **Power** — periodic, infinite energy, finite power = 25/2
3. **Power** — constant, $P = 9$

---

### Type 2: Energy Calculation (5-8 marks)

**Q: Calculate the energy of the triangular pulse:**
$$x(t) = \begin{cases} 1 - |t|/T & |t| \leq T \\ 0 & |t| > T \end{cases}$$

**A:**
$$E = 2\int_0^T (1 - t/T)^2 \, dt$$
$$= 2\int_0^T (1 - 2t/T + t^2/T^2) \, dt$$
$$= 2\left[t - t^2/T + t^3/(3T^2)\right]_0^T$$
$$= 2\left[T - T + T/3\right] = 2T/3$$

---

### Type 3: Power Calculation (5-8 marks)

**Q: Find the average power of $x(t) = 3\cos(10t) + 4\sin(10t)$**

**A:**
Method 1: Convert to single sinusoid
$$x(t) = 5\cos(10t - \phi)$$ where $5 = \sqrt{3^2 + 4^2}$
$$P = 5^2/2 = 12.5$$

Method 2: Powers add for same-frequency components
$$P = \frac{3^2}{2} + \frac{4^2}{2} = \frac{9 + 16}{2} = 12.5$$

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Forgetting the squared term | Energy/power use |x(t)|² |
| Confusing energy and power formulas | Energy = integral, Power = time-averaged integral |
| Calling sinusoid an energy signal | Sinusoids are power signals |
| Power of cosine = A² | Power of cosine = A²/2 |

---

## Key Formulas

| Formula | Meaning |
|---------|---------|
| $E = \int|x(t)|^2 dt$ | Total energy |
| $P = \lim \frac{1}{2T}\int|x(t)|^2 dt$ | Average power |
| $P = A^2/2$ | Power of sinusoid amplitude A |
| $P = A^2$ | Power of DC signal A |

---

## Practice Problem

**Q: Find energy and power for $x(t) = e^{-t}u(t) + e^{t}u(-t)$**

**A:** This is $e^{-|t|}$ (two-sided exponential)

$$E = \int_{-\infty}^{\infty} e^{-2|t|} dt = 2\int_0^{\infty} e^{-2t} dt = 2 \cdot \frac{1}{2} = 1$$

Energy = 1, Power = 0. **Energy signal**.
