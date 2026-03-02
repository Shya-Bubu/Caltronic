# Basic Logic Gates: NOT, OR, AND

> **Why This Matters**: Every digital system — from a pocket calculator to a supercomputer — is built from just a handful of elementary operations. The NOT, OR, and AND gates are the three primitives from which all digital logic is constructed. Understanding these gates at both the **logical** level (truth tables, Boolean expressions) and the **physical** level (transistor and diode circuits) gives you the complete picture of how abstract 1s and 0s become real voltages on real wires.

## The Binary World: Voltages as Logic

Before diving into gates, establish the ground rules. Digital circuits work with **two voltage levels**:

| Logic Level | Voltage (typical TTL) | Meaning |
|-------------|----------------------|---------|
| **0** (LOW) | 0 V (ground) | False, OFF, no signal |
| **1** (HIGH) | 5 V (V_CC) | True, ON, signal present |

[[visual:voltage-logic-mapping]]

Everything in between is a **forbidden zone** — the circuit is designed so that voltages always settle cleanly to 0 V or 5 V. This binary encoding is the foundation of all digital logic.

> **Key Insight**: The specific voltages don't matter — what matters is that there are exactly **two** distinguishable states. Some systems use 0 V and 3.3 V, others use 0 V and 1.8 V. The logic is identical; only the voltage thresholds change.

## Gate 01: The NOT Gate (Negation / Inverter)

The NOT gate is the simplest possible logic operation: it **flips** the input.

$$Z = \bar{X}$$

| X | Z = X̄ |
|---|--------|
| 0 | 1 |
| 1 | 0 |

[[visual:not-gate-symbol]]

### The Transistor Inverter Circuit

How do you actually build a NOT gate? The lecture shows a **transistor inverter**:

[[visual:transistor-inverter-circuit]]

**How it works**:
- **When X = 0 V** (logic 0): The transistor is **OFF** (cutoff). No current flows through the collector-emitter path. The output is pulled HIGH through V_CC: **Z = 5 V** (logic 1). ✓ Output is the complement of input.
- **When X = 5 V** (logic 1): The transistor is **ON** (saturated). V_CE drops to approximately 0 V (the collector-emitter saturates). The output is pulled LOW: **Z ≈ 0 V** (logic 0). ✓ Output is the complement of input.

The voltage truth table confirms the inversion:

| X (V) | Z (V) |
|-------|-------|
| 0 V | 5 V |
| 5 V | 0 V |

[[visual:falstad-not-inverter]]

<details>
<summary><strong>Pause & Think</strong>: Why is V_CE approximately 0V when the transistor is ON, rather than exactly 0V?</summary>

When a BJT is in saturation, there's still a small voltage drop across the collector-emitter junction — typically 0.1–0.3 V (called V_CE(sat)). This is close enough to 0 V to be read as logic 0, but it's never truly zero. This is why we said "approximately 0 V" and why the forbidden zone has some margin.

</details>

> **Key Insight**: The transistor inverter is the fundamental building block of all CMOS and TTL logic families. Every NAND, NOR, and complex gate you'll encounter is built from variations of this basic inverter topology.

## Gate 02: The OR Gate (Disjunction)

The OR gate outputs 1 if **any** input is 1:

$$Z = X_0 + X_1 + \ldots + X_{n-1}$$

The "+" symbol means logical OR (not arithmetic addition).

| X₀ | X₁ | Z = X₀ + X₁ |
|----|-----|-------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

[[visual:or-gate-symbol]]

### The Diode OR Circuit

The lecture shows how to build an OR gate using **diodes**:

[[visual:diode-or-circuit]]

**How it works**: Each input is connected to the output through a forward-biased diode. If **any** input is HIGH (5 V), the corresponding diode conducts, pulling the output HIGH:

| X₀ (V) | X₁ (V) | Z (V) |
|--------|--------|-------|
| 0 V | 0 V | 0 V |
| 0 V | 5 V | ~4.3 V (≈ 5 – 0.7 diode drop) |
| 5 V | 0 V | ~4.3 V |
| 5 V | 5 V | ~4.3 V |

[[visual:falstad-or-diode]]

