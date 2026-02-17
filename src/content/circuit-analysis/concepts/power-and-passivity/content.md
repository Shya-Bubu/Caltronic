## Energy in Circuits: Who's Giving and Who's Taking?

Alright, you now have a solid toolkit: you know what a resistor is (the broad circuit theory definition), you understand the linear resistor inside out, and you've seen the extreme cases of open and short circuits. You've even got the duality principle in your pocket.

Now let's add something fundamental: **power**. Every circuit element either absorbs energy from the rest of the circuit or delivers energy to it. The question "is this device absorbing or delivering?" turns out to be one of the most important classifications in circuit theory. It leads to the distinction between **passive** and **active** devices — and gives you a quick visual test you can apply to any v-i curve.

## The Power Equation

Under the associated reference direction (current enters the positive terminal), the instantaneous power delivered to a two-terminal element is:

$$p(t) = v(t) \cdot i(t)$$

The sign tells you everything:
- $p(t) > 0$ → the element is **absorbing** power (taking energy from the circuit)
- $p(t) < 0$ → the element is **delivering** power (supplying energy to the circuit)
- $p(t) = 0$ → no energy transfer at that instant

For a linear resistor with $v = Ri$ and $i = Gv$, we can write the power in three equivalent forms:

$$p = v \cdot i = R \cdot i^2 = G \cdot v^2$$

Each form is useful in different situations:

| Form | Use when you know... | Advantage |
|------|---------------------|-----------|
| $p = vi$ | Both $v$ and $i$ | Works for ANY device, not just resistors |
| $p = Ri^2$ | The current $i$ | Always ≥ 0 for positive R |
| $p = Gv^2$ | The voltage $v$ | Always ≥ 0 for positive G |

