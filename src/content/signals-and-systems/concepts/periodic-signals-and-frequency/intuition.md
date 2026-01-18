# Periodic Signals and Frequency Fundamentals

## The Repeating Pattern

A **periodic signal** is any signal that repeats itself exactly after a fixed time interval. Think of a heartbeat, a pendulum swing, or an AC power waveform—they all return to the same state after a predictable duration.

[[visual:v1]]

> **Core Definition:** A signal x(t) is periodic if there exists a positive number T such that:
> $$x(t) = x(t + T) \text{ for all } t$$

The smallest such T is called the **fundamental period** T₀.

## Key Parameters

[[visual:v3]]

### Fundamental Period (T₀)
The shortest time after which the signal repeats. Measured in seconds.

### Fundamental Frequency (f₀)
How many complete cycles occur per second:
$$f_0 = \frac{1}{T_0} \text{ (Hertz)}$$

### Angular Frequency (ω₀)
Frequency expressed in radians per second:
$$\omega_0 = 2\pi f_0 = \frac{2\pi}{T_0} \text{ (rad/s)}$$

## Visual Understanding

[[visual:v2]]

Imagine watching a ferris wheel:
- T₀ = time for one complete rotation
- f₀ = rotations per second
- ω₀ = angle covered per second (in radians)

If the wheel takes 60 seconds per rotation:
- T₀ = 60 s
- f₀ = 1/60 Hz ≈ 0.0167 Hz
- ω₀ = 2π/60 ≈ 0.105 rad/s

## Integer Multiples Property

If x(t) = x(t + T₀), then x(t) = x(t + mT₀) for any integer m.

This means:
- x(t) = x(t + T₀) = x(t + 2T₀) = x(t + 3T₀) = ...
- x(t) = x(t - T₀) = x(t - 2T₀) = ...

The signal looks identical at intervals of T₀, 2T₀, 3T₀, etc.

## Power Signals

[[visual:v6]]

Periodic signals are **power signals**:
- They have **finite average power** (energy per unit time is bounded)
- They have **infinite total energy** (signal lasts forever)

This distinguishes them from energy signals (finite total energy, zero average power).

## Example: Composite Periodic Signal

[[visual:v5]]

Consider: $x(t) = 11 + 4\sin(5t) + \frac{4}{3}\sin(15t)$

Breaking it down:
- **DC component:** 11 (constant offset, centers the signal)
- **First harmonic:** 4sin(5t) with ω₁ = 5 rad/s → T₁ = 2π/5
- **Third harmonic:** (4/3)sin(15t) with ω₃ = 15 rad/s → T₃ = 2π/15

The **fundamental frequency** is determined by the lowest harmonic:
- ω₀ = 5 rad/s
- T₀ = 2π/5 seconds

Note: 15 = 3 × 5, so the third harmonic completes exactly 3 cycles in one fundamental period.

## Why Inter-Domain Analysis?

So far, we've represented signals only on the **time axis**. But the same signal can be viewed on other axes:
- **Frequency domain** (Fourier analysis)
- **s-domain** (Laplace transform)
- **z-domain** (for discrete signals)

Each representation reveals different properties. A complex waveform in time may become simple spikes in frequency!

> **Key Insight:** There is no single "correct" representation. Different domains highlight different signal properties, making analysis easier.
