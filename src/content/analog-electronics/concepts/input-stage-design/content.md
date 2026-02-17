# Input Stage Design (Stage 1)

> **Why This Matters**: The input stage sets the overall gain, determines how much current the signal source must supply, and — most crucially — must provide exactly the right collector voltage to bias Stage 2 correctly. This is where the direct coupling chain comes together.

## What Stage 1 Must Deliver

From the output stage design, we know:

- $V_{C1} = V_{B2} \approx 10.7$ V — Stage 1's collector voltage must bias Q2's base
- $I_{CQ1} = I_{CQ2} / 10 = 2.43$ mA — design choice: 10:1 current ratio
- $V_{CEQ1} = 6$ V — same swing requirement as Stage 2

[[visual:input-stage-schematic]]

## Step 1: Finding R1 + R2

Apply KVL around the first stage's collector-emitter loop:

$$V_{CC} = I_{CQ1}(R_1 + R_2) + V_{CEQ1}$$

$$15 = 2.43 \times 10^{-3} \times (R_1 + R_2) + 6$$

$$R_1 + R_2 = \frac{15 - 6}{2.43 \times 10^{-3}} = 3704 \text{ Ω} \approx 3.7 \text{ kΩ}$$

[[visual:r1-r2-kvl-breakdown]]

Now, 3.7 kΩ can be split many ways between $R_1$ and $R_2$. Remember that $R_2$ serves a dual purpose — it is both a DC biasing resistor and an AC emitter degeneration resistor (in combination with $R_3$).

The professor chooses:

$$R_1 = 1.8 \text{ kΩ}, \quad R_2 = 1.8 \text{ kΩ}$$

Both are E12 values. Total: $1.8 + 1.8 = 3.6$ kΩ. This gives:

$$I_{CQ1} = \frac{V_{CC} - V_{CEQ1}}{R_1 + R_2} = \frac{9}{3600} = 2.5 \text{ mA}$$

> **Alternative**: You could choose $R_1 = 3.3$ kΩ and $R_2 = 270$ Ω. Or $R_1 = 2.2$ kΩ and $R_2 = 1.5$ kΩ. Each gives a slightly different total, slightly different $I_{CQ1}$, and different gain characteristics.

<details>
<summary><strong>Pause & Think</strong>: Why does the professor split R1 and R2 equally?</summary>

Equal splitting keeps the voltage drops balanced. With R1 = R2 = 1.8kΩ, each drops about 4.5V. This puts the collector of Q1 at about VCC - 4.5V = 10.5V, close to the target VB2 = 10.7V. The symmetry also simplifies the mental model of the circuit.

</details>

## Step 2: Finding R3 from the Gain Equation

[[visual:gain-equation-flowchart]]

From the AC analysis (Concept 2), the simplified gain is:

$$A_v = \frac{h_{fe2} \times R_5}{R_3}$$

With $A_v = 600$, $h_{fe2} = 220$, $R_5 = 220$ Ω:

$$R_3 = \frac{220 \times 220}{600} = 80.7 \text{ Ω}$$

**E12 selection**: Nearest values are 82 Ω and 68 Ω.

**The professor's recommendation**: Choose $R_3 = 68$ Ω rather than 82 Ω. The reasoning: since the simplified formula ignores $h_{ie2}$ (which loads Stage 1 and reduces gain), the actual gain will be **lower** than calculated. Picking a smaller $R_3$ gives a theoretical gain of:

$$A_v = \frac{220 \times 220}{68} = 711$$

This provides about 18% headroom to absorb the gain reduction from $h_{ie2}$ loading.

[[visual:r3-gain-headroom]]

## Step 3: Finding VB1 and IBQ1

With $I_{CQ1} = 2.5$ mA and the KVL around the base-emitter loop:

$$V_{B1} = V_{BE1} + I_{CQ1} \times R_2 = 0.66 + 2.5 \times 10^{-3} \times 1800 = 5.16 \text{ V}$$

Wait — the professor uses a different formulation. Let's be precise about the NPN circuit:

$$V_{B1} = V_{BE1} + I_{E1} \times R_2$$

Since $I_{E1} \approx I_{C1}$ (because $\beta \gg 1$):

$$V_{B1} \approx 0.66 + 2.5 \times 1.8 = 5.16 \text{ V}$$

