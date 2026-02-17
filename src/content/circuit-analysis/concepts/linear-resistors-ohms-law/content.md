## The Linear Resistor: Your Foundation

Alright, let's build on what we just established. You now know that a "resistor" in circuit theory means any two-terminal device with a v-i relationship. The simplest and most important resistor is the one you already know — the **linear resistor**. It's the building block for everything that follows in circuit analysis, and we need to understand it with absolute precision before moving on to the more exotic devices.

You already know Ohm's law from A-Level. But now we need to go deeper — understanding not just the formula, but the **geometry** of the v-i curve, the relationship between resistance and conductance, and how the choice of plane (v-i vs i-v) changes the way we interpret slopes.

## Ohm's Law: Two Forms You Need to Be Fluent In

A linear resistor satisfies Ohm's law, which comes in two equivalent forms:

$$v(t) = R \cdot i(t) \qquad \text{(resistance form)}$$

$$i(t) = G \cdot v(t) \qquad \text{(conductance form)}$$

where:
- $R$ is the **resistance** in ohms ($\Omega$)
- $G = \frac{1}{R}$ is the **conductance** in siemens (S)
- $v(t)$ is the voltage across the resistor at time $t$
- $i(t)$ is the current through the resistor at time $t$

Both forms say the exact same thing, just from different angles. The resistance form says: "Given a current, the voltage is proportional." The conductance form says: "Given a voltage, the current is proportional."

Which form should you use? It depends on the situation. Here's a practical guide:

| Use resistance form $v = Ri$ when... | Use conductance form $i = Gv$ when... |
|---|---|
| You know the current and need to find the voltage | You know the voltage and need to find the current |
| Resistors are in **series** ($R_{total} = R_1 + R_2$) | Resistors are in **parallel** ($G_{total} = G_1 + G_2$) |
| Working with KVL (voltage around loops) | Working with nodal analysis (currents at nodes) |

That last row is a preview of what's coming in later lessons. In nodal analysis (Lesson 02), the conductance form is *much* more natural. Having both forms in your toolkit makes you more flexible.

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — You know that parallel resistors have 1/R_total = 1/R₁ + 1/R₂. But look at what conductance gives you: G_total = G₁ + G₂. Parallel conductances just <strong>add</strong>! <em>Why is the conductance version so much simpler?</em></summary>

Think about what "parallel" means physically — multiple paths for current. If each path has conductance $G$, the total conductance is just the sum of all paths. The conductance form maps directly to the physics. Series resistance adds because voltages add in a loop. Parallel conductance adds because currents add at a node. Duality again!

</details>

---

## The V-I Characteristic: Geometry of a Straight Line

Now let's see what Ohm's law looks like geometrically. The v-i characteristic of a linear resistor is a **straight line through the origin.** But the slope of that line depends on which plane you're plotting in, and this is where students trip up constantly.

### On the V-I Plane (v horizontal, i vertical)

From $i = Gv$, we see that $i$ is proportional to $v$ with proportionality constant $G$. So on the v-i plane:

$$\text{slope} = \frac{\Delta i}{\Delta v} = G = \frac{1}{R}$$

**Key insight**: A larger $R$ means a **shallower** slope (less current per volt). A smaller $R$ means a **steeper** slope (more current per volt). Let's visualize this with several different resistance values:

[[visual:multi-r-comparison]]

Look at the plot carefully:
- The **50Ω resistor** (steepest) lets the most current flow for a given voltage
- The **1kΩ resistor** (shallowest) barely lets any current through
- As $R \to \infty$, the slope $G \to 0$ and the line flattens to the v-axis — that's an **open circuit**
- As $R \to 0$, the slope $G \to \infty$ and the line becomes vertical — that's a **short circuit**

### On the I-V Plane (i horizontal, v vertical)

On the i-v plane, from $v = Ri$:

$$\text{slope} = \frac{\Delta v}{\Delta i} = R$$

Now a larger $R$ means a **steeper** slope — the opposite of what we saw on the v-i plane! This can be very confusing if you don't keep track of which plane you're on.

