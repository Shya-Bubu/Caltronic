# Common-Collector and Common-Base Configurations

> **Why This Matters**: CE isn't always the right tool. CC (emitter follower) is essential for **buffering** — driving low-impedance loads from high-impedance sources. CB is essential for **high-frequency RF** applications where CE fails due to the Miller effect. Knowing all three lets you pick the right configuration and cascade them intelligently.

## Why Only Three Configurations?

A BJT has three terminals. You might think there should be six configurations (3 choices for common × 2 for input/output). But an amplifier must have **power gain > 1**. If you pick the wrong input/output assignment, the gain will be less than 1 — it's no longer an amplifier. So only **three** configurations work:

[[visual:cb-circuit-overview]]

## Common-Collector (Emitter Follower)

[[visual:cc-circuit-overview]]

In CC, input is at the base, output is at the emitter, and the collector is connected to $V_{CC}$ (AC ground when DC sources are short-circuited).

### The Unity Voltage Gain

For a BJT, $V_{BE}$ is roughly 0.7V DC with very tiny AC fluctuations (maybe ±5 mV as the input changes). So the emitter voltage **follows** the base voltage almost exactly:

$$A_V \approx 0.99$$

You might think: why use a circuit with no voltage gain? Here's the key insight:

### CC as a Voltage Buffer

[[visual:cc-buffer-application]]

Consider a microphone with high output impedance (maybe 100 kΩ). If you connect it directly to a speaker (maybe 8-100 Ω), the microphone can't deliver enough current — the voltage divider $R_L/(R_L + R_{out})$ kills the signal.

With CC in between: its input impedance is **very high** (~100 kΩ), so it doesn't load the microphone. Its output impedance is **very low** (~100 Ω), so it can drive the speaker. The voltage stays the same, but the **current capability** is amplified by β+1.

[[visual:three-config-gain-comparison]]

**Features of CC:**
| Parameter | Value |
|-----------|-------|
| $R_{in}$ | Very high (~100 kΩ) |
| $R_{out}$ | Very low (~100 Ω) |
| $A_V$ | ≈ 0.99 (unity) |
| $A_I$ | ≈ β ≈ 50-100 (high) |

[[visual:three-config-rin-comparison]]

[[visual:three-config-rout-comparison]]

## Common-Base

In CB, input goes to the emitter, output comes from the collector, and the base is at AC ground.

### CB Properties

| Parameter | Value | 
|-----------|-------|
| $R_{in}$ | Very low (~20 Ω) |
| $R_{out}$ | Very high (~2 MΩ) |
| $A_V$ | High (~100, non-inverting) |
| $A_I$ | ≈ α ≈ 0.98 (unity) |

<details>
<summary><strong>Pause & Think</strong>: CB has unity current gain but high voltage gain. Is it still an amplifier?</summary>

Yes! Power gain = $|A_V| \times A_I \approx 100 \times 0.98 \approx 98$, which is much greater than 1. The power amplification comes almost entirely from the voltage gain.

</details>

### Why CB for High Frequency?

[[visual:cb-frequency-advantage]]

Between the base and collector of a BJT, there's a parasitic capacitance $C_{BC}$. In CE, this capacitance creates a leakage path between output and input that **reduces bandwidth** at high frequencies (the Miller effect multiplies $C_{BC}$ by $(1 + |A_V|)$).

In CB, the base is grounded, so this capacitance doesn't couple input to output. Result: **much better high-frequency response**. This is why CB is used in RF amplifiers.

Typically, because CB has very low input impedance ($\sim$20 Ω), you'd overload the source if you connect directly. So in practice, you put a **CE stage before** the CB stage to get both voltage gain and proper impedance matching.

## Cascading CE + CC

[[visual:cascading-ce-cc]]

A common design pattern: CE for voltage gain → CC for output buffering. The CE stage provides high $A_V$ and moderate $R_{out}$, then CC converts to low $R_{out}$ so you can drive loads.

## Choosing the Right Configuration

[[visual:application-selection-guide]]

[[visual:summary-table-all-configs]]

## Summary

- CC (emitter follower): $A_V \approx 1$, very high $R_{in}$, very low $R_{out}$, used as **voltage buffer**
- CB: high $A_V$, very low $R_{in}$, very high $R_{out}$, $A_I \approx 1$, used for **RF/high-frequency**
- Only 3 of 6 possible configs work as amplifiers (power gain > 1)
- CB avoids Miller effect → better bandwidth
- Common cascades: CE→CC (gain + buffering), CE→CB (gain + high-freq)
