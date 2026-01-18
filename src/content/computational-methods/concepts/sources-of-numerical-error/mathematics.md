# Mathematical Foundations: Numerical Error

## Truncation Error Analysis

### Taylor Series Foundation

Most truncation error analysis uses Taylor series:
$$f(x+h) = f(x) + hf'(x) + \frac{h^2}{2}f''(x) + \frac{h^3}{6}f'''(x) + ...$$

When we truncate, the leading omitted term estimates the error.

### Forward Difference Truncation Error

$$\frac{f(x+h) - f(x)}{h} = f'(x) + \frac{h}{2}f''(\xi)$$

Error: $\frac{h}{2}f''(\xi)$ = O(h) — First order

### Central Difference Truncation Error

$$\frac{f(x+h) - f(x-h)}{2h} = f'(x) + \frac{h^2}{6}f'''(\xi)$$

Error: $\frac{h^2}{6}f'''(\xi)$ = O(h²) — Second order

[[visual:v6]]

## Round-off Error Model

For any floating-point operation:
$$fl(x \circ y) = (x \circ y)(1 + \delta), \quad |\delta| \leq \epsilon_{mach}$$

Where $\circ \in \{+, -, \times, \div\}$.

### Accumulated Round-off

For n operations, worst-case bound:
$$\text{Total error} \leq n \cdot \epsilon_{mach}$$

But statistical analysis shows typical growth is $O(\sqrt{n})$.

## Condition Number

For a function $f(x)$:
$$\kappa = \left| \frac{x \cdot f'(x)}{f(x)} \right|$$

This measures sensitivity of output to input perturbations.

**Example:** $f(x) = \sqrt{x}$
$$\kappa = \left| \frac{x \cdot \frac{1}{2\sqrt{x}}}{\sqrt{x}} \right| = \frac{1}{2}$$

Well-conditioned! Small input errors give small output errors.

## Stability of Algorithms

An algorithm is **backward stable** if computed result is exact for slightly perturbed input:
$$\hat{y} = f(\hat{x})$$

Where $|\hat{x} - x| / |x| \leq \epsilon_{mach}$.

**Forward error:** $|y - \hat{y}|$
**Backward error:** $|x - \hat{x}|$

For a backward stable algorithm:
$$\text{Forward error} \leq \kappa \times \text{Backward error}$$

## Error Propagation

For a function $f(x_1, x_2, ..., x_n)$ with errors $\delta x_i$:
$$\delta f \approx \sum_{i=1}^{n} \frac{\partial f}{\partial x_i} \delta x_i$$

**Example:** $f = x - y$
$$\delta f = \delta x - \delta y$$

Relative error:
$$\frac{\delta f}{f} = \frac{\delta x - \delta y}{x - y}$$

When $x \approx y$, denominator is small → large relative error amplification.

## Optimal Step Size

For numerical differentiation:
- Truncation error: $O(h^p)$
- Round-off error: $O(\epsilon/h)$

Total error minimized when:
$$h_{opt} \sim \epsilon^{1/(p+1)}$$

For central difference ($p=2$):
$$h_{opt} \sim \epsilon^{1/3} \approx 10^{-5} \text{ for double precision}$$
