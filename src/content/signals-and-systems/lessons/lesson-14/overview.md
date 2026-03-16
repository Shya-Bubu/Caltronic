# Introduction to Analog Filters & Butterworth Design

> **Why This Matters**: Every electronic system — from your phone's audio to a wifi receiver — relies on **filters** to select wanted frequencies and reject unwanted ones. This lesson takes you from the idealised mathematical definitions of filters all the way to the **Butterworth filter**, the most widely used practical filter design. By the end, you'll understand why perfect filters can't exist, how real filters approximate them, and how to design one yourself.

## What You'll Learn

This lesson builds your understanding in five stages:

- **Ideal Filter Types** — The four fundamental filter shapes (LPF, HPF, BPF, BSF) and what "ideal" really means mathematically
- **Phase and Distortion** — Why a filter's phase response matters just as much as its magnitude, and when a filter preserves a signal's shape
- **Realizability** — The surprising result that ideal filters are physically impossible, and why
- **Causal Filter Specifications** — How real-world filters are specified using passband, stopband, transition region, and the 3 dB bandwidth
- **Butterworth Filter Design** — The maximally-flat approximation, its transfer function, pole placement, and frequency scaling for any cutoff

## Prerequisites

You should be comfortable with:
- Transfer functions $H(s)$ and frequency response $H(j\omega)$
- Magnitude $|H(j\omega)|$ and phase $\angle H(j\omega)$
- Sinusoidal steady-state response: $y_{ss}(t) = A|H(j\omega_0)|\cos(\omega_0 t + \theta + \angle H(j\omega_0))$
- Partial fractions and inverse Laplace transforms
- Poles and zeros in the s-plane

## Learning Objectives

By the end of this lesson you will be able to:
1. Define and sketch the magnitude response of ideal LPF, HPF, BPF, and BSF
2. Explain why linear phase is required for distortionless transmission
3. Prove that ideal filters are non-causal and therefore unrealisable
4. Interpret practical filter specifications (passband, stopband, transition region, 3 dB bandwidth)
5. Derive the Butterworth filter transfer function and magnitude response
6. Place Butterworth poles on the s-plane for any order N
7. Apply frequency scaling to design a Butterworth filter with arbitrary cutoff frequency
