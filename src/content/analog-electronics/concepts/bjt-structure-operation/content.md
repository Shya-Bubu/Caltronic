# BJT Structure and Regions of Operation

> **Why This Matters**: The Bipolar Junction Transistor (BJT) is the building block of every amplifier circuit in this tutorial. Before you can analyse any of the six assignment circuits, you need to understand what's inside a BJT, how current flows through it, and how the three operating regions determine the transistor's behaviour. This is the foundation everything else rests on.

## What Is a BJT?

A BJT is a **three-terminal semiconductor device** that uses a small current at one terminal (the **base**) to control a much larger current between the other two terminals (the **collector** and **emitter**). That's the core idea: **a small signal controls a large one** — this is what makes amplification possible.

Think of a BJT like a **water valve**: the base current is the handle you turn, and the collector-emitter current is the water that flows. A tiny twist of the handle controls a huge flow of water.

[[visual:bjt-water-analogy]]

## NPN and PNP Structures

There are two types of BJT, depending on how the semiconductor layers are arranged:

[[visual:npn-pnp-structure]]

### NPN Transistor
Three layers of semiconductor: **N-type → P-type → N-type**
- **Emitter (E)**: Heavily doped N-type. Supplies electrons (the majority carriers that do the work).
- **Base (B)**: Very thin, lightly doped P-type. Controls how many electrons make it from emitter to collector.
- **Collector (C)**: Moderately doped N-type. Collects the electrons that pass through the base.

### PNP Transistor
Three layers: **P-type → N-type → P-type**
- Same idea, but with all polarities reversed: holes (not electrons) are the majority carriers, and all voltage/current directions flip.

> **For this entire tutorial, we focus on NPN transistors** — they're used in all six assignment circuits. Everything for PNP is the mirror image (flip all voltage polarities and current directions).

## Circuit Symbols and Current Directions

[[visual:bjt-circuit-symbols]]

The **arrow on the emitter** tells you the type:
- **NPN**: arrow points **out** (away from base) — "**N**ot **P**ointing i**N**"
- **PNP**: arrow points **in** (toward base)

The arrow also shows the direction of **conventional current** flow through the emitter.

### The Fundamental Current Relationship

In any BJT, Kirchhoff's Current Law gives us:

$$I_E = I_C + I_B$$

This is always true, regardless of the operating region. The emitter current is the sum of the collector and base currents.

[[visual:current-flow-diagram]]

## The Two Key Ratios: β and α

Two parameters describe how the BJT amplifies:

### Current Gain β (beta)

$$\beta = \frac{I_C}{I_B}$$

This is the **DC current gain** (also written as $h_{FE}$). A typical value is $\beta = 100$, meaning 1 mA into the base produces 100 mA out of the collector.

### Common-Base Current Gain α (alpha)

$$\alpha = \frac{I_C}{I_E}$$

Since $I_E = I_C + I_B$, we can derive:

$$\alpha = \frac{\beta}{\beta + 1}$$

For $\beta = 100$: $\alpha = 100/101 \approx 0.99$. Almost all the emitter current reaches the collector — only about 1% goes to the base.

[[visual:beta-alpha-relationship]]

<details>
<summary><strong>Pause & Think</strong>: If β = 200 (as in Question 2), what fraction of the emitter current is the base current?</summary>

$I_B = I_E / (\beta + 1) = I_E / 201 \approx 0.005 I_E$

So only 0.5% of the emitter current flows through the base. The base is a very weak "control terminal" — but that tiny current controls the 99.5% that flows from collector to emitter. This is the essence of amplification.

</details>

## The Three Operating Regions

A BJT has three operating regions, determined by the **biasing** of its two PN junctions:

[[visual:operating-regions]]

| Region | Base-Emitter Junction | Base-Collector Junction | Behaviour |
|--------|----------------------|------------------------|-----------|
| **Active (Forward Active)** | Forward biased ($V_{BE} \approx 0.7$ V) | Reverse biased | **Amplification**: $I_C = \beta I_B$ |
| **Saturation** | Forward biased | Forward biased | **Switch ON**: acts like a short circuit ($V_{CE} \approx 0.2$ V) |
| **Cutoff** | Reverse biased | Reverse biased | **Switch OFF**: no current flows ($I_C \approx 0$) |

