# Exam Preparation: Exponential Fourier Series

## Common Question Types

### Type 1: Convert Sin/Cos to Exponential Form
**Given:** $x(t) = A\cos(\omega t + \phi)$
**Find:** Fourier coefficients

**Method:**
$$A\cos(\omega t + \phi) = \frac{A}{2}e^{j\phi}e^{j\omega t} + \frac{A}{2}e^{-j\phi}e^{-j\omega t}$$

So: $X_1 = \frac{A}{2}e^{j\phi}$, $X_{-1} = \frac{A}{2}e^{-j\phi}$

### Type 2: Extract Coefficients from Composite Signal
**Given:** $x(t) = 5 + 3\cos(2t) + 4\sin(6t)$
**Find:** All non-zero $X_k$

**Solution:**
- DC: $X_0 = 5$
- cos term: $X_1 = 3/2$, $X_{-1} = 3/2$
- sin term: $X_3 = \frac{4}{2j} = 2e^{-j\pi/2}$, $X_{-3} = 2e^{j\pi/2}$

### Type 3: Sketch Magnitude/Phase Spectrum
**Given:** Fourier coefficients
**Draw:** Stem plots at k = ..., -2, -1, 0, 1, 2, ...

## Key Formulas

**Euler's formula:**
$$e^{j\theta} = \cos\theta + j\sin\theta$$

**Inverse formulas:**
$$\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}, \quad
\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$$

**Coefficient relationships:**
$$X_k = |X_k|e^{j\angle X_k}$$

## Common Mistakes

1. **Forgetting negative frequencies:** $\sin(5t)$ has both $X_1$ and $X_{-1}$
2. **Phase errors:** Remember $1/j = -j = e^{-j\pi/2}$
3. **Missing DC:** The constant term is $X_0$
4. **Wrong k values:** Match k to the frequency $k\omega_0$

## Quick Reference: Complex Numbers

| Expression | Result |
|-----------|--------|
| $1/j$ | $-j$ |
| $j^2$ | $-1$ |
| $e^{j\pi}$ | $-1$ |
| $e^{j\pi/2}$ | $j$ |
| $e^{-j\pi/2}$ | $-j$ |

## Practice Problem

**Convert:** $x(t) = 10\cos(3t - \pi/4)$

**Solution:**
$$x(t) = 10\cos(3t - \pi/4) = \frac{10}{2}e^{-j\pi/4}e^{j3t} + \frac{10}{2}e^{j\pi/4}e^{-j3t}$$

With $\omega_0 = 3$ rad/s:
- $X_1 = 5e^{-j\pi/4}$ → magnitude 5, phase -45°
- $X_{-1} = 5e^{j\pi/4}$ → magnitude 5, phase +45°

## Exam Tips

- Always identify ω₀ first (fundamental frequency)
- Express k in terms of multiples of ω₀
- Sketch spectra with proper symmetry
- Remember: for real signals, $X_{-k} = X_k^*$