Notice the voltage truth table shows ~4.3 V instead of 5 V — the diode introduces a 0.7 V forward voltage drop. This is close enough to 5 V to still register as logic 1, but it's a limitation of simple diode logic. Real OR gate ICs use transistor-based circuits to achieve rail-to-rail output.

<details>
<summary><strong>Pause & Think</strong>: If you cascaded three diode OR gates in series, the output would drop by 3 × 0.7V = 2.1V. Would this still be a valid logic 1?</summary>

At 5V – 2.1V = 2.9V, the output is getting dangerously close to the threshold between logic 0 and logic 1 (typically around 1.4V for TTL). After a few more stages, the signal would degrade below the threshold and be read as logic 0 — even though it should be logic 1.

This is why **diode-only logic (DL) is never used in practice for more than one or two stages**. Real logic families (TTL, CMOS) use transistors to restore the signal to full rail voltages at every gate — a concept called **signal restoration** or **regeneration**.

</details>

> **Extending to N inputs**: The OR gate generalises naturally to any number of inputs. An N-input OR gate outputs 1 if one or more inputs is 1. Only when ALL inputs are 0 does the output equal 0.

## Gate 03: The AND Gate (Conjunction)

The AND gate outputs 1 only when **all** inputs are 1:

$$Z = X_0 \cdot X_1 \cdot \ldots \cdot X_{n-1} = X_0 \wedge X_1 \wedge \ldots \wedge X_{n-1}$$

The "·" (dot) or "∧" symbols mean logical AND.

| X₀ | X₁ | Z = X₀ · X₁ |
|----|-----|-------------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

[[visual:and-gate-symbol]]

### The Diode AND Circuit

The lecture shows the diode AND gate:

[[visual:diode-and-circuit]]

**How it works**: The output is pulled HIGH through a resistor to V_CC. Each input is connected through a diode. When any input is LOW, the corresponding diode conducts, pulling the output LOW. Only when all inputs are HIGH do the diodes not conduct, and the output stays HIGH.

| X₀ (V) | X₁ (V) | Z (V) |
|--------|--------|-------|
| 0 V | 0 V | ~0.7 V |
| 0 V | 5 V | ~0.7 V |
| 5 V | 0 V | ~0.7 V |
| 5 V | 5 V | ~5 V (≈ 5 – I_z · R) |

The lecture notes observe: "Why only 0.7?" — because when both inputs are LOW, the diode's forward voltage prevents the output from reaching true 0 V. Again, real AND gates use transistor circuits.

[[visual:falstad-and-diode]]

<details>
<summary><strong>Pause & Think</strong>: The AND gate truth table has only ONE row with output 1 (when all inputs are 1). The OR gate has only ONE row with output 0 (when all inputs are 0). What pattern do you notice?</summary>

AND and OR are **logical duals** of each other! If you swap 0↔1 in all inputs and outputs of an AND gate, you get an OR gate, and vice versa. This duality principle (formalised by De Morgan's theorem) runs through all of Boolean algebra and will be a powerful simplification tool.

</details>

## The Three Gates Side by Side

[[visual:three-gates-comparison]]

| Property | NOT | OR | AND |
|----------|-----|-----|-----|
| Inputs | 1 | 2+ | 2+ |
| Symbol | Triangle + bubble | Curved body | Flat body |
| Expression | Z = X̄ | Z = X₀ + X₁ | Z = X₀ · X₁ |
| Output = 1 when | Input is 0 | Any input is 1 | All inputs are 1 |
| Physical circuit | Transistor inverter | Diode OR | Diode AND |

## Summary

- **NOT** (inverter): $Z = \bar{X}$ — flips the input. Built with a single transistor.
- **OR** (disjunction): $Z = X_0 + X_1$ — output HIGH if any input HIGH. Built with diodes to V_out.
- **AND** (conjunction): $Z = X_0 \cdot X_1$ — output HIGH only if all inputs HIGH. Built with diodes and a pull-up resistor.
- **Voltage levels**: 0 V = logic 0, 5 V = logic 1. Diode circuits introduce ~0.7 V drops; real ICs use transistors for signal restoration.

> **These three gates are your alphabet.** Every digital function, no matter how complex, can be expressed as combinations of NOT, OR, and AND. In the next concept, you'll meet derived gates (XOR, NAND, NOR, XNOR) that provide useful shortcuts — but they're all built from these three primitives.
