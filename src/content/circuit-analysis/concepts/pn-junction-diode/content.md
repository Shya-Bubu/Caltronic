## From Ideal to Real: The PN-Junction Diode

The ideal diode gave us a sharp, clean model of a switching element: zero voltage when conducting, zero current when blocking, with an instantaneous transition at the origin. Real semiconductor diodes are more nuanced. Their transition from "off" to "on" is not a sharp corner but a smooth exponential curve. To model this accurately, we use the **PN-junction diode equation**, also known as the Shockley diode equation.

> **Why This Matters**: The Shockley diode equation is the most important nonlinear device equation in all of electronics. Every transistor model, every power converter design, and every analog integrated circuit traces back to this exponential relationship. Master it here, and you will have the foundation for everything that follows.

This model replaces the ideal diode's piecewise-linear characteristic with a continuous, smooth curve that much more faithfully represents physical silicon and germanium diodes. Understanding this equation is essential for circuit analysis involving real semiconductor devices.

Think of it this way: the ideal diode is like a light switch — it is either fully on or fully off. The PN-junction diode is more like a dimmer switch — there is a smooth, continuous transition between the off and on states, controlled by the voltage across it.

## The Diode Equation

The current through a PN-junction diode is related to the voltage across it by:

$$i = I_s \left( e^{v / V_T} - 1 \right)$$

where:
- $i$ is the current through the diode (positive in the forward direction)
- $v$ is the voltage across the diode (positive at the anode relative to the cathode)
- $I_s$ is the **reverse saturation current** (a very small constant, typically $10^{-12}$ to $10^{-15}\,\text{A}$ for silicon)
- $V_T$ is the **thermal voltage**

The thermal voltage is given by:

$$V_T = \frac{kT}{q}$$

where:
- $k = 1.381 \times 10^{-23}\,\text{J/K}$ is Boltzmann's constant
- $T$ is the absolute temperature in kelvin
- $q = 1.602 \times 10^{-19}\,\text{C}$ is the elementary charge

At room temperature ($T = 300\,\text{K}$):

$$V_T = \frac{1.381 \times 10^{-23} \times 300}{1.602 \times 10^{-19}} \approx 0.02585\,\text{V} \approx 26\,\text{mV}$$

This value -- approximately 26 mV at room temperature -- appears so frequently that you should memorise it. It sets the voltage scale of the exponential turn-on.

## Understanding the Exponential Curve

Let us trace through the diode equation to build intuition for how the characteristic behaves in different voltage regions.

**Forward bias** ($v > 0$): When the voltage is positive, the exponential term $e^{v/V_T}$ grows very rapidly. Since $V_T \approx 26\,\text{mV}$, even a modest forward voltage produces an enormous exponent. For example, at $v = 0.6\,\text{V}$:

$$\frac{v}{V_T} = \frac{0.6}{0.026} \approx 23.1$$

$$e^{23.1} \approx 1.08 \times 10^{10}$$

So $i \approx I_s \times 10^{10}$. If $I_s = 10^{-12}\,\text{A}$, then $i \approx 10^{-2}\,\text{A} = 10\,\text{mA}$. A mere 0.6V of forward bias produces milliamps of current. This is why silicon diodes appear to "turn on" around 0.6--0.7V: below this voltage, the exponential is still small enough that the current is negligible; above it, the current rises explosively.

**Zero bias** ($v = 0$): The exponential term is $e^0 = 1$, so $i = I_s(1 - 1) = 0$. No current flows at zero voltage. The characteristic passes through the origin, just like the ideal diode.

**Reverse bias** ($v < 0$): When $v$ is negative, $e^{v/V_T}$ becomes very small (approaching zero for $|v| \gg V_T$). The current approaches:

$$i \approx I_s(0 - 1) = -I_s$$

The reverse current is $-I_s$, which is extremely small (picoamps for silicon). This is why the diode effectively blocks current in the reverse direction. The current is not exactly zero (as in the ideal diode), but it is so small that for most practical purposes it can be neglected.

[[visual:pn-diode-vi]]

[[visual:pn-diode-regions]]

## Voltage-Controlled Nonlinear Resistor

The PN-junction diode is a **voltage-controlled nonlinear resistor**. This means:

