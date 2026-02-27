# Common-Emitter Amplifier

> **Why This Matters**: The CE configuration is the **workhorse** of analog electronics. It's the most commonly used BJT amplifier because it provides high voltage gain, high current gain, and the highest power gain of any single-transistor configuration.

## The CE Circuit

[[visual:ce-circuit-schematic]]

[[visual:ce-dc-load-line]]

The CE amplifier has the input applied to the base and the output taken from the collector. The emitter is the common terminal (shared between input and output circuits).

## Voltage Gain

[[visual:ce-voltage-gain]]

The voltage gain is: $A_V = -g_m \cdot R_C$, where $g_m = I_C/V_T$ is the transconductance. The negative sign means the CE **inverts** the signal.

[[visual:ce-output-waveform]]

<details>
<summary><strong>Pause & Think</strong>: Why is the output inverted?</summary>

When $V_{BE}$ increases, $I_C$ increases, which increases the voltage drop across $R_C$. Since $V_{CE} = V_{CC} - I_C R_C$, a larger $I_C$ causes a *decrease* in $V_{CE}$. So positive input → negative output.

</details>

## Input and Output Impedance

[[visual:ce-input-impedance]]

The input impedance is: $R_{in} = r_\pi \| R_1 \| R_2$, where $r_\pi = \beta/g_m$. The output impedance is approximately $R_{out} \approx R_C$.

## Frequency Response and Power

[[visual:ce-frequency-response]]

[[visual:ce-power-gain]]

## Emitter Degeneration

[[visual:ce-emitter-degeneration]]

[[visual:ce-thermal-stability]]

## Parameter Summary

[[visual:ce-analysis-summary]]

## Summary

- CE provides the highest power gain of all BJT configurations
- $A_V = -g_m R_C$ (inverting), $R_{in} \approx r_\pi$, $R_{out} \approx R_C$
- Emitter degeneration trades gain for stability and linearity
- Phase inversion (180°) is the signature of CE operation
