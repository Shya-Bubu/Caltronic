## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **Why biasing is needed**: without DC bias, the BJT clips the input signal
- **Q-point**: the DC operating conditions $(V_{CEQ}, I_{CQ})$ with no signal
- **Notation**: capital letters for DC ($I_C$, $V_{CE}$), lowercase for AC ($i_c$, $v_{ce}$)
- **KVL** around a circuit loop
- **$I_C = \beta I_B$** in the active linear region

</details>

---

## Hook: The Simplest Bias Network

You now know *why* you need to bias a BJT — to keep it in the active region so it can amplify. The question becomes: **how** do you actually do it?

The simplest possible answer: connect a single resistor from $V_{CC}$ to the base. That's it. One resistor, one power supply, and the transistor has a DC base current.

This is called **fixed bias** — and it's where every engineer starts. It's beautifully simple to analyse, but (spoiler alert) it has a critical weakness that we'll uncover by the end of this concept.

[[visual:fixed-bias-schematic]]

---

## Circuit Analysis: Finding the Q-Point

The fixed bias circuit has only three external components: the bias resistor $R_1$, the collector resistor $R_C$, and the transistor itself. The emitter is connected directly to ground. Let's find the Q-point step by step.

### Step 1: Find $I_B$ (Base-Emitter Loop)

Apply KVL around the base-emitter loop. Starting from $V_{CC}$, going through $R_1$, through $V_{BE}$, to ground:

$$V_{CC} = I_B \cdot R_1 + V_{BE}$$

Rearranging for the base current:

$$\boxed{I_B = \frac{V_{CC} - V_{BE}}{R_1} = \frac{V_{CC} - 0.7}{R_1}}$$

[[visual:fixed-bias-be-loop]]

Notice something important: $I_B$ depends only on $V_{CC}$, $R_1$, and $V_{BE}$. It does **not** depend on $\beta$. This is why it's called "fixed" bias — the base current is fixed by the external components.

### Step 2: Find $I_C$ (Active Region)

In the active linear region, the collector current is simply:

$$\boxed{I_C = \beta \cdot I_B}$$

### Step 3: Find $V_{CE}$ (Collector-Emitter Loop)

Apply KVL around the collector-emitter loop. Starting from $V_{CC}$, through $R_C$, through $V_{CE}$, to ground:

$$V_{CC} = I_C \cdot R_C + V_{CE}$$

Rearranging:

$$\boxed{V_{CE} = V_{CC} - I_C \cdot R_C = V_{CC} - \beta I_B \cdot R_C}$$

[[visual:fixed-bias-ce-loop]]

### Step 4: State the Q-Point

The Q-point is:

$$Q = (V_{CEQ},\; I_{CQ}) = \left(V_{CC} - \beta I_B R_C,\; \beta I_B\right)$$

[[visual:fixed-bias-qpoint-calc-flow]]

> **Key Insight**: The entire Q-point calculation reduces to two KVL equations — one for the BE loop (gives $I_B$) and one for the CE loop (gives $V_{CE}$). Connected by $I_C = \beta I_B$.

---

## Worked Example

**Given:** $V_{CC} = 12$ V, $R_1 = 470$ kΩ, $R_C = 2.2$ kΩ, $\beta = 100$

**Step 1 — Base current:**

$$I_B = \frac{V_{CC} - V_{BE}}{R_1} = \frac{12 - 0.7}{470 \times 10^3} = \frac{11.3}{470{,}000} \approx 24\;\mu\text{A}$$

**Step 2 — Collector current:**

$$I_C = \beta I_B = 100 \times 24\;\mu\text{A} = 2.4\;\text{mA}$$

**Step 3 — Collector-emitter voltage:**

$$V_{CE} = V_{CC} - I_C R_C = 12 - (2.4 \times 10^{-3})(2.2 \times 10^3) = 12 - 5.28 = 6.72\;\text{V}$$

**Q-point:** $(V_{CEQ}, I_{CQ}) = (6.72\;\text{V},\; 2.4\;\text{mA})$

[[visual:fixed-bias-numerical-example]]

> **Pro Tip**: Always verify that the transistor is actually in the active region. Check: (1) $V_{BE} \approx 0.7$ V ✓, (2) $V_{CE} > V_{CE(sat)} \approx 0.2$ V → 6.72 V > 0.2 V ✓. If $V_{CE}$ comes out negative or less than 0.2 V, the transistor is in saturation, and $I_C = \beta I_B$ no longer holds.

<details>
<summary><strong>Pause & Think</strong>: What happens if β = 200 instead of 100 (same transistor type but different sample)?</summary>

With $\beta = 200$: $I_C = 200 \times 24\;\mu\text{A} = 4.8$ mA. Then $V_{CE} = 12 - 4.8 \times 2.2 = 12 - 10.56 = 1.44$ V. The Q-point has shifted dramatically — from (6.72 V, 2.4 mA) to (1.44 V, 4.8 mA). The transistor is now dangerously close to saturation. A factor-of-2 change in β caused a massive Q-point shift. This is the fundamental weakness of fixed bias.

</details>

---

## Finding the DC Equivalent Circuit

In a real amplifier circuit, you'll have coupling capacitors ($C_{in}$, $C_{out}$) and a signal source. To find the Q-point, you need the **DC equivalent circuit**, which you obtain by:

