# Output Stage Design (Stage 2)

> **Why This Matters**: The output stage interfaces your amplifier with the outside world. Its design determines whether the amplifier can actually deliver the specified output swing to the load — everything depends on getting this right first.

## Starting Point: What We Know

From the Q-point design, we have:

- $V_{CEQ2} = 6$ V (chosen from the 4.5–7.5V safe range)
- $I_{CQ2} \approx 25$ mA (minimum to avoid cutoff: $V_p/(R_5 \| R_L) \approx 19.4$ mA)
- $V_{CC} = 15$ V
- $R_L = 1$ kΩ

Now we need to find the actual resistor values: $R_4$, $R_5$.

## Step 1: Choosing R5

$R_5$ is the emitter resistor of the PNP Stage 2. It sits between the emitter of Q2 and VCC (in the PNP configuration, the emitter is connected towards the positive rail).

[[visual:output-stage-schematic]]

The professor's reasoning for choosing $R_5$:

**Goal**: When the load $R_L$ is connected, it should not significantly change the circuit's DC conditions. This means the DC current through $R_5$ should be much larger than the current drawn by $R_L$.

**The stiff output rule**: Choose $R_5$ such that the DC current through it is at least 5× the expected load current. The peak load current is:

$$I_{L,\text{peak}} = \frac{V_p}{R_L} = \frac{3.5}{1000} = 3.5 \text{ mA}$$

So we want:

$$I_{R5} \gg 3.5 \text{ mA}$$

With $I_{CQ} = 25$ mA flowing through $R_5$, the ratio is $25/3.5 \approx 7$ — adequate.

**E12 selection**: The professor picks $R_5 = 220$ Ω. This is a design choice — you could also choose $R_5 = 180$ Ω or $R_5 = 1$ kΩ (if you have a good reason). The key constraint is that $R_5$ must be small enough relative to $R_L$ that the output is "stiff."

[[visual:r5-selection-tradeoff]]

<details>
<summary><strong>Pause & Think</strong>: What happens if you choose R5 = RL = 1kΩ?</summary>

The parallel combination R5∥RL = 500Ω. The minimum ICQ becomes Vp/500 = 7mA — much lower. This gives more flexibility for the Q-point but increases the output impedance (now 1kΩ instead of 220Ω). The signal voltage is also split between R5 and RL, reducing the effective gain. It's a valid choice with different trade-offs.

</details>

## Step 2: Finding R4 from KVL

With $R_5 = 220$ Ω, $V_{CEQ} = 6$ V, and $I_{CQ} = 25$ mA, apply KVL around the collector-emitter loop:

$$V_{CC} = I_{CQ}(R_4 + R_5) + V_{CEQ}$$

$$15 = 0.025 \times (R_4 + 220) + 6$$

$$R_4 + 220 = \frac{15 - 6}{0.025} = 360 \text{ Ω}$$

$$R_4 = 140 \text{ Ω}$$

**E12 selection**: 140 Ω is not an E12 value. The closest options are 120 Ω and 150 Ω. The professor picks $R_4 = 150$ Ω.

[[visual:e12-nearest-values]]

[[visual:r4-kvl-calculation]]

> **What changes when you pick 150Ω instead of 140Ω?** The total resistance becomes $150 + 220 = 370$ Ω. With $V_{CEQ} = 6$ V: $I_{CQ} = (15-6)/370 = 24.3$ mA. Slightly less than 25 mA — perfectly acceptable.

## Step 3: The Exact Q-Point (Stage 2)

With $R_4 = 150$ Ω and $R_5 = 220$ Ω:

$$I_{CQ2} = \frac{V_{CC} - V_{CEQ2}}{R_4 + R_5} = \frac{15 - 6}{370} = 24.3 \text{ mA}$$

$$I_{BQ2} = \frac{I_{CQ2}}{h_{FE}} = \frac{24.3}{120} = 0.20 \text{ mA} = 200 \text{ μA}$$

$$V_{B2} = V_{CC} - I_{CQ2} \cdot R_5 - V_{BE2} = V_{CC} - (V_{CEQ2} + V_{BE2}) - I_{CQ2} \cdot R_4$$

[[visual:stage2-voltage-map]]

Using the full KVL around the base-emitter-collector path:

$$V_{B2} = V_{CC} - I_{CQ2} \cdot R_4 - V_{BE2}$$

With $V_{BE2} \approx 0.66$ V for the PNP:

$$V_{B2} = 15 - 24.3 \times 10^{-3} \times 150 - 0.66 \approx 10.7 \text{ V}$$

This is the voltage that Stage 1's collector must provide: $V_{C1} = V_{B2} \approx 10.7$ V.

## Step 4: Verify Power Dissipation

Each transistor must stay within its 500 mW limit:

$$P_{Q2} = V_{CEQ2} \times I_{CQ2} = 6 \times 0.0243 = 145.8 \text{ mW}$$

This is well below 500 mW — safe.

[[visual:power-dissipation-check]]

## Step 5: The AC Load Line for Stage 2

The AC load resistance is:

$$R_{AC} = R_5 \| R_L = \frac{220 \times 1000}{220 + 1000} = 180.3 \text{ Ω}$$

The AC load line passes through the Q-point $(V_{CEQ}, I_{CQ}) = (6 \text{V}, 24.3 \text{mA})$ with slope $-1/R_{AC}$:

$$I_C = I_{CQ} + \frac{V_{CEQ} - V_{CE}}{R_{AC}}$$

[[visual:falstad-output-stage]]

**Verify the swing**: The maximum voltage swing on the AC load line:

- Upward: $V_{CE}$ increases to $V_{CEQ} + I_{CQ} \times R_{AC} = 6 + 24.3 \times 0.180 = 10.4$ V (below VCC — good)
- Downward: $V_{CE}$ decreases to $V_{CEQ} - I_{CQ} \times R_{AC} = 6 - 4.4 = 1.6$ V (above VCEsat — good)

The available swing on the AC load line is about 8.8 Vpp — more than enough for the required 7 Vpp.

[[visual:ac-swing-verification]]

## Summary of Stage 2 Design

| Component | Value | How Determined |
|-----------|-------|---------------|
| $R_5$ | 220 Ω (E12) | Design choice: output stiffness, small relative to RL |
| $R_4$ | 150 Ω (E12) | KVL: $R_4 = (V_{CC} - V_{CEQ})/I_{CQ} - R_5$ |
| $I_{CQ2}$ | 24.3 mA | $(V_{CC} - V_{CEQ})/(R_4 + R_5)$ |
| $I_{BQ2}$ | 200 μA | $I_{CQ}/h_{FE}$ |
| $V_{B2}$ | 10.7 V | KVL around base circuit — this is what Stage 1 must provide |
| $P_{Q2}$ | 146 mW | $V_{CEQ} \times I_{CQ}$ — well within 500 mW limit |

Stage 2 is now fully designed. The critical output is $V_{B2} = 10.7$ V — this becomes the target for Stage 1's collector voltage, linking the two stages through the direct coupling.
