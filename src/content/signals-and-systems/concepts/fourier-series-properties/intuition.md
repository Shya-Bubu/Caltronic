# Fourier Series Properties

## Why Properties Matter

Instead of computing integrals from scratch every time, we can use **properties** to quickly find Fourier coefficients of related signals.

If you know Xk for x(t), properties tell you the coefficients for:
- αx(t) + βy(t) — scaled and added signals
- x(t - t₀) — time-shifted signals
- x(-t) — time-reversed signals
- x(αt) — time-scaled signals

## Property 1: Linearity

[[visual:v1]]

$$\text{If } x(t) \leftrightarrow X_k \text{ and } y(t) \leftrightarrow Y_k$$
$$\text{Then } \alpha x(t) + \beta y(t) \leftrightarrow \alpha X_k + \beta Y_k$$

**Key Requirement:** Both x(t) and y(t) must have the **same fundamental frequency** ω₀!

If they have different ω₀, the harmonics don't align and can't be simply added.

> **Example:** If x(t) has X₁ = 3 and y(t) has Y₁ = 2 (same ω₀), then 2x(t) + y(t) has coefficient 2(3) + 2 = 8 at k = 1.

## Property 2: Time Shifting

[[visual:v2]]

[[visual:v3]]

$$\text{If } x(t) \leftrightarrow X_k$$
$$\text{Then } x(t - t_0) \leftrightarrow X_k \cdot e^{-jk\omega_0 t_0}$$

**What this means:**
- **Magnitude unchanged:** |Xk| stays the same
- **Phase shifted:** ∠Xk changes by -kω₀t₀

[[visual:v4]]

[[visual:v5]]

Higher harmonics experience larger phase shifts for the same time delay!

> **Intuition:** Shifting in time is like rotating each frequency component. Higher frequencies rotate more for the same time shift.

## Property 3: Time Reversal

[[visual:v8]]

$$\text{If } x(t) \leftrightarrow X_k$$
$$\text{Then } x(-t) \leftrightarrow X_{-k}$$

Reversing time swaps positive and negative frequency coefficients.

For the magnitude spectrum (which is even for real signals), time reversal has no visible effect!

## Property 4: Time Scaling

[[visual:v6]]

$$\text{If } x(t) \leftrightarrow X_k \text{ with fundamental } \omega_0$$
$$\text{Then } x(\alpha t) \leftrightarrow X_k \text{ with fundamental } \alpha\omega_0$$

**Key insight:** Compressing in time → expanding in frequency, and vice versa.

| Time Domain | Frequency Domain |
|------------|------------------|
| Compress (α > 1) | Expand (wider gaps between harmonics) |
| Expand (α < 1) | Compress (narrower gaps) |

## Property 5: Conjugate Symmetry (Real Signals)

[[visual:v7]]

For real-valued x(t):
$$X_{-k} = X_k^*$$

This means:
- **Magnitude is even:** |X₋k| = |Xk|
- **Phase is odd:** ∠X₋k = -∠Xk

This is why spectrum analyzers often show only positive frequencies—negative frequencies are redundant!

## Summary Table

| Time Domain | Fourier Coefficients |
|-------------|---------------------|
| αx(t) + βy(t) | αXk + βYk (same ω₀) |
| x(t - t₀) | Xk·e^(-jkω₀t₀) |
| x(-t) | X₋k |
| x(αt) | Xk, new ω₀ = αω₀ |
| x(t) real | X₋k = Xk* |

## Using Properties in Practice

**Problem:** Find coefficients for y(t) = x(t - 2), given Xk.

**Solution:**
$$Y_k = X_k \cdot e^{-jk\omega_0 \cdot 2} = X_k \cdot e^{-j2k\omega_0}$$

No need to re-integrate! Just multiply each Xk by the phase factor.
