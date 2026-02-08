# Integrator & Differentiator

## Activities 5 & 6: Mathematical Operations with Op-Amps

These are the most advanced op-amp configurations, performing **calculus** operations on signals!

## Part 1: The Integrator (Activity 5)

### The Concept

An **integrator** produces an output proportional to the **integral** (area under the curve) of the input signal.

$$V_o = -\frac{1}{RC}\int V_{in} \, dt + V_C(0)$$

### The Circuit

[[visual:diag-intuition-01]]

The key difference: **Capacitor in the feedback path** (instead of resistor).

- Rs (input resistor) from input to inverting terminal
- C (feedback capacitor) from output to inverting terminal

### Wave Transformations

| Input | Output |
|-------|--------|
| Square wave | Triangle wave |
| Triangle wave | Parabola |
| Sine wave | Cosine wave (90° phase shift) |
| DC | Ramp (saturation!) |

> 🤔 **Pause & Reflect**: Why does a DC input cause saturation?

<details>
<summary>Click to reveal answer</summary>

For DC input: $V_o = -\frac{1}{RC}\int V_{DC} \, dt = -\frac{V_{DC}}{RC} \cdot t$

The output is a **ramp** that increases forever! Eventually it hits the ±14V saturation limit.

This is the "DC drift problem" — even tiny DC offsets cause the capacitor to charge up over time.

</details>

### The Modified Integrator (Active LPF)

To prevent DC saturation, add a resistor R in parallel with C.

This limits the DC gain to R/Rs instead of infinity.

---

## Part 2: The Differentiator (Activity 6)

### The Concept

A **differentiator** produces an output proportional to the **rate of change** (derivative) of the input.

$$V_o = -RC \frac{dV_{in}}{dt}$$

### The Circuit

[[visual:diag-intuition-02]]

The key difference: **Capacitor at the input** (opposite of integrator).

- C (input capacitor) from input signal
- R (feedback resistor) from output to inverting terminal

### Wave Transformations

| Input | Output |
|-------|--------|
| Triangle wave | Square wave |
| Sine wave | Cosine wave (90° lead) |
| Square wave | Spikes! (impulses at edges) |
| DC | Zero (derivative of constant = 0) |

### The High-Frequency Problem

At high frequencies, the differentiator has **increasing gain**. This means high-frequency noise gets massively amplified!

### The Modified Differentiator (Active HPF)

Add R1 in series with C to limit high-frequency gain.

[[visual:sim-intuition-01]]

---

*Continue to Engineering for Activities 5 & 6 procedures.*
