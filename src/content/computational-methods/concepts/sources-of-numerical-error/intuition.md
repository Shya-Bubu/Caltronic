# Sources of Numerical Error

## Error is Inevitable—But Controllable

Every numerical computation contains error. The goal isn't to eliminate error, but to understand, bound, and control it.

[[visual:v1]]

## The Three Main Error Types

### 1. Truncation Error
Comes from approximating infinite or continuous processes with finite ones.

**Examples:**
- Using first 10 terms of Taylor series instead of infinite
- Replacing integral with finite sum
- Discrete time steps instead of continuous time

$$\sin(x) = x - \frac{x^3}{6} + \frac{x^5}{120} - ... \approx x - \frac{x^3}{6}$$

Stopping at $x^3$ gives truncation error of order $O(x^5)$.

[[visual:v2]]

### 2. Round-off Error
Comes from finite precision of floating-point arithmetic.

**Examples:**
- 0.1 stored as 0.100000000000000005551...
- $(1 + 10^{-16}) - 1 = 0$ in double precision
- Accumulation over millions of operations

This is the error we discussed with machine epsilon.

### 3. Propagation Error
How errors (from any source) grow or shrink through calculations.

**Stable propagation:** Errors stay bounded
**Unstable propagation:** Errors grow exponentially

[[visual:v3]]

## Error Measurement

### Absolute Error
$$E_{abs} = |x_{true} - x_{approx}|$$

### Relative Error
$$E_{rel} = \frac{|x_{true} - x_{approx}|}{|x_{true}|}$$

> **Key Insight:** Relative error is usually more meaningful. An error of 0.001 is huge for 0.01 but tiny for 1000.

## A Dangerous Example

Computing $e^{-10}$ using Taylor series:

$$e^{-10} = 1 - 10 + \frac{100}{2} - \frac{1000}{6} + ...$$

Early terms are huge and cancel:
- +1, -10, +50, -166.7, +416.7, -833.3...

Catastrophic cancellation! Final result $e^{-10} \approx 0.0000454$ requires perfect precision in large intermediate terms.

**Better approach:** Compute $e^{10}$ (no cancellation) then take $1/e^{10}$.

## The Error Budget

Think of error like a budget:
1. **Source errors:** Measurement, modeling
2. **Algorithm errors:** Truncation
3. **Arithmetic errors:** Round-off
4. **Propagation:** How errors combine

Total error ≤ Sum of all contributions (worst case)

## Condition Number

**Condition number** measures problem sensitivity:
$$\text{cond} = \frac{\text{Relative change in output}}{\text{Relative change in input}}$$

- **Well-conditioned:** cond ≈ 1-10
- **Ill-conditioned:** cond >> 1

A well-designed algorithm can't fix an ill-conditioned problem!
