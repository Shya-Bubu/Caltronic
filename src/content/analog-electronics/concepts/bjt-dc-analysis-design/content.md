# DC Analysis and Circuit Design

> **Why This Matters**: Biasing tells you *what* configuration to use — DC analysis tells you *how to get the numbers*. This concept shows you the systematic procedure for finding the Q-point ($I_{CQ}$, $V_{CEQ}$) and for **designing** resistor values when given specifications. Q1 is a pure design problem ("choose R values to get these specific currents and voltages"), while Q2, Q3, Q5, and Q6 are analysis problems ("given these R values, find the Q-point"). You need both skills.

## The DC Equivalent Circuit

For DC analysis, we apply one fundamental rule:

> **All capacitors are open circuits at DC** (they block DC current).

This means:
- **Coupling capacitors** ($C_1$, $C_2$, $C_o$): disconnected — they isolate the signal source and load from the DC bias
- **Bypass capacitors** ($C_E$, $C_3$): disconnected — the emitter resistor is fully in the circuit

[[visual:dc-equivalent-concept]]

### Drawing the DC Equivalent

1. Remove all coupling and bypass capacitors (replace with open circuits)
2. Remove the AC signal source (it's zero at DC)
3. Remove the load resistor (disconnected by coupling cap)
4. What's left is the DC bias circuit

[[visual:dc-equivalent-example]]

<details>
<summary><strong>Pause & Think</strong>: In Figure 2 (Q2), there are capacitors C1, C2, and C3. What does the DC equivalent look like?</summary>

Remove C1 (disconnects the source Rs=100Ω and vs), C2 (disconnects the load RL=10kΩ), and C3 (opens the bypass, keeping RE2=1.5kΩ in circuit). What remains is: VCC=10V, R1=180kΩ, R2=30kΩ forming the divider, RE1=200Ω + RE2=1.5kΩ in the emitter path (total RE=1700Ω), and RC=4.7kΩ.

</details>

## The Systematic Q-Point Procedure

Here's the step-by-step method that works for every voltage-divider bias circuit:

[[visual:qpoint-procedure]]

### Step 1: Find Thevenin equivalent of the base circuit

$$V_{Th} = \frac{R_2}{R_1 + R_2} \cdot V_{CC}$$

$$R_{Th} = R_1 \| R_2 = \frac{R_1 R_2}{R_1 + R_2}$$

### Step 2: Write KVL around base-emitter loop

$$V_{Th} = I_B R_{Th} + V_{BE} + I_E R_E$$

Substitute $I_E = (\beta + 1) I_B$:

$$I_B = \frac{V_{Th} - V_{BE}}{R_{Th} + (\beta + 1) R_E}$$

### Step 3: Find collector current and VCE

$$I_C = \beta I_B$$

$$I_E = (\beta + 1) I_B$$

Apply KVL around the collector-emitter loop:

$$V_{CC} = I_C R_C + V_{CE} + I_E R_E$$

$$V_{CE} = V_{CC} - I_C R_C - I_E R_E$$

If $\beta$ is large ($\beta \gg 1$), then $I_C \approx I_E$ and:

$$V_{CE} \approx V_{CC} - I_C(R_C + R_E)$$

[[visual:kvl-loops]]

## Worked Example: Q2 (Finding the Q-Point)

Let's apply this to the circuit in Figure 2:

**Given**: $R_1 = 180$ kΩ, $R_2 = 30$ kΩ, $R_C = 4.7$ kΩ, $R_{E1} = 200$ Ω, $R_{E2} = 1.5$ kΩ, $V_{CC} = 10$ V, $\beta = h_{FE} = 200$, $V_{BE} = 0.64$ V.

**Step 1**: Thevenin equivalent

$$V_{Th} = \frac{30}{180 + 30} \times 10 = \frac{30}{210} \times 10 = 1.429 \text{ V}$$

$$R_{Th} = 180 \| 30 = \frac{180 \times 30}{180 + 30} = \frac{5400}{210} = 25.71 \text{ kΩ}$$

**Step 2**: Base current

Total emitter resistance: $R_E = R_{E1} + R_{E2} = 200 + 1500 = 1700$ Ω

$$I_B = \frac{1.429 - 0.64}{25710 + 201 \times 1700} = \frac{0.789}{25710 + 341700} = \frac{0.789}{367410} = 2.148 \text{ μA}$$

**Step 3**: Q-point

$$I_{CQ} = \beta I_B = 200 \times 2.148 = 429.5 \text{ μA} \approx 0.43 \text{ mA}$$

$$V_{CEQ} = 10 - 0.4295 \times 4.7 - 0.4316 \times 1.7 = 10 - 2.019 - 0.734 = 7.25 \text{ V}$$

[[visual:q2-worked-example]]

> **Check**: $V_{CEQ} = 7.25$ V > $V_{CE(sat)} \approx 0.2$ V ✓ — the transistor is in the active region as assumed.

<details>
<summary><strong>Pause & Think</strong>: How do you verify that the BJT is actually in the active region after your analysis?</summary>

Check two conditions:
1. $V_{BE} > 0$ (forward-biased BE junction) ✓ — we assumed $V_{BE} = 0.64$ V
2. $V_{CE} > V_{CE(sat)} \approx 0.2$ V (BC junction reverse-biased) ✓ — we got $V_{CE} = 7.25$ V

If $V_{CE}$ came out negative or very small (< 0.2 V), the transistor would be in saturation, and our $I_C = \beta I_B$ assumption would be wrong. We'd need to redo the analysis using the saturation model.

</details>

## Circuit Design: Choosing Resistor Values (Q1 Approach)

Q1 asks you to **design** the circuit — choose $R_C$, $R_E$, $R_{B1}$, $R_{B2}$ to achieve given specifications ($I_E = 0.2$ mA, $V_E = +2$ V, $V_C = +5$ V).

### The Design Procedure

[[visual:design-procedure]]

**Given**: $I_E = 0.2$ mA, $V_E = 2$ V, $V_C = 5$ V, $V_{CC} = 9$ V, $\beta = 100$, $V_{BE} = 0.7$ V, $I_{B2} = 0.1$ mA.

**Step 1**: Find RE from VE and IE

$$R_E = \frac{V_E}{I_E} = \frac{2}{0.2 \times 10^{-3}} = 10 \text{ kΩ}$$

**Step 2**: Find RC from VC

$$I_C = \frac{\beta}{\beta + 1} I_E = \frac{100}{101} \times 0.2 = 0.198 \text{ mA}$$

$$R_C = \frac{V_{CC} - V_C}{I_C} = \frac{9 - 5}{0.198 \times 10^{-3}} = 20.2 \text{ kΩ}$$

**Step 3**: Find RB2 from IB2

$$V_B = V_E + V_{BE} = 2 + 0.7 = 2.7 \text{ V}$$

$$R_{B2} = \frac{V_B}{I_{B2}} = \frac{2.7}{0.1 \times 10^{-3}} = 27 \text{ kΩ}$$

**Step 4**: Find RB1

$$I_B = \frac{I_E}{\beta + 1} = \frac{0.2}{101} = 1.98 \text{ μA}$$

$$I_{B1} = I_{B2} + I_B = 0.1 + 0.00198 = 0.102 \text{ mA}$$

$$R_{B1} = \frac{V_{CC} - V_B}{I_{B1}} = \frac{9 - 2.7}{0.102 \times 10^{-3}} = 61.76 \text{ kΩ}$$

### Standard 5% Resistors

Real resistors come in standard values. The standard 5% E24 series includes:

$$10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91$$

(and multiples of 10)

For our values: $R_E = 10$ kΩ ✓ (exact), $R_C = 20$ kΩ ✓ (exact), $R_{B2} = 27$ kΩ ✓ (exact), $R_{B1} = 62$ kΩ (closest to 61.76 kΩ) ✓.

[[visual:standard-resistors]]

<details>
<summary><strong>Pause & Think</strong>: When you round to a standard 5% resistor, the Q-point shifts slightly. How much error can you tolerate?</summary>

With 5% resistors, values are at most 2.5% away from the calculated value. For $R_{B1}$: calculated 61.76 kΩ, using 62 kΩ — that's a 0.4% error. The Q-point will shift by a similar small percentage, which is perfectly acceptable.

The voltage-divider bias circuit is inherently tolerant to 5-10% resistor variations (that's the whole point of β-independent bias). So using standard values never causes problems.

</details>

## Summary

| Task | Procedure |
|------|-----------|
| **Q-point analysis** | Thevenin → KVL base loop → IB → IC = βIB → KVL collector loop → VCE |
| **Circuit design** | Given specs → calculate R values → round to standard 5% values |
| **Verify active region** | Check VCE > VCE(sat) ≈ 0.2V |

- **DC equivalent**: all capacitors open, remove AC source and load
- **KVL base loop**: $V_{Th} = I_B R_{Th} + V_{BE} + (\beta+1)I_B R_E$
- **KVL collector loop**: $V_{CC} = I_C R_C + V_{CE} + I_E R_E$
- **Standard 5% resistors**: E24 series (10, 11, 12, ..., 91 × 10ⁿ)

> Now you have all the DC tools. The next concept introduces the **h-parameter model** — the key to analysing the AC (small-signal) behaviour of BJT amplifiers.
