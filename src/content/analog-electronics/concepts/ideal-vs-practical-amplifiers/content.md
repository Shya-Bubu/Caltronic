# Ideal vs Practical Amplifiers

> **Why This Matters**: No real amplifier is ideal. Understanding the gap between the ideal three-parameter model and real circuits — loading effects, saturation limits, impedance mismatches — is what separates textbook analysis from actual circuit design.

## Loading at the Input

[[visual:ideal-voltage-transfer]]

When you connect a source with internal impedance $R_S$ to an amplifier with finite input impedance $R_{in}$, you get a **potential divider**:

$$V_{in} = V_S \cdot \frac{R_{in}}{R_{in} + R_S}$$

If $R_{in} = R_S$, you lose **half** the signal! This is why voltage amplifiers need $R_{in} \gg R_S$.

[[visual:rin-vs-signal-loss]]

## Loading at the Output

[[visual:rout-vs-output-loss]]

Similarly, the output forms a divider between $R_{out}$ and $R_L$:

$$V_{out} = A_V \cdot V_{in} \cdot \frac{R_L}{R_L + R_{out}}$$

The **complete gain formula** including all loading effects is:

$$A_{total} = A_V \cdot \frac{R_{in}}{R_{in} + R_S} \cdot \frac{R_L}{R_L + R_{out}}$$

<details>
<summary><strong>Pause & Think</strong>: An amplifier has $R_{in} = 10 \text{ kΩ}$, $R_S = 1 \text{ kΩ}$, $A_V = 100$, $R_{out} = 2 \text{ kΩ}$, $R_L = 8 \text{ kΩ}$. What is the actual gain?</summary>

$A_{total} = 100 \times \frac{10}{10+1} \times \frac{8}{8+2} = 100 \times 0.909 \times 0.8 = 72.7$

You lose about 27% of the gain due to loading! This is why impedance matching matters.

</details>

## Saturation and Clipping

[[visual:practical-saturation]]

Every real amplifier has **supply rails** ($\pm V_{CC}$). When the output tries to exceed these limits, it **clips**. The usable linear range is $|V_{in}| < V_{CC}/|A_V|$.

## Practical Values by Technology

[[visual:practical-rin-values]]

[[visual:practical-rout-values]]

| Technology | Typical $R_{in}$ | Typical $R_{out}$ |
|-----------|-----------------|-------------------|
| BJT (CE) | ~1 kΩ | ~50 kΩ |
| BJT (CC) | ~100 kΩ | ~100 Ω |
| MOSFET | ~MΩ range | ~10 kΩ |
| Op-amp (FET input) | ~10¹² Ω | ~75 Ω |

The key difference: MOSFETs have the insulated gate oxide layer, so gate current is essentially zero → very high $R_{in}$ in the MΩ range. BJTs have a forward-biased base-emitter junction → moderate $R_{in}$.

## Gain-Bandwidth Tradeoff

[[visual:gain-bandwidth-tradeoff]]

## Impedance Requirements by Amplifier Type

[[visual:input-output-impedance-map]]

[[visual:efficiency-vs-linearity]]

## Summary

- Real amplifiers have loading effects: input divider ($R_{in}$ vs $R_S$) and output divider ($R_{out}$ vs $R_L$)
- Complete gain: $A_{total} = A_V \cdot [R_{in}/(R_{in}+R_S)] \cdot [R_L/(R_L+R_{out})]$
- Saturation limits the output to $\pm V_{CC}$
- MOSFETs have much higher $R_{in}$ than BJTs due to insulated gate
- Each amplifier type has specific $R_{in}$/$R_{out}$ requirements
