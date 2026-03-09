# Deriving the h-Parameter Model

## From Linear Two-Port to h-Parameters

In the previous concept, you saw that under small-signal conditions, the BJT behaves like a linear active two-port device. Now comes the critical question: **what are the four parameters that completely describe this two-port?**

The answer is the **hybrid parameters** (h-parameters), and in this concept, you'll derive them from first principles using partial derivatives.

> **Why This Matters**: The h-parameter model is the standard tool for low-frequency BJT analysis. Understanding where these parameters come from — not just memorising the circuit — lets you derive them for any configuration and adapt when the model needs modification.

[[visual:two-port-h-model]]

## Setting Up: The Dependent Variables

For a common-emitter configuration, we choose:

- **Independent variables**: $I_B$ (input current) and $V_{CE}$ (output voltage)
- **Dependent variables**: $V_{BE}$ (input voltage) and $I_C$ (output current)

So we can write:

$$V_{BE} = f_1(I_B, V_{CE})$$

$$I_C = f_2(I_B, V_{CE})$$

Each of these includes both DC and AC components:

$$I_B = I_{BQ} + i_b, \qquad V_{CE} = V_{CEQ} + v_{ce}$$

The Q-point values ($I_{BQ}$, $V_{CEQ}$) are the operating point around which we linearise.

## Taylor Series Expansion for Two Variables

In the previous concept, we expanded a function of one variable. Now we need the two-variable version. For a function $f(x, y)$ expanded around $(x_0, y_0)$:

$$f(x_0 + \Delta x, \, y_0 + \Delta y) \approx f(x_0, y_0) + \frac{\partial f}{\partial x}\bigg|_{Q} \cdot \Delta x + \frac{\partial f}{\partial y}\bigg|_{Q} \cdot \Delta y$$

where we've dropped the second-order and higher terms (justified by the small-signal assumption).

[[visual:partial-derivative-concept]]

## Deriving the Four h-Parameters

Applying this to $V_{BE} = f_1(I_B, V_{CE})$:

$$V_{BE} = V_{BEQ} + \frac{\partial V_{BE}}{\partial I_B}\bigg|_{V_{CE}=V_{CEQ}} \cdot i_b + \frac{\partial V_{BE}}{\partial V_{CE}}\bigg|_{I_B=I_{BQ}} \cdot v_{ce}$$

The AC part gives us:

$$\boxed{v_{be} = \frac{\partial V_{BE}}{\partial I_B}\bigg|_{Q} \cdot i_b + \frac{\partial V_{BE}}{\partial V_{CE}}\bigg|_{Q} \cdot v_{ce}}$$

Similarly, from $I_C = f_2(I_B, V_{CE})$:

$$\boxed{i_c = \frac{\partial I_C}{\partial I_B}\bigg|_{Q} \cdot i_b + \frac{\partial I_C}{\partial V_{CE}}\bigg|_{Q} \cdot v_{ce}}$$

Comparing with the standard h-parameter equations:

$$v_{be} = h_{ie} \cdot i_b + h_{re} \cdot v_{ce}$$

$$i_c = h_{fe} \cdot i_b + h_{oe} \cdot v_{ce}$$

We can identify each parameter:

[[visual:h-parameter-equations]]

| Parameter | Symbol | Definition | Physical Meaning | Units |
|-----------|--------|-----------|-----------------|-------|
| Input impedance | $h_{ie}$ | $\dfrac{\partial V_{BE}}{\partial I_B}\bigg\|_{V_{CE}}$ | Resistance seen at input with output short-circuited (AC) | Ω |
| Reverse voltage gain | $h_{re}$ | $\dfrac{\partial V_{BE}}{\partial V_{CE}}\bigg\|_{I_B}$ | How much output voltage feeds back to input | dimensionless |
| Forward current gain | $h_{fe}$ | $\dfrac{\partial I_C}{\partial I_B}\bigg\|_{V_{CE}}$ | Current amplification factor (= β) | dimensionless |
| Output conductance | $h_{oe}$ | $\dfrac{\partial I_C}{\partial V_{CE}}\bigg\|_{I_B}$ | Slope of output characteristic | S (siemens) |

