# Fourier Transform Properties

> **Why This Matters**: These properties transform difficult transforms into easy ones. Master the duality property and you can derive new pairs from known ones instantly.

---

## Key Properties Table

[[visual:properties-overview]]

| Property | Time Domain | Frequency Domain |
|----------|-------------|------------------|
| Linearity | $ax + by$ | $aX + bY$ |
| Time Shift | $x(t-t_0)$ | $e^{-j\omega t_0}X(\omega)$ |
| Freq Shift | $e^{j\omega_0 t}x(t)$ | $X(\omega - \omega_0)$ |
| Scaling | $x(at)$ | $\frac{1}{|a|}X(\omega/a)$ |
| Differentiation | $dx/dt$ | $j\omega X(\omega)$ |
| Convolution | $x * h$ | $X \cdot H$ |
| Multiplication | $x \cdot h$ | $\frac{1}{2\pi}X * H$ |
| Duality | $X(t)$ | $2\pi x(-\omega)$ |

---

## Time-Frequency Duality

The most elegant property:

$$\text{If } x(t) \leftrightarrow X(\omega), \text{ then } X(t) \leftrightarrow 2\pi x(-\omega)$$

[[visual:duality]]

**Example**: Since $e^{-at}u(t) \leftrightarrow \frac{1}{a+j\omega}$,
$$\frac{1}{a+jt} \leftrightarrow 2\pi e^{a\omega}u(-\omega)$$

---

## Modulation Property

Multiplying by $e^{j\omega_0 t}$ shifts the spectrum:

$$e^{j\omega_0 t}x(t) \leftrightarrow X(\omega - \omega_0)$$

[[visual:modulation]]

This is the basis of AM radio, mixers, and frequency shifting.

---

## Parseval's Theorem

Energy in time = energy in frequency:

$$\int_{-\infty}^{\infty}|x(t)|^2 dt = \frac{1}{2\pi}\int_{-\infty}^{\infty}|X(\omega)|^2 d\omega$$

---

## Summary

Properties let you:
1. Derive new transform pairs from known ones
2. Avoid difficult integrals
3. Understand how operations in one domain affect the other

