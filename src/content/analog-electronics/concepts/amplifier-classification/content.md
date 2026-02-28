# Classification of Amplifiers

> **Why This Matters**: Before we analyze any specific amplifier circuit, we need a universal framework. No matter how complicated the internals, every amplifier can be described by just three things: **input impedance, output impedance, and transfer gain**. This classification will be used throughout the rest of this course — in small-signal analysis, feedback amplifiers, and multi-stage amplifiers.

## What Makes an Amplifier?

An amplifier must increase output **power** compared to input power. Since power = voltage × current, and we have two electrical quantities (voltage and current), the input can be either a voltage or a current, and so can the output. This gives us **four types** of amplifiers.

[[visual:four-types-comparison]]

<details>
<summary><strong>Pause & Think</strong>: Why do we need four types? Can't we just use one?</summary>

The type depends on the physical nature of what you're amplifying. A microphone outputs a voltage — you want a voltage amplifier. A photodiode outputs a current — you want a transresistance amplifier to convert it to voltage. The classification matches the physics of your application.

</details>

## Type 1: Voltage Amplifier

[[visual:voltage-amp-model]]

The voltage amplifier is modeled using **Thévenin equivalent circuits** on both input and output sides. Inside the black box you have:
- **$R_{in}$** — input impedance
- **$A_V \cdot V_{in}$** — a dependent voltage source (the gain)
- **$R_{out}$** — output impedance

The actual output voltage is:

$$V_{out} = A_V \cdot V_{in} - R_{out} \cdot I_{out}$$

And the input voltage suffers a **potential divider loss**:

$$V_{in} = V_S \cdot \frac{R_{in}}{R_{in} + R_S}$$

For the gain to be independent of source and load: we need $R_{in} \gg R_S$ and $R_{out} \ll R_L$.

[[visual:loading-effect-voltage]]

## Type 2: Current Amplifier

[[visual:current-amp-model]]

The current amplifier uses **Norton equivalent circuits**. The output is a dependent current source $A_I \cdot I_{in}$.

Current divider at input: $I_{in} = I_S \cdot \frac{R_S}{R_S + R_{in}}$

Current divider at output: $I_{out} = A_I \cdot I_{in} \cdot \frac{R_{out}}{R_{out} + R_L}$

For ideal operation: $R_{in} \ll R_S$ and $R_{out} \gg R_L$ — the **opposite** of the voltage amplifier!

<details>
<summary><strong>Pause & Think</strong>: Why are the impedance requirements opposite for current amplifiers?</summary>

For current to flow into the amplifier, the input must look like a short circuit ($R_{in} \approx 0$). For the output current to flow entirely through the load, the internal path must be blocked ($R_{out} \approx \infty$). This is exactly opposite to the voltage case where you want no current drawn at input and no voltage drop at output.

</details>

## Type 3: Transconductance Amplifier

[[visual:transconductance-amp]]

Input is a voltage → Thévenin input. Output is a current → Norton output. The gain $G_M$ converts voltage to current, so it has units of **Siemens (1/Ω)**.

$$I_{out} = G_M \cdot V_{in}$$

For ideal operation: $R_{in} \gg R_S$ (same as voltage amp) and $R_{out} \gg R_L$ (same as current amp).

## Type 4: Transresistance Amplifier

[[visual:transresistance-amp]]

Input is a current → Norton input. Output is a voltage → Thévenin output. The gain $R_M$ converts current to voltage, so it has units of **Ohms**.

$$V_{out} = R_M \cdot I_{in}$$

For ideal operation: $R_{in} \ll R_S$ and $R_{out} \ll R_L$.

## Ideal Characteristics Summary

[[visual:ideal-parameters-table]]

When these ideal conditions are met, the gain becomes **independent of the source resistance $R_S$ and load resistance $R_L$** — which are external things we don't control. As engineers, we design circuits to be as close to these ideal conditions as possible so we don't have to worry about what we connect.

[[visual:gain-definitions-summary]]

## The Key Insight

[[visual:power-gain-all-types]]

> **Take-home message**: If you have a linear amplifier, you don't need too many variables to characterize it. If you can define $R_{in}$, $R_{out}$, and the transfer gain, then you pretty much know everything about the circuit.

[[visual:loading-effect-current]]

## Summary

- Four amplifier types based on voltage/current input and output
- Each characterized by just three parameters: $R_{in}$, $R_{out}$, and transfer gain
- Voltage amp: Thévenin I/O, $R_{in} = \infty$, $R_{out} = 0$ ideally
- Current amp: Norton I/O, $R_{in} = 0$, $R_{out} = \infty$ ideally
- Transconductance: mixed Thévenin/Norton, both $R_{in}$ and $R_{out} = \infty$
- Transresistance: mixed Norton/Thévenin, both $R_{in}$ and $R_{out} = 0$
- When ideal conditions are met, gain is independent of source and load