> **For amplifier design, we always operate in the Active region.** All six assignment questions assume the BJT is in the active region (also called the "linear region" because $I_C$ is proportional to $I_B$).

### Active Region — The Amplifier Mode

In the active region:

$$I_C = \beta I_B$$

$$I_E = (\beta + 1) I_B$$

$$V_{BE} \approx 0.6\text{-}0.7 \text{ V (silicon)}$$

The base-emitter junction acts like a forward-biased diode (voltage drop ≈ 0.7 V), while the collector-base junction is reverse-biased.

[[visual:active-region-model]]

<details>
<summary><strong>Pause & Think</strong>: Why must the collector-base junction be reverse-biased for amplification?</summary>

If the collector-base junction were forward-biased too (saturation), the collector voltage would be pinned near the emitter voltage ($V_{CE} \approx 0.2$ V), and the transistor could no longer respond to small signal changes — it's "saturated" like a sponge that can't absorb more water. The reverse-biased CB junction creates a high-impedance collector that can swing freely in voltage, enabling amplification.

</details>

## The BJT as a Current-Controlled Current Source

In the active region, the BJT is modelled as:

[[visual:bjt-current-source-model]]

- The **base-emitter** acts as a diode with $V_{BE} \approx 0.7$ V
- The **collector** acts as a **current source** delivering $I_C = \beta I_B$
- The collector current is **controlled by** the base current

This model is what we'll use for all DC analysis in the next concepts.

## Quick Reference: Assignment Parameters

Here are the BJT parameters used across the tutorial questions:

[[visual:assignment-parameters]]

| Question | $\beta$ ($h_{FE}$) | $V_{BE}$ | $h_{ie}$ | $h_{fe}$ | $h_{re}$ | $h_{oe}$ |
|----------|-----|---------|---------|---------|---------|---------|
| Q1 | 100 | 0.7 V | — | — | — | — |
| Q2 | 200 | 0.64 V | 1 kΩ | 200 | — | — |
| Q3 | — | 0.64 V | 1 kΩ | from graph | from graph | — |
| Q4 | — | — | 1100 Ω | 50 (CE) / −51 (CC) | given | 1/40kΩ |
| Q5 | — | 0.7 V | 1 kΩ | 100 | 2.4×10⁻⁴ | 0.1 mΩ⁻¹ |
| Q6 | — | 0.65 V | 1 kΩ | 100 | 2.4×10⁻⁴ | 0.025 mΩ⁻¹ |

<details>
<summary><strong>Pause & Think</strong>: Notice how different questions give different parameter subsets. Why does Q1 only need β and VBE, while Q5 needs all six h-parameters?</summary>

Q1 is a **DC design** problem — you only need the DC parameters ($\beta$, $V_{BE}$) to find resistor values for a given Q-point. Q5 asks for **AC small-signal analysis** (voltage gain, input/output impedance), which requires the h-parameter model. The type of analysis determines which parameters you need.

</details>

## Summary

- **BJT** = three-terminal device (Base, Collector, Emitter) that amplifies current
- **NPN**: arrow out. **PNP**: arrow in. (This tutorial uses NPN throughout)
- $I_E = I_C + I_B$ always. $\beta = I_C/I_B$ (typically 50-200). $\alpha = I_C/I_E \approx 1$
- **Active region** (amplifier mode): BE forward-biased, BC reverse-biased, $I_C = \beta I_B$
- **Saturation**: both junctions forward-biased (switch ON)
- **Cutoff**: both junctions reverse-biased (switch OFF)
- In the active region, the BJT is a **current-controlled current source**

> Don't worry if the h-parameters in the table above look unfamiliar — we'll cover them in detail in Concept 4. For now, the key takeaway is: **β and VBE are all you need for DC analysis, and h-parameters are what you need for AC analysis.**
