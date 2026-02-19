## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From the previous concepts, you should know:
- What a **phasor** is: $\mathbf{V} = V_m\angle\phi$ represents $V_m\cos(\omega t + \phi)$
- How to convert sinusoids to phasors and back
- Complex number addition and multiplication in both forms
- Euler's formula: $e^{j\alpha} = \cos\alpha + j\sin\alpha$

</details>

---

## Why This Concept Matters

The phasor method would be little more than a notational convenience if it weren't for two remarkable properties: the **additive property** and the **derivative property**. Together, they guarantee that everything you do with sinusoids in the time domain — adding signals, differentiating, integrating — has an exact, much simpler counterpart in the phasor domain.

These two properties are what make phasors a genuinely powerful analysis tool, not just a shorthand.

---

## The Additive Property

**Statement**: The sum of two (or more) sinusoids of the **same frequency** can be found by adding their phasors, and the result is another sinusoid of the same frequency.

If $v_1(t) = V_{m1}\cos(\omega t + \phi_1)$ and $v_2(t) = V_{m2}\cos(\omega t + \phi_2)$, then:

$$v_1(t) + v_2(t) = V_s\cos(\omega t + \phi_s)$$

where $V_s$ and $\phi_s$ are found from the phasor sum:

$$\mathbf{V}_1 + \mathbf{V}_2 = V_{m1}\angle\phi_1 + V_{m2}\angle\phi_2 = V_s\angle\phi_s$$

### Proof

$$v_1 + v_2 = \text{Re}\{\mathbf{V}_1 e^{j\omega t}\} + \text{Re}\{\mathbf{V}_2 e^{j\omega t}\}$$

Since $\text{Re}\{A\} + \text{Re}\{B\} = \text{Re}\{A + B\}$:

$$v_1 + v_2 = \text{Re}\{(\mathbf{V}_1 + \mathbf{V}_2)e^{j\omega t}\}$$

This is a single sinusoid with phasor $\mathbf{V}_1 + \mathbf{V}_2$. ∎

> **Key Insight**: Without phasors, adding two cosines with different phases requires trigonometric identities — a painful process. With phasors, you just convert to rectangular form, add real and imaginary parts, and convert back. Done.

[[visual:phasor-addition-diagram]]

---

## Worked Example: Adding Two Sinusoids

**Problem**: Find $v(t) = 4\cos(\omega t + 30°) + 3\cos(\omega t - 60°)$.

**Solution using trigonometric identities** (the hard way):
You would need to expand both cosines using $\cos(A+B) = \cos A\cos B - \sin A\sin B$, group terms, and combine. This takes many lines of algebra.

**Solution using phasors** (the easy way):

Step 1: Extract phasors.
$$\mathbf{V}_1 = 4\angle 30° = 4(\cos 30° + j\sin 30°) = 3.464 + j2$$
$$\mathbf{V}_2 = 3\angle(-60°) = 3(\cos(-60°) + j\sin(-60°)) = 1.5 - j2.598$$

Step 2: Add in rectangular form.
$$\mathbf{V}_1 + \mathbf{V}_2 = (3.464 + 1.5) + j(2 - 2.598) = 4.964 - j0.598$$

Step 3: Convert to polar.
$$|\mathbf{V}| = \sqrt{4.964^2 + 0.598^2} = \sqrt{24.64 + 0.358} = \sqrt{25} = 5.0$$
$$\phi = \tan^{-1}\left(\frac{-0.598}{4.964}\right) = -6.87°$$

Step 4: Convert back to time domain.
$$v(t) = 5.0\cos(\omega t - 6.87°)$$

[[visual:phasor-addition-worked]]

> **Watch Out**: Phasor addition only works when all sinusoids have the **same frequency** $\omega$. If the frequencies differ, you cannot add phasors — you must work in the time domain.

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Without doing the full calculation, what would happen if you tried to add $4\cos(100t)$ and $3\cos(200t)$ using phasors? Why doesn't it work?</summary>

The frequencies are different ($\omega_1 = 100$ and $\omega_2 = 200$). When you factor out $e^{j\omega t}$, each signal would have a different time factor. The additive property relies on factoring out a **common** $e^{j\omega t}$, so the sum cannot be expressed as a single phasor. The result is not a sinusoid — it's a more complex periodic waveform.

</details>

---

## The Derivative Property

**Statement**: Differentiating a sinusoid in the time domain corresponds to multiplying its phasor by $j\omega$.

$$\frac{d}{dt}[V_m\cos(\omega t + \phi)] \iff j\omega \cdot \mathbf{V}$$

