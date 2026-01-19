# Linearization Fundamentals

## The Big Idea
> **Near any point, curves look like straight lines—exploit this for tractable analysis.**

Nonlinear systems are hard. Linear systems have elegant theory (superposition, eigenvalues, transfer functions). Linearization lets us apply linear tools to nonlinear problems—within limits.

---

## From Basics: Why Linear is Easy

From A-Level, you've seen:
- Linear equations: y = mx + c (easy to solve)
- Nonlinear equations: y = sin(x), y = eˣ (often no closed-form solution)

**Linear systems obey superposition**:
- If input A gives output X, and input B gives output Y
- Then input (A + B) gives output (X + Y)

Nonlinear systems don't! This makes analysis much harder.

---

## The Core Insight

Zoom in on any smooth curve—it looks straight!

```
Zoomed out:          Zoomed in at point P:
                     
    ╭─────╮               •
   ╱       ╲             ╱
  ╱         ╲           ╱
 •           ╲         ╱
              ╲       •  P
                         ↖ Looks linear!
```

**Linearization** exploits this: replace the curve with its tangent line at a chosen point.

---

## Mathematical Foundation

### Single Variable

For a function f(x) near point x₀:

$$f(x) \approx f(x_0) + f'(x_0)(x - x_0)$$

This is just the first-order Taylor approximation!

**Geometric interpretation**: The tangent line at x₀.

### Multiple Variables

For f(x, y) near point (x₀, y₀):

$$f(x,y) \approx f(x_0, y_0) + \frac{\partial f}{\partial x}\bigg|_{(x_0,y_0)}(x-x_0) + \frac{\partial f}{\partial y}\bigg|_{(x_0,y_0)}(y-y_0)$$

This is a tangent PLANE in 3D space.

---

## The Jacobian Matrix

### For Vector Functions

When you have multiple inputs AND multiple outputs:

$$\mathbf{f}(\mathbf{x}) = \begin{bmatrix} f_1(x_1, x_2, ...) \\ f_2(x_1, x_2, ...) \\ \vdots \end{bmatrix}$$

The **Jacobian matrix** J collects all partial derivatives:

$$\mathbf{J} = \begin{bmatrix} 
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \cdots \\
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \cdots \\
\vdots & \vdots & \ddots
\end{bmatrix}$$

### Linearization Formula

$$\mathbf{f}(\mathbf{x}) \approx \mathbf{f}(\mathbf{x}_0) + \mathbf{J}|_{\mathbf{x}_0} \cdot (\mathbf{x} - \mathbf{x}_0)$$

This transforms the nonlinear system into:
$$\Delta \mathbf{y} = \mathbf{J} \cdot \Delta \mathbf{x}$$

where Δx = x - x₀ is the deviation from operating point.

---

## Operating Point: The Foundation

### What is it?

The **operating point** (or **bias point**, **quiescent point**) is where you linearize. In circuits, it's the DC solution.

### Why does it matter?

Different operating points give different linear approximations!

```
Same curve, different operating points:

At point A:           At point B:
Steep slope           Gentle slope
High gain             Low gain
```

[[visual:operating-point-comparison]]

---

## Small-Signal Models: The EEE Application

### The Connection to Circuits

In Circuit Analysis, you learned about **small-signal models**. Now you understand the math behind them!

**Large-signal model** (nonlinear):
$$i_D = I_S(e^{v_D/V_T} - 1)$$

**At operating point** (V_D = V_Q, I_D = I_Q):

**Small-signal model** (linear):
$$\Delta i_D = g_d \cdot \Delta v_D$$

where the **small-signal conductance**:
$$g_d = \frac{dI_D}{dV_D}\bigg|_{V_Q} = \frac{I_Q}{V_T}$$

This IS the Jacobian (scalar case)!

---

## Procedure for Linearization

### Step-by-Step

1. **Write the nonlinear equations**
   $$\frac{dx}{dt} = f(x, u)$$

2. **Find the operating point** (equilibrium)
   Solve f(x₀, u₀) = 0 for steady-state

