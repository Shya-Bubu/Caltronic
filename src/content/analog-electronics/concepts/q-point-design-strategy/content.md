# Q-Point Design Strategy

> **Why This Matters**: Choosing the Q-point (quiescent operating point) determines whether your amplifier can deliver the full output swing without distortion. Get this wrong, and your 7Vpp output clips — no amount of gain tuning fixes a bad Q-point.

## The Specifications That Constrain You

Before designing anything, nail down the specifications:

| Specification | Symbol | Value |
|--------------|--------|-------|
| Overall AC voltage gain | $A_v$ | 600 (varies by group) |
| Output load resistance | $R_L$ | 1 kΩ |
| Supply voltage | $V_{CC}$ | 15 V |
| Peak-to-peak output swing | $V_{pp}$ | 7 V |
| Transistors | Q1, Q2 | BC549 (NPN), BC556 (PNP) |

From $V_{pp} = 7$ V, the peak voltage is:

$$V_p = \frac{V_{pp}}{2} = 3.5 \text{ V}$$

This means the output voltage must swing **3.5 V above and 3.5 V below** the Q-point voltage without the transistor entering saturation or cutoff.

[[visual:vpp-swing-illustration]]

## The Q-Point Must Avoid Two Failures

[[visual:clipping-distortion-plot]]

**Cutoff clipping** occurs when $V_{CE}$ tries to exceed $V_{CC}$. The transistor turns off and the output voltage flattens at the top of the waveform.

**Saturation clipping** occurs when $V_{CE}$ drops below $V_{CE,\text{sat}}$. The transistor saturates and the output voltage flattens at the bottom.

For a clean, undistorted sine wave output, the Q-point must be placed so that the full ±3.5V swing stays within the active region on both sides.

## Finding the Safe VCEQ Range

The professor walks through this systematically:

**Upper bound**: The output cannot exceed $V_{CC}$ minus some safety margin. But the transistor doesn't clip at exactly $V_{CC}$ — cutoff happens slightly below. Add a 1V margin:

$$V_{CEQ,\text{max}} = V_{CC} - V_p - V_{\text{margin,cutoff}} = 15 - 3.5 - 1 = 10.5 \text{ V}$$

**Lower bound**: The output cannot go below $V_{CE,\text{sat}}$ plus a safety margin. $V_{CE,\text{sat}} \approx 0.2$ V for these transistors, but we add 1V margin:

$$V_{CEQ,\text{min}} = V_p + V_{\text{margin,sat}} = 3.5 + 1 = 4.5 \text{ V}$$

**But wait** — we haven't accounted for the AC load line yet.

[[visual:safe-zone-diagram]]

## DC Load Line vs AC Load Line

[[visual:dc-ac-loadline-comparison]]

This is where many students get confused. The distinction is critical:

**DC load line**: Determined by $V_{CC}$ and the total DC resistance in the collector-emitter path ($R_4 + R_5$ for Stage 2). This line has slope $-1/(R_4 + R_5)$.

$$V_{CE} = V_{CC} - I_C(R_4 + R_5)$$

**AC load line**: Determined by the AC load resistance seen by the transistor. For Stage 2, this is $R_5 \| R_L$. The AC load line passes through the Q-point with slope $-1/(R_5 \| R_L)$.

Since $R_5 \| R_L < R_5 < R_4 + R_5$, the AC load line is **steeper** than the DC load line.

<details>
<summary><strong>Pause & Think</strong>: Why does the AC load line matter for the output swing?</summary>

The signal swings along the AC load line, not the DC load line. Because the AC load line is steeper, for a given current swing, you get *less* voltage swing than the DC load line would suggest. This means the Q-point must be placed more conservatively to ensure the output doesn't clip.

</details>

## Adjusting for the AC Load Line Slope

The AC load line is steeper, so the voltage swing available on the upper side is reduced. The professor accounts for this by adding a 3V margin on the upper side:

$$V_{CEQ,\text{max}} = 10.5 - 3 = 7.5 \text{ V}$$

The lower side doesn't change because saturation clipping is determined by the DC load line:

$$V_{CEQ,\text{min}} = 4.5 \text{ V}$$

[[visual:qpoint-safe-range]]

> **Key Result**: The safe Q-point range for $V_{CEQ}$ is **4.5 V to 7.5 V**. The professor chooses the midpoint:

$$V_{CEQ} = 6 \text{ V}$$

This gives equal margin on both sides. You could choose 5V, or 7V, or any value in this range — each choice is valid with different trade-offs.

## Setting ICQ — Minimum Current Constraint

[[visual:icq-minimum-calculation]]

With $V_{CEQ} = 6$ V chosen, you also need to set $I_{CQ}$ — the quiescent collector current. This isn't arbitrary: the AC signal requires the transistor to supply current to the load.

The peak output current through the load is:

$$I_{L,\text{peak}} = \frac{V_p}{R_L} = \frac{3.5}{1000} = 3.5 \text{ mA}$$

The peak current also flows through $R_5$:

$$I_{R5,\text{peak}} = \frac{V_p}{R_5} = \frac{3.5}{220} = 15.9 \text{ mA}$$

Total peak signal current:

$$I_{\text{peak}} = \frac{V_p}{R_5 \| R_L} = \frac{3.5}{180.3} = 19.4 \text{ mA}$$

For the transistor to not cut off during the negative half-cycle, $I_{CQ}$ must exceed this peak current:

$$I_{CQ} \geq 19.4 \text{ mA}$$

The professor rounds up to $I_{CQ} = 20-25$ mA for safety.

[[visual:falstad-qpoint-demo]]

## The Complete Q-Point

With $V_{CEQ} = 6$ V and $I_{CQ} \approx 25$ mA:

| Parameter | Value | How It Was Set |
|-----------|-------|---------------|
| $V_{CEQ2}$ | 6 V | Design choice: midpoint of 4.5–7.5V safe range |
| $I_{CQ2}$ | 25 mA | Minimum current to avoid cutoff: $V_p/(R_5 \| R_L) \approx 19.4$ mA |
| $V_{CEQ1}$ | 6 V | Same swing requirement — professor uses same value |
| $I_{CQ1}$ | 2.5 mA | Design choice: $I_{C2}/I_{C1} \approx 10$ |

[[visual:qpoint-on-characteristic]]

> **Design Freedom**: These are reasonable values, but not the only valid ones. You could set $V_{CEQ}$ = 5V and $I_{CQ}$ = 30 mA. Or $V_{CEQ}$ = 7V and $I_{CQ}$ = 22 mA. Each gives a different circuit with different resistor values — and all can be correct if the specifications are met.

## Why "Design from the Output Backwards"?

The professor makes an important pedagogical point: **start from the output, not the input**. The output specifications ($V_{pp}$, $R_L$) are the tightest constraints. They determine the Q-point, which determines the resistor values, which determine the bias network.

If you started from the input, you'd be guessing at the Q-point with no clear target — and you'd have to iterate many times when the output doesn't meet spec.

## Summary

- The Q-point must be placed so that ±3.5V swing fits without clipping
- **Safe VCEQ range**: 4.5V to 7.5V (accounting for margins and AC load line slope)
- **Choose VCEQ**: professor picks 6V (midpoint) — any value in range is valid
- **Minimum ICQ**: $V_p / (R_5 \| R_L) \approx 19.4$ mA → round up to 25 mA
- Always **design from the output backwards** — the output specs constrain the most tightly
- The AC load line is steeper than the DC load line because $R_5 \| R_L < R_4 + R_5$
