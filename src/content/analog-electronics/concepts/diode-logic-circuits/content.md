# Diode Logic Circuits — Building Gates from Diodes

> **Why This Matters**: Before transistor logic gates became practical, engineers built logic circuits from diodes and resistors. Understanding diode logic is essential for two reasons: it introduces the concept of mapping physical voltage levels to Boolean logic, and it reveals the limitations that motivated the invention of more sophisticated gates like DTL and TTL.

## The Diode as a Logic Switch

You already know that a diode conducts in one direction and blocks in the other. But to use diodes for logic, you first need a practical model for their ON and OFF states.

[[visual:diode-on-off-model]]

**When the diode is ON (forward-biased):**

The diode can be modelled as an ideal diode in series with a voltage source $V_\gamma$ and a small forward resistance $R_f$:

$$V_{ON} = V_\gamma + I_{D(ON)} \times R_f$$

For a typical silicon diode, $V_\gamma \approx 0.6V$ to $0.65V$, and with a small forward current, $V_{ON}$ works out to approximately:

$$\boxed{V_{ON} \approx 0.75V \approx 0.8V}$$

This is the voltage that appears across a conducting diode in the circuits we'll analyse.

**When the diode is OFF (reverse-biased):**

The diode is modelled as an open circuit. No current flows. However, the lecture notes emphasise that this isn't a perfect model — there *is* a very small reverse leakage current, but it's negligible for logic circuit analysis.

[[visual:diode-iv-characteristic]]

## The 2-Input Diode AND Gate

Now let's build something useful. Here's a logic gate made from just two diodes and a resistor:

[[visual:diode-and-gate-schematic]]

The circuit has:
- Two input terminals: **A** and **B**
- Two diodes: $D_A$ (cathode connected to input A) and $D_B$ (cathode connected to input B)
- The anodes of both diodes tied together at a common output node
- A pull-up resistor $R$ connecting the output node to $+V_{cc}$

The output voltage $V_o$ is taken at the common anode node.

> **Key Insight**: Notice the diode orientation — the *anodes* are at the output and the *cathodes* face the inputs. This is deliberate. When an input is LOW, current flows from the output node through the diode toward the low input, pulling the output down. When an input is HIGH, no current flows through that diode.

## Truth Table Analysis

Let's work through every combination of inputs systematically. We define:
- **Logic 0** (boolean zero) = LOW voltage = $0V$
- **Logic 1** (boolean one) = HIGH voltage = $+V_{cc}$

[[visual:diode-and-truth-table]]

| A | B | $D_A$ | $D_B$ | Output $z$ |
|:--:|:--:|:--:|:--:|:--:|
| LOW (0) | LOW (0) | ON | ON | LOW ($\approx 0.8V$) |
| LOW (0) | HIGH (1) | ON | OFF | LOW ($\approx 0.8V$) |
| HIGH (1) | LOW (0) | OFF | ON | LOW ($\approx 0.8V$) |
| HIGH (1) | HIGH (1) | OFF | OFF | HIGH ($+V_{cc}$) |

The output is HIGH **only when both inputs are HIGH**. This is the truth table of an **AND gate**: $z = A \cdot B$.

## Case-by-Case Analysis

Let's verify each case with circuit analysis to understand *why* the truth table works.

**Case (d): Both A and B are HIGH ($+V_{cc}$)**

[[visual:case-both-high]]

When both inputs are at $+V_{cc}$:
- The cathodes of both $D_A$ and $D_B$ are at $+V_{cc}$
- The anodes are pulled toward $+V_{cc}$ by the resistor $R$
- For a diode to conduct, the anode must be *higher* than the cathode by at least $V_\gamma$
- But the anode can't exceed $+V_{cc}$ (it's pulled up to $V_{cc}$ by $R$)
- So both diodes are reverse-biased → **OFF**
- No current flows through $R$, so there's no voltage drop across it
- Output: $V_o = +V_{cc}$ → **HIGH**

**Case (b): A is LOW ($0V$), B is HIGH ($+V_{cc}$)**

[[visual:case-one-low]]

When input A is at $0V$:
- The cathode of $D_A$ is at $0V$
- The anode is pulled toward $+V_{cc}$ by $R$, which is much higher than $0V + V_\gamma$
- So $D_A$ conducts → **ON**
- Current flows from $+V_{cc}$ through $R$, through $D_A$, to the grounded input A
- The output voltage is clamped to the diode's ON voltage:

$$\boxed{V_o = V_{D(ON)} \approx +0.8V \approx \text{LOW}}$$

Meanwhile, input B is at $+V_{cc}$:
- The cathode of $D_B$ is at $+V_{cc}$
- The anode is at only $0.8V$ (clamped by $D_A$)
- So $D_B$ is reverse-biased → **OFF**

The same logic applies when only B is LOW (case c), or when both are LOW (case a — both diodes conduct).

<details>
<summary><strong>Pause & Think</strong>: What would happen if you reversed the diode orientations (anodes to inputs, cathodes to output)?</summary>

You'd get an **OR gate** instead of an AND gate. With reversed diodes, a HIGH input would forward-bias its diode and pull the output HIGH through the diode. The output would be LOW only when all inputs are LOW. The diode orientation determines whether you build AND or OR logic.

</details>

[[visual:falstad-diode-and-gate]]

## Connecting to Boolean Algebra

The voltage-to-logic mapping used in this lecture follows **positive logic convention**:

| Voltage Level | Boolean Value | Logic Level |
|:---:|:---:|:---:|
| $0V$ (ground) | 0 | LOW |
| $+V_{cc}$ | 1 | HIGH |

This mapping is consistent throughout the rest of the course. Higher voltage = logic 1, lower voltage = logic 0.

> **Watch Out**: The lecture notes show a crossed-out attempt at negative logic mapping ($0 = \text{high}$, $1 = \text{low}$). This was explicitly rejected. Always use positive logic convention in this course.

[[visual:diode-limitations-chart]]

## Limitations of Diode Logic

Diode logic gates have several practical problems:

1. **Signal degradation** — Each stage of diode logic drops $\approx 0.8V$ from the output. After several cascaded stages, the voltage levels degrade and can't be distinguished.
2. **No signal restoration** — A resistor can't amplify. The output of a diode gate is always weaker than the input.
3. **Level shifting** — The LOW output is $0.8V$, not $0V$. This shifts the logic levels with each stage.
4. **Fan-in limitations** — More input diodes means more current through $R$, which changes the voltage drop.

These limitations are exactly why the **Diode-Transistor Logic (DTL)** gate was invented — by adding a BJT, you get signal restoration and proper logic levels. That's the next concept.

<details>
<summary><strong>Pause & Think</strong>: If you cascade three diode AND gates, what is the minimum output LOW voltage at the final stage?</summary>

Each diode drops approximately $0.8V$. However, the degradation isn't simply additive — it depends on the circuit topology. But conceptually, the concern is valid: cascaded diode logic stages accumulate voltage offsets that eventually make logic levels indistinguishable. This is the core limitation that transistor-based logic solves.

</details>

## Summary

- A diode can be modelled as $V_{ON} \approx 0.8V$ when conducting, open circuit when OFF
- Two diodes + a pull-up resistor form a **2-input AND gate**
- The output is HIGH ($+V_{cc}$) only when **both** inputs are HIGH
- When any input is LOW, that diode conducts and clamps the output to $\approx 0.8V$
- **Positive logic convention**: $0V$ = logic 0, $+V_{cc}$ = logic 1
- Diode logic cannot restore signal levels — this limitation motivates DTL
