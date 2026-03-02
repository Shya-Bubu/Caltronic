# First-Order RC and RL Circuits: The Exponential Response

> **Why This Matters**: This is the single most important result in first-order circuit analysis. One formula — the exponential response — solves every linear first-order circuit driven by DC sources. Master this, and you can analyze charging circuits, timing circuits, filters, and transient responses by inspection. This is where everything you've learned comes together.

## Setting Up the Problem: Thevenin/Norton Equivalents

Any linear first-order circuit can be reduced to one of two canonical forms using Thevenin and Norton equivalents:

[[visual:canonical-rc-rl]]

**RC Circuit** (Thevenin equivalent driving a capacitor):

$$R_{TH} \cdot i_C + v_C = v_{oc}$$

**RL Circuit** (Norton equivalent driving an inductor):

$$G_N \cdot v_L + i_L = i_{sc}$$

The key step is recognizing that everything except the capacitor (or inductor) can be replaced by its Thevenin (or Norton) equivalent. This reduces any complex first-order circuit to a simple two-element problem.

## Deriving the Differential Equation

### For the RC Circuit

Substituting $i_C = C\dot{v}_C$ into the KVL equation:

$$R_{TH} \cdot C\dot{v}_C + v_C = v_{oc}$$

$$\boxed{\dot{v}_C = -\frac{v_C}{R_{TH}C} + \frac{v_{oc}}{R_{TH}C}}$$

[[visual:rc-differential-equation]]

This is a **first-order linear ODE** with constant coefficients. The solution has two parts:

1. **Complementary function** (CF): Solution of the homogeneous equation ($v_{oc} = 0$)
2. **Particular integral** (PI): Any specific solution of the full equation

### Solving Step by Step

**CF**: Setting $\dot{v}_C = -\frac{v_C}{\tau}$ where $\tau = R_{TH}C$:

$$v_{C,CF} = Ae^{-t/\tau}$$

**PI**: For a DC source ($v_{oc}$ = constant), try $v_{C,PI} = k$ (constant):

$$0 = -\frac{k}{\tau} + \frac{v_{oc}}{\tau} \implies k = v_{oc}$$

**Complete solution**: $v_C = Ae^{-t/\tau} + v_{oc}$

[[visual:cf-plus-pi]]

**Applying initial condition** at $t = t_0$: $v_C(t_0) = A e^{-t_0/\tau} + v_{oc}$

Solving for $A$: $A = (v_C(t_0) - v_{oc})e^{t_0/\tau}$

Substituting back:

$$v_C - v_{oc} = (v_C(t_0) - v_{oc})e^{-(t-t_0)/\tau}$$

[[visual:general-solution-plot]]

<details>
<summary><strong>Pause & Think</strong>: Why does x(∞) = v_oc? What's the physical meaning?</summary>

As $t \to \infty$, the exponential $e^{-(t-t_0)/\tau} \to 0$, so $v_C \to v_{oc}$. Physically:

- The capacitor is fully charged
- Current has dropped to zero ($i = C \cdot 0 = 0$)
- The voltage across $R_{TH}$ is zero (no current = no drop)
- So $v_C = v_{oc}$ — the capacitor "sees" the entire open-circuit voltage

This is why $v_{oc}$ is the **steady-state value**. It's simply the voltage across the capacitor location when there's no current flow.

</details>

## The General Formula

Both RC and RL circuits produce the same mathematical form:

$$\boxed{x(t) - x(\infty) = [x(t_0) - x(\infty)] \cdot e^{-(t-t_0)/\tau}}$$

or equivalently:

$$\boxed{x(t) = x(\infty) + [x(t_0) - x(\infty)] \cdot e^{-(t-t_0)/\tau}}$$

[[visual:general-formula-annotated]]

where:
- $x(t)$ = capacitor voltage $v_C$ (for RC) or inductor current $i_L$ (for RL)
- $x(t_0)$ = initial value (from continuity property)
- $x(\infty)$ = final steady-state value
- $\tau$ = time constant: $R_{TH}C$ (RC) or $L/R_{TH}$ (RL)

> **Key Insight**: This formula says the circuit exponentially relaxes from its initial state $x(t_0)$ toward its final state $x(\infty)$ with a rate determined by $\tau$. The "distance" from steady state decreases by factor $e^{-1} \approx 0.368$ every $\tau$ seconds.

## The Time Constant τ

The time constant $\tau$ is the single most important parameter of a first-order circuit:

| Circuit | Time constant | Physical meaning |
|---------|---------------|-----------------|
| RC | $\tau = R_{TH} \cdot C$ | Time for $R$ to charge $C$ |
| RL | $\tau = L / R_{TH}$ | Time for $L$ to reach steady-state through $R$ |

[[visual:time-constant-meaning]]

Larger $\tau$ = slower response. Doubling $R$ or $C$ doubles $\tau$, making the circuit twice as sluggish. This is why fast circuits need small resistance and small capacitance.

## Worked Example: RC Step Response

