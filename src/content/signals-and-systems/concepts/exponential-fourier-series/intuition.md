# Exponential Fourier Series Representation

## The Big Idea

Any periodic signal can be written as a sum of complex exponentials at integer multiples of the fundamental frequency:

$$x(t) = \sum_{k=-\infty}^{\infty} X_k e^{jk\omega_0 t}$$

Each term $X_k e^{jk\omega_0 t}$ represents a **harmonic component** spinning at frequency $k\omega_0$.

[[visual:v1]]

## Euler's Formula: The Key

[[visual:v2]]

Euler's formula connects sinusoids to complex exponentials:

$$e^{j\theta} = \cos\theta + j\sin\theta$$

From this, we derive:
- $\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}$
- $\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$

## Converting Sin/Cos to Exponentials

**Example:** Convert $x(t) = 4\sin(5t)$

Using the sine formula:
$$4\sin(5t) = 4 \cdot \frac{e^{j5t} - e^{-j5t}}{2j} = \frac{4}{2j}e^{j5t} - \frac{4}{2j}e^{-j5t}$$

Simplify $\frac{1}{j} = -j = e^{-j\pi/2}$:
$$= 2e^{-j\pi/2}e^{j5t} - 2e^{-j\pi/2}e^{-j5t}$$

So the Fourier coefficients are:
- $X_1 = 2e^{-j\pi/2}$ (at frequency 5 rad/s)
- $X_{-1} = -2e^{-j\pi/2} = 2e^{j\pi/2}$ (at frequency -5 rad/s)

## What Are the Xk Coefficients?

[[visual:v3]]

The **Fourier series coefficients** $X_k$ are complex numbers:
$$X_k = |X_k| e^{j\angle X_k}$$

- **Magnitude** $|X_k|$: How much of the kth harmonic is present
- **Phase** $\angle X_k$: The starting angle of that harmonic

## The DC Component (k = 0)

[[visual:v8]]

When k = 0:
$$X_0 e^{j \cdot 0 \cdot \omega_0 t} = X_0 \cdot 1 = X_0$$

This is simply a constant—the **average value** of the signal.

## Magnitude and Phase Spectra

[[visual:v4]]

From the Fourier coefficients, we can plot:

1. **Magnitude Spectrum:** $|X_k|$ vs k
   - Shows amplitude at each harmonic
   - Always symmetric for real signals: $|X_{-k}| = |X_k|$

2. **Phase Spectrum:** $\angle X_k$ vs k
   - Shows phase angle at each harmonic
   - Antisymmetric for real signals: $\angle X_{-k} = -\angle X_k$

## Why Complex Exponentials?

[[visual:v6]]

Using $e^{jk\omega_0 t}$ instead of sin/cos has advantages:
1. **Simpler algebra:** Products become additions of exponents
2. **Unified representation:** Both positive and negative frequencies
3. **Eigenfunction property:** $e^{jk\omega_0 t}$ passes through LTI systems unchanged in form
4. **Connection to transforms:** Directly extends to Fourier Transform

## Worked Example

[[visual:v5]]

**Signal:** $x(t) = 11 + 4\sin(5t) + \frac{4}{3}\sin(15t)$

**Step 1:** Identify components
- DC: 11
- 5 rad/s component: $4\sin(5t)$
- 15 rad/s component: $\frac{4}{3}\sin(15t)$

**Step 2:** Convert each sine
$$4\sin(5t) = 2e^{-j\pi/2}e^{j5t} + 2e^{j\pi/2}e^{-j5t}$$
$$\frac{4}{3}\sin(15t) = \frac{2}{3}e^{-j\pi/2}e^{j15t} + \frac{2}{3}e^{j\pi/2}e^{-j15t}$$

**Step 3:** Identify coefficients
- $X_0 = 11$
- $X_1 = 2e^{-j\pi/2}$, $X_{-1} = 2e^{j\pi/2}$
- $X_3 = \frac{2}{3}e^{-j\pi/2}$, $X_{-3} = \frac{2}{3}e^{j\pi/2}$

Note: k = 1 corresponds to $\omega_0 = 5$ rad/s (fundamental), k = 3 to $3\omega_0 = 15$ rad/s.
