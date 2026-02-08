# Mathematical Foundation

## Integrator Analysis

[[visual:diag-mathematics-01]]

### Time Domain

Current through Rs: $I = \frac{V_{in}}{R_s}$

This current flows into capacitor C (no current into op-amp input):
$$I = C\frac{dV_C}{dt}$$

Since output is across C and V- = 0 (virtual ground):
$$V_o = -V_C$$

Combining:
$$\frac{V_{in}}{R_s} = -C\frac{dV_o}{dt}$$

Integrate both sides:
$$\boxed{V_o = -\frac{1}{R_s C}\int V_{in} \, dt + V_o(0)}$$

### Frequency Domain (Transfer Function)

Using impedance: $Z_C = \frac{1}{sC}$

$$H(s) = -\frac{Z_C}{R_s} = -\frac{1}{sR_s C}$$

**Magnitude**: $|H(j\omega)| = \frac{1}{\omega R_s C}$ (decreases with frequency)

**Phase**: −90° (output lags input)

### Modified Integrator (with R parallel to C)

$$H(s) = -\frac{R \parallel \frac{1}{sC}}{R_s} = -\frac{R}{R_s} \cdot \frac{1}{1 + sRC}$$

- At DC (s→0): Gain = −R/Rs (finite, not infinite!)
- At high frequency: Acts like integrator

This is a **first-order low-pass filter**.

Corner frequency: $f_c = \frac{1}{2\pi RC}$

---

## Differentiator Analysis

### Time Domain

Input current through C:
$$I = C\frac{dV_{in}}{dt}$$

This flows through R:
$$V_o = -IR = -RC\frac{dV_{in}}{dt}$$

$$\boxed{V_o = -RC\frac{dV_{in}}{dt}}$$

### Frequency Domain (Transfer Function)

$$H(s) = -\frac{R}{Z_C} = -\frac{R}{\frac{1}{sC}} = -sRC$$

**Magnitude**: $|H(j\omega)| = \omega RC$ (increases with frequency!)

**Phase**: −90° (output leads input)

### Modified Differentiator (with R1 in series with C)

$$H(s) = -\frac{R}{R_1 + \frac{1}{sC}} = -\frac{sRC}{1 + sR_1C}$$

- At low frequency: Acts like differentiator
- At high frequency (s→∞): Gain → −R/R1 (limited, not infinite!)

This is a **first-order high-pass filter**.

Corner frequency: $f_c = \frac{1}{2\pi R_1 C}$

---

## Summary Comparison

| Property | Integrator | Differentiator |
|----------|------------|----------------|
| Capacitor | Feedback | Input |
| Phase shift | −90° (lag) | −90° (lead) |
| Gain vs freq | Decreases | Increases |
| Filter type | Low-pass | High-pass |
| Problem | DC drift | HF noise |
| Solution | Parallel R | Series R1 |

---

*For exam strategies, continue to the Exam layer.*
