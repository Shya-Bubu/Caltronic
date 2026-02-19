## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From the previous concept, you should know:
- **Complex numbers** in rectangular ($a_r + ja_i$) and polar ($|A|\angle\phi$) form
- **Euler's formula**: $e^{j\alpha} = \cos\alpha + j\sin\alpha$
- How to convert between rectangular and polar forms
- Complex conjugate and basic arithmetic

If any of this feels uncertain, revisit the Complex Numbers Review before continuing.

</details>

---

## The Problem That Phasors Solve

Let's say you have a voltage signal $v(t) = 5\cos(1000t + 30°)$ applied to a circuit. To find the current, you would need to solve a differential equation involving sines and cosines. This is tedious, error-prone, and gets exponentially harder as circuits get more complex.

Here's the key insight: if every signal in the circuit is sinusoidal with the **same frequency** $\omega$, then **every voltage and current differs only in amplitude and phase**. The frequency is the same everywhere. So why keep writing $\cos(\omega t + \dots)$ over and over?

> **Why This Matters**: The phasor method strips away the redundant time-varying part and keeps only the information that changes from signal to signal — the amplitude and phase. This transforms differential equations into simple algebraic equations.

The idea of solving AC circuits using phasors was introduced by the German-Austrian mathematician and electrical engineer **Charles Proteus Steinmetz** (1865–1923). It is, without exaggeration, one of the most important ideas in electrical engineering.

[[visual:sinusoid-to-phasor-concept]]

---

## What Is a Phasor?

A **phasor** is a complex number that represents the amplitude and phase of a sinusoid.

Start with a cosine signal:

$$v(t) = V_m \cos(\omega t + \phi)$$

Using Euler's formula, we can write $\cos(\omega t + \phi) = \text{Re}\{e^{j(\omega t + \phi)}\}$. Therefore:

$$v(t) = \text{Re}\{V_m e^{j(\omega t + \phi)}\} = \text{Re}\{V_m e^{j\phi} \cdot e^{j\omega t}\}$$

Now define the **phasor** $\mathbf{V}$ as everything that is NOT the time-varying factor $e^{j\omega t}$:

$$\boxed{\mathbf{V} = V_m e^{j\phi} = V_m \angle \phi}$$

So the full signal is $v(t) = \text{Re}\{\mathbf{V} e^{j\omega t}\}$, and the phasor $\mathbf{V}$ captures just the amplitude $V_m$ and phase $\phi$.

[[visual:phasor-extraction]]

> **Key Insight**: The phasor is what you get when you "factor out" the $e^{j\omega t}$ from a sinusoid. It contains all the information you need — amplitude and phase — without the redundant time factor.

---

## The Sinusoid-Phasor Transformation

This table is one of the most important references in this lesson. Commit it to memory.

| Time Domain | Phasor Domain |
|------------|---------------|
| $V_m\cos(\omega t + \phi)$ | $V_m\angle\phi$ |
| $V_m\sin(\omega t + \phi)$ | $V_m\angle(\phi - 90°)$ |

> **Watch Out**: The phasor method assumes **cosine reference**. If your signal is a sine, convert it first: $\sin(\omega t + \phi) = \cos(\omega t + \phi - 90°)$. Then extract the phasor.

Let's practise this transformation with a few examples:

| Signal $v(t)$ or $i(t)$ | Step 1: Convert to cosine | Phasor |
|--------------------------|--------------------------|--------|
| $5.2\cos(\omega t + 30°)$ V | Already cosine | $\mathbf{V} = 5.2\angle 30°$ |
| $-1.5\cos(\omega t + 60°)$ | $= 1.5\cos(\omega t + 60° - 180°) = 1.5\cos(\omega t - 120°)$ | $\mathbf{V} = 1.5\angle(-120°)$ |
| $1.63\sin(\omega t)$ A | $= 1.63\cos(\omega t - 90°)$ | $\mathbf{I} = 1.63\angle(-90°)$ |

