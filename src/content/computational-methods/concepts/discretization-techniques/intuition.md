# Discretization Techniques

## The Big Idea
> **Turn continuous space and time into finite grids that computers can handle.**

Real-world signals are continuous—voltage varies smoothly over time, fields exist at every point in space. But computers only store finite numbers at discrete locations. Discretization bridges this gap.

---

## From Basics: Continuous vs Discrete

From A-Level, you've seen this divide:
- **Continuous**: Temperature varies smoothly, time flows continuously
- **Discrete**: Digital values, sampled data, pixel grids

The fundamental question: **How do we represent a continuous function f(x) using only values at discrete points?**

---

## The Sampling Concept

### Intuition

Imagine photographing a moving car:
- **Many photos (high sample rate)**: Smooth motion captured
- **Few photos (low sample rate)**: Jerky, might miss the car entirely!

Sampling continuous signals works the same way:
- Sample too slowly → lose information (aliasing)
- Sample fast enough → perfect reconstruction possible

### The Grid

We replace the continuous domain with discrete points:

```
Continuous:  ────────────────────────────────
                  f(x) defined everywhere

Discrete:    •    •    •    •    •    •    •
            x₀   x₁   x₂   x₃   x₄   x₅   x₆
                  f known only at grid points
```

**Grid spacing** h = xₙ₊₁ - xₙ determines resolution.

---

## Finite Differences: Approximating Derivatives

### The Problem

Computers can't compute true derivatives—they need values at discrete points. But from calculus:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

We can't take h → 0 on a computer, so we use **finite h**.

### Three Approximations

**1. Forward Difference**
$$f'(x) \approx \frac{f(x+h) - f(x)}{h}$$

Uses the point ahead. Simple but only O(h) accurate.

**2. Backward Difference**
$$f'(x) \approx \frac{f(x) - f(x-h)}{h}$$

Uses the point behind. Also O(h) accurate.

**3. Central Difference** ⭐
$$f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}$$

Uses both neighbors. **O(h²) accurate—much better!**

### Why Central is Better

Forward difference: Error ∝ h (halve h, halve error)
Central difference: Error ∝ h² (halve h, quarter error!)

[[visual:finite-difference-comparison]]

---

## Second Derivatives

For f''(x), use the central difference formula:

$$f''(x) \approx \frac{f(x+h) - 2f(x) + f(x-h)}{h^2}$$

This is O(h²) accurate and essential for solving differential equations.

### Visual Pattern

```
    f(x-h)          f(x)           f(x+h)
      •───────────────•───────────────•
         coefficient:  coefficient:    coefficient:
            +1           -2              +1
         ─────────────────────────────────
                        h²
```

---

## Temporal Discretization: Marching Through Time

### The Problem

Differential equations like:
$$\frac{dy}{dt} = f(t, y)$$

describe how systems evolve continuously. But we need discrete time steps.

### Euler's Method (Simplest)

Given yₙ at time tₙ, predict yₙ₊₁:

$$y_{n+1} = y_n + h \cdot f(t_n, y_n)$$

**Intuition**: Use current slope to step forward.

```
       slope = f(tₙ, yₙ)
            ↗
    yₙ •───────────────→ yₙ₊₁
       │                    
       └────────┬──────────┘
              Δt = h
```

### Better Methods

| Method | Order | Error per step |
|--------|-------|----------------|
| Forward Euler | 1 | O(h²) |
| Backward Euler | 1 | O(h²) |
| Trapezoidal | 2 | O(h³) |
| Runge-Kutta 4 | 4 | O(h⁵) |

Higher order = more computation but fewer steps needed.

---

## Spatial Discretization: Grids in Space

### 1D Example: Heat Equation

The heat equation describes temperature evolution:
$$\frac{\partial T}{\partial t} = \alpha \frac{\partial^2 T}{\partial x^2}$$

Discretize space into N points:

```
  T₀     T₁     T₂     T₃     T₄
   •──────•──────•──────•──────•
   0     Δx    2Δx    3Δx    4Δx
```

Replace ∂²T/∂x² with finite difference:
$$\frac{\partial^2 T}{\partial x^2} \approx \frac{T_{i+1} - 2T_i + T_{i-1}}{(\Delta x)^2}$$

Now it's a system of ODEs, solvable numerically!

### 2D Grids

For field problems (electromagnetics, heat flow):

```
    •────•────•────•────•
    │    │    │    │    │
    •────•────•────•────•
    │    │    │    │    │
    •────•────•────•────•
    │    │    │    │    │
    •────•────•────•────•
```

Each point interacts with neighbors. More points = better resolution but more computation.

---

## The Discretization-Accuracy Tradeoff

### Finer Grid (smaller h)
✓ More accurate
✗ More memory
✗ More computation time
✗ More round-off error accumulation

### Coarser Grid (larger h)
✓ Faster
✓ Less memory
✗ Less accurate
✗ May miss important features

**The art**: Choose h small enough for required accuracy, large enough for practical computation.

---

## Connection to Signals (Nyquist!)

From Signals & Systems, you know the **Nyquist theorem**:

> Sample at least 2× the highest frequency to avoid aliasing.

This IS discretization! The sampling period T = 1/fs defines your time grid.

```
Signal frequency: f_max = 1 kHz
Minimum sample rate: fs ≥ 2 kHz
Maximum grid spacing: T ≤ 0.5 ms
```

---

## Applications in EEE

### 1. SPICE Transient Analysis
SPICE discretizes time to solve circuit differential equations. Step size affects accuracy and simulation time.

### 2. Finite Element Method (FEM)
Electromagnetic field solvers discretize space into mesh elements. Finer mesh near important features.

### 3. Digital Signal Processing
All DSP starts with sampling—discretizing continuous signals for digital processing.

### 4. Control Systems
Digital controllers sample continuous sensors, compute, and output at discrete intervals.

---

## Worked Example

**Problem**: Approximate f'(2) where f(x) = x³, using h = 0.1.

**Solution**:

True derivative: f'(x) = 3x² → f'(2) = 12

Forward difference:
$$f'(2) \approx \frac{f(2.1) - f(2)}{0.1} = \frac{9.261 - 8}{0.1} = 12.61$$
Error = 0.61 (5.1%)

Central difference:
$$f'(2) \approx \frac{f(2.1) - f(1.9)}{0.2} = \frac{9.261 - 6.859}{0.2} = 12.01$$
Error = 0.01 (0.08%)

**Central difference is 75× more accurate with same grid!**

---

## Stability Warning

Not all discretizations are stable! Forward Euler can blow up if h is too large:

$$y_{n+1} = y_n + h \cdot f(t_n, y_n)$$

For dy/dt = -λy, stability requires h < 2/λ.

**Rule of thumb**: Implicit methods (backward Euler) are more stable but require solving equations at each step.

---

## Key Takeaways

1. **Discretization** converts continuous problems to finite, computable form
2. **Grid spacing h** controls accuracy vs computation tradeoff
3. **Central differences** are O(h²)—use them over forward/backward when possible
4. **Time-stepping methods** vary in accuracy and stability
5. **Nyquist** is a discretization theorem—sampling IS discretization

---

## What's Next

We've seen how to approximate functions and discretize domains. But what about nonlinear systems? That's where **linearization** comes in—simplifying curves into straight lines around operating points.
