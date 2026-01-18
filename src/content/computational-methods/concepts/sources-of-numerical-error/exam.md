# Exam Preparation: Sources of Numerical Error

## Key Definitions

1. **Truncation error:** Error from approximating infinite/continuous with finite
2. **Round-off error:** Error from finite floating-point precision
3. **Propagation error:** How errors grow through computation
4. **Condition number:** Sensitivity of output to input perturbations

## Common Question Types

### Type 1: Error Classification

**Q:** Classify the error in using $\sin(x) \approx x$ for small x.

**A:** This is **truncation error** from truncating the Taylor series after the first term. The next term is $-x^3/6$, so error is $O(x^3)$.

### Type 2: Error Computation

**Q:** Estimate the truncation error when computing $\sin(0.1)$ using $x - x^3/6$.

**A:** True: $\sin(0.1) = 0.0998334...$
Taylor: $0.1 - 0.1^3/6 = 0.1 - 0.000167 = 0.099833$
Error: $|0.0998334 - 0.099833| \approx 4 \times 10^{-7}$

This matches $O(x^5)/120 = 10^{-5}/120 \approx 8 \times 10^{-8}$.

### Type 3: Condition Number

**Q:** Calculate the condition number for $f(x) = 1/x$ at $x = 0.001$.

**A:**
$$\kappa = \left| \frac{x \cdot f'(x)}{f(x)} \right| = \left| \frac{x \cdot (-1/x^2)}{1/x} \right| = 1$$

The problem is well-conditioned! (Even though 1/0.001 = 1000 is large)

### Type 4: Error Propagation

**Q:** If $x = 1.000 \pm 0.001$ and $y = 0.999 \pm 0.001$, what is the error in $x - y$?

**A:**
Value: $x - y = 0.001$
Absolute error: $\delta(x-y) = \sqrt{0.001^2 + 0.001^2} \approx 0.0014$ (RSS)
Relative error: $0.0014 / 0.001 = 140\%$

**Catastrophic cancellation!** The result has 100%+ relative error.

## Practice Problems

1. Find the optimal step size for central difference with $f(x) = e^x$ at $x = 1$.

2. Explain why computing $e^{-20}$ via Taylor series is problematic.

3. If a computation accumulates 10⁶ additions, estimate the round-off error (assume worst case and statistical).

## Key Formulas

| Formula | Meaning |
|---------|---------|
| $E_{rel} = \|x_{true} - x_{approx}\| / \|x_{true}\|$ | Relative error |
| $\kappa = \|xf'(x)/f(x)\|$ | Condition number |
| $h_{opt} \sim \epsilon^{1/(p+1)}$ | Optimal step size |
| Forward diff error: $O(h)$ | First order |
| Central diff error: $O(h^2)$ | Second order |
