## The Driving-Point Characteristic of a One-Port

> **Why This Matters**: Series connection is one of the two fundamental ways to combine circuit elements. Understanding how to compute the combined v-i characteristic — whether algebraically or graphically — is essential for analysing everything from voltage dividers to complex nonlinear circuits. The techniques here generalise far beyond linear resistors.

When two or more two-terminal elements are connected together, the resulting combination presents two terminals to the outside world. From the perspective of the rest of the circuit, the combination is itself a two-terminal device — a **one-port**. The relationship between the voltage $v$ across these two terminals and the current $i$ entering the port is called the **driving-point characteristic**.

Think of it like a garden hose. If you connect two hose sections end-to-end (series), the water flows through both at the same rate (same current). The total pressure drop (voltage) across the combined hose is the sum of the pressure drops across each section. This is exactly what KCL and KVL tell us.

The central question is: if you know the $v$-$i$ characteristics of the individual elements, can you determine the driving-point characteristic of their combination? For series and parallel connections, the answer is yes, and the procedure is both elegant and geometric.

[[visual:one-port-concept]]

## Series Connection: The Setup

Consider two two-terminal resistors, $R_1$ and $R_2$, connected in series. This means they share a single common node, and the current that flows through one must flow through the other. No current enters or leaves the intermediate node (there is no branch to anywhere else).

Let the port voltage be $v$ and the port current be $i$. Let $v_1$ and $i_1$ be the voltage across and current through $R_1$, and similarly $v_2$ and $i_2$ for $R_2$.

**KCL at the intermediate node** forces:

$$i = i_1 = i_2$$

All three currents are identical. This is the defining property of a series connection.

**KVL around the loop** gives:

$$v = v_1 + v_2$$

The port voltage is the sum of the individual voltages.

These two constraints — equal currents and additive voltages — completely determine the driving-point characteristic of the series combination.

[[visual:series-circuit-setup]]

## Series Addition of Current-Controlled Resistors

Now suppose both resistors are **current-controlled**, meaning their characteristics can be written as:

$$v_1 = \hat{v}_1(i), \quad v_2 = \hat{v}_2(i)$$

Since KCL forces $i_1 = i_2 = i$, we can substitute directly into the KVL equation:

$$v = \hat{v}_1(i) + \hat{v}_2(i)$$

This is itself a function of $i$ alone, which means the series combination is also **current-controlled**. The result is clean and simple: at any given current $i$, the combined voltage is just the sum of the individual voltages.

This is a fundamental result: **the series connection of current-controlled resistors produces a current-controlled result**.

For linear resistors this reduces to the familiar $R_\text{eq} = R_1 + R_2$, since $\hat{v}_1(i) = R_1 i$ and $\hat{v}_2(i) = R_2 i$, so $v = (R_1 + R_2)i$.

## Graphical Series Addition

The algebraic rule $v = \hat{v}_1(i) + \hat{v}_2(i)$ has a direct geometric interpretation. To construct the combined $v$-$i$ curve graphically:

1. Pick a value of current $i$ on the vertical axis (if $i$ is plotted vertically) or a horizontal level.
2. Read off the corresponding voltage $v_1$ from the first curve and $v_2$ from the second curve.
3. Add them: $v = v_1 + v_2$.
4. Plot the point $(v, i)$.
5. Repeat for many values of $i$.

[[visual:series-addition]]

Geometrically, this amounts to **horizontal stacking** of the two curves. At each current level, you slide one curve to the right by the voltage of the other. The result is a new curve that is "wider" than either individual curve at every current level.

[[visual:horizontal-stacking]]

Think of it like this: if you imagine the $v$-$i$ plane with voltage on the horizontal axis and current on the vertical axis, then at each fixed height (fixed current), the horizontal position of the combined curve equals the sum of the horizontal positions of the individual curves. You are literally adding horizontal distances.

<details>
<summary><strong>Pause & Think</strong>: If you connect a 1kΩ linear resistor in series with a perfect short circuit (R = 0), what is the combined driving-point characteristic?</summary>

The short circuit contributes $v_2 = 0$ at every current. So $v = v_1 + 0 = R_1 \cdot i = 1000i$. The combined characteristic is identical to the 1kΩ resistor alone — the short circuit has no effect on the series combination. This makes intuitive sense: adding a zero-resistance link to a hose doesn't change the pressure drop.

</details>

For example, if $R_1$ is a linear resistor with $v_1 = 2i$ and $R_2$ is a nonlinear resistor with $v_2 = i + i^3$, then:

$$v = 2i + i + i^3 = 3i + i^3$$

At $i = 1\,\text{A}$: $v_1 = 2\,\text{V}$, $v_2 = 2\,\text{V}$, $v = 4\,\text{V}$. At $i = 2\,\text{A}$: $v_1 = 4\,\text{V}$, $v_2 = 10\,\text{V}$, $v = 14\,\text{V}$. The nonlinear element dominates at higher currents.

## Parametric Representation

What if the resistors are not both current-controlled? Suppose $R_1$ is voltage-controlled ($i_1 = \hat{i}_1(v_1)$) and $R_2$ is current-controlled ($v_2 = \hat{v}_2(i_2)$). Since $i = i_1 = i_2$, we still have:

