# RLC Circuit Transfer Function — A Second-Order System

> **Why This Matters**: The RC circuit gave you a first-order system with one pole. Real circuits often have two or more energy-storage elements (capacitors, inductors), producing **second-order** systems with richer behaviour — oscillation, resonance, and damping. The series RLC circuit is the prototype second-order system, and analysing it combines everything you've learned: KVL, Laplace transforms, impedance, and transfer functions.

## The Circuit

A resistor $R$, inductor $L$, and capacitor $C$ are all in series. The input $x(t) = v(t)$ is the source voltage. The output $y(t) = i(t)$ is the current through the circuit.

[[visual:rlc-circuit-schematic]]

[[visual:rlc-circuit-falstad]]

This is the exact circuit from your lecture notes (Example #2, pages 8-10).

## Derivation via KVL — Time Domain

Apply KVL around the loop:

$$v(t) - i(t) \cdot R - L \frac{di}{dt} - \frac{1}{C} \int_{-\infty}^{t} i(\tau) \, d\tau = 0$$

Here:
- $iR$ = voltage drop across the resistor
- $L \frac{di}{dt}$ = voltage across the inductor
- $\frac{1}{C} \int i \, d\tau$ = voltage across the capacitor

[[visual:lecture-page-8-rlc]]

## Taking the Laplace Transform

With **zero initial conditions** (no initial current, capacitor uncharged):

$$V(s) - R \cdot I(s) - Ls \cdot I(s) - \frac{I(s)}{Cs} = 0$$

Factor out $I(s)$:

$$V(s) = I(s) \left[ R + Ls + \frac{1}{Cs} \right]$$

Solve for $I(s)$:

$$I(s) = \frac{V(s)}{R + Ls + \frac{1}{Cs}}$$

Multiply numerator and denominator by $Cs$:

$$I(s) = \frac{Cs}{LCs^2 + RCs + 1} \cdot V(s)$$

[[visual:kvl-derivation-plotly]]

Therefore:

$$\boxed{H(s) = \frac{I(s)}{V(s)} = \frac{Cs}{LCs^2 + RCs + 1}}$$

## Alternative: Impedance Method

The same result comes much faster from the impedance approach. With three elements in series, the total impedance is:

$$Z_{total} = R + Ls + \frac{1}{Cs}$$

Since the output is current and the input is voltage:

$$H(s) = \frac{I(s)}{V(s)} = \frac{1}{Z_{total}} = \frac{1}{R + Ls + \frac{1}{Cs}} = \frac{Cs}{LCs^2 + RCs + 1}$$

[[visual:impedance-method-plotly]]

<details>
<summary><strong>Pause & Think</strong>: What if the output was the voltage across the resistor instead of the current?</summary>

If $y(t) = v_R(t) = R \cdot i(t)$, then $Y(s) = R \cdot I(s) = R \cdot H(s) \cdot V(s)$. The new transfer function would be $H_R(s) = R \cdot Cs/(LCs^2 + RCs + 1) = RCs/(LCs^2 + RCs + 1)$. Same denominator, different numerator. The denominator (and hence the poles) always depends on the circuit topology, not the output choice.

</details>

## Analysing the Transfer Function

Let's rewrite $H(s)$ in a more standard form. Divide numerator and denominator by $LC$:

$$H(s) = \frac{\frac{1}{L} \cdot s}{s^2 + \frac{R}{L} s + \frac{1}{LC}}$$

[[visual:lecture-page-9]]

This is the standard second-order form. The denominator $s^2 + \frac{R}{L}s + \frac{1}{LC}$ determines all the dynamics.

### The Poles

Setting the denominator to zero:

$$s^2 + \frac{R}{L}s + \frac{1}{LC} = 0$$

Using the quadratic formula:

$$s = \frac{-\frac{R}{L} \pm \sqrt{\left(\frac{R}{L}\right)^2 - \frac{4}{LC}}}{2}$$

The nature of the poles depends on the **discriminant** $\left(\frac{R}{L}\right)^2 - \frac{4}{LC}$:

| Condition | Discriminant | Pole type | Response type |
|-----------|-------------|-----------|---------------|
| $R > 2\sqrt{L/C}$ | Positive | Two real poles | **Overdamped** — slow, no oscillation |
| $R = 2\sqrt{L/C}$ | Zero | Repeated real pole | **Critically damped** — fastest non-oscillating |
| $R < 2\sqrt{L/C}$ | Negative | Complex conjugate poles | **Underdamped** — oscillating, decaying |

[[visual:damping-cases-plotly]]

> **Key Insight**: The resistor $R$ controls the **damping**. More resistance = more energy dissipation per cycle = faster decay of oscillations. At the critical value $R = 2\sqrt{L/C}$, the system returns to equilibrium as fast as possible without overshooting. This is why most real systems are designed to operate near critical damping.

### Natural Frequency and Damping Ratio

The standard second-order transfer function is often written as:

$$H(s) = \frac{\omega_n^2}{s^2 + 2\zeta \omega_n s + \omega_n^2}$$

For the RLC circuit:

$$\omega_n = \frac{1}{\sqrt{LC}} \quad \text{(natural frequency)}$$

$$\zeta = \frac{R}{2} \sqrt{\frac{C}{L}} \quad \text{(damping ratio)}$$

[[visual:natural-freq-plotly]]

<details>
<summary><strong>Pause & Think</strong>: What happens if R = 0 in the RLC circuit?</summary>

With $R = 0$: $\zeta = 0$ (zero damping) and the poles are purely imaginary: $s = \pm j/\sqrt{LC}$. The system oscillates forever at frequency $\omega_n = 1/\sqrt{LC}$ with no decay — a perfect LC oscillator! In practice, no circuit has zero resistance, so all real oscillations eventually decay.

</details>

## Comparing First and Second Order

| Property | RC (First-Order) | RLC (Second-Order) |
|----------|-----------------|-------------------|
| **H(s)** | $\frac{1}{1+RCs}$ | $\frac{Cs}{LCs^2+RCs+1}$ |
| **Number of poles** | 1 | 2 |
| **Can oscillate?** | No | Yes (if underdamped) |
| **Energy storage** | 1 element (C) | 2 elements (L, C) |
| **Denominator order** | 1st | 2nd |

[[visual:lecture-page-10]]

[[visual:comparison-plotly]]

## Summary

- Series RLC circuit: $H(s) = \frac{Cs}{LCs^2 + RCs + 1}$
- Derived via KVL + Laplace transform or impedance method ($Z = R + Ls + 1/Cs$)
- Standard form: $s^2 + (R/L)s + 1/(LC) = 0$ determines the poles
- $\omega_n = 1/\sqrt{LC}$ (natural frequency), $\zeta = (R/2)\sqrt{C/L}$ (damping ratio)
- Three damping cases: overdamped ($\zeta > 1$), critically damped ($\zeta = 1$), underdamped ($\zeta < 1$)
- Resistor $R$ controls damping — more resistance = less oscillation
- Second-order systems can oscillate; first-order systems cannot
- The impedance method is faster: $H(s) = 1/Z_{total}$ for current output
