const fs = require('fs');
const p = require('path');
const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content/analog-electronics/concepts';
const colors = ['#4f8cff', '#ff6b8a', '#2fbf8f', '#f5a623', '#6b62ff', '#ec4899', '#14b8a6'];
function ls(a, b, n) { return Array.from({ length: n }, (_, i) => Math.round((a + i * (b - a) / (n - 1)) * 1e4) / 1e4) }

function updateContent(id, contentMd) {
    const dir = p.join(base, id);
    fs.writeFileSync(p.join(dir, 'content.md'), contentMd);
    console.log('Updated content.md:', id);
}

// ========================================
// CONCEPT 1: amplifier-classification
// Based on EE252 Lecture 6 (800 lines) + EE2040 Lecture 08 (1873 lines)
// ========================================
updateContent('amplifier-classification', `# Classification of Amplifiers

> **Why This Matters**: Before we analyze any specific amplifier circuit, we need a universal framework. No matter how complicated the internals, every amplifier can be described by just three things: **input impedance, output impedance, and transfer gain**. This classification will be used throughout the rest of this course — in small-signal analysis, feedback amplifiers, and multi-stage amplifiers.

## What Makes an Amplifier?

An amplifier must increase output **power** compared to input power. Since power = voltage × current, and we have two electrical quantities (voltage and current), the input can be either a voltage or a current, and so can the output. This gives us **four types** of amplifiers.

[[visual:amp-classification-overview]]

<details>
<summary><strong>Pause & Think</strong>: Why do we need four types? Can't we just use one?</summary>

The type depends on the physical nature of what you're amplifying. A microphone outputs a voltage — you want a voltage amplifier. A photodiode outputs a current — you want a transresistance amplifier to convert it to voltage. The classification matches the physics of your application.

</details>

## Type 1: Voltage Amplifier

[[visual:voltage-amp-model]]

The voltage amplifier is modeled using **Thévenin equivalent circuits** on both input and output sides. Inside the black box you have:
- **$R_{in}$** — input impedance
- **$A_V \\cdot V_{in}$** — a dependent voltage source (the gain)
- **$R_{out}$** — output impedance

The actual output voltage is:

$$V_{out} = A_V \\cdot V_{in} - R_{out} \\cdot I_{out}$$

And the input voltage suffers a **potential divider loss**:

$$V_{in} = V_S \\cdot \\frac{R_{in}}{R_{in} + R_S}$$

For the gain to be independent of source and load: we need $R_{in} \\gg R_S$ and $R_{out} \\ll R_L$.

[[visual:vin-loading]]

## Type 2: Current Amplifier

[[visual:current-amp-model]]

The current amplifier uses **Norton equivalent circuits**. The output is a dependent current source $A_I \\cdot I_{in}$.

Current divider at input: $I_{in} = I_S \\cdot \\frac{R_S}{R_S + R_{in}}$

Current divider at output: $I_{out} = A_I \\cdot I_{in} \\cdot \\frac{R_{out}}{R_{out} + R_L}$

For ideal operation: $R_{in} \\ll R_S$ and $R_{out} \\gg R_L$ — the **opposite** of the voltage amplifier!

<details>
<summary><strong>Pause & Think</strong>: Why are the impedance requirements opposite for current amplifiers?</summary>

For current to flow into the amplifier, the input must look like a short circuit ($R_{in} \\approx 0$). For the output current to flow entirely through the load, the internal path must be blocked ($R_{out} \\approx \\infty$). This is exactly opposite to the voltage case where you want no current drawn at input and no voltage drop at output.

</details>

## Type 3: Transconductance Amplifier

[[visual:transconductance-amp-model]]

Input is a voltage → Thévenin input. Output is a current → Norton output. The gain $G_M$ converts voltage to current, so it has units of **Siemens (1/Ω)**.

$$I_{out} = G_M \\cdot V_{in}$$

For ideal operation: $R_{in} \\gg R_S$ (same as voltage amp) and $R_{out} \\gg R_L$ (same as current amp).

## Type 4: Transresistance Amplifier

[[visual:transresistance-amp-model]]

Input is a current → Norton input. Output is a voltage → Thévenin output. The gain $R_M$ converts current to voltage, so it has units of **Ohms**.

$$V_{out} = R_M \\cdot I_{in}$$

For ideal operation: $R_{in} \\ll R_S$ and $R_{out} \\ll R_L$.

## Ideal Characteristics Summary

[[visual:ideal-characteristics-table]]

When these ideal conditions are met, the gain becomes **independent of the source resistance $R_S$ and load resistance $R_L$** — which are external things we don't control. As engineers, we design circuits to be as close to these ideal conditions as possible so we don't have to worry about what we connect.

[[visual:gain-independence]]

## The Key Insight

[[visual:three-params-summary]]

> **Take-home message**: If you have a linear amplifier, you don't need too many variables to characterize it. If you can define $R_{in}$, $R_{out}$, and the transfer gain, then you pretty much know everything about the circuit.

[[visual:loading-effects-comparison]]

## Summary

- Four amplifier types based on voltage/current input and output
- Each characterized by just three parameters: $R_{in}$, $R_{out}$, and transfer gain
- Voltage amp: Thévenin I/O, $R_{in} = \\infty$, $R_{out} = 0$ ideally
- Current amp: Norton I/O, $R_{in} = 0$, $R_{out} = \\infty$ ideally
- Transconductance: mixed Thévenin/Norton, both $R_{in}$ and $R_{out} = \\infty$
- Transresistance: mixed Norton/Thévenin, both $R_{in}$ and $R_{out} = 0$
- When ideal conditions are met, gain is independent of source and load
`);

