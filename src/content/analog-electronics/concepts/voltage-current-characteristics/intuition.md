# Voltage-Current Characteristics

> **Continuation**: Building on your understanding of resistor construction, we now explore how to experimentally characterize components using V-I curves.

## The Big Picture

<!-- DIAGRAM: diag-intuition-01 -->

Every electrical component has a characteristic relationship between the voltage across it and the current through it. This **V-I characteristic** is like a fingerprint — it uniquely identifies how the component behaves.

For an ideal resistor, this relationship is beautifully simple:

$$V = IR$$

Plot voltage (V) on the y-axis and current (I) on the x-axis, and you get a straight line through the origin. The **slope equals the resistance**. This is Ohm's law in graphical form.

But real components aren't always this simple. Diodes, transistors, and even resistors under extreme conditions show curved V-I characteristics. Learning to read and interpret these curves is essential for circuit design.

> 🤔 **Pause & Reflect**: If you plot V vs I for a 1kΩ resistor and a 2kΩ resistor on the same graph, which line is steeper? What does the slope tell you?

<details>
<summary>Click to reveal answer</summary>

The **2kΩ resistor has a steeper slope**. 

Slope = V/I = R. Higher resistance = steeper slope.

Think about it: for the same current (say 1mA), the 2kΩ resistor develops twice the voltage (2V vs 1V). This means more "rise" for the same "run" — a steeper line.

</details>

## Why V-I Characteristics Matter

<!-- DIAGRAM: diag-intuition-02 -->

V-I curves answer critical engineering questions:

1. **Is the component ohmic?** — A straight line through origin = yes
2. **What's its resistance?** — Measure the slope
3. **Is there a threshold?** — Diodes don't conduct until ~0.7V
4. **Where's the safe operating region?** — Stay within the linear portion

In the lab, you'll measure V-I characteristics by:
- Varying voltage across a component
- Measuring the resulting current
- Plotting the data points
- Drawing conclusions about component behavior

> 🤔 **Pause & Reflect**: Why do we call Ohm's law a "law" when not all components obey it?

<details>
<summary>Click to reveal answer</summary>

Ohm's law describes **ohmic materials** — those with linear V-I characteristics at constant temperature. It's not a universal law like conservation of energy.

Many components are **non-ohmic**:
- Diodes have exponential V-I curves
- Transistors have complex characteristics
- Even resistors become non-ohmic if overheated

Ohm's law is better understood as a **definition of ideal resistance** rather than a law all materials must follow.

</details>

## Linear vs Non-Linear Behavior

In the lab, you'll observe that real resistors are quite linear over their operating range — but push them beyond their limits, and non-linearities appear.

<!-- SIMULATION: sim-intuition-01 -->

Use the simulation above to explore V-I characteristics of different components. Notice how:
- Resistors show straight lines with different slopes
- The slope (ΔV/ΔI) equals resistance at any point

---

*Ready to see how this applies in practice? Continue to the Engineering layer.*
