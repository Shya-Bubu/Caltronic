# Exam Focus: Delta Functions and Unit Impulse

## Key Formulas to Memorize

1. **Sifting Property**: $\int_{-\infty}^{\infty} x(t) \delta(t-t_0) \, dt = x(t_0)$

2. **Step-Impulse Relationship**: $\frac{d}{dt}u(t) = \delta(t)$ and $\int_{-\infty}^{t}\delta(\tau)d\tau = u(t)$

3. **Scaling Property**: $\delta(at) = \frac{1}{|a|}\delta(t)$

4. **Discrete Impulse**: $\delta[n] = u[n] - u[n-1]$

## Common Exam Question Types

### Type 1: Evaluate Sifting Integrals
$$\int_{-\infty}^{\infty} (t^2 + 3t + 5)\delta(t-2) \, dt = ?$$
**Answer**: Substitute $t = 2$: $4 + 6 + 5 = 15$

### Type 2: Signal Decomposition
Express $x(t) = 3u(t) - 5u(t-2) + 2u(t-4)$ in terms of its impulse train derivative.

### Type 3: Discrete-Time Sums
$$\sum_{n=-\infty}^{\infty} (0.5)^n \delta[n-3] = ?$$
**Answer**: $(0.5)^3 = 0.125$

## Common Mistakes to Avoid

- Forgetting the scaling property $\delta(at) = \frac{1}{|a|}\delta(t)$
- Confusing $\delta[n]$ (equals 1) with $\delta(t)$ (infinite at origin)
- Wrong integration limits when impulse is at boundary