1. **Open-circuiting all capacitors** (at DC, $X_C = 1/\omega C = \infty$)
2. **Short-circuiting any inductors** (at DC, $X_L = \omega L = 0$)
3. The signal source disappears (it's behind the open-circuited capacitor)

What remains is only the DC bias network — exactly the circuit we just analysed.

[[visual:dc-equivalent-circuit]]

> **Watch Out**: Students often forget to open-circuit the capacitors before calculating the Q-point. If you leave $C_{in}$ in the circuit as a short circuit, you'll incorrectly include the signal source in your DC analysis and get the wrong bias conditions.

---

## The Critical Weakness: β Sensitivity

Here's the problem with fixed bias. Look at the Q-point equations:

$$I_C = \beta \cdot \frac{V_{CC} - 0.7}{R_1}$$

$$V_{CE} = V_{CC} - \beta \cdot \frac{V_{CC} - 0.7}{R_1} \cdot R_C$$

Both $I_C$ and $V_{CE}$ are **directly proportional to $\beta$**. The transistor's current gain $\beta$ is:

- **Not a precise value** — it varies widely between transistors of the same type (e.g., the datasheet might say $\beta = 100-300$)
- **Temperature-dependent** — $\beta$ increases with temperature

[[visual:beta-sensitivity-plot]]

This means:
- Replace the transistor with another one of the same type → Q-point changes
- Temperature rises → Q-point shifts
- The circuit designer has no control over where the Q-point ends up

[[visual:qpoint-shift-simulation]]

### The Thermal Runaway Problem

With fixed bias, there's a dangerous positive feedback loop:

$$\text{Temperature} \uparrow \;\rightarrow\; \beta \uparrow \;\rightarrow\; I_C \uparrow \;\rightarrow\; P = I_C \cdot V_{CE} \uparrow \;\rightarrow\; \text{Temperature} \uparrow \;\rightarrow\; \cdots$$

The power dissipation heats the junction, which increases $\beta$, which increases $I_C$, which increases power dissipation further. If the heat can't escape fast enough, the transistor burns out. This is called **thermal runaway**.

> **Common Mistake**: Thinking that fixed bias is "good enough" for simple circuits. In practice, fixed bias is almost never used alone because of β sensitivity and thermal runaway risk. It's a teaching circuit, not a practical one.

<details>
<summary><strong>Pause & Think</strong>: If fixed bias is so bad, why do we study it?</summary>

Two reasons: (1) It's the simplest bias circuit to analyse, so it builds the fundamental skills (KVL in BE and CE loops, Q-point calculation) that you'll use for *every* other bias circuit. (2) Understanding its weakness (β dependence) motivates the design of better circuits — you can't appreciate voltage divider bias unless you understand why fixed bias fails.

</details>

---

## Advantages and Disadvantages

[[visual:fixed-bias-advantages-disadvantages]]

| Feature | Fixed Bias |
|---------|-----------|
| **Components** | Minimum (1 resistor + $R_C$) |
| **Calculation difficulty** | Very easy — two KVL equations |
| **β sensitivity** | Very high — Q-point shifts linearly with β |
| **Temperature stability** | Poor — thermal runaway risk |
| **Practical usage** | Rare — used mainly for teaching |

---

## The Bias Resistor Design Equation

If you want to *design* a fixed bias circuit (choose $R_1$) to achieve a desired Q-point, work backwards:

1. Choose the desired $I_{CQ}$ (typically to centre the Q-point for maximum signal swing)
2. Calculate $I_{BQ} = I_{CQ} / \beta$
3. Calculate $R_1 = (V_{CC} - 0.7) / I_{BQ}$

**Example:** You want $I_{CQ} = 1$ mA with $\beta = 150$ and $V_{CC} = 10$ V.

$$I_{BQ} = \frac{1\;\text{mA}}{150} = 6.67\;\mu\text{A}$$

$$R_1 = \frac{10 - 0.7}{6.67\;\mu\text{A}} = \frac{9.3}{6.67 \times 10^{-6}} = 1.39\;\text{MΩ}$$

Choose the nearest standard value: $R_1 = 1.5$ MΩ.

[[visual:fixed-bias-ib-vs-r1]]

<details>
<summary><strong>Pause & Think</strong>: If you centre the Q-point at V_CE = V_CC/2, what is the maximum symmetric signal swing?</summary>

If $V_{CEQ} = V_{CC}/2$ and the transistor saturates at $V_{CE(sat)} \approx 0.2$ V, the maximum negative swing is $V_{CEQ} - V_{CE(sat)} = V_{CC}/2 - 0.2$ V, and the maximum positive swing is $V_{CC} - V_{CEQ} = V_{CC}/2$. The symmetric swing is limited by the smaller of these, which is $V_{CC}/2 - 0.2$ V. For $V_{CC} = 12$ V: max swing = $6 - 0.2 = 5.8$ V peak, or 11.6 V peak-to-peak.

</details>

---

## Summary

- **Fixed bias** uses a single resistor $R_1$ from $V_{CC}$ to the base
- **Q-point calculation**: $I_B = (V_{CC} - 0.7)/R_1$, then $I_C = \beta I_B$, then $V_{CE} = V_{CC} - I_C R_C$
- To get the **DC equivalent circuit**, open-circuit all capacitors and short-circuit all inductors
- The **critical weakness**: the Q-point depends directly on $\beta$, which varies between transistors and with temperature
- **Thermal runaway** is a risk because $\beta \uparrow \rightarrow I_C \uparrow \rightarrow P \uparrow \rightarrow T \uparrow \rightarrow \beta \uparrow$ — a dangerous positive feedback loop
- Fixed bias is rarely used in practice but is essential for building analysis skills
