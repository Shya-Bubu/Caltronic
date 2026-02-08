# Exam Focus: Exponential Fourier Series

## Must-Know Formula

$$c_k = \frac{1}{T}\int_T x(t) e^{-jk\omega_0 t} dt$$

## Quick Coefficient Calculations

- DC: $c_0 = $ average value = $(1/T)\int_T x(t)dt$
- Pulse train: $c_k = (A\tau/T)\text{sinc}(k\tau/T)$
- Square wave: $c_k = 2/(jk\pi)$ for odd k only

## Symmetry Shortcuts

- Real signal → $c_{-k} = c_k^*$
- Even signal → $c_k$ real  
- Odd signal → $c_k$ imaginary
- No DC → $c_0 = 0$

## Common Mistakes

- Wrong integration limits
- Forgetting factor of 1/T
- Sign errors in exponent
