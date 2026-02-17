## Parallel Connection: The Setup

> **Why This Matters**: Parallel connection is the dual of series connection — and the duality principle is one of the most powerful labour-saving tools in all of circuit theory. Learn it once, and you automatically know twice as many theorems.

In a parallel connection, two (or more) two-terminal resistors share the same pair of nodes. Both elements see the same voltage across their terminals, but the currents through them are generally different. The total current entering the parallel combination — the port current — is the sum of the individual branch currents.

Imagine two rivers merging. Before the junction, each river carries its own volume of water (current). At the junction, they share the same water level (voltage). The total downstream flow is the sum of the two incoming flows. This is parallel connection in nature.

Let the port voltage be $v$ and the port current be $i$. Let $(v_1, i_1)$ and $(v_2, i_2)$ be the voltage-current pairs for the two resistors.

**KVL** forces all branch voltages to be equal:

$$v = v_1 = v_2$$

This is the defining property of a parallel connection.

**KCL** at the common node gives:

$$i = i_1 + i_2$$

The port current is the sum of the individual branch currents.

These two constraints — equal voltages and additive currents — mirror the series connection but with the roles of voltage and current interchanged. This duality is no accident, and we will explore it systematically.

[[visual:parallel-circuit-setup]]

## Parallel Addition of Voltage-Controlled Resistors

Suppose both resistors are **voltage-controlled**:

$$i_1 = \hat{i}_1(v), \quad i_2 = \hat{i}_2(v)$$

Since KVL forces $v_1 = v_2 = v$, we substitute directly into the KCL equation:

$$i = \hat{i}_1(v) + \hat{i}_2(v)$$

This is a function of $v$ alone, which means the parallel combination is also **voltage-controlled**. The result is the exact dual of the series case: **the parallel connection of voltage-controlled resistors produces a voltage-controlled result**.

For linear resistors with $i_1 = G_1 v$ and $i_2 = G_2 v$ (where $G = 1/R$ is the conductance), this gives:

$$i = (G_1 + G_2)v$$

The equivalent conductance is $G_\text{eq} = G_1 + G_2$, or equivalently $\frac{1}{R_\text{eq}} = \frac{1}{R_1} + \frac{1}{R_2}$, which is the familiar parallel resistance formula.

## Graphical Parallel Addition

The graphical procedure for parallel addition is the dual of the series procedure:

1. Pick a value of voltage $v$ on the horizontal axis.
2. Read off the corresponding current $i_1$ from the first curve and $i_2$ from the second curve.
3. Add them: $i = i_1 + i_2$.
4. Plot the point $(v, i)$.
5. Repeat for many voltage values.

[[visual:parallel-addition]]

Geometrically, this is **vertical stacking** of the two curves. At each voltage level, you add the heights (currents) of the two curves. The combined curve sits "above" either individual curve at every voltage.

Compare this with series addition, which was horizontal stacking. In series, you add voltages at each current; in parallel, you add currents at each voltage. The geometric procedures are orthogonal to each other, connected by the duality between voltage and current.

[[visual:vertical-stacking]]

<details>
<summary><strong>Pause & Think</strong>: If you connect a 1kΩ linear resistor in parallel with a perfect open circuit (R = ∞), what is the combined driving-point characteristic?</summary>

The open circuit contributes $i_2 = 0$ at every voltage. So $i = i_1 + 0 = v/1000$. The combined characteristic is identical to the 1kΩ resistor alone — the open circuit has no effect on the parallel combination. This is the dual of the series case where a short circuit has no effect.

</details>

For example, if $R_1$ is a linear conductor with $i_1 = 0.5v$ and $R_2$ is a nonlinear conductor with $i_2 = 0.2v + 0.01v^3$, then:

$$i = 0.5v + 0.2v + 0.01v^3 = 0.7v + 0.01v^3$$

At $v = 1\,\text{V}$: $i = 0.71\,\text{A}$. At $v = 5\,\text{V}$: $i = 3.5 + 1.25 = 4.75\,\text{A}$. The nonlinear contribution grows with voltage, just as it did with current in the series case.

## The Duality Principle

By now you may have noticed that parallel connection is not just "similar" to series connection -- it is its exact mirror image, obtained by swapping certain quantities. This correspondence is called the **duality principle**, and it runs deep through circuit theory.

The duality transformation exchanges the following pairs:

| Series (Original) | Parallel (Dual) |
|---|---|
| Voltage $v$ | Current $i$ |
| Current $i$ | Voltage $v$ |
| KVL | KCL |
| KCL | KVL |
| Resistance $R$ | Conductance $G$ |
| Impedance $Z$ | Admittance $Y$ |
| Voltage source | Current source |
| Current source | Voltage source |
| Open circuit | Short circuit |
| Short circuit | Open circuit |
| Series connection | Parallel connection |
| Mesh | Node |
| Inductance $L$ | Capacitance $C$ |
| Capacitance $C$ | Inductance $L$ |
| Current-controlled | Voltage-controlled |
| Voltage-controlled | Current-controlled |

The power of duality is that **any theorem or result about series connections has an automatic dual statement about parallel connections**, obtained by mechanical substitution of dual terms. You never need to re-derive the parallel result from scratch if you already know the series result.

