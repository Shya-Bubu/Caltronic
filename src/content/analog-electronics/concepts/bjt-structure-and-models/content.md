# BJT Structure, External Energy Model and Modes

> **Why This Matters**: The BJT (Bipolar Junction Transistor) is the first three-terminal device you'll study. Understanding how it works — not just memorising equations — is essential because the same thinking applies to every transistor technology. Master the BJT model, and MOSFETs will feel like a natural extension.

## Two Diodes Back-to-Back? Not Quite.

An NPN BJT has three semiconductor regions: N-type emitter, P-type base, and N-type collector. If you look at this structure, it seems like two PN junctions connected back-to-back:

$$\text{Emitter (N)} \quad | \quad \text{Base (P)} \quad | \quad \text{Collector (N)}$$

[[visual:bjt-structure-diagram]]

This might tempt you to model the BJT as two diodes facing each other. Let's test this: connect two discrete diodes back-to-back by their anodes. Does this behave like a transistor?

**No.** If you inject current into the shared anode node (the "base"), the current splits equally to both cathodes (emitter and collector). There's no amplification — just symmetric current splitting.

The real BJT is different because:
1. The **base region is extremely thin** (typically < 1 μm)
2. The **emitter is heavily doped** (many free electrons)
3. Electrons injected from the emitter **pass through** the thin base and are collected by the collector

This is the "transistor action" that cannot be replicated with two discrete diodes.

[[visual:back-to-back-limitation]]

## The External Energy Model

The correct way to understand the BJT is through the **external energy model**. Here's the key idea:

When the base-emitter junction is forward-biased ($V_{BE} > 0.7$ V), electrons from the emitter are injected into the base region. Because the base is so thin, most of these electrons (typically 99%+) don't recombine in the base — they **diffuse across and are swept into the collector** by the reverse-biased base-collector junction.

[[visual:electron-flow-diagram]]

The result is:

$$\boxed{I_C = \beta I_B}$$

where $\beta$ (sometimes written $h_{FE}$) is the **DC current gain**, typically 100-300 for common BJTs.

The three "fates" of electrons injected into the base:
1. **Most** are collected by the collector → $I_C$
2. **Some** recombine with holes in the base → this constitutes the base current $I_B$
3. **Very few** are lost

By KCL at the transistor:

$$\boxed{I_E = I_C + I_B = (\beta + 1) I_B}$$

> **Key Insight**: The BJT is a **current-controlled current source** (CCCS). A small base current $I_B$ controls a much larger collector current $I_C = \beta I_B$. This is amplification.

<details>
<summary><strong>Pause & Think</strong>: If β = 220, what fraction of the emitter current ends up as base current?</summary>

$I_B = I_E / (\beta + 1) = I_E / 221 \approx 0.45\%$ of $I_E$. So 99.55% of the emitter current flows to the collector. Only a tiny fraction is "used up" as base current — this is what makes the BJT an efficient amplifier.

</details>

## The Three Modes of Operation

The BJT has **three operating modes**, determined by the biasing of its two junctions:

[[visual:bjt-modes-table]]

| Mode | Base-Emitter | Base-Collector | Collector Current |
|------|-------------|---------------|-------------------|
| **Cutoff** | Reverse ($V_{BE} < 0.7$V) | Reverse | $I_C = 0$ |
| **Active Linear** | Forward ($V_{BE} \approx 0.7$V) | Reverse | $I_C = \beta I_B$ |
| **Saturation** | Forward | Forward | $I_C < \beta I_B$ |

### Cutoff Mode

Both junctions are reverse-biased (or the B-E junction is not sufficiently forward-biased). The transistor is **OFF**:

$$I_C = 0, \quad I_B = 0, \quad I_E = 0$$

[[visual:bjt-cutoff-circuit]]

The equivalent circuit is simply **three open circuits** — no current flows anywhere. The BJT looks like a block of plastic.

### Active Linear Mode (The Amplification Region)

The base-emitter junction is forward-biased, and the base-collector junction is reverse-biased. This is the **desired mode for amplifiers**.

$$V_{BE} = 0.7\text{V}, \quad I_C = \beta I_B, \quad V_{CE} > V_{CE,sat}$$

[[visual:bjt-active-circuit]]

The equivalent circuit (for the purpose of DC analysis) is:
- **B-E junction**: a forward-biased diode (or just a 0.7V source)
- **C-E path**: a current-controlled current source $I_C = \beta I_B$
- **B-C junction**: an open circuit (reverse-biased)

> **Correction Note**: In some textbooks, the base-collector junction in active mode is incorrectly shown as a short circuit. It must be an **open circuit** — the reverse-biased junction blocks current flow from collector to base. The collector current $\beta I_B$ is produced by the transistor action, not by the junction.

### Saturation Mode

Both junctions are forward-biased. The transistor is fully ON like a closed switch, but it is **NOT amplifying**.

$$V_{CE,sat} \approx 0.2\text{V}, \quad I_C = \frac{V_{CC} - V_{CE,sat}}{R_C}$$

[[visual:bjt-saturation-circuit]]

In saturation, $I_C < \beta I_B$ — there is "excess" base current that the transistor cannot amplify. The collector-emitter voltage drops to $V_{CE,sat} \approx 0.2$V.

The equivalent circuit is:
- **B-E**: 0.7V source (forward biased)
- **C-E**: 0.2V source (both junctions forward)
- The transistor looks like a closed switch with a small voltage drop

<details>
<summary><strong>Pause & Think</strong>: Why is saturation undesirable for amplifiers but useful for digital circuits?</summary>

In saturation, the relationship $I_C = \beta I_B$ breaks — the collector current is limited by the external circuit, not by the base current. This means the transistor doesn't amplify. But for digital circuits, you want the transistor to behave as a switch (fully ON or fully OFF), and saturation provides the "fully ON" state with minimal $V_{CE}$.

</details>

## How to Determine the Mode

The analysis procedure for a BJT circuit follows these steps:

1. **Assume a mode** (usually active)
2. **Apply the model** for that mode ($V_{BE} = 0.7$V, $I_C = \beta I_B$)
3. **Solve the circuit** using KVL/KCL
4. **Check the assumption**:
   - Active: Is $V_{CE} > V_{CE,sat}$? Is $I_C = \beta I_B$?
   - Saturation: Is $I_C < \beta I_B$?
   - Cutoff: Is $V_{BE} < 0.7$V?
5. If the check fails, **assume a different mode** and repeat

[[visual:falstad-bjt-active]]

## Summary

- The BJT cannot be modeled as two back-to-back diodes because the **thin base** enables transistor action
- The **external energy model** gives $I_C = \beta I_B$ (current-controlled current source)
- **Three modes**: cutoff (OFF), active linear (amplifier), saturation (switch ON)
- In **active mode**: $V_{BE} = 0.7$V, $I_C = \beta I_B$, B-C junction is open circuit
- In **saturation**: $V_{CE,sat} \approx 0.2$V, $I_C < \beta I_B$, both junctions forward
- **Analysis method**: assume mode → apply model → solve → verify assumption
