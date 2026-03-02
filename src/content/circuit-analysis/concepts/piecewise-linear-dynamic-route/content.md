# Piecewise-Linear First-Order Circuits

> **Why This Matters**: Linear circuits are a special case — real circuits contain diodes, transistors, and op-amps with nonlinear characteristics. But many nonlinear characteristics can be **approximated** as piecewise-linear segments (think of a diode as a switch with a threshold). This concept teaches you how to analyze first-order circuits with piecewise-linear elements using the **dynamic route** method — tracking which linear segment is active and solving in each region.

## The Dynamic Route Concept

When the driving-point characteristic of a one-port $N$ is piecewise-linear, the solution traces a **path** along the characteristic. This path — including which segment the operating point is on and which direction it's moving — is called the **dynamic route**.

[[visual:dynamic-route-illustration]]

Think of it like driving on a highway with multiple lanes. Each lane has its own speed limit (Thevenin equivalent). The dynamic route tells you which lane you're in, which direction you're going, and when you'll change lanes.

### Why Piecewise-Linear?

Many practical nonlinear elements have characteristics that are well-approximated by straight-line segments:

| Element | Piecewise-linear model |
|---------|----------------------|
| **Ideal diode** | Two segments: open circuit (v < 0) or short circuit (v ≥ 0) |
| **Zener diode** | Three segments: reverse breakdown, off, forward conducting |
| **Op-amp** | Three segments: saturation (−), linear, saturation (+) |
| **MOSFET** | Two regions: cutoff, linear (triode) |

[[visual:pwl-element-examples]]

Each segment corresponds to a different linear circuit — and you already know how to solve linear first-order circuits!

## The Three-Step Solution Method

The lecture presents a systematic approach:

### Step 1: Identify the Initial Point

Locate the initial operating point on the driving-point characteristic. For a capacitor circuit, this is determined by $v_C(t_0)$, which gives you the initial current from the characteristic: $i = f(v_C(t_0))$.

[[visual:initial-point-identification]]

### Step 2: Determine the Dynamic Route

For each straight-line segment:
- **Route**: Which segment does the operating point travel along?
- **Direction**: Which way is it moving? This is determined by the sign of $\dot{v}_C = i_C / C$:
  - If $i_C > 0$: $v_C$ is **increasing** → operating point moves to the right
  - If $i_C < 0$: $v_C$ is **decreasing** → operating point moves to the left

[[visual:dynamic-route-direction]]

### Step 3: Solve in Each Segment

For each straight-line segment, the one-port $N$ is equivalent to a **Thevenin circuit** (voltage source + resistor). Replace $N$ by its Thevenin equivalent for that segment and solve the standard first-order circuit.

The time constant $\tau$ and steady-state value $x(\infty)$ change from one segment to the next:

$$\tau_k = R_{TH,k} \cdot C \quad \text{and} \quad x(\infty)_k = v_{oc,k}$$

[[visual:segment-by-segment-solution]]

The operating point spends a finite time on each segment (calculated from the elapsed time formula), then transitions to the next segment. The solution is **continuous** across segment boundaries — only the slope changes.

<details>
<summary><strong>Pause & Think</strong>: The dynamic route has τ = −62.5 μs in one segment and τ = 100 μs in another. What does this tell you about each segment?</summary>

- **τ = −62.5 μs** (negative): This segment is **unstable**! The operating point moves *away* from the segment's steady-state value. The voltage grows exponentially until it reaches the boundary and transitions to the next segment.

- **τ = 100 μs** (positive): This segment is **stable**. The operating point exponentially approaches this segment's steady-state value.

A common pattern: the first segment is unstable (the circuit is triggered), and the final segment is stable (the circuit settles to equilibrium). This is the basis of many oscillator and timing circuits.

</details>

## Worked Example: RC Circuit with PWL Network

Consider the RC circuit from the lecture: a capacitor $C$ connected to a piecewise-linear one-port $N$ with initial voltage $v_C(t_0) = 2.5$ V.

[[visual:pwl-worked-example]]

**Segment 1** (unstable, $\tau = -62.5\,\mu$s):

The operating point starts at $v_C = 2.5$ V on the upper segment. The Thevenin equivalent gives $v_{oc} = 3.25$ V and $R_{TH} < 0$ (negative resistance!), so $\tau < 0$. The voltage grows:

$$v_C(t) = 3.25 - 0.75e^{t/62.5\mu\text{s}} \quad \text{for } 0 \leq t \leq t_1$$

