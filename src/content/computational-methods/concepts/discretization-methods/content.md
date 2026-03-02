# Discretization: From Continuous to Discrete

> **Why This Matters**: Every signal you process on a computer, every PDE you simulate, every system you analyze digitally — has been discretized. Discretization is how the continuous physical world enters the digital computational world. Understanding what information you keep, what you lose, and how errors arise is essential for every ECE engineer.

## Definition

> **Discretization**: Converting continuous-domain problems (time, space, frequency) into discrete-point problems for digital processing.

The core idea: **we sample a continuous quantity at specific points, losing information between samples.**

## Example 1: Time Sampling (ADC)

The most familiar form of discretization is converting an analog signal to digital using an ADC:

$$\boxed{x[n] = x(nT_s), \quad n = 0, 1, 2, \ldots}$$

[[visual:adc-time-sampling]]

- **Continuous**: $x(t) = \sin(2\pi f t)$ for all $t \in \mathbb{R}$ — defined at every instant
- **Discrete**: $x[n] = \sin(2\pi f n T_s)$ for $n \in \mathbb{Z}$ — defined only at sample moments

The sampling period $T_s$ determines how much of the original signal is captured. The **Nyquist theorem** tells us: to avoid information loss, $f_s = 1/T_s \geq 2f_{max}$.

> **Key Insight**: Discretization is not the same as approximation, though they often appear together. In discretization, you're changing the *domain* from continuous to countable. In approximation, you're changing the *value* from exact to approximate. Sampling at the Nyquist rate with perfect reconstruction is discretization without approximation error.

## Example 2: Spatial Discretization (Finite Differences)

Derivatives on a computer can't be computed exactly — they require infinitesimal limits that discrete arithmetic can't represent. The solution: **finite difference approximations** on a spatial grid:

[[visual:finite-difference-grid]]

$$\frac{df}{dx} \approx \frac{f(x + h) - f(x)}{h} \quad \text{(forward difference)}$$

$$\boxed{\frac{d^2f}{dx^2} \approx \frac{f(x+h) - 2f(x) + f(x-h)}{h^2} \quad \text{(central 2nd difference)}}$$

Here the continuous domain $x \in [a, b]$ is replaced by a discrete grid of points $x_i = a + ih$, $i = 0, 1, \ldots, N$. The derivative, defined at *every* point, is replaced by an algebraic expression involving function values at *grid points* only.

> **Note**: This example shows where discretization and approximation overlap. The grid is discretization (continuous → discrete domain). The finite difference formula is also an approximation (exact derivative → approximate formula with $O(h)$ or $O(h^2)$ error).

<details>
<summary><strong>Pause & Think</strong>: For the forward difference, the error is O(h). For the central difference, it's O(h²). Why should you prefer central differences?</summary>

Central differences use symmetric information (points on both sides of x), which cancels the first-order error term by symmetry. The forward difference is biased — it only "looks" in one direction. For the same grid spacing h, central differences are typically 10–100× more accurate. Always choose central differences unless boundary conditions force one-sided formulas.

</details>

## Example 3: Frequency Discretization (DFT)

The Fourier transform is another case where both time AND frequency are discretized:

$$\text{Continuous: } X(f) = \int_{-\infty}^{\infty} x(t) e^{-j2\pi ft}\,dt$$

$$\boxed{\text{Discrete: } X[k] = \sum_{n=0}^{N-1} x[n] \cdot e^{-j2\pi kn/N}, \quad k = 0, 1, \ldots, N-1}$$

[[visual:dft-frequency-discretization]]

The DFT discretizes *both* domains:
- **Time**: $x(t) \rightarrow x[n]$ (time sampling)
- **Frequency**: $X(f) \rightarrow X[k]$ at frequencies $f_k = k \cdot f_s/N$ (frequency sampling)

With $N$ time samples and $N$ frequency bins, the DFT creates a complete mapping between discrete-time and discrete-frequency representations. The frequency resolution is $\Delta f = f_s/N$ — want finer resolution? Use more samples.

## Example 4: Solving PDEs on a Grid

Engineering problems often require solving partial differential equations like Laplace's equation for electromagnetic fields:

$$\nabla^2 V = 0 \quad \text{in 2D: } \frac{\partial^2 V}{\partial x^2} + \frac{\partial^2 V}{\partial y^2} = 0$$

[[visual:laplace-grid-discretization]]

- **Continuous**: $V(x, y)$ defined for all $(x, y)$ in the domain
- **Discrete**: $V[i, j]$ defined only at grid points $(i\Delta x, j\Delta y)$

The discretized equation becomes:

$$\boxed{\frac{V[i+1,j] - 2V[i,j] + V[i-1,j]}{\Delta x^2} + \frac{V[i,j+1] - 2V[i,j] + V[i,j-1]}{\Delta y^2} = 0}$$

This converts the PDE (infinite-dimensional problem) into a **finite system of linear equations** that a computer can solve. For a 100×100 grid, you get 10,000 equations in 10,000 unknowns — large, but solvable.

[[visual:discretization-error-vs-grid]]

## The Key Attribute

$$\boxed{\text{Discretization creates a countable representation of something inherently continuous.}}$$

[[visual:domain-discretization-table]]

| Domain | Continuous form | Discrete form |
|--------|----------------|---------------|
| Time | $x(t)$ | $x[n] = x(nT_s)$ |
| Space | $f(x)$ on $[a,b]$ | $f(x_i)$ on grid |
| Frequency | $X(f)$ for all $f$ | $X[k]$ for $k = 0, \ldots, N-1$ |
| Derivatives | $df/dx$ (limit) | $(f(x+h) - f(x))/h$ |

## Summary

- Discretization converts continuous domains to discrete ones (time, space, frequency)
- **ADC sampling**: $x[n] = x(nT_s)$ — Nyquist theorem governs information preservation
- **Finite differences**: derivatives on a grid — forward ($O(h)$ error) and central ($O(h^2)$ error)
- **DFT**: discretizes both time and frequency — $X[k] = \sum x[n] e^{-j2\pi kn/N}$
- **PDE solving**: continuous domains → finite grids → solvable equation systems
- Discretization often overlaps with approximation but is conceptually distinct
