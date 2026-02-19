## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

From the previous concepts:
- **Phasors**: $\mathbf{V} = V_m\angle\phi$ represents $V_m\cos(\omega t + \phi)$
- **Derivative property**: $\frac{dv}{dt} \iff j\omega\mathbf{V}$
- **Additive property**: Sinusoid addition becomes phasor addition
- **Complex arithmetic**: multiplication and division in polar form

From earlier lessons:
- **Ohm's law**: $v = Ri$ for resistors
- **Inductor equation**: $v = L\frac{di}{dt}$
- **Capacitor equation**: $i = C\frac{dv}{dt}$

</details>

---

## The Core Idea: V = ZI

In DC circuits, Ohm's law says $V = RI$ — voltage equals resistance times current. The beauty of phasors is that we can write an almost identical equation for **any** circuit element in the AC steady state:

$$\boxed{\mathbf{V} = Z\mathbf{I}}$$

where $Z$ is the **impedance** — a complex number that plays the same role for AC circuits that resistance plays for DC circuits. The impedance captures both the amplitude scaling and the phase shift that an element introduces between voltage and current.

> **Why This Matters**: This single equation $\mathbf{V} = Z\mathbf{I}$ means you can analyse AC circuits using exactly the same techniques as DC circuits — nodal analysis, mesh analysis, voltage dividers, Thevenin equivalents — just with complex-valued impedances instead of real-valued resistances.

Let's derive the impedance for each of the three fundamental passive elements.

[[visual:ohms-law-ac-analogy]]

---

## Impedance of a Resistor: $Z_R = R$

For a resistor, the v-i relationship is:

$$v(t) = Ri(t)$$

If $i(t) = I_m\cos(\omega t + \phi_i)$, then $v(t) = RI_m\cos(\omega t + \phi_i)$.

In phasor form:

$$\mathbf{V} = R\mathbf{I}$$

Therefore:

$$\boxed{Z_R = R}$$

The impedance of a resistor is simply its resistance — a **real number**. The voltage and current are **in phase** (zero phase difference).

[[visual:resistor-phasor-diagram]]

---

## Impedance of an Inductor: $Z_L = j\omega L$

For an inductor:

$$v(t) = L\frac{di}{dt}$$

Using the derivative property ($\frac{d}{dt} \iff j\omega$):

$$\mathbf{V} = j\omega L \cdot \mathbf{I}$$

Therefore:

$$\boxed{Z_L = j\omega L = \omega L\angle 90°}$$

The impedance of an inductor is **purely imaginary** and **positive**. The voltage **leads** the current by $90°$.

> **Key Insight**: At DC ($\omega = 0$), the inductor impedance is zero — it acts like a short circuit. At very high frequencies, the impedance becomes very large — the inductor acts like an open circuit. This makes physical sense: an inductor opposes changes in current, and faster changes (higher $\omega$) create more opposition.

[[visual:inductor-phasor-diagram]]

---

## Impedance of a Capacitor: $Z_C = \frac{1}{j\omega C}$

For a capacitor:

$$i(t) = C\frac{dv}{dt}$$

In phasor form: $\mathbf{I} = j\omega C \cdot \mathbf{V}$, which gives $\mathbf{V} = \frac{1}{j\omega C}\mathbf{I}$.

Therefore:

$$\boxed{Z_C = \frac{1}{j\omega C} = -\frac{j}{\omega C} = \frac{1}{\omega C}\angle(-90°)}$$

The impedance of a capacitor is **purely imaginary** and **negative**. The voltage **lags** the current by $90°$.

> **Key Insight**: At DC ($\omega = 0$), the capacitor impedance is infinite — it acts like an open circuit. At very high frequencies, the impedance approaches zero — it acts like a short circuit. A capacitor opposes changes in voltage.

[[visual:capacitor-phasor-diagram]]

---

## Summary: The Three Impedances

| Element | Time Domain | Phasor Domain | Impedance $Z$ | Phase of V relative to I |
|---------|-----------|--------------|---------------|--------------------------|
| Resistor | $v = Ri$ | $\mathbf{V} = R\mathbf{I}$ | $R$ | In phase ($0°$) |
| Inductor | $v = L\frac{di}{dt}$ | $\mathbf{V} = j\omega L\mathbf{I}$ | $j\omega L$ | V leads I by $90°$ |
| Capacitor | $i = C\frac{dv}{dt}$ | $\mathbf{V} = \frac{1}{j\omega C}\mathbf{I}$ | $\frac{1}{j\omega C}$ | V lags I by $90°$ |