The operating point hits the breakpoint at $v_C = 2$ V at time:

$$t_1 = -62.5 \times \ln\frac{2.5 - 3.25}{2 - 3.25} = 62.5 \times \ln\frac{0.75}{1.25} = 31.9\,\mu\text{s}$$

**Segment 2** (stable, $\tau = 100\,\mu$s):

Starting from $v_C(t_1) = 2$ V, the Thevenin equivalent gives $v_{oc} = 0$ V and $R_{TH} > 0$:

$$v_C(t) = 2e^{-(t - t_0)/100\mu\text{s}} \quad \text{for } t \geq 31.9\,\mu\text{s}$$

The voltage decays exponentially toward zero.

[[visual:pwl-waveform-result]]

## The Jump Phenomenon

What happens when the dynamic route reaches an **impasse point** — a point where the operating point can't continue along the current segment?

[[visual:jump-phenomenon]]

> **Jump Rule**: Upon reaching an impasse point $Q$ at time $t = T$, the operating point **jumps instantaneously** to another point $Q'$ on the characteristic such that $v_C(T^+) = v_C(T^-)$ (capacitor voltage continuity is maintained). The jump is valid only if $Q'$ is the **unique** point with this voltage.

Physically, the jump is mediated by a tiny parasitic inductance in the wires — the jump happens very fast but not truly instantaneously. In the idealized model, we treat it as instantaneous.

The jump phenomenon appears in:
- **Schmitt triggers** (op-amp comparator with hysteresis)
- **Relaxation oscillators** (astable multivibrators)
- **Flip-flops** during state transitions

<details>
<summary><strong>Pause & Think</strong>: Why must v_C be the same before and after the jump?</summary>

By the continuity property! A jump is instantaneous ($\Delta t = 0$), so $v_C(T^+) = v_C(T^-)$. The capacitor voltage cannot change in zero time. The operating point moves horizontally on the v-i plane (same $v$, different $i$) to reach a new segment.

For an RL circuit, $i_L$ would be preserved across the jump instead (inductor current continuity).

</details>

## Connection to Zero-Input and Zero-State Response

The general solution for arbitrary (non-DC) driving signals uses the **convolution integral**:

$$x(t) = \underbrace{x(t_0)e^{-(t-t_0)/\tau}}_{\text{zero-input response}} + \underbrace{\int_{t_0}^{t} \frac{1}{\tau}e^{-(t-t')/\tau} x_s(t')\,dt'}_{\text{zero-state response}}$$

[[visual:zero-input-zero-state]]

- **Zero-input response**: The circuit's "memory decay" — how the initial condition fades away
- **Zero-state response**: The circuit's response to the driving signal, starting from zero initial energy

The impulse response $h(t) = \frac{1}{\tau}e^{-t/\tau}$ for $t > 0$ is the kernel of the convolution — it tells you how the circuit responds to a unit impulse, and from this you can compute the response to *any* input via convolution.

[[visual:falstad-pwl-circuit]]

<details>
<summary><strong>Pause & Think</strong>: The impulse response h(t) = (1/τ)e^(−t/τ). What is h(τ)?</summary>

$$h(\tau) = \frac{1}{\tau}e^{-\tau/\tau} = \frac{1}{\tau}e^{-1} = \frac{0.368}{\tau}$$

After one time constant, the impulse response has decayed to 36.8% of its initial value (which was $1/\tau$). The system "remembers" only 36.8% of what happened one time constant ago — its memory fades exponentially.

</details>

## Summary

- **Dynamic route**: The path traced by the operating point on a piecewise-linear characteristic, including direction of motion
- **Three-step method**: (1) Identify initial point, (2) Determine route and direction from $\dot{v}_C = i_C/C$, (3) Solve each segment using its Thevenin equivalent
- **Segment solutions**: Each segment has its own $R_{TH}$, $v_{oc}$, and $\tau$ — apply the standard formula in each region
- **Jump phenomenon**: At impasse points, the operating point jumps instantaneously to a new segment while preserving $v_C$ continuity
- **General response**: For arbitrary inputs, use convolution: zero-input + zero-state components
- **Impulse response**: $h(t) = \frac{1}{\tau}e^{-t/\tau}$ for $t > 0$ — the fundamental building block for linear system analysis

> **You've now completed the first-order circuit toolkit** — from energy storage elements through exponential response to nonlinear piecewise-linear circuits. This entire framework extends naturally to second-order circuits (two energy storage elements), where exponentials become complex and oscillation enters the picture.
