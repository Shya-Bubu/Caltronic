# Lesson 05 Synthesis

## Key Formulas

**Forward Transform**: $X(\omega) = \int_{-\infty}^{\infty} x(t) e^{-j\omega t} dt$

**Inverse Transform**: $x(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} X(\omega) e^{j\omega t} d\omega$

**Convolution Theorem**: $x * h \leftrightarrow X \cdot H$

## Key Pairs

| Signal | Transform |
|--------|-----------|
| $\delta(t)$ | $1$ |
| $1$ | $2\pi\delta(\omega)$ |
| $e^{-at}u(t)$ | $\frac{1}{a+j\omega}$ |
| $\text{rect}(t)$ | $\text{sinc}(\omega/2\pi)$ |

## Looking Ahead

The Laplace transform extends Fourier analysis to include transient behavior and stability analysis.
