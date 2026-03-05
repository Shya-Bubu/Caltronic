# The h-Parameter Two-Port Model

> **Why This Matters**: Once you've found the DC Q-point, the next question is: *how does the circuit respond to small AC signals?* The h-parameter model is the mathematical tool that replaces the BJT with a linear circuit — two controlled sources and two impedances — that you can analyse using standard circuit theory. Questions 2-6 all require you to draw and use h-parameter equivalent circuits. This is the single most important concept for the tutorial.

## From Nonlinear to Linear: The Small-Signal Idea

A BJT is inherently **nonlinear** — the relationship between $I_C$ and $V_{BE}$ is exponential ($I_C = I_S e^{V_{BE}/V_T}$). But if the AC signal is **small** compared to the DC bias, the transistor operates on a nearly **linear** portion of its characteristic curve.

[[visual:small-signal-linearisation]]

Think of zooming into a curve: up close, any smooth curve looks like a straight line. The h-parameters describe the **slope** of that line — the local linear behaviour around the Q-point.

## The Two-Port Network

The BJT is modelled as a **two-port network**: the input port (base-emitter) and the output port (collector-emitter).

[[visual:two-port-concept]]

The h-parameter equations relate the port variables:

$$v_1 = h_i \cdot i_1 + h_r \cdot v_2$$

$$i_2 = h_f \cdot i_1 + h_o \cdot v_2$$

Where:
- $v_1, i_1$ = input voltage and current (base-emitter)
- $v_2, i_2$ = output voltage and current (collector-emitter)

## The Four h-Parameters

Each parameter has a physical meaning:

[[visual:h-parameter-definitions]]

| Parameter | Symbol | Definition | What It Represents | Unit |
|-----------|--------|------------|-------------------|------|
| Input impedance | $h_i = h_{ie}$ | $v_1/i_1\|_{v_2=0}$ | Resistance looking into the base (with output shorted for AC) | Ω |
| Reverse voltage ratio | $h_r = h_{re}$ | $v_1/v_2\|_{i_1=0}$ | How much output voltage feeds back to input | dimensionless |
| Forward current gain | $h_f = h_{fe}$ | $i_2/i_1\|_{v_2=0}$ | AC current gain (β for small signals) | dimensionless |
| Output admittance | $h_o = h_{oe}$ | $i_2/v_2\|_{i_1=0}$ | Conductance looking into the collector | Ω⁻¹ (mho or siemens) |

The subscript "e" in $h_{ie}$, $h_{re}$, $h_{fe}$, $h_{oe}$ indicates **Common-Emitter** configuration.

<details>
<summary><strong>Pause & Think</strong>: In Q5, hoe = 0.1 mΩ⁻¹. What resistance does this represent?</summary>

$1/h_{oe} = 1/(0.1 \times 10^{-3}) = 10,000$ Ω = 10 kΩ

This is the output resistance of the transistor (looking into the collector). It's in parallel with RC in the AC equivalent circuit. Since RC is typically a few kΩ, hoe has a noticeable effect on the output resistance and gain.

</details>

## The Full h-Parameter Equivalent Circuit

The two equations translate directly into a circuit:

[[visual:full-h-param-circuit]]

- **Input side**: $h_{ie}$ (resistor) in series with $h_{re} v_2$ (voltage-controlled voltage source)
- **Output side**: $h_{fe} i_1$ (current-controlled current source) in parallel with $1/h_{oe}$ (resistor)

## The Simplified Model

For most practical BJT circuits, two simplifications are valid:

1. **$h_{re} \approx 0$** (typically $10^{-4}$): The reverse feedback is negligible — output voltage barely affects input
2. **$h_{oe} \approx 0$** (or $1/h_{oe} \gg R_C$): The output resistance is so large it can be ignored

[[visual:simplified-h-param-circuit]]

The simplified model has only:
- $h_{ie}$: input resistance (typically 1-2 kΩ)
- $h_{fe}$: forward current gain (the small-signal β)

This gives:
- **Input**: $v_1 = h_{ie} \cdot i_1$ (pure resistor)
- **Output**: $i_2 = h_{fe} \cdot i_1$ (pure current source)

> **When to use simplified vs full model**: The tutorial questions tell you explicitly. Q2 and Q3 say "simplified h-parameter model". Q4, Q5, and Q6 give you all four parameters — you may need to decide. Generally: if $h_{re}$ and $h_{oe}$ are given explicitly, include them unless told otherwise.