- For every value of voltage $v$, there is exactly one value of current $i$. The function $\hat{i}(v) = I_s(e^{v/V_T} - 1)$ is single-valued.
- The device is a resistor because the relationship between $v$ and $i$ involves no time derivatives or integrals (it is memoryless).
- It is nonlinear because the relationship is exponential, not a straight line through the origin.
- It is voltage-controlled because the natural independent variable is $v$: given $v$, you can directly compute $i$.

You can also express $v$ as a function of $i$ by inverting the equation. For $i > -I_s$:

$$v = V_T \ln\left(\frac{i}{I_s} + 1\right)$$

[[visual:pn-diode-vc-resistor]]

This makes the diode also current-controllable (in the forward region). But the voltage-controlled form is more commonly used because it directly gives the exponential curve.

## Contrast with the Ideal Diode

The PN-junction diode and the ideal diode both model the same physical phenomenon -- a device that conducts easily in one direction and blocks in the other -- but with different levels of fidelity:

| Property | Ideal Diode | PN-Junction Diode |
|---|---|---|
| Forward voltage drop | Exactly 0V | Approximately 0.6--0.7V (silicon) |
| Turn-on transition | Sharp corner at origin | Smooth exponential curve |
| Reverse current | Exactly 0 A | $-I_s$ (very small but nonzero) |
| Characteristic shape | Two line segments | Smooth exponential |
| Ease of analysis | Simple (assume-and-check) | Requires nonlinear techniques |
| When to use | Voltages $\gg 0.7\,\text{V}$; qualitative analysis | Precise analysis; low-voltage circuits |

The ideal diode is the limiting case of the PN-junction diode as $V_T \to 0$: the exponential curve becomes steeper and steeper, approaching the two-segment piecewise-linear shape.

## Forward Bias in Detail

In the forward bias region ($v > 0$, typically $v > 0.1\,\text{V}$), the $-1$ term in the diode equation becomes negligible compared to $e^{v/V_T}$, and the equation simplifies to:

$$i \approx I_s \, e^{v/V_T}$$

This approximation is excellent for voltages more than a few $V_T$ above zero (say, $v > 100\,\text{mV}$). It tells us that in forward bias, the current increases exponentially with voltage. A small increase in $v$ produces a large increase in $i$.

[[visual:forward-bias-log]]

<details>
<summary><strong>Pause & Think</strong>: If the forward voltage increases from 0.60V to 0.66V (a 60mV increase), by what factor does the current change?</summary>

The ratio of currents is $e^{\Delta v / V_T} = e^{0.06/0.026} \approx e^{2.31} \approx 10$. So a 60mV increase roughly multiplies the current by **10**. This "60mV per decade" rule is one of the most useful quick-calculation tools in diode analysis.

</details>

How sensitive is the current to voltage? The derivative is:

$$\frac{di}{dv} = \frac{I_s}{V_T} e^{v/V_T} = \frac{i}{V_T}$$

This means the **slope of the v-i curve at any operating point** is proportional to the current at that point divided by $V_T$. At $i = 1\,\text{mA}$ and $V_T = 26\,\text{mV}$:

$$\frac{di}{dv} = \frac{0.001}{0.026} \approx 38.5\,\text{S}$$

The curve is very steep in the forward region. This steepness is why the diode appears to "turn on" so abruptly: once the voltage reaches the turn-on threshold, a tiny further increase produces a dramatic rise in current.

## Reverse Bias in Detail

In reverse bias ($v < 0$, $|v| \gg V_T$), the exponential vanishes and:

$$i \approx -I_s$$

The reverse current is essentially constant at $-I_s$, independent of the reverse voltage. This is why $I_s$ is called the **reverse saturation current**: the reverse current "saturates" at the value $I_s$.

For silicon diodes at room temperature, $I_s$ is typically in the range $10^{-12}$ to $10^{-15}\,\text{A}$ (picoamps to femtoamps). This current is so small that for circuit-level analysis, it is often treated as zero -- which brings us back to the ideal diode approximation.

**Breakdown**: At sufficiently large reverse voltages (tens of volts for typical silicon diodes), the diode enters **breakdown**, where the reverse current increases rapidly. The Shockley equation does not model breakdown. For this course, we acknowledge that breakdown exists but do not model it. You will encounter breakdown models (Zener diodes) in later courses.

