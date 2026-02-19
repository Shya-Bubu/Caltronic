## 📝 Exam Focus: Complex Numbers Review

### What Examiners Are Looking For

Complex number questions appear either as standalone problems or embedded within phasor and impedance calculations. You must be fluent with conversions and arithmetic — there is no time to hesitate.

### Common Question Types

**Type 1: Rectangular ↔ Polar Conversion (2-4 marks)**

> "Express $A = -3 + j4$ in polar form."

✅ **A+ Answer**: $|A| = \sqrt{9+16} = 5$. Since $a_r < 0$, $\phi = 180° - \tan^{-1}(4/3) = 180° - 53.13° = 126.87°$. Therefore $A = 5\angle 126.87°$.

❌ **Common mistake**: Using $\tan^{-1}(4/(-3)) = -53.13°$ directly without adjusting for the second quadrant. Always check which quadrant your complex number lies in.

---

**Type 2: Complex Arithmetic (3-5 marks)**

> "Given $A = 2 + j3$ and $B = 1 - j2$, find $AB$ and $A/B$."

For multiplication, convert to polar first. For division, either use polar form or rationalise with the conjugate.

✅ **A+ tip**: State clearly whether you are using polar or rectangular. Show intermediate steps.

---

**Type 3: Euler's Formula Application (2-3 marks)**

> "Show that $e^{j\pi} + 1 = 0$."

Apply Euler's formula: $e^{j\pi} = \cos\pi + j\sin\pi = -1 + j0 = -1$. Therefore $e^{j\pi} + 1 = 0$. ✓

---

**Type 4: Conjugate Properties (3-4 marks)**

> "Prove that $AA^* = |A|^2$."

Let $A = a_r + ja_i$. Then $A^* = a_r - ja_i$. $AA^* = (a_r + ja_i)(a_r - ja_i) = a_r^2 + a_i^2 = |A|^2$. ✓

---

### What Students Get Wrong — And How to Avoid It

| Mistake | Why It Happens | How to Fix |
|---------|---------------|------------|
| Wrong quadrant for $\phi$ | Using $\tan^{-1}$ without checking sign of $a_r$ | Always sketch the point on the complex plane first |
| Forgetting $j^2 = -1$ | Rushing through multiplication | Write $j^2 = -1$ as a side note in your working |
| Mixing up $i$ and $j$ | Textbooks use $i$, lectures use $j$ | Stick to $j$ in all EE work |
| Rectangular form for division | Leads to messy fractions | Use polar form, or rationalise with conjugate |

### Practice Problem

> Find $\frac{(3 + j4)(2 - j)}{1 + j2}$ in both rectangular and polar form.

<details>
<summary><strong>Solution</strong></summary>

Numerator: $(3 + j4)(2 - j) = 6 - j3 + j8 - j^24 = 6 + 4 + j(8 - 3) = 10 + j5$.

Denominator: $1 + j2$. Rationalise: $\frac{(10 + j5)(1 - j2)}{(1 + j2)(1 - j2)} = \frac{10 - j20 + j5 - j^210}{1 + 4} = \frac{20 - j15}{5} = 4 - j3$.

Polar form: $|A| = \sqrt{16 + 9} = 5$, $\phi = \tan^{-1}(-3/4) = -36.87°$. So $A = 5\angle(-36.87°)$.

</details>
