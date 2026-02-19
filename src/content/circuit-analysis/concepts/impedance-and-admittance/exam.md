## 📝 Exam Focus: Impedance & Admittance

### What Examiners Are Looking For

Impedance questions are the backbone of AC circuit exams. You must be able to compute impedances instantly and use them in circuit analysis.

### Common Question Types

**Type 1: Compute Element Impedance (2-3 marks)**

> "Find the impedance of a 47 μF capacitor at 60 Hz."

✅ **A+ Answer**: $\omega = 2\pi(60) = 120\pi$ rad/s. $Z_C = \frac{1}{j\omega C} = \frac{1}{j(120\pi)(47 \times 10^{-6})} = \frac{1}{j0.01772} = -j56.44\,\Omega = 56.44\angle(-90°)\,\Omega$.

---

**Type 2: V-I Phase Relationship (2-4 marks)**

> "A 100 mH inductor carries current $i(t) = 2\cos(500t + 30°)$ A. Find $v(t)$."

✅ **A+ Answer**: $Z_L = j\omega L = j(500)(0.1) = j50\,\Omega$. $\mathbf{I} = 2\angle 30°$. $\mathbf{V} = Z_L\mathbf{I} = (50\angle 90°)(2\angle 30°) = 100\angle 120°$. $v(t) = 100\cos(500t + 120°)$ V.

---

**Type 3: Impedance Plane Classification (2-3 marks)**

> "Classify the following impedances as resistive, inductive, or capacitive: (a) $Z = j25\,\Omega$ (b) $Z = 10 - j15\,\Omega$ (c) $Z = 50\,\Omega$."

(a) Purely inductive (positive imaginary). (b) Capacitive (negative reactance dominates). (c) Purely resistive.

---

**Type 4: Admittance Calculation (3-4 marks)**

> "Find the admittance of $Z = 3 + j4\,\Omega$."

$Y = 1/Z = 1/(3+j4) = (3-j4)/(9+16) = (3-j4)/25 = 0.12 - j0.16$ S. So $G = 0.12$ S and $B = -0.16$ S.

---

### What Students Get Wrong — And How to Avoid It

| Mistake | Why It Happens | How to Fix |
|---------|---------------|------------|
| Using $f$ instead of $\omega$ | Confusing frequency and angular frequency | Always compute $\omega = 2\pi f$ first |
| Forgetting $1/j = -j$ | Arithmetic error | Remember: $1/j = j/j^2 = j/(-1) = -j$ |
| Saying capacitor voltage leads current | Mixing up ELI / ICE | Mnemonic: In a Capacitor (C), current (I) leads voltage (E) |
| Treating $G = 1/R$ for complex Z | Only works for pure resistance | Use $G = R/(R^2+X^2)$ for complex impedances |

### Practice Problem

> A parallel RC circuit has $R = 200\,\Omega$, $C = 10\,\mu\text{F}$, $f = 1$ kHz. Find $Z_{total}$ and $Y_{total}$.

<details>
<summary><strong>Solution</strong></summary>

$\omega = 2\pi(1000) = 6283$ rad/s. $Z_R = 200\,\Omega$. $Z_C = 1/(j6283 \times 10^{-5}) = -j15.92\,\Omega$.

For parallel: $Y_{total} = Y_R + Y_C = 1/200 + j\omega C = 0.005 + j0.06283$ S.

$Z_{total} = 1/Y_{total} = 1/(0.005 + j0.06283) = (0.005 - j0.06283)/(0.005^2 + 0.06283^2) = (0.005 - j0.06283)/0.003972 = 1.259 - j15.82\,\Omega$.

</details>
