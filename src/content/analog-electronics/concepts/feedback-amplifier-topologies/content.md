# Feedback Amplifier Topologies

> **Why This Matters**: The feedback equation $A_f = \frac{A}{1+A\beta}$ tells us *what* feedback does, but it doesn't tell us *how* to connect the feedback network in a real circuit. There are **four distinct ways** to connect feedback — each matching one of the four amplifier types you learned earlier. Choosing the wrong topology means your impedances will change in the wrong direction, defeating the purpose of feedback. This section is the practical backbone of feedback amplifier design.

## The Two Big Questions

When you look at a feedback amplifier circuit, you need to answer two questions:

1. **How do you SAMPLE the output?** — You can measure the output in **shunt** (parallel — like a voltmeter, for voltage outputs) or in **series** (like an ammeter, for current outputs)
2. **How do you MIX the feedback with the input?** — You can add the feedback in **series** (adding voltages, for voltage inputs) or in **shunt** (adding currents, for current inputs)

These two choices give you $2 \times 2 = 4$ topologies.

[[visual:four-topologies-matrix]]

## The Sampling Network: Shunt vs Series

### Voltage Sampling (Shunt)

When the output of the amplifier is a **voltage**, you sample it by connecting the feedback network **in parallel** (shunt) with the output. Think of it like using a voltmeter — you connect it *across* the output terminals.

[[visual:voltage-sampling-shunt]]

The feedback network connects directly to the output voltage terminal. One end of the feedback element (say, a resistor $R_f$) goes to the output node, and the other end goes back toward the input.

### Current Sampling (Series)

When the output is a **current**, you sample it by connecting the feedback network **in series** with the output path. Think of it like using an ammeter — you break the current path and insert the feedback element.

[[visual:current-sampling-series]]

The feedback element sits in the output current path. The output current flows *through* the feedback element, and the voltage developed across it becomes the feedback signal.

## The Mixing Network: Series vs Shunt

### Series Mixing (Voltage)

When the input signal is a **voltage** and the feedback signal is also a voltage, they are combined in **series** — the two voltages add (or subtract) using Kirchhoff's Voltage Law.

$$V_i = V_S - V_f$$

The feedback voltage $V_f$ appears in series with the input source. You apply KVL around the input loop to find the net input voltage $V_i$.

[[visual:series-mixing-voltage]]

### Shunt Mixing (Current)

When the input is a **current** and the feedback signal is also a current, they combine in **shunt** (parallel) — the currents subtract using Kirchhoff's Current Law.

$$I_i = I_S - I_f$$

The feedback current $I_f$ is subtracted from the source current at the input node. You apply KCL at the input node.

[[visual:shunt-mixing-current]]

> **Key Pattern**: The input type and the feedback type are always the same — if the input is a voltage, the feedback is a voltage. If the input is a current, the feedback is a current. This must be true because you can only subtract voltages from voltages and currents from currents!

## The Four Feedback Topologies

Now let's put sampling and mixing together to get the four topologies. Each one is matched to a specific amplifier type:

### Topology 1: Series-Shunt (Voltage Amplifier)

[[visual:series-shunt-topology]]

| Property | Value |
|---|---|
| **Input signal** | Voltage |
| **Output signal** | Voltage |
| **Mixing** | Series (voltages add in series via KVL) |
| **Sampling** | Shunt (voltage measured in parallel) |
| **Amplifier type** | Voltage amplifier |
| **Gain** | $A_V = V_o / V_i$ |
| **Closed-loop gain** | $A_{Vf} = \frac{A_V}{1 + \beta A_V}$ |
| **$\beta$ definition** | $\beta = V_f / V_o$ (dimensionless) |
| **Input impedance** | $R_{if} = R_i \times (1 + \beta A_V)$ — **increases** |
| **Output impedance** | $R_{of} = \frac{R_o}{1 + \beta A_V}$ — **decreases** |