<details>
<summary><strong>Pause & Think</strong>: Q4 gives hre = 2.5×10⁻⁴ and hoe = 1/(40kΩ). Are these small enough to ignore?</summary>

$h_{re} = 2.5 \times 10^{-4}$ — very small, often negligible.
$1/h_{oe} = 40$ kΩ — need to compare with RC. In Q4, RC1 = 10 kΩ. So $1/h_{oe} = 40$ kΩ is 4× RC, which is not negligible! Including $h_{oe}$ will change the gain by about 20%.

The rule: if $1/h_{oe} > 10 \times R_C$, ignore it. If comparable, include it.

</details>

## CE vs CC vs CB Parameter Sets

Different BJT configurations use different h-parameter subscripts:

[[visual:ce-cc-cb-params]]

| Configuration | Subscript | Input | Output | Used In |
|--------------|-----------|-------|--------|---------|
| **Common-Emitter (CE)** | e: $h_{ie}, h_{re}, h_{fe}, h_{oe}$ | Base | Collector | Q2, Q3, Q5, Q6 (stage 1) |
| **Common-Collector (CC)** | c: $h_{ic}, h_{rc}, h_{fc}, h_{oc}$ | Base | Emitter | Q4 (stage 2) |
| **Common-Base (CB)** | b: $h_{ib}, h_{rb}, h_{fb}, h_{ob}$ | Emitter | Collector | Q2 (CB amplifier) |

### Conversion Between Sets

For the CE model: $h_{fe}$ is the AC β (positive, ~50-200).

For the CC model: $h_{fc} = -(1 + h_{fe})$ (negative, ~−51 to −201). From Q4: $h_{fc} = -51$ when $h_{fe} = 50$.

The relationship: $h_{fc} = -(1 + h_{fe})$ — this is exact.

[[visual:parameter-conversion]]

<details>
<summary><strong>Pause & Think</strong>: In Q4, Q1 uses CE parameters (hfe=50) and Q2 uses CC parameters (hfc=−51). Why is hfc negative?</summary>

In the common-collector (emitter follower) configuration, the output current convention is different. The current gain $h_{fc} = -(1 + h_{fe})$ is negative because the output current $i_2$ flows in the opposite direction to the convention. The magnitude is $|h_{fc}| = 1 + h_{fe} = 51$, which is the actual current gain.

The negative sign is a convention issue, not a physics issue. When calculating actual gains, you handle the sign carefully.

</details>

## Reading h-Parameters from Output Characteristics

Q3 asks you to find $h_{fe}$ and $h_{oe}$ from the output characteristic curves (Figure 3b).

[[visual:reading-h-from-curves]]

### Finding $h_{fe}$

$$h_{fe} = \frac{\Delta I_C}{\Delta I_B}\bigg|_{V_{CE} = \text{const}}$$

At the Q-point on Figure 3(b), read two $I_C$ values at adjacent $I_B$ curves while keeping $V_{CE}$ constant.

### Finding $h_{oe}$

$$h_{oe} = \frac{\Delta I_C}{\Delta V_{CE}}\bigg|_{I_B = \text{const}}$$

Along a single $I_B$ curve, measure how $I_C$ changes as $V_{CE}$ changes. The slope of the output characteristic at the Q-point is $h_{oe}$.

## Summary

- **h-parameters** describe the BJT's small-signal (AC) behaviour as a linear two-port
- **Four parameters**: $h_i$ (input R), $h_r$ (reverse feedback), $h_f$ (current gain), $h_o$ (output G)
- **Simplified model** (most common): ignore $h_r$ and $h_o$ → just $h_{ie}$ and $h_{fe}$
- **CE/CC/CB** have different parameter sets — check the subscript letter
- $h_{fe}$ (CE) = AC β. $h_{fc}$ (CC) = $-(1+h_{fe})$
- **From graphs**: $h_{fe} = \Delta I_C / \Delta I_B$ at constant $V_{CE}$; $h_{oe} = \Delta I_C / \Delta V_{CE}$ at constant $I_B$

> With h-parameters understood, the next concept teaches you **how to draw the complete AC small-signal equivalent circuit** — replacing every component (transistor, resistors, capacitors) with its AC equivalent.
