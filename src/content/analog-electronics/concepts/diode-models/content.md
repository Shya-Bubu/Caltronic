# Diode Models — From Ideal Switch to Piecewise-Linear

> **Why This Matters**: The Ebers-Moll equation is exact but impossible to solve by hand in most circuits. Engineers need simpler models — approximations that capture the essential behaviour with manageable mathematics. This concept teaches you three progressively better diode models, the same ones used in textbooks and industry practice worldwide.

## The Problem with the Exact Model

You already know the exact diode equation:

$$I_D = I_S\left(e^{V_D / V_T} - 1\right)$$

Try solving this circuit: a voltage source $V_S$ in series with a resistor $R$ and a diode. KVL gives:

$$V_S = I_D R + V_D$$

Substituting the diode equation:

$$V_S = I_S\left(e^{V_D / V_T} - 1\right) R + V_D$$

This is a **transcendental equation** — $V_D$ appears both inside an exponential and outside it. There is no closed-form algebraic solution. You'd need numerical iteration (Newton-Raphson) or a graphical load-line method.

For quick pencil-and-paper analysis, we need simpler models that trade some accuracy for algebraic solvability.

## Model 1: The Ideal Switch (Ideal Diode)

[[visual:ideal-switch-model]]

The simplest model treats the diode as a **perfect switch**:

$$\boxed{\text{Forward bias } (V_D > 0): \quad V_D = 0, \quad \text{diode is ON (short circuit)}}$$
$$\boxed{\text{Reverse bias } (V_D < 0): \quad I_D = 0, \quad \text{diode is OFF (open circuit)}}$$

The V-I characteristic is two straight lines: the positive I-axis (forward) and the negative V-axis (reverse). There is no threshold voltage — the diode turns on at exactly 0V.

**Accuracy**: This model completely ignores the 0.6-0.7V forward drop. It's useful when the signal voltage is much larger than 0.7V (e.g., power rectifiers at 110V) and you only need a rough estimate.

<details>
<summary><strong>Pause & Think</strong>: In what practical application would the ideal switch model give a wildly wrong answer?</summary>

An LED drive circuit at 3.3V. If you model the LED as an ideal diode (0V drop), you'd predict the full 3.3V across the series resistor. In reality, the LED drops about 2V, so only 1.3V is across the resistor — the model is off by a factor of 2.5.

</details>

## Model 2: Constant Voltage Drop (CVD)

[[visual:cvd-model]]

This model adds a **threshold voltage** $V_\gamma$ (typically 0.7V for silicon):

$$\boxed{\text{Forward } (V_D \geq V_\gamma): \quad V_D = V_\gamma, \quad \text{diode is ON}}$$
$$\boxed{\text{Reverse } (V_D < V_\gamma): \quad I_D = 0, \quad \text{diode is OFF}}$$

The V-I characteristic is a vertical line at $V_D = V_\gamma$ for forward bias, and $I_D = 0$ for reverse bias. The forward resistance is zero once the diode turns on.

**Accuracy**: Much better than the ideal switch for circuits where the signal is comparable to the diode drop. This is the **most commonly used model** for hand calculations.

## Model 3: Piecewise-Linear with Forward Resistance (PWL)

[[visual:pwl-model]]

The most accurate piecewise model adds a **finite forward resistance** $R_f$:

$$\boxed{\text{Forward } (V_D \geq V_\gamma): \quad V_D = V_\gamma + I_D \cdot R_f}$$
$$\boxed{\text{Reverse } (V_D < V_\gamma): \quad I_D = 0}$$

The V-I characteristic is a straight line with slope $1/R_f$ starting at the threshold voltage $V_\gamma$. This captures the fact that the diode voltage increases slightly as current increases.

Typical values for a silicon diode:
- $V_\gamma \approx 0.6$–$0.7$ V
- $R_f \approx 5$–$50\ \Omega$ (depends on the current level)

