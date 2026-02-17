# Synthesis — The Modeling Ladder

You've just climbed from the simplest possible electronic element (an ideal wire — V = 0, always) to a three-terminal semiconductor device with quadratic V-I characteristics and three distinct regions of operation. Let's zoom out and see the structure.

## The Abstraction Hierarchy

| Layer | What You Model | Model Type | Accuracy |
|-------|---------------|-----------|----------|
| **Ideal wire** | Perfect conductor | V = 0 | Exact (within LCA) |
| **Ideal resistor** | Ohm's law | V = IR (linear) | Good for most circuits |
| **Battery + R** | Real voltage source | Thévenin equivalent | Captures internal loss |
| **Diode (ideal switch)** | PN junction | On/Off | Crude but fast |
| **Diode (CVD)** | PN junction + threshold | V_T = 0.7V | Better for DC analysis |
| **Diode (PWL + R_f)** | PN junction + slope | V = V_T + I·R_f | Good for most design |
| **Diode (Ebers-Moll)** | Full exponential | $I = I_S(e^{V/V_T} - 1)$ | Exact (nonlinear) |
| **BJT** | Current amplifier | External energy model + β | Active linear design |
| **MOSFET** | Voltage-controlled current | $I_{DS} = \frac{K}{2}(V_{GS}-V_T)^2$ | Amplifier design |

Every model higher up the ladder gives you more accuracy at the cost of harder equations. **The art of analog electronics is choosing the right rung.**

## The Unifying Pattern

No matter how different a wire, a diode, and a MOSFET seem, the analysis technique is identical:

1. **Write the element relationship** — the equation linking V and I at the terminals
2. **Write the circuit equations** — KVL, KCL, or graphical intersection
3. **Solve** — algebraically (linear), graphically (nonlinear), or numerically (complex)

The only thing that changes between a resistor circuit and a MOSFET circuit is step 1. Everything else you already know from circuit analysis.

## Dependent Sources Are the Key to Amplification

The four dependent sources (VCCS, CCCS, VCVS, CCVS) aren't just textbook abstractions — they are the **exact models** used inside transistors:

| Device | Behaves Like | Controlling Variable | Output |
|--------|-------------|---------------------|--------|
| **BJT (active)** | CCCS | Base current $I_B$ | Collector current $\beta I_B$ |
| **MOSFET (sat.)** | VCCS | Gate-source voltage $V_{GS}$ | Drain current $\frac{K}{2}(V_{GS}-V_T)^2$ |

This is why we studied dependent sources before transistors — so when you see a BJT, you recognise it as a current-controlled current source with some extra details, not as a mysterious three-legged device.

## What's Next

With these models in hand, you're ready to:

- **Analyse circuits with nonlinear elements** — using graphical methods (load lines) and piecewise-linear approximation
- **Design bias circuits for BJTs and MOSFETs** — choosing resistor values to set the operating point in the active/saturation region
- **Build amplifiers** — combining dependent-source models with small-signal analysis to predict gain, input impedance, and output impedance

> **You now have every building block you need to understand and design analog circuits.** The rest of the course applies these models to increasingly sophisticated circuits. The hard conceptual work is done — from here, it's practice and refinement.
