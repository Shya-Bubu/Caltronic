# Series Resonance: Impedance and Resonant Frequency

> **Why This Matters**: Resonance is one of the most dramatic phenomena in circuit theory — at a specific frequency, a series RLC circuit's impedance drops to its minimum value $R$, the current surges to its maximum, and the inductor and capacitor voltages can be **many times** larger than the source voltage. Understanding this begins with the impedance equation and the resonance condition.

## The Series RLC Circuit

Consider a voltage source $V_s = V_m \angle \theta$ driving a series combination of resistance $R$, inductance $L$, and capacitance $C$:

[[visual:series-rlc-circuit]]

The **input impedance** seen by the source is:

$$Z = R + j\omega L + \frac{1}{j\omega C} = R + j\left(\omega L - \frac{1}{\omega C}\right)$$

This is a complex number with:
- **Real part**: $R$ (always positive, frequency-independent)
- **Imaginary part**: $X = \omega L - 1/\omega C$ (the **net reactance**, frequency-dependent)

[[visual:impedance-components]]

The magnitude and phase of the impedance are:

$$|Z| = \sqrt{R^2 + \left(\omega L - \frac{1}{\omega C}\right)^2}$$

$$\phi_Z = \tan^{-1}\frac{\omega L - 1/\omega C}{R}$$

## The Resonance Condition

**Resonance occurs when the imaginary part of $Z$ is zero**:

$$\omega L - \frac{1}{\omega C} = 0$$

This means $X_L = X_C$ — the inductive reactance exactly cancels the capacitive reactance. Solving for $\omega$:

$$\omega L = \frac{1}{\omega C} \implies \omega^2 = \frac{1}{LC} \implies \omega_o = \frac{1}{\sqrt{LC}} \text{ rad/s}$$

In Hertz:

$$f_o = \frac{1}{2\pi\sqrt{LC}} \text{ Hz}$$

[[visual:resonance-condition]]

> **Key Insight**: The resonant frequency $\omega_o$ depends **only on $L$ and $C$** — not on $R$. The resistance affects *how sharp* the resonance is (that's the quality factor $Q$), but not *where* it occurs on the frequency axis.

## What Happens at Resonance?

At $\omega = \omega_o$, the impedance simplifies to:

$$Z(\omega_o) = R + j(0) = R$$

This has profound consequences:

[[visual:at-resonance-properties]]

| Property | At resonance ($\omega = \omega_o$) |
|----------|----------------------------------|
| **Impedance** | $Z = R$ (purely resistive, minimum magnitude) |
| **Current** | $I = V_m/R$ (**maximum** — limited only by $R$) |
| **Phase** | $\phi_Z = 0°$ (voltage and current in phase) |
| **Power factor** | $\cos\phi = 1$ (unity — maximum power transfer) |
| **LC combination** | Acts as a **short circuit** ($j\omega_o L + 1/j\omega_o C = 0$) |

<details>
<summary><strong>Pause & Think</strong>: If the LC series combination acts as a short circuit at resonance, does that mean there's no voltage across L or C?</summary>

No! The individual voltages $V_L$ and $V_C$ can be **very large** — they just have **equal magnitude and opposite phase**, so they cancel each other. At resonance:

$$V_L = j\omega_o L \cdot I = j\omega_o L \cdot \frac{V_m}{R} = jQ \cdot V_m$$

$$V_C = \frac{I}{j\omega_o C} = -j\omega_o L \cdot \frac{V_m}{R} = -jQ \cdot V_m$$

So $|V_L| = |V_C| = Q \cdot V_m$. If $Q = 25$ (as in the lecture example), the inductor and capacitor voltages are **25 times the source voltage**! The net across both is zero, but each individually is enormous.

</details>

## Impedance vs Frequency

The magnitude of impedance $|Z|$ as a function of $\omega$ forms a characteristic curve:

[[visual:impedance-vs-frequency]]

- At **low frequencies** ($\omega \ll \omega_o$): the capacitor dominates ($1/\omega C \gg \omega L$), so $|Z|$ is large and the circuit is **capacitive** ($\phi_Z < 0$).
- At **resonance** ($\omega = \omega_o$): $|Z| = R$ (minimum), circuit is **resistive** ($\phi_Z = 0$).
- At **high frequencies** ($\omega \gg \omega_o$): the inductor dominates ($\omega L \gg 1/\omega C$), so $|Z|$ grows and the circuit is **inductive** ($\phi_Z > 0$).

The reactance $X = \omega L - 1/\omega C$ crosses zero at $\omega_o$, transitioning from negative (capacitive) to positive (inductive).

[[visual:reactance-crossover]]

## Phasor Diagrams at Three Frequencies

The lecture provides phasor diagrams showing the voltage relationships at three key frequency regimes:

[[visual:phasor-diagrams]]

| Frequency | Phasor relationship |
|-----------|-------------------|
| $\omega < \omega_o$ | $V_C > V_L$ → net voltage leads current → capacitive behaviour |
| $\omega = \omega_o$ | $V_C = V_L$ → they cancel → $V_R = V_s$ → purely resistive |
| $\omega > \omega_o$ | $V_L > V_C$ → net voltage lags current → inductive behaviour |

<details>
<summary><strong>Pause & Think</strong>: At $\omega = \omega_o$, the phasor diagram shows $V_R = V_1$ (source voltage). But $V_L$ and $V_C$ are drawn vertically with equal magnitudes. What determines how large they are?</summary>

The magnitudes of $V_L$ and $V_C$ at resonance are:

$$|V_L| = |V_C| = \omega_o L \cdot I = \frac{\omega_o L}{R} \cdot V_m = Q \cdot V_m$$

So the quality factor $Q$ directly determines how much larger the component voltages are compared to the source. A high-Q circuit has enormous inductor and capacitor voltages at resonance — this is the phenomenon of **voltage magnification** that makes resonance both useful (for filters) and dangerous (for component stress).

</details>

## Worked Example

**Problem** (from lecture): In a series RLC circuit, $V_S = 10\angle 0°$ V, $R = 2\ \Omega$, $L = 25$ mH, $C = 10\ \mu$F. Find $\omega_o$, $I$, and the component voltages at resonance.

**Solution**:

$$\omega_o = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{25 \times 10^{-3} \times 10 \times 10^{-6}}} = \frac{1}{\sqrt{2.5 \times 10^{-7}}} = 2000 \text{ rad/s}$$

