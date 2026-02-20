# Fourier Series — Part I

## 🎯 What This Lesson Is About

Up until now, you have analysed signals exclusively on the **time axis**. This lesson marks a fundamental shift: you will learn to represent periodic signals on *another axis* — the **frequency axis** — using the **Exponential Fourier Series (EFS)**.

This is the gateway to **inter-domain analysis**: the idea that any periodic signal can be uniquely decomposed into a weighted sum of complex exponentials $e^{j k \omega_0 t}$, each at a harmonic multiple of the fundamental frequency. The weights — the Fourier Series coefficients $X_k$ — are complex numbers that encode both the **magnitude** and **phase** of each frequency component.

Why does this matter? Because many engineering operations that are difficult in the time domain become trivial in the frequency domain. Filtering, modulation, spectral analysis, and power calculation all exploit this duality.

## 🗺️ Lesson Roadmap

| Order | Concept | Core Question |
|-------|---------|--------------|
| 1 | **Periodicity & Inter-Domain Analysis** | What makes a signal periodic, and why do we need another domain? |
| 2 | **Exponential Fourier Series** | How do we decompose any periodic signal into complex exponentials? |
| 3 | **Fourier Series of the Square Pulse** | What does the FS look like for the classic square pulse train? |
| 4 | **Fourier Series Properties** | How do linearity, time shift, reversal, and scaling transform the FS? |
| 5 | **Symmetry Properties of the FS** | What special structures emerge for real, even, and odd signals? |

## 🔗 Prerequisites

From **Lessons 1–3** you should be comfortable with:
- Signal classifications (continuous/discrete, energy/power, periodic/aperiodic)
- Unit impulse and step functions
- Basic operations: time shifting, scaling, reversal
- Convolution and LTI system impulse response
- Complex number arithmetic (Euler's formula in particular)

## 💡 Why This Lesson Matters

The Fourier Series is the **foundation** for everything that follows in frequency-domain engineering:
- **Fourier Transform** (Lesson 5–6) generalises the FS to aperiodic signals
- **Spectrum analysers** (lab) directly display FS magnitudes
- **Power systems** use harmonic analysis (3rd, 5th harmonics) to quantify distortion
- **Communication systems** modulate and demodulate signals in the frequency domain
- **DSP** builds entirely on discrete versions of the same decomposition
