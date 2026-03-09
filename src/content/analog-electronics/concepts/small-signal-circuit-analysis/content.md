# Small-Signal Circuit Analysis Using h-Parameters

## The Four Key Quantities

You now have the h-parameter model. The next question is: what can you *do* with it? The answer is: **find everything an engineer needs to know about an amplifier.** Specifically, you'll derive general formulas for four quantities:

1. **Current gain** $A_I = -I_2/I_1$
2. **Input impedance** $Z_{in} = V_1/I_1$
3. **Voltage gain** $A_V = V_2/V_1$
4. **Output admittance** $Y_{out} = I_2/V_2$ (with source shorted)

These formulas work for **any configuration** (CE, CB, CC) — just plug in the appropriate h-parameter values.

> **Why This Matters**: These four quantities completely describe the amplifier's behaviour. Once you know them, you can predict how the amplifier will interact with any source and any load.

[[visual:amplifier-block-diagram]]

## The General Analysis Circuit

Consider the BJT replaced by its h-parameter model, with a source (Thévenin equivalent: $V_S$, $R_S$) at the input and a load impedance $Z_L$ at the output.

[[visual:general-h-param-circuit]]

The h-parameter equations are:

$$V_1 = h_i \cdot I_1 + h_r \cdot V_2$$

$$I_2 = h_f \cdot I_1 + h_o \cdot V_2$$

Note: we drop the second subscript to keep the derivation general.

## Current Gain $A_I$

**Definition:** $A_I = I_L / I_1 = -I_2 / I_1$

The negative sign comes from the convention: load current $I_L$ flows opposite to the defined $I_2$ direction.

Apply KCL at the output node:

$$I_2 = h_f \cdot I_1 + h_o \cdot V_2$$

Since $V_2 = -I_2 \cdot Z_L$ (load voltage):

$$I_2 = h_f \cdot I_1 + h_o \cdot (-I_2 Z_L)$$

$$I_2(1 + h_o Z_L) = h_f \cdot I_1$$

$$\boxed{A_I = -\frac{I_2}{I_1} = \frac{-h_f}{1 + h_o Z_L}}$$

<details>
<summary><strong>Pause & Think</strong>: If h_o = 0 (ideal output), what does A_I reduce to?</summary>

$A_I = -h_f$. For CE, this means $A_I = -h_{fe} = -\beta$. The current gain is simply beta — the full current amplification with no loss due to output conductance. The non-zero $h_o$ reduces the gain because some current flows through $1/h_o$ instead of through the load.

</details>

[[visual:current-gain-derivation]]

## Input Impedance $Z_{in}$

**Definition:** $Z_{in} = V_1 / I_1$

From the first h-parameter equation:

$$V_1 = h_i \cdot I_1 + h_r \cdot V_2$$

We need to eliminate $V_2$. We know $V_2 = -I_2 Z_L = A_I \cdot I_1 \cdot Z_L$, so:

$$V_1 = h_i \cdot I_1 + h_r \cdot A_I \cdot I_1 \cdot Z_L$$

$$\boxed{Z_{in} = h_i + h_r \cdot A_I \cdot Z_L = h_i + \frac{h_r \cdot h_f \cdot Z_L}{1 + h_o \cdot Z_L}}$$

> **Key Insight**: The input impedance depends on the load! An open-circuit load ($Z_L = \infty$) gives a different $Z_{in}$ than a short-circuit load ($Z_L = 0$). This is a fundamental characteristic of feedback systems.

If $h_r \approx 0$ (true for CE and CB), then $Z_{in} \approx h_i$. This is why the simplified model works so well — the feedback term vanishes.

[[visual:input-impedance-formula]]

## Voltage Gain $A_V$

**Definition:** $A_V = V_2 / V_1$

We already know $V_2 = A_I \cdot I_1 \cdot Z_L$ and $V_1 = Z_{in} \cdot I_1$. Dividing:

$$\boxed{A_V = \frac{V_2}{V_1} = \frac{A_I \cdot Z_L}{Z_{in}}}$$

This elegant result says: **voltage gain = current gain × load impedance ÷ input impedance**.

### Voltage Gain Including Source Resistance

When the source has resistance $R_S$, a voltage divider forms:

$$V_1 = V_S \cdot \frac{Z_{in}}{R_S + Z_{in}}$$

$$\boxed{A_{VS} = \frac{V_2}{V_S} = A_V \cdot \frac{Z_{in}}{R_S + Z_{in}} = \frac{A_I \cdot Z_L}{R_S + Z_{in}}}$$

> **Watch Out**: If $R_S \approx Z_{in}$, then $A_{VS} \approx A_V / 2$. Half the source voltage drops across $R_S$! This is why we want high input impedance — it minimises the loading effect.

[[visual:source-resistance-effect]]

## Output Admittance $Y_{out}$

**Definition:** $Y_{out} = I_2 / V_2$ with **$V_S = 0$** (source shorted) and **no load** ($Z_L = \infty$).

From the second h-parameter equation with $V_S = 0$:

$$I_2 = h_f \cdot I_1 + h_o \cdot V_2$$

With the source shorted, KVL on the input gives:

$$R_S \cdot I_1 + h_i \cdot I_1 + h_r \cdot V_2 = 0$$

$$I_1 = \frac{-h_r \cdot V_2}{h_i + R_S}$$

Substituting:

$$\boxed{Y_{out} = h_o - \frac{h_f \cdot h_r}{h_i + R_S}}$$

The output impedance is $Z_{out} = 1/Y_{out}$.

> **Key Insight**: The output impedance also depends on the source — specifically on $R_S$. A higher source resistance actually *increases* $Z_{out}$ (makes the output more like a current source). This is the dual of the input impedance depending on the load.

[[visual:output-impedance-formula]]

## Summary Table of Results

[[visual:four-quantities-summary]]

| Quantity | Formula | Simplified ($h_r \approx 0$) |
|----------|---------|------------------------------|
| $A_I$ | $\dfrac{-h_f}{1 + h_o Z_L}$ | $-h_f$ |
| $Z_{in}$ | $h_i + \dfrac{h_r h_f Z_L}{1 + h_o Z_L}$ | $h_i$ |
| $A_V$ | $\dfrac{A_I Z_L}{Z_{in}}$ | $\dfrac{-h_f Z_L}{h_i}$ |
| $Y_{out}$ | $h_o - \dfrac{h_f h_r}{h_i + R_S}$ | $h_o$ |

> **Pro Tip**: Don't memorise these formulas! The lecturer explicitly said: "You will never have to remember any of these. You will have to derive your own expressions." In exams, derive from KVL/KCL — it's safer and the examiner can see your reasoning.

<details>
<summary><strong>Pause & Think</strong>: For the simplified model (h_r = 0), does Z_in depend on the load?</summary>

No! When $h_r = 0$, $Z_{in} = h_i$, which is independent of $Z_L$. This is because the feedback path (the $h_r \cdot V_2$ source) is what connects the output to the input. With no feedback, the input impedance is purely determined by the BJT's own input resistance.

</details>

## Summary

- **Current gain** depends on $h_f$, $h_o$, and the load $Z_L$
- **Input impedance** depends on all four h-parameters and the load (when $h_r \neq 0$)
- **Voltage gain** = current gain × impedance ratio
- **Output admittance** depends on $h_o$, $h_f$, $h_r$, $h_i$, and the source resistance $R_S$
- When $h_r \approx 0$: all formulas simplify dramatically
- **Never memorise** — always derive from the circuit using KVL/KCL