[[visual:phasor-transform-table]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — A signal is given as $i(t) = -3\sin(\omega t + 45°)$. What is its phasor? Walk through the conversion step by step.</summary>

Step 1: Handle the negative sign. $-3\sin(\omega t + 45°) = 3\sin(\omega t + 45° - 180°) = 3\sin(\omega t - 135°)$.

Step 2: Convert sine to cosine. $3\sin(\omega t - 135°) = 3\cos(\omega t - 135° - 90°) = 3\cos(\omega t - 225°)$.

Step 3: Extract phasor. $\mathbf{I} = 3\angle(-225°) = 3\angle(135°)$ (adding 360° for the standard range).

</details>

---

## Phasor Diagrams

Since a phasor has both a magnitude and a direction (angle), it behaves like a **vector** in the complex plane. We can represent it graphically as an arrow from the origin.

The **phasor diagram** plots one or more phasors on the complex plane:
- The **length** of the arrow is the amplitude $V_m$
- The **angle** from the positive real axis is the phase $\phi$
- Multiple phasors can be compared on the same diagram to see relative phase differences

[[visual:phasor-diagram-example]]

[[visual:rotating-phasor-sim]]

The phasor diagram is a snapshot of the rotating vector at $t = 0$. In reality, the full signal $\mathbf{V}e^{j\omega t}$ is a vector that rotates counterclockwise at angular frequency $\omega$. The phasor method works because all vectors rotate at the same rate — so the relative positions never change.

---

## Differentiation and Integration in the Phasor Domain

This is where phasors become truly powerful. Two critical properties:

### Differentiation → Multiply by $j\omega$

If $v(t) = \text{Re}\{\mathbf{V}e^{j\omega t}\}$, then:

$$\frac{dv(t)}{dt} = \text{Re}\{j\omega\mathbf{V}e^{j\omega t}\}$$

Therefore, in the phasor domain:

$$\boxed{\frac{dv}{dt} \iff j\omega\mathbf{V}}$$

Differentiating a sinusoid scales its amplitude by $\omega$ and shifts its phase by $+90°$ (because $j = 1\angle 90°$).

### Integration → Divide by $j\omega$

$$\boxed{\int v(t)\,dt \iff \frac{\mathbf{V}}{j\omega}}$$

Integrating a sinusoid divides its amplitude by $\omega$ and shifts its phase by $-90°$.

> **Key Insight**: These two properties are what allow us to convert differential equations with inductors ($v = L\frac{di}{dt}$) and capacitors ($i = C\frac{dv}{dt}$) into simple algebraic equations. We will use this extensively in the impedance concept.

[[visual:differentiation-phasor]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — If $v(t) = 25\cos(200t - 45°)$, what is $\frac{dv}{dt}$ as a time-domain signal? Use the derivative property.</summary>

Phasor: $\mathbf{V} = 25\angle(-45°)$.

Derivative phasor: $j\omega\mathbf{V} = (200\angle 90°)(25\angle(-45°)) = 5000\angle 45°$.

Back to time domain: $\frac{dv}{dt} = 5000\cos(200t + 45°)$.

The amplitude scaled by $\omega = 200$, and the phase shifted by $+90°$.

</details>

---

## The Key Differences Between $v(t)$ and $\mathbf{V}$

| Property | $v(t)$ (Time Domain) | $\mathbf{V}$ (Phasor Domain) |
|----------|---------------------|------------------------------|
| Representation | Instantaneous value at each time $t$ | Amplitude and phase only |
| Time dependence | Varies with time | Does **not** depend on time |
| Complex? | Always **real** (no $j$) | Generally **complex** |
| Contains frequency? | Yes ($\omega$ appears) | No ($\omega$ is implicit) |

This distinction is important: phasors are **not** functions of time. They encode the steady-state amplitude and phase of a sinusoidal signal. The frequency $\omega$ is understood from context and is the same for all signals in the circuit.

[[visual:time-vs-phasor-comparison]]

---

## Going Back: Phasor → Time Domain

To recover the time-domain signal from a phasor:

1. Multiply the phasor by $e^{j\omega t}$
2. Take the real part

$$v(t) = \text{Re}\{\mathbf{V}e^{j\omega t}\}$$

**Example**: $\mathbf{V} = 10\angle(-30°)$ at $\omega = 500$ rad/s.

$$v(t) = \text{Re}\{10e^{-j30°} \cdot e^{j500t}\} = 10\cos(500t - 30°)$$

---

## What's Coming Next

Now that you know how to represent sinusoids as phasors, the next concept covers the **additive and derivative properties** of phasors in more depth — including worked examples of how to add multiple sinusoidal signals using phasor addition instead of trigonometric identities.

---

**The key takeaway from this concept:** A phasor $\mathbf{V} = V_m\angle\phi$ is a complex number that encodes the amplitude and phase of a sinusoid $V_m\cos(\omega t + \phi)$. Always convert to cosine first. Differentiation becomes multiplication by $j\omega$; integration becomes division by $j\omega$. This is the reason capacitors and inductors become simple algebraic elements in the phasor domain. 💪
