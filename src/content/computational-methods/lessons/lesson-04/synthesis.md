# Bringing It All Together

## Complexity Meets Convergence

The two halves of this lesson are deeply connected. When you choose a numerical method, you must consider both:

1. **How does cost scale?** (Big-O complexity)
2. **How does accuracy improve?** (Order/rate of convergence)

| Method | Cost per iteration | Convergence rate | Typical use |
|--------|-------------------|-----------------|-------------|
| Taylor series ($E_k$) | $O(k)$ | Linear ($m = 1$) | Function evaluation |
| Bisection | $O(1)$ | Linear ($C = 0.5$) | Root finding (robust) |
| Newton-Raphson | $O(1)$ for scalar | Quadratic ($m = 2$) | Root finding (fast) |
| Matrix multiply | $O(N^3)$ | N/A (direct) | Linear algebra |
| Gauss elimination | $O(N^3)$ | N/A (direct) | Solving $Ax = b$ |

## The Engineer's Decision

> **The best method balances cost-per-step with convergence rate.**

A method that converges quadratically but costs $O(N^3)$ per step may be slower than a linearly-converging method at $O(N)$ per step — depending on the problem size and accuracy requirements.

## Using Landau Symbols in Practice

- Use **Big-O** ($O$) for worst-case cost analysis — "this will never be worse than..."
- Use **Big-Θ** ($\Theta$) for tight bounds — "this is exactly of order..."
- Use **Big-Ω** ($\Omega$) for lower bounds — "this can never be faster than..."
- Use **little-o** ($o$) for convergence — "this error vanishes faster than..."

## Looking Ahead

The next lessons will apply these tools to specific numerical methods: root-finding, ODE solvers, and linear system solvers. For each, you'll analyze both complexity and convergence.