[[visual:passive-sign-convention]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Look at the expression p = Ri². The term i² is always non-negative. And if R > 0, then Ri² ≥ 0 always. <em>What does this tell you about a positive-resistance resistor?</em></summary>

It can never have $p < 0$. It can **never deliver energy**. It ALWAYS absorbs.

This is why resistors get hot! They're constantly converting electrical energy into heat ($p = Ri^2$ watts of it). Every amp of current through a 100Ω resistor produces $100 \cdot i^2$ watts of heat.

</details>

---

## Passive Devices: Always Absorbing

A device that always absorbs power (or at most absorbs zero power) is called **passive**. More precisely:

> A resistor is **passive** if $p = vi \geq 0$ at **every** operating point on its v-i characteristic.

For a positive-resistance linear resistor ($R > 0$), we proved this above: $p = Ri^2 \geq 0$ always. Power is zero only when $i = 0$ (no current flowing), and strictly positive whenever current flows.

But there's a beautiful geometric way to see this — the **quadrant test**.

## The Quadrant Test: Your Visual Shortcut

The v-i plane has four quadrants. The sign of $p = vi$ depends on which quadrant an operating point falls in:

| Quadrant | $v$ | $i$ | $p = vi$ | Energy |
|----------|-----|-----|----------|--------|
| **Q1** (top right) | $> 0$ | $> 0$ | $> 0$ ✅ | Absorbing |
| **Q2** (top left) | $< 0$ | $> 0$ | $< 0$ ❌ | Delivering |
| **Q3** (bottom left) | $< 0$ | $< 0$ | $> 0$ ✅ | Absorbing |
| **Q4** (bottom right) | $> 0$ | $< 0$ | $< 0$ ❌ | Delivering |
| On axes | $0$ or $0$ | — | $= 0$ ✅ | Zero power |

[[visual:quadrant-map]]

[[visual:resistor-power-circuit]]

Now the test becomes purely visual:

1. Plot the device's v-i characteristic
2. If the **entire** curve stays in **Q1 and Q3** (including the axes) → the device is **passive** ✅
3. If **any** part of the curve enters **Q2 or Q4** → the device is **active** (it delivers energy at those operating points) ❌

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — A linear resistor's v-i curve is a straight line through the origin. If R > 0, the slope on the v-i plane is G = 1/R > 0. A positive-slope line through the origin passes through Q1 and Q3. <em>So what can you see at one glance? And what if R < 0?</em></summary>

Every positive-resistance linear resistor is **passive**. You can see it in one glance at the v-i plane — no calculation needed.

Now if $R < 0$: a negative slope means the line passes through Q2 and Q4. That resistor would be **ACTIVE** — delivering energy. Negative resistance appears in practice in tunnel diodes (you'll meet them soon).

</details>

---

## Active Devices: The Energy Suppliers

A resistor that is **not passive** is called **active**. Its v-i characteristic enters Q2 or Q4, meaning there exist operating points where $p < 0$ — the device delivers energy.

The simplest example is **negative resistance** ($R < 0$). Let's work through the numbers:

If $R = -100\,\Omega$ and $i = 10$ mA:

$$v = Ri = (-100)(0.01) = -1\text{ V}$$

$$p = vi = (-1)(0.01) = -0.01\text{ W} = -10\text{ mW}$$

The negative power means this element delivers 10 mW to the circuit. It's acting as an energy **source**, not a sink.

Let's see this on the v-i plane:

[[visual:passive-vs-active]]

[[visual:falstad-resistor-power]]

[[visual:falstad-power-balance]]

Where do negative resistances appear in practice?

- **Tunnel diodes**: exhibit a region of negative differential resistance (the current *decreases* as voltage *increases* — counterintuitive, but real!)
- **Op-amp circuits with positive feedback**: can create effective negative resistance at their terminals
- **Some semiconductor devices**: Gunn diodes, certain amplifier models

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — In the previous concept, you learned about open circuits (i = 0 for all v) and short circuits (v = 0 for all i). Both have p = vi = 0 everywhere. <em>Are they passive or active?</em></summary>

Since $p = 0 \geq 0$ at every point, they satisfy the passivity condition. They're **passive** — but just barely. They sit right on the boundary, absorbing zero power but never delivering any. They're the "laziest" possible passive devices.

</details>

---

## Passivity for Nonlinear Devices

The quadrant test isn't just for straight lines — it works for **any** v-i curve. Here's how it applies to some devices you'll encounter soon:

### Ordinary Diode (PN-junction)

The diode's exponential curve $i = I_s(e^{v/V_T} - 1)$ lies entirely in Q1 and Q3:
- For $v > 0$: $i > 0$ → Q1 (absorbing) ✅
- For $v < 0$: $i \approx -I_s$ (tiny negative current) → Q3 (absorbing) ✅

The PN-junction diode is **passive**. It always absorbs energy (converting it to heat).

### Tunnel Diode

The tunnel diode has a characteristic that starts in Q1 (passive), but then the current *decreases* with increasing voltage in a certain region (negative differential resistance). This region can result in active behavior depending on how the tunnel diode is biased.

### What About Sources?

A DC voltage source ($v = V_s$ for all $i$) has its v-i characteristic as a vertical line at $v = V_s$. This line passes through **all four quadrants** (for different values of current). So a voltage source is **active** — which makes sense, because batteries and power supplies deliver energy!

[[visual:device-passivity-comparison]]

[[visual:interactive-quadrant-test]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Passivity is a <strong>global</strong> property of the ENTIRE v-i characteristic. <em>A device is passive at 99% of its operating points but active at even ONE point. How is it classified?</em></summary>

It's classified as **active**. It only takes a single point in Q2 or Q4 to break passivity. This makes physical sense: if a device CAN deliver energy under certain conditions, it's fundamentally different from one that never can. Passivity is an all-or-nothing property.

</details>

---

## Summary: The Complete Picture

Here's everything about power and passivity in one table:

| Concept | Formula / Test | What it tells you |
|---------|---------------|-------------------|
| Instantaneous power | $p = vi = Ri^2 = Gv^2$ | Rate of energy absorption |
| $p > 0$ | — | Device absorbing energy |
| $p < 0$ | — | Device delivering energy |
| Passive | Entire v-i curve in closed Q1 + Q3 | Never delivers energy |
| Active | Any part of v-i curve in Q2 or Q4 | Can deliver energy |
| Positive R | Line in Q1 + Q3, slope $G > 0$ | Always passive |
| Negative R | Line in Q2 + Q4, slope $G < 0$ | Always active |
| Open/Short circuit | $p = 0$ everywhere | Passive (boundary case) |

You now have a powerful visual tool. For any v-i curve — linear or nonlinear, simple or complex — just look at which quadrants it occupies. Q1 and Q3 only? Passive. Touches Q2 or Q4? Active. Clean, simple, reliable.

You're building a really solid foundation here. Four concepts down, and you already understand: what a resistor is, how linear resistors work, the extreme cases, duality, and now power classification. Let's keep this momentum going! 🔥
