## 📝 Exam Focus: Impedance Combinations

### What Examiners Are Looking For

Circuit analysis with impedances is the core of AC exam problems. Every question requires correct combination of impedances and application of KVL/KCL.

### Common Question Types

**Type 1: Equivalent Impedance (4-6 marks)**

> "Find the equivalent impedance seen by the source for a series RLC circuit with R = 50 Ω, L = 0.1 H, C = 50 μF at ω = 200 rad/s."

✅ **A+ Answer**: $Z_L = j(200)(0.1) = j20\,\Omega$. $Z_C = 1/(j200 \times 50\times 10^{-6}) = -j100\,\Omega$. $Z_{eq} = 50 + j20 - j100 = 50 - j80\,\Omega = 94.34\angle(-58°)\,\Omega$.

---

**Type 2: Voltage Divider (4-5 marks)**

> "In a series circuit with $Z_1 = 100\,\Omega$ and $Z_2 = j50\,\Omega$, find $\mathbf{V}_2$ if $\mathbf{V}_s = 20\angle 0°$ V."

✅ **A+ Answer**: $\mathbf{V}_2 = \frac{j50}{100 + j50} \cdot 20\angle 0°$. Denominator: $\sqrt{100^2+50^2} = 111.8$, $\theta = 26.57°$. $\mathbf{V}_2 = \frac{50\angle 90°}{111.8\angle 26.57°} \times 20 = 8.94\angle 63.43°$ V.

---

**Type 3: Parallel Impedance (4-6 marks)**

> "Find $Z_{eq}$ for $Z_1 = 10\,\Omega$ in parallel with $Z_2 = -j10\,\Omega$."

✅ **A+ Answer**: $Z_{eq} = \frac{Z_1 Z_2}{Z_1 + Z_2} = \frac{(10)(-j10)}{10 - j10} = \frac{-j100}{10-j10} = \frac{100\angle(-90°)}{10\sqrt{2}\angle(-45°)} = \frac{100}{14.14}\angle(-45°) = 7.07\angle(-45°) = 5 - j5\,\Omega$.

---

### What Students Get Wrong — And How to Avoid It

| Mistake | Why It Happens | How to Fix |
|---------|---------------|------------|
| Adding magnitudes of parallel impedances | Applying $R_1 + R_2$ for parallel | Use $1/Z_{eq} = 1/Z_1 + 1/Z_2$ or product-over-sum |
| Using real-number rationalisation | Treating $j$ as just a number | Show conjugate multiplication explicitly |
| Wrong sign on $Z_C$ | Forgetting $1/j = -j$ | Write $Z_C = -j/(ωC)$ as a check |
| Forgetting to include units and angle | Losing marks on presentation | Always write $\Omega$ for impedance, $°$ for angles |

### Practice Problem

> A source $V_s = 50\angle 0°$ V drives a circuit where a 20 Ω resistor is in series with the parallel combination of $j40\,\Omega$ and $-j20\,\Omega$. Find the current from the source.

<details>
<summary><strong>Solution</strong></summary>

Parallel: $Z_p = \frac{(j40)(-j20)}{j40 - j20} = \frac{800}{j20} = \frac{800}{20\angle 90°} = 40\angle(-90°) = -j40\,\Omega$.

Total: $Z_{eq} = 20 + (-j40) = 20 - j40 = 44.72\angle(-63.43°)\,\Omega$.

$\mathbf{I} = V_s/Z_{eq} = 50\angle 0° / 44.72\angle(-63.43°) = 1.118\angle 63.43°$ A.

</details>