[[visual:vi-vs-iv-plane]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — A student sees a v-i curve and says "the slope is R." Without even looking at the graph, you should already be suspicious. <em>Why?</em></summary>

Because on the v-i plane, the slope is $\Delta i / \Delta v = G = 1/R$, not $R$. The slope is only $R$ on the i-v plane. This is one of the most common exam mistakes.

**Golden rule**: Look at the axes first. Slope = rise/run. What's on the y-axis divided by what's on the x-axis. Always.

</details>

---

## Numerical Example — Building Intuition

Let's work through a concrete example with a **100Ω resistor** to make sure the numbers feel real:

| Applied voltage $v$ | Current $i = v/R$ | Power $p = vi$ |
|---|---|---|
| $5\text{V}$ | $50\text{mA}$ | $250\text{mW}$ |
| $-3\text{V}$ | $-30\text{mA}$ | $90\text{mW}$ |
| $0\text{V}$ | $0\text{mA}$ | $0\text{mW}$ |
| $1\text{V}$ | $10\text{mA}$ | $10\text{mW}$ |

Notice the negative signs in the second row. When $v = -3$V, the current is $-30$mA. The negative signs don't mean anything scary — they just mean the voltage polarity is reversed and the current flows in the opposite direction from the reference. The resistor doesn't care which way current flows; it works identically in both directions. This is what makes it **bilateral**.

[[visual:numerical-points]]

[[visual:vs-plus-r-circuit]]

## Associated Reference Direction

Before we go further, let's lock down a convention that's absolutely critical for the rest of the course. In circuit theory, we use the **associated reference direction** (also called the passive sign convention):

- The current arrow points **into** the terminal marked with the **positive** voltage

This means:
- When both $v > 0$ and $i > 0$ → the device is **absorbing** power
- When $v$ and $i$ have opposite signs → be careful with interpretation

Every equation we write — Ohm's law, power, KVL, KCL — assumes this convention. If someone draws the current going in the opposite direction, all the signs flip. Always check.

[[visual:associated-reference-direction]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — You now know a linear resistor is bilateral — its v-i curve is symmetric about the origin. <em>Can you think of a two-terminal device that is NOT bilateral? A device where the v-i curve is NOT symmetric about the origin?</em></summary>

Hint: think about a device that only lets current flow in one direction...

Yes — a **diode**! Its v-i curve is very different for positive and negative voltages. Forward-biased: current flows freely. Reverse-biased: almost zero current. We'll study it in detail soon.

</details>

---

## Properties of the Linear Resistor — The Complete Picture

Let me organize everything we've discussed into a clean property table:

| Property | What it means | Why it matters |
|----------|--------------|----------------|
| **Linear** | $v = Ri$ — proportional relationship, straight-line v-i curve | Superposition applies; analysis is simpler |
| **Bilateral** | Curve is symmetric about the origin: $f(v,i) = f(-v,-i)$ | Works the same regardless of current direction |
| **Passive** (if $R > 0$) | v-i curve lies in Q1 and Q3; always absorbs power | Cannot deliver energy to the circuit |
| **Time-invariant** | $R$ doesn't change over time | Same behavior today, tomorrow, always |
| **Memoryless** | $i(t)$ depends only on $v(t)$ at that same instant | No history dependence (unlike capacitors/inductors) |

That last property — **memoryless** — is the one that separates resistors from capacitors and inductors. A capacitor's current depends on $dv/dt$ (rate of change). An inductor's voltage depends on $di/dt$. A resistor has no memory of the past; it responds only to what's happening right now.

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — You've seen five properties of a linear resistor. Now imagine a device that is <strong>non</strong>linear, <strong>not</strong> bilateral, and <strong>not</strong> passive. <em>Does such a device exist? Would it still be a "resistor" under the circuit theory definition?</em></summary>

Absolutely! As long as there's a v-i relationship $f(v,i) = 0$, it's a resistor. A tunnel diode, for instance, has a nonlinear, non-bilateral, partially active v-i curve — and it's still a two-terminal resistor. You'll meet it in a few concepts.

</details>

---

[[visual:ohms-law-explorer]]

[[visual:interactive-vi-slope]]

## Physical Modelling — When Does the Linear Model Break?

For most physical resistors made of metallic material, the linear model $v = Ri$ is remarkably accurate over a large operating range. This is why the linear resistor dominates engineering practice — the model is simple, accurate, and widely applicable.

But the linear model does break under certain conditions:
- **Excessive current**: High current causes heating, which changes $R$ (temperature coefficient)
- **Excessive voltage**: Can cause breakdown or arcing
- **Very high frequencies**: Parasitic inductance and capacitance become significant

For this course, we almost always assume the linear model holds. But as you'll see starting with the next few concepts, many important devices — diodes, tunnel diodes, varistors — have v-i characteristics that are decidedly **not** straight lines. That's where the real fun of circuit analysis begins.

## Key Formulas — Your Quick Reference

$$v = Ri \qquad i = Gv \qquad G = \frac{1}{R} \qquad R = \frac{1}{G}$$

$$\text{v-i plane slope} = G = \frac{1}{R} \qquad \text{i-v plane slope} = R$$

$$\text{Parallel: } G_{total} = G_1 + G_2 \qquad \text{Series: } R_{total} = R_1 + R_2$$

[[visual:falstad-voltage-divider]]

These are foundational. Every concept that follows builds on them.

Nice work getting through this one — you now have the full picture of the linear resistor, not just the A-Level snapshot. Let's keep building. 🚀
