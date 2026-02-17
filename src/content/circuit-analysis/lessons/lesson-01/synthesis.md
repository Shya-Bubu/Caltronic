# Summary: Two-Terminal Resistors

You have now completed the foundational lesson on two-terminal resistors. Let's consolidate the key ideas.

## The Big Picture

The single most important takeaway from this lesson is this: **a resistor is not just a component that obeys Ohm's law.** In circuit theory, any two-terminal device whose voltage and current satisfy some relationship $f(v, i) = 0$ is called a resistor. This includes linear resistors, ideal diodes, PN-junction diodes, tunnel diodes, voltage sources, current sources, and many more.

Every one of these devices is completely described by its **v-i characteristic** — a curve (or set of curves) on the v-i plane. If you know the v-i characteristic, you know everything about how that device behaves in any circuit.

## Key Relationships

| Device | v-i Relationship | Type |
|--------|-----------------|------|
| Linear resistor | $v = Ri$ or $i = Gv$ | Both voltage and current controlled |
| Open circuit | $i = 0$ for all $v$ | Dual of short circuit |
| Short circuit | $v = 0$ for all $i$ | Dual of open circuit |
| Ideal diode | $v \cdot i = 0$, $v \leq 0$, $i \geq 0$ | Piecewise linear |
| PN-junction diode | $i = I_s(e^{v/V_T} - 1)$ | Voltage-controlled |
| Tunnel diode | Multi-valued in voltage | Current-controlled |

## Analysis Techniques Learned

1. **Graphical series addition** — for series-connected current-controlled resistors, add the v-i curves vertically (voltages add at same current)
2. **Graphical parallel addition** — for parallel-connected voltage-controlled resistors, add the v-i curves horizontally (currents add at same voltage)
3. **Load-line analysis** — find DC operating points as intersection of device curve and load line
4. **PWL approximation** — replace smooth nonlinear curves with piecewise-linear segments for easier computation
5. **The duality principle** — swap voltage $\leftrightarrow$ current, series $\leftrightarrow$ parallel, $R \leftrightarrow G$ to transform one known result into another

## What's Next

In Lesson 02, you will learn how to analyse **general resistive circuits** with multiple nodes and branches — using systematic methods like nodal analysis and the tableau method. The v-i characteristics you learned here will be the building blocks for those techniques.
