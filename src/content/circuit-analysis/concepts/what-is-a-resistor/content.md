## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From your A-Level physics, you should know:
- **Ohm's law**: $V = IR$, where $R$ is resistance in ohms ($\Omega$)
- **Current**: the flow of charge through a conductor
- **Voltage**: the potential difference between two points
- You've probably seen resistors as small cylindrical components with colored bands

If any of this feels shaky, that's completely fine — we're about to rebuild your understanding from a much stronger foundation.

</details>

---

## Let's Start With What You Already Know

You've been working with resistors since A-Level physics. Apply a voltage $V$, a current $I$ flows, and $V = IR$. The resistor is that small cylindrical component with coloured bands on your lab bench. It "resists" current. Simple enough, right?

Here's the thing — **that understanding is correct, but it's only a small piece of a much bigger picture.** What you learned in physics is one specific type of resistor. Circuit theory takes a dramatically broader view, and once you see it, you'll understand why this course approaches things so differently from what you're used to.

## The Circuit Theory Definition — This Changes Everything

In circuit theory, the word "resistor" means something much more general than you might expect. Here's the formal definition:

> A **two-terminal resistor** is any circuit element whose terminal voltage $v$ and terminal current $i$ satisfy a relationship of the form $f(v, i) = 0$.

That's it. **Any** device where the voltage and current are related by *some* equation — linear or nonlinear, simple or complicated — qualifies as a resistor.

The set of all voltage–current pairs $(v, i)$ that satisfy this relationship is called the **v-i characteristic**:

$$\mathcal{R} = \{(v, i) : f(v, i) = 0\}$$

Now, this might feel abstract right now, but stay with me. This definition is the key that unlocks the entire course.

[[visual:two-terminal-element]]

