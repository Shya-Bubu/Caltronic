# Ideal vs Practical Amplifiers

> **Why This Matters**: No real amplifier is ideal. Understanding the gap between theory and practice — saturation, finite impedances, bandwidth limits, and distortion — is what separates textbook analysis from real circuit design.

## The Ideal Amplifier

[[visual:ideal-voltage-transfer]]

An ideal amplifier is a perfect linear machine: $V_{out} = A_V \cdot V_{in}$ for all values, with infinite bandwidth, zero noise, and no distortion. But reality intervenes.

## Saturation and Clipping

[[visual:practical-saturation]]

Every amplifier has **supply rails** ($\pm V_{CC}$). When the output tries to exceed these limits, it **clips** — creating severe distortion. The usable linear range is always smaller than the supply range.

## Input and Output Impedance Effects

[[visual:rin-vs-signal-loss]]

[[visual:rout-vs-output-loss]]

The input impedance creates a voltage divider with the source resistance: $V_{in} = V_S \cdot R_{in}/(R_{in} + R_S)$. Similarly, the output impedance creates a divider with the load.

<details>
<summary><strong>Pause & Think</strong>: What happens if R_in = R_S?</summary>

You lose exactly half the signal voltage! $V_{in}/V_S = R_{in}/(R_{in}+R_S) = 0.5$. This is why we need R_in >> R_S for voltage amplifiers.

</details>

## Practical Values by Technology

[[visual:practical-rin-values]]

[[visual:practical-rout-values]]

## Bandwidth and Distortion

[[visual:gain-bandwidth-tradeoff]]

[[visual:distortion-comparison]]

All practical amplifiers have a **gain-bandwidth product (GBP)** that's roughly constant. Higher gain → lower bandwidth. This fundamental tradeoff governs every amplifier design.

## Impedance Requirements Summary

[[visual:input-output-impedance-map]]

[[visual:efficiency-vs-linearity]]

## Summary

- Real amplifiers clip at supply rails, have finite impedances, limited bandwidth, and introduce distortion
- R_in and R_out create loading effects that reduce actual gain
- GBP is approximately constant — you trade gain for bandwidth
- Small-signal operation keeps distortion low
