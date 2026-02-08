# Engineering Applications

## Design Specifications

Control engineers specify requirements as:
- Rise time < 0.5 s (speed)
- Overshoot < 10% (smoothness)
- Settling time < 2 s (stability)
- Steady-state error < 2% (accuracy)

## Formulas for Second-Order Systems

For underdamped (ζ < 1):

**Peak time**: $t_p = \frac{\pi}{\omega_d} = \frac{\pi}{\omega_n\sqrt{1-\zeta^2}}$

**Maximum overshoot**: $M_p = e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\%$

**Settling time (2%)**: $t_s \approx \frac{4}{\zeta\omega_n}$

**Rise time (approx)**: $t_r \approx \frac{1.8}{\omega_n}$

## Practical Considerations

Real systems are often approximated by second-order:
- Higher-order poles far left contribute fast-decaying transients
- Dominant pole pair determines overall behavior
- Zeros affect overshoot and rise time

## Trade-offs

- Faster response (higher ωn) → more overshoot
- Less overshoot (higher ζ) → slower response
- Good design balances these competing requirements
