# Op-Amp Comparators & Schmitt Triggers

> **Why This Matters**: Up to this point, we've carefully maintained **Negative Feedback** to tame the op-amp's massive open-loop gain and create stable, linear amplifiers. But what if we *want* the op-amp to be unstable? What if we want it to act like a digital switch, snapping violently between its maximum and minimum supply voltages based on an analog input? Welcome to the realm of Comparators and Positive Feedback.

## 1. The Basic Open-Loop Comparator

If you remove all feedback from an op-amp, it operates in **Open-Loop** mode.

Recall the fundamental transfer equation for an op-amp:
$$V_o = A_{vd}(V_+ - V_-)$$

Let's assume the op-amp is powered by $\pm 15\text{V}$ rails, and its open-loop differential gain ($A_{vd}$) is $100,000$.

What happens if $V_+$ is just $+1\text{ mV}$ higher than $V_-$?
$$V_o = 100,000 \times (+0.001\text{V}) = +100\text{V}$$
But the op-amp cannot output $100\text{V}$; it saturates immediately at its maximum rail voltage: $\approx +15\text{V}$.

What if $V_+$ is $-1\text{ mV}$ lower than $V_-$?
$$V_o = 100,000 \times (-0.001\text{V}) = -100\text{V}$$
It saturates immediately at its minimum rail voltage: $\approx -15\text{V}$.

[[visual:transfer-characteristic]]

### Designing a Circuit
By connecting a reference voltage $V_{ref}$ to one terminal and an input signal $V_{in}$ to the other, we create a **Comparator**.

[[visual:comparator-schematic]]

The circuit simply asks one question: **Is $V_{in}$ greater than $V_{ref}$?**
- If yes ($V_{in} > V_{ref}$): The Difference is negative, Output snaps to $-V_{CC}$.
- If no ($V_{in} < V_{ref}$): The Difference is positive, Output snaps to $+V_{CC}$.

*(Note: We connected $V_{in}$ to the inverting terminal here. If we connected it to the non-inverting terminal, the logic would flip).*

### Application: The Zero-Crossing Detector
If we connect $V_{ref}$ to ground ($0\text{V}$), the comparator acts as a zero-crossing detector. Every time the AC input wave transitions from negative to positive, the output violently snaps from $+15\text{V}$ to $-15\text{V}$.

This turns any messy analog sine wave into a perfectly crisp digital square wave, perfect for feeding into a microcontroller.

[[visual:zero-crossing-detector]]
[[visual:falstad-comparator]]

## 2. The Noise Problem

The basic comparator has a critical flaw. Real analog signals are never perfectly smooth; they contain high-frequency electrical noise (like static on a radio).

If a signal is slowly passing through the $0\text{V}$ threshold, a tiny spike of noise might temporarily bump the signal back above the line, then below, then above again. 

Because the op-amp responds instantly, the output will rapidly chatter back and forth between $+15\text{V}$ and $-15\text{V}$ multiple times during a single crossing. If this was driving a motor relay, it would destroy the mechanical contacts in seconds!

[[visual:threshold-noise]]

## 3. The Schmitt Trigger (Positive Feedback)

We need a comparator with "memory." We want it to snap to $15\text{V}$, and then **lock** there, completely ignoring tiny noise spikes until the signal definitively travels far away from the threshold.

We achieve this by using **Positive Feedback**. 

We connect a resistor network from the output back to the **NON-INVERTING ($+$)** terminal.

[[visual:schmitt-trigger-schematic]]

### How Positive Feedback Works

Because there is no negative feedback, the **virtual short principle ($V_+ = V_-$) DOES NOT APPLY.**

Instead, the voltage at the non-inverting terminal $V_+$ is set by a simple voltage divider driven by the output voltage $V_o$:
$$V_+ = V_o \left( \frac{R_2}{R_1 + R_2} \right)$$

Let's assume $R_1 = 50\text{ k}\Omega$ and $R_2 = 10\text{ k}\Omega$. 
The fraction $\beta = \frac{10}{50 + 10} = \frac{1}{6}$.

Let's trace the circuit's operation:

**State 1: Output is High ($+15\text{V}$)**
If $V_o = +15\text{V}$, the voltage divider feeds a fraction of this back to $V_+$. Let's call this the **Upper Threshold Voltage ($V_{TU}$)**.
$$V_{TU} = +15 \times \frac{1}{6} = +2.5\text{V}$$
The reference voltage is now $+2.5\text{V}$. For the input $V_{in}$ to flip the op-amp to its low state, it must rise all the way past $+2.5\text{V}$. Let's say it does. As soon as $V_{in}$ hits $+2.501\text{V}$, the difference becomes negative, and the output snaps to $-15\text{V}$.

**State 2: Output is Low ($-15\text{V}$)**
The instant the output snaps to $-15\text{V}$, the voltage divider immediately changes the reference voltage at $V_+$! Let's call this the **Lower Threshold Voltage ($V_{TL}$)**.
$$V_{TL} = -15 \times \frac{1}{6} = -2.5\text{V}$$
The reference is now $-2.5\text{V}$. For the input $V_{in}$ to flip the op-amp back high, dropping back to $+2.49\text{V}$ (like a noise spike) isn't enough anymore! The input must travel all the way down past $-2.5\text{V}$ to flip it again!

### Hysteresis

This phenomenon—having two different thresholds depending on the current state—is called **Hysteresis**. The voltage gap between the thresholds ($+2.5\text{V}$ to $-2.5\text{V}$) is the **hysteresis band**.

As long as the electrical noise amplitude is smaller than the hysteresis band, the circuit will ignore the noise entirely, snapping only once per valid zero-crossing.

[[visual:hysteresis-curve]]
[[visual:falstad-schmitt-trigger]]

## Summary

- When an op-amp is operated **Open-Loop** (no feedback), its massive gain causes it to act as a **Comparator**, saturating at its supply rails depending on whether $V_+$ or $V_-$ is larger.
- A basic comparator easily suffers from **chattering** when a noisy signal crosses the threshold.
- A **Schmitt Trigger** solves this by using **Positive Feedback** (wiring output to the non-inverting input). 
- Positive feedback creates **Hysteresis**: two distinct trigger thresholds ($V_{TU}$ and $V_{TL}$). This provides noise immunity and ensures clean, singular transitions.
