# Exam Strategies: Continuous Convolution

## Common Question Types

### Type 1: Compute Convolution Integral
- Identify non-zero regions of x(τ) and h(t-τ)
- Set up correct integration limits
- Evaluate the integral

### Type 2: Use Properties
- Identity: x * δ = x
- Delay: x * δ(t-T) = x(t-T)
- Derivative: d/dt(x*h) = (dx/dt)*h

### Type 3: Graphical Convolution
- Sketch x(τ) and h(t-τ)
- Find overlap regions
- Integrate for each segment

## Key Formulas

1. $y(t) = \int x(\tau)h(t-\tau)d\tau$
2. $x(t) * \delta(t) = x(t)$
3. $x(t) * \delta(t-T) = x(t-T)$
4. Transform: $Y(s) = X(s)H(s)$

## Common Mistakes

- Wrong integration limits (check causality!)
- Confusing variable of integration (τ) with output time (t)
- Forgetting to flip h before shifting
