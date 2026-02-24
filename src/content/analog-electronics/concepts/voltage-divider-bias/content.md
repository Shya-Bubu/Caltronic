## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **Fixed bias**: $I_B = (V_{CC} - 0.7)/R_1$, and its β-sensitivity problem
- **Q-point**: $(V_{CEQ}, I_{CQ})$ — the DC operating conditions
- **KVL** around loops
- **Thévenin's theorem**: any linear network seen from two terminals can be replaced by $V_{TH}$ in series with $R_{TH}$

</details>

---

## Hook: The Bias Circuit That Actually Works

Fixed bias is simple, but its Q-point drifts wildly with β changes. In practice, engineers need a circuit where the Q-point is **nearly independent of β** — so you can swap transistors, tolerate temperature changes, and still get predictable amplification.

The solution is **voltage divider bias** (also called potential divider bias). It's the workhorse of transistor biasing — the circuit you'll see in virtually every discrete BJT amplifier.

[[visual:vdb-circuit-schematic]]

---

## Circuit Architecture

The voltage divider bias circuit has four resistors:
- **$R_1$** and **$R_2$**: form a voltage divider from $V_{CC}$ to ground, setting the base voltage
- **$R_C$**: the collector load resistor (same as before)
- **$R_E$**: an **emitter resistor** — this is the key addition that provides stability

The voltage divider $R_1$-$R_2$ establishes a relatively stable voltage at the base. The emitter resistor $R_E$ then provides **negative feedback** that keeps the Q-point from drifting.

---

## Step 1: Thévenin Equivalent of the Bias Network

The $R_1$-$R_2$ divider with $V_{CC}$ is a linear two-terminal network seen from the base. We can replace it with its Thévenin equivalent:

**Thévenin voltage** (open-circuit voltage at the base):

$$\boxed{V_{TH} = \frac{R_2}{R_1 + R_2} \cdot V_{CC}}$$

**Thévenin resistance** (with $V_{CC}$ shorted):

$$\boxed{R_{TH} = R_1 \| R_2 = \frac{R_1 \cdot R_2}{R_1 + R_2}}$$

[[visual:thevenin-conversion]]

> **Why Thévenin?** Without this simplification, you'd need to account for the current split at the base node — part goes into R₂, part goes into the base. Thévenin collapses the entire divider into one voltage source and one resistor, making the KVL analysis clean and straightforward.

---

## Step 2: Find $I_B$ from the Base-Emitter Loop

With the Thévenin equivalent, apply KVL around the base-emitter loop:

$$V_{TH} = I_B \cdot R_{TH} + V_{BE} + I_E \cdot R_E$$

Since $I_E = (1 + \beta)I_B \approx (\beta + 1)I_B$:

$$V_{TH} = I_B \cdot R_{TH} + 0.7 + (1 + \beta)I_B \cdot R_E$$

$$V_{TH} - 0.7 = I_B \left[R_{TH} + (1 + \beta)R_E\right]$$

$$\boxed{I_B = \frac{V_{TH} - 0.7}{R_{TH} + (1 + \beta)R_E}}$$

[[visual:vdb-be-loop-kvl]]

<details>
<summary><strong>Pause & Think</strong>: Look at the denominator. What happens when $(1+\beta)R_E \gg R_{TH}$?</summary>

When $(1+\beta)R_E \gg R_{TH}$, the $R_{TH}$ term becomes negligible and:

$$I_B \approx \frac{V_{TH} - 0.7}{(1+\beta)R_E}$$

Then $I_C = \beta I_B \approx \frac{\beta}{1+\beta} \cdot \frac{V_{TH} - 0.7}{R_E} \approx \frac{V_{TH} - 0.7}{R_E}$

The collector current **no longer depends on β!** It depends only on $V_{TH}$ and $R_E$ — both of which are set by fixed resistors. This is the key design insight.

</details>

---

## Step 3: Find $I_C$ and $V_{CE}$

$$I_C = \beta I_B$$

