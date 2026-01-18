# Synthesis: Fourier Series Part I

## Key Takeaways

### 1. Periodic Signals Have Structure
Any signal satisfying x(t) = x(t + T₀) can be analyzed using Fourier methods. The fundamental frequency ω₀ = 2π/T₀ sets the spacing between harmonics.

### 2. The Fourier Series Decomposition
$$x(t) = \sum_{k=-\infty}^{\infty} X_k e^{jk\omega_0 t}$$

This says: every periodic signal is a weighted sum of complex exponentials at integer multiples of ω₀.

### 3. Computing Coefficients
$$X_k = \frac{1}{T_0} \int_{T_0} x(t) e^{-jk\omega_0 t} dt$$

The integral "picks out" how much of each frequency component exists in x(t).

### 4. Properties Save Time
- **Linearity:** Combine signals → combine coefficients
- **Time Shift:** Shifts only affect phase, not magnitude
- **Scaling:** Compress in time → expand in frequency
- **Conjugate Symmetry:** Real signals have X₋k = Xk*

## Common Exam Patterns

1. Given x(t) as sum of sines/cosines, find Xk directly using Euler's formula
2. Compute Xk for a square/triangular pulse train using the analysis equation
3. Apply properties to find coefficients of shifted/scaled signals
4. Sketch magnitude and phase spectra

## Connections to Future Topics

- **Fourier Transform:** Extension to non-periodic signals (Lesson 05+)
- **Sampling Theory:** Why Nyquist rate matters
- **Filter Design:** Shaping frequency content
- **Laplace Transform:** Generalization with complex frequency s = σ + jω

## Study Strategy

1. Master Euler's formula conversions (sin ↔ complex exponentials)
2. Practice the analysis integral on standard waveforms
3. Memorize the 5 key properties and their proofs
4. Understand why time operations affect frequency differently
