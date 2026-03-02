# Linearization: Making Nonlinear Systems Linear

> **Why This Matters**: The physical world is fundamentally nonlinear — transistors, motors, chemical reactions, fluid flow. Yet almost all of your analysis tools (superposition, transfer functions, Bode plots, state-space control) require linear systems. Linearization is the bridge: it lets you apply the full power of linear theory by restricting your view to small variations around an operating point.

## Definition

> **Linearization**: Approximating a nonlinear system with a linear one around an operating point or for small variations.

The core idea: **we use calculus (Taylor expansion) to create a linear approximation valid near a specific point.**

## Example 1: Diode Small-Signal Model

The diode has a strongly nonlinear I-V relationship:

$$I = I_S\left(e^{V/V_T} - 1\right)$$

[[visual:diode-linearization-process]]

To linearize, let $V = V_0 + v$ and $I = I_0 + i$, where $V_0, I_0$ are the DC operating point and $v, i$ are small AC variations. Taylor-expand around $V_0$:

$$I_0 + i \approx I_S\left(e^{V_0/V_T} - 1\right) + \underbrace{\frac{I_S}{V_T} e^{V_0/V_T}}_{g_d} \cdot v$$

Since $I_0 = I_S(e^{V_0/V_T} - 1)$, the DC terms cancel:

$$\boxed{i \approx g_d \cdot v}$$

where $g_d = I_S e^{V_0/V_T}/V_T = (I_0 + I_S)/V_T \approx I_0/V_T$ is the **small-signal conductance**.

[[visual:small-signal-tangent]]

The nonlinear diode becomes a simple resistor $r_d = 1/g_d = V_T/I_0$ for small signals! At $I_0 = 1$ mA and room temperature ($V_T = 26$ mV): $r_d = 26\,\Omega$.

> **Key Insight**: The linearized model is only valid for **small perturbations** $v \ll V_T$. For the diode, this means signal swings much less than 26 mV. Beyond this range, the exponential curvature becomes significant and the linear model breaks down.

## Example 2: Pendulum Linearization

The equation of motion for a simple pendulum is nonlinear:

$$\ddot{\theta} + \frac{g}{L}\sin\theta = 0$$

[[visual:pendulum-sin-vs-theta]]

For small angular displacements, $\sin\theta \approx \theta$ (the first-order Taylor approximation of $\sin\theta$ around $\theta = 0$):

$$\boxed{\ddot{\theta} + \frac{g}{L}\theta = 0}$$

This is the equation of a **simple harmonic oscillator** with period $T = 2\pi\sqrt{L/g}$. The linearized model predicts constant-period oscillations — but the real pendulum's period depends on amplitude, deviating by:
- 0.06% at $\theta_{max} = 5°$
- 1.5% at $\theta_{max} = 20°$
- 18% at $\theta_{max} = 60°$

[[visual:pendulum-period-error]]

<details>
<summary><strong>Pause & Think</strong>: At what angle does the linearization error reach 5%? Is this a useful range for engineering?</summary>

The 5% error occurs at about $\theta_{max} \approx 35°$ (roughly 0.6 radians). For many engineering applications — clock pendulums, vibration sensors, accelerometers — the operating range is well within this. But for a wrecking ball or a large-amplitude oscillation, linearization would give poor predictions.

</details>

## Example 3: System Linearization for Control

For general nonlinear dynamics $\dot{x} = f(x, u)$ at an equilibrium point $(x_0, u_0)$ where $f(x_0, u_0) = 0$:

$$\boxed{\dot{\tilde{x}} \approx A\tilde{x} + B\tilde{u}}$$

where $\tilde{x} = x - x_0$, $\tilde{u} = u - u_0$, and the **Jacobian matrices** are:

$$A = \frac{\partial f}{\partial x}\bigg|_{(x_0, u_0)}, \quad B = \frac{\partial f}{\partial u}\bigg|_{(x_0, u_0)}$$

[[visual:jacobian-linearization]]

This is the standard procedure for control system design:

1. Find the equilibrium point (set all derivatives to zero)
2. Compute the Jacobian matrices $A$ and $B$
3. Design a linear controller (pole placement, LQR, etc.) for the linearized system
4. Verify that the controller works on the full nonlinear system (simulation)

Step 4 is critical — the linear controller is designed for small perturbations, so you must verify it handles realistic operating conditions.

[[visual:linearization-validity-region]]

## The Key Attribute

$$\boxed{\text{Linearization: locally valid} \longrightarrow \text{gives access to linear systems theory}}$$

Linearization is a **special case of approximation** — specifically, it's the *first-order Taylor approximation* at an operating point. What makes it special is that the result is *linear*, unlocking all the machinery of:
- Superposition
- Transfer functions
- Frequency response (Bode plots)
- State-space control theory
- Eigenvalue analysis (stability)

No other form of approximation gives you this much analytical power.

## Summary

- Linearization replaces nonlinear systems with linear ones valid near an operating point
- **Diode**: $i = g_d \cdot v$ where $g_d = I_0/V_T$ (small-signal conductance)
- **Pendulum**: $\sin\theta \approx \theta$ gives simple harmonic motion ($T = 2\pi\sqrt{L/g}$)
- **Control systems**: Jacobian matrices $A = \partial f/\partial x$, $B = \partial f/\partial u$ at equilibrium
- Linearization is a special case of approximation (1st-order Taylor) but uniquely powerful because it enables all of linear theory
- **Always state the validity range** — linearization fails for large perturbations
