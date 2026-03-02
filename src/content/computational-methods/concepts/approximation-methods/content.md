# Approximation: Replacing the Complex with the Simple

> **Why This Matters**: Approximation is the single most pervasive idea in computational methods. Whenever you compute anything on a computer, you are approximating — because computers have finite memory, finite precision, and finite time. Understanding *what* you're approximating and *how much error* you're accepting is the difference between a trustworthy result and a dangerous one.

## Definition

> **Approximation**: Replacing complex, intractable, or unknown quantities with simpler, tractable ones while accepting some error.

The core idea: **we accept some error to make a problem solvable or computationally feasible.**

## Example 1: Function Approximation (Taylor Series)

The function $\sin(x)$ is transcendental — it cannot be computed exactly by finite arithmetic. But we can approximate it as a polynomial using the Taylor series around $x = 0$:

$$\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$$

[[visual:taylor-series-sin-x]]

We **truncate** this infinite series to get a finite approximation:

- **1st order**: $\sin(x) \approx x$ — error $\sim x^3/6$ for small $x$
- **3rd order**: $\sin(x) \approx x - x^3/6$ — much better for larger $x$
- **5th order**: $\sin(x) \approx x - x^3/6 + x^5/120$ — excellent up to $|x| < 2$

[[visual:taylor-order-comparison]]

Why is this approximation? We're replacing an **infinite process** (the full series) with a **finite one** (a polynomial). The trade-off is clear: more terms = more accuracy but more computation.

<details>
<summary><strong>Pause & Think</strong>: Your calculator computes sin(x) using a similar polynomial approximation — typically 7th or 9th order. Why don't they use more terms?</summary>

Because by the 9th-order term, the approximation error is smaller than the machine epsilon (the smallest representable difference between two floating-point numbers, typically $\sim 10^{-16}$ for double precision). Adding more terms would contribute zero additional accuracy due to rounding. The approximation error is already smaller than the representation error.

</details>

## Example 2: Model Simplification (Diode)

A real diode has the I-V relationship:

$$I = I_S\left(e^{V/V_T} - 1\right)$$

For specific operating regimes, we simplify:

[[visual:diode-model-approximations]]

- **Reverse bias** ($V \ll -V_T$): $I \approx -I_S$ (constant leakage)
- **Forward bias** ($V > 0$): $I \approx I_S \cdot e^{V/V_T}$ (exponential, dropping the $-1$)
- **Strong forward bias**: $I \approx$ linear (piecewise model with $V_{on} \approx 0.7$ V)

Each simplification ignores parts of the physical behavior to get a model that's easier to work with. The piecewise-linear model, for instance, lets you solve diode circuits with simple algebra instead of transcendental equations.

> **Key Insight**: Model simplification is approximation of the *physics*, not just the *math*. You're deciding which physical effects matter for your application and discarding the rest.

## Example 3: Numerical Approximation of π

The Leibniz formula gives $\pi$ as an infinite series:

$$\pi = 4 \times \left(1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \frac{1}{9} - \cdots\right)$$

[[visual:pi-convergence]]

Truncating after $N$ terms gives an approximation with error $\sim 1/N$. This is extremely slow convergence — you need $N = 1000$ terms to get just 3 correct digits of $\pi$.

Compare this to the **Machin formula** which converges much faster, or the **Chudnovsky algorithm** used by modern computers to compute trillions of digits. The *idea* is the same (truncate an infinite process), but the *rate of convergence* varies enormously between different approximation strategies.

## The Key Attribute

[[visual:approximation-tradeoff]]

Every approximation involves a trade-off:

$$\boxed{\text{Accuracy} \longleftrightarrow \text{Tractability (simplicity, speed, cost)}}$$

The engineer's job is to find the sweet spot: **accurate enough for the application, simple enough to compute.** A bridge designer needs $\pi \approx 3.14159$ (6 digits). A GPS satellite needs $\pi$ to 15 digits. A mathematician computing Riemann zeta values might need millions of digits. Same concept, different tolerance requirements.

## What Approximation Is NOT

Approximation is often confused with related concepts. To sharpen your understanding:

| This IS approximation | This is NOT (just) approximation |
|----------------------|----------------------------------|
| Truncating Taylor series | Sampling a signal at discrete times (that's discretization) |
| Simplifying a model | Replacing $\sin\theta$ with $\theta$ at a specific point (that's linearization) |
| Rounding a number | Using random points to estimate an integral (that's random sampling) |

[[visual:not-approximation-comparison]]

> **Important**: Linearization is a *special case* of approximation. All linearizations are approximations, but not all approximations are linearizations. Similarly, discretization *often involves* approximation (e.g., replacing a derivative with a finite difference), but they are conceptually distinct.

## Summary

- Approximation replaces complex quantities with simpler ones, accepting some error
- The *trade-off* between accuracy and tractability is the defining feature
- Three common forms: **series truncation** ($\sin x \approx x - x^3/6$), **model simplification** (ideal diode), **numerical computation** ($\pi$ to $N$ terms)
- Approximation is related to but distinct from discretization, linearization, and random sampling
- The error can almost always be estimated or bounded — always ask: **how good is this approximation?**
