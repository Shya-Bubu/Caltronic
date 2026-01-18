# Fourier Series Part I

## Overview

This lesson introduces one of the most powerful tools in signal processing: the **Fourier Series**. You'll learn how any periodic signal can be broken down into a sum of sinusoids at different frequencies.

> **Key Insight:** A complex waveform in time becomes a simple set of spikes in frequency. This is the foundation of spectral analysis.

## What You'll Learn

1. **Periodic Signal Fundamentals** — How to characterize repeating signals using T₀, f₀, and ω₀
2. **Exponential Fourier Series** — Representing signals as sums of complex exponentials e^(jkω₀t)
3. **Computing Coefficients** — The analysis equation that extracts Xk from any periodic signal
4. **Fourier Series Properties** — Shortcuts that avoid re-computing integrals from scratch

## Why This Matters

The Fourier Series is fundamental to:
- **Audio Engineering** — Analyzing musical tones and harmonics
- **Power Systems** — Detecting harmonic distortion in AC waveforms
- **Communications** — Understanding signal bandwidth
- **Medical Imaging** — MRI and CT scan reconstruction

## The Big Picture

```
Time Domain                    Fourier Series Domain
    x(t)        ────────────►      Xk (magnitude, phase)
  [waveform]                    [spectrum of spikes]
```

When you see a periodic signal oscillating in time, each frequency component contributes a "spike" in the Fourier domain. The height tells you amplitude; the angle tells you phase.

## Prerequisites

- Understanding of LTI systems and convolution (Lesson 03)
- Complex numbers and Euler's formula
- Basic integration techniques
