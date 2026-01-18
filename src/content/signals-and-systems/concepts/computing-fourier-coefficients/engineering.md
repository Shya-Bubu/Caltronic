# Engineering Applications: Computing Fourier Coefficients

## Spectrum Analyzer Lab

In the spectrum analyzer laboratory, you'll:
1. Generate a square wave using a function generator
2. View its spectrum on the analyzer
3. Observe the harmonic peaks following the sinc envelope

You'll see:
- DC component at 0 Hz
- Fundamental at f₀
- Odd harmonics at 3f₀, 5f₀, 7f₀...
- Amplitudes decreasing as 1/k

## Try It: Watch Fourier Reconstruction

[[visual:sim1]]

Adjust the number of harmonics and watch how the approximation improves! Notice the "ringing" at sharp corners—that's **Gibbs phenomenon**.

## Digital Signal Processing

In DSP, we compute Fourier coefficients numerically using the **DFT** (Discrete Fourier Transform):
$$X[k] = \sum_{n=0}^{N-1} x[n] \cdot e^{-j2\pi kn/N}$$

The FFT (Fast Fourier Transform) computes this efficiently in O(N log N) operations.

[[visual:v4]]

## MATLAB/Python Computation

```python
import numpy as np

def compute_fourier_coefficients(x, t, T0, K_max):
    """Numerically compute Fourier coefficients"""
    omega0 = 2 * np.pi / T0
    dt = t[1] - t[0]
    
    X = {}
    for k in range(-K_max, K_max + 1):
        integrand = x * np.exp(-1j * k * omega0 * t)
        X[k] = (1/T0) * np.trapz(integrand, t)
    
    return X

# Example: Square pulse
T0 = 4
T1 = 1
omega0 = 2 * np.pi / T0

t = np.linspace(-T0/2, T0/2, 1000)
x = np.where(np.abs(t) < T1, 1, 0)

# Compute coefficients
X = compute_fourier_coefficients(x, t, T0, 10)

# Print results
for k in sorted(X.keys()):
    if np.abs(X[k]) > 0.01:
        print(f"X[{k:+2d}] = {np.abs(X[k]):.4f} ∠ {np.angle(X[k])*180/np.pi:+.1f}°")
```

[[visual:v5]]

[[visual:v6]]

## Power Quality Applications

For analyzing distorted power waveforms:

$$\text{THD} = \frac{\sqrt{\sum_{k=2}^{N} |X_k|^2}}{|X_1|} \times 100\%$$

Example:
- X₁ = 230 V (fundamental)
- X₃ = 23 V (3rd harmonic)
- X₅ = 11.5 V (5th harmonic)

$$\text{THD} = \frac{\sqrt{23^2 + 11.5^2}}{230} \times 100\% \approx 11\%$$

## Audio Timbre Analysis

The relative magnitudes of harmonics determine instrument timbre:

| Instrument | Harmonic Pattern |
|-----------|-----------------|
| Flute | Strong fundamental, weak harmonics |
| Clarinet | Strong odd harmonics (1, 3, 5...) |
| Trumpet | Many strong harmonics |
| Square wave | Only odd harmonics, 1/k amplitude |

## Key Engineering Formulas

**Square Pulse Train:**
$$X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$$

**Triangular Wave:**
$$X_k = \frac{8}{k^2\pi^2} \text{ (odd } k \text{ only)}$$

**Sawtooth Wave:**
$$X_k = \frac{j}{k\pi} \text{ for } k \neq 0$$

## Integration Tips

1. Use symmetry: Even functions give real Xk, odd functions give imaginary Xk
2. Choose integration limits to minimize piecewise evaluation
3. For step-like signals, integrate only over non-zero regions