[[visual:rc-step-example]]

**Problem**: An RC circuit with $R = 1\,k\Omega$, $C = 1\,\mu F$ has a voltage source that steps from 0V to 10V at $t = 0$. Find $v_C(t)$.

**Step 1**: Initial condition. Before the switch, $v_C(0^-) = 0$. By continuity: $v_C(0^+) = 0$.

**Step 2**: Steady state. As $t \to \infty$, capacitor is open circuit. $v_C(\infty) = 10$ V.

**Step 3**: Time constant. $\tau = RC = 1000 \times 10^{-6} = 1$ ms.

**Step 4**: Apply the formula:
$$v_C(t) = 10 + (0 - 10)e^{-t/0.001} = 10(1 - e^{-t/\tau}) \text{ V}$$

[[visual:falstad-rc-step-response]]

At specific times:
- $t = \tau$: $v_C = 10(1 - e^{-1}) = 10 \times 0.632 = 6.32$ V (63.2%)
- $t = 3\tau$: $v_C = 10(1 - e^{-3}) = 10 \times 0.950 = 9.50$ V (95%)
- $t = 5\tau$: $v_C = 10(1 - e^{-5}) = 10 \times 0.993 = 9.93$ V (~100%)

<details>
<summary><strong>Pause & Think</strong>: The same circuit but with initial condition v_C(0) = 3V. How does the solution change?</summary>

Only $x(t_0)$ changes:

$$v_C(t) = 10 + (3 - 10)e^{-t/\tau} = 10 - 7e^{-t/\tau}$$

The capacitor starts at 3V and exponentially approaches 10V. At $t = \tau$: $v_C = 10 - 7 \times 0.368 = 7.42$ V. The formula works regardless of initial condition — the only difference is the coefficient of the exponential.

</details>

## Worked Example: RL Step Response

**Problem**: In an RL circuit, the switch closes at $t = 0$. $v_{in} = 10$ V, $R = 5\,\Omega$, $L = 10$ mH. Find $i_L(t)$.

**Step 1**: $i_L(0^+) = i_L(0^-) = 0$ A (switch was open).

**Step 2**: $i_L(\infty) = V/R = 10/5 = 2$ A (inductor is short circuit at steady state).

**Step 3**: $\tau = L/R = 0.01/5 = 2$ ms.

**Step 4**: $i_L(t) = 2 + (0 - 2)e^{-t/0.002} = 2(1 - e^{-t/\tau})$ A.

[[visual:rl-response-plot]]

[[visual:falstad-rl-step-response]]

Notice the duality: this is the same formula as the RC case, with $v_C \leftrightarrow i_L$ and $R_{TH}C \leftrightarrow L/R_{TH}$.

## The Three-Step Inspection Method

For any DC-driven first-order circuit, you need only three numbers:

1. **$x(t_0)$** — Initial value (continuity gives you this)
2. **$x(\infty)$** — Steady state (replace C with open, L with short, solve the resistive circuit)
3. **$\tau$** — Time constant ($R_{TH}C$ or $L/R_{TH}$, where $R_{TH}$ is the Thevenin resistance "seen" by C or L)

Then substitute directly into the general formula. No differential equations needed!

<details>
<summary><strong>Pause & Think</strong>: A capacitor has v_C(0) = 8V in a circuit with R_TH = 2kΩ, C = 5μF, and v_oc = 3V. Find v_C(t) by inspection.</summary>

Using the three-step method:
1. $x(t_0) = v_C(0) = 8$ V
2. $x(\infty) = v_{oc} = 3$ V (steady-state: C is open, gets the open-circuit voltage)
3. $\tau = R_{TH}C = 2000 \times 5 \times 10^{-6} = 10$ ms

$$v_C(t) = 3 + (8 - 3)e^{-t/0.01} = 3 + 5e^{-100t} \text{ V}$$

The voltage starts at 8V and decays toward 3V with a 10ms time constant. Notice it's *decreasing* because $x(t_0) > x(\infty)$ — the capacitor is discharging toward a lower steady state.

</details>

## Summary

Here's your complete toolkit for first-order DC circuits:

- **Canonical form**: Any first-order circuit reduces to Thevenin + C (or Norton + L)
- **General solution**: $x(t) = x(\infty) + [x(t_0) - x(\infty)]e^{-(t-t_0)/\tau}$
- **Time constant**: $\tau = R_{TH}C$ (RC) or $\tau = L/R_{TH}$ (RL)
- **Three-step inspection**: Find $x(t_0)$, $x(\infty)$, and $\tau$ → done. No differential equations needed.
- **Duality**: RC and RL solutions have identical mathematical form — swap $v_C \leftrightarrow i_L$, $C \leftrightarrow L$

> **This is the single most-used formula in analog electronics** — it appears in every RC timing circuit, every filter cutoff frequency calculation, and every power supply transient analysis. Commit it to memory: $x(t) = x(\infty) + [x(t_0) - x(\infty)]e^{-t/\tau}$.
