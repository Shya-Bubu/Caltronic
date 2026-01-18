# Engineering Applications: Periodic Signals

## AC Power Systems

The 50 Hz (or 60 Hz) AC power signal is the most ubiquitous periodic signal:
- **Sri Lanka:** f₀ = 50 Hz, T₀ = 20 ms, ω₀ = 100π rad/s
- **USA:** f₀ = 60 Hz, T₀ = 16.67 ms, ω₀ = 120π rad/s

Power engineers analyze harmonics (multiples of 50/60 Hz) to detect distortion, which causes heating and equipment damage.

## Try It: Build Your Own Waveform

[[visual:sim1]]

Adjust the harmonic sliders above to build different waveform shapes. Notice how adding more harmonics creates sharper features!

## Communication Systems

### Carrier Waves
Radio/TV signals use high-frequency periodic carriers:
- FM radio: ~100 MHz (T₀ = 10 ns)
- Wi-Fi: 2.4 GHz (T₀ = 0.42 ns)
- 5G: 28 GHz (T₀ = 36 ps)

[[visual:v4]]

### Sampling in Digital Audio
CD audio samples at 44.1 kHz—the sampling clock is a periodic square wave.

## Biomedical Signals

### ECG (Electrocardiogram)
Heart rhythm is approximately periodic:
- Normal: T₀ ≈ 0.8-1.0 s (60-75 BPM)
- Tachycardia: T₀ < 0.6 s (>100 BPM)

Arrhythmias show up as period variations or missing beats.

## Python Example

```python
import numpy as np
import matplotlib.pyplot as plt

# Define a periodic signal
T0 = 2 * np.pi / 5  # Fundamental period
f0 = 1 / T0          # Fundamental frequency
omega0 = 2 * np.pi * f0  # Angular frequency

t = np.linspace(0, 4*T0, 1000)

# Composite signal: DC + 2 harmonics
x = 11 + 4*np.sin(omega0*t) + (4/3)*np.sin(3*omega0*t)

plt.figure(figsize=(12, 4))
plt.plot(t, x)
plt.axhline(11, color='r', linestyle='--', label='DC level')
plt.xlabel('Time (s)')
plt.ylabel('x(t)')
plt.title(f'Periodic Signal: T₀ = {T0:.3f}s, f₀ = {f0:.3f} Hz')
plt.legend()
plt.grid(True)
plt.show()

print(f"Fundamental Period T₀ = {T0:.4f} s")
print(f"Fundamental Frequency f₀ = {f0:.4f} Hz")
print(f"Angular Frequency ω₀ = {omega0:.4f} rad/s")
```

[[visual:v5]]

## Oscilloscope Measurements

When measuring periodic signals on an oscilloscope:
1. Set time/div to see 2-3 complete cycles
2. Measure peak-to-peak distance for T₀
3. Use cursor measurements for precision
4. FFT mode reveals frequency components

## Key Engineering Parameters

| Parameter | Symbol | Unit | Meaning |
|-----------|--------|------|---------|
| Period | T₀ | seconds | Time for one cycle |
| Frequency | f₀ | Hz | Cycles per second |
| Angular Frequency | ω₀ | rad/s | Radians per second |
| DC Offset | X₀ | varies | Average value |
| Peak Amplitude | Xp | varies | Maximum deviation |
| RMS Value | Xrms | varies | √(average of x²) |
