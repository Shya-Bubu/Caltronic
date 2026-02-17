## What Does "DC Analysis" Mean?

> **Why This Matters**: Finding the DC operating point is the first step in analysing any real circuit. Whether you’re designing a power supply, biasing a transistor amplifier, or simulating a nonlinear system, you must first determine where the circuit "sits" on the v-i plane before you can do anything else. This is the foundation of all circuit design.

Throughout this course, we have built up a vocabulary of resistors — linear and nonlinear, current-controlled and voltage-controlled — and methods for combining them in series and parallel. But there is a fundamental question that we have not yet addressed head-on: given a complete circuit with DC sources, **what voltage and current values actually appear in the circuit?**

Think of it like finding the meeting point of two roads on a map. The nonlinear device is one road (its v-i curve). The source-and-resistor combination is the other road (the load line). The operating point is where these two roads intersect. If they don’t cross, there’s no valid state — the circuit cannot exist as described.

DC analysis is the process of finding these values. When all sources in a circuit are constant (DC), every voltage and every current in the circuit settles to a constant value. The goal of DC analysis is to determine those constant values. There are no time derivatives to worry about, no transient behaviour, and no frequency-domain considerations. You are solving a system of algebraic equations — KCL, KVL, and the element constitutive relations — simultaneously.

The solution to this system is a set of voltages and currents that satisfy every constraint in the circuit at the same time. Each such solution is called a **DC operating point** (sometimes abbreviated as the **Q-point**, for "quiescent point"). The operating point is the $(v, i)$ pair at which the circuit actually operates under the given DC excitation.

[[visual:dc-concept]]

## Uniqueness: Linear vs. Nonlinear Circuits

If the circuit contains only **linear passive resistors** and a single independent source, the system of equations is linear. A linear system with a unique source has a unique solution. This is a direct consequence of the fact that linear resistor characteristics are straight lines through the origin, and two non-parallel lines in the $v$-$i$ plane intersect at exactly one point. You can always find the operating point, and there is exactly one.

The situation changes dramatically when **nonlinear resistors** are present. Nonlinear constitutive relations produce nonlinear algebraic equations, and nonlinear equations can have:

- **A unique solution** -- the circuit operates at exactly one point.
- **Multiple solutions** -- the circuit has more than one valid operating point. Which one it actually settles into depends on the circuit's history and initial conditions.
- **No solution** -- no set of voltages and currents simultaneously satisfies all constraints. This typically indicates a modelling problem or a physically unrealisable configuration.

Understanding which of these cases applies, and how to find the operating point(s), is the central challenge of nonlinear DC analysis.

## The Back-to-Back One-Port Framework

A powerful way to organise nonlinear DC analysis is the **back-to-back one-port** model. Suppose you can partition the entire circuit into two one-port sub-circuits, $N_a$ and $N_b$, connected at exactly two nodes. Each sub-circuit has its own driving-point $v$-$i$ characteristic.

The connection constraints are straightforward:

- **KVL** at the shared terminals: $v_a = v_b$. Both sub-circuits see the same voltage across the two shared nodes.
- **KCL** at the shared node: $i_a = -i_b$. The current leaving one sub-circuit enters the other. (The sign depends on your reference direction convention; if both are defined with current entering the positive terminal, then the constraint is $i_a + i_b = 0$.)

Let $N_a$ have the characteristic $i_a = \hat{i}_a(v)$ and $N_b$ have the characteristic $i_b = \hat{i}_b(v)$. The operating-point condition becomes:

$$\hat{i}_a(v) + \hat{i}_b(v) = 0$$

