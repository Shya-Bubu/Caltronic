# Engineering Applications: Fourier Series Properties

## Time Shifting in Communications

In radio transmission, time delays occur naturally. Using the time-shift property:

**Transmitted:** x(t) → Xk
**Received:** x(t - τ) → Xk·e^(-jkω₀τ)

The magnitude spectrum is preserved—only phase changes. This is why phase-sensitive receivers are needed to extract timing information.

## Try It: Explore Time Shift Property

[[visual:sim1]]

Drag the slider to shift the signal in time! Watch how:
- **Magnitude spectrum stays the same** (top right)
- **Phase spectrum shifts linearly with k** (bottom right)

[[visual:v4]]

## Multipath Effects

In wireless communications, signals arrive via multiple paths with different delays:
$$y(t) = x(t) + 0.5 \cdot x(t - \tau)$$

Using linearity and time-shifting:
$$Y_k = X_k + 0.5 \cdot X_k \cdot e^{-jk\omega_0\tau} = X_k(1 + 0.5e^{-jk\omega_0\tau})$$

At certain frequencies, phases can cancel causing "fading."

[[visual:v5]]

## Doppler Effect (Time Scaling)

Moving sources cause frequency shifts. If a siren approaches at speed v:
- Sound is compressed in time (α > 1)
- Frequencies shift up (ω₀ → αω₀)

The time-scaling property explains the Doppler shift mathematically.

[[visual:v6]]

## Python Example: Time-Shift Property

```python
import numpy as np
import matplotlib.pyplot as plt

# Original square pulse coefficients
def Xk_square(k, omega0, T1):
    if k == 0:
        return 2*T1 / (2*np.pi/omega0)
    return np.sin(k * omega0 * T1) / (k * np.pi)

# Parameters
T0 = 4
omega0 = 2 * np.pi / T0
T1 = 1
t0 = 1  # Time shift

k_vals = np.arange(-7, 8)

# Original coefficients
Xk_orig = [Xk_square(k, omega0, T1) for k in k_vals]

# Shifted coefficients (multiply by phase factor)
Xk_shifted = [Xk * np.exp(-1j * k * omega0 * t0) for k, Xk in zip(k_vals, Xk_orig)]

# Plot magnitudes
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# Original magnitude
axes[0, 0].stem(k_vals, np.abs(Xk_orig))
axes[0, 0].set_title('Original |Xk|')
axes[0, 0].set_xlabel('k')

# Shifted magnitude (should be same!)
axes[0, 1].stem(k_vals, np.abs(Xk_shifted))
axes[0, 1].set_title('Shifted |Yk| (same as original)')
axes[0, 1].set_xlabel('k')

# Original phase
axes[1, 0].stem(k_vals, np.angle(Xk_orig) * 180/np.pi)
axes[1, 0].set_title('Original ∠Xk (degrees)')
axes[1, 0].set_xlabel('k')

# Shifted phase
axes[1, 1].stem(k_vals, np.angle(Xk_shifted) * 180/np.pi)
axes[1, 1].set_title('Shifted ∠Yk (degrees)')
axes[1, 1].set_xlabel('k')

plt.tight_layout()
plt.show()
```

## Audio Processing

**Pitch Shifting:** To raise pitch by an octave, time-scale by α = 2:
- Original ω₀ → New 2ω₀
- All harmonics double in frequency

**Time Stretching:** Slow down audio without changing pitch requires sophisticated techniques beyond simple scaling.

## Power Systems: Phase Analysis

Three-phase power has signals shifted by 120°:
- Phase A: x(t)
- Phase B: x(t - T₀/3)
- Phase C: x(t - 2T₀/3)

Using time-shift property:
- Yk_B = Xk·e^(-j2πk/3)
- Yk_C = Xk·e^(-j4πk/3)

## Filter Design Preview

Conjugate symmetry means:
- Filters designed for positive frequencies automatically work for negative frequencies
- Real-coefficient filters have symmetric magnitude response

This is why we can focus on positive frequencies in filter specifications.
