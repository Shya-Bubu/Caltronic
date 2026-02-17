## 📝 Exam Focus: Power & Passivity

### Why This Matters in Exams

Power and passivity questions test whether you understand the v-i plane deeply — not just "can you draw a line," but "can you interpret what the line means physically." These questions separate A students from B students.

### Common Question Types

**Type 1: Calculate Power (3-4 marks)**

> "A nonlinear resistor has $v = 4$ V and $i = -20$ mA at a particular operating point. Calculate the power and state whether the device is absorbing or delivering at this point."

✅ **A+ Answer:**
$$p = vi = (4)(-0.02) = -0.08\text{ W} = -80\text{ mW}$$

$p < 0$ → the device is **delivering** 80 mW to the circuit at this operating point.

This operating point is in **Q4** ($v > 0, i < 0$), which is the active region.

**Pro tip**: Always state the quadrant. It shows the examiner you understand the geometric interpretation, not just the formula.

---

**Type 2: Passivity Classification from V-I Curve (4-5 marks)**

> "A device has the following v-i data:
>
> | $v$ (V) | -2 | -1 | 0 | 1 | 2 | 3 |
> |---|---|---|---|---|---|---|
> | $i$ (mA) | -5 | -2.5 | 0 | 2.5 | 5 | 3 |
>
> Is this device passive? Justify your answer."

✅ **A+ Answer:**
Check each point for the sign of $p = vi$:
- $(-2, -5\text{mA})$: $p = (-2)(-0.005) = +0.01$ W → Q3, absorbing ✅
- $(-1, -2.5\text{mA})$: $p = (-1)(-0.0025) = +0.0025$ W → Q3, absorbing ✅
- $(0, 0)$: $p = 0$ → On axes ✅
- $(1, 2.5\text{mA})$: $p = (1)(0.0025) = +0.0025$ W → Q1, absorbing ✅
- $(2, 5\text{mA})$: $p = (2)(0.005) = +0.01$ W → Q1, absorbing ✅
- $(3, 3\text{mA})$: $p = (3)(0.003) = +0.009$ W → Q1, absorbing ✅

All operating points have $p \geq 0$. **The device is passive** (based on the given data points).

**Careful**: We can only confirm passivity for these measured points. If the complete v-i curve had a region in Q2 or Q4 that wasn't measured, the device could still be active. In an exam, note this caveat for full marks.

---

**Type 3: Three Equivalent Power Forms (3 marks)**

> "For a 470Ω resistor carrying 15 mA, calculate the power using all three forms and verify they agree."

✅ **A+ Answer:**
- $v = Ri = 470 \times 0.015 = 7.05$ V
- Form 1: $p = vi = 7.05 \times 0.015 = 0.10575$ W
- Form 2: $p = Ri^2 = 470 \times (0.015)^2 = 470 \times 0.000225 = 0.10575$ W ✓
- Form 3: $p = Gv^2 = \frac{1}{470} \times (7.05)^2 = 0.002128 \times 49.7 = 0.10575$ W ✓

All three forms give $\approx 105.75$ mW. ✅

---

**Type 4: The Quadrant Test (4-5 marks)**

> "A two-terminal device has a v-i characteristic described by $i = 0.01v$ for $v \geq 0$ and $i = -0.02v$ for $v < 0$. Is the device passive? Sketch the v-i characteristic and justify."

✅ **A+ Answer:**
- For $v \geq 0$: slope = $0.01 > 0$, so $i > 0$ when $v > 0$ → operating in **Q1** → $p = vi > 0$ ✅
- For $v < 0$: slope = $-0.02$, so $i = -0.02v$. With $v < 0$: $i = -0.02 \times (\text{negative}) = \text{positive}$.

Wait — when $v < 0$ and $i > 0$, we're in **Q2**, where $p = vi < 0$! The device delivers power in this region.

**The device is ACTIVE.** It is passive for $v \geq 0$ but active for $v < 0$.

The v-i curve looks like two lines meeting at the origin with different slopes — one going into Q1 (passive) and one going into Q2 (active). This is a nonlinear, non-bilateral device.

---

### What Students Get Wrong

| Mistake | Why It Happens | Fix |
|---------|---------------|-----|
| "p = vi is always positive because v² and i² are positive" | Confusing $p = vi$ with $p = Ri^2$ | $p = vi$ can be negative if $v$ and $i$ have opposite signs. $p = Ri^2$ is only valid for linear resistors. |
| "The device is passive because most of its curve is in Q1" | Ignoring the global requirement | Passivity requires the ENTIRE curve to be in Q1+Q3. One point in Q2 or Q4 breaks it. |
| Ignoring the sign convention | Not checking associated reference direction | Always verify: is current into the "+" terminal? If not, flip the sign of $i$ first. |
| "A battery is passive because it has resistance" | Confusing internal resistance with the battery | A battery's v-i characteristic is a vertical line → passes through Q4 → ACTIVE (it delivers energy). |

### Practice Problem

> A two-terminal device is tested and the following operating points are recorded:
>
> | Operating Point | $v$ (V) | $i$ (A) |
> |---|---|---|
> | A | +5 | +0.02 |
> | B | +10 | +0.05 |
> | C | +15 | +0.03 |
> | D | +20 | -0.01 |
>
> (a) Calculate the power at each operating point. (4 marks)
>
> (b) At which operating point(s) is the device delivering power? (2 marks)
>
> (c) Is the device passive? (1 mark)
>
> (d) Sketch the v-i characteristic based on these data points. In which quadrant(s) does the curve pass? (3 marks)
>
> (e) What kind of device might exhibit this behavior — increasing current up to a point, then decreasing current at higher voltages? (2 marks)

<details>
<summary><strong>Solution</strong></summary>

**(a)** Power at each point:
- A: $p = 5 \times 0.02 = 0.1$ W = 100 mW (absorbing)
- B: $p = 10 \times 0.05 = 0.5$ W = 500 mW (absorbing)
- C: $p = 15 \times 0.03 = 0.45$ W = 450 mW (absorbing)
- D: $p = 20 \times (-0.01) = -0.2$ W = −200 mW (**delivering**)

**(b)** Operating point D. At $v = +20$ V and $i = -0.01$ A, the power is negative, meaning the device is delivering 200 mW to the circuit.

**(c)** **No**, the device is **not passive**. Operating point D has $p < 0$, which violates the passivity condition. Even though three out of four points show absorption, a single active point is enough to classify the device as active.

**(d)** Points A, B, C are all in **Q1** ($v > 0, i > 0$). Point D is in **Q4** ($v > 0, i < 0$). The curve starts in Q1, rises to a peak near $v = 10$V, then curves back down and crosses into Q4.

**(e)** This behavior — current rising then falling with increasing voltage — is characteristic of a **tunnel diode** in its negative differential resistance (NDR) region. The current increases up to a "peak" voltage, then decreases (NDR region), before eventually increasing again at higher voltages. You'll study this in detail in a later concept.

</details>