### Proof

$$\frac{d}{dt}[V_m\cos(\omega t + \phi)] = \frac{d}{dt}\text{Re}\{\mathbf{V}e^{j\omega t}\} = \text{Re}\left\{\mathbf{V}\frac{d}{dt}e^{j\omega t}\right\} = \text{Re}\{j\omega\mathbf{V}e^{j\omega t}\}$$

This is a sinusoid with phasor $j\omega\mathbf{V}$. ∎

### What does $j\omega$ do geometrically?

Since $j = 1\angle 90°$, multiplying by $j\omega$ does two things:
1. **Scales** the magnitude by $\omega$
2. **Rotates** the phasor by $+90°$

[[visual:derivative-property-visual]]

This means differentiation:
- Increases the amplitude by a factor of $\omega$
- Advances the phase by 90° (the signal "leads" the original by a quarter cycle)

---

## The Integration Property

Integration is the inverse of differentiation:

$$\int V_m\cos(\omega t + \phi)\,dt \iff \frac{\mathbf{V}}{j\omega}$$

### What does dividing by $j\omega$ do?

Since $\frac{1}{j} = -j = 1\angle(-90°)$:
1. **Divides** the magnitude by $\omega$
2. **Rotates** the phasor by $-90°$

Integration reduces the amplitude and retards the phase by 90°.

---

## Worked Example: Using the Derivative Property

**Problem**: The voltage across a capacitor is $v(t) = 12\cos(500t + 45°)$ V. The capacitor has $C = 10\,\mu\text{F}$. Find the current $i(t)$.

**Solution**: The capacitor current-voltage relationship is $i = C\frac{dv}{dt}$.

Step 1: Phasor of voltage: $\mathbf{V} = 12\angle 45°$.

Step 2: Apply derivative property: $\frac{dv}{dt} \iff j\omega\mathbf{V}$.

$$j\omega\mathbf{V} = (500)(12\angle 45°)(1\angle 90°) = 6000\angle 135°$$

Step 3: Multiply by $C$:

$$\mathbf{I} = C \cdot j\omega\mathbf{V} = 10 \times 10^{-6} \times 6000\angle 135° = 0.06\angle 135°$$

Step 4: Convert to time domain:

$$i(t) = 0.06\cos(500t + 135°) \text{ A} = 60\cos(500t + 135°) \text{ mA}$$

> **Key Insight**: The capacitor current **leads** the voltage by 90°. This is a fundamental result you'll see again and again. Phasors make it trivial to derive.

[[visual:cap-current-leads-voltage]]

---

## Graphical Phasor Addition

Phasors can also be added graphically — just like vectors. Place the tail of the second phasor at the tip of the first. The resultant is the arrow from the origin to the tip of the last phasor.

This is the **tip-to-tail method**, and it is useful for:
- Quickly estimating the magnitude and direction of the sum
- Verifying algebraic results
- Understanding phase relationships visually

[[visual:graphical-addition]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — If two phasors have equal magnitudes but are 180° apart in phase, what is their sum? Sketch it.</summary>

If $\mathbf{V}_1 = V\angle 0°$ and $\mathbf{V}_2 = V\angle 180°$, then:

$$\mathbf{V}_1 + \mathbf{V}_2 = V + (-V) = 0$$

The phasors point in exactly opposite directions and cancel completely. The sum is zero — corresponding to two equal-amplitude sinusoids that are completely out of phase (destructive interference).

</details>

---

## Summary of Phasor Properties

| Property | Time Domain | Phasor Domain |
|----------|------------|---------------|
| Linearity (addition) | $v_1(t) + v_2(t)$ | $\mathbf{V}_1 + \mathbf{V}_2$ |
| Scalar multiplication | $av(t)$ | $a\mathbf{V}$ |
| Differentiation | $\frac{dv}{dt}$ | $j\omega\mathbf{V}$ |
| Integration | $\int v\,dt$ | $\frac{\mathbf{V}}{j\omega}$ |

---

## What's Coming Next

In the next concept, you'll use these properties to derive the **impedance** of resistors, inductors, and capacitors. The derivative property is what converts the inductor equation $v = L\frac{di}{dt}$ and the capacitor equation $i = C\frac{dv}{dt}$ into simple algebraic relationships.

---

**The key takeaway from this concept:** Phasors preserve linearity — adding sinusoids becomes adding complex numbers. Differentiation becomes multiplication by $j\omega$. These two facts are the entire reason AC circuit analysis works using phasors. 💪
