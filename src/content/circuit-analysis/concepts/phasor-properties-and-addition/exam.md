## 📝 Exam Focus: Phasor Properties & Addition

### What Examiners Are Looking For

Phasor addition and derivative property questions are staple exam questions. You will either see them as standalone problems or as part of larger circuit analysis questions.

### Common Question Types

**Type 1: Add Two Sinusoids Using Phasors (5-6 marks)**

> "Find $v(t) = 20\cos(\omega t + 60°) + 15\cos(\omega t - 30°)$."

✅ **A+ Answer**: Convert to phasors → add in rectangular form → convert result to polar → write time-domain signal. Show every step clearly.

❌ **Common mistake**: Adding magnitudes directly ($20 + 15 = 35$). Magnitudes only add when phases are identical. You must convert to rectangular and add components.

---

**Type 2: KVL/KCL in Phasor Form (4-6 marks)**

> "In a series RLC circuit, the voltage drops are $v_R = 3\cos(\omega t)$, $v_L = 5\cos(\omega t + 90°)$, $v_C = 2\cos(\omega t - 90°)$. Find the source voltage."

Use KVL: $\mathbf{V}_s = \mathbf{V}_R + \mathbf{V}_L + \mathbf{V}_C = 3\angle 0° + 5\angle 90° + 2\angle(-90°)$.

$= 3 + j5 - j2 = 3 + j3 = 3\sqrt{2}\angle 45°$.

$v_s(t) = 3\sqrt{2}\cos(\omega t + 45°)$.

---

**Type 3: Derivative Property Application (3-5 marks)**

> "If $v(t) = 10\cos(200t - 30°)$ is across a 50 mH inductor, find the current."

Inductor: $v = L\frac{di}{dt}$, so $\mathbf{I} = \frac{\mathbf{V}}{j\omega L}$.

$\mathbf{I} = \frac{10\angle(-30°)}{j(200)(0.05)} = \frac{10\angle(-30°)}{10\angle 90°} = 1\angle(-120°)$.

$i(t) = 1\cos(200t - 120°)$ A.

---

### What Students Get Wrong — And How to Avoid It

| Mistake | Why It Happens | How to Fix |
|---------|---------------|------------|
| Adding magnitudes directly | Ignoring phase differences | Always convert to rectangular form first |
| Adding phasors of different frequencies | Misapplying the additive property | Check that ALL signals have the same ω before adding |
| Wrong sign on derivative | Forgetting $j = 1\angle 90°$, not $-90°$ | Remember: differentiation adds +90° |
| Forgetting to convert back to time domain | Stopping at the phasor result | The question asks for $v(t)$, not $\mathbf{V}$ |

### Practice Problem

> Find the sum: $v(t) = 10\cos(\omega t) + 5\sin(\omega t + 45°) - 3\cos(\omega t - 90°)$.

<details>
<summary><strong>Solution</strong></summary>

$\mathbf{V}_1 = 10\angle 0° = 10 + j0$

$\mathbf{V}_2 = 5\angle(45° - 90°) = 5\angle(-45°) = 3.536 - j3.536$

$\mathbf{V}_3 = -3\cos(\omega t - 90°) = 3\cos(\omega t - 90° + 180°) = 3\cos(\omega t + 90°)$, so $\mathbf{V}_3 = 3\angle 90° = 0 + j3$

Sum: $(10 + 3.536) + j(0 - 3.536 + 3) = 13.536 - j0.536$

$|V| = \sqrt{13.536^2 + 0.536^2} = 13.55$, $\phi = \tan^{-1}(-0.536/13.536) = -2.27°$

$v(t) = 13.55\cos(\omega t - 2.27°)$

</details>
