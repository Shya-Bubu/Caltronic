# The MOS Inverter — Your First MOSFET Circuit

> **Why This Matters**: The inverter is the simplest and most fundamental logic gate. Every complex digital circuit — from a simple counter to a billion-transistor processor — is built from inverters and their derivatives. Understanding how MOSFETs form an inverter is your gateway to all digital logic design.

## What Is a Logic Inverter?

An inverter performs the simplest possible logic operation: it outputs the **opposite** of its input.

$$\boxed{V_{out} = \overline{V_{in}}} \quad \text{(logical complement)}$$

In terms of voltage levels:
- Input HIGH ($V_{in} \approx V_{DD}$) → Output LOW ($V_{out} \approx 0$ V)
- Input LOW ($V_{in} \approx 0$ V) → Output HIGH ($V_{out} \approx V_{DD}$)

[[visual:inverter-truth-table]]

## The Basic Idea: Driver + Load

Every MOS inverter follows the same topology:

1. A **driver transistor** ($T_1$) — an NMOS enhancement device that switches ON or OFF based on the input
2. A **load element** — provides a path from $V_{DD}$ to the output

When the driver is OFF: no current flows, and the load pulls the output to $V_{DD}$ (HIGH).
When the driver is ON: current flows through the load and driver to ground, and the low-resistance driver pulls the output to ~0 V (LOW).

The choice of load element defines the type of MOS inverter.

## Type 1: Enhancement Load Inverter

[[visual:enhancement-load-img]]

In this configuration, both the driver ($T_1$) and the load ($T_2$) are **NMOS enhancement-mode** transistors. The load transistor $T_2$ has its gate connected to $V_{DD}$ — it's always ON.

### Operation Analysis

**When $V_{in}$ = LOW (0 V):**
- $T_1$ (driver): $V_{GS1} = 0 < V_T$ → **OFF**
- No current flows through either transistor
- $V_{out}$ is pulled up toward $V_{DD}$ through $T_2$
- But $V_{out}$ only reaches $V_{DD} - V_T$ (not full $V_{DD}$!) because $T_2$ turns off when $V_{GS2} = V_{DD} - V_{out}$ drops below $V_T$

$$V_{out}(\text{HIGH}) = V_{DD} - V_T \quad \text{(not full } V_{DD} \text{!)}$$

> **Watch Out**: The enhancement load inverter has a **degraded HIGH output**. The output never reaches full $V_{DD}$ because the load transistor loses its drive when $V_{out}$ approaches $V_{DD} - V_T$. This is a significant limitation of this design.

**When $V_{in}$ = HIGH ($V_{DD}$):**
- $T_1$ (driver): $V_{GS1} = V_{DD} > V_T$ → **ON** (strong, low resistance)
- Current flows: $V_{DD} \to T_2 \to T_1 \to$ Ground
- $T_1$ is designed to have much lower $R_{on}$ than $T_2$, so the voltage divider pulls $V_{out}$ close to 0 V

$$V_{out}(\text{LOW}) \approx 0 \text{ V}$$

[[visual:enhancement-load-vtc]]

## Type 2: Depletion Load Inverter

The enhancement load problem — degraded HIGH output — is solved by using a **depletion-mode MOSFET** as the load.

The depletion load has its gate connected to its source ($V_{GS} = 0$), so it's **always ON**, conducting $I_{DSS}$. This acts as a nearly constant-current source.

### Why Depletion Load Is Better

| Feature | Enhancement Load | Depletion Load |
|---------|-----------------|----------------|
| $V_{out}$(HIGH) | $V_{DD} - V_T$ (degraded) | **$V_{DD}$ (full swing)** |
| Load behaviour | Resistive | Current source |
| Gain | Lower | **Higher** |
| Power | Higher static | Lower static |

The depletion load achieves **full output swing** because even as $V_{out}$ approaches $V_{DD}$, the load transistor stays ON (it's depletion-mode — ON at $V_{GS} = 0$).

[[visual:depletion-load-analysis]]

## Logic Levels in MOS Circuits

For any MOS logic family, the logic levels are defined as:

$$V(0) \approx 0 \text{ V} \quad \text{(logic LOW)}$$

$$V(1) \approx V_{DD} \text{ V} \quad \text{(logic HIGH)}$$

The quality of a logic family is judged by how close its actual output voltages are to these ideal levels. The depletion-load inverter produces better logic levels than the enhancement-load version because $V_{out}$(HIGH) reaches full $V_{DD}$.

[[visual:logic-levels-plotly]]

<details>
<summary><strong>Pause & Think</strong>: Why is using another MOSFET as a load better than using a simple resistor?</summary>

On an integrated circuit, resistors consume enormous chip area — a 100 kΩ resistor might take more area than dozens of transistors. A MOSFET load occupies a fraction of that area, is built using the same fabrication process (no extra steps), and provides better circuit performance (especially the depletion load, which acts as a current source giving higher voltage gain). This is why resistors are rarely used as loads in integrated MOS circuits.

</details>

## The MOSFET as Load — Key Concept

The idea of using a transistor as a load instead of a passive resistor is central to all MOS logic:

- **Enhancement load** ($V_{GS} = V_{DD} - V_{out}$): acts as a variable resistor, but output doesn't reach full $V_{DD}$
- **Depletion load** ($V_{GS} = 0$): acts as a constant-current source, full output swing
- **Resistive load** (simple $R_D$): good performance but impractical for integrated circuits due to area

[[visual:load-comparison-schematic]]

## Static Power Dissipation — The Problem

Both enhancement and depletion load inverters share a fundamental flaw: **static power dissipation**.

When the output is LOW ($T_1$ is ON), current flows from $V_{DD}$ through the load and driver to ground:

$$P_{static} = V_{DD} \cdot I_{DS} \quad \text{(power wasted as heat when output is LOW)}$$

This current flows continuously as long as the output stays LOW — even if nothing is switching. In a chip with millions of gates, this adds up to enormous power waste.

This problem is solved by **CMOS** — which we'll cover in Concept 7.

[[visual:falstad-mos-inverter]]

## Summary

- A MOS inverter = driver transistor + load element
- **Enhancement load**: uses NMOS with gate to $V_{DD}$; output HIGH = $V_{DD} - V_T$ (degraded)
- **Depletion load**: uses depletion NMOS with $V_{GS} = 0$; output HIGH = $V_{DD}$ (full swing)
- Logic levels: $V(0) \approx 0$ V, $V(1) \approx V_{DD}$
- MOSFET loads are preferred over resistors due to **small chip area** and **same fabrication process**
- Both types suffer from **static power dissipation** when the output is LOW
- The ultimate solution is **CMOS** (complementary MOS), coming next