<details>
<summary><strong>Pause & Think</strong>: Why are these called "hybrid" parameters?</summary>

Look at the units: $h_{ie}$ has units of ohms, $h_{fe}$ is dimensionless, $h_{re}$ is dimensionless, and $h_{oe}$ has units of siemens. They're a **hybrid** (mixture) of impedance, gain, and admittance — unlike z-parameters (all impedance) or y-parameters (all admittance).

</details>

## The h-Parameter Equivalent Circuit

Each h-parameter maps to a circuit element in the equivalent model:

[[visual:ce-h-parameter-circuit]]

- **$h_{ie}$**: A resistor between base and emitter (input impedance)
- **$h_{re} \cdot v_{ce}$**: A voltage-controlled voltage source at the input (reverse feedback)
- **$h_{fe} \cdot i_b$**: A current-controlled current source at the output (forward gain)
- **$1/h_{oe}$**: A resistor at the output (output resistance)

This is the **complete linear model** of the BJT for small-signal AC analysis. Every AC circuit analysis technique applies: KVL, KCL, superposition, Thévenin/Norton, etc.

[[visual:ce-equivalent-falstad]]

## The "Second Subscript" Convention

The second subscript tells you which BJT configuration the parameters apply to:

| Configuration | Subscript | Input | Output | Common |
|--------------|-----------|-------|--------|--------|
| Common Emitter | e | Base | Collector | Emitter |
| Common Collector | c | Base | Emitter | Collector |
| Common Base | b | Emitter | Collector | Base |

So $h_{ie}$ is the input impedance for common emitter, $h_{ic}$ is the input impedance for common collector, and $h_{ib}$ is the input impedance for common base.

The circuit topology of the model is the **same** for all three configurations — only the terminal labels and parameter values change.

<details>
<summary><strong>Pause & Think</strong>: For the common collector configuration, what are the input and output terminals?</summary>

In common collector: input is the base (same as CE), output is the emitter, and the collector is the common terminal. So $h_{ic}$ is the impedance looking into the base, $h_{fc}$ is the current gain $i_E/i_B$, $h_{rc}$ is the reverse voltage gain (≈ 1, not negligible!), and $h_{oc}$ is the output conductance at the emitter.

</details>

## Why $h_{re}$ Is Usually Neglected

Look at the typical value of $h_{re}$ for a common emitter BJT: about $2.5 \times 10^{-4}$. This means if $V_{CE}$ changes by 10 V, the effect on $V_{BE}$ is only:

$$h_{re} \times 10 = 2.5 \times 10^{-4} \times 10 = 2.5 \text{ mV}$$

This is negligibly small compared to the input voltage. So in practice, we often simplify:

$$v_{be} \approx h_{ie} \cdot i_b$$

by setting $h_{re} = 0$. This removes the controlled voltage source from the input side, greatly simplifying analysis.

> **Watch Out**: For common collector (CC), $h_{rc} \approx 1$ — it is NOT negligible! The simplification $h_r = 0$ only works safely for CE and CB configurations.

[[visual:hre-effect]]

## Connection to the Hybrid-π Model

You may have encountered the hybrid-π model, which uses $r_\pi$ and $g_m$ instead of h-parameters. The connection is straightforward:

$$r_\pi = h_{ie}, \qquad g_m = \frac{h_{fe}}{h_{ie}} = \frac{I_{CQ}}{V_T}$$

The hybrid-π model is essentially the h-parameter model with $h_{re} = 0$ and the output resistance explicitly shown as $r_o = 1/h_{oe}$.

[[visual:hybrid-pi-comparison]]

## Summary

- The h-parameters are derived from a **two-variable Taylor expansion** of $V_{BE}(I_B, V_{CE})$ and $I_C(I_B, V_{CE})$ around the Q-point.
- Each h-parameter is a **partial derivative** evaluated at the operating point.
- The four parameters generate a complete **equivalent circuit**: resistor ($h_{ie}$), VCVS ($h_{re}v_{ce}$), CCCS ($h_{fe}i_b$), and conductance ($h_{oe}$).
- The **second subscript** (e, c, b) denotes the configuration.
- $h_{re}$ is negligibly small for CE and CB (≈ $10^{-4}$) but significant for CC (≈ 1).
