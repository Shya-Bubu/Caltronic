# Second-Order Step Response & Damping

> **Why This Matters**: The first-order RC step response is always a smooth exponential — predictable, no surprises. Second-order systems (like RLC circuits) are dramatically different: they can oscillate, overshoot, and ring before settling. Understanding the three damping cases — overdamped, critically damped, and underdamped — is essential for designing circuits that respond quickly without unwanted oscillation. This is where system dynamics gets truly interesting.

## Recap: The RLC Transfer Functions

From Lesson 08, we derived two RLC transfer functions depending on the chosen output:

### Example #2 — Output = Current $i(t)$

$$H(s) = \frac{Cs}{LCs^2 + RCs + 1} = \frac{s/L}{s^2 + \frac{R}{L}s + \frac{1}{LC}}$$

### Example #3 — Output = Capacitor Voltage $v_C(t)$

$$H(s) = \frac{1/LC}{s^2 + \frac{1}{RC}s + \frac{1}{LC}}$$

[[visual:lecture-page-3]]

Both share the same **characteristic equation**: $s^2 + 2\alpha s + \omega_n^2 = 0$, where:

$$\alpha = \frac{R}{2L} \quad \text{(attenuation constant)}, \qquad \omega_n = \frac{1}{\sqrt{LC}} \quad \text{(natural frequency)}$$

## Step Response of RLC (Current Output)

For Example #2, the step response $Y(s)$ is:

$$Y(s) = H(s) \cdot \frac{1}{s} = \frac{C}{L(s^2 + \frac{R}{L}s + \frac{1}{LC})} = \frac{1}{L} \cdot \frac{1}{s^2 + \frac{R}{L}s + \frac{1}{LC}}$$

The behaviour depends entirely on the **roots** of the characteristic polynomial:

$$s = \frac{-\frac{R}{L} \pm \sqrt{\left(\frac{R}{L}\right)^2 - \frac{4}{LC}}}{2}$$

[[visual:lecture-page-4]]

The discriminant $\Delta = \left(\frac{R}{L}\right)^2 - \frac{4}{LC}$ determines everything:

## The Three Damping Cases

### Case 1: Overdamped ($\Delta > 0$, $R > 2\sqrt{L/C}$)

Roots are **two distinct real negative** numbers: $s_1, s_2 < 0$.

$$y(t) = A_1 e^{s_1 t} + A_2 e^{s_2 t}$$

The response is a sum of two decaying exponentials. **No oscillation**, but slow — the system "lazily" returns without overshooting.

### Case 2: Critically Damped ($\Delta = 0$, $R = 2\sqrt{L/C}$)

Roots are **repeated real**: $s_1 = s_2 = -R/(2L)$.

$$y(t) = (A_1 + A_2 t) e^{-\alpha t}$$

The **fastest response without oscillation**. This is the optimal damping for many designs — returns to equilibrium as quickly as possible without overshooting.

### Case 3: Underdamped ($\Delta < 0$, $R < 2\sqrt{L/C}$)

Roots are **complex conjugate**: $s = -\alpha \pm j\omega_d$ where $\omega_d = \sqrt{\omega_n^2 - \alpha^2}$.

$$y(t) = B e^{-\alpha t} \sin(\omega_d t + \phi)$$

The response **oscillates** at the damped frequency $\omega_d$, with amplitude decaying exponentially. This causes overshoot and ringing.

[[visual:damping-comparison-plotly]]

> **Key Insight**: The resistor $R$ controls damping. More resistance → more energy dissipated per cycle → faster decay. The critical resistance $R_{crit} = 2\sqrt{L/C}$ is the boundary between oscillatory and non-oscillatory behaviour.

## Homework Exercise Values

Your lecture notes provide three specific RLC cases to work through:

| Case | R (Ω) | L (H) | C (F) | $R_{crit}$ | Type |
|------|--------|--------|--------|-----------|------|
| ① | 2 | 0.5 mH | 0.5 mF | $2\sqrt{0.5m/0.5m} = 2$ | **Critical** |
| ② | 2 | 2 mH | 1 mF | $2\sqrt{2m/1m} = 2\sqrt{2} \approx 2.83$ | **Underdamped** |
| ③ | 2 | 1 mH | 4 mF | $2\sqrt{1m/4m} = 1$ | **Overdamped** |

[[visual:hw-exercise-plotly]]

## Step Response with Capacitor Voltage Output (Example #3)

[[visual:lecture-page-6]]

For the LRC circuit with output = capacitor voltage:

$$H(s) = \frac{1/LC}{s^2 + \frac{1}{RC}s + \frac{1}{LC}}$$

Step response:

$$Y(s) = \frac{1/LC}{s(s^2 + \frac{1}{RC}s + \frac{1}{LC})}$$

Applying value theorems:
- **IVT**: $y(0^+) = \lim_{s \to \infty} \frac{1/LC}{s^2 + \frac{1}{RC}s + \frac{1}{LC}} = 0$ ✓
- **FVT**: $y(\infty) = \lim_{s \to 0} \frac{1/LC}{s^2 + \frac{1}{RC}s + \frac{1}{LC}} = \frac{1/LC}{1/LC} = 1$ ✓

The capacitor starts uncharged and eventually charges to the full input voltage, regardless of the damping case. The damping only affects **how** it gets there.

[[visual:lecture-page-5-damping]]

## Comparing the Three Cases

[[visual:three-cases-comparison]]

| Property | Overdamped | Critical | Underdamped |
|----------|-----------|----------|-------------|
| **Oscillation?** | No | No | Yes |
| **Overshoot?** | No | No | Yes |
| **Speed** | Slowest | Fastest (no oscillation) | Can be faster but oscillates |
| **Poles** | Two real, distinct | Repeated real | Complex conjugate |
| **Settling time** | Longest | Moderate | Depends on ζ |

<details>
<summary><strong>Pause & Think</strong>: For a car suspension system, which damping would you choose?</summary>

**Critically damped** (or slightly overdamped). You want the car to absorb bumps quickly without bouncing (underdamped would make passengers carsick). A slightly overdamped suspension is preferred for comfort — no oscillation, smooth return to level. Racing cars use underdamped for faster response, accepting some bounce.

</details>

## Summary

- Second-order step response depends on the discriminant $\Delta = (R/L)^2 - 4/LC$
- **Overdamped** ($\Delta > 0$): Two real poles, no oscillation, slow
- **Critically damped** ($\Delta = 0$): Repeated pole, fastest non-oscillating response
- **Underdamped** ($\Delta < 0$): Complex conjugate poles, oscillating with exponential decay
- Critical resistance: $R_{crit} = 2\sqrt{L/C}$
- Capacitor voltage always settles to input voltage ($y(\infty) = 1$), current always settles to zero ($y(\infty) = 0$)
- Damping case affects the transient path, not the steady-state endpoint