At resonance, $Z = R = 2\ \Omega$:

$$I = \frac{V_S}{Z} = \frac{10\angle 0°}{2} = 5\angle 0° \text{ A}$$

$$V_R = RI = 2 \times 5\angle 0° = 10\angle 0° \text{ V}$$

$$V_L = j\omega_o L \cdot I = j(2000)(0.025)(5\angle 0°) = 250\angle 90° \text{ V}$$

$$V_C = \frac{I}{j\omega_o C} = \frac{5\angle 0°}{j(2000)(10 \times 10^{-6})} = 250\angle -90° \text{ V}$$

[[visual:worked-example]]

[[visual:falstad-series-rlc]]

The quality factor is:

$$Q = \frac{\omega_o L}{R} = \frac{2000 \times 0.025}{2} = 25$$

So $|V_L| = |V_C| = Q \times V_m = 25 \times 10 = 250$ V — **25 times the source voltage!**

<details>
<summary><strong>Pause & Think</strong>: The capacitor or inductor in this circuit must withstand 250V even though the source is only 10V. What happens if you use a capacitor rated at only 50V?</summary>

The capacitor would **fail** (dielectric breakdown, possibly catastrophic explosion for electrolytic capacitors). This is a real engineering concern: at resonance, component voltage ratings must be chosen based on $Q \cdot V_{source}$, not just $V_{source}$. The lecture's second example explicitly addresses a scenario where a 300V-rated capacitor is stressed by 2000V at resonance — exceeding its rating by 6.7×.

</details>

## Summary

- **Series RLC impedance**: $Z = R + j(\omega L - 1/\omega C)$
- **Resonance condition**: $\omega L = 1/\omega C$ → net reactance = 0
- **Resonant frequency**: $\omega_o = 1/\sqrt{LC}$ (independent of $R$)
- **At resonance**: $Z = R$, current is maximum ($V_m/R$), power factor is unity
- **Voltage magnification**: Component voltages can be $Q$ times the source voltage
- **Below $\omega_o$**: capacitive. **Above $\omega_o$**: inductive.

> **Resonance is reactance cancellation.** The LC combination acts as a short circuit, current peaks, and the individual component voltages can be dangerously high. The next concept explores how sharply the response peaks — the frequency response and bandwidth.
