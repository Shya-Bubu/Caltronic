# Mathematics of Exponential Fourier Series

## Synthesis Equation

The **Fourier Series synthesis** (or reconstruction) equation:
$$x(t) = \sum_{k=-\infty}^{\infty} X_k e^{jk\omega_0 t}$$

This expresses x(t) as a sum of complex exponentials at harmonics of ω₀.

## Euler's Formula Derivations

Starting from:
$$e^{j\theta} = \cos\theta + j\sin\theta$$

**Cosine identity:**
$$\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}$$

**Proof:** 
- $e^{j\theta} + e^{-j\theta} = (\cos\theta + j\sin\theta) + (\cos\theta - j\sin\theta) = 2\cos\theta$

**Sine identity:**
$$\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$$

**Proof:**
- $e^{j\theta} - e^{-j\theta} = 2j\sin\theta$

## Complex Number Representations

For any Fourier coefficient $X_k$:

**Rectangular form:**
$$X_k = \text{Re}(X_k) + j \cdot \text{Im}(X_k)$$

**Polar form:**
$$X_k = |X_k| e^{j\angle X_k}$$

**Conversions:**
- $|X_k| = \sqrt{\text{Re}(X_k)^2 + \text{Im}(X_k)^2}$
- $\angle X_k = \arctan\left(\frac{\text{Im}(X_k)}{\text{Re}(X_k)}\right)$

## Useful Complex Identities

| Number | Polar Form |
|--------|-----------|
| 1 | $1 \cdot e^{j0}$ |
| j | $1 \cdot e^{j\pi/2}$ |
| -1 | $1 \cdot e^{j\pi}$ |
| -j | $1 \cdot e^{-j\pi/2}$ |
| 1/j | $e^{-j\pi/2}$ = -j |

## Relationship to Trigonometric Fourier Series

The trigonometric form:
$$x(t) = a_0 + \sum_{k=1}^{\infty} [a_k \cos(k\omega_0 t) + b_k \sin(k\omega_0 t)]$$

Relates to exponential form by:
- $X_0 = a_0$
- $X_k = \frac{1}{2}(a_k - jb_k)$ for k > 0
- $X_{-k} = X_k^*$ for real signals

## Parseval's Theorem

The average power can be computed in either domain:
$$P = \frac{1}{T_0}\int_0^{T_0} |x(t)|^2 dt = \sum_{k=-\infty}^{\infty} |X_k|^2$$

This states: **Total power = sum of powers in each harmonic.**

## Orthogonality of Complex Exponentials

The basis functions $e^{jk\omega_0 t}$ are orthogonal over one period:
$$\frac{1}{T_0}\int_0^{T_0} e^{jm\omega_0 t} e^{-jn\omega_0 t} dt = \begin{cases} 1 & m = n \\ 0 & m \neq n \end{cases}$$

This orthogonality is why we can extract individual coefficients.