Apply KVL around the collector-emitter output loop:

$$V_{CC} = I_C R_C + V_{CE} + I_E R_E \approx I_C R_C + V_{CE} + I_C R_E$$

(approximating $I_E \approx I_C$ since $\beta \gg 1$)

$$\boxed{V_{CE} = V_{CC} - I_C(R_C + R_E)}$$

The Q-point is $Q = (V_{CEQ}, I_{CQ})$.

---

## Worked Example (from the lecture)

**Given:** $V_{CC} = 10$ V, $R_1 = R_2 = 56$ kΩ, $R_C = 10$ kΩ, $R_E = 20.24$ kΩ (≈ 20 kΩ), $\beta = 50$

**Thévenin equivalent:**

$$V_{TH} = \frac{56}{56 + 56} \times 10 = 5\;\text{V}$$

$$R_{TH} = \frac{56 \times 56}{56 + 56} = 28\;\text{kΩ}$$

**Base current:**

$$I_B = \frac{5 - 0.7}{28\text{k} + 51 \times 20\text{k}} = \frac{4.3}{28\text{k} + 1020\text{k}} = \frac{4.3}{1048\text{k}} \approx 4.1\;\mu\text{A}$$

> **Pro Tip**: Notice that $51 \times 20\text{k} = 1020\text{k}$ dominates the denominator. The $28\text{k}$ is less than 3% of the total. As an engineer, you can approximate: $I_B \approx 4.3 / 1000\text{k} = 4.3\;\mu\text{A}$. Within 5% — perfectly acceptable given that resistors themselves are 5% tolerance.

**Collector current and Q-point:**

$$I_C = 50 \times 4.1\;\mu\text{A} = 205\;\mu\text{A}$$

$$V_{CE} = 10 - 205\;\mu\text{A} \times (10\text{k} + 20\text{k}) = 10 - 6.15 = 3.85\;\text{V}$$

$$Q = (3.85\;\text{V},\; 205\;\mu\text{A})$$

[[visual:vdb-worked-example]]

---

## Why This Is Stable: Negative Feedback via $R_E$

The emitter resistor creates a **negative feedback loop** that counteracts temperature-driven β changes:

### Without $R_E$ (Fixed Bias): Positive Feedback → Thermal Runaway

[[visual:thermal-runaway-loop]]

$$T \uparrow \;\rightarrow\; \beta \uparrow \;\rightarrow\; I_C \uparrow \;\rightarrow\; P \uparrow \;\rightarrow\; T \uparrow \;\rightarrow\; \text{RUNAWAY}$$

### With $R_E$: Negative Feedback → Self-Correction

[[visual:negative-feedback-re]]

$$T \uparrow \;\rightarrow\; \beta \uparrow \;\rightarrow\; I_C \uparrow \;\rightarrow\; I_E \uparrow \;\rightarrow\; V_E = I_E R_E \uparrow$$

$$\rightarrow\; V_{BE} = V_B - V_E \downarrow \;\rightarrow\; I_B \downarrow \;\rightarrow\; I_C \downarrow\;\text{(counteracts!)}$$

The base voltage $V_B$ is held approximately constant by the voltage divider. When $I_C$ tries to increase, $V_E$ rises but $V_B$ stays the same, so $V_{BE}$ *decreases*. This reduces $I_B$, which reduces $I_C$ — opposing the original increase. The Q-point self-corrects.

> **Key Insight**: This is **negative feedback** — the same principle used in op-amp circuits, control systems, and biological regulation. The emitter resistor "senses" the output current and feeds back a signal that opposes changes. It's one of the most powerful ideas in all of engineering.

<details>
<summary><strong>Pause & Think</strong>: What would happen if you bypass R_E with a capacitor?</summary>

At DC, the capacitor is an open circuit, so $R_E$ still provides DC stability — the Q-point is unaffected. At signal frequencies, the capacitor shorts out $R_E$, removing the negative feedback for AC signals. This is actually desirable: $R_E$ stabilises the DC bias but reduces the AC gain. Bypassing it with a capacitor gives you the best of both worlds: stable Q-point AND high AC gain.

