## 📝 Exam Focus: Linear Resistors & Ohm's Law

### What Examiners Expect at This Level

This isn't A-Level Ohm's law anymore. Examiners expect you to work comfortably with both resistance and conductance forms, switch between v-i and i-v planes without getting confused, and handle sign conventions correctly.

### Common Question Types

**Type 1: Slope Interpretation (3-4 marks)**

> "A linear resistor has a v-i characteristic with slope 0.005 on the v-i plane. Find its resistance, conductance, and the current when 10V is applied."

✅ **A+ Answer**:
- On the v-i plane, slope = $G = \frac{\Delta i}{\Delta v} = 0.005$ S
- Resistance: $R = \frac{1}{G} = \frac{1}{0.005} = 200\,\Omega$
- Current at 10V: $i = Gv = 0.005 \times 10 = 0.05$ A $= 50$ mA

❌ **Common mistake**: Saying "slope = R = 0.005Ω." On the v-i plane, slope is $G$, not $R$.

---

**Type 2: Series/Parallel Calculation (4-5 marks)**

> "Three resistors with $R_1 = 100\,\Omega$, $R_2 = 200\,\Omega$, $R_3 = 50\,\Omega$ are connected in parallel. Find the total resistance."

✅ **A+ Answer** (using conductance — much easier!):
$$G_{total} = G_1 + G_2 + G_3 = \frac{1}{100} + \frac{1}{200} + \frac{1}{50} = 0.01 + 0.005 + 0.02 = 0.035\text{ S}$$
$$R_{total} = \frac{1}{G_{total}} = \frac{1}{0.035} \approx 28.57\,\Omega$$

**Pro tip**: When resistors are in parallel, always convert to conductance first. It turns a messy fraction equation into simple addition.

---

**Type 3: Bilateral Property (2-3 marks)**

> "A student claims that a linear resistor with $R = 50\,\Omega$ allows 100 mA of current when 5V is applied, but only 50 mA when −5V is applied. Is this possible?"

✅ **A+ Answer**: No. A linear resistor is bilateral — its v-i characteristic is symmetric about the origin. If $v = 5$V gives $i = 100$ mA, then $v = -5$V must give $i = -100$ mA (same magnitude, opposite direction). A device that behaves differently for positive and negative voltages is NOT bilateral and therefore not a standard linear resistor.

---

**Type 4: Unit Conversion (2 marks)**

> "Express 4.7 kΩ in conductance."

$$G = \frac{1}{R} = \frac{1}{4700} \approx 0.000213\text{ S} = 0.213\text{ mS} = 213\,\mu\text{S}$$

**A+ tip**: Know the SI prefixes:
| Prefix | Symbol | Factor |
|--------|--------|--------|
| kilo (kΩ) | k | $10^3$ |
| mega (MΩ) | M | $10^6$ |
| milli (mS) | m | $10^{-3}$ |
| micro (μS) | μ | $10^{-6}$ |

---

### What Students Get Wrong

| Mistake | Why It Happens | How to Fix |
|---------|---------------|-----------|
| slope = R on the v-i plane | Confusing planes | slope on v-i = $G = 1/R$; slope on i-v = $R$ |
| $\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2}$ for series | Mixing up series and parallel | Series: $R$ adds. Parallel: $G$ adds. |
| Forgetting associated reference direction | Just plugging in numbers | Check: is current entering the + terminal? |
| Ignoring negative signs | "Current can't be negative" | Negative current = current in opposite direction. It's fine. |

### Practice Problem

> A 330Ω resistor has the following operating conditions measured in a circuit:
>
> | Measurement | $v$ (V) | Direction of $i$ |
> |---|---|---|
> | A | $+3.3$ | Into positive terminal |
> | B | $-6.6$ | Into positive terminal |
> | C | $+3.3$ | Out of positive terminal |
>
> For each measurement:
> (a) Find the current magnitude and sign (using associated reference direction).
> (b) Find the power. State whether the resistor is absorbing or delivering.

<details>
<summary><strong>Solution</strong></summary>

**Measurement A**: $v = +3.3$ V, current into "+" terminal (associated reference direction).
- $i = v/R = 3.3/330 = 0.01$ A $= +10$ mA (positive because direction matches convention)
- $p = vi = 3.3 \times 0.01 = 0.033$ W $= 33$ mW (positive → **absorbing**)

**Measurement B**: $v = -6.6$ V, current into "+" terminal.
- $i = v/R = -6.6/330 = -0.02$ A (negative current means actual current flows out of "+" terminal)
- Wait — but the measurement says current IS into the "+" terminal. This is a contradiction. If $v = -6.6$ V and $i$ is into "+" terminal, then by Ohm's law: $i = -6.6/330 = -20$ mA. The negative sign means the actual current direction is **opposite** to the assumed reference (out of "+"). But the problem states current IS into "+". This means the measurement is inconsistent with a passive 330Ω resistor — there must be an error, or the element is not a simple 330Ω resistor.
- If we trust the measurements: $p = vi = (-6.6)(+0.02) = -0.132$ W → **delivering** power (active behavior!). A passive 330Ω resistor cannot do this.

**Measurement C**: $v = +3.3$ V, current out of "+" terminal.
- The current is opposite to associated reference, so $i = -v/R = -3.3/330 = -10$ mA
- $p = vi = 3.3 \times (-0.01) = -0.033$ W → **delivering** power. Again, inconsistent with passive behavior.

**Key lesson**: Only measurement A is consistent with a passive 330Ω resistor. Measurements B and C describe operating points where the element would need to deliver power — impossible for a positive-resistance resistor.

</details>
