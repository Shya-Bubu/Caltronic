## 📝 Exam Focus: AC Power Analysis

### What Examiners Are Looking For

Power analysis is a favourite exam topic. You must know the formulas, units, and the difference between P, Q, S, and power factor.

### Common Question Types

**Type 1: Average Power Calculation (3-5 marks)**

> "Find average power if $v(t) = 100\cos(\omega t + 20°)$ V and $i(t) = 4\cos(\omega t - 10°)$ A."

✅ **A+ Answer**: $P = \frac{1}{2}V_mI_m\cos(\theta_v - \theta_i) = \frac{1}{2}(100)(4)\cos(20° - (-10°)) = 200\cos 30° = 173.2$ W.

---

**Type 2: Complex Power (4-6 marks)**

> "A source V = 120∠0° V (rms) drives a load Z = 30 + j40 Ω. Find S, P, Q, and pf."

✅ **A+ Answer**: $|Z| = 50\,\Omega$, $\theta = 53.13°$. $I = 120/50 = 2.4\angle(-53.13°)$ A (rms). $\mathbf{S} = \mathbf{V}\mathbf{I}^* = 120 \times 2.4\angle 53.13° = 288\angle 53.13°$ VA. $P = 288\cos 53.13° = 172.8$ W. $Q = 288\sin 53.13° = 230.4$ VAR. pf = 0.6 lagging.

---

**Type 3: Power Factor (2-3 marks)**

> "A motor draws 5 kW at a power factor of 0.7 lagging from a 230 V (rms) supply. Find the current."

$S = P/\text{pf} = 5000/0.7 = 7143$ VA. $I = S/V = 7143/230 = 31.06$ A (rms).

---

**Type 4: RMS (2-3 marks)**

> "If the peak voltage of a mains supply is 325 V, find the RMS voltage."

$V_{\text{rms}} = 325/\sqrt{2} = 229.8 \approx 230$ V.

---

### What Students Get Wrong — And How to Avoid It

| Mistake | Why It Happens | How to Fix |
|---------|---------------|------------|
| Using peak instead of RMS values | Formula confusion | $P = V_{\text{rms}}I_{\text{rms}}\cos\theta$, or $P = \frac{1}{2}V_mI_m\cos\theta$. Pick one. |
| Forgetting to conjugate I in S = VI* | Most common error | Always: $\mathbf{S} = \mathbf{V}\mathbf{I}^*$, NOT $\mathbf{V}\mathbf{I}$ |
| Wrong units: watts for apparent power | Unit confusion | P → W, Q → VAR, S → VA. They are NOT interchangeable. |
| Not specifying leading/lagging | Incomplete answer | Always state "leading" (capacitive) or "lagging" (inductive) with pf |

### Practice Problem

> Two loads are connected in parallel across a 240 V (rms) source. Load 1 absorbs 5 kW at pf = 0.8 lagging. Load 2 absorbs 3 kW at pf = 0.9 leading. Find total P, Q, S, and overall pf.

<details>
<summary><strong>Solution</strong></summary>

Load 1: $P_1 = 5000$ W. $\theta_1 = \cos^{-1}(0.8) = 36.87°$. $Q_1 = P_1\tan\theta_1 = 5000 \times 0.75 = 3750$ VAR.

Load 2: $P_2 = 3000$ W. $\theta_2 = \cos^{-1}(0.9) = 25.84°$. $Q_2 = -P_2\tan\theta_2 = -3000 \times 0.484 = -1452$ VAR (negative because leading).

Total: $P = 5000 + 3000 = 8000$ W. $Q = 3750 - 1452 = 2298$ VAR.

$S = \sqrt{P^2 + Q^2} = \sqrt{64000000 + 5280804} = 8324$ VA.

$\text{pf} = P/S = 8000/8324 = 0.961$ lagging (since Q > 0).

</details>
