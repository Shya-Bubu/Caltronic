# Engineering Applications: Exponential Fourier Series

## Audio Signal Analysis

Every sound can be decomposed into harmonics:
- **Pure tone:** Single frequency (single spike in spectrum)
- **Musical note:** Fundamental + harmonics (determines timbre)
- **Speech:** Complex time-varying spectrum

A piano's middle A (440 Hz) includes:
- Fundamental: 440 Hz
- 2nd harmonic: 880 Hz
- 3rd harmonic: 1320 Hz
- etc.

The relative amplitudes of harmonics distinguish a piano from a guitar playing the same note.

## Try It: Explore Fourier Coefficients

[[visual:sim1]]

Adjust the amplitude sliders and watch how the time domain waveform and frequency spectrum change together!

## Spectrum Analyzer

A spectrum analyzer displays the Fourier spectrum in real-time:
- X-axis: Frequency (Hz or kHz)
- Y-axis: Magnitude (dB or linear)
- Shows $|X_k|$ for all k visually

[[visual:v4]]

**Lab Application:** Use a function generator to produce square waves and observe harmonics on a spectrum analyzer.

## Power Quality Analysis

Ideally, power grids carry pure 50/60 Hz sine waves. Real systems have harmonics from:
- Non-linear loads (rectifiers, motors)
- Switching power supplies
- LED drivers

**Total Harmonic Distortion (THD):**
$$\text{THD} = \frac{\sqrt{\sum_{k=2}^{\infty} |X_k|^2}}{|X_1|} \times 100\%$$

Power companies specify THD limits (typically < 5%).

## MATLAB/Python Example

```python
import numpy as np
import matplotlib.pyplot as plt

# Signal parameters
omega0 = 5  # Fundamental frequency
T0 = 2*np.pi/omega0
t = np.linspace(0, 2*T0, 1000)

# Signal: DC + two harmonics
x = 11 + 4*np.sin(omega0*t) + (4/3)*np.sin(3*omega0*t)

# Fourier coefficients (computed analytically)
k_values = np.array([-3, -1, 0, 1, 3])
X_mag = np.array([2/3, 2, 11, 2, 2/3])
X_phase = np.array([np.pi/2, np.pi/2, 0, -np.pi/2, -np.pi/2])

# Plot signal
fig, axes = plt.subplots(3, 1, figsize=(10, 8))

axes[0].plot(t, x)
axes[0].set_xlabel('Time (s)')
axes[0].set_ylabel('x(t)')
axes[0].set_title('Time Domain Signal')
axes[0].grid(True)

# Magnitude spectrum
axes[1].stem(k_values, X_mag)
axes[1].set_xlabel('k (harmonic number)')
axes[1].set_ylabel('|Xk|')
axes[1].set_title('Magnitude Spectrum')
axes[1].grid(True)

# Phase spectrum
axes[2].stem(k_values, X_phase * 180/np.pi)
axes[2].set_xlabel('k (harmonic number)')
axes[2].set_ylabel('∠Xk (degrees)')
axes[2].set_title('Phase Spectrum')
axes[2].grid(True)

plt.tight_layout()
plt.show()
```

[[visual:v5]]

## Signal Synthesis

Fourier series enables **additive synthesis**:
1. Start with desired spectrum (magnitudes and phases)
2. Generate each harmonic: $X_k e^{jk\omega_0 t}$
3. Sum all harmonics to create the signal

This is how synthesizers create complex timbres from simple oscillators.

## Bandwidth Considerations

The spectrum shows which frequencies a signal occupies:
- **Narrowband signal:** Few significant harmonics
- **Wideband signal:** Many harmonics (e.g., square wave)

For transmission, you need bandwidth to accommodate all significant harmonics.
