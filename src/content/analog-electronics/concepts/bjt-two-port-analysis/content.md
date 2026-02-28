# BJT Two-Port Network Analysis

> **Why This Matters**: Two-port theory gives you a universal, systematic way to characterize any linear amplifier using just four parameters. Once you have the h-parameters, you can compute gain, impedances, and cascade responses without redrawing the small-signal circuit every time. This theory works for BJTs but is much more general — it applies to any linear active two-port device.

## The Linear Active Two-Port Device

[[visual:two-port-block-diagram]]

A linear active two-port device has:
- **Linear**: input X scaled by A → output also scaled by A (no non-linearities)
- **Active**: externally powered (battery/supply), contains transistors
- **Two ports**: one input port, one output port (the power port isn't counted)

There are four electrical quantities: $V_1$, $I_1$ at port 1 and $V_2$, $I_2$ at port 2 (by convention, currents flow *into* the device).

## Only Two Independent Variables

Here's the key insight from two-port theory: though there are four quantities ($V_1$, $I_1$, $V_2$, $I_2$), only **two are independent**. You can choose any two as independent and express the other two in terms of them.

For BJTs, we choose $I_1$ and $V_2$ as independent, giving us the **h-parameter** (hybrid parameter) equations:

$$V_1 = h_{11} \cdot I_1 + h_{12} \cdot V_2$$
$$I_2 = h_{21} \cdot I_1 + h_{22} \cdot V_2$$

[[visual:h-parameter-model]]

## Why "Hybrid"?

[[visual:ce-h-parameter-equivalent]]

The parameters have **different dimensions** — a mixture:
- $h_{11}$: converts current → voltage → units of **Ohms** (resistance)
- $h_{12}$: converts voltage → voltage → **no units** (scalar)
- $h_{21}$: converts current → current → **no units** (scalar)  
- $h_{22}$: converts voltage → current → units of **Siemens** (conductance)

This mixture of dimensions is why they're called **hybrid** parameters.

## Finding Each Parameter

[[visual:y-parameter-model]]

Each parameter is measured under a specific test condition:

| Parameter | Formula | Condition | Physical Meaning |
|-----------|---------|-----------|-----------------|
| $h_i = h_{11}$ | $V_1/I_1$ | $V_2 = 0$ (output **short**) | Input resistance |
| $h_r = h_{12}$ | $V_1/V_2$ | $I_1 = 0$ (input **open**) | Reverse voltage gain |
| $h_f = h_{21}$ | $I_2/I_1$ | $V_2 = 0$ (output **short**) | Forward current gain |
| $h_o = h_{22}$ | $I_2/V_2$ | $I_1 = 0$ (input **open**) | Output conductance |

<details>
<summary><strong>Pause & Think</strong>: Why is $h_f$ called a "negative" current gain?</summary>

By convention, both $I_1$ and $I_2$ flow *into* the device. For a normal amplifier, the output current flows *out* — in the opposite direction. So $h_f = I_2/I_1$ is actually negative for a proper amplifier! (In practice we often reference the magnitude.)

</details>

## Subscript Convention

[[visual:z-parameter-model]]

Since h-parameters change depending on the BJT configuration, we use a **second subscript** for the common terminal:
- **CE**: $h_{ie}$, $h_{re}$, $h_{fe}$, $h_{oe}$ (e = emitter)
- **CC**: $h_{ic}$, $h_{rc}$, $h_{fc}$, $h_{oc}$ (c = collector)
- **CB**: $h_{ib}$, $h_{rb}$, $h_{fb}$, $h_{ob}$ (b = base)

## The h-Parameter Circuit Model

[[visual:parameter-conversion]]

The equivalent circuit inside the two-port has:
- Input: resistance $h_i$ in series with dependent voltage source $h_r \cdot V_2$
- Output: dependent current source $h_f \cdot I_1$ in parallel with conductance $h_o$ (= $1/R_{out}$)

You can verify: applying KVL to the input loop gives the first equation, and KCL at the output node gives the second equation.

## The Hybrid-Pi Simplification

[[visual:ce-gain-from-h-params]]

For CE configuration, $h_{re} \approx 10^{-4}$ — so small we can **neglect it** (set to zero). This simplifies the four-parameter model to just three:

| h-parameter | Hybrid-π notation | Typical value |
|------------|-------------------|---------------|
| $h_{ie}$ | $r_\pi$ | ~2.5 kΩ |
| $h_{fe}$ | β | ~100 |
| $1/h_{oe}$ | $r_o$ (often neglected) | ~50 kΩ |

The **transconductance** $g_m = h_{fe}/h_{ie} = \beta/r_\pi$, and the **emitter resistance** $r_e = r_\pi/\beta = 1/g_m$.

The simplified voltage gain: $A_V \approx -h_{fe} \cdot R_L / h_{ie} = -g_m \cdot R_L$

[[visual:cb-gain-from-h-params]]

## Practical h-Parameter Values

[[visual:practical-h-param-values]]

When $r_o \gg R_L$ (say $r_o > 10 R_L$), we can neglect $r_o$ entirely — the error is less than 10%, which is acceptable since h-parameter values themselves vary from their nominal values.

## Cascading with Two-Port Parameters

[[visual:two-stage-cascade-analysis]]

For cascading multiple stages, ABCD (transmission) parameters are most convenient because: $\text{ABCD}_{total} = \text{ABCD}_1 \times \text{ABCD}_2$ (simple matrix multiplication).

## Summary

- Two-port theory: 4 quantities, only 2 independent → 4 h-parameters characterize any linear active device
- h-parameters have mixed units (hybrid): $h_i$ (Ω), $h_r$ (unitless), $h_f$ (unitless), $h_o$ (S)
- Measured with specific conditions: output shorted ($V_2=0$) or input open ($I_1=0$)
- Second subscript = common terminal: $h_{ie}$ (CE), $h_{ib}$ (CB), $h_{ic}$ (CC)
- Hybrid-π: simplified model with $h_{re} \approx 0$, giving $r_\pi$, β, $g_m = \beta/r_\pi$
- $r_o$ often negligible when $r_o \gg R_L$ (>10×)