// ========================================
// CONCEPT 2: ideal-vs-practical-amplifiers
// Based on EE252 Lecture 6 loading effects + EE2040 practical discussion
// ========================================
updateContent('ideal-vs-practical-amplifiers', `# Ideal vs Practical Amplifiers

> **Why This Matters**: No real amplifier is ideal. Understanding the gap between the ideal three-parameter model and real circuits — loading effects, saturation limits, impedance mismatches — is what separates textbook analysis from actual circuit design.

## Loading at the Input

[[visual:ideal-voltage-transfer]]

When you connect a source with internal impedance $R_S$ to an amplifier with finite input impedance $R_{in}$, you get a **potential divider**:

$$V_{in} = V_S \\cdot \\frac{R_{in}}{R_{in} + R_S}$$

If $R_{in} = R_S$, you lose **half** the signal! This is why voltage amplifiers need $R_{in} \\gg R_S$.

[[visual:rin-vs-signal-loss]]

## Loading at the Output

[[visual:rout-vs-output-loss]]

Similarly, the output forms a divider between $R_{out}$ and $R_L$:

$$V_{out} = A_V \\cdot V_{in} \\cdot \\frac{R_L}{R_L + R_{out}}$$

The **complete gain formula** including all loading effects is:

$$A_{total} = A_V \\cdot \\frac{R_{in}}{R_{in} + R_S} \\cdot \\frac{R_L}{R_L + R_{out}}$$

<details>
<summary><strong>Pause & Think</strong>: An amplifier has $R_{in} = 10 \\text{ kΩ}$, $R_S = 1 \\text{ kΩ}$, $A_V = 100$, $R_{out} = 2 \\text{ kΩ}$, $R_L = 8 \\text{ kΩ}$. What is the actual gain?</summary>

$A_{total} = 100 \\times \\frac{10}{10+1} \\times \\frac{8}{8+2} = 100 \\times 0.909 \\times 0.8 = 72.7$

You lose about 27% of the gain due to loading! This is why impedance matching matters.

</details>

## Saturation and Clipping

[[visual:practical-saturation]]

Every real amplifier has **supply rails** ($\\pm V_{CC}$). When the output tries to exceed these limits, it **clips**. The usable linear range is $|V_{in}| < V_{CC}/|A_V|$.

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
- Complete gain: $A_{total} = A_V \\cdot [R_{in}/(R_{in}+R_S)] \\cdot [R_L/(R_L+R_{out})]$
- Saturation limits the output to $\\pm V_{CC}$
- MOSFETs have much higher $R_{in}$ than BJTs due to insulated gate
- Each amplifier type has specific $R_{in}$/$R_{out}$ requirements
`);

