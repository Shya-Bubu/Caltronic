# Engineering Applications of Laplace Properties

## Circuit Analysis with Laplace Transform

The Laplace transform properties make circuit analysis systematic and elegant.

### Impedance Concept

Using the differentiation property, we can define impedances:
- **Resistor**: $Z_R = R$ (no derivative, no s)
- **Inductor**: $V = L\frac{di}{dt}$ → $Z_L = sL$
- **Capacitor**: $i = C\frac{dv}{dt}$ → $Z_C = \frac{1}{sC}$

All elements now obey Ohm's law: V(s) = Z(s)I(s)

### Example: RC Circuit Step Response

For an RC lowpass filter with input step voltage:
- $H(s) = \frac{1/(sC)}{R + 1/(sC)} = \frac{1}{1 + sRC}$
- $X(s) = 1/s$ (step input)
- $Y(s) = H(s)X(s) = \frac{1}{s(1+sRC)}$

Using partial fractions and inverse transform:
$y(t) = (1 - e^{-t/RC})u(t)$

The time constant RC emerges naturally from the pole location.

## Solving Differential Equations

Convert ODEs to algebraic equations using properties:

**Example**: $\frac{dy}{dt} + 2y = e^{-t}u(t)$, with $y(0) = 1$

1. Transform: $sY(s) - 1 + 2Y(s) = \frac{1}{s+1}$
2. Solve: $Y(s)(s+2) = 1 + \frac{1}{s+1}$
3. $Y(s) = \frac{1}{s+2} + \frac{1}{(s+1)(s+2)}$
4. Partial fractions and inverse transform give solution

## Control System Applications

### Using Initial Value Theorem
Check if your computed H(s) makes physical sense:
$h(0^+) = \lim_{s \to \infty} sH(s)$

For a proper system (degree of numerator < degree of denominator), h(0+) = 0.

### Using Final Value Theorem
Find steady-state error without simulating:
$e_{ss} = \lim_{s \to 0} sE(s)$

For unity feedback system with step input:
$e_{ss} = \lim_{s \to 0} \frac{s \cdot (1/s)}{1 + G(s)}$