## Temperature Dependence

The diode equation contains temperature in two places:

1. **Explicitly through $V_T$**: $V_T = kT/q$ increases linearly with temperature. At $T = 300\,\text{K}$, $V_T \approx 26\,\text{mV}$. At $T = 400\,\text{K}$, $V_T \approx 34.5\,\text{mV}$.

2. **Implicitly through $I_s$**: The reverse saturation current $I_s$ is strongly temperature-dependent. It approximately doubles for every 10K increase in temperature. This is the dominant temperature effect.

The net result: at higher temperatures, **more current flows for the same forward voltage**. Equivalently, the forward voltage required for a given current **decreases** with temperature (by approximately $-2\,\text{mV/K}$ for silicon). The entire v-i curve shifts to the left as temperature increases.

This temperature sensitivity has practical consequences:
- Diodes in power circuits heat up, changing their operating point
- Temperature compensation is needed in precision circuits
- Matched diode pairs (at the same temperature) are used in analog IC design to cancel temperature effects

## Interactive Exploration

Use the interactive simulator below to explore how the PN-junction diode's v-i characteristic changes with different values of $I_s$ and temperature.

[[visual:diode-sim]]

[[visual:ideal-vs-pn-comparison]]

[[visual:falstad-pn-diode-circuit]]

[[visual:shockley-equation-curves]]


Try the following experiments:
- Set $I_s = 10^{-12}\,\text{A}$ and $T = 300\,\text{K}$. Note the voltage at which the current reaches 1 mA (should be about 0.72V).
- Increase $T$ to 350K. The curve shifts left: less voltage is needed for the same current.
- Decrease $I_s$ to $10^{-14}\,\text{A}$ (a different diode). The curve shifts right: more voltage is needed for the same current.

## Practical Notes

In practical circuit analysis at room temperature, you will frequently use these values:
- $V_T \approx 0.026\,\text{V} = 26\,\text{mV}$
- A silicon diode "turns on" at approximately $0.6$--$0.7\,\text{V}$
- $I_s$ for silicon: typically $10^{-12}\,\text{A}$ (but varies widely between diode types)

The "turn-on voltage" of 0.6--0.7V is not a fundamental constant; it is the voltage at which the exponential current becomes large enough to be significant in a particular circuit. For different values of $I_s$ or different definitions of "significant current," the apparent turn-on voltage will differ.

When solving problems:
1. For quick estimates, use the ideal diode model (forward drop = 0V) or the constant-voltage-drop model (forward drop = 0.7V)
2. For precise calculations, use the full exponential equation $i = I_s(e^{v/V_T} - 1)$
3. Remember that the exponential grows very fast: a 60 mV increase in $v$ roughly **doubles** the current (since $\ln 2 \approx 0.693$ and $0.693 \times V_T \approx 18\,\text{mV}$; more precisely, a factor of 10 increase in current corresponds to about $60\,\text{mV}$ increase in voltage, because $V_T \ln 10 \approx 60\,\text{mV}$)

## Summary

The PN-junction diode is described by $i = I_s(e^{v/V_T} - 1)$, where $V_T = kT/q \approx 26\,\text{mV}$ at room temperature and $I_s$ is the reverse saturation current (picoamps for silicon). In forward bias, the current rises exponentially; in reverse bias, it saturates at $-I_s$. The characteristic is a smooth curve through the origin, in contrast to the ideal diode's sharp corner. The diode is a voltage-controlled nonlinear resistor: memoryless, single-valued, and passive (the curve lies in quadrants I and III). Temperature increases shift the curve left (more current at the same voltage). The exponential sensitivity means a 60 mV increase in voltage roughly multiplies the current by 10.

<details>
<summary><strong>Pause & Think</strong>: At what temperature would V_T double from its room-temperature value?</summary>

Since $V_T = kT/q$ and $V_T \approx 26\,\text{mV}$ at $T = 300\,\text{K}$, doubling $V_T$ to $52\,\text{mV}$ requires $T = 600\,\text{K}$ (about 327°C). This is beyond the operating range of silicon, which confirms that $V_T$ does not change dramatically over normal operating temperatures. However, $I_s$ changes much more — it roughly doubles every 10K.

</details>
