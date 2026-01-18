# Computing Fourier Series Coefficients

## The Analysis Equation

Given a periodic signal x(t), how do we find its Fourier coefficients Xk? The answer is the **analysis equation**:

$$X_k = \frac{1}{T_0} \int_{T_0} x(t) \cdot e^{-jk\omega_0 t} \, dt$$

This integral "extracts" the kth harmonic component from the signal.

[[visual:v2]]

## Why Does This Work?

The key is **orthogonality**. When you multiply x(t) by e^(-jkω₀t) and integrate over one period:
- Terms at frequency kω₀ survive (they become constants)
- Terms at other frequencies average to zero

It's like tuning into a specific radio station—the integral filters out everything except the kth harmonic.

## Computing X₀ (DC Component)

[[visual:v3]]

For k = 0, the exponential becomes 1:
$$X_0 = \frac{1}{T_0} \int_0^{T_0} x(t) \, dt$$

This is simply the **average value** of x(t) over one period.

## Choosing the Integration Window

The integral is over "one period," but you can choose which period:
- Standard: 0 to T₀
- Symmetric: -T₀/2 to +T₀/2 (often easier!)

**Tip:** Choose the window that simplifies the integral. For symmetric signals, -T₀/2 to +T₀/2 often works best.

## Square Pulse Train Example

[[visual:v1]]

Consider a square pulse train with:
- Amplitude: 1
- Pulse width: 2T₁
- Period: T₀

**Step 1: Define x(t)**
$$x(t) = \begin{cases} 1 & |t| < T_1 \\ 0 & T_1 < |t| < T_0/2 \end{cases}$$

**Step 2: Compute X₀**
$$X_0 = \frac{1}{T_0} \int_{-T_0/2}^{T_0/2} x(t) \, dt = \frac{1}{T_0} \int_{-T_1}^{T_1} 1 \, dt = \frac{2T_1}{T_0}$$

**Step 3: Compute Xk (k ≠ 0)**
$$X_k = \frac{1}{T_0} \int_{-T_1}^{T_1} e^{-jk\omega_0 t} \, dt$$

Evaluating:
$$X_k = \frac{1}{T_0} \cdot \frac{e^{-jk\omega_0 t}}{-jk\omega_0} \Big|_{-T_1}^{T_1}$$

$$= \frac{e^{jk\omega_0 T_1} - e^{-jk\omega_0 T_1}}{T_0 \cdot jk\omega_0}$$

Using $\sin\theta = (e^{j\theta} - e^{-j\theta})/(2j)$:
$$X_k = \frac{2\sin(k\omega_0 T_1)}{T_0 \cdot k\omega_0} = \frac{\sin(k\omega_0 T_1)}{k\pi}$$

This is the **sinc-like envelope** seen in spectrum analyzers!

## The Sinc Function Pattern

[[visual:v4]]

For the square pulse train:
$$X_k = \frac{1}{k\pi}\sin(k\omega_0 T_1)$$

Key observations:
- X₀ is finite (the average value)
- |Xk| → 0 as k → ∞ (high harmonics diminish)
- Xk = 0 at certain k values (where the sine is zero)

## Convergence

[[visual:v5]]

[[visual:v6]]

As you sum more terms in the Fourier series:
1. Start with DC (X₀) — constant at the average
2. Add 1st harmonic — basic oscillation shape appears
3. Add 3rd, 5th, ... harmonics — sharp corners emerge
4. As k → ∞ — perfect reconstruction (for smooth signals)

[[visual:v7]]

For discontinuous signals (like square waves), there's always some "ringing" at the edges called **Gibbs phenomenon**.

## General Strategy

[[visual:v8]]

1. **Identify T₀, ω₀** from the signal
2. **Find X₀** using the average value formula
3. **Set up the integral** for Xk with appropriate limits
4. **Evaluate** using integration techniques
5. **Simplify** using Euler's identities if helpful
