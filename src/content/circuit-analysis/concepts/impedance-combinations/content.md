## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **Impedance**: $Z_R = R$, $Z_L = j\omega L$, $Z_C = 1/(j\omega C)$
- **Admittance**: $Y = 1/Z$
- **Complex arithmetic**: addition/subtraction in rectangular form, multiplication/division in polar form
- From earlier lessons: **KVL**, **KCL**, series/parallel resistance combinations

</details>

---

## The Central Promise of Impedance

Here is the most important paragraph in this entire lesson:

**Every circuit analysis technique you learned for DC resistive circuits works identically in the phasor domain** — just replace "resistance" with "impedance". KVL? Works with phasor voltages. KCL? Works with phasor currents. Series combination? Add impedances. Parallel combination? Add admittances (or use the product-over-sum rule). Thevenin equivalent? Works with impedances. Voltage divider? Works with impedances.

This is not a coincidence — it is a direct consequence of the additive and derivative properties of phasors.

> **Why This Matters**: You don't need to learn a new set of analysis techniques for AC circuits. You just need to be comfortable doing the math with complex numbers.

---

## Kirchhoff's Laws in the Phasor Domain

### KVL (Kirchhoff's Voltage Law)

Around any closed loop:

$$\sum \mathbf{V}_k = 0$$

The sum of phasor voltages around a loop is zero — exactly the same as in DC.

### KCL (Kirchhoff's Current Law)

At any node:

$$\sum \mathbf{I}_k = 0$$

The sum of phasor currents entering (or leaving) a node is zero.

These work because KVL and KCL are statements about **sums** of sinusoids, and the additive property guarantees that sums of sinusoids correspond to sums of phasors.

[[visual:kvl-kcl-phasor]]

---

## Series Impedance Combination

When impedances are connected in **series**, the same phasor current flows through each. By KVL:

$$\mathbf{V}_{total} = \mathbf{V}_1 + \mathbf{V}_2 + \cdots = Z_1\mathbf{I} + Z_2\mathbf{I} + \cdots = (Z_1 + Z_2 + \cdots)\mathbf{I}$$

Therefore the equivalent impedance is:

$$\boxed{Z_{eq} = Z_1 + Z_2 + \cdots + Z_N}$$

Impedances in series **add** — exactly like resistances in series.

[[visual:series-impedance-diagram]]

### Example: Series RLC

$R = 10\,\Omega$, $L = 0.1$ H, $C = 100\,\mu$F, $\omega = 100$ rad/s.

$Z_R = 10\,\Omega$, $Z_L = j(100)(0.1) = j10\,\Omega$, $Z_C = \frac{1}{j(100)(10^{-4})} = \frac{1}{j0.01} = -j100\,\Omega$.

$Z_{eq} = 10 + j10 - j100 = 10 - j90\,\Omega$

$|Z_{eq}| = \sqrt{100 + 8100} = \sqrt{8200} = 90.55\,\Omega$, $\theta = \tan^{-1}(-90/10) = -83.66°$.

The overall impedance is capacitive (negative reactance dominates).

---

<details>
<summary><strong>🧠 Pause & Reflect</strong> — At what frequency would the series RLC above have a purely real impedance? What would that mean physically?</summary>

The impedance is purely real when the imaginary part cancels: $\omega L - 1/(\omega C) = 0$, giving $\omega_0 = 1/\sqrt{LC} = 1/\sqrt{(0.1)(10^{-4})} = 316.2$ rad/s. At this **resonant frequency**, the inductor and capacitor impedances cancel, and the circuit behaves like a pure resistor. Maximum current flows for a given source voltage.

</details>

---

## Parallel Impedance Combination

When impedances are in **parallel**, the same phasor voltage appears across each. By KCL:

$$\mathbf{I}_{total} = \frac{\mathbf{V}}{Z_1} + \frac{\mathbf{V}}{Z_2} + \cdots = \mathbf{V}\left(\frac{1}{Z_1} + \frac{1}{Z_2} + \cdots\right)$$

Therefore:

$$\boxed{\frac{1}{Z_{eq}} = \frac{1}{Z_1} + \frac{1}{Z_2} + \cdots + \frac{1}{Z_N}}$$

