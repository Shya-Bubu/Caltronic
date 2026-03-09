# Extracting h-Parameters from BJT Characteristics

## From Graphs to Numbers

In the previous concept, you derived the h-parameters as partial derivatives. But how do you actually *get* their numerical values? There are two ways: the manufacturer's datasheet gives them directly, or you can extract them yourself from the transistor's **input and output characteristic curves**.

This second method is what exams test, and it's what this concept teaches you.

> **Why This Matters**: In the lab (and on exams), you'll be given characteristic curves and asked to find h-parameters. This is a graphical skill where you read slopes and spacings from curves — a very different skill from the mathematical derivation.

## Output Characteristics → $h_{fe}$ and $h_{oe}$

The output characteristics show $I_C$ versus $V_{CE}$ with $I_B$ as a parameter. You've seen these curves before — a family of nearly-flat lines, one for each $I_B$ value.

[[visual:output-characteristics]]

### Finding $h_{fe}$ (Forward Current Gain)

$h_{fe}$ is defined as:

$$h_{fe} = \frac{\partial I_C}{\partial I_B}\bigg|_{V_{CE} = V_{CEQ}} \approx \frac{\Delta I_C}{\Delta I_B}\bigg|_{V_{CE} = V_{CEQ}}$$

On the output characteristics, this means:

1. Draw a vertical line at $V_{CE} = V_{CEQ}$
2. Read the $I_C$ values where two adjacent $I_B$ curves cross this line
3. Compute the ratio $\Delta I_C / \Delta I_B$

This is the **current gain** — the ratio of changes in output current to changes in input current, measured at constant output voltage.

> **Key Insight**: If the output curves were perfectly parallel and evenly spaced, $h_{fe}$ would be the same everywhere. In practice, the spacing changes, so $h_{fe}$ depends on the Q-point.

[[visual:hfe-extraction]]

### Finding $h_{oe}$ (Output Conductance)

$h_{oe}$ is defined as:

$$h_{oe} = \frac{\partial I_C}{\partial V_{CE}}\bigg|_{I_B = I_{BQ}} \approx \frac{\Delta I_C}{\Delta V_{CE}}\bigg|_{I_B = I_{BQ}}$$

On the output characteristics, this is the **slope of a single curve** at the Q-point:

1. Identify the $I_B = I_{BQ}$ curve
2. Measure the slope at the Q-point: $\Delta I_C / \Delta V_{CE}$

If the curves were perfectly horizontal (constant $I_C$), the slope would be zero and $h_{oe} = 0$, meaning infinite output resistance. In practice, there's a slight upward slope, giving a finite output conductance.

[[visual:hoe-extraction]]

<details>
<summary><strong>Pause & Think</strong>: If $h_{oe} = 25$ μA/V, what is the output resistance?</summary>

$R_{out} = 1/h_{oe} = 1/(25 \times 10^{-6}) = 40$ kΩ. This is the resistance the collector presents to the external circuit — relatively high, which is desirable for a current source.

</details>

## Input Characteristics → $h_{ie}$ and $h_{re}$

The input characteristics show $V_{BE}$ versus $I_B$ with $V_{CE}$ as a parameter. These look like diode curves — exponential shapes that are almost (but not quite) independent of $V_{CE}$.

[[visual:input-characteristics]]

### Finding $h_{ie}$ (Input Impedance)

$h_{ie}$ is the slope of the input characteristic at the Q-point, measured on a specific $V_{CE}$ curve:

$$h_{ie} = \frac{\partial V_{BE}}{\partial I_B}\bigg|_{V_{CE} = V_{CEQ}} \approx \frac{\Delta V_{BE}}{\Delta I_B}\bigg|_{V_{CE} = V_{CEQ}}$$

1. Identify the curve for $V_{CE} = V_{CEQ}$
2. Measure $\Delta V_{BE} / \Delta I_B$ at the Q-point

This gives the **input resistance** — typically around 1 kΩ for common emitter.

[[visual:hie-extraction]]

### Finding $h_{re}$ (Reverse Voltage Gain)

$h_{re}$ measures how much $V_{BE}$ changes when $V_{CE}$ changes at constant $I_B$:

$$h_{re} = \frac{\partial V_{BE}}{\partial V_{CE}}\bigg|_{I_B = I_{BQ}} \approx \frac{\Delta V_{BE}}{\Delta V_{CE}}\bigg|_{I_B = I_{BQ}}$$

On the input characteristics:

1. Draw a horizontal line at $I_B = I_{BQ}$
2. Read the $V_{BE}$ values where this line crosses two different $V_{CE}$ curves
3. Compute $\Delta V_{BE} / \Delta V_{CE}$

This is almost always very small (≈ $10^{-4}$) because the input characteristic curves are nearly identical for different $V_{CE}$ values.

[[visual:hre-extraction]]

## Typical h-Parameter Values

Here is a comparison of typical values across all three configurations:

[[visual:h-param-comparison-table]]

| Parameter | CE | CC | CB | Units |
|-----------|-----|-----|-----|-------|
| $h_i$ | 1.1 kΩ | 1.1 kΩ | 22 Ω | Ω |
| $h_r$ | 2.5 × 10⁻⁴ | ≈ 1 | 2.9 × 10⁻⁴ | — |
| $h_f$ | 50 | −51 | −0.98 | — |
| $h_o$ | 25 μA/V | 25 μA/V | 0.49 μA/V | S |

Notice the patterns:
- **CE and CC have similar input impedance** (≈ 1 kΩ), but **CB has much lower** (≈ 22 Ω)
- **CB has much higher output resistance** ($1/h_{ob} \approx 2$ MΩ) — excellent for current sources
- **CC has $h_{rc} \approx 1$** — the feedback is strong, which is why CC acts as a voltage follower
- **CB has $h_{fb} \approx -1$** — current gain is nearly unity (it's a current buffer)

## How Parameters Change with Q-Point

A crucial point that the lecture emphasises: **h-parameters are NOT truly constant**. They change as you move the Q-point because:

1. **The curves aren't straight** — the slope at one point differs from another
2. **The curves aren't parallel** — spacings between curves change
3. **Temperature matters** — $h_{fe}$ in particular increases with temperature

This is why we say the parameters are **approximately constant within a small range** around the Q-point. The larger your signal, the more the parameters drift, and the worse the linear model becomes.

[[visual:q-point-variation]]

<details>
<summary><strong>Pause & Think</strong>: If you increase the Q-point collector current from 1 mA to 5 mA, would you expect h_ie to increase or decrease?</summary>

$h_{ie}$ would **decrease**. Higher $I_{CQ}$ means the slope of the input curve at the Q-point is steeper (the exponential curve becomes more vertical), so $\Delta V_{BE}/\Delta I_B$ gets smaller. Quantitatively, $h_{ie} \approx r_\pi = \beta V_T / I_{CQ}$, which is inversely proportional to $I_{CQ}$.

</details>

## Summary

- $h_{fe}$ and $h_{oe}$ come from the **output characteristics** ($I_C$ vs $V_{CE}$)
- $h_{ie}$ and $h_{re}$ come from the **input characteristics** ($V_{BE}$ vs $I_B$)
- Each parameter is a **slope or spacing** read from the curves at the Q-point
- Parameters vary with Q-point and temperature — they're only constant for small signals near a fixed operating point
