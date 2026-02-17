# Nonlinear Elements and V-I Characteristics

> **Why This Matters**: The real world is not linear. Diodes, LEDs, transistors, and even light bulbs have curved V-I characteristics. Understanding nonlinear elements is the bridge between textbook circuits (Ohm's law everywhere) and the actual electronic devices you'll design with.

## Beyond Straight Lines

In the previous concept, every V-I characteristic was a straight line. That's the definition of a **linear element** — the relationship between $V$ and $I$ is a linear function.

But most real components are **nonlinear**. Their V-I characteristics are curves, not lines. The current through them is NOT proportional to the voltage across them.

[[visual:linear-vs-nonlinear-comparison]]

The powerful idea from the previous concept still holds: **any two-terminal element, no matter how complex, is fully described by its V-I relationship.** The only difference is that for nonlinear elements, that relationship is a curve instead of a line.

## The Diode — Exponential V-I Characteristic

The most important nonlinear element in electronics is the **diode**. A diode is a two-terminal semiconductor device that conducts easily in one direction (forward bias) and blocks current in the other (reverse bias).

Its V-I characteristic is governed by the **Ebers-Moll equation**:

$$\boxed{I_D = I_S \left(e^{V_D / V_T} - 1\right)}$$

where:
- $I_D$ = diode current (positive = forward)
- $V_D$ = diode voltage (positive = anode more positive than cathode)
- $I_S$ = saturation current ($\approx 10^{-14}$ A for silicon at room temperature)
- $V_T$ = thermal voltage $= kT/q \approx 25$ mV at room temperature

[[visual:diode-ebers-moll-vi]]

This exponential relationship creates a dramatic asymmetry:

| Direction | What happens |
|-----------|-------------|
| **Forward bias** ($V_D > 0$) | Current grows exponentially. At $V_D \approx 0.7$V, $I_D$ reaches milliamps |
| **Reverse bias** ($V_D < 0$) | Current is essentially $-I_S \approx -10^{-14}$ A — negligibly small |

The factor $e^{V_D/V_T}$ is enormous even for small positive voltages. At $V_D = 0.6$ V:

$$e^{0.6 / 0.025} = e^{24} \approx 2.6 \times 10^{10}$$

So the forward current is about $10^{10}$ times larger than $I_S$. This is why the diode appears to "turn on" suddenly around 0.6-0.7V — the exponential function is extremely nonlinear.

<details>
<summary><strong>Pause & Think</strong>: Why does the diode have a "knee" voltage around 0.6-0.7V instead of conducting immediately at V = 0?</summary>

Mathematically, the diode does conduct at V > 0, but the current is $I_S (e^{V/V_T} - 1)$. When $V = 0.1$V, $e^{0.1/0.025} = e^4 \approx 55$, so $I \approx 55 I_S \approx 55 \times 10^{-14}$ A — essentially zero. The exponential only produces measurable current (milliamps) when $V$ reaches about 0.6V. We perceive a "knee" because the human eye sees the jump from picoamps to milliamps as sudden.

</details>

## What Makes an Element Nonlinear?

A two-terminal element is nonlinear if its V-I relationship cannot be written as $V = kI$ for some constant $k$. Equivalently, **the resistance is not constant** — it depends on the operating point.

For a diode, you can define a **dynamic resistance** at any point on the curve:

$$r_d = \frac{dV_D}{dI_D} = \frac{V_T}{I_D + I_S} \approx \frac{V_T}{I_D}$$

At $I_D = 1$ mA, $r_d \approx 25\Omega$. At $I_D = 10$ mA, $r_d \approx 2.5\Omega$. The resistance changes by a factor of 10 even though the current only changed by a factor of 10. This is the hallmark of nonlinearity.

## The Black-Box Approach

[[visual:black-box-concept]]

Here is the deepest idea in this entire lesson: **you don't need to know what's inside an element to use it.** All you need is its V-I characteristic — a graph or equation that relates the terminal voltage to the terminal current.

From outside a black box:
1. Apply a voltage $V$, measure the current $I$ (or vice versa)
2. Repeat for many values
3. Plot the result — that's the V-I characteristic

It doesn't matter whether the box contains a resistor, a transistor, a solar cell, or a hamster on a wheel. If you know the V-I curve, you can analyse any circuit containing that element.

## Hypothetical Nonlinear Device — Cubic Characteristic

To build intuition, consider a hypothetical device with a **cubic** V-I relationship:

$$I = \alpha V^3$$

[[visual:cubic-device-vi]]

This curve passes through the origin (no current at zero voltage) but is much steeper than a resistor for large voltages. The device has a voltage-dependent conductance:

$$G(V) = \frac{dI}{dV} = 3\alpha V^2$$

The conductance is zero at $V = 0$ and grows as $V^2$ — very different from a resistor where $G$ is constant.

## MOSFET as a Nonlinear Element (Preview)

[[visual:mosfet-quadratic-preview]]

In a later concept, you'll study the MOSFET in detail. For now, notice that in its saturation region, a MOSFET behaves as a nonlinear element with a **quadratic** relationship:

$$I_{DS} = \frac{K}{2}(V_{GS} - V_T)^2 \quad \text{for } V_{GS} > V_T$$

This is more complex than the diode (two parameters: $K$ and $V_T$), but the principle is identical — the V-I curve is not a straight line, so the element is nonlinear.

## Solving Circuits with Nonlinear Elements

With linear elements, you solve circuits algebraically — KVL and KCL produce linear equations with unique solutions. With nonlinear elements, you can't always solve algebraically. Three approaches exist:

| Method | When to use |
|--------|------------|
| **Graphical** (load-line) | One nonlinear element + linear circuit |
| **Piecewise-linear (PWL)** | Replace the curve with line segments |
| **Numerical** (Newton-Raphson) | Complex circuits (SPICE does this) |

[[visual:load-line-concept]]

The **load-line method** is the most intuitive. You plot the V-I curve of the nonlinear element and the "load line" from the rest of the circuit on the same axes. Their intersection is the **operating point** — the simultaneous solution that satisfies both the element relationship and the circuit equations.

<details>
<summary><strong>Pause & Think</strong>: Can a circuit with nonlinear elements have multiple operating points?</summary>

Yes! If the nonlinear V-I curve is S-shaped or has multiple intersections with the load line, there can be multiple valid operating points. This is how memory circuits (flip-flops) and oscillators work — the circuit can "latch" into one of several stable states. For a simple diode circuit, there is typically one unique operating point.

</details>

## Summary

- **Nonlinear elements** have V-I characteristics that are curves, not straight lines
- The **diode** is the most important nonlinear element, with an exponential V-I curve: $I_D = I_S(e^{V_D/V_T} - 1)$
- The **black-box approach** means any element is fully characterised by its V-I relationship, regardless of internal construction
- **Dynamic resistance** $r_d = dV/dI$ varies with operating point for nonlinear elements
- Circuits with nonlinear elements are solved using **graphical** (load-line), **piecewise-linear**, or **numerical** methods
- The load line plots the circuit constraint; its intersection with the element's V-I curve gives the **operating point**
