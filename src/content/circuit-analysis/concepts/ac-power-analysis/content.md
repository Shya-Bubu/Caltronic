## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **Phasors**: $\mathbf{V} = V_m\angle\theta_v$ and $\mathbf{I} = I_m\angle\theta_i$
- **Impedance**: $Z = R + jX$, $\mathbf{V} = Z\mathbf{I}$
- **Complex conjugate**: $A^* = |A|\angle(-\phi)$
- **Trigonometric identities**: $\cos A\cos B = \frac{1}{2}[\cos(A-B) + \cos(A+B)]$

</details>

---

## Why Power in AC Is Different from DC

In a DC circuit, power is beautifully simple: $P = VI = I^2R = V^2/R$. The power is constant and always positive — the load continuously absorbs energy.

In an AC circuit, things are fundamentally different. The voltage and current are both sinusoidal, and they may have different phases. Their product $p(t) = v(t) \cdot i(t)$ is itself a time-varying function that can be **positive** (the load absorbs energy) or **negative** (the load returns energy to the source).

> **Why This Matters**: Understanding AC power — average power, reactive power, power factor, and complex power — is essential for power engineering, motor design, and electrical grid management. It's also a significant portion of your exam.

[[visual:instantaneous-power-waveform]]

---

## Instantaneous Power

Let $v(t) = V_m\cos(\omega t + \theta_v)$ and $i(t) = I_m\cos(\omega t + \theta_i)$.

The **instantaneous power** is:

$$p(t) = v(t) \cdot i(t) = V_mI_m\cos(\omega t + \theta_v)\cos(\omega t + \theta_i)$$

Using the trigonometric identity $\cos A\cos B = \frac{1}{2}[\cos(A-B) + \cos(A+B)]$:

$$\boxed{p(t) = \frac{V_mI_m}{2}\cos(\theta_v - \theta_i) + \frac{V_mI_m}{2}\cos(2\omega t + \theta_v + \theta_i)}$$

The first term is a **constant** — it doesn't vary with time. The second term oscillates at **twice** the signal frequency and has zero average over a complete cycle.

---

## Average Power

The **average power** $P$ is the time-average of $p(t)$ over one period:

$$\boxed{P = \frac{1}{2}V_mI_m\cos(\theta_v - \theta_i)}$$

The angle $\theta_v - \theta_i$ is the phase difference between voltage and current. The term $\cos(\theta_v - \theta_i)$ is called the **power factor**.

Key observations:
- For a **resistor** ($\theta_v = \theta_i$): $P = \frac{1}{2}V_mI_m$ — maximum power transfer
- For a **purely reactive** element ($|\theta_v - \theta_i| = 90°$): $P = 0$ — no average power absorbed
- $P$ is always $\geq 0$ for passive elements

