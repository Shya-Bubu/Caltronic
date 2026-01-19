# Linearization Fundamentals - Mathematical Foundations

## Single-Variable Linearization

### Taylor's Theorem (First Order)

For a differentiable function f(x) near point a:

$$f(x) = f(a) + f'(a)(x-a) + R_1(x)$$

where the remainder $R_1(x) = O((x-a)^2)$.

**Linear approximation**: $L(x) = f(a) + f'(a)(x-a)$

This is the **tangent line** at x = a.

### Geometric Interpretation

The tangent line has:
- **Point**: passes through $(a, f(a))$
- **Slope**: equals $f'(a)$

Any smooth curve is locally indistinguishable from its tangent (to first order).

---

## Multivariable Linearization

### Functions of Two Variables

For $f: \mathbb{R}^2 \to \mathbb{R}$ near point $(a, b)$:

$$f(x,y) = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b) + O(||(x,y)-(a,b)||^2)$$

**Linear approximation**: 
$$L(x,y) = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$$

This is the **tangent plane** at $(a, b)$.

### Using Gradient Notation

$$f(\mathbf{x}) \approx f(\mathbf{a}) + \nabla f|_{\mathbf{a}} \cdot (\mathbf{x} - \mathbf{a})$$

where $\nabla f = \begin{bmatrix} \partial f/\partial x_1 \\ \partial f/\partial x_2 \\ \vdots \end{bmatrix}$

---

## Vector Functions: The Jacobian

### Definition

For $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m$:

$$\mathbf{f}(\mathbf{x}) = \begin{bmatrix} f_1(x_1, ..., x_n) \\ f_2(x_1, ..., x_n) \\ \vdots \\ f_m(x_1, ..., x_n) \end{bmatrix}$$

The **Jacobian matrix** is:

$$\mathbf{J} = \frac{\partial \mathbf{f}}{\partial \mathbf{x}} = \begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \cdots & \frac{\partial f_1}{\partial x_n} \\
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \cdots & \frac{\partial f_2}{\partial x_n} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial f_m}{\partial x_1} & \frac{\partial f_m}{\partial x_2} & \cdots & \frac{\partial f_m}{\partial x_n}
\end{bmatrix}$$

**Size**: m × n (outputs × inputs)

### Linearization Formula

$$\mathbf{f}(\mathbf{x}) \approx \mathbf{f}(\mathbf{x}_0) + \mathbf{J}|_{\mathbf{x}_0} \cdot (\mathbf{x} - \mathbf{x}_0)$$

For small deviations $\Delta \mathbf{x} = \mathbf{x} - \mathbf{x}_0$:

$$\Delta \mathbf{f} \approx \mathbf{J} \cdot \Delta \mathbf{x}$$

---

## Worked Example: Computing a Jacobian

### Problem

Find the Jacobian of $\mathbf{f}(x,y) = \begin{bmatrix} x^2 + xy \\ \sin(x) + y^2 \end{bmatrix}$

### Solution

$$J_{11} = \frac{\partial}{\partial x}(x^2 + xy) = 2x + y$$

$$J_{12} = \frac{\partial}{\partial y}(x^2 + xy) = x$$

$$J_{21} = \frac{\partial}{\partial x}(\sin x + y^2) = \cos x$$

$$J_{22} = \frac{\partial}{\partial y}(\sin x + y^2) = 2y$$

$$\mathbf{J} = \begin{bmatrix} 2x + y & x \\ \cos x & 2y \end{bmatrix}$$

At point (1, 2):
$$\mathbf{J}|_{(1,2)} = \begin{bmatrix} 4 & 1 \\ 0.54 & 4 \end{bmatrix}$$

---

## Linearization of Differential Equations

### Nonlinear ODE System

$$\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x}, \mathbf{u})$$

where $\mathbf{x}$ = state, $\mathbf{u}$ = input.

### Finding Equilibrium Points

Equilibrium $(\mathbf{x}_0, \mathbf{u}_0)$ satisfies:
$$\mathbf{f}(\mathbf{x}_0, \mathbf{u}_0) = \mathbf{0}$$

### Linearized System

$$\dot{\mathbf{x}} \approx \mathbf{f}(\mathbf{x}_0, \mathbf{u}_0) + \mathbf{A}(\mathbf{x} - \mathbf{x}_0) + \mathbf{B}(\mathbf{u} - \mathbf{u}_0)$$

Since $\mathbf{f}(\mathbf{x}_0, \mathbf{u}_0) = \mathbf{0}$:

