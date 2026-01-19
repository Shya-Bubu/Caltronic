# Discretization Techniques - Mathematical Foundations

## Finite Difference Derivations

### Forward Difference from Taylor Series

Expand f(x+h) around x:
$$f(x+h) = f(x) + hf'(x) + \frac{h^2}{2}f''(x) + \frac{h^3}{6}f'''(x) + O(h^4)$$

Solve for f'(x):
$$f'(x) = \frac{f(x+h) - f(x)}{h} - \frac{h}{2}f''(x) - O(h^2)$$

**Truncation error**: $O(h)$ - first order accurate

### Backward Difference

Expand f(x-h):
$$f(x-h) = f(x) - hf'(x) + \frac{h^2}{2}f''(x) - \frac{h^3}{6}f'''(x) + O(h^4)$$

$$f'(x) = \frac{f(x) - f(x-h)}{h} + O(h)$$

Also first-order accurate.

### Central Difference (The Magic)

Subtract backward from forward expansion:
$$f(x+h) - f(x-h) = 2hf'(x) + \frac{h^3}{3}f'''(x) + O(h^5)$$

Solve for f'(x):
$$f'(x) = \frac{f(x+h) - f(x-h)}{2h} - \frac{h^2}{6}f'''(x) + O(h^4)$$

**Truncation error**: $O(h^2)$ - second order accurate!

**Why better?** The h¹ errors cancelled due to symmetry!

---

## Second Derivative Formula

Add forward and backward expansions:
$$f(x+h) + f(x-h) = 2f(x) + h^2f''(x) + \frac{h^4}{12}f^{(4)}(x) + O(h^6)$$

Solve for f''(x):
$$f''(x) = \frac{f(x+h) - 2f(x) + f(x-h)}{h^2} + O(h^2)$$

**Stencil representation**:
$$[1, -2, 1] / h^2$$

---

## Higher-Order Formulas

### Fourth-Order First Derivative

Using more points increases accuracy:
$$f'(x) = \frac{-f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h)}{12h} + O(h^4)$$

**Stencil**: $[-1, 8, 0, -8, 1] / 12h$

### General Pattern

| Derivative | Order | Stencil Points | Accuracy |
|------------|-------|----------------|----------|
| 1st | 2 | 3 | O(h²) |
| 1st | 4 | 5 | O(h⁴) |
| 2nd | 2 | 3 | O(h²) |
| 2nd | 4 | 5 | O(h⁴) |

More points → higher accuracy but more boundary issues.

---

## Time-Stepping Methods

### Ordinary Differential Equation

$$\frac{dy}{dt} = f(t, y), \quad y(t_0) = y_0$$

### Forward Euler (Explicit)

$$y_{n+1} = y_n + h \cdot f(t_n, y_n)$$

**Local truncation error**: $O(h^2)$
**Global error**: $O(h)$

**Stability**: Conditionally stable. For $y' = \lambda y$: stable if $|1 + h\lambda| < 1$

### Backward Euler (Implicit)

$$y_{n+1} = y_n + h \cdot f(t_{n+1}, y_{n+1})$$

Requires solving for $y_{n+1}$ (implicit).

**Stability**: Unconditionally stable for $\text{Re}(\lambda) < 0$

### Trapezoidal Rule (Crank-Nicolson)

$$y_{n+1} = y_n + \frac{h}{2}[f(t_n, y_n) + f(t_{n+1}, y_{n+1})]$$

**Local truncation error**: $O(h^3)$
**Global error**: $O(h^2)$

Second-order accurate and A-stable.

### Runge-Kutta 4 (RK4)

$$k_1 = f(t_n, y_n)$$
$$k_2 = f(t_n + h/2, y_n + hk_1/2)$$
$$k_3 = f(t_n + h/2, y_n + hk_2/2)$$
$$k_4 = f(t_n + h, y_n + hk_3)$$
$$y_{n+1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$

**Global error**: $O(h^4)$ - very accurate!

---

## Stability Analysis

### Test Equation

Analyze stability using: $y' = \lambda y$ where $\lambda < 0$ (stable ODE)

Define $z = h\lambda$. The numerical method gives:
$$y_{n+1} = R(z) \cdot y_n$$

where $R(z)$ is the **stability function**.

### Stability Functions

| Method | R(z) | Stable Region |
|--------|------|---------------|
| Forward Euler | $1 + z$ | $|1+z| < 1$ (disk) |
| Backward Euler | $1/(1-z)$ | $\text{Re}(z) < 0$ (left half-plane) |
| Trapezoidal | $(1+z/2)/(1-z/2)$ | $\text{Re}(z) < 0$ |
| RK4 | $1 + z + z^2/2 + z^3/6 + z^4/24$ | Bounded region |

### Stiff Systems

Systems with widely separated eigenvalues (e.g., $\lambda_1 = -1$, $\lambda_2 = -1000$) are **stiff**.

**Forward Euler** requires tiny steps: $h < 2/|\lambda_{max}| = 0.002$

**Backward Euler** allows much larger steps (implicit cost worthwhile).

---

## Spatial Discretization for PDEs

### Heat Equation

$$\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}$$

**Semi-discretization** (discretize space only):
$$\frac{du_i}{dt} = \frac{\alpha}{(\Delta x)^2}(u_{i+1} - 2u_i + u_{i-1})$$

Now we have a system of ODEs!

### Fully Discrete (FTCS Scheme)

$$\frac{u_i^{n+1} - u_i^n}{\Delta t} = \frac{\alpha}{(\Delta x)^2}(u_{i+1}^n - 2u_i^n + u_{i-1}^n)$$

**Stability condition** (von Neumann analysis):
$$r = \frac{\alpha \Delta t}{(\Delta x)^2} \leq \frac{1}{2}$$

---

## Nyquist Sampling Theorem

### Statement

A bandlimited signal with maximum frequency $f_{max}$ can be perfectly reconstructed from samples taken at rate $f_s > 2f_{max}$.

### Mathematical Basis

In frequency domain, sampling creates copies of spectrum at intervals of $f_s$.

If $f_s < 2f_{max}$: copies overlap → **aliasing** (irreversible!)

### Reconstruction Formula (Shannon)

$$x(t) = \sum_{n=-\infty}^{\infty} x[n] \cdot \text{sinc}\left(\frac{t - nT_s}{T_s}\right)$$

where $T_s = 1/f_s$ and $\text{sinc}(x) = \sin(\pi x)/(\pi x)$

---

## Error Analysis

### Local vs Global Error

- **Local truncation error**: Error introduced in one step
- **Global error**: Accumulated error at final time

For stable methods: Global error ≈ (Local error) × (number of steps)

### Order of Accuracy

Method has order p if:
$$\text{Local error} = O(h^{p+1})$$
$$\text{Global error} = O(h^p)$$

### Richardson Extrapolation

If you have solutions with step sizes h and h/2:
$$y_{exact} \approx y_{h/2} + \frac{y_{h/2} - y_h}{2^p - 1}$$

This gives higher accuracy without deriving new formulas!