But we also need to account for $R_3$ which is in series with $R_2$ at the emitter:

$$V_{B1} = V_{BE1} + I_{E1} \times (R_2 + R_3) = 0.66 + 2.5 \times 10^{-3} \times (1800 + 82) = 5.37 \text{ V}$$

The base current:

$$I_{BQ1} = \frac{I_{CQ1}}{h_{FE}} = \frac{2.5}{120} = 20.8 \text{ μA}$$

[[visual:stage1-voltage-distribution]]

## Step 4: Designing the Voltage Divider (Ra, Rb)

The voltage divider must set $V_{B1} \approx 5$ V. Two conditions must be satisfied:

**Condition 1 — Correct base voltage**:

$$V_{B1} = \frac{R_b}{R_a + R_b} \times V_{CC}$$

$$5 = \frac{R_b}{R_a + R_b} \times 15$$

$$\frac{R_b}{R_a + R_b} = \frac{1}{3}$$

So $R_a = 2 R_b$.

**Condition 2 — Stiff divider** (divider current $\gg I_{BQ1}$):

$$I_{\text{divider}} = \frac{V_{CC}}{R_a + R_b} \gg I_{BQ1} = 20.8 \text{ μA}$$

For 10× stiffness: $I_{\text{divider}} \geq 200$ μA, so:

$$R_a + R_b \leq \frac{15}{200 \times 10^{-6}} = 75 \text{ kΩ}$$

[[visual:voltage-divider-design]]

The professor chooses:

$$R_a = 33 \text{ kΩ}, \quad R_b = 15 \text{ kΩ}$$

Check: $R_a + R_b = 48$ kΩ $< 75$ kΩ ✓

Check: $V_{B1} = 15 \times 15/(33 + 15) = 4.69$ V (slightly below target — acceptable)

Check: $I_{\text{divider}} = 15/48000 = 312$ μA $\gg 20.8$ μA ✓

[[visual:falstad-full-circuit]]

## Step 5: Double-Checking with the Actual Values

Now that all resistors are chosen, recompute the exact operating points:

| Parameter | Target | Actual (with E12 resistors) |
|-----------|--------|---------------------------|
| $V_{B1}$ | 5.0 V | 4.69 V |
| $I_{CQ1}$ | 2.5 mA | 2.22 mA |
| $V_{CEQ1}$ | 6.0 V | 7.0 V |
| $V_{B2}$ | 10.7 V | 11.7 V |
| $I_{CQ2}$ | 25 mA | 24.3 mA |
| $A_v$ | 600 | ~590 (without $h_{ie2}$ correction) |

[[visual:target-vs-actual-comparison]]

The deviations are all within the 5% tolerance of E12 resistors. The voltage gain is 590 — nearly 600 — and within the acceptable range (570–630 for 5% tolerance). The design works.

> **The Art of Engineering**: Notice that no single value matches the target exactly. This is normal. Engineering design is not about hitting exact numbers — it's about meeting specifications within tolerance. A gain of 590 when you wanted 600 is a successful 1.7% error.

## Complete Resistor Summary

| Resistor | Value | Purpose |
|----------|-------|---------|
| $R_a$ | 33 kΩ | Base divider (upper) |
| $R_b$ | 15 kΩ | Base divider (lower) |
| $R_1$ | 1.8 kΩ | Stage 1 collector |
| $R_2$ | 1.8 kΩ | Stage 1 emitter (DC) |
| $R_3$ | 82 Ω (or 68 Ω) | Stage 1 emitter (AC gain-setting) |
| $R_4$ | 150 Ω | Stage 2 collector |
| $R_5$ | 220 Ω | Stage 2 emitter |

## Summary

- $R_1 + R_2$ is found from KVL: $(V_{CC} - V_{CEQ1})/I_{CQ1} \approx 3.6$ kΩ
- $R_3$ is the **gain-setting resistor**: $R_3 = h_{fe2} \times R_5 / A_v$
- The voltage divider ($R_a$, $R_b$) sets $V_{B1}$ and must be **stiff** ($I_{\text{div}} \gg I_{BQ1}$)
- After selecting all E12 values, **double-check** every node voltage and current — deviations within 5–10% are expected and acceptable
- The entire design is linked: change one resistor and everything downstream shifts