[[visual:average-power-diagram]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Why does a purely reactive element (ideal inductor or capacitor) absorb zero average power?</summary>

When voltage and current are 90° apart, $\cos(90°) = 0$, so $P = 0$. Physically, the element stores energy during one quarter-cycle (positive power) and returns it during the next quarter-cycle (negative power). Over a full cycle, the net energy transfer is zero.

</details>

---

## RMS Values (Root Mean Square)

The **RMS value** of a periodic signal is defined as the square root of the mean of the squared signal:

$$V_{\text{rms}} = \sqrt{\frac{1}{T}\int_0^T v^2(t)\,dt}$$

For a sinusoid $V_m\cos(\omega t + \phi)$:

$$\boxed{V_{\text{rms}} = \frac{V_m}{\sqrt{2}} \approx 0.707 V_m}$$

Similarly, $I_{\text{rms}} = I_m/\sqrt{2}$.

The average power formula simplifies beautifully with RMS values:

$$\boxed{P = V_{\text{rms}}I_{\text{rms}}\cos(\theta_v - \theta_i)}$$

> **Key Insight**: When someone says "the mains voltage is 230 V", they mean the RMS value. The peak voltage is actually $230\sqrt{2} \approx 325$ V. RMS is the standard because a 230 V RMS AC supply delivers the same average power to a resistor as a 230 V DC supply.

[[visual:rms-comparison]]

---

## Apparent Power, Reactive Power, and Power Factor

### Apparent Power $S$

$$S = V_{\text{rms}}I_{\text{rms}} = \frac{V_mI_m}{2}$$

- Unit: **volt-amperes** (VA), not watts
- It's the "size" of the complex power — the maximum possible average power if the load were purely resistive

### Power Factor (pf)

$$\boxed{\text{pf} = \cos(\theta_v - \theta_i) = \frac{P}{S}}$$

The power factor tells you what fraction of the apparent power is actually doing useful work.

- **pf = 1**: All power is useful (purely resistive load)
- **pf = 0**: No useful power (purely reactive load)
- **Lagging** pf: Current lags voltage — **inductive** load (most common: motors)
- **Leading** pf: Current leads voltage — **capacitive** load

> **Watch Out**: Always specify whether the power factor is **leading** or **lagging**. A pf of 0.8 lagging and 0.8 leading represent very different circuits — the lagging case is inductive, the leading case is capacitive.

[[visual:power-factor-diagram]]

### Reactive Power $Q$

$$\boxed{Q = V_{\text{rms}}I_{\text{rms}}\sin(\theta_v - \theta_i) = \frac{V_mI_m}{2}\sin(\theta_v - \theta_i)}$$

- Unit: **volt-amperes reactive** (VAR)
- Positive $Q$ means inductive (energy stored in magnetic fields)
- Negative $Q$ means capacitive (energy stored in electric fields)
- Reactive power represents energy that oscillates back and forth — it does no useful work

---

## Complex Power $\mathbf{S}$

The most elegant formulation ties everything together:

$$\boxed{\mathbf{S} = P + jQ = \frac{1}{2}\mathbf{V}\mathbf{I}^* = \mathbf{V}_{\text{rms}}\mathbf{I}_{\text{rms}}^*}$$

where $\mathbf{I}^*$ is the complex conjugate of the current phasor.

From this single complex number:
- $P = \text{Re}[\mathbf{S}]$ — real (average) power in watts
- $Q = \text{Im}[\mathbf{S}]$ — reactive power in VAR
- $|\mathbf{S}| = S$ — apparent power in VA
- $\text{pf} = P/|S| = \cos(\theta_v - \theta_i)$

> **Key Insight**: The conjugate $\mathbf{I}^*$ is essential. Without it, you would get $\theta_v + \theta_i$ instead of $\theta_v - \theta_i$, which is meaningless for power analysis.

---

## The Power Triangle

The relationship $\mathbf{S} = P + jQ$ forms a right triangle:

- **Horizontal leg**: $P$ (real power) — watts
- **Vertical leg**: $Q$ (reactive power) — VAR
- **Hypotenuse**: $S$ (apparent power) — VA
- **Angle**: $\theta_v - \theta_i$ (power factor angle)

$$S^2 = P^2 + Q^2$$

[[visual:power-triangle]]

---

## Power Absorbed by R, L, and C

| Element | $Z$ | $P$ | $Q$ | Power Factor |
|---------|-----|-----|-----|-------------|
| Resistor | $R$ | $I_{\text{rms}}^2 R$ | $0$ | 1 (unity) |
| Inductor | $j\omega L$ | $0$ | $I_{\text{rms}}^2 \omega L > 0$ | 0 lagging |
| Capacitor | $\frac{1}{j\omega C}$ | $0$ | $-I_{\text{rms}}^2/(\omega C) < 0$ | 0 leading |

- Resistors absorb real power only
- Inductors absorb positive reactive power (lagging)
- Capacitors supply reactive power (or equivalently, absorb negative reactive power)

---

## Conservation of AC Power

The principle of conservation of energy extends to complex power:

$$\boxed{\sum \mathbf{S}_{\text{sources}} = \sum \mathbf{S}_{\text{loads}}}$$

Both real power $P$ and reactive power $Q$ are individually conserved:

$$\sum P_{\text{sources}} = \sum P_{\text{loads}}, \qquad \sum Q_{\text{sources}} = \sum Q_{\text{loads}}$$

[[visual:power-conservation-diagram]]

---

## Worked Example: Complete Power Analysis

**Problem**: A load with impedance $Z = 60 + j80\,\Omega$ is connected to a source $v(t) = 200\cos(1000t)$ V. Find $P$, $Q$, $S$, and the power factor.

**Solution**:

$|Z| = \sqrt{60^2 + 80^2} = 100\,\Omega$, $\theta_Z = \tan^{-1}(80/60) = 53.13°$.

$\mathbf{I} = \mathbf{V}/Z = \frac{200\angle 0°}{100\angle 53.13°} = 2\angle(-53.13°)$ A.

$I_{\text{rms}} = 2/\sqrt{2} = \sqrt{2}$ A. $V_{\text{rms}} = 200/\sqrt{2} = 100\sqrt{2}$ V.

Complex power: $\mathbf{S} = \frac{1}{2}\mathbf{V}\mathbf{I}^* = \frac{1}{2}(200\angle 0°)(2\angle 53.13°) = 200\angle 53.13°$

$P = 200\cos 53.13° = 120$ W.

$Q = 200\sin 53.13° = 160$ VAR (inductive/lagging).

$S = 200$ VA.

$\text{pf} = \cos 53.13° = 0.6$ lagging.

Alternatively: $P = I_{\text{rms}}^2 R = 2 \times 60 = 120$ W. $Q = I_{\text{rms}}^2 X = 2 \times 80 = 160$ VAR. ✓

---

## Falstad Simulation: Power in an RL Circuit

Explore how power is distributed between the resistor and inductor. Notice that instantaneous power in the inductor oscillates between positive and negative, while average power is zero.

[[visual:falstad-power-rl]]

---

**The key takeaway from this concept:** Average power is $P = V_{\text{rms}}I_{\text{rms}}\cos(\theta_v - \theta_i)$. Complex power $\mathbf{S} = P + jQ = \mathbf{V}_{\text{rms}}\mathbf{I}_{\text{rms}}^*$ unifies real power, reactive power, and apparent power. The power factor $\cos(\theta_v - \theta_i)$ tells you what fraction of VA is doing useful work. Always specify leading or lagging. 💪
