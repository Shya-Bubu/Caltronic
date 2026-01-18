# Mathematical Foundations: Computational Engineering

## The Mathematical Framework

Computational engineering transforms continuous mathematical problems into discrete numerical problems that computers can solve.

## Continuous vs. Discrete

### Continuous Domain
Functions are defined over real numbers:
$$f: \mathbb{R} \to \mathbb{R}$$

Example: $v(t) = V_0 e^{-t/\tau}$ for all $t \in [0, \infty)$

### Discrete Domain
Functions are defined at discrete points:
$$f: \{t_0, t_1, t_2, ..., t_n\} \to \mathbb{R}$$

Example: $v[k] = V_0 e^{-k\Delta t/\tau}$ for $k = 0, 1, 2, ..., n$

[[visual:v6]]

## Key Mathematical Operations

### Differentiation → Finite Differences

**Continuous:**
$$\frac{df}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

**Discrete (Forward Difference):**
$$\frac{df}{dx} \approx \frac{f(x+h) - f(x)}{h}$$

**Discrete (Central Difference):**
$$\frac{df}{dx} \approx \frac{f(x+h) - f(x-h)}{2h}$$

### Integration → Numerical Quadrature

**Continuous:**
$$\int_a^b f(x) \, dx$$

**Discrete (Trapezoidal Rule):**
$$\int_a^b f(x) \, dx \approx \frac{h}{2} \left[ f(a) + 2\sum_{k=1}^{n-1} f(x_k) + f(b) \right]$$

### Differential Equations → Algebraic Systems

The ODE:
$$\frac{dy}{dt} = f(t, y)$$

Becomes (Euler method):
$$y_{n+1} = y_n + h \cdot f(t_n, y_n)$$

## Linear Algebra Fundamentals

Most computational problems reduce to solving:
$$\mathbf{A}\mathbf{x} = \mathbf{b}$$

Where:
- $\mathbf{A}$ is an $n \times n$ matrix (often sparse)
- $\mathbf{x}$ is the unknown vector
- $\mathbf{b}$ is the known right-hand side

**Complexity:**
- Direct solve (Gaussian elimination): $O(n^3)$
- Iterative solve (conjugate gradient): $O(kn)$ where $k$ = iterations

## Function Spaces

Computational methods often work in function spaces:
- **$L^2$ space:** Square-integrable functions
- **Sobolev spaces:** Functions with weak derivatives
- **Polynomial spaces:** Finite-dimensional approximations

These provide the mathematical framework for error analysis and convergence proofs.

## Convergence

A numerical method converges if:
$$\lim_{h \to 0} |y_{exact}(t) - y_{numerical}(t; h)| = 0$$

The **order of convergence** measures how fast:
- First-order: Error $\propto h$
- Second-order: Error $\propto h^2$
- Higher order = faster convergence but more complexity