[[visual:falstad-simple-resistor]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Think about a simple light bulb. It has two connection points. When you apply a voltage, a current flows. The relationship between voltage and current isn't perfectly linear (it changes with temperature), but there IS a relationship. <em>Does a light bulb satisfy the definition above? Is it a "resistor" in circuit theory?</em></summary>

Yes! It has two terminals, and its voltage and current are related by some equation. That's all it takes. The light bulb's v-i curve is nonlinear (resistance increases as it heats up), but it still satisfies $f(v, i) = 0$. So under our circuit theory definition, a light bulb is absolutely a resistor.

</details>

---

## Why "Two-Terminal"?

The phrase "two-terminal" just means the device has exactly two connection points — one where current enters and one where current leaves. This is the simplest possible circuit element.

Think about the devices you've seen so far:

- A physical resistor with two leads → **two terminals** ✓
- A diode with an anode and cathode → **two terminals** ✓
- A battery with positive and negative terminals → **two terminals** ✓
- A light bulb with two connection points → **two terminals** ✓

Every single one of these is a two-terminal element. And for each one, there exists *some* equation relating its voltage to its current. So under circuit theory's definition, **they're all resistors.**

## Here's Where It Gets Interesting

This is the part that surprises most students, so let me be very explicit about it. In circuit theory, **all of the following** are classified as two-terminal resistors:

| Device | v-i Relationship | Why it's a "resistor" |
|--------|-----------------|----------------------|
| Linear resistor | $v = Ri$ (straight line) | Voltage and current related by equation |
| Ideal diode | $v \cdot i = 0$, with $v \leq 0, i \geq 0$ | Piecewise rule relating v and i |
| PN-junction diode | $i = I_s(e^{v/V_T} - 1)$ | Exponential relationship |
| Open circuit | $i = 0$ for all $v$ | Current is always zero — that's a relationship! |
| Short circuit | $v = 0$ for all $i$ | Voltage is always zero — also a relationship! |
| DC voltage source | $v = V_s$ for all $i$ | Voltage is constant (independent of current) |
| DC current source | $i = I_s$ for all $v$ | Current is constant (independent of voltage) |
| Tunnel diode | Complex multi-valued curve | Still $f(v,i) = 0$ on the v-i plane |

Every single one satisfies $f(v, i) = 0$. That's the only requirement.

[[visual:device-symbols-comparison]]

Let's see what these look like on the v-i plane. Each device has a completely different shape, but they're **all** resistors:

[[visual:all-devices-vi]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Look at the table above. An open circuit has i = 0 for all v, and a DC voltage source has v = Vₛ for all i. <em>What's the difference between these two? Both seem to constrain one variable — but one constrains current, the other constrains voltage. Can you see which one would appear as a horizontal line on the v-i plane and which as a vertical line?</em></summary>

The open circuit: $i = 0$ means the characteristic is the entire v-axis — a horizontal line at $i = 0$. The voltage source: $v = V_s$ means it's a vertical line at $v = V_s$. They're perpendicular to each other on the v-i plane!

</details>

---

## The v-i Characteristic: Your New Best Friend

From this point forward in the course, whenever you encounter a new device, the first question to ask is: **"What does its v-i characteristic look like?"**

The v-i characteristic is plotted on a two-dimensional plane:

- On the **v-i plane**: voltage $v$ is the horizontal axis, current $i$ is the vertical axis
- On the **i-v plane**: current $i$ is the horizontal axis, voltage $v$ is the vertical axis

**Be very careful about which plane is being used.** This is one of the most common sources of confusion in exams. The convention is: the first letter is always the horizontal axis. So "v-i plane" means $v$ is horizontal, just like $(x, y)$ means $x$ is horizontal.

Let's see a few specific examples to build your intuition:

### A Linear Resistor ($R = 100\,\Omega$)

The v-i characteristic is a straight line through the origin. The slope on the v-i plane is $\frac{\Delta i}{\Delta v} = G = \frac{1}{R}$.

[[visual:linear-resistor-vi]]

[[visual:ohms-law-explorer]]

### An Open Circuit

$i = 0$ for all $v$ — the characteristic sits right on the v-axis (the horizontal axis). It's a "zero-conductance" resistor.

### A Short Circuit

$v = 0$ for all $i$ — the characteristic sits right on the i-axis (the vertical axis). It's a "zero-resistance" resistor.

[[visual:oc-sc-comparison]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — You now know that a linear resistor's v-i curve is a straight line through the origin, and the slope is G = 1/R. As R increases, the slope gets shallower. As R decreases, the slope gets steeper. <em>What happens at the extremes — when R → ∞ and when R → 0?</em></summary>

When $R \to \infty$: The slope $G = 1/R \to 0$, so the line becomes completely flat. That's the v-axis — an **open circuit**!

When $R \to 0$: The slope $G \to \infty$, the line becomes vertical — that's the i-axis — a **short circuit**!

You've just discovered that the open circuit and short circuit are actually the extreme limits of a linear resistor. Not separate devices — the same device at its boundary cases. 🎉

</details>

Here's what the full family looks like — every linear resistor from R = 0 (short circuit) to R → ∞ (open circuit), all rotating around the origin:

[[visual:resistor-family-sweep]]

---

## Physics Definition vs Circuit Theory Definition

Let me put the two definitions side by side so the shift is crystal clear:

### Physics / A-Level View
- A resistor is a component that obeys Ohm's law ($V = IR$)
- It has a fixed resistance $R$
- Its v-i characteristic is a straight line through the origin
- Diodes, batteries, sources? "Those aren't resistors"

### Circuit Theory View
- A resistor is **any** two-terminal element with a v-i relationship $f(v, i) = 0$
- The relationship can be linear *or* nonlinear
- The v-i characteristic can be any curve, any shape
- Diodes, sources, switches — they're all resistors with different characteristics

**Why does this matter?** Because every analysis technique you learn for resistors — series combination, parallel combination, driving-point characteristics, graphical analysis — applies to **all** of these devices. You learn one set of tools, and it works everywhere. That's the power of this broader definition.

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Your physics teacher would say a diode is "not a resistor." Your circuit theory professor says it IS a resistor. <em>Who's right?</em></summary>

Both are — they're using different definitions. But the circuit theory definition is far more powerful because it lets us analyze diodes, sources, and exotic devices using the same framework we developed for simple resistors. That's why we adopt it from now on.

</details>

---

## Time-Invariant vs Time-Varying

One more distinction that's worth knowing now (though we won't use it much in this lesson): a resistor can be **time-invariant** or **time-varying**.

- **Time-invariant**: The $f(v, i) = 0$ relationship doesn't change with time. A standard carbon resistor is time-invariant: $v(t) = R \cdot i(t)$ where $R$ is a constant.
- **Time-varying**: The relationship changes over time. For example, $v(t) = R(t) \cdot i(t)$ where $R(t)$ varies. A photoresistor (LDR) whose resistance changes with light level is time-varying.

Most of this lesson focuses on time-invariant resistors. Don't worry about time-varying ones for now — we'll point them out when they appear.

## What's Coming Next

In the concepts that follow, we'll study specific types of two-terminal resistors in detail:
1. **Linear resistors** and Ohm's law (next concept)
2. **Open and short circuits** — the extreme cases
3. **Power and passivity** — which devices absorb energy and which deliver it
4. **Ideal and PN-junction diodes** — your first nonlinear devices
5. **Tunnel diodes** — the exotic ones
6. **Series and parallel connections** — combining resistors
7. And more...

For each one, we'll carefully examine its v-i characteristic, understand its properties, and build your toolkit for analyzing circuits containing these devices.

---

**The key takeaway from this concept:** Forget the A-Level definition. In circuit theory, **"resistor" = any two-terminal device with a v-i relationship.** Open circuits, short circuits, diodes, batteries — they're all resistors. This single idea is the foundation for everything else in this lesson. And you've got it. 💪
