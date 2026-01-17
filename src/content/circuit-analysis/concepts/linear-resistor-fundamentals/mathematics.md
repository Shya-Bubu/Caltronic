# Mathematical Foundations: Linear Resistors

> Let's rigorously derive and understand the mathematics behind Ohm's Law.

---

## Starting from Algebra: What IS a Linear Relationship?

From A-Level maths, you know that a **linear function** has the form:
$$y = mx + c$$

Where:
- $m$ = slope (rate of change)
- $c$ = y-intercept (value when x = 0)

**For Ohm's Law:**
$$V = R \cdot I + 0$$

Comparing:
- $y \to V$ (voltage)
- $x \to I$ (current)  
- $m \to R$ (resistance is the slope!)
- $c \to 0$ (line passes through origin)

**This is why we call it LINEAR** — it's literally a straight-line relationship!

---

## Deriving the Relationship: Why V = IR?

Let's build this from first principles using your A-Level physics knowledge.

### From Physics: Electric Field and Potential

You know from A-Level physics:
- **Voltage** = electric potential difference (work done per unit charge)
- **Current** = charge flow rate

**Derivation:**

**Step 1:** Voltage is potential difference
$$V = \frac{W}{Q}$$
Where W = work done, Q = charge

**Step 2:** Current is charge per time
$$I = \frac{Q}{t}$$

**Step 3:** For a resistor, work done is proportional to both charge AND the material's resistance to flow

The proportionality constant is **R** (resistance):
$$W = R \cdot Q \cdot I$$

Wait, that doesn't look right. Let me restart properly.

**Actually, the proper derivation** uses **Ohm's experimental observation**:

For many conductors, the ratio $\frac{V}{I}$ is **constant**.

Define this constant as **R** (resistance):
$$R = \frac{V}{I}$$

Multiply both sides by I:
$$V = R \cdot I$$

This is **Ohm's Law** — it's an **empirical law** (discovered by experiment), not derived from first principles!

---

## Mathematical Properties of Ohm's Law

### Property 1: Linearity

**Definition:** A function f is linear if:
$$f(a + b) = f(a) + f(b)$$
$$f(kx) = k \cdot f(x)$$

**For Ohm's Law with $V = RI$:**

(a) **Additivity:**
$$V_1 = R I_1 \text{ and } V_2 = R I_2$$
$$V_1 + V_2 = R I_1 + R I_2 = R(I_1 + I_2)$$ ✓

(b) **Homogeneity (scaling):**
$$V = R I \implies kV = R(kI)$$ ✓

Both properties satisfied → linear relationship!

### Property 2: Passing Through Origin

When $I = 0$:
$$V = R \cdot 0 = 0$$

So the graph **always** passes through $(0, 0)$ — no voltage when no current.

---

## The Conductance Form: Why G = 1/R?

Sometimes it's easier to think "how easily does current flow?" instead of "how much does it resist?"

**Define conductance** as the reciprocal of resistance:
$$G = \frac{1}{R}$$

Then Ohm's Law becomes:
$$I = G \cdot V$$

**Why is this useful?**

For parallel resistors (lecture Page 12):
- Resistances **don't** add simply
- But conductances **do** add: $G_{total} = G_1 + G_2$

This makes parallel calculations much easier!

---

## Deriving Power Dissipation Formula

You know from physics that power = energy per time:
$$P = \frac{E}{t}$$

For electricity, energy transferred when charge Q moves through voltage V:
$$E = Q \cdot V$$

Current is charge per time:
$$I = \frac{Q}{t} \implies Q = I \cdot t$$

Substituting:
$$P = \frac{Q \cdot V}{t} = \frac{(I \cdot t) \cdot V}{t} = I \cdot V$$

So **power = voltage × current**:
$$P = VI$$

**Now use Ohm's Law** ($V = IR$):
$$P = (IR) \cdot I = I^2 R$$

**Or use** $I = V/R$:
$$P = V \cdot \frac{V}{R} = \frac{V^2}{R}$$

**Three equivalent forms:**
$$P = VI = I^2R = \frac{V^2}{R}$$

All three are correct — use whichever is most convenient for your problem!

---

## Going Slightly Deeper: The v-i Plane vs i-v Plane

Your lecture (Page 2) mentions two ways to plot:

### i-v Plane (current on x-axis)
$$v = R \cdot i$$
- Slope = R
- Measures resistance directly

### v-i Plane (voltage on x-axis)
$$i = G \cdot v$$
- Slope = G
- Measures conductance directly

**Why two planes?** 

It's like asking "Which is easier: $y = 2x$ or $x = y/2$?"

Depending on what you're solving for (I or V), one form is more natural. Both contain the same information!

---

## Mathematical Proof: Duality Concept (From Lecture Page 3)

**Theorem:** If we define the dual of a resistor as swapping $(v, i) \to (i, v)$, then:

For a resistor with $v = Ri$, its dual has...what characteristic?

**Derivation:**

Original: $v = Ri$

Swap variables: $i = R v$ (but this looks wrong!)

**The key:** Also swap $R \to G$:
$$i = G v \text{ where } G = 1/R$$

**Result:** The dual of a resistor with resistance R is a resistor with conductance G = 1/R.

For linear resistors, **the dual has the same resistance** (because R and 1/R define the same line, just viewed differently).

This duality will be crucial when we study series (lecture Page 9) and parallel (lecture Page 12) connections!

---

## An Example Calculation (Every Step)

**Problem:** A resistor dissipates 10W when carrying 2A. Find:
(a) Resistance
(b) Voltage across it
(c) Energy in 1 hour

**Solution:**

**(a) Find R:**

Step 1: Use $P = I^2 R$
$$10W = (2A)^2 \cdot R$$

Step 2: Solve for R
$$10 = 4R$$
$$R = 2.5\Omega$$

**(b) Find V:**

Method 1 — Use Ohm's Law:
$$V = IR = 2A \times 2.5\Omega = 5V$$

Method 2 — Use $P = VI$:
$$10W = V \times 2A$$
$$V = 5V$$ ✓ (same answer!)

**(c) Energy in 1 hour:**

Step 1: Time in seconds
$$t = 1 \text{ hour} = 3600 \text{ seconds}$$

Step 2: Energy = Power × Time
$$E = P \cdot t = 10W \times 3600s = 36,000J = 36kJ$$

---

## Summary

**Key mathematical insights:**
- Ohm's Law is **linear** (satisfies linearity axioms)
- Graph passes through origin (no offset)
- Slope = R (or G in flipped axes)
- Power has three forms: $P = VI = I^2R = V^2/R$
- Duality swaps v↔i and R↔G

**Next:** In exam prep, we'll see how these formulas appear in actual problems.