// ========================================
// CONCEPT 3: common-emitter-amplifier
// Based on EE252 Lecture 7 lines 100-338 + EE2040 Lecture 08 lines 1125-1317
// ========================================
updateContent('common-emitter-amplifier', `# Common-Emitter Amplifier

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

$$A_V \\approx -\\frac{R_C}{r_e + R_E}$$

where $r_e$ is the **dynamic emitter resistance** (also called emitter spread resistance), typically about 50-100 Ω. When there is no external emitter resistance (or $R_E$ is bypassed by $C_E$):

$$A_V \\approx -\\frac{R_C}{r_e}$$

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

Because BOTH voltage gain and current gain are large, the power gain $A_P = |A_V| \\times A_I$ is very high — on the order of **5000 or more**. This is why CE is the most commonly used configuration.

## Emitter Degeneration

[[visual:ce-emitter-degeneration]]

When $R_E$ is NOT bypassed, the gain reduces to $A_V = -R_C/(r_e + R_E)$, which is lower but more **stable** and **linear** — the emitter resistor provides negative feedback.

## Thermal Stability

[[visual:ce-thermal-stability]]

Without $R_E$: Temperature ↑ → β ↑ → $I_C$ ↑ → power (=$I_C \\times V_{CE}$) ↑ → temperature ↑ further. This positive feedback loop is called **thermal runaway** and can destroy the transistor.

With $R_E$: $I_C$ ↑ → $V_E = I_E R_E$ ↑ → $V_{BE} = V_B - V_E$ ↓ → $I_C$ ↓. This **negative feedback** stabilizes the operating point.

## Parameter Summary

[[visual:ce-analysis-summary]]

## Summary

- CE: input at base, output at collector, emitter is common
- $A_V \\approx -R_C/r_e$ (inverted), highest power gain
- $R_{in} \\approx 1 \\text{ kΩ}$ (moderate), $R_{out} \\approx R_C$ (moderate-high)
- Current gain $A_I \\approx \\beta$ ≈ 50-100
- Emitter bypass capacitor restores full gain; without it, $R_E$ reduces gain but improves stability
- Thermal runaway prevented by $R_E$ providing negative feedback
- Most commonly used BJT amplifier configuration
`);

// ========================================
// CONCEPT 4: common-base-and-common-collector
// Based on EE252 Lecture 7 lines 338-754 + EE2040 Lecture 08 lines 1324-1600
// ========================================
updateContent('common-base-and-common-collector', `# Common-Collector and Common-Base Configurations

> **Why This Matters**: CE isn't always the right tool. CC (emitter follower) is essential for **buffering** — driving low-impedance loads from high-impedance sources. CB is essential for **high-frequency RF** applications where CE fails due to the Miller effect. Knowing all three lets you pick the right configuration and cascade them intelligently.

## Why Only Three Configurations?

A BJT has three terminals. You might think there should be six configurations (3 choices for common × 2 for input/output). But an amplifier must have **power gain > 1**. If you pick the wrong input/output assignment, the gain will be less than 1 — it's no longer an amplifier. So only **three** configurations work:

[[visual:cb-circuit-overview]]

## Common-Collector (Emitter Follower)

[[visual:cc-circuit-overview]]

In CC, input is at the base, output is at the emitter, and the collector is connected to $V_{CC}$ (AC ground when DC sources are short-circuited).

### The Unity Voltage Gain

For a BJT, $V_{BE}$ is roughly 0.7V DC with very tiny AC fluctuations (maybe ±5 mV as the input changes). So the emitter voltage **follows** the base voltage almost exactly:

$$A_V \\approx 0.99$$

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

Yes! Power gain = $|A_V| \\times A_I \\approx 100 \\times 0.98 \\approx 98$, which is much greater than 1. The power amplification comes almost entirely from the voltage gain.

</details>

### Why CB for High Frequency?

[[visual:cb-frequency-advantage]]

Between the base and collector of a BJT, there's a parasitic capacitance $C_{BC}$. In CE, this capacitance creates a leakage path between output and input that **reduces bandwidth** at high frequencies (the Miller effect multiplies $C_{BC}$ by $(1 + |A_V|)$).

In CB, the base is grounded, so this capacitance doesn't couple input to output. Result: **much better high-frequency response**. This is why CB is used in RF amplifiers.

Typically, because CB has very low input impedance ($\\sim$20 Ω), you'd overload the source if you connect directly. So in practice, you put a **CE stage before** the CB stage to get both voltage gain and proper impedance matching.

## Cascading CE + CC

[[visual:cascading-ce-cc]]

A common design pattern: CE for voltage gain → CC for output buffering. The CE stage provides high $A_V$ and moderate $R_{out}$, then CC converts to low $R_{out}$ so you can drive loads.

## Choosing the Right Configuration

[[visual:application-selection-guide]]

[[visual:summary-table-all-configs]]

## Summary

- CC (emitter follower): $A_V \\approx 1$, very high $R_{in}$, very low $R_{out}$, used as **voltage buffer**
- CB: high $A_V$, very low $R_{in}$, very high $R_{out}$, $A_I \\approx 1$, used for **RF/high-frequency**
- Only 3 of 6 possible configs work as amplifiers (power gain > 1)
- CB avoids Miller effect → better bandwidth
- Common cascades: CE→CC (gain + buffering), CE→CB (gain + high-freq)
`);

