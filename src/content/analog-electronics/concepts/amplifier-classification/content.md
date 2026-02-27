# Amplifier Classification

> **Why This Matters**: Every electronic system that processes signals uses amplifiers. But not all amplifiers are the same — a microphone pre-amp, a current mirror, and a sensor interface all have fundamentally different architectures. Understanding the four amplifier types is the foundation for all analogue design.

## The Four Types of Amplifiers

An amplifier is a two-port network: it has an input port and an output port. The signal at each port can be either a **voltage** or a **current**. This gives us four combinations:

[[visual:voltage-amp-model]]

[[visual:current-amp-model]]

The **voltage amplifier** takes a voltage input and produces a voltage output. Its gain $A_V = V_{out}/V_{in}$ is dimensionless. We model the input as a Thévenin source and the output as a Thévenin equivalent.

The **current amplifier** takes a current input and produces a current output. Its gain $A_I = I_{out}/I_{in}$ is also dimensionless. We use Norton equivalents for both ports.

## Transconductance and Transresistance

[[visual:transconductance-amp]]

[[visual:transresistance-amp]]

The **transconductance amplifier** converts voltage to current: $I_{out} = G_M \cdot V_{in}$. The gain $G_M$ has units of Siemens (1/Ω). The **transresistance amplifier** converts current to voltage: $V_{out} = R_M \cdot I_{in}$. The gain $R_M$ has units of Ohms.

<details>
<summary><strong>Pause & Think</strong>: Why does G_M have units of conductance?</summary>

Because $G_M = I_{out}/V_{in}$. Current divided by voltage equals 1/resistance = conductance. The name "trans-conductance" literally means "conductance across" (from input to output).

</details>

## Comparing All Four Types

[[visual:four-types-comparison]]

[[visual:gain-definitions-summary]]

## The Loading Effect

When you connect a source to an amplifier, or an amplifier to a load, there's inevitably some signal loss. This is the **loading effect**.

[[visual:loading-effect-voltage]]

For a voltage amplifier, the output voltage divider $R_L/(R_L + R_{out})$ means you lose voltage if $R_{out}$ is significant. That's why ideal voltage amplifiers have $R_{out} = 0$.

[[visual:loading-effect-current]]

For a current amplifier, the current divider $R_{out}/(R_{out} + R_L)$ means you lose current if $R_{out}$ is too small. That's why ideal current amplifiers have $R_{out} = \infty$.

## Ideal Parameters

[[visual:ideal-parameters-table]]

[[visual:power-gain-all-types]]

The key insight: **all amplifiers must provide power gain** $P_{out} > P_{in}$, regardless of whether they amplify voltage, current, or both.

<details>
<summary><strong>Pause & Think</strong>: Can an amplifier have voltage gain less than 1 and still be useful?</summary>

Yes! A common-collector (emitter follower) has $A_V \approx 1$ but provides significant current gain and power gain. It's extremely useful as a buffer/impedance transformer.

</details>

## Summary

- Four amplifier types: voltage, current, transconductance, transresistance
- Each has different ideal R_in and R_out requirements
- Loading effects reduce actual gain from the ideal value
- All amplifiers must provide power gain — that's the fundamental requirement