Or equivalently, in terms of admittances:

$$\boxed{Y_{eq} = Y_1 + Y_2 + \cdots + Y_N}$$

For **two** parallel impedances, the product-over-sum formula applies:

$$Z_{eq} = \frac{Z_1 Z_2}{Z_1 + Z_2}$$

[[visual:parallel-impedance-diagram]]

### Example: Parallel RL

$R = 100\,\Omega$, $Z_L = j50\,\Omega$.

$Z_{eq} = \frac{(100)(j50)}{100 + j50} = \frac{j5000}{100 + j50}$

Rationalise: $\frac{j5000(100 - j50)}{(100 + j50)(100 - j50)} = \frac{j500000 + 250000}{10000 + 2500} = \frac{250000 + j500000}{12500} = 20 + j40\,\Omega$

---

## Voltage Divider with Impedances

The voltage divider formula extends directly:

$$\boxed{\mathbf{V}_2 = \frac{Z_2}{Z_1 + Z_2} \cdot \mathbf{V}_s}$$

This is identical to the DC voltage divider formula with impedances replacing resistances.

[[visual:voltage-divider-impedance]]

### Example: Voltage Divider

$V_s = 10\angle 0°$ V, $Z_1 = 100\,\Omega$ (resistor), $Z_2 = -j100\,\Omega$ (capacitor).

$\mathbf{V}_2 = \frac{-j100}{100 - j100} \cdot 10\angle 0°$

$100 - j100 = 100\sqrt{2}\angle(-45°)$

$\mathbf{V}_2 = \frac{100\angle(-90°)}{100\sqrt{2}\angle(-45°)} \cdot 10 = \frac{10}{{\sqrt{2}}}\angle(-90° + 45°) = 7.07\angle(-45°)$ V

$v_2(t) = 7.07\cos(\omega t - 45°)$ V. The capacitor voltage is attenuated and lags the source.

---

## Current Divider with Admittances

$$\boxed{\mathbf{I}_1 = \frac{Y_1}{Y_1 + Y_2} \cdot \mathbf{I}_s = \frac{Z_2}{Z_1 + Z_2} \cdot \mathbf{I}_s}$$

---

## Y-Δ (Wye-Delta) Transformation

For three-terminal networks, the Y-Δ conversion formulas from DC analysis apply with impedances:

### Δ → Y Conversion

$$Z_1 = \frac{Z_b Z_c}{Z_a + Z_b + Z_c}, \quad Z_2 = \frac{Z_a Z_c}{Z_a + Z_b + Z_c}, \quad Z_3 = \frac{Z_a Z_b}{Z_a + Z_b + Z_c}$$

### Y → Δ Conversion

$$Z_a = \frac{Z_1 Z_2 + Z_2 Z_3 + Z_1 Z_3}{Z_1}, \quad Z_b = \frac{Z_1 Z_2 + Z_2 Z_3 + Z_1 Z_3}{Z_2}, \quad Z_c = \frac{Z_1 Z_2 + Z_2 Z_3 + Z_1 Z_3}{Z_3}$$

[[visual:y-delta-diagram]]

> **Key Insight**: These formulas are identical to the DC versions — just with complex impedances. The balanced case ($Z_a = Z_b = Z_c = Z_\Delta$) simplifies to $Z_Y = Z_\Delta/3$.

---

## Falstad Simulation: Series RLC Circuit

Explore a series RLC circuit and observe how the impedances combine. Notice how the source voltage equals the sum of $V_R$, $V_L$, and $V_C$ (KVL in phasor form).

[[visual:falstad-series-rlc]]

---

## What's Coming Next

With impedance combinations mastered, you now have all the tools to analyse any AC circuit using the techniques from DC analysis. The final concept in this lesson covers **AC power analysis** — how to compute average power, reactive power, and the power factor.

---

**The key takeaway from this concept:** Series impedances add. Parallel admittances add. Voltage and current dividers, KVL, KCL, and Y-Δ transforms all work in the phasor domain — just use complex impedances. This is the real payoff of the phasor method: all your DC analysis skills transfer directly. 💪
