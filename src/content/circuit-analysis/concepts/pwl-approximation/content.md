## Why Piecewise-Linear Approximation?

> **Why This Matters**: PWL approximation is how engineers bridge the gap between elegant theory and practical computation. Every SPICE simulator uses PWL internally. Every datasheet "diode model" is a PWL simplification. Mastering this technique lets you analyse circuits that would be intractable with exact nonlinear equations.

Nonlinear resistor characteristics — exponentials, polynomials, empirical curves — are mathematically inconvenient. You cannot add two exponentials and get another exponential. You cannot easily invert a cubic to find a closed-form operating point. Every new nonlinearity requires a fresh analytical effort, and many real-world curves resist closed-form treatment entirely.

Think of PWL approximation like building with LEGO bricks. Instead of sculpting a smooth curve from clay (exact nonlinear analysis), you approximate it with straight-edged blocks. Each block is simple and predictable. The more blocks you use, the closer your approximation gets to the original curve. The key insight is that within each block, all the powerful tools of linear circuit analysis apply.

**Piecewise-linear (PWL) approximation** solves this problem by replacing a smooth nonlinear curve with a sequence of straight-line segments. Within each segment, the device behaves like a linear resistor (possibly with an offset), and all the powerful tools of linear circuit analysis apply. The price is that you must determine which segment you are operating in — the "region analysis" step — but this is often straightforward.

PWL models bridge the gap between the simplicity of linear analysis and the accuracy of fully nonlinear models. They are particularly important in computational circuit analysis, SPICE-like simulators (which use PWL models internally for convergence), and hand analysis of circuits containing diodes, transistors, and other nonlinear devices.

[[visual:pwl-concept]]

## The Concave Resistor: A Basic Voltage-Controlled PWL Element

The simplest nontrivial PWL element is the **concave resistor** (sometimes called a "dead-zone" element). It is a voltage-controlled resistor with the following characteristic:

$$i = \hat{i}(v) = \begin{cases} 0 & \text{if } v \leq E \\ G(v - E) & \text{if } v > E \end{cases}$$

where $E$ is the **breakpoint voltage** and $G$ is the **slope** (conductance) above the breakpoint.

The $v$-$i$ curve is flat (zero current) for $v \leq E$, then rises linearly with slope $G$ for $v > E$. It has a single "kink" at $v = E$. This is the two-segment PWL equivalent of a diode turn-on: no current below the threshold, linear rise above it.

The concave resistor can be realised as an ideal diode in series with a voltage source $E$ and a conductance $G$. This circuit interpretation is important because it means you can build complex PWL characteristics from simple circuit elements.

[[visual:concave-convex]]

## The Convex Resistor: The Dual Element

The **convex resistor** is the dual of the concave resistor. It is a current-controlled resistor with the characteristic:

$$v = \hat{v}(i) = \begin{cases} 0 & \text{if } i \leq J \\ R(i - J) & \text{if } i > J \end{cases}$$

where $J$ is the **breakpoint current** and $R$ is the **slope** (resistance) above the breakpoint.

The $v$-$i$ curve is flat (zero voltage) for $i \leq J$, then rises linearly with slope $R$ for $i > J$. By the duality principle, everything we prove about concave resistors in parallel has an automatic dual statement about convex resistors in series.

## Building Multi-Segment PWL Characteristics

The power of PWL modelling lies in the fact that **any** piecewise-linear characteristic with an arbitrary number of segments can be built by combining basic elements:

**Voltage-controlled PWL (any number of segments):**

$$\hat{i}(v) = I_0 + G_0 v + \sum_{k=1}^{n} G_k \max(v - E_k, \; 0)$$

This is equivalent to:
- A **current source** $I_0$
- A **linear conductance** $G_0$ (the slope of the first segment)
- A set of **concave resistors** in parallel, one per breakpoint

Each concave resistor "activates" at its breakpoint voltage $E_k$ and adds a slope change of $G_k$ to the characteristic. Below $E_k$, the concave resistor contributes nothing. Above $E_k$, it contributes $G_k(v - E_k)$ to the current.