$$v = v_1 + \hat{v}_2(i)$$

But $v_1$ is not directly expressed as a function of $i$ for the voltage-controlled element. Instead, we can write the combined characteristic in **parametric form** using the common current $i$ as the parameter:

$$\begin{cases} v_1 \text{ satisfies } i = \hat{i}_1(v_1), \text{ i.e., } v_1 = \hat{i}_1^{-1}(i) \text{ if invertible} \\ v = v_1 + \hat{v}_2(i) \end{cases}$$

If $\hat{i}_1$ is invertible (monotonic), this simplifies to a single expression. If not, you must carry both equations and construct the curve point by point.

In practice, the parametric approach works as follows:
- Choose a value of $i$.
- From the characteristic of $R_1$, find $v_1$ (there may be multiple values if $R_1$ is not current-controlled).
- Compute $v_2 = \hat{v}_2(i)$.
- Plot $(v_1 + v_2, \, i)$.
- Repeat.

This always works, even when closed-form addition fails.

## The Reversed-Terminal Case

Sometimes one of the resistors in a series connection has its polarity reversed relative to the assumed reference direction. If $R_1$ is connected with reversed terminals, then the voltage across $R_1$ in terms of the current is not $\hat{v}_1(i)$ but $-\hat{v}_1(-i)$.

This follows from the sign convention: reversing the terminals of a two-terminal device is equivalent to replacing $v$ with $-v$ and $i$ with $-i$ in its characteristic. For a current-controlled resistor, the voltage in the series combination becomes:

$$v = -\hat{v}_1(-i) + \hat{v}_2(i)$$

This is a common source of sign errors. The procedure to avoid mistakes is systematic:

1. Assign a consistent reference direction for the port current $i$.
2. For each element, determine whether its assumed current direction agrees with $i$.
3. If the current through element $k$ is $+i$, use $\hat{v}_k(i)$. If the current is $-i$ (reversed terminals), use $-\hat{v}_k(-i)$.
4. Sum all the voltage contributions via KVL.

For a bilateral resistor (symmetric characteristic), $\hat{v}(-i) = -\hat{v}(i)$, so $-\hat{v}_1(-i) = -(-\hat{v}_1(i)) = \hat{v}_1(i)$. The reversal has no effect. This makes physical sense: flipping a symmetric device does not change anything.

For a non-bilateral resistor (such as a diode), the reversal fundamentally changes the series combination. It is the difference between adding forward-biased and reverse-biased behaviour.

## Worked Example: Linear + Nonlinear in Series

Consider a linear resistor $R_1 = 3\,\Omega$ ($v_1 = 3i$) in series with a nonlinear resistor whose characteristic is $v_2 = 2i + 5i^3$.

The combined driving-point characteristic is:

$$v = v_1 + v_2 = 3i + 2i + 5i^3 = 5i + 5i^3$$

This is current-controlled. Evaluating at a few points:

| $i$ (A) | $v_1$ (V) | $v_2$ (V) | $v$ (V) |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0.5 | 1.5 | 1.625 | 3.125 |
| 1.0 | 3.0 | 7.0 | 10.0 |
| 2.0 | 6.0 | 44.0 | 50.0 |

At small currents, the linear term dominates and the combined curve looks like a $5\,\Omega$ resistor. At larger currents, the cubic term takes over and the effective resistance grows rapidly.

[[visual:worked-example-series]]

[[visual:falstad-voltage-divider-series]]

[[visual:series-equivalent-comparison]]

[[visual:three-resistors-series]]


<details>
<summary><strong>Pause & Think</strong>: At what current does the nonlinear term ($5i^3$) contribute as much voltage as the linear term ($5i$)?</summary>

Set $5i = 5i^3$, which gives $i^2 = 1$, so $i = 1\,\text{A}$. At this current, each term contributes 5V, for a total of 10V. Below 1A, the circuit behaves approximately linearly; above 1A, the nonlinear term dominates.

</details>

## Connection to Linear Series Resistance

For the special case where both resistors are linear ($v_1 = R_1 i$, $v_2 = R_2 i$), the series addition gives:

$$v = R_1 i + R_2 i = (R_1 + R_2)i$$

This is the familiar result that series resistances add. The nonlinear theory is fully consistent with what you already know from introductory circuits; it simply extends the principle to arbitrary characteristics.

The graphical method also reduces to the linear case: two straight lines with slopes $R_1$ and $R_2$ (in the $v$-$i$ plane) add horizontally to give a straight line with slope $R_1 + R_2$.

## Key Takeaways

The series connection of two-terminal resistors is governed by two laws:

- **KCL**: the current is the same through all series elements ($i = i_1 = i_2$).
- **KVL**: the voltages add ($v = v_1 + v_2$).

When both elements are current-controlled, the combined characteristic is found by adding the voltage functions at each current value. This can be done algebraically (adding the $\hat{v}$ functions) or graphically (horizontal stacking of $v$-$i$ curves). The result is always current-controlled. For mixed or voltage-controlled elements, a parametric approach is needed. Terminal reversals introduce sign changes that must be tracked carefully, and bilateral resistors are immune to reversal effects.