This is the most common topology. A voltage amplifier needs **high input impedance** (so it doesn't load the source) and **low output impedance** (so it can drive any load). Series-shunt feedback delivers exactly that!

**Equivalent circuit**: The input side uses a Thévenin model (voltage source + series resistance), and the output side also uses a Thévenin model.

<details>
<summary><strong>Pause & Think</strong>: Why does series mixing increase input impedance?</summary>

When you connect the feedback voltage $V_f$ in series with the input, the source has to provide the voltage $V_S = V_i + V_f$. Since the amplifier still draws the same current $I_i$, but the source is now providing a larger voltage ($V_S > V_i$), the apparent impedance seen by the source is $V_S / I_i = (V_i + V_f)/I_i > V_i/I_i = R_i$. So the source "sees" a higher impedance.

</details>

### Topology 2: Series-Series (Transconductance Amplifier)

[[visual:series-series-topology]]

| Property | Value |
|---|---|
| **Input signal** | Voltage |
| **Output signal** | Current |
| **Mixing** | Series (voltages add in series) |
| **Sampling** | Series (current measured in series) |
| **Amplifier type** | Transconductance amplifier |
| **Gain** | $G_M = I_o / V_i$ |
| **Closed-loop gain** | $G_{Mf} = \frac{G_M}{1 + \beta G_M}$ |
| **$\beta$ definition** | $\beta = V_f / I_o$ (units: Ohms) |
| **Input impedance** | $R_{if} = R_i \times (1 + \beta G_M)$ — **increases** |
| **Output impedance** | $R_{of} = R_o \times (1 + \beta G_M)$ — **increases** |

Both impedances increase! This makes sense because:
- Series mixing (voltage input) → high $R_i$ (good for voltage input)
- Series sampling (current output) → high $R_o$ (good for current output — you want the internal source to have high impedance so all current goes to the load)

### Topology 3: Shunt-Shunt (Transresistance Amplifier)

[[visual:shunt-shunt-topology]]

| Property | Value |
|---|---|
| **Input signal** | Current |
| **Output signal** | Voltage |
| **Mixing** | Shunt (currents add in parallel via KCL) |
| **Sampling** | Shunt (voltage measured in parallel) |
| **Amplifier type** | Transresistance amplifier |
| **Gain** | $R_M = V_o / I_i$ |
| **Closed-loop gain** | $R_{Mf} = \frac{R_M}{1 + \beta R_M}$ |
| **$\beta$ definition** | $\beta = I_f / V_o$ (units: Siemens) |
| **Input impedance** | $R_{if} = \frac{R_i}{1 + \beta R_M}$ — **decreases** |
| **Output impedance** | $R_{of} = \frac{R_o}{1 + \beta R_M}$ — **decreases** |

Both impedances decrease! This is because:
- Shunt mixing (current input) → low $R_i$ (good for current input — you want all current to flow in)
- Shunt sampling (voltage output) → low $R_o$ (good for voltage output)

### Topology 4: Shunt-Series (Current Amplifier)

[[visual:shunt-series-topology]]

| Property | Value |
|---|---|
| **Input signal** | Current |
| **Output signal** | Current |
| **Mixing** | Shunt (currents add in parallel) |
| **Sampling** | Series (current measured in series) |
| **Amplifier type** | Current amplifier |
| **Gain** | $A_I = I_o / I_i$ |
| **Closed-loop gain** | $A_{If} = \frac{A_I}{1 + \beta A_I}$ |
| **$\beta$ definition** | $\beta = I_f / I_o$ (dimensionless) |
| **Input impedance** | $R_{if} = \frac{R_i}{1 + \beta A_I}$ — **decreases** |
| **Output impedance** | $R_{of} = R_o \times (1 + \beta A_I)$ — **increases** |

This is the dual of the voltage amplifier: low $R_i$ (absorb current) and high $R_o$ (push current to load) — exactly what a current amplifier needs.

## The Master Summary Table

[[visual:master-topology-table]]

| | **Voltage Amp** | **Transconductance** | **Transresistance** | **Current Amp** |
|---|---|---|---|---|
| **Topology** | Series-Shunt | Series-Series | Shunt-Shunt | Shunt-Series |
| **Input** | Voltage | Voltage | Current | Current |
| **Output** | Voltage | Current | Voltage | Current |
| **Mixing** | Series | Series | Shunt | Shunt |
| **Sampling** | Shunt | Series | Shunt | Series |
| **$R_{if}$** | $R_i \times D$ ↑ | $R_i \times D$ ↑ | $R_i / D$ ↓ | $R_i / D$ ↓ |
| **$R_{of}$** | $R_o / D$ ↓ | $R_o \times D$ ↑ | $R_o / D$ ↓ | $R_o \times D$ ↑ |
| **$\beta$ units** | — | Ω | S | — |
| **Source model** | Thévenin | Thévenin | Norton | Norton |

Where $D = 1 + \beta A$ (the desensitivity factor, using the appropriate gain $A$ for each type).

## How to Identify the Topology in a Circuit

Here's the step-by-step algorithm your professor taught for identifying the topology when you see a feedback circuit:

### Step 1: Identify the feedback network element

Look for the component (usually a resistor) that connects the output side to the input side. This is your feedback element $R_f$.

### Step 2: Determine the output type (Sampling)

**At the output side**: Is one end of the feedback element connected **directly to the output terminal**?
- **Yes** → The output is a **voltage** (shunt sampling) — you are measuring voltage in parallel
- **No** → The output is a **current** (series sampling) — the feedback element is in the current path

### Step 3: Determine the input type (Mixing)

**At the input side**: Is the other end of the feedback element connected **directly to the input terminal** (e.g., directly to the base)?
- **Yes** → The input is a **current** (shunt mixing) — you are adding currents at a node via KCL
- **No** → The input is a **voltage** (series mixing) — you are adding voltages in a loop via KVL

### Step 4: Name the topology

Combine your answers: the mixing type comes first, then the sampling type.
- Series mixing + Shunt sampling = **Series-Shunt** (Voltage amplifier)
- Series mixing + Series sampling = **Series-Series** (Transconductance amplifier)
- Shunt mixing + Shunt sampling = **Shunt-Shunt** (Transresistance amplifier)
- Shunt mixing + Series sampling = **Shunt-Series** (Current amplifier)

[[visual:topology-identification-flowchart]]

<details>
<summary><strong>Pause & Think</strong>: What if the naming convention confuses you?</summary>

There are actually two naming conventions floating around, which can be confusing:

- **Convention 1** (Mixing-Sampling): Series-Shunt, Series-Series, Shunt-Shunt, Shunt-Series — where the first word is the MIXING type and the second word is the SAMPLING type.
- **Convention 2** (Output type-Mixing type): Voltage-Series, Voltage-Shunt, Current-Series, Current-Shunt — where the first word describes the OUTPUT and the second word describes the MIXING.

For example, a voltage amplifier can be called either "Series-Shunt" (Convention 1) or "Voltage-Series" (Convention 2). They describe the same topology! Just remember which convention is being used.

</details>

### Step 5: Calculate $\beta$

Once you know the topology, you know what $X_f$ and $X_o$ are:

$$\beta = \frac{X_f}{X_o}$$

- For voltage amplifier: $\beta = V_f / V_o$ (use voltage divider in feedback network)
- For transconductance: $\beta = V_f / I_o$ (voltage across feedback element ÷ output current)
- For transresistance: $\beta = I_f / V_o$ (current through feedback path ÷ output voltage)
- For current amplifier: $\beta = I_f / I_o$ (use current divider in feedback network)

## Quick Examples of Topology Identification

### Example 1: Common-Collector (Emitter Follower)

[[visual:emitter-follower-as-feedback]]

In the common-collector circuit, the emitter resistor $R_E$ is the feedback element. The output voltage appears across $R_E$, and this same voltage is fed back in series with the input (it's in the base-emitter loop).

- **Output**: Voltage $V_o$ is taken across $R_E$ → **Shunt sampling** (voltage)
- **Input**: Feedback voltage $V_f$ (across $R_E$) is in series in the input loop → **Series mixing** (voltage)
- **Topology**: **Series-Shunt** — it's a voltage amplifier with feedback!
- **$\beta$**: Since $V_f = V_o$ (the full output voltage appears at the emitter), $\beta = V_f/V_o = 1$

This explains why the emitter follower has near-unity gain ($A_f \approx 1/\beta = 1$), very high input impedance, and very low output impedance.

### Example 2: Shunt-Shunt Feedback (Transresistance)

[[visual:shunt-shunt-example]]

If a resistor $R_f$ is connected directly from the collector (output) to the base (input) of a common-emitter amplifier:

- **Output**: $R_f$ connects directly to the output terminal → **Shunt sampling** (voltage output)
- **Input**: $R_f$ connects directly to the input terminal (base) → **Shunt mixing** (current input)
- **Topology**: **Shunt-Shunt** — transresistance amplifier
- **$\beta$**: $I_f/V_o \approx -1/R_f$ (the feedback current is $V_o/R_f$, with a sign change)

## Summary

- Four topologies match four amplifier types: Series-Shunt, Series-Series, Shunt-Shunt, Shunt-Series
- **Series mixing** = voltage input → input impedance increases
- **Shunt mixing** = current input → input impedance decreases
- **Shunt sampling** = voltage output → output impedance decreases
- **Series sampling** = current output → output impedance increases
- To identify a topology: (1) find the feedback element, (2) check if it connects directly to output (voltage) or not (current), (3) check if it connects directly to input (current) or not (voltage)
- The feedback factor $\beta = X_f / X_o$ with appropriate signal types
- Each topology naturally provides the ideal impedance characteristics for its amplifier type
