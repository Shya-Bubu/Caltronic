# Exam Preparation: Computing Fourier Coefficients

## Common Question Types

### Type 1: Compute Xk for Given Signal
**Given:** x(t) = square pulse train, T₀ = 4, pulse width = 2
**Find:** X₀, X₁, X₂

**Solution:**
- T₁ = 1 (half pulse width)
- ω₀ = 2π/4 = π/2

$$X_0 = \frac{2T_1}{T_0} = \frac{2}{4} = 0.5$$

$$X_k = \frac{\sin(k \cdot \frac{\pi}{2} \cdot 1)}{k\pi} = \frac{\sin(k\pi/2)}{k\pi}$$

- X₁ = sin(π/2)/(π) = 1/π ≈ 0.318
- X₂ = sin(π)/(2π) = 0
- X₃ = sin(3π/2)/(3π) = -1/(3π) ≈ -0.106

### Type 2: Verify Using Properties
**Given:** Xk for x(t)
**Find:** Coefficients for x(t-t₀) using time-shift property

### Type 3: Sketch Spectrum
**Given:** Fourier coefficients
**Draw:** Magnitude and phase stem plots

## Key Formulas

**Analysis equation:**
$$X_k = \frac{1}{T_0} \int_{T_0} x(t) e^{-jk\omega_0 t} dt$$

**DC component:**
$$X_0 = \frac{1}{T_0} \int_{T_0} x(t) \, dt = \text{average value}$$

**Square pulse train:**
$$X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$$

## Integration Strategies

1. **Choosing limits:** Use -T₀/2 to T₀/2 for centered signals
2. **Piecewise signals:** Split integral at discontinuities
3. **Exploit zeros:** Only integrate over non-zero regions

## Common Mistakes

1. **Wrong limits:** Forgetting to use one full period
2. **Missing 1/T₀:** The coefficient 1/T₀ is essential
3. **Sign errors:** Watch the -jkω₀t in the exponential
4. **k = 0 separately:** Must compute X₀ using average formula

## Standard Results

| Signal | Xk Formula |
|--------|-----------|
| Square pulse | sin(kω₀T₁)/(kπ) |
| Triangle wave | 8/(k²π²) for odd k, 0 for even k |
| Sawtooth | j/(kπ) for k ≠ 0 |
| Full-wave rectified | −4/(π(4k²−1)) |

## Practice Problem

**Signal:** x(t) is a square wave with period 2π, amplitude 1 (from -1 to 1)

**Find X₃:**

The square wave has:
- T₀ = 2π, T₁ = π/2, ω₀ = 1
- x(t) = 1 for 0 < t < π, x(t) = -1 for π < t < 2π

$$X_k = \frac{1}{2\pi}\left[\int_0^{\pi} e^{-jkt} dt - \int_{\pi}^{2\pi} e^{-jkt} dt\right]$$

For the symmetric square wave (odd function):
$$X_k = \frac{2}{k\pi} \text{ for odd } k, \quad X_k = 0 \text{ for even } k$$

$$X_3 = \frac{2}{3\pi} \approx 0.212$$

## Exam Tips

- Always start by finding T₀ and ω₀
- Compute X₀ first (it's often simplest)
- Use symmetry to reduce work
- Check that Xk → 0 as k → ∞
- For real signals, verify X₋k = Xk*