**Accuracy**: Close to the actual exponential curve over the operating range. Preferred when you need to account for the voltage increase at high currents.

## All Three Models Compared

[[visual:three-models-overlay]]

The three models represent a **trade-off between simplicity and accuracy**:

| Model | Parameters | V-I Shape | Best For |
|-------|-----------|-----------|----------|
| Ideal switch | None | Two axes | Rough estimates, high voltages |
| CVD | $V_\gamma$ | Vertical line at $V_\gamma$ | Most hand calculations |
| PWL + $R_f$ | $V_\gamma$, $R_f$ | Line with slope $1/R_f$ from $V_\gamma$ | Detailed analysis |

All three are **piecewise-linear** — the V-I characteristic is made up of straight line segments. This is why we call them PWL models.

## Worked Example: Half-Wave Rectifier

[[visual:halfwave-rectifier-output]]

A sine wave $V_S = 10\sin(\omega t)$ is connected to a series diode and load resistor $R_L = 1$ kΩ. Let's find the output voltage using each model.

**Model 1 (Ideal Switch)**:
- Positive half-cycle: diode ON → $V_{out} = V_S = 10\sin(\omega t)$
- Negative half-cycle: diode OFF → $V_{out} = 0$
- Peak output: **10V**

**Model 2 (CVD, $V_\gamma = 0.7$V)**:
- Positive half-cycle: $V_{out} = V_S - V_\gamma = 10\sin(\omega t) - 0.7$
- Diode turns on when $V_S > 0.7$V, off otherwise
- Peak output: **9.3V**

**Model 3 (PWL, $V_\gamma = 0.7$V, $R_f = 20\Omega$)**:
- Current: $I_D = \frac{V_S - V_\gamma}{R_L + R_f}$
- Output: $V_{out} = I_D \cdot R_L = \frac{R_L}{R_L + R_f}(V_S - V_\gamma) = \frac{1000}{1020}(V_S - 0.7)$
- Peak output: **$\frac{1000}{1020}(10 - 0.7) \approx 9.11$V**

The differences are small (10V vs 9.3V vs 9.11V) for this case, but they matter when designing precision circuits.

[[visual:falstad-halfwave-rectifier]]

<details>
<summary><strong>Pause & Think</strong>: Which model would you choose for designing a phone charger? Which for designing a precision voltmeter?</summary>

For a phone charger (high voltage, 10%+ tolerance acceptable), the CVD model is sufficient — the 0.7V drop is important but R_f is negligible compared to the load. For a precision voltmeter (millivolt accuracy needed), you'd use the full PWL model or even the Ebers-Moll equation solved numerically.

</details>

## How to Choose the Right Model

The decision tree is simple:

1. **Is the signal voltage ≫ 0.7V** (e.g., mains power)? → Ideal switch
2. **Is 0.7V significant** compared to the signal? → CVD ($V_\gamma = 0.7$V)
3. **Does the voltage drop change noticeably** with current? → PWL ($V_\gamma + I R_f$)
4. **Need exact results?** → Ebers-Moll + numerical solver (SPICE)

In practice, the CVD model (Model 2) handles 80% of hand calculations correctly. Model 3 is used for power electronics where $R_f$ causes noticeable losses. Model 1 is used for quick mental estimates.

## Summary

- The **ideal switch** model ($V_D = 0$ when ON, $I_D = 0$ when OFF) is the simplest but ignores the forward drop
- The **constant voltage drop** model ($V_D = V_\gamma \approx 0.7$V when ON) captures the threshold and handles most circuits
- The **PWL + $R_f$** model ($V_D = V_\gamma + I_D R_f$) adds forward resistance for higher accuracy
- All three are **piecewise-linear approximations** to the exponential Ebers-Moll curve
- The choice of model depends on the **required accuracy** relative to the signal amplitude
- The half-wave rectifier is the canonical example for comparing all three models