</details>

---

## Stability Comparison

[[visual:stability-comparison-plot]]

The plot shows $I_{CQ}$ vs β for both bias circuits. Fixed bias: $I_C$ shoots up linearly. Voltage divider with $R_E$: $I_C$ is nearly flat — a massive improvement.

---

## The $R_E$ Trade-Off

Larger $R_E$ means better stability — but there's a cost. The voltage dropped across $R_E$ (which is $I_E \cdot R_E$) "uses up" part of $V_{CC}$, leaving less headroom for $V_{CE}$ and the signal swing:

$$V_{CE} = V_{CC} - I_C R_C - I_E R_E$$

If $R_E$ is too large, $V_{CE}$ becomes small and the transistor has no room to swing without hitting saturation.

[[visual:re-tradeoff-plot]]

> **Design rule of thumb**: Allocate roughly $V_{CC}/3$ across $R_C$, $V_{CC}/3$ across $V_{CE}$, and $V_{CC}/3$ across $R_E$. This gives a good balance between stability and signal swing.

---

## Interactive: Design Your Own VDB Circuit

[[visual:vdb-design-sim]]

Adjust $R_1$, $R_2$, and $R_E$ in the interactive above. Sweep β from 50 to 300 and observe:
- How much does $I_C$ change? (Compare to fixed bias)
- What happens when $(1+\beta)R_E \gg R_{TH}$?
- Where's the sweet spot for $R_E$ — small enough for good swing, large enough for stability?

---

## Fixed Bias vs Voltage Divider Bias

[[visual:vdb-vs-fixed-summary]]

| Feature | Fixed Bias | Voltage Divider Bias |
|---------|-----------|---------------------|
| Components | 1 resistor + $R_C$ | 4 resistors ($R_1, R_2, R_C, R_E$) |
| β sensitivity | **High** — $I_C \propto \beta$ | **Low** — $I_C \approx (V_{TH}-0.7)/R_E$ |
| Thermal stability | Poor (thermal runaway) | Good ($R_E$ feedback) |
| Calculation | Easy (2 equations) | Medium (Thévenin + KVL) |
| Practical use | Teaching only | **Industry standard** |

<details>
<summary><strong>Pause & Think</strong>: In the exact I_B formula, what's the condition for β-independence?</summary>

From $I_B = (V_{TH} - 0.7) / [R_{TH} + (1+\beta)R_E]$:

$I_C = \beta I_B = \frac{\beta(V_{TH}-0.7)}{R_{TH} + (1+\beta)R_E}$

For this to be β-independent, we need $(1+\beta)R_E \gg R_{TH}$. Then $I_C \approx \frac{\beta}{1+\beta} \cdot \frac{V_{TH}-0.7}{R_E} \approx \frac{V_{TH}-0.7}{R_E}$.

Rule of thumb: $(1+\beta)R_E > 10 \cdot R_{TH}$ ensures less than 10% sensitivity to β.

</details>

---

## Summary

- **Voltage divider bias** uses $R_1$-$R_2$ to set $V_B$ and $R_E$ for negative feedback
- **Thévenin equivalent**: $V_{TH} = R_2 V_{CC}/(R_1+R_2)$, $R_{TH} = R_1 \| R_2$
- **Q-point**: $I_B = (V_{TH}-0.7)/[R_{TH}+(1+\beta)R_E]$, then $I_C = \beta I_B$, $V_{CE} = V_{CC} - I_C(R_C+R_E)$
- $R_E$ provides **negative feedback**: if $I_C$ rises, $V_E$ rises, $V_{BE}$ drops, $I_B$ drops, $I_C$ falls back — self-correcting
- When $(1+\beta)R_E \gg R_{TH}$, the Q-point becomes **nearly independent of β** — the holy grail of bias design
- **Trade-off**: larger $R_E$ = better stability but less voltage swing headroom
