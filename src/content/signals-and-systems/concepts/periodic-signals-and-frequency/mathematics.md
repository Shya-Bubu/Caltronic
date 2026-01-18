# Mathematics of Periodic Signals

## Formal Definition

A continuous-time signal x(t) is **periodic with period T** if:
$$x(t) = x(t + T), \quad \forall t \in \mathbb{R}$$

The **fundamental period** T₀ is the smallest positive T satisfying this condition.

## Frequency Relationships

Given fundamental period T₀:

**Fundamental frequency (Hz):**
$$f_0 = \frac{1}{T_0}$$

**Angular frequency (rad/s):**
$$\omega_0 = 2\pi f_0 = \frac{2\pi}{T_0}$$

**Inverse relationships:**
$$T_0 = \frac{1}{f_0} = \frac{2\pi}{\omega_0}$$

## Periodicity of Sums

**Theorem:** If x(t) has period T₁ and y(t) has period T₂, then z(t) = x(t) + y(t) is periodic with period T₀ = LCM(T₁, T₂), provided T₁/T₂ is rational.

**Example:** 
- x(t) = sin(5t) has T₁ = 2π/5
- y(t) = sin(15t) has T₂ = 2π/15

Since 15 = 3×5, T₂ = T₁/3. The LCM is T₁ = 2π/5.

## Power and Energy

**Average Power:**
$$P = \frac{1}{T_0} \int_0^{T_0} |x(t)|^2 \, dt$$

For periodic signals, P is finite and constant.

**Total Energy:**
$$E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt = \infty$$

Energy is infinite because the signal extends forever.

## Complex Exponentials as Periodic Signals

The complex exponential $e^{j\omega_0 t}$ is periodic:
$$e^{j\omega_0(t+T_0)} = e^{j\omega_0 t} \cdot e^{j\omega_0 T_0}$$

For this to equal $e^{j\omega_0 t}$, we need:
$$e^{j\omega_0 T_0} = 1 \quad \Rightarrow \quad \omega_0 T_0 = 2\pi$$

This confirms T₀ = 2π/ω₀.

## Harmonics

For a signal with fundamental frequency ω₀:
- **Fundamental (1st harmonic):** ω₀
- **2nd harmonic:** 2ω₀
- **3rd harmonic:** 3ω₀
- **kth harmonic:** kω₀

All harmonics complete an integer number of cycles in one fundamental period.

## DC Component

The DC (zero-frequency) component is the average value:
$$X_0 = \frac{1}{T_0} \int_0^{T_0} x(t) \, dt$$

This represents the signal's "center line."

## Discrete-Time Periodicity

A discrete signal x[n] is periodic with period N if:
$$x[n] = x[n + N], \quad \forall n \in \mathbb{Z}$$

**Key Difference:** For discrete signals, the period N must be an integer.
