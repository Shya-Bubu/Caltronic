# Mathematical Foundations: Number Representation

## Binary Floating-Point Representation

### General Form
A floating-point number is represented as:
$$x = (-1)^s \times m \times 2^{e-bias}$$

Where:
- $s$ = sign bit (0 = positive, 1 = negative)
- $m$ = mantissa (1.xxxxx in normalized form)
- $e$ = biased exponent
- $bias$ = offset to allow negative exponents

### IEEE 754 Double Precision

$$\boxed{x = (-1)^s \times (1.f) \times 2^{e-1023}}$$

Where:
- $f$ = 52-bit fraction (implied leading 1)
- $e$ = 11-bit exponent (1 to 2046 for normal numbers)
- $bias$ = 1023

[[visual:v6]]

## Machine Epsilon

**Definition:** Machine epsilon is the smallest $\epsilon$ such that:
$$fl(1 + \epsilon) > 1$$

For double precision:
$$\epsilon_{mach} = 2^{-52} \approx 2.22 \times 10^{-16}$$

**Meaning:** Any operation at scale 1 has relative error of at most $\epsilon_{mach}/2$.

## Representable Number Ranges

### Normal Numbers
$$2^{-1022} \leq |x| \leq (2 - 2^{-52}) \times 2^{1023}$$

Approximately: $10^{-308}$ to $10^{308}$

### Subnormal (Denormal) Numbers
When exponent = 0:
$$x = (-1)^s \times (0.f) \times 2^{-1022}$$

These allow gradual underflow to zero but have reduced precision.

## Error Bounds

### Rounding Error
When a real number $x$ is stored as $fl(x)$:
$$\left| \frac{fl(x) - x}{x} \right| \leq \frac{1}{2} \epsilon_{mach}$$

This is the **unit roundoff** or relative precision.

### Floating-Point Arithmetic
For operation $\circ \in \{+, -, \times, \div\}$:
$$fl(a \circ b) = (a \circ b)(1 + \delta)$$

Where $|\delta| \leq \epsilon_{mach}$.

## Gap Between Consecutive Floats

The spacing between adjacent floating-point numbers at magnitude $|x|$ is approximately:
$$\Delta x \approx \epsilon_{mach} \times |x|$$

This means:
- Near 1.0: gaps ≈ $10^{-16}$
- Near $10^{10}$: gaps ≈ $10^{-6}$

## Catastrophic Cancellation

When subtracting nearly equal numbers:
$$fl(a - b) = (a - b)(1 + \delta)$$

If $a \approx b$, then $a - b$ is very small, and absolute error:
$$|fl(a-b) - (a-b)| = |a-b||\delta| \leq |a-b| \epsilon_{mach}$$

But relative error can be huge if $a - b \ll |a|$ or $|b|$.

**Example:**
$$a = 1.0000001, \quad b = 1.0000000$$
$$a - b = 10^{-7}$$

The result has only ~9 significant digits instead of 16.

## Numerical Stability

An algorithm is **numerically stable** if:
- Small input perturbations cause only small output changes
- Accumulated rounding errors stay bounded

**Conditioning** measures sensitivity of the mathematical problem.
**Stability** measures error behavior of the specific algorithm.