$$\Delta\dot{\mathbf{x}} = \mathbf{A}\Delta\mathbf{x} + \mathbf{B}\Delta\mathbf{u}$$

where:
$$\mathbf{A} = \frac{\partial \mathbf{f}}{\partial \mathbf{x}}\bigg|_{(\mathbf{x}_0, \mathbf{u}_0)}, \quad \mathbf{B} = \frac{\partial \mathbf{f}}{\partial \mathbf{u}}\bigg|_{(\mathbf{x}_0, \mathbf{u}_0)}$$

---

## Stability Analysis

### Linear System Stability

For $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x}$:

Solution: $\mathbf{x}(t) = e^{\mathbf{A}t}\mathbf{x}_0$

**Eigenvalue decomposition**: If $\mathbf{A}\mathbf{v}_i = \lambda_i \mathbf{v}_i$:
$$\mathbf{x}(t) = \sum_i c_i e^{\lambda_i t} \mathbf{v}_i$$

### Stability Criterion

**Stable**: All eigenvalues have $\text{Re}(\lambda_i) < 0$
- Perturbations decay exponentially

**Unstable**: Any eigenvalue has $\text{Re}(\lambda_i) > 0$
- Perturbations grow exponentially

**Marginal**: Some eigenvalue has $\text{Re}(\lambda_i) = 0$, none positive
- Linear analysis inconclusive

### Eigenvalue Interpretation

| Eigenvalue Type | System Behavior |
|-----------------|-----------------|
| Real, negative | Exponential decay |
| Real, positive | Exponential growth |
| Complex, negative real | Decaying oscillation |
| Complex, positive real | Growing oscillation |
| Purely imaginary | Sustained oscillation |

---

## The Hartman-Grobman Theorem

### Statement

Near a **hyperbolic** equilibrium (no eigenvalues on imaginary axis), the nonlinear system is **topologically equivalent** to its linearization.

### Meaning

- Stability of linearized system = stability of nonlinear system (locally)
- Phase portrait shapes match qualitatively
- Linearization IS sufficient for stability analysis (at hyperbolic equilibria)

### Limitation

At **non-hyperbolic** equilibria (eigenvalues on imaginary axis), linearization may not determine stability. Higher-order terms matter.

---

## Error Analysis

### Linearization Error

For $f(x)$ linearized around $a$:
$$f(x) - L(x) = \frac{f''(\xi)}{2}(x-a)^2$$

for some $\xi$ between $a$ and $x$.

**Error bound**: 
$$|f(x) - L(x)| \leq \frac{M_2}{2}|x-a|^2$$

where $M_2 = \max |f''|$ on interval.

### Validity Range

Linearization valid where linear term dominates:
$$|f'(a)(x-a)| \gg \frac{|f''(\xi)|}{2}(x-a)^2$$

Roughly: $|x - a| \ll \frac{2|f'(a)|}{|f''|}$

---

## Implicit Function Theorem

### The Setup

Given $\mathbf{F}(\mathbf{x}, \mathbf{y}) = \mathbf{0}$ implicitly defining $\mathbf{y}(\mathbf{x})$.

### The Result

If $\frac{\partial \mathbf{F}}{\partial \mathbf{y}}$ is invertible at $(\mathbf{x}_0, \mathbf{y}_0)$:

$$\frac{d\mathbf{y}}{d\mathbf{x}} = -\left(\frac{\partial \mathbf{F}}{\partial \mathbf{y}}\right)^{-1} \frac{\partial \mathbf{F}}{\partial \mathbf{x}}$$

### Application

Used in circuit analysis: KCL/KVL equations $\mathbf{F}(\mathbf{v}, \mathbf{i}) = \mathbf{0}$ implicitly define operating point. Jacobian gives small-signal response.

---

## Newton-Raphson Method

### Algorithm

To solve $\mathbf{f}(\mathbf{x}) = \mathbf{0}$:

$$\mathbf{x}_{n+1} = \mathbf{x}_n - \mathbf{J}^{-1}|_{\mathbf{x}_n} \cdot \mathbf{f}(\mathbf{x}_n)$$

Or solve linear system:
$$\mathbf{J}|_{\mathbf{x}_n} \Delta\mathbf{x} = -\mathbf{f}(\mathbf{x}_n)$$
$$\mathbf{x}_{n+1} = \mathbf{x}_n + \Delta\mathbf{x}$$

### Convergence

Near a simple root: **quadratic convergence**
- Error squares each iteration
- Very fast once close!

### Connection to Linearization

Each Newton step uses the **linearization** of f at current point to predict where f = 0.
