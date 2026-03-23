# Feedback Amplifier Analysis: Step-by-Step Examples

> **Why This Matters**: Everything you've learned so far — the topologies, the impedance formulas, the gain equations — now comes together when you analyze a *real circuit*. This is where exam questions live. The professor showed two full examples in the lectures: a PNP emitter follower (series-shunt) and a two-stage common-emitter amplifier with feedback (also series-shunt). Let's go through both systematically, step by step, so you can master the analysis procedure.

## The Systematic Analysis Procedure

Before diving into the examples, here's the **6-step procedure** your professor outlined for analyzing any feedback amplifier circuit:

### Step 1: Identify the Feedback Topology

Use the algorithm we learned:
1. Find the feedback element
2. Check output connection → voltage (shunt) or current (series) sampling
3. Check input connection → voltage (series) or current (shunt) mixing
4. Name the topology

### Step 2: Calculate the Feedback Factor $\beta$

Determine $\beta = X_f / X_o$ using the feedback network alone (disconnect the amplifier from the feedback network mentally).

### Step 3: Draw the Amplifier Circuit Without Feedback

"Break" the feedback loop to find the open-loop amplifier:
- Replace the feedback network with its **loading effects** (the input-side impedance and output-side impedance of the feedback network stay connected, but the feedback signal path is broken)
- For series connections at input: the feedback network presents a **series impedance** at the input
- For shunt connections at input: the feedback network presents a **parallel impedance** at the input
- Same logic at the output

### Step 4: Calculate the Open-Loop Gain $A$

Analyze the amplifier (without the feedback connection) using the **small-signal model** (hybrid-π model). Calculate the appropriate gain ($A_V$, $G_M$, $R_M$, or $A_I$).

### Step 5: Calculate the Closed-Loop Gain $A_f$

$$A_f = \frac{A}{1 + A\beta}$$

### Step 6: Calculate Impedances with Feedback

Apply the impedance formulas based on the topology:
- $R_{if}$ and $R_{of}$ using the series/shunt multiplication/division rules

[[visual:analysis-procedure-flowchart]]

---

## Example 1: PNP Emitter Follower (Series-Shunt Feedback)

### The Circuit

[[visual:pnp-emitter-follower-circuit]]

Consider a PNP emitter follower with:
- $R_S = 10\,\text{k}\Omega$ (source resistance)
- $R_E = 4.7\,\text{k}\Omega$ (emitter resistor)
- $R_L = 4.7\,\text{k}\Omega$ (load resistance)
- Transistor parameters: $h_{fe} = 50$, $h_{ie} = 1.1\,\text{k}\Omega$

(These are the values from the lecture. Remember, for a PNP transistor, the current directions are reversed compared to NPN, but the small-signal analysis is the same!)

### Step 1: Identify the Topology

The feedback element is $R_E$. Let's check:

**At the output**: The output voltage $V_o$ appears across $R_E$, and the feedback element ($R_E$ itself) is connected directly across this voltage → **Shunt sampling** (voltage output).

**At the input**: The voltage across $R_E$ (which is $V_f$) appears in the base-emitter KVL loop: $V_S = V_{BE} + V_f$, so the feedback is in series with the input → **Series mixing** (voltage input).

**Topology**: **Series-Shunt** → Voltage amplifier ✓

This makes sense! An emitter follower is indeed a voltage amplifier (with gain close to 1).

### Step 2: Calculate $\beta$

For the feedback network, we need to find $\beta = V_f / V_o$.

In this circuit, the output voltage $V_o$ is taken across the parallel combination of $R_E$ and $R_L$. But the feedback voltage $V_f$ is the *same* voltage — it's the voltage at the emitter, which is $V_o$ itself.

$$\beta = \frac{V_f}{V_o} = 1$$

Wait — $\beta = 1$? Yes! In an emitter follower, 100% of the output is fed back. This is maximum feedback, and it's why the gain is close to 1.

### Step 3: Draw the Circuit Without Feedback

