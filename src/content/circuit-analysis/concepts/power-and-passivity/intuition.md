# Power and Passivity

> **Narrative thread:** We've established the linear resistor baseline. Now the crucial question: where does the energy go? Does the resistor absorb power from the circuit, or can it deliver power back?

---

## THE BIG IDEA

**Power isn't just P = VI.**

It's a **directional quantity** that tells you which way energy flows. When you connect a resistor to a circuit:

- If $p(t) = v(t) \cdot i(t) > 0$ → Power flows **INTO** the resistor (it **absorbs** energy)
- If $p(t) < 0$ → Power flows **OUT OF** the resistor (it **delivers** energy)

**Passive resistors can ONLY absorb** (or store) energy, never deliver it. **Active resistors can deliver** energy — like a battery or a transistor in active mode.

**Why it matters in EEE:** This distinction determines whether you need an external power source or whether the element itself can drive circuits. Every power supply, battery, and amplifier depends on active elements.

[[visual:v1]]

[[visual:v2]]

---

## Power: The Universal Formula

From lecture Page 4:

$$p(t) = v(t) \cdot i(t)$$

For a linear resistor where $v = Ri$:

$$p(t) = v(t) \cdot i(t) = R i(t)^2 = G v(t)^2$$

**Key Observations:**
1. For positive R, power is **always positive** → resistor always absorbs
2. For negative R, power can be **negative** → resistor can deliver energy

---

## The Quadrant Test: Am I Passive?

From lecture Page 4:

> A two-terminal resistor is **passive** if and only if its v-i characteristic lies in the **closed first and third quadrants** of the v-i plane (or i-v plane).

### What does this mean?

**Quadrant I:** $v > 0, i > 0$ → $p = v \cdot i > 0$ ✓ (absorbing)  
**Quadrant III:** $v < 0, i < 0$ → $p = v \cdot i > 0$ ✓ (absorbing)

Both quadrants have power flowing INTO the element.

**If the characteristic enters Q2 or Q4**, you have an **active element**:
- **Q2:** $v < 0, i > 0$ → $p < 0$ (delivering)
- **Q4:** $v > 0, i < 0$ → $p < 0$ (delivering)

[[visual:v3]]

[[visual:v4]]

---

## Active Resistors: The Negative Resistance Case

From lecture Page 4:

> If the resistor is negative, as current flows through it, the resistor **delivers** energy to the remainder of the circuit. We call such a linear resistor with negative resistance an **active resistor**.

**Example:** A resistor with $R = -100\Omega$

This means: $v = -100i$

On the v-i plane, this is a line with **negative slope** through the origin. It enters Q2 and Q4, so it's active.

**Where do you see this in real life?**
- **Tunnel diodes** have negative resistance regions
- **Operational amplifiers** with positive feedback  
- **Oscillator circuits** rely on negative resistance

[[visual:v5]]

[[visual:v6]]

---

## Modeling Physical Resistors

From lecture Page 5:

> For most physical resistors made of metallic material, we can use the circuit element, a linear passive resistor, to model them **almost precisely**. The model is good over a large operating range. Only for excessive voltages or currents, or at very high frequencies, is a better model necessary.

**Translation:** Real metal resistors (carbon film, metal film, wirewound) follow Ohm's law and are passive. They:
- Dissipate power as heat
- Never deliver energy back to the circuit
- Behave linearly until you exceed their power rating

**When the model breaks:**
1. **Excessive voltage:** Breakdown, arcing
2. **Excessive current:** Overheating → resistance changes → thermal runaway
3. **High frequency:** Parasitic L and C become significant

---

## Going Deeper: Power Ratings and Thermal Management

In real circuits, every resistor has a **maximum power rating** (e.g., ¼W, ½W, 1W).

From $P = I^2 R$, we can find the maximum current:
$$I_{max} = \sqrt{\frac{P_{max}}{R}}$$

**Example:** A 1kΩ, ¼W resistor:
$$I_{max} = \sqrt{\frac{0.25}{1000}} = 15.8 \text{ mA}$$

**What happens if you exceed this?**
- Temperature rises: $T_{junction} = T_{ambient} + P \cdot R_{\theta}$
- Where $R_{\theta}$ is thermal resistance (°C/W)
- Resistor can burn out, change value, or fail open

**Derating Rule (from industry standards):**  
Derate power handling by **50% per 50°C** above 70°C ambient. So a ¼W resistor at 120°C can only handle ⅛W safely.

[[visual:v7]]

[[visual:v8]]

---

## Energy vs. Power

Let's be precise about terminology:

- **Power** $p(t)$: Rate of energy transfer (Watts)
- **Energy** $W$: Total energy absorbed over time (Joules)

$$W = \int_{t_1}^{t_2} p(\tau) d\tau = \int_{t_1}^{t_2} v(\tau) i(\tau) d\tau$$

**Passivity condition (formal):**  
A one-port is passive if:
$$W(t) = \int_{-\infty}^{t} v(\tau) i(\tau) d\tau \geq 0 \quad \forall t$$

This says: "From the beginning of time until now, net energy has always flowed INTO the element."

---

## Pose & Reflect

1. **Can a time-varying resistor R(t) be passive?**  
   Hint: If R(t) > 0 for all t, what does that tell you about the quadrants?

2. **A transistor has regions where it absorbs power and regions where it delivers power. Is it passive or active overall?**

3. **Why do batteries have a "+" and "-" terminal orientation, but resistors don't?**  
   Think about the role of power flow direction.

---

## Summary

**Power tells you energy direction:**
- $p = vi > 0$ → absorbing (passive)
- $p = vi < 0$ → delivering (active)

**Passive ↔ Characteristic in Q1 and Q3 only**  
**Active ↔ Characteristic can enter Q2 or Q4**

Linear resistors with $R > 0$ are passive.  
Negative resistors ($R < 0$) are active.

**Next:** Now we introduce the first *nonlinear* element — the ideal diode. This will break the straight-line characteristic and open the door to rectifiers, logic gates, and all of modern electronics.

[[visual:v9]]

[[visual:v10]]