[[visual:duality-mirror]]

For example, since we proved that "the series connection of current-controlled resistors is current-controlled," the dual statement is immediate: "the parallel connection of voltage-controlled resistors is voltage-controlled." Since series addition involves summing voltage functions at equal current, parallel addition involves summing current functions at equal voltage.

## Extended Duality Table

The duality principle extends beyond resistors to cover the full vocabulary of circuit analysis:

| Term | Dual Term |
|---|---|
| Branch voltage | Branch current |
| Node voltage | Mesh current |
| KVL (sum of voltages around loop = 0) | KCL (sum of currents at node = 0) |
| Thevenin equivalent | Norton equivalent |
| Series RLC | Parallel RLC |
| Voltage divider | Current divider |
| Charge $q$ | Flux linkage $\lambda$ |
| Over-damped | Over-damped (self-dual) |

When solving a new problem, always check whether you have already solved its dual. If so, you can write down the answer by substitution without repeating the analysis.

## Series-Parallel Connections: Mixed Topologies

Real circuits often combine series and parallel connections. A resistor in series with a parallel combination, or a parallel pair in series with another element, requires you to apply both rules in sequence.

The procedure is:
1. Identify which elements are in parallel (same voltage) and which are in series (same current).
2. Reduce parallel groups first (add current functions) or series groups first (add voltage functions), depending on which elements have compatible controllability.
3. Work inward from the innermost group to the outermost.

If the elements have mixed controllability -- some voltage-controlled, some current-controlled -- you must use the **parametric approach**. Define a parameter (typically the shared current for series, or the shared voltage for parallel) and express the combined characteristic as a set of parametric equations.

For example, consider a voltage-controlled resistor with $i_1 = \hat{i}_1(v_1)$ in series with a current-controlled resistor with $v_2 = \hat{v}_2(i)$. Since series forces $i_1 = i_2 = i$:

$$v = v_1 + \hat{v}_2(i), \quad \text{where } i = \hat{i}_1(v_1)$$

The parameter is $v_1$ (or equivalently $i$). For each value of the parameter, you compute both $v$ and $i$ for the combination.

## Example: Zener Diode Circuit Using PWL Technique

A practical application of parallel connection arises in Zener diode voltage regulators. A Zener diode can be modelled as a piecewise-linear (PWL) voltage-controlled resistor:

- For $v > -V_Z$: $i \approx 0$ (reverse-biased, very high resistance)
- For $v \leq -V_Z$: $i = G_Z(v + V_Z)$ (breakdown region, low resistance with slope $G_Z$)

When this Zener diode is placed in parallel with a load resistor $R_L$ (with $i_L = v/R_L$), the parallel combination's characteristic is:

$$i = \hat{i}_\text{Zener}(v) + \frac{v}{R_L}$$

In the normal operating region ($v > -V_Z$), only the load resistor carries current: $i \approx v/R_L$. In the breakdown region, the Zener "clamps" the voltage near $-V_Z$, and additional current is absorbed by the Zener. Graphically, you add the Zener's flat-then-steep curve vertically to the load's straight line.

[[visual:zener-parallel]]

[[visual:diode-parallel-resistor]]

[[visual:falstad-parallel-resistors]]

[[visual:parallel-equivalent-comparison]]


<details>
<summary><strong>Pause & Think</strong>: In a Zener voltage regulator, what happens to the Zener current if the load resistance decreases (load draws more current)?</summary>

The Zener current decreases. Since the total supply current is roughly fixed by the series resistor and supply voltage, any increase in load current must come at the expense of Zener current. If the load draws too much, the Zener drops out of the breakdown region and regulation is lost.

</details>

## Parametric Representation for General Combinations

When neither the series nor parallel rule applies cleanly (because the elements have incompatible controllability types), the parametric representation provides a universal fallback.

For any two elements connected in series with characteristics $f_1(v_1, i_1) = 0$ and $f_2(v_2, i_2) = 0$:
- $i_1 = i_2 = i$ (KCL)
- $v = v_1 + v_2$ (KVL)

You can parameterise the combined curve by choosing $i$ as the parameter, computing $v_1$ and $v_2$ from each element's characteristic at that current (possibly multiple solutions), and plotting $(v_1 + v_2, \, i)$.

For parallel connection:
- $v_1 = v_2 = v$ (KVL)
- $i = i_1 + i_2$ (KCL)

Parameterise by $v$, compute $i_1$ and $i_2$ at that voltage, and plot $(v, \, i_1 + i_2)$.

This approach handles all cases, including multi-valued characteristics, at the cost of requiring point-by-point computation rather than a single closed-form expression.

## Key Takeaways

The parallel connection is the dual of the series connection. Where series forces equal currents and adds voltages, parallel forces equal voltages and adds currents. Voltage-controlled resistors combine cleanly in parallel (currents add), just as current-controlled resistors combine cleanly in series (voltages add). The duality principle provides an automatic translation between series and parallel results by swapping voltage with current, resistance with conductance, and so on. For mixed-controllability combinations, the parametric approach provides a universal method that works point by point in the $v$-$i$ plane.
