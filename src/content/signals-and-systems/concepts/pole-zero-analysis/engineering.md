# Engineering Applications of Pole-Zero Analysis

## Quick System Assessment

Looking at a pole-zero plot, engineers can immediately assess:
1. **Stability**: Any poles in RHP? → Unstable
2. **Speed**: Distance of dominant pole from jω-axis → Time constant
3. **Oscillation**: Complex poles → Ringing in response
4. **Damping ratio**: Angle from negative real axis

## Time Constant from Poles

For a real pole at s = -a:
- Time constant τ = 1/a
- The response reaches 63% of final value in τ seconds
- Pole at s = -10 → τ = 0.1s (fast)
- Pole at s = -0.1 → τ = 10s (slow)

## Damping Ratio from Complex Poles

For complex poles at s = -σ ± jω:
- Natural frequency: ωₙ = √(σ² + ω²)
- Damping ratio: ζ = σ/ωₙ = cos(θ)

Where θ is the angle from the negative real axis:
- ζ < 1: Underdamped (oscillations)
- ζ = 1: Critically damped (fastest non-oscillatory)
- ζ > 1: Overdamped (sluggish)

## Design by Pole Placement

Control engineers design systems by choosing pole locations:
- Move poles left → faster response
- Move poles toward real axis → less oscillation
- Add zeros → shape transient, improve phase margin

## Filter Design

- **Lowpass**: Poles near jω-axis at low frequencies
- **Highpass**: Zeros at origin
- **Bandpass**: Poles near jω-axis at center frequency
- **Notch**: Zeros on jω-axis at notch frequency
