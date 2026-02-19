## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From your A-Level mathematics, you should know:
- **Algebra**: manipulating equations, solving for unknowns
- **Trigonometry**: sine, cosine, tangent, and their inverses
- **Coordinate geometry**: plotting points on Cartesian axes
- You may have briefly encountered "imaginary numbers" — that's $j = \sqrt{-1}$

If any of this feels shaky, don't worry — we'll build everything from the ground up. This concept is a review, but it's designed so that even your first encounter with complex numbers will make sense.

</details>

---

## Why Do Electrical Engineers Need Complex Numbers?

Here's a question that might seem strange at first: why would engineers — people who deal with real voltages and real currents — ever need "imaginary" numbers?

The answer is beautifully practical. When you analyse AC circuits, you deal with sinusoidal signals that have both an **amplitude** and a **phase**. A single real number can represent the amplitude, but you need a second number for the phase. Complex numbers package both pieces of information into a single mathematical object — and the arithmetic of complex numbers happens to perfectly mirror the physics of how sinusoidal signals combine.

> **Why This Matters**: Complex numbers are the mathematical language of AC circuit analysis. Every impedance calculation, every phasor, every power computation in this course uses complex arithmetic. Master this, and the rest of the lesson flows naturally.

This is one of those situations where mathematics wasn't invented for its own sake — it was discovered because nature demanded it.

[[visual:complex-plane-intro]]

---

## The Complex Plane

The **complex plane** (also called the Argand diagram) is a two-dimensional space where any complex number $A$ can be represented as a point or a vector.

- The **horizontal axis** is the **real axis** (Re)
- The **vertical axis** is the **imaginary axis** (Im)

A complex number $A$ has two components:

$$A = a_r + ja_i$$

where $a_r = \text{Re}[A]$ is the **real part** and $a_i = \text{Im}[A]$ is the **imaginary part**. The imaginary unit is defined as:

$$\boxed{j = \sqrt{-1}}$$

> **Watch Out**: In mathematics, the imaginary unit is usually written as $i$. In electrical engineering, we use $j$ instead — because $i$ is already reserved for current. Don't let this trip you up.

If the imaginary part is zero, the number is purely real: $A = 3 + j0 = 3$. If the real part is zero, the number is purely imaginary: $A = 0 + j8 = j8$. If the imaginary part is negative, we write $2 + j(-8) = 2 - j8$.

[[visual:complex-plane-plot]]

---

## Two Ways to Represent a Complex Number

Every complex number can be written in two equivalent forms, and knowing when to use each is crucial.

### Rectangular Form (Cartesian Form)

$$A = a_r + ja_i$$

This form is best for **addition and subtraction**. You simply add or subtract the real and imaginary parts separately.

### Polar Form

$$A = |A| \angle \phi_a = |A| e^{j\phi_a}$$

where $|A|$ is the **magnitude** (also written $r$) and $\phi_a$ is the **phase angle**. This form is best for **multiplication, division, and powers**.

The exponential form $|A|e^{j\phi_a}$ is just another way of writing the polar form, and it comes from Euler's formula (which we'll meet shortly).

[[visual:rectangular-vs-polar]]

### Converting Between Forms

To go from rectangular to polar:

$$|A| = \sqrt{a_r^2 + a_i^2}$$

$$\phi_a = \tan^{-1}\left(\frac{a_i}{a_r}\right)$$

> **Watch Out**: The $\tan^{-1}$ formula only works directly when $a_r > 0$. When $a_r < 0$, you must add or subtract $180°$ to get the correct angle: $\phi_a = \pm 180° - \tan^{-1}\left(\frac{a_i}{-a_r}\right)$. Always sketch the complex number on the plane to verify which quadrant it falls in.

To go from polar to rectangular:

$$a_r = |A| \cos \phi_a$$

$$a_i = |A| \sin \phi_a$$

