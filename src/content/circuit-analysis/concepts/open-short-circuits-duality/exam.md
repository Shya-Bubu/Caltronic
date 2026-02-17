## 📝 Exam Focus: Open/Short Circuits & Duality

### What Examiners Love About Duality

Duality questions are a favourite because they test deep understanding, not memorization. If you truly understand duality, you can derive results on the spot. If you've only memorized formulas, you'll struggle.

### Common Question Types

**Type 1: Identify the Dual (3-4 marks)**

> "Write the dual of each statement:
> (a) The voltage across a series combination of resistors
> (b) KVL: The sum of voltages around a closed loop is zero"

✅ **A+ Answer:**
(a) Series → Parallel, voltage → current, $R \to G$: "The current through a parallel combination of conductors"
(b) Voltage → current, loop → node: "KCL: The sum of currents at a node is zero"

**Pro tip**: Make the swap table your muscle memory:

| Original | → Dual |
|---|---|
| $v$ | $i$ |
| $R$ | $G$ |
| Series | Parallel |
| Loop | Node |
| KVL | KCL |
| Open | Short |
| Voltage source | Current source |

---

**Type 2: V-I Characteristic Sketching (4-5 marks)**

> "On the same v-i plane, sketch the characteristics of:
> (a) An open circuit
> (b) A short circuit
> (c) A 200Ω linear resistor
> Label each curve clearly."

✅ **A+ Answer:**
- Open circuit: horizontal line on the v-axis ($i = 0$)
- Short circuit: vertical line on the i-axis ($v = 0$)
- 200Ω resistor: straight line through origin with slope $G = 1/200 = 0.005$ S
- All three pass through the origin
- **Label axes**: v horizontal, i vertical
- **Mark specific points**: at $v = 2$V on the 200Ω line, $i = 10$ mA

---

**Type 3: Derive the Dual Formula (5-6 marks)**

> "The voltage divider formula is $v_{out} = v_{in} \cdot \frac{R_2}{R_1 + R_2}$. Using the duality principle, derive the current divider formula."

✅ **A+ Answer:**
Apply all dual substitutions simultaneously:
- $v_{out} \to i_{out}$
- $v_{in} \to i_{in}$
- $R_1 \to G_1$, $R_2 \to G_2$

$$i_{out} = i_{in} \cdot \frac{G_2}{G_1 + G_2}$$

To express in terms of resistance: $G = 1/R$, so:
$$i_{out} = i_{in} \cdot \frac{1/R_2}{1/R_1 + 1/R_2} = i_{in} \cdot \frac{R_1}{R_1 + R_2}$$

(Note: the subscript swap — $R_1$ appears in the numerator instead of $R_2$. This is a common trap!)

---

**Type 4: Power in Open/Short Circuits (2-3 marks)**

> "Calculate the power absorbed by (a) an open circuit with 100V across it, and (b) a short circuit carrying 5A."

✅ **A+ Answer:**
(a) Open circuit: $i = 0$ always, so $p = vi = 100 \times 0 = 0$ W
(b) Short circuit: $v = 0$ always, so $p = vi = 0 \times 5 = 0$ W

Both absorb zero power. This is consistent with the fact that both are "ideal" elements at the extremes of the resistance spectrum.

---

### What Students Get Wrong

| Mistake | Why It Happens | Fix |
|---------|---------------|-----|
| Drawing open circuit as a vertical line | Confusing open with short | Open = no current = v-axis (horizontal). Short = no voltage = i-axis (vertical). |
| Incomplete dual substitution | Only swapping some variables | You MUST swap ALL variables simultaneously. Missing one makes the result wrong. |
| "An open circuit has infinite power" | $p = v \cdot i$ where $v = \infty$ and $i = 0$? | $R \to \infty$ doesn't mean $v \to \infty$. The open circuit has whatever voltage the circuit imposes, and $i = 0$, so $p = 0$. |
| Forgetting planarity requirement | Not mentioned in most textbooks | Duality only works for planar circuits. Almost all circuits at this level are planar, so it's rarely an issue. |

### Practice Problem

> A linear circuit has the following property: when a voltage source $V_s$ is placed across terminals A-B, the current flowing into the circuit is $I_{in} = \frac{V_s}{R_1 + R_2}$.
>
> (a) Write the dual statement of this property. (3 marks)
>
> (b) The original circuit has $R_1 = 100\,\Omega$ and $R_2 = 300\,\Omega$. If $V_s = 8$ V, find $I_{in}$. (2 marks)
>
> (c) For the dual circuit with $G_1 = 0.01$ S and $G_2 = 0.003\overline{3}$ S, and a current source $I_s = 8$ A, find $V_{in}$ using the dual of your answer from (b). (3 marks)

<details>
<summary><strong>Solution</strong></summary>

**(a)** Apply dual substitutions:
- Voltage source $V_s$ → Current source $I_s$
- Current $I_{in}$ → Voltage $V_{in}$
- $R_1, R_2$ → $G_1, G_2$

Dual statement: "When a current source $I_s$ is placed across terminals A-B, the voltage across the circuit is $V_{in} = \frac{I_s}{G_1 + G_2}$."

**(b)** $I_{in} = \frac{V_s}{R_1 + R_2} = \frac{8}{100 + 300} = \frac{8}{400} = 0.02$ A $= 20$ mA.

**(c)** From the dual formula: $V_{in} = \frac{I_s}{G_1 + G_2} = \frac{8}{0.01 + 0.003\overline{3}} = \frac{8}{0.013\overline{3}} = 600$ V.

**Verification**: $G_1 = 1/R_1 = 1/100 = 0.01$ S ✓ and $G_2 = 1/R_2 = 1/300 = 0.003\overline{3}$ S ✓. The dual formula is structurally identical to the original — only the variable names have changed.

</details>
