# Two-Terminal Linear Elements

> **Why This Matters**: Every circuit you'll ever build — from a simple LED flashlight to a spacecraft power system — is made of two-terminal elements connected by wires. Before you can analyse anything, you need to know the rules each element plays by. This concept gives you the complete vocabulary.

## The Associated Variable Convention

Before we look at any specific element, we need a convention — a shared agreement about which direction is "positive" for voltage and current.

[[visual:associated-variable-convention]]

Take any two-terminal element and draw it as a black box. Label the two terminals. Now mark the voltage polarity: pick one terminal as $+$ and the other as $-$. The **associated variable convention** says:

$$\text{Current is positive when it enters the } + \text{ terminal}$$

This is not a physical law — it's a bookkeeping rule. Under this convention, if both $V$ and $I$ are positive, the power consumed by the element is:

$$\boxed{P = V \cdot I \geq 0 \quad \text{(element absorbs power)}}$$

A resistor always absorbs power — it converts electrical energy to heat. A battery, on the other hand, delivers power to the circuit. The sign of $P$ tells you which is happening.

<details>
<summary><strong>Pause & Think</strong>: If the current through a resistor turns out to be negative (using the associated convention), does that mean the resistor is generating energy?</summary>

No! A negative current just means you guessed the direction wrong. The power absorbed is still $P = V \cdot I$. If both $V$ and $I$ are negative (or both positive), $P$ is still positive — the resistor still absorbs power. The sign of $P$, not $I$, tells you about energy flow.

</details>

## The Ideal Wire

The simplest element in circuit theory. An ideal wire can carry **any amount of current without any voltage drop**.

[[visual:ideal-wire-vi]]

The element relationship is:

$$\boxed{V = 0 \quad \text{for all } I}$$

On a V-I plot, this is a **vertical line** along the current axis — the voltage is always zero, no matter how much current flows. The resistance of an ideal wire is zero.

Real wires do have a small resistance. A 1-metre copper wire of 1 mm² cross-section has about 0.017Ω. For most circuits, this is negligible — but at very high currents or very long distances, you can't ignore it.

## The Ideal Resistor

The most fundamental passive element. It obeys **Ohm's Law**:

$$\boxed{V = IR}$$

[[visual:resistor-vi-family]]

The V-I characteristic is a **straight line through the origin**. The slope of this line on the I-vs-V plot is:

$$\text{slope} = \frac{\Delta I}{\Delta V} = \frac{1}{R} = G$$

where $G$ is the **conductance**, measured in siemens (S). Using conductance is sometimes easier — for example, three resistors in parallel have a total conductance of simply $G_1 + G_2 + G_3$, which is much tidier than the reciprocal formula for resistance.

> **Key Insight**: The slope of the V-I curve is $G = 1/R$, not $R$. This is a common source of confusion. A steeper line means *lower* resistance (higher conductance) — more current flows for the same voltage.

The power absorbed by a resistor can be written three equivalent ways:

$$P = VI = I^2 R = \frac{V^2}{R}$$

All three are always positive — a resistor always absorbs power.

[[visual:falstad-resistor-circuit]]

## The Open Circuit

An open circuit is the opposite of an ideal wire. **No current flows, regardless of the applied voltage.**

[[visual:open-circuit-vi]]

The element relationship is:

$$\boxed{I = 0 \quad \text{for all } V}$$

On a V-I plot, this is a **horizontal line** along the voltage axis. The resistance of an open circuit is infinite ($R = \infty$), and the conductance is zero ($G = 0$).

In practice, even "open" gaps between wires will spark if the voltage is high enough — that's how lightning works. But within the lumped circuit model, we treat open circuits as perfect insulators.

## The Ideal Voltage Source

An ideal voltage source maintains a **constant voltage** across its terminals, regardless of how much current is drawn from it.

[[visual:voltage-source-vi]]

The element relationship is:

$$\boxed{V = E \quad \text{for all } I}$$

On a V-I plot, this is a **vertical line** at $V = E$. The current can be anything — positive, negative, or zero — and the voltage stays fixed.

A real battery approximates this behaviour, but its voltage drops under heavy load. That's where the next model comes in.

## The Ideal Current Source

An ideal current source forces a **constant current** through itself, regardless of the voltage across it.

[[visual:current-source-vi]]

The element relationship is:

$$\boxed{I = I_0 \quad \text{for all } V}$$

On a V-I plot, this is a **horizontal line** at $I = I_0$. The voltage adjusts to whatever the rest of the circuit demands.

Current sources seem abstract — you rarely see a "current source" on a bench. But transistors in the active region behave exactly like current sources, which is why this model is so important.

<details>
<summary><strong>Pause & Think</strong>: Can you think of a real-world device that behaves like a current source?</summary>

A well-designed LED driver circuit maintains a constant current through the LED regardless of supply voltage variations. Solar cells also behave approximately as current sources — they produce a nearly constant current that depends on light intensity, not on the load resistance.

</details>

## Battery with Internal Resistance

Real voltage sources aren't ideal. A battery has an **internal resistance** $R_{int}$ that causes the terminal voltage to drop as current increases.

[[visual:battery-thevenin-vi]]

The model is a ideal voltage source $E$ in series with a resistor $R_{int}$. This is called the **Thévenin equivalent circuit**. The terminal voltage is:

$$\boxed{V = E - I \cdot R_{int}}$$

On a V-I plot, this is a **straight line with negative slope**. At zero current (open-circuit), the terminal voltage equals $E$. As current increases, the voltage drops linearly. The short-circuit current (when $V = 0$) is:

$$I_{SC} = \frac{E}{R_{int}}$$

[[visual:falstad-battery-internal-r]]

> **Watch Out**: The negative slope in the V-I plot does NOT mean negative resistance. It means the terminal voltage decreases as the load draws more current — exactly what you expect from a real battery.

## The V-I Characteristic as a Universal Language

[[visual:vi-comparison-all]]

Here's the powerful insight: every two-terminal element, no matter what's inside it, is completely characterised by its V-I relationship. Whether it's a resistor, a light bulb, a diode, or a black box containing a complex circuit — if you know the function $f(V, I) = 0$, you know everything you need to analyse it.

This is the foundation of the entire course. In the next concept, you'll see that nonlinear elements (like diodes) have curved V-I characteristics instead of straight lines — but the analysis approach is exactly the same.

<details>
<summary><strong>Pause & Think</strong>: If you connect a battery (with internal resistance) to a resistor, how would you find the operating point?</summary>

Plot the battery's V-I line ($V = E - IR_{int}$) and the resistor's V-I line ($V = IR$) on the same graph. The intersection point is the operating point — it satisfies both element relationships simultaneously. This graphical technique is called the **load-line method**, and you'll use it extensively with diodes and transistors.

</details>

## Summary

| Element | Symbol | V-I Relationship | V-I Plot Shape |
|---------|--------|-----------------|---------------|
| Ideal wire | Short line | $V = 0$ | Vertical line on I-axis |
| Resistor | Zigzag | $V = IR$ | Line through origin, slope $1/G$ |
| Open circuit | Gap | $I = 0$ | Horizontal line on V-axis |
| Voltage source | Circle with +/− | $V = E$ | Vertical line at $V = E$ |
| Current source | Circle with arrow | $I = I_0$ | Horizontal line at $I = I_0$ |
| Battery + $R_{int}$ | Source + resistor | $V = E - IR_{int}$ | Line with negative slope |

Every circuit element — linear, nonlinear, simple, or complex — can be represented by its V-I characteristic. This is the language of circuit analysis.