To find the open-loop amplifier:
- At the output: Since feedback is shunt (voltage) sampling, replacing the feedback network with its loading effect means keeping $R_E$ connected to ground (it loads the output, as it's connected across $V_o$).
- At the input: Since feedback is series (voltage) mixing, the feedback network adds a series impedance. In this case, looking into the feedback network from the input side, we see $R_E \| R_L$ (the parallel combination, since $R_L$ is across $R_E$ from the output side's perspective).

The small-signal equivalent circuit without feedback has:
- Input: $V_i$ across $h_{ie}$ (the base-emitter resistance of the transistor)
- Output: The controlled current source $h_{fe} \cdot I_b$ flowing through $R_E \| R_L$

[[visual:pnp-open-loop-small-signal]]

### Step 4: Calculate Open-Loop Gain $A_V$

Using the small-signal model:

$$I_b = \frac{V_i}{h_{ie}}$$

The output voltage (across $R_E \| R_L$):

$$V_o = h_{fe} \cdot I_b \cdot (R_E \| R_L) = h_{fe} \cdot \frac{V_i}{h_{ie}} \cdot (R_E \| R_L)$$

The load resistance seen by the transistor:
$$R_E \| R_L = \frac{4700 \times 4700}{4700 + 4700} = 2350\,\Omega$$

Therefore:
$$A_V = \frac{V_o}{V_i} = \frac{h_{fe} \cdot (R_E \| R_L)}{h_{ie}} = \frac{50 \times 2350}{1100} \approx 106.8$$

Also, the input resistance of the open-loop amplifier:
$$R_i = h_{ie} = 1.1\,\text{k}\Omega$$

And the output resistance (looking back into the emitter from the output):
$$R_o = R_E \| \frac{h_{ie} + R_S}{h_{fe} + 1} = 4700 \| \frac{1100 + 10000}{51}$$

$$\frac{h_{ie} + R_S}{h_{fe}+1} = \frac{11100}{51} = 217.6\,\Omega$$

$$R_o = 4700 \| 217.6 = \frac{4700 \times 217.6}{4700 + 217.6} \approx 208\,\Omega$$

### Step 5: Calculate Closed-Loop Gain

The desensitivity factor:
$$D = 1 + A_V \beta = 1 + 106.8 \times 1 = 107.8$$

Closed-loop gain:
$$A_{Vf} = \frac{A_V}{D} = \frac{106.8}{107.8} \approx 0.99$$

The gain is approximately **0.99** — essentially unity, as expected for an emitter follower! This confirms that the emitter follower is indeed a unity-gain voltage buffer.

### Step 6: Calculate Impedances with Feedback

**Input impedance** (series mixing → multiplied by $D$):

$$R_{if} = R_i \times D = 1100 \times 107.8 \approx 118.6\,\text{k}\Omega$$

The input impedance jumped from 1.1 kΩ to about 119 kΩ — a massive increase! This is why emitter followers are used as input buffers.

**Output impedance** (shunt sampling → divided by $D$):

$$R_{of} = \frac{R_o}{D} = \frac{208}{107.8} \approx 1.93\,\Omega$$

The output impedance dropped from 208 Ω to under 2 Ω! This is why emitter followers can drive low-impedance loads.

[[visual:pnp-results-summary]]

<details>
<summary><strong>Pause & Think</strong>: Do these results make physical sense?</summary>

Absolutely! The emitter follower is known for:
- Gain ≈ 1 → we got 0.99 ✓
- Very high input impedance → we got ~119 kΩ (from 1.1 kΩ) ✓
- Very low output impedance → we got ~2 Ω (from 208 Ω) ✓

The feedback analysis perfectly reproduces what we know intuitively about the emitter follower. This is a great validation that our systematic procedure works!

</details>

---

## Example 2: Two-Stage CE Amplifier with Feedback

### The Circuit

[[visual:two-stage-ce-feedback-circuit]]

Consider a two-stage common-emitter amplifier where:
- Stage 1: BJT with $h_{fe} = 50$, $h_{ie} = 1.1\,\text{k}\Omega$, $R_{C1} = 4.7\,\text{k}\Omega$
- Stage 2: BJT with $h_{fe} = 50$, $h_{ie} = 1.1\,\text{k}\Omega$, $R_{C2} = 4.7\,\text{k}\Omega$
- Load: $R_L = 4.7\,\text{k}\Omega$
- Feedback resistor: $R_f = 47\,\text{k}\Omega$ connected from the collector of Q2 back to the emitter of Q1
- Emitter resistor of Q1: $R_{E1} = 0.47\,\text{k}\Omega$
- Source resistance: $R_S = 10\,\text{k}\Omega$

### Step 1: Identify the Topology

The feedback element is $R_f$ (47 kΩ).

**At the output**: $R_f$ connects to the collector of Q2, which is the output voltage node → **Shunt sampling** (voltage output).

**At the input**: $R_f$ connects to the emitter of Q1, which is in the KVL loop (not directly to the base node). The voltage across $R_{E1}$ (due to feedback current through $R_f$) adds in series with $V_{BE}$ → **Series mixing** (voltage input).

**Topology**: **Series-Shunt** → Voltage amplifier ✓

### Step 2: Calculate $\beta$

The feedback network consists of $R_f$ and $R_{E1}$ forming a voltage divider. The feedback voltage $V_f$ appears across $R_{E1}$, and the output voltage $V_o$ appears across the whole chain ($R_f + R_{E1}$):

$$\beta = \frac{V_f}{V_o} = \frac{R_{E1}}{R_f + R_{E1}} = \frac{470}{47000 + 470} = \frac{470}{47470} \approx 0.0099$$

So $\beta \approx 0.01$.

### Step 3: Draw the Circuit Without Feedback

For the open-loop analysis, we need to account for the loading effects of the feedback network:

**At the input (series mixing)**: The feedback network presents $R_{E1}$ in series with the emitter of Q1 (it's always there, feedback or not). Additionally, looking from the input into the feedback resistor towards the output, we see $R_f$ in series, but since $R_f \gg R_{E1}$, the main loading is from $R_{E1}$.

**At the output (shunt sampling)**: The feedback resistor $R_f$ appears in parallel with the output, but since $R_f = 47\,\text{k}\Omega \gg R_{C2} = 4.7\,\text{k}\Omega$, its loading effect is relatively small.

[[visual:two-stage-open-loop-model]]

### Step 4: Calculate Open-Loop Gain $A_V$

**Stage 1 Analysis:**

For Q1 with $R_{E1}$ unbypassed (since the feedback connection goes through $R_{E1}$):

$$A_{V1} = \frac{-h_{fe} \cdot R_{C1}}{h_{ie} + (1+h_{fe}) \cdot R_{E1}}$$

But wait — we also need to account for the loading of Stage 2 on Stage 1. The input impedance of Stage 2 is $h_{ie2} = 1.1\,\text{k}\Omega$, which appears in parallel with $R_{C1}$:

Effective collector load of Stage 1: $R_{C1,eff} = R_{C1} \| h_{ie2} = 4700 \| 1100 = \frac{4700 \times 1100}{5800} \approx 891\,\Omega$

$$A_{V1} = \frac{-50 \times 891}{1100 + 51 \times 470} = \frac{-44550}{1100 + 23970} = \frac{-44550}{25070} \approx -1.78$$

Notice how $R_{E1}$ severely reduces the gain of Stage 1! Without feedback ($R_{E1}$ bypassed), $A_{V1}$ would be much larger.

**Stage 2 Analysis:**

For Q2 (no emitter degeneration in this stage):

Effective collector load: $R_{C2,eff} = R_{C2} \| R_L \| R_f = 4700 \| 4700 \| 47000$

$$R_{C2} \| R_L = 2350\,\Omega$$
$$2350 \| 47000 \approx 2350 \times \frac{47000}{49350} \approx 2238\,\Omega$$

$$A_{V2} = \frac{-h_{fe} \cdot R_{C2,eff}}{h_{ie}} = \frac{-50 \times 2238}{1100} \approx -101.7$$

**Overall Open-Loop Gain:**

$$A_V = A_{V1} \times A_{V2} = (-1.78) \times (-101.7) \approx 181$$

(The two negative signs cancel — both stages invert, so the overall amplifier is non-inverting, which is required for the negative feedback loop to work correctly!)

### Step 5: Calculate Closed-Loop Gain

$$D = 1 + A_V \beta = 1 + 181 \times 0.0099 \approx 1 + 1.79 \approx 2.79$$

$$A_{Vf} = \frac{A_V}{D} = \frac{181}{2.79} \approx 64.9$$

Alternatively, for large $A\beta$: $A_{Vf} \approx \frac{1}{\beta} = \frac{1}{0.0099} \approx 101$

But our $A\beta = 1.79$ is not very large (it's less than 10), so we can't use the approximation. The exact value $A_{Vf} \approx 64.9$ is significantly different from $1/\beta \approx 101$. This tells us we need more loop gain for the approximation to be good.

### Step 6: Calculate Impedances

**Input impedance** (series mixing):

First, the open-loop input impedance is the impedance seen at Stage 1's base:
$$R_i = h_{ie} + (1+h_{fe}) \cdot R_{E1} = 1100 + 51 \times 470 \approx 25.07\,\text{k}\Omega$$

(Notice how $R_{E1}$ already boosts the input impedance even without feedback!)

With feedback:
$$R_{if} = R_i \times D = 25.07 \times 2.79 \approx 69.9\,\text{k}\Omega$$

**Output impedance** (shunt sampling):

The open-loop output impedance is primarily $R_{C2}$:
$$R_o \approx R_{C2} = 4.7\,\text{k}\Omega$$

With feedback:
$$R_{of} = \frac{R_o}{D} = \frac{4700}{2.79} \approx 1684\,\Omega$$

[[visual:two-stage-results-summary]]

### Key Observations from This Example

1. **Phase matters**: Two CE stages give $180° + 180° = 360°$ phase shift = no inversion overall. The feedback from output to emitter (which is the inverting terminal) then provides negative feedback. If we had only one CE stage, the output would be inverted and the same feedback connection would give *positive* feedback (bad!).

2. **Loading effects are important**: The input impedance of Stage 2 loads the output of Stage 1 significantly ($R_{C1}$ goes from 4.7 kΩ to effectively 891 Ω). This is a real-world effect that textbook formulas sometimes omit.

3. **The loop gain determines quality**: Our $A\beta \approx 1.79$ is modest. For better gain stability, we'd want $A\beta \gg 1$, which would require either more stages (more open-loop gain) or larger $\beta$ (but that means even lower closed-loop gain).

4. **$R_{E1}$ plays a dual role**: It provides local feedback *within* Stage 1 (emitter degeneration), and it's also part of the overall feedback network. Both effects reduce Stage 1's gain.

## Summary

- **6-step procedure**: (1) Identify topology, (2) Find $\beta$, (3) Draw open-loop circuit with loading, (4) Calculate $A$, (5) Calculate $A_f$, (6) Calculate impedances
- **Loading effects matter**: The feedback network loads both the input and output of the amplifier. Account for this when calculating the open-loop gain.
- **Phase check**: For negative feedback, the total phase around the loop must be 0° (or 360°). Two inverting stages give 360° total.
- **PNP emitter follower**: Series-Shunt with $\beta = 1$, gain ≈ 1, massive impedance improvements
- **Two-stage CE**: Series-Shunt with $\beta \approx 0.01$, moderate feedback ($D \approx 2.8$), useful impedance improvements
- **When $A\beta$ is modest**: You can't use the approximation $A_f \approx 1/\beta$. Use the exact formula $A_f = A/(1+A\beta)$.
