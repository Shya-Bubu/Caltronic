# Dependent Sources

> **Why This Matters**: Dependent sources are the single most important modeling concept for understanding transistors. Every amplifier — from a guitar pedal to a satellite receiver — works because a small signal at the input *controls* a larger signal at the output. That control relationship is exactly what a dependent source captures.

## From Two Terminals to Four Terminals

So far, every element you've studied has had **two terminals** — one relationship between $V$ and $I$. Dependent sources are different: they have **four terminals** (two ports).

[[visual:two-port-concept]]

The **control port** (input) senses a voltage or current. The **output port** generates a voltage or current that is proportional to the control signal. The proportionality constant is the gain.

This is the mathematical essence of amplification: a small cause produces a large effect.

## The Four Types

There are exactly four possible combinations of what you sense and what you produce:

[[visual:four-types-comparison]]

| Type | Abbreviation | Control Variable | Output Variable | Constant | Units |
|------|-------------|-----------------|----------------|----------|-------|
| Voltage-Controlled Current Source | **VCCS** | Voltage $V_1$ | Current $I_2 = G_m V_1$ | $G_m$ | siemens (S) or A/V |
| Current-Controlled Current Source | **CCCS** | Current $I_1$ | Current $I_2 = \beta I_1$ | $\beta$ | dimensionless |
| Voltage-Controlled Voltage Source | **VCVS** | Voltage $V_1$ | Voltage $V_2 = \mu V_1$ | $\mu$ | dimensionless |
| Current-Controlled Voltage Source | **CCVS** | Current $I_1$ | Voltage $V_2 = r I_1$ | $r$ | ohms (Ω) |

<details>
<summary><strong>Pause & Think</strong>: Why do G_m and r have units, but β and μ don't?</summary>

When the input and output are the **same type** (both voltages for VCVS, both currents for CCCS), the ratio is dimensionless — it's a pure gain factor. When they're **different types** (voltage in, current out for VCCS), the ratio must carry units to make the equation dimensionally correct. $G_m$ has units of A/V (= siemens) and $r$ has units of V/A (= ohms).

</details>

## The Diamond Symbol

In circuit diagrams, dependent sources are drawn with a **diamond shape** (◇) instead of the circle used for independent sources. This is a critical visual distinction:

[[visual:diamond-vs-circle]]

- **Circle** (○) = independent source — its value is fixed, regardless of anything else in the circuit
- **Diamond** (◇) = dependent source — its value depends on a voltage or current elsewhere in the circuit

The arrow inside a dependent current source or the polarity marks inside a dependent voltage source follow the same conventions as independent sources.

## VCCS — Voltage-Controlled Current Source

[[visual:vccs-detail]]

A VCCS senses a voltage $V_1$ at the control port and produces a current $I_2 = G_m V_1$ at the output port. The proportionality constant $G_m$ is called the **transconductance**.

$$\boxed{I_2 = G_m V_1}$$

Transconductance has units of siemens (S) = amperes per volt. A transconductance of $G_m = 50$ mS means that for every 1 mV change in the control voltage, the output current changes by 50 μA.

> **Key Insight**: The MOSFET in its saturation region behaves as a VCCS. The gate-source voltage controls the drain current. This is why MOSFETs are called "voltage-controlled" devices.

## CCCS — Current-Controlled Current Source

[[visual:cccs-detail]]

A CCCS senses a current $I_1$ at the control port and produces a current $I_2 = \beta I_1$ at the output port. The constant $\beta$ is the **current gain**.

$$\boxed{I_2 = \beta I_1}$$

$\beta$ is dimensionless because it's a ratio of two currents. Typical values range from 50 to 500.

> **Key Insight**: The BJT in its active region behaves as a CCCS. The base current $I_B$ controls the collector current $I_C = \beta I_B$. This is why BJTs are called "current-controlled" devices.

## VCVS — Voltage-Controlled Voltage Source

A VCVS senses a voltage $V_1$ and produces a voltage $V_2 = \mu V_1$ at the output. The constant $\mu$ is the **voltage gain**.

$$\boxed{V_2 = \mu V_1}$$

$\mu$ is dimensionless and can be very large — operational amplifiers are modeled as VCVS elements with $\mu$ values of 100,000 to 1,000,000.

## CCVS — Current-Controlled Voltage Source

A CCVS senses a current $I_1$ and produces a voltage $V_2 = r I_1$. The constant $r$ is the **transresistance**.

$$\boxed{V_2 = r I_1}$$

Transresistance has units of ohms. A transresistance of 1 kΩ means each milliamp of input current produces 1 V at the output.

## Why Dependent Sources Matter for Transistors

Here's the punchline of this concept. When you study the BJT and MOSFET in the following concepts, you'll see that their circuit models in the active/saturation region contain dependent sources:

| Device | Active Region Model Contains | Type |
|--------|------------------------------|------|
| **BJT** | $I_C = \beta I_B$ | CCCS |
| **MOSFET** | $I_D = G_m V_{GS}$ (small signal) | VCCS |
| **Op-Amp** | $V_{out} = A(V_+ - V_-)$ | VCVS |

[[visual:transistor-dependent-source-connection]]

This is not a coincidence — this is the **definition** of amplification. A transistor is a physical device that creates a dependent-source relationship between its terminals. Understanding the four dependent sources gives you the vocabulary to describe what every amplifier does.

<details>
<summary><strong>Pause & Think</strong>: Why is the CCCS model (not VCCS) used for the BJT, while VCCS is used for the MOSFET?</summary>

The BJT is physically controlled by base current — electrons injected into the base region control the collector current. The MOSFET is physically controlled by gate-source voltage — the electric field from the gate creates the channel. The choice of model reflects the underlying physics of the device.

</details>

## Solving Circuits with Dependent Sources

The key difference from independent sources: **the dependent source's value is NOT a given number** — it depends on something else in the circuit. This creates more equations to solve, but the method is the same:

1. Write KVL and KCL equations as usual
2. Include the dependent source's value as an unknown
3. Write the **dependency equation** (e.g., $I_2 = \beta I_1$)
4. Solve the system of equations simultaneously

Note: **superposition does NOT work for dependent sources** in the usual way. You cannot "turn off" a dependent source because it's coupled to the circuit. Dependent sources are always active during superposition analysis.

## Summary

- Dependent sources have **four terminals** (two ports): a control port and an output port
- The four types are **VCCS** ($G_m$), **CCCS** ($\beta$), **VCVS** ($\mu$), **CCVS** ($r$)
- Diamond symbol (◇) distinguishes dependent from independent (○) sources
- **BJTs behave as CCCS** ($I_C = \beta I_B$), **MOSFETs as VCCS** ($I_D = G_m V_{GS}$)
- Dependent sources cannot be "turned off" during superposition
- This is the mathematical language of **amplification** — small input controls large output
