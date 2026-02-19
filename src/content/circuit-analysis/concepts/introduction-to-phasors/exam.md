## 📝 Exam Focus: Introduction to Phasors

### What Examiners Are Looking For

Phasor transformation questions are guaranteed on every AC circuits exam. You must be able to convert between time domain and phasor domain flawlessly — and quickly.

### Common Question Types

**Type 1: Sinusoid → Phasor (2-3 marks)**

> "Find the phasor representation of $v(t) = 10\cos(500t - 60°)$."

✅ **A+ Answer**: $\mathbf{V} = 10\angle(-60°)$ V.

❌ **Common mistake**: Including $\omega$ in the phasor. The phasor does NOT contain the frequency — only amplitude and phase.

---

**Type 2: Sine → Cosine → Phasor (3-4 marks)**

> "Express $i(t) = 4\sin(2000\pi t + 30°)$ as a phasor."

✅ **A+ Answer**: First convert: $\sin(\theta) = \cos(\theta - 90°)$. So $i(t) = 4\cos(2000\pi t + 30° - 90°) = 4\cos(2000\pi t - 60°)$. Therefore $\mathbf{I} = 4\angle(-60°)$ A.

---

**Type 3: Phasor → Time Domain (2-3 marks)**

> "Convert $\mathbf{V} = 12\angle 45°$ back to the time domain at $\omega = 377$ rad/s."

✅ **A+ Answer**: $v(t) = 12\cos(377t + 45°)$ V.

---

**Type 4: Derivative Property (3-5 marks)**

> "Using the phasor method, find $\frac{dv}{dt}$ if $v(t) = 50\cos(100\pi t + 20°)$."

✅ **A+ Answer**: $\mathbf{V} = 50\angle 20°$. Derivative phasor: $j\omega\mathbf{V} = (100\pi\angle 90°)(50\angle 20°) = 5000\pi\angle 110°$. Therefore $\frac{dv}{dt} = 5000\pi\cos(100\pi t + 110°)$.

---

### What Students Get Wrong — And How to Avoid It

| Mistake | Why It Happens | How to Fix |
|---------|---------------|------------|
| Not converting sine to cosine first | Forgetting the cosine convention | Rule: always convert to cosine before extracting phasor |
| Including $\omega t$ in phasor | Fundamental misunderstanding | Phasor = amplitude∠phase ONLY. No time. |
| Negative amplitude not handled | $-5\cos(\theta) = 5\cos(\theta - 180°)$ | Add 180° to phase to make amplitude positive |
| Mixing up lead/lag | Phase direction confusion | Positive phase = leads; negative phase = lags |

### Practice Problem

> Three voltages in a circuit are: $v_1(t) = 10\cos(\omega t)$, $v_2(t) = 5\sin(\omega t + 45°)$, and $v_3(t) = -8\cos(\omega t - 30°)$. Express each as a phasor.

<details>
<summary><strong>Solution</strong></summary>

$\mathbf{V}_1 = 10\angle 0°$ (already in cosine form).

$\mathbf{V}_2$: Convert sine: $5\sin(\omega t + 45°) = 5\cos(\omega t + 45° - 90°) = 5\cos(\omega t - 45°)$. So $\mathbf{V}_2 = 5\angle(-45°)$.

$\mathbf{V}_3$: Handle negative: $-8\cos(\omega t - 30°) = 8\cos(\omega t - 30° + 180°) = 8\cos(\omega t + 150°)$. So $\mathbf{V}_3 = 8\angle 150°$.

</details>