// ========================================
// CONCEPT 5: bjt-two-port-analysis
// Based on EE252 Lecture 8 (630 lines) + EE252 Lecture 13 hybrid-pi (339 lines)
// ========================================
updateContent('bjt-two-port-analysis', `# BJT Two-Port Network Analysis

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

$$V_1 = h_{11} \\cdot I_1 + h_{12} \\cdot V_2$$
$$I_2 = h_{21} \\cdot I_1 + h_{22} \\cdot V_2$$

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
- Input: resistance $h_i$ in series with dependent voltage source $h_r \\cdot V_2$
- Output: dependent current source $h_f \\cdot I_1$ in parallel with conductance $h_o$ (= $1/R_{out}$)

You can verify: applying KVL to the input loop gives the first equation, and KCL at the output node gives the second equation.

## The Hybrid-Pi Simplification

[[visual:ce-gain-from-h-params]]

For CE configuration, $h_{re} \\approx 10^{-4}$ — so small we can **neglect it** (set to zero). This simplifies the four-parameter model to just three:

| h-parameter | Hybrid-π notation | Typical value |
|------------|-------------------|---------------|
| $h_{ie}$ | $r_\\pi$ | ~2.5 kΩ |
| $h_{fe}$ | β | ~100 |
| $1/h_{oe}$ | $r_o$ (often neglected) | ~50 kΩ |

The **transconductance** $g_m = h_{fe}/h_{ie} = \\beta/r_\\pi$, and the **emitter resistance** $r_e = r_\\pi/\\beta = 1/g_m$.

The simplified voltage gain: $A_V \\approx -h_{fe} \\cdot R_L / h_{ie} = -g_m \\cdot R_L$

[[visual:cb-gain-from-h-params]]

## Practical h-Parameter Values

[[visual:practical-h-param-values]]

When $r_o \\gg R_L$ (say $r_o > 10 R_L$), we can neglect $r_o$ entirely — the error is less than 10%, which is acceptable since h-parameter values themselves vary from their nominal values.

## Cascading with Two-Port Parameters

[[visual:two-stage-cascade-analysis]]

For cascading multiple stages, ABCD (transmission) parameters are most convenient because: $\\text{ABCD}_{total} = \\text{ABCD}_1 \\times \\text{ABCD}_2$ (simple matrix multiplication).

## Summary

- Two-port theory: 4 quantities, only 2 independent → 4 h-parameters characterize any linear active device
- h-parameters have mixed units (hybrid): $h_i$ (Ω), $h_r$ (unitless), $h_f$ (unitless), $h_o$ (S)
- Measured with specific conditions: output shorted ($V_2=0$) or input open ($I_1=0$)
- Second subscript = common terminal: $h_{ie}$ (CE), $h_{ib}$ (CB), $h_{ic}$ (CC)
- Hybrid-π: simplified model with $h_{re} \\approx 0$, giving $r_\\pi$, β, $g_m = \\beta/r_\\pi$
- $r_o$ often negligible when $r_o \\gg R_L$ (>10×)
`);

console.log('\nAll 5 lesson-05 content.md files updated with lecture-faithful content!');
