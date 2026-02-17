## 📝 Exam Focus: What Is a Resistor?

### What Examiners Are Looking For

This concept appears in exams almost every year. The question is usually straightforward, but students lose marks by giving the physics definition instead of the circuit theory definition. Let's make sure that doesn't happen to you.

### Common Question Types

**Type 1: Definition (2-3 marks)**

> "Define a two-terminal resistor in the context of circuit theory."

✅ **A+ Answer**: A two-terminal resistor is any circuit element whose terminal voltage $v$ and terminal current $i$ satisfy a relationship of the form $f(v, i) = 0$. The set of all $(v, i)$ pairs satisfying this relationship is called the v-i characteristic.

❌ **Common mistake**: Writing "a component that obeys Ohm's law" or "a component with resistance $R$." This is the physics definition and will cost you marks.

---

**Type 2: Classification (3-5 marks)**

> "State whether each of the following is a two-terminal resistor in the sense of circuit theory, and justify your answer:
> (a) A 220Ω carbon resistor
> (b) A silicon diode
> (c) A 9V battery
> (d) A switch"

✅ **A+ Answer for each**: Yes — and your justification must reference the general definition. For example: "(b) A silicon diode is a two-terminal resistor because it has exactly two terminals (anode and cathode) and its terminal voltage and current satisfy the Shockley diode equation $i = I_s(e^{v/V_T} - 1)$, which is a specific form of $f(v,i) = 0$."

**Pro tip**: The answer is almost always "yes" for any two-terminal device. The question is testing whether you understand the broad definition.

---

**Type 3: Set Notation (3-4 marks)**

> "Write the v-i characteristic of an ideal open circuit using set notation."

✅ **A+ Answer**: $\mathcal{R} = \{(v, i) : i = 0, \, v \in \mathbb{R}\}$

Other common ones to practice:
- Short circuit: $\mathcal{R} = \{(v, i) : v = 0, \, i \in \mathbb{R}\}$
- DC voltage source ($V_s$): $\mathcal{R} = \{(v, i) : v = V_s, \, i \in \mathbb{R}\}$
- Linear resistor: $\mathcal{R} = \{(v, i) : v = Ri\}$

---

**Type 4: Sketch the v-i Characteristic (4-5 marks)**

> "On the v-i plane, sketch the characteristics of: (a) a 50Ω resistor, (b) an open circuit, (c) a DC current source of 2A."

**A+ tips**:
- **Label your axes**: Always write which variable is on which axis. On the v-i plane, $v$ is horizontal, $i$ is vertical.
- **Mark key points**: For the 50Ω resistor, pick a value (say $v = 5$V) and show $i = 0.1$A.
- **Use a ruler for straight lines**: Seems obvious, but messy sketches lose marks.
- **For the current source**: It's a horizontal line at $i = 2$A (constant current regardless of voltage).

---

### What Students Get Wrong — And How to Avoid It

| Mistake | Why It Happens | How to Fix |
|---------|---------------|-----------|
| Using $V = IR$ as the definition | Old habit from A-Level | Memorize: $f(v, i) = 0$ is the definition |
| Saying "diodes aren't resistors" | Confusion with everyday meaning | Remember: ANY two-terminal v-i relationship = resistor |
| Mixing up v-i and i-v plane axes | Not reading the question carefully | v-i → v is horizontal; i-v → i is horizontal |
| Forgetting sources are resistors | Seems counterintuitive | A battery has $v = V_s$ → that's $f(v,i) = v - V_s = 0$ |

### Practice Problem

> A mysterious device has the following measured data points:
>
> | $v$ (V) | $i$ (mA) |
> |---------|----------|
> | -3 | 0 |
> | -2 | 0 |
> | -1 | 0 |
> | 0 | 0 |
> | 0.5 | 1.2 |
> | 0.6 | 5.8 |
> | 0.7 | 28 |
>
> (a) Is this device a two-terminal resistor? (1 mark)
>
> (b) Sketch its v-i characteristic. (3 marks)
>
> (c) What type of device could this be? (1 mark)
>
> (d) Is the v-i relationship linear or nonlinear? Justify. (2 marks)

<details>
<summary><strong>Solution</strong></summary>

**(a)** Yes. The data shows a clear relationship between $v$ and $i$ — for each voltage, there is a corresponding current. This satisfies the general form $f(v, i) = 0$.

**(b)** Plot the points on the v-i plane ($v$ horizontal, $i$ vertical). The curve is essentially zero for $v < 0$, begins rising near $v = 0.5$V, and increases rapidly (exponentially) for $v > 0.6$V.

**(c)** This is consistent with a **silicon PN-junction diode** (forward turn-on voltage around 0.6-0.7V, exponential rise).

**(d)** The relationship is **nonlinear**. A linear relationship would produce equally spaced current values for equally spaced voltage values (constant $\Delta i / \Delta v$). Here, the current jumps from 5.8 mA to 28 mA for only a 0.1V increase — the ratio $\Delta i / \Delta v$ is not constant. The curve is exponential, not a straight line.

</details>
