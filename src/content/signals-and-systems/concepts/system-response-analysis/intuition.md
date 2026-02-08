# System Response Analysis

## Understanding System Response

When we apply an input to a system, the output has two parts:
1. **Transient response**: The initial behavior that dies out
2. **Steady-state response**: What remains after transients settle

## Step Response

The step response is the system's output when input is u(t). It reveals:
- How fast the system responds
- Whether it overshoots
- How long until it settles

## Key Time-Domain Specifications

### Rise Time (tr)
Time for response to go from 10% to 90% of final value. Indicates speed.

### Peak Time (tp)
Time to reach maximum overshoot. Occurs at first peak.

### Maximum Overshoot (Mp)
How much the response exceeds the final value: Mp = (peak - final)/final × 100%

### Settling Time (ts)
Time for response to stay within 2% (or 5%) of final value.

## Second-Order System Response

Most systems approximate second-order behavior:
$$H(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

The poles are at:
$$s = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}$$

For underdamped (ζ < 1):
$$s = -\sigma \pm j\omega_d$$
where σ = ζωn (decay rate) and ωd = ωn√(1-ζ²) (damped frequency)

## Effect of Damping Ratio

- **ζ > 1** (Overdamped): Sluggish, no overshoot
- **ζ = 1** (Critically damped): Fastest without overshoot
- **0 < ζ < 1** (Underdamped): Oscillates, overshoots
- **ζ = 0** (Undamped): Sustained oscillation
