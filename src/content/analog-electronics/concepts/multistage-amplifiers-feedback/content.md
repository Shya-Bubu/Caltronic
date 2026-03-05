# Multi-Stage Amplifiers and Feedback

> **Why This Matters**: Questions 4, 6 (and parts of Q5) deal with **multi-stage amplifiers** — two or more transistor stages cascaded together. Q6 also introduces **feedback**, where a resistor connects the output of one stage back to the input of another. Understanding inter-stage loading, overall gain calculation, and feedback topology identification is essential for these questions.

## Why Cascade Stages?

A single BJT amplifier has limitations: limited gain, trade-off between Rin vs Av, etc. By cascading stages:

- **Higher overall gain**: $A_{total} = A_{v1} \times A_{v2}$
- **Better impedance matching**: High-Rin first stage, low-Rout last stage
- **Flexibility**: Mix CE (gain) + CC (buffer) + CB (high-frequency)

[[visual:cascade-concept]]

## Inter-Stage Loading

When you cascade two stages, the **output of stage 1 sees the input of stage 2 as its load**. This loading effect reduces the gain of stage 1.

[[visual:interstage-loading]]

### Without Loading (Ideal)
Stage 1 gain: $A_{v1} = -h_{fe1} R_{C1} / h_{ie1}$

### With Loading
Stage 2's input impedance $R_{in2}$ loads stage 1:

$$A_{v1,loaded} = -h_{fe1} (R_{C1} \| R_{in2}) / h_{ie1}$$

Since $R_{C1} \| R_{in2} < R_{C1}$, the loaded gain is **smaller** than the unloaded gain.

<details>
<summary><strong>Pause & Think</strong>: In Q4, stage 1 is CE and stage 2 is CC. The CC has very high Rin. Does this mean stage 2 barely loads stage 1?</summary>

Yes! That's exactly why CC is used as a second stage. With Rin,Q2 ≈ 131 kΩ (as we calculated earlier), and RC1 = 10 kΩ:

$R_{C1} \| R_{in2} = 10k \| 131k = 10k \times 131k / (10k + 131k) = 9.3$ kΩ ≈ 10 kΩ

The loading effect is minimal — only 7% gain reduction. If stage 2 were another CE with Rin ≈ 1 kΩ, the loading would be devastating: $10k \| 1k = 909$ Ω — an 91% reduction in effective load!

</details>

## Overall Gain of Cascaded Stages

### Method 1: Multiply Individual (Loaded) Gains

$$A_v = A_{v1,loaded} \times A_{v2,loaded}$$

This is the easiest method when you have the individual loaded gains.

### Method 2: Analyse from Input to Output

For the overall voltage gain including source and load:

$$A_{vs} = \frac{R_{in1}}{R_{in1} + R_s} \times A_{v1,loaded} \times A_{v2,loaded} \times \frac{R_L}{R_L + R_{out2}}$$

[[visual:overall-gain-cascade]]

### Q4 Example (CE-CC Cascade)

- Stage 1 (CE): Voltage gain with stage 2 as load
- Stage 2 (CC): Av ≈ 1 (emitter follower)
- Overall: $A_v \approx A_{v1} \times 1 = A_{v1}$. The CC stage preserves voltage while providing current gain and low output impedance.

## Overall Input and Output Impedance

$$R_{in,total} = R_{in1} \quad (\text{first stage determines input impedance})$$

$$R_{out,total} = R_{out2} \quad (\text{last stage determines output impedance})$$

For Q4: $R_{in} = R_{in,Q1}$ (CE input) and $R_{out} = R_{out,Q2}$ (CC output, very low).

[[visual:rin-rout-cascade]]

## Q6: Two-Stage CE-CE with Individual Parameters

In Q6, both stages are CE. Each stage is analysed separately:

**Stage 1**: Analyse with $R_{in2}$ of stage 2 as load
**Stage 2**: Analyse with $R_L$ as load

The overall calculations must account for the biasing resistors of each stage, which also load the inter-stage connection.

[[visual:ce-ce-cascade]]

## Feedback Amplifiers (Q6.4)

Q6.4 introduces a **10 kΩ feedback resistor** $R_f$ from the collector of stage 2 to the base of stage 1 (through a capacitor).

### What Is Feedback?

Feedback takes a portion of the **output** and returns it to the **input**. This modifies the amplifier's behaviour:

[[visual:feedback-concept]]

| Type | Effect on Gain | Effect on Rin | Effect on Rout | Stability |
|------|---------------|---------------|----------------|-----------|
| **Negative** | Decreases | May increase or decrease | May increase or decrease | Greatly improved |
| **Positive** | Increases (can cause oscillation) | — | — | Worsened |

### Feedback Topology Identification (Q6.4b)

There are four feedback topologies based on how the signal is **sampled** at the output and **mixed** at the input:

[[visual:feedback-topologies]]

| Topology | Sampling | Mixing | Effect |
|----------|----------|--------|--------|
| **Series-Shunt** (voltage-series) | Voltage | Series | Rin↑, Rout↓ |
| **Shunt-Series** (current-shunt) | Current | Shunt | Rin↓, Rout↑ |
| **Series-Series** (current-series) | Current | Series | Rin↑, Rout↑ |
| **Shunt-Shunt** (voltage-shunt) | Voltage | Shunt | Rin↓, Rout↓ |

For Q6.4: The feedback resistor Rf connects from the **collector** (voltage sampling) of Q2 to the **base** (shunt mixing with the input current) of Q1. This is **Voltage-Shunt (Shunt-Shunt)** feedback.

### Loading Due to Feedback Network (Q6.4c)

Even without feedback active, the feedback resistor **loads** the circuit:
- At the **input**: Rf appears in parallel with the input of stage 1 (loading it)
- At the **output**: Rf appears at the collector of stage 2 (loading it)

The question asks you to draw the circuit **without feedback but with the loading effect** — this means showing Rf connected but treating it as a passive load rather than a feedback element.

[[visual:feedback-loading]]

<details>
<summary><strong>Pause & Think</strong>: Why distinguish between "feedback active" and "loading effect"?</summary>

The feedback has two effects:
1. **Signal feedback**: modifies gain, Rin, Rout (the "feedback" part)
2. **Passive loading**: the resistor itself loads the input and output (even if the amplifier gain were zero)

Separating these lets you analyse each effect independently. Q6.4c asks for the second effect only — the loading.

</details>

## Summary

| Topic | Key Formulas |
|-------|-------------|
| **Cascaded gain** | $A_v = A_{v1} \times A_{v2}$ (use loaded gains) |
| **Loading** | Stage 1 sees $R_{C1} \| R_{in2}$ as effective load |
| **Overall Rin** | = Input impedance of first stage |
| **Overall Rout** | = Output impedance of last stage |
| **Feedback: Shunt-Shunt** | Sampling: voltage at output. Mixing: current at input. Rin↓, Rout↓ |
| **Feedback loading** | Rf appears in parallel at both input and output as passive load |
