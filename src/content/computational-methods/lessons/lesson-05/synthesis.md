# Bringing It All Together

## A Practical Root-Finding Workflow

This lesson gives you a complete progression for solving equations computationally. When you face a new nonlinear equation, you can now think in stages instead of guessing blindly.

| Stage | What you do | What you learn |
|-------|-------------|----------------|
| **Visual scan** | Plot $f(x)$ or $1/|f(x)|$ | Where roots may exist, whether there are multiple roots, whether complex roots should be expected |
| **Safe localization** | Use bisection on an interval with a sign change | A guaranteed real root estimate with predictable linear improvement |
| **Fast local refinement** | Switch to Newton-Raphson or secant | Much faster local convergence once you are near the root |
| **Alternative formulation** | Rewrite as $x = g(x)$ | Whether the problem can be solved by contraction mapping ideas |
| **Advanced acceleration** | Use Halley or Householder when derivatives are available | Higher-order convergence near a simple root |

## The Main Decision Rule

> **Why This Matters**: Good computational engineering is not about memorizing formulas. It is about matching the method to the information you have.

If you only know that the function is continuous and changes sign, bisection is the dependable choice.

If you also know the derivative and can start close to the root, Newton-Raphson is usually much faster.

If derivatives are awkward but function evaluations are easy, secant becomes attractive.

If the problem naturally appears as a repeated update law, fixed-point iteration may be the cleanest lens.

If you need very fast local refinement and higher derivatives are cheap, Halley and the wider Householder family become worth considering.

## The Convergence Story

The lecture notes also connect all these methods through a single theme: **how the error evolves**.

- **Bisection** halves the interval each iteration, so its improvement is steady and guaranteed
- **Fixed-point iteration** is usually linear when the contraction factor is below 1
- **Newton-Raphson** is quadratic near a simple root, so correct digits grow dramatically
- **Halley's method** is cubic for simple roots, giving even stronger local acceleration

This is the bridge between lesson 04 and lesson 05. The abstract language of convergence is no longer abstract. You have now seen it attached to actual solvers.

## What Comes Next

These root-finding ideas reappear all over engineering computation:

- nonlinear circuit operating-point solvers
- implicit time-stepping schemes for differential equations
- optimization algorithms built from stationarity conditions
- eigenvalue and resonance calculations

So even though the examples in this lesson focus on equations like $x^2 - 2 = 0$, the real lesson is broader:

> **Key Insight**: Equation-solving is one of the hidden engines inside almost every serious computational tool.

You now have the vocabulary to describe not only whether a method works, but why it works, when it fails, how fast it converges, and what assumptions it needs.