**Current-controlled PWL (any number of segments):**

$$\hat{v}(i) = V_0 + R_0 i + \sum_{k=1}^{n} R_k \max(i - J_k, \; 0)$$

This is equivalent to:
- A **voltage source** $V_0$
- A **linear resistance** $R_0$ (the slope of the first segment)
- A set of **convex resistors** in series, one per breakpoint

Every statement about voltage-controlled PWL and parallel composition has an exact dual for current-controlled PWL and series composition.

## The Decomposition Method

Given a multi-segment PWL curve, you need to find the parameters ($G_0$, $G_k$, $E_k$, $I_0$) that reproduce it. The procedure is called **decomposition** and works as follows:

1. **Identify the segments**: Read the breakpoint voltages $E_1, E_2, \ldots, E_n$ from the curve.
2. **Find the initial slope**: $G_0$ is the slope of the first segment (leftmost, below $E_1$).
3. **Find the slope changes**: At each breakpoint $E_k$, compute $G_k = (\text{slope of segment } k+1) - (\text{slope of segment } k)$. The $G_k$ are the **incremental slope changes**, not the absolute slopes.
4. **Find the offset**: $I_0$ is the current at $v = 0$ (extrapolated from the first segment if necessary).

For example, consider a three-segment PWL curve:
- Segment 1: slope $G_0 = 0.1\,\text{S}$ for $v < 2\,\text{V}$
- Segment 2: slope $0.5\,\text{S}$ for $2\,\text{V} < v < 5\,\text{V}$
- Segment 3: slope $2.0\,\text{S}$ for $v > 5\,\text{V}$

The decomposition gives:
- $G_0 = 0.1\,\text{S}$ (first slope)
- $E_1 = 2\,\text{V}$, $G_1 = 0.5 - 0.1 = 0.4\,\text{S}$ (slope change at first breakpoint)
- $E_2 = 5\,\text{V}$, $G_2 = 2.0 - 0.5 = 1.5\,\text{S}$ (slope change at second breakpoint)

The circuit realisation is: a conductance $G_0 = 0.1\,\text{S}$ in parallel with a concave resistor ($E_1 = 2\,\text{V}$, $G_1 = 0.4\,\text{S}$) in parallel with another concave resistor ($E_2 = 5\,\text{V}$, $G_2 = 1.5\,\text{S}$).

[[visual:decomposition-example]]

<details>
<summary><strong>Pause & Think</strong>: If a three-segment PWL curve has slopes 0.1, 0.5, 2.0 S in successive segments, what are the G_k slope-change values?</summary>

$G_1 = 0.5 - 0.1 = 0.4\,\text{S}$ and $G_2 = 2.0 - 0.5 = 1.5\,\text{S}$. These are the **incremental** slope changes, not the absolute slopes. This distinction is the most common source of errors in PWL decomposition.

</details>

## Region Analysis

Once you have a PWL model in a circuit, finding the operating point requires **region analysis**. The idea is:

1. **Assume a region**: Guess which linear segment each PWL element is operating on.
2. **Replace each element with its linear equivalent** for that region (a linear resistor plus a source, reflecting the offset of that segment).
3. **Solve the resulting linear circuit** using standard methods (KVL/KCL, nodal analysis, etc.).
4. **Check consistency**: Verify that the solution falls within the assumed region. If element $k$ was assumed to be on segment $j$ (valid for $E_j \leq v_k < E_{j+1}$), check that the computed $v_k$ satisfies this inequality.
5. **If inconsistent, revise**: Choose a different region assignment and repeat.

For a circuit with $m$ PWL elements, each having $s_k$ segments, there are at most $\prod_k s_k$ possible region combinations. In practice, most combinations are quickly eliminated, and the correct one is found within a few attempts.

[[visual:pwl-explorer]]

## PWL Approximation of the PN-Junction Diode

The most common application of PWL modelling is replacing the exponential PN-junction diode characteristic with a simpler piecewise-linear approximation.

**Two-segment model** (most common for hand analysis):
- For $v < V_\gamma$: $i = 0$ (diode off)
- For $v \geq V_\gamma$: $i = G_d(v - V_\gamma)$ (diode on, with forward conductance $G_d = 1/r_d$)

