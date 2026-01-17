# Mathematical Foundations: Power and Passivity

> Rigorous definitions for power, energy, and the passive/active distinction.

---

## Instantaneous Power

From lecture Page 4:

**Definition:** The power delivered to a resistor at time $t$ is:

$$p(t) = v(t) \cdot i(t)$$

**Units:** Watts (W) = Volts × Amperes

For a linear resistor where $v = Ri$:
$$p(t) = v(t) \cdot i(t) = Ri(t) \cdot i(t) = Ri(t)^2$$

Alternatively, using $i = Gv$:
$$p(t) = v(t) \cdot Gv(t) = Gv(t)^2$$

---

## Energy Absorbed

**Definition:** The total energy absorbed by the resistor from time $t_1$ to $t_2$ is:

$$W(t_1, t_2) = \int_{t_1}^{t_2} p(\tau) \, d\tau = \int_{t_1}^{t_2} v(\tau) i(\tau) \, d\tau$$

**Units:** Joules (J) = Watt·seconds

### For a Linear Resistor with Constant Current

If $i(t) = I_0$ (constant):
$$W(0, T) = \int_0^T R I_0^2 \, dt = R I_0^2 T$$

**Physical interpretation:** Energy dissipated as heat.

---

## Passivity: Formal Definition

From lecture Page 4:

**Definition:** A two-terminal resistor is **passive** if and only if:

$$p(t) = v(t) \cdot i(t) \geq 0 \quad \forall t$$

Or equivalently, the cumulative energy absorbed is non-negative:

$$W(t) = \int_{-\infty}^{t} v(\tau) i(\tau) \, d\tau \geq 0 \quad \forall t$$

**Interpretation:** A passive resistor can only absorb (or store) energy, never deliver it.

---

## Geometric Characterization of Passivity

**Theorem (Lecture Page 4):** A resistor is passive if and only if its v-i characteristic lies in the **closed first and third quadrants** of the v-i plane (or equivalently, the i-v plane).

**Proof:**

(⟹) Assume resistor is passive.

For any point $(v, i)$ on the characteristic, we must have $vi \geq 0$ (by passivity).

This means:
- If $v > 0$, then $i \geq 0$ (first quadrant or positive v-axis)
- If $v < 0$, then $i \leq 0$ (third quadrant or negative v-axis)
- If $v = 0$, then any $i$ (i-axis)

Therefore, the characteristic lies in Q1 ∪ Q3 ∪ axes. ∎

(⟸) Assume characteristic lies in Q1 ∪ Q3.

Then for any $(v, i)$:
- If in Q1: $v > 0$ and $i > 0$ → $vi > 0$ ✓
- If in Q3: $v < 0$ and $i < 0$ → $vi > 0$ ✓
- If on axes: $v = 0$ or $i = 0$ → $vi = 0$ ✓

Therefore, $vi \geq 0$ for all points → passive. ∎

---

## Active Resistors

**Definition:** A resistor is **active** if it is not passive.

Equivalently, there exists some time $t$ where:
$$p(t) = v(t) \cdot i(t) < 0$$

**Geometric:** The characteristic enters the second or fourth quadrant.

### Example: Negative Resistance

Consider $v = -Ri$ where $R > 0$.

For $i > 0$: $v = -Ri < 0$ → in Q4  
Power: $p = vi = (-Ri) \cdot i = -Ri^2 < 0$

**Conclusion:** Negative resistance is active.

---

## Mathematical Insight: Why $p = vi$?

Power is the rate of energy transfer:
$$p = \frac{dW}{dt}$$

From electromagnetism, the work done moving charge $dq$ across potential difference $v$ is:
$$dW = v \cdot dq$$

Therefore:
$$p = \frac{dW}{dt} = v \frac{dq}{dt} = v \cdot i$$

**Sign convention (associated reference direction):**
- If $v$ and $i$ have the same sign → power flows **into** the element ($p > 0$)
- If opposite signs → power flows **out** of the element ($p < 0$)

---

## Energy for DC Resistor

For constant voltage $V$ and current $I$:
$$P = VI = RI^2 = \frac{V^2}{R}$$

Over time $T$:
$$W = PT = VIT = RI^2T = \frac{V^2}{R}T$$

**Example:** 100Ω resistor with 1A for 1 hour:
$$W = 100 \times 1^2 \times 3600 = 360\,000 \text{ J} = 0.1 \text{ kWh}$$

---

## Lossless Elements (Advanced)

A resistor is **lossless** if:
$$W(t) = \int_{-\infty}^{t} v(\tau) i(\tau) \, d\tau = 0 \quad \forall t$$

**Interpretation:** Energy flows in and out, but no net absorption.

**Example:** Ideal capacitor and inductor are lossless (they store energy but don't dissipate).

**Resistors cannot be lossless** (unless trivial cases like open/short circuits).

---

## Summary: Mathematical Rigor

**Power:**
- Instantaneous: $p(t) = v(t) i(t)$
- For linear R: $p = Ri^2 = Gv^2$

**Energy:**
- $W = \int p \, dt = \int vi \, dt$

**Passivity:**
- $p(t) \geq 0$ for all $t$
- Geometric: characteristic in Q1 ∪ Q3

**Active:**
- $p(t) < 0$ possible
- Geometric: characteristic enters Q2 or Q4
