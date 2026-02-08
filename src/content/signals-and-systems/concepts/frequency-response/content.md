# Frequency Response

> **Why This Matters**: The frequency response $H(\omega)$ tells you exactly how a system treats each frequency—which it amplifies, which it attenuates, and how it shifts phases. This is the foundation of filter design.

---

## Definition

The **frequency response** is the Fourier transform of the impulse response:

$$H(\omega) = \mathcal{F}\{h(t)\} = \int_{-\infty}^{\infty} h(t)e^{-j\omega t}dt$$

[[visual:frequency-response-definition]]

---

## Input-Output Relationship

For sinusoidal input $x(t) = A\cos(\omega_0 t)$:

$$y(t) = A|H(\omega_0)|\cos(\omega_0 t + \angle H(\omega_0))$$

[[visual:sinusoidal-io]]

The system:
- Scales amplitude by $|H(\omega_0)|$
- Shifts phase by $\angle H(\omega_0)$
- **Does NOT change frequency!**

---

## Magnitude and Phase Response

[[visual:bode-plot]]

- $|H(\omega)|$ = **Magnitude Response** (Gain vs frequency)
- $\angle H(\omega)$ = **Phase Response** (Phase shift vs frequency)

Together these completely describe the system's behavior!

---

## Ideal Filters

[[visual:ideal-filters]]

| Filter Type | Passes | Blocks |
|-------------|--------|--------|
| Lowpass | $|\omega| < \omega_c$ | $|\omega| > \omega_c$ |
| Highpass | $|\omega| > \omega_c$ | $|\omega| < \omega_c$ |
| Bandpass | $\omega_1 < |\omega| < \omega_2$ | Outside band |
| Bandstop | Outside band | $\omega_1 < |\omega| < \omega_2$ |

---

## Summary

| Concept | Description |
|---------|-------------|
| Frequency Response | $H(\omega) = \mathcal{F}\{h(t)\}$ |
| Eigenvalue Property | $e^{j\omega t} \to H(\omega)e^{j\omega t}$ |
| Magnitude | Gain at each frequency |
| Phase | Phase shift at each frequency |