3. **Compute the Jacobian**
   $$A = \frac{\partial f}{\partial x}\bigg|_{x_0}, \quad B = \frac{\partial f}{\partial u}\bigg|_{x_0}$$

4. **Write the linearized system**
   $$\frac{d(\Delta x)}{dt} = A \cdot \Delta x + B \cdot \Delta u$$

---

## Stability from Linearization

### The Key Result

The stability of a nonlinear system near an equilibrium is determined by the **eigenvalues of the Jacobian**.

| Eigenvalues of J | System Behavior |
|-----------------|-----------------|
| All negative real parts | Stable (returns to equilibrium) |
| Any positive real part | Unstable (diverges from equilibrium) |
| Zero real part | Marginal (linear analysis inconclusive) |

### Why This Works

Near equilibrium, the linearized system dominates behavior. If the linear approximation is stable, small perturbations decay. If unstable, they grow.

---

## When Linearization Fails

### 1. Far from Operating Point

Linearization is LOCAL. Large deviations see the full nonlinear behavior.

**Rule of thumb**: Valid for ~10-20% deviation from operating point.

### 2. At Bifurcation Points

When eigenvalues cross zero, linear analysis fails. The system may have qualitative changes (oscillations start, stability flips).

### 3. Discontinuous Systems

Can't linearize a step function or hard limiter—no derivative exists.

---

## Applications in EEE

### 1. Transistor Small-Signal Models

**Large signal**: Complex exponential equations
**Small signal**: Linear resistors, controlled sources (gm·vgs)

### 2. Power System Stability

Linearize around nominal voltage/power flow. Eigenvalue analysis predicts stability margins.

### 3. Control System Design

Design controllers using linear theory, verify with nonlinear simulation.

### 4. SPICE DC Analysis

Newton-Raphson iteration uses Jacobian at each step to find operating point.

---

## Worked Example

**Problem**: Linearize f(x) = x² + 2x around x₀ = 1.

**Solution**:

1. **Operating point value**: f(1) = 1 + 2 = 3

2. **Derivative**: f'(x) = 2x + 2

3. **Derivative at operating point**: f'(1) = 4

4. **Linear approximation**:
   $$f(x) \approx 3 + 4(x - 1) = 4x - 1$$

**Verification**:
- At x = 1: Linear gives 3, actual is 3 ✓
- At x = 1.1: Linear gives 3.4, actual is 3.41 (0.3% error) ✓
- At x = 2: Linear gives 7, actual is 8 (12.5% error) — getting worse!

---

## Diode Circuit Example

**Problem**: Find small-signal resistance of diode at I_Q = 1 mA.

**Diode equation**: i = I_S(e^(v/V_T) - 1)

**Derivative**: 
$$\frac{di}{dv} = \frac{I_S}{V_T}e^{v/V_T} \approx \frac{i + I_S}{V_T} \approx \frac{i}{V_T}$$

**At operating point** (I_Q = 1 mA, V_T = 26 mV):
$$g_d = \frac{1\text{ mA}}{26\text{ mV}} = 38.5 \text{ mS}$$

**Small-signal resistance**:
$$r_d = \frac{1}{g_d} = 26\text{ Ω}$$

This is the famous rule: **r_d ≈ 26Ω at 1mA**!

---

## Key Takeaways

1. **Linearization** approximates curves with tangent lines/planes
2. **Jacobian matrix** extends the concept to multiple variables
3. **Operating point** determines the linear approximation
4. **Small-signal models** ARE linearized models around DC bias
5. **Eigenvalues of Jacobian** determine stability
6. Valid only for **small deviations** from operating point

---

## Connection to Other Topics

- **Approximation Methods**: Linearization IS first-order Taylor approximation
- **Control Systems**: State-space matrices A, B, C, D come from linearization
- **Circuit Analysis**: Small-signal models, AC analysis
- **Newton-Raphson**: Uses Jacobian for iterative solution

---

## What's Next

We've covered deterministic methods. But what about uncertainty? What if you need to analyze a system with random component values? That's where **Monte Carlo methods** shine—using randomness to solve deterministic problems.
