# Approximation Methods - Mathematical Foundations

## Taylor's Theorem: The Complete Statement

### Single Variable Form

If f has n+1 continuous derivatives on interval [a, x], then:

$$f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x-a)^k + R_n(x)$$

where $R_n(x)$ is the **remainder term**.

### Forms of the Remainder

**Lagrange Form** (most useful for error bounds):
$$R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$$
for some ξ between a and x.

**Cauchy Form**:
$$R_n(x) = \frac{f^{(n+1)}(\xi)}{n!}(x-\xi)^n(x-a)$$

**Integral Form** (exact but often impractical):
$$R_n(x) = \frac{1}{n!}\int_a^x (x-t)^n f^{(n+1)}(t) dt$$

---

## Derivation: Why Taylor Series Works

### Key Insight: Matching Derivatives

We want polynomial $P_n(x) = \sum_{k=0}^{n} c_k(x-a)^k$ to match f at x = a.

**Match values**: $P_n(a) = c_0 = f(a)$

**Match first derivative**: 
$P_n'(x) = c_1 + 2c_2(x-a) + 3c_3(x-a)^2 + ...$
$P_n'(a) = c_1 = f'(a)$

**Match second derivative**:
$P_n''(x) = 2c_2 + 6c_3(x-a) + ...$
$P_n''(a) = 2c_2 = f''(a)$, so $c_2 = f''(a)/2$

**Pattern**: $c_k = f^{(k)}(a)/k!$

---

## Error Analysis: Step by Step

### Problem: Bound the error of n-term Taylor approximation

**Given**: f(x), expansion point a, number of terms n, evaluation point x

**Step 1**: Find the (n+1)th derivative: $f^{(n+1)}(t)$

**Step 2**: Bound it on [a, x]: Find M such that $|f^{(n+1)}(t)| ≤ M$ for t ∈ [a, x]

**Step 3**: Apply Lagrange remainder:
$$|R_n(x)| ≤ \frac{M}{(n+1)!}|x-a|^{n+1}$$

### Worked Example: sin(x) at a = 0

**Goal**: Bound error of 3-term approximation sin(x) ≈ x - x³/6 for |x| ≤ 0.5

**Step 1**: Third-order uses terms up to x³, so error involves $f^{(4)}(x) = \sin(x)$

Wait—let's be careful. The expansion:
- $\sin(0) = 0$ (0th term)
- $\cos(0) = 1$ (1st term: x)
- $-\sin(0) = 0$ (2nd term: 0)
- $-\cos(0) = -1$ (3rd term: -x³/6)
- $\sin(0) = 0$ (4th term: 0)
- $\cos(0) = 1$ (5th term: x⁵/120)

So error after including x³/6 term involves the 5th derivative:
$f^{(5)}(x) = \cos(x)$

**Step 2**: $|\cos(\xi)| ≤ 1$ for all ξ

**Step 3**: $|R| ≤ \frac{1}{5!}|x|^5 = \frac{(0.5)^5}{120} = 2.6 \times 10^{-4}$

---

## Convergence: When Does the Series Work?

### Ratio Test for Power Series

The Taylor series $\sum c_n(x-a)^n$ converges absolutely if:

$$\lim_{n \to \infty} \left|\frac{c_{n+1}(x-a)^{n+1}}{c_n(x-a)^n}\right| < 1$$

### Radius of Convergence

$$R = \lim_{n \to \infty} \left|\frac{c_n}{c_{n+1}}\right|$$

Series converges for $|x - a| < R$, diverges for $|x - a| > R$.

### Examples

| Function | R at a=0 | Reason |
|----------|----------|--------|
| $e^x$ | ∞ | All derivatives bounded |
| $\sin(x)$ | ∞ | All derivatives bounded |
| $\ln(1+x)$ | 1 | Singularity at x = -1 |
| $1/(1-x)$ | 1 | Singularity at x = 1 |
| $\sqrt{1+x}$ | 1 | Branch point at x = -1 |

---

## Important Series Derivations

### Exponential Function

$f(x) = e^x$, $f^{(n)}(x) = e^x$, $f^{(n)}(0) = 1$

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + ...$$

### Trigonometric Functions

$\sin(x)$: Only odd derivatives are nonzero at 0, alternating ±1
$$\sin(x) = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}$$

$\cos(x)$: Only even derivatives are nonzero at 0, alternating ±1
$$\cos(x) = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!}$$

### Natural Logarithm

For $\ln(1+x)$, integrate the geometric series:
$$\frac{1}{1+x} = 1 - x + x^2 - x^3 + ...$$

$$\ln(1+x) = \int_0^x \frac{dt}{1+t} = x - \frac{x^2}{2} + \frac{x^3}{3} - ...$$

---

## Multivariate Taylor Series

### Two Variables

$$f(x,y) = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$$
$$+ \frac{1}{2!}[f_{xx}(a,b)(x-a)^2 + 2f_{xy}(a,b)(x-a)(y-b) + f_{yy}(a,b)(y-b)^2] + ...$$

### Compact Notation

Using gradient ∇f and Hessian H:
$$f(\mathbf{x}) = f(\mathbf{a}) + \nabla f|_{\mathbf{a}} \cdot (\mathbf{x}-\mathbf{a}) + \frac{1}{2}(\mathbf{x}-\mathbf{a})^T H|_{\mathbf{a}} (\mathbf{x}-\mathbf{a}) + ...$$

---

## Alternative Approximation Methods

### Padé Approximants

Ratio of polynomials: $f(x) \approx \frac{P_m(x)}{Q_n(x)}$

Better than Taylor for functions with poles. Example for $e^x$:
$$e^x \approx \frac{1 + x/2}{1 - x/2}$$ (first-order Padé)

### Chebyshev Polynomials

Minimize maximum error over interval (minimax approximation).
Better than Taylor for uniform accuracy.

### Least Squares Fitting

Minimize integrated squared error. Good for noisy data.

---

## Computational Considerations

### Horner's Method for Evaluation

Instead of computing each power separately:
$$p(x) = a_0 + a_1 x + a_2 x^2 + a_3 x^3$$

Use nested form:
$$p(x) = a_0 + x(a_1 + x(a_2 + x \cdot a_3))$$

**Reduces operations**: n multiplications instead of n(n+1)/2

### Avoiding Catastrophic Cancellation

When $|x|$ is small:
- Direct: $e^x - 1 = (1 + x + x^2/2 + ...) - 1$ loses precision
- Better: Compute $e^x - 1$ directly from series $x + x^2/2 + ...$

Many languages provide `expm1(x)` for this!

---

## Key Theorems Summary

1. **Taylor's Theorem**: Any smooth function equals its Taylor polynomial plus remainder
2. **Lagrange Remainder**: Error bounded by $(n+1)$th derivative times $(x-a)^{n+1}/(n+1)!$
3. **Ratio Test**: Determines radius of convergence
4. **Uniform Convergence**: On compact subsets of convergence region