Here $V_\gamma \approx 0.7\,\text{V}$ is the turn-on voltage and $r_d$ is the incremental forward resistance (typically 10--50 $\Omega$ for signal diodes). This is a single concave resistor with $E = V_\gamma$ and $G = G_d$.

**Three-segment model** (more accurate):
- For $v < -V_B$: $i = G_B(v + V_B)$ (reverse breakdown, large slope)
- For $-V_B \leq v < V_\gamma$: $i = 0$ (reverse-biased, off)
- For $v \geq V_\gamma$: $i = G_d(v - V_\gamma)$ (forward-biased, on)

This adds the reverse breakdown region, modelled as another linear segment at large negative voltage. The three-segment model captures forward conduction, reverse blocking, and reverse breakdown.

The accuracy of the PWL approximation depends on how many segments you use and where you place the breakpoints. More segments give a better fit to the exponential, but increase the complexity of region analysis. For most hand calculations, two segments suffice. For computer-aided analysis, five to ten segments can approximate the exponential to within a fraction of a percent.

[[visual:pwl-diode-models]]

[[visual:region-analysis-flowchart]]

[[visual:falstad-pwl-diode]]

[[visual:segment-accuracy-comparison]]



<details>
<summary><strong>Pause & Think</strong>: The ideal diode from a previous lesson is itself a PWL model. How many segments does it have, and what are the slopes?</summary>

The ideal diode has **two segments**: segment 1 has slope 0 (reverse biased, $i = 0$ for $v < 0$) and segment 2 has slope $\infty$ (forward conducting, $v = 0$ for $i > 0$). It’s the simplest possible PWL diode model, with breakpoint at $E = 0$ and $G = \infty$.

</details>

## Synthesis: From Characteristic to Circuit

The **synthesis problem** is the reverse of analysis: given a desired PWL characteristic, construct a circuit that realises it. The procedure is:

1. Identify the type (voltage-controlled or current-controlled).
2. Decompose into $G_0$, $\{G_k, E_k\}$ (or $R_0$, $\{R_k, J_k\}$).
3. For voltage-controlled: build the circuit as $I_0$ current source + $G_0$ conductance + concave resistors in parallel.
4. For current-controlled: build the circuit as $V_0$ voltage source + $R_0$ resistance + convex resistors in series.
5. Each concave/convex resistor is realised as an ideal diode + source + resistor.

This synthesis procedure guarantees that any PWL curve can be physically realised with ideal diodes, sources, and linear resistors. It is a cornerstone of nonlinear circuit design and simulation.

## Common Pitfalls

Several errors frequently arise in PWL analysis:

- **Confusing absolute slope with slope change**: The decomposition parameters $G_k$ are **incremental** changes in slope at each breakpoint, not the absolute slope of segment $k+1$. If the slopes are $0.1$, $0.5$, $2.0$, the $G_k$ values are $0.4$ and $1.5$, not $0.5$ and $2.0$.
- **Forgetting to check region consistency**: After solving a linear circuit within an assumed region, you must verify the solution lies within that region. An inconsistent solution means you assumed the wrong region.
- **Incorrect sign for negative slopes**: If the slope decreases at a breakpoint (as in a negative-resistance region), the corresponding $G_k$ is negative. This can occur in tunnel diode PWL models.
- **Misplacing breakpoints**: The breakpoint is where the slope changes, not where the function value changes. Read breakpoints from the $v$-axis (for voltage-controlled) or $i$-axis (for current-controlled).

## Key Takeaways

Piecewise-linear approximation replaces smooth nonlinear curves with straight-line segments, enabling linear analysis within each region. Voltage-controlled PWL characteristics are built from concave resistors in parallel; current-controlled PWL characteristics are built from convex resistors in series, in exact duality. The decomposition method extracts incremental slope changes and breakpoints from a given curve. Region analysis determines which segment applies in a given circuit, and consistency checking ensures the answer is correct. PWL models of the PN-junction diode provide a practical bridge between the ideal diode and the full exponential model.