[[visual:conversion-demo]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Consider the complex number $A = -3 + j4$. Without calculating, which quadrant of the complex plane does it lie in? Now compute $|A|$ and $\phi_a$.</summary>

$A$ has a negative real part and a positive imaginary part, so it lies in the **second quadrant** (upper-left).

$|A| = \sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$

Since $a_r < 0$, we use: $\phi_a = 180° - \tan^{-1}(4/3) = 180° - 53.13° = 126.87°$

So $A = 5\angle 126.87°$.

</details>

---

## Arithmetic Operations

### Addition and Subtraction (Use Rectangular Form)

If $A = a_r + ja_i$ and $B = b_r + jb_i$, then:

$$A \pm B = (a_r \pm b_r) + j(a_i \pm b_i)$$

The real parts add separately, and the imaginary parts add separately. This is exactly like vector addition.

### Multiplication (Use Polar Form)

In rectangular form, multiplication expands like an algebraic product:

$$AB = (a_rb_r - a_ib_i) + j(a_rb_i + a_ib_r)$$

But in polar form, it's much simpler — **magnitudes multiply, angles add**:

$$AB = |A||B| \angle (\phi_a + \phi_b)$$

### Division (Use Polar Form)

In polar form: **magnitudes divide, angles subtract**:

$$\frac{A}{B} = \frac{|A|}{|B|} \angle (\phi_a - \phi_b)$$

In rectangular form, division is done via **rationalisation** — multiply the numerator and denominator by the conjugate of the denominator:

$$\frac{B}{A} = \frac{BA^*}{AA^*} = \frac{(b_r + jb_i)(a_r - ja_i)}{a_r^2 + a_i^2}$$

---

## The Complex Conjugate

The **conjugate** of a complex number is formed by changing the sign of the imaginary part:

$$A^* = a_r - ja_i = |A| \angle (-\phi_a) = |A| e^{-j\phi_a}$$

Two incredibly useful identities:

$$A + A^* = 2\text{Re}[A] = 2a_r$$

$$\boxed{AA^* = a_r^2 + a_i^2 = |A|^2}$$

The second identity is why rationalisation works — $AA^*$ is always a real, positive number.

[[visual:conjugate-diagram]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Prove that $(A/B)^* = A^*/B^*$. Start by writing $A$ and $B$ in polar form.</summary>

Let $A = |A|e^{j\phi_a}$ and $B = |B|e^{j\phi_b}$.

$$\frac{A}{B} = \frac{|A|}{|B|} e^{j(\phi_a - \phi_b)}$$

Taking the conjugate:

$$\left(\frac{A}{B}\right)^* = \frac{|A|}{|B|} e^{-j(\phi_a - \phi_b)}$$

Now compute $A^*/B^*$:

$$\frac{A^*}{B^*} = \frac{|A|e^{-j\phi_a}}{|B|e^{-j\phi_b}} = \frac{|A|}{|B|} e^{-j(\phi_a - \phi_b)}$$

The expressions are identical. ✓

</details>

---

## Euler's Formula — The Bridge Between Exponentials and Trigonometry

This is one of the most beautiful equations in all of mathematics, and it's the reason phasors work.

$$\boxed{e^{\pm j\alpha} = \cos\alpha \pm j\sin\alpha}$$

From Euler's formula, we can extract the inverse relationships:

$$\cos\alpha = \frac{e^{j\alpha} + e^{-j\alpha}}{2}$$

$$\sin\alpha = \frac{e^{j\alpha} - e^{-j\alpha}}{2j}$$

Notice that $e^{j\alpha}$ is a complex number with $\text{Re}[e^{j\alpha}] = \cos\alpha$ and $\text{Im}[e^{j\alpha}] = \sin\alpha$. Its magnitude is $|e^{j\alpha}| = 1$ and its angle is $\alpha$. So:

$$e^{j\alpha} = 1\angle\alpha$$

This means $e^{j\alpha}$ is a point on the **unit circle** in the complex plane.

[[visual:euler-unit-circle]]

[[visual:euler-formula-sim]]

### Why Euler's Formula Works — A Quick Proof

Let $E = \cos\alpha + j\sin\alpha$. Differentiating with respect to $\alpha$:

$$\frac{dE}{d\alpha} = -\sin\alpha + j\cos\alpha = j(\cos\alpha + j\sin\alpha) = jE$$

But also $\frac{d}{d\alpha}e^{j\alpha} = je^{j\alpha}$. Both satisfy the same differential equation $\frac{dE}{d\alpha} = jE$, and both equal $1$ at $\alpha = 0$. Therefore $e^{j\alpha} = \cos\alpha + j\sin\alpha$. ∎

### Special Values of $j$

Euler's formula gives us a complete picture of powers of $j$:

| Expression | Value | Angle |
|-----------|-------|-------|
| $j$ | $0 + j1 = 1\angle 90°$ | 90° |
| $j^2$ | $-1 = 1\angle 180°$ | 180° |
| $1/j$ | $-j = 1\angle(-90°)$ | -90° |

> **Key Insight**: Multiplying by $j$ rotates a complex number by $90°$ counterclockwise on the complex plane. This fact is fundamental to understanding how inductors and capacitors create phase shifts.

[[visual:j-rotation-diagram]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Given $A = 3 + j4$, find $A^2$ and $1/A$ in polar form.</summary>

First, convert to polar: $|A| = \sqrt{9+16} = 5$, $\phi = \tan^{-1}(4/3) = 53.13°$. So $A = 5\angle 53.13°$.

$A^2 = 25\angle 106.26°$

$1/A = 0.2\angle(-53.13°)$

</details>

---

## Worked Example: Complex Arithmetic

**Problem**: Given $A = -4 + j3$, find (i) $A - A^*$, (ii) $jA$, (iii) $A + 25/A$.

**Solution**:

(i) $A^* = -4 - j3$. Therefore $A - A^* = (-4 + j3) - (-4 - j3) = j6$.

This confirms the identity $A - A^* = 2j \cdot \text{Im}[A] = 2j(3) = j6$. ✓

(ii) First find $|A| = \sqrt{16 + 9} = 5$ and $\phi_A = 180° - \tan^{-1}(3/4) = 143.13°$.

$jA = (1\angle 90°)(5\angle 143.13°) = 5\angle 233.13°$

Converting back: $jA = j(-4 + j3) = -j4 + j^2(3) = -3 - j4$. ✓

(iii) $A + 25/A$: We need $25/A$. Since $AA^* = |A|^2 = 25$, we have $25/A = A^*$.

Therefore $A + 25/A = A + A^* = 2\text{Re}[A] = -8$.

> **Pro Tip**: Recognising that $|A|^2/A = A^*$ is a shortcut that saves significant computation time in exams.

---

## What's Coming Next

In the next concept, you will learn how sinusoidal signals — the bread and butter of AC circuits — are represented using **phasors**. The complex number arithmetic you've just reviewed is the engine that powers the phasor method. If you're comfortable with rectangular ↔ polar conversion, addition, multiplication, and conjugates, you're ready for what comes next.

---

**The key takeaway from this concept:** Complex numbers let us package amplitude and phase into a single mathematical object. Rectangular form is for addition; polar form is for multiplication. Euler's formula $e^{j\alpha} = \cos\alpha + j\sin\alpha$ is the bridge between exponentials and trigonometry — and it's the reason phasors work. 💪