or equivalently, $\hat{i}_a(v) = -\hat{i}_b(v)$. Graphically, the operating points are the **intersections** of the $v$-$i$ curve of $N_a$ with the $v$-$i$ curve of $N_b$ (after reflecting $N_b$'s curve to account for the sign convention). Every intersection is a valid operating point. The number of intersections — zero, one, or many — determines how many operating points the circuit has.

[[visual:back-to-back]]

## The Graphical (Load-Line) Method

The most common application of the back-to-back framework occurs when one sub-circuit is a **nonlinear device** and the other is a **DC source in series with a linear resistor**. This is the classic load-line setup.

Consider a circuit in which a DC voltage source $E_b$ drives current through a linear resistor $R_b$ and a nonlinear device. The nonlinear device has some $v$-$i$ characteristic $i = g(v)$ (its device curve). The source-plus-resistor combination has the characteristic:

$$i = \frac{E_b - v}{R_b}$$

This is a straight line in the $v$-$i$ plane, called the **load line**. It intersects the voltage axis at $v = E_b$ (where $i = 0$) and the current axis at $i = E_b / R_b$ (where $v = 0$).

[[visual:load-line-sim]]

[[visual:diode-circuit-sim]]

[[visual:falstad-diode-bias]]

[[visual:stable-vs-unstable-op-point]]


To find the operating point(s):

1. Plot the device curve $i = g(v)$ on the $v$-$i$ plane.
2. Plot the load line $i = (E_b - v)/R_b$ on the same plane.
3. Identify every intersection. Each intersection is a DC operating point.

The beauty of this method is that it translates the problem of solving a nonlinear equation into the problem of finding where two curves cross. Your eye can immediately see whether there are zero, one, or multiple solutions, and roughly where they are.

- **Unique intersection**: One operating point. The circuit has a single, well-defined DC state.
- **Multiple intersections**: Multiple operating points. The circuit is potentially bistable or multistable. Which point the circuit actually operates at depends on how the circuit was brought to its current state.
- **No intersection**: No operating point. The mathematical model has no solution for the given source and load values. This usually signals that the model is incomplete or that a physical constraint has been violated.

[[visual:op-point-plot]]

## Worked Example: Quadratic Device with Load Line

Suppose the nonlinear device has the characteristic $i = 4v^2$ and the source circuit has $E_b = 2\,\text{V}$ and $R_b = \frac{1}{4}\,\Omega$. The load line is:

$$i = \frac{2 - v}{1/4} = 4(2 - v) = 8 - 4v$$

Setting the device curve equal to the load line:

$$4v^2 = 8 - 4v$$

$$4v^2 + 4v - 8 = 0$$

$$v^2 + v - 2 = 0$$

This is a standard quadratic. The discriminant is $\Delta = 1 + 8 = 9$, so:

$$v = \frac{-1 \pm 3}{2}$$

This gives two solutions:

- $v = 1\,\text{V}$, which yields $i = 4(1)^2 = 4\,\text{A}$.
- $v = -2\,\text{V}$, which yields $i = 4(-2)^2 = 16\,\text{A}$.

Both are mathematically valid -- both satisfy the device equation and the load-line equation simultaneously. Whether both are physically meaningful depends on the device. If the device characteristic $i = 4v^2$ is only valid for $v \geq 0$, then only the first solution $(1\,\text{V},\, 4\,\text{A})$ is physically realisable. If the device genuinely follows $i = 4v^2$ for negative voltages as well, then both points are legitimate operating points, and the circuit is bistable.

This example illustrates a critical lesson: **always check whether your mathematical solutions lie within the valid range of the device model.** A solution that falls outside the model's domain is an artefact of the algebra, not a physical operating point.

<details>
<summary><strong>Pause & Think</strong>: In the worked example, one solution is at v = -2V with i = 16A. If the device only operates for v ≥ 0, is this a real operating point?</summary>

No. If the device model $i = 4v^2$ is only valid for $v \geq 0$, then $v = -2\,\text{V}$ falls outside the model’s domain. This solution is a **mathematical artefact** — it satisfies the algebra but not the physics. Only $(1\,\text{V}, 4\,\text{A})$ is a real operating point.

</details>

## The Newton-Raphson Method

The graphical method is excellent for building intuition, but it becomes impractical when you need precise numerical answers or when the device curve is complicated. In such cases, the **Newton-Raphson method** provides a systematic iterative approach to finding operating points.

The idea is simple. Suppose you need to solve $f(x) = 0$, where $f$ encodes the operating-point condition (for example, $f(v) = g(v) - (E_b - v)/R_b$, where $g(v)$ is the device characteristic). Start with an initial guess $x_0$ and iterate:

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

At each step, you approximate the function by its tangent line at the current guess and find where that tangent line crosses zero. This new crossing becomes your next guess. Under good conditions (a reasonable initial guess and a well-behaved function), the method converges rapidly -- often doubling the number of correct digits at each step (quadratic convergence).

However, convergence is not guaranteed. If the initial guess is far from the true root, or if $f'(x)$ is very small near some iterate (a near-horizontal tangent line), the method can diverge or oscillate. In practice:

- Choose an initial guess informed by a rough graphical sketch or physical reasoning.
- Monitor convergence: if the iterates are not settling down after a few steps, try a different starting point.
- When the circuit has multiple operating points, different initial guesses may converge to different roots. You may need to run the algorithm several times with different starting points to find all solutions.

For the worked example above ($f(v) = 4v^2 + 4v - 8 = 0$), starting from $v_0 = 0$:

- $f(0) = -8$, $f'(0) = 4(0) \cdot 2 + 4 = 4$. So $v_1 = 0 - (-8)/4 = 2$.
- $f(2) = 16 + 8 - 8 = 16$, $f'(2) = 16 + 4 = 20$. So $v_2 = 2 - 16/20 = 1.2$.
- $f(1.2) = 5.76 + 4.8 - 8 = 2.56$, $f'(1.2) = 9.6 + 4 = 13.6$. So $v_3 = 1.2 - 2.56/13.6 \approx 1.012$.

The iterates are converging toward $v = 1$, which is one of the two solutions we found algebraically. Starting from a negative initial guess (say $v_0 = -3$) would steer the iteration toward the other root at $v = -2$.

## Key Insights

Nonlinear DC analysis reveals behaviour that has no analogue in the linear world:

- A circuit can have **no operating point**, meaning the device and its load are incompatible at the given source level. Linear circuits always have a solution; nonlinear circuits may not.
- A circuit can have **multiple operating points**, leading to bistability or multistability. This property is the foundation of memory elements and digital logic circuits -- a flip-flop, at its core, is a circuit with two stable operating points.
- The **load-line method** is a graphical tool that gives immediate visual insight into the number and approximate location of operating points. It is indispensable for quick analysis and for building physical intuition.
- The **Newton-Raphson method** extends the analysis to cases where graphical accuracy is insufficient, providing a numerical pathway to precise results when the equations are too complex for closed-form solution.

The interplay between graphical understanding and numerical computation is a recurring theme in engineering analysis. Neither method alone is sufficient; the graphical approach tells you what to expect, and the numerical method delivers the precise answer.

[[visual:newton-raphson-steps]]

<details>
<summary><strong>Pause & Think</strong>: If Newton-Raphson converges to v = 1V starting from v₀ = 0, why would it converge to v = -2V if you started from v₀ = -3?</summary>

Newton-Raphson is a **local** method — it converges to the root nearest the starting point (under good conditions). The tangent-line approximation at $v_0 = 0$ points toward the positive root, while the tangent at $v_0 = -3$ points toward the negative root. Different initial guesses explore different regions of the function landscape.

</details>
