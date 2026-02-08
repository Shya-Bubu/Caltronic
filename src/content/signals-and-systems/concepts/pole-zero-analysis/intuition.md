# Pole-Zero Analysis

## Understanding the s-Plane

The s-plane is where we visualize system behavior. The horizontal axis is the real part σ (determines growth/decay), and the vertical axis is the imaginary part jω (determines oscillation frequency).

## Poles: Where H(s) → Infinity

**Poles** are roots of the denominator. At these points, the transfer function blows up.

- **Location matters**: Poles tell us everything about transient behavior
- **Left Half-Plane (LHP)**: σ < 0 → decaying response (stable)
- **Right Half-Plane (RHP)**: σ > 0 → growing response (unstable)
- **Imaginary axis**: σ = 0 → sustained oscillation (marginally stable)

## Zeros: Where H(s) = 0

**Zeros** are roots of the numerator. At these frequencies, output is blocked.

- Less dramatic than poles for stability
- Shape the frequency response
- Can cancel poles (but carefully!)

## Reading the Pole-Zero Plot

Each pole contributes a term to the impulse response:
- Real pole at s = -a → e^(-at) (exponential decay)
- Complex poles at s = -σ ± jω → e^(-σt)cos(ωt) (damped oscillation)
- Pole at origin → constant (integrator behavior)

## Dominant Poles

The **dominant pole** is the one closest to the imaginary axis (rightmost). It determines:
- How fast the system responds
- The overall character of the transient

Other poles contribute faster-decaying terms that die out quickly.

## Pole-Zero Cancellation

When a pole and zero are close together, the zero partially "cancels" the pole's effect. But beware:
- Exact cancellation still has hidden modes
- Near-cancellation may cause unexpected behavior
- Never cancel RHP poles with RHP zeros (unstable hidden mode)
