# Pulling It All Together

You've now made the leap from the Fourier Series to the Fourier Transform — from periodic signals to *all* signals.

## The Big Picture

The transition from FS to FT is one of the most elegant ideas in all of mathematics:
- **Fourier Series**: periodic signals → discrete spectrum (line spectrum at multiples of $\omega_0$)
- **Fourier Transform**: aperiodic signals → continuous spectrum ($X(j\omega)$ is a function of all $\omega$)

The key insight is that as $T_0 \to \infty$, $\omega_0 \to 0$, and the discrete lines merge into a continuous curve. The summation becomes an integral. The coefficients $X_k$ become the spectral density $X(j\omega)$.

## What You've Learned

1. **The FT definition** — the analysis integral $X(j\omega) = \int_{-\infty}^{\infty} x(t) e^{-j\omega t} dt$ and the synthesis integral that recovers $x(t)$
2. **Key transform pairs** — exponential decay $\leftrightarrow$ Lorentzian, rectangular pulse $\leftrightarrow$ sinc function
3. **Spectrum interpretation** — magnitude spectrum shows energy distribution, phase spectrum shows timing
4. **Properties** — linearity, time shift (adds linear phase), frequency shift (modulation), differentiation ($j\omega$ in frequency)

## Looking Ahead

In the next lesson, you'll extend these properties further — time scaling, convolution theorem, and the frequency response of LTI systems. The convolution property is especially powerful: it turns the time-domain convolution integral into simple multiplication in the frequency domain, which is why engineers love working in the frequency domain.
