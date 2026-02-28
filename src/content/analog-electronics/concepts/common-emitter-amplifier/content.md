# Common-Emitter Amplifier

> **Why This Matters**: The CE configuration is the **most commonly used BJT amplifier** because it has both high voltage gain AND high current gain, giving the highest power gain of any single-transistor configuration. This is the workhorse circuit you'll use in most applications.

## The CE Configuration

[[visual:ce-circuit-schematic]]

In CE, the **emitter is the common terminal** — grounded for both input and output circuits. Input is applied to the base, output is taken from the collector.

Even when there's an emitter resistor $R_E$ with a bypass capacitor $C_E$, at signal frequencies $C_E$ short-circuits $R_E$, making the emitter effectively grounded in the AC equivalent circuit.

## The Q-Point on the Load Line

[[visual:ce-dc-load-line]]

The DC operating point is established by the biasing circuit. The DC load line has slope $-1/R_C$ and intercepts at $(V_{CC}, 0)$ and $(0, V_{CC}/R_C)$.

## Voltage Gain: The Key Formula

[[visual:ce-voltage-gain]]

The voltage gain is approximately:

$$A_V \approx -\frac{R_C}{r_e + R_E}$$

where $r_e$ is the **dynamic emitter resistance** (also called emitter spread resistance), typically about 50-100 Ω. When there is no external emitter resistance (or $R_E$ is bypassed by $C_E$):

$$A_V \approx -\frac{R_C}{r_e}$$

Since $R_C$ could be 10 kΩ and $r_e$ could be 50 Ω, the gain can be as high as **-200**. The negative sign means the output is **inverted**.

[[visual:ce-output-waveform]]

<details>
<summary><strong>Pause & Think</strong>: Why is the output inverted?</summary>

As the input signal increases, $I_B$ increases, $I_C$ increases, and the voltage drop $I_C R_C$ across $R_C$ increases. But $V_{CE} = V_{CC} - I_C R_C$, so when $I_C R_C$ increases, $V_{CE}$ decreases. Positive input → negative output change. That's phase inversion!

</details>

## CE Properties

[[visual:ce-frequency-response]]

| Parameter | Value | Range |
|-----------|-------|-------|
| $R_{in}$ | Moderate | ~1 kΩ |
| $R_{out}$ | Moderate-high | ~10-50 kΩ |
| $A_V$ | High, negative | ~-100 (inverting) |
| $A_I$ | High | ~β ≈ 50-100 |

[[visual:ce-power-gain]]

Because BOTH voltage gain and current gain are large, the power gain $A_P = |A_V| \times A_I$ is very high — on the order of **5000 or more**. This is why CE is the most commonly used configuration.

## Emitter Degeneration

[[visual:ce-emitter-degeneration]]

When $R_E$ is NOT bypassed, the gain reduces to $A_V = -R_C/(r_e + R_E)$, which is lower but more **stable** and **linear** — the emitter resistor provides negative feedback.

## Thermal Stability

[[visual:ce-thermal-stability]]

Without $R_E$: Temperature ↑ → β ↑ → $I_C$ ↑ → power (=$I_C \times V_{CE}$) ↑ → temperature ↑ further. This positive feedback loop is called **thermal runaway** and can destroy the transistor.

With $R_E$: $I_C$ ↑ → $V_E = I_E R_E$ ↑ → $V_{BE} = V_B - V_E$ ↓ → $I_C$ ↓. This **negative feedback** stabilizes the operating point.

## Parameter Summary

[[visual:ce-analysis-summary]]

## Summary

- CE: input at base, output at collector, emitter is common
- $A_V \approx -R_C/r_e$ (inverted), highest power gain
- $R_{in} \approx 1 \text{ kΩ}$ (moderate), $R_{out} \approx R_C$ (moderate-high)
- Current gain $A_I \approx \beta$ ≈ 50-100
- Emitter bypass capacitor restores full gain; without it, $R_E$ reduces gain but improves stability
- Thermal runaway prevented by $R_E$ providing negative feedback
- Most commonly used BJT amplifier configuration
