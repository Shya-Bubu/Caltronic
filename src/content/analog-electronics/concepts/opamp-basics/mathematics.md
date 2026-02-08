# Mathematical Foundation

## The Ideal Op-Amp Model

[[visual:diag-mathematics-01]]

For circuit analysis, we use the **ideal op-amp** assumptions:

| Property | Ideal Value | 741 Actual | Why it matters |
|----------|-------------|------------|----------------|
| Open-loop gain (Aol) | ∞ | 200,000 | Enables virtual short |
| Input impedance | ∞ | 2 MΩ | No current into inputs |
| Output impedance | 0 | 75 Ω | Output unaffected by load |
| Bandwidth | ∞ | 1 MHz | High-frequency roll-off |

## Derivation: Why V+ = V− (Virtual Short)

Consider the basic op-amp relationship:
$$V_o = A_{ol}(V_+ - V_-)$$

Where Aol ≈ 200,000 (very large).

For the output to stay within ±14V (not saturated):
$$|V_+ - V_-| < \frac{14V}{200,000} = 0.00007V = 70\mu V$$

This is essentially **zero** — hence V+ ≈ V−!

> 🤔 **Pause & Reflect**: The virtual short only works with negative feedback. What happens without feedback?

<details>
<summary>Click to reveal answer</summary>

Without negative feedback, even the tiniest difference between V+ and V− gets amplified by 200,000. The output immediately saturates to +14V or -14V. This is actually useful — it's how a **comparator** works!

</details>

## The General Analysis Procedure

**Step 1**: Write KCL at the inverting node
$$\frac{V_i - V_-}{R_1} + \frac{V_o - V_-}{R_2} = 0$$
(Remember: no current flows into the op-amp input)

**Step 2**: Apply virtual short
$$V_- = V_+$$

**Step 3**: Solve for Vo/Vi

## Transfer Function Concept

For any linear op-amp circuit, the relationship between input and output can be written as:

$$V_o = H \cdot V_i$$

Where **H** is the transfer function (gain).

For different circuits:
| Circuit | Transfer Function H |
|---------|---------------------|
| Inverting | −R2/R1 |
| Non-Inverting | 1 + R2/R1 |
| Summing | −(Rf/R1·V1 + Rf/R2·V2) |
| Integrator | −1/(sRC) |
| Differentiator | −sRC |

## Frequency Considerations

Real op-amps have limited bandwidth. The 741 has:
- **Gain-Bandwidth Product (GBP)** = 1 MHz

This means:
- At gain = 100, bandwidth = 10 kHz
- At gain = 10, bandwidth = 100 kHz

$$\text{Bandwidth} = \frac{GBP}{\text{Gain}}$$

---

*For exam-focused tips, continue to the Exam layer.*
