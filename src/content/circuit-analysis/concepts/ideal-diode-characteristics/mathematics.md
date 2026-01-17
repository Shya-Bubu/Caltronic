# Mathematical Foundations: Ideal Diode and pn-Junction

> Rigorous characterization of diode v-i relationships and the Shockley equation.

---

## Ideal Diode: Mathematical Definition

From lecture Page 5:

$$\mathcal{R}_{ID} = \{(v, i): v \cdot i = 0, \, i \geq 0 \text{ for } v < 0, \, v = 0 \text{ for } i > 0\}$$

**Breaking this down:**

1. **Constraint:** $v \cdot i = 0$ (either voltage or current is zero)
2. **When reverse-biased** ($v < 0$): current $i = 0$
3. **When conducting** ($i > 0$): voltage $v = 0$

### Complementarity Condition

The constraint $v \cdot i = 0$ is a **complementarity condition**:
- Either $v = 0$ or $i = 0$ (or both)
- But not both non-zero simultaneously

This can also be written as:
$$v \leq 0, \quad i \geq 0, \quad v \cdot i = 0$$

---

## pn-Junction Diode: The Shockley Equation

From lecture Page 6:

$$i = I_s \left( e^{v/V_T} - 1 \right)$$

Where:
- $I_s$ = reverse saturation current (typically $10^{-12}$ to $10^{-15}$ A)
- $V_T = \frac{kT}{q}$ = thermal voltage
- $k = 1.38 \times 10^{-23}$ J/K (Boltzmann's constant)
- $T$ = absolute temperature (Kelvins)
- $q = 1.6 \times 10^{-19}$ C (electron charge)

### Deriving Thermal Voltage at Room Temperature

At $T = 300K$ (27°C):
$$V_T = \frac{kT}{q} = \frac{1.38 \times 10^{-23} \times 300}{1.6 \times 10^{-19}}$$
$$= \frac{4.14 \times 10^{-21}}{1.6 \times 10^{-19}} = 0.0259 \text{ V} \approx 26 \text{ mV}$$

**Temperature dependence:**
$$\frac{dV_T}{dT} = \frac{k}{q} \approx 86.5 \, \mu\text{V/K}$$

At 100°C (373K): $V_T \approx 32$ mV

---

## Small-Signal Analysis: Dynamic Resistance

The **dynamic resistance** (or incremental resistance) at operating point $(V_D, I_D)$ is:

$$r_d = \frac{dv}{di}\bigg|_{(V_D, I_D)}$$

For  the Shockley equation:
$$\frac{di}{dv} = \frac{d}{dv}\left[ I_s(e^{v/V_T} - 1) \right] = I_s \cdot \frac{1}{V_T} e^{v/V_T} = \frac{I_s e^{v/V_T}}{V_T}$$

But $I_s e^{v/V_T} = i + I_s$ (from Shockley equation), so:
$$\frac{di}{dv} = \frac{i + I_s}{V_T}$$

For forward bias where $i \gg I_s$:
$$\frac{di}{dv} \approx \frac{i}{V_T}$$

Therefore:
$$r_d = \frac{dv}{di} = \frac{V_T}{i}$$

**Example:** At $i = 1$ mA and $T = 300K$:
$$r_d = \frac{0.026}{0.001} = 26 \, \Omega$$

**Insight:** The dynamic resistance is **inversely proportional to current**.

---

## Voltage-Controlled vs. Current-Controlled

From lecture Page 6:

**Voltage-controlled:** For any given $v$, the current $i$ is uniquely specified:
$$i = g(v)$$

**Current-controlled:** For any given $i$, the voltage $v$ is uniquely specified:
$$v = f(i)$$

### pn-Junction is Voltage-Controlled

The Shockley equation gives $i$ as a single-valued function of $v$:
$$i = I_s(e^{v/V_T} - 1)$$

Can we invert this to get $v(i)$?

$$e^{v/V_T} = \frac{i}{I_s} + 1$$
$$\frac{v}{V_T} = \ln\left(\frac{i + I_s}{I_s}\right)$$
$$v = V_T \ln\left(1 + \frac{i}{I_s}\right)$$

This is also single-valued, so the pn-junction is **both voltage-controlled and current-controlled**.

---

## Tunnel Diode: Not Single-Valued

The tunnel diode has an **N-shaped** characteristic with three V values for some I values.

**Consequence:** Cannot write $v = f(i)$ as a single-valued function → **not current-controlled**.

However, in each monotonic region separately, it can be locally current-controlled.

---

## Bilateral Property

From lecture Page 7:

**Definition:** A resistor is **bilateral** if:
$$f(v, i) = f(-v, -i) \quad \forall (v, i)$$

### Ideal Diode is NOT Bilateral

Check: If $(v, i) = (0, 1)$ is on the characteristic (forward conduction):
- $f(0, 1) = 0 \cdot 1 = 0$ ✓

But $(-v, -i) = (0, -1)$:
- $f(0, -1) = 0 \cdot (-1) = 0$ ✓ (satisfies $vi = 0$)
- **However:** $i = -1 < 0$ violates the constraint $i \geq 0$

Therefore, $(0, -1)$ is **not** on the characteristic → **not bilateral**.

---

## Summary: Mathematical Rigor

**Ideal diode:**
- Complementarity: $v \cdot i = 0$, $v \leq 0$, $i \geq 0$
- Piecewise-linear: two segments (horizontal + vertical)

**pn-Junction:**
- Shockley: $i = I_s(e^{v/V_T} - 1)$
- $V_T = kT/q \approx 26$ mV at 300K
- Dynamic resistance: $r_d = V_T/i$
- Both voltage and current-controlled (monotonic exponential)

**Tunnel diode:**
- Non-monotonic (N-shaped)
- Not single-valued → not current-controlled globally

**Bilaterality:**
- Ideal diode: NOT bilateral (asymmetric)
- pn-junction: NOT bilateral (exponential only for forward)