> **Mnemonic**: **ELI the ICE man**. In an inductor (L), voltage (E) leads current (I). In a capacitor (C), current (I) leads voltage (E).

[[visual:impedance-summary-table]]

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — Why is the impedance of a resistor purely real, while inductors and capacitors have purely imaginary impedances? What does "imaginary impedance" physically mean?</summary>

A real impedance means the element dissipates power — voltage and current are in phase, so their product (power) is always positive. An imaginary impedance means the element stores and returns energy without dissipating any — voltage and current are 90° apart, so the average power is zero. Inductors store energy in magnetic fields; capacitors store energy in electric fields. Neither dissipates power in the ideal case.

</details>

---

## Resistance, Reactance, and the Impedance Plane

For a general impedance $Z$, we can write:

$$Z = R + jX$$

where:
- $R = \text{Re}[Z]$ is the **resistance** (always ≥ 0 for passive elements)
- $X = \text{Im}[Z]$ is the **reactance**

| Element | Resistance $R$ | Reactance $X$ |
|---------|---------------|---------------|
| Resistor | $R$ | $0$ |
| Inductor | $0$ | $\omega L$ (positive = **inductive**) |
| Capacitor | $0$ | $-\frac{1}{\omega C}$ (negative = **capacitive**) |

The **impedance plane** plots $R$ on the horizontal axis and $X$ on the vertical axis. Pure resistors sit on the real axis. Inductors sit on the positive imaginary axis. Capacitors sit on the negative imaginary axis.

[[visual:impedance-plane-plot]]

---

## Admittance: The Reciprocal of Impedance

**Admittance** is defined as the reciprocal of impedance:

$$\boxed{Y = \frac{1}{Z} = \frac{\mathbf{I}}{\mathbf{V}}}$$

So $\mathbf{I} = Y\mathbf{V}$. Admittance is particularly useful for parallel circuit analysis.

$$Y = G + jB$$

where:
- $G$ is the **conductance** (real part)
- $B$ is the **susceptance** (imaginary part)

| Element | Impedance $Z$ | Admittance $Y$ |
|---------|--------------|----------------|
| Resistor | $R$ | $G = 1/R$ |
| Inductor | $j\omega L$ | $-j/({\omega L})$ |
| Capacitor | $1/(j\omega C)$ | $j\omega C$ |

> **Watch Out**: $G$ and $B$ are NOT simply $1/R$ and $-1/X$ in general. For a complex impedance $Z = R + jX$: $Y = \frac{R - jX}{R^2 + X^2}$, so $G = R/(R^2 + X^2)$ and $B = -X/(R^2 + X^2)$.

[[visual:admittance-comparison]]

---

## Worked Example: Finding Impedance

**Problem**: A series RL circuit has $R = 100\,\Omega$ and $L = 0.2$ H. Find the impedance at $f = 50$ Hz.

**Solution**:

$\omega = 2\pi f = 2\pi(50) = 100\pi = 314.16$ rad/s.

$Z_R = 100\,\Omega$ and $Z_L = j\omega L = j(314.16)(0.2) = j62.83\,\Omega$.

$Z_{total} = Z_R + Z_L = 100 + j62.83\,\Omega$

$|Z| = \sqrt{100^2 + 62.83^2} = \sqrt{10000 + 3948} = \sqrt{13948} = 118.1\,\Omega$

$\theta = \tan^{-1}(62.83/100) = 32.14°$

So $Z = 118.1\angle 32.14°\,\Omega$. The voltage leads the current by $32.14°$.

---

## Falstad Simulation: RC Circuit Phase Relationship

Explore the phase relationship between voltage and current in an RC circuit. Notice how the current leads the voltage across the capacitor by 90°.

[[visual:falstad-rc-phasor]]

---

## What's Coming Next

You now know the impedance of each individual element. In the next concept, you'll learn how to **combine** impedances in series and parallel — using the exact same rules as DC resistors, but with complex arithmetic.

---

**The key takeaway from this concept:** Every passive element has an impedance: $Z_R = R$, $Z_L = j\omega L$, $Z_C = 1/(j\omega C)$. These come directly from the derivative property of phasors. Resistance dissipates energy; reactance stores and returns it. The mnemonic **ELI the ICE man** tells you the phase relationships. 💪
