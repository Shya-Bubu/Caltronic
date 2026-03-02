# First-Order Circuits

> **What you're about to learn**: Up until now, every circuit you've analyzed was *memoryless* — the output at any instant depends only on the input at that instant. First-order circuits change everything. By introducing capacitors and inductors — elements that *store energy* — circuits gain **memory** and produce responses that unfold over time. This is where circuit analysis becomes truly dynamic.

## Why This Lesson Matters

In Lessons 01 and 02, you mastered resistive circuits — Ohm's law, KVL, KCL, node and mesh analysis. Those circuits respond instantaneously: change the input, the output changes immediately. But real circuits don't behave this way. When you flip a switch on a power supply, the output voltage *ramps up* gradually. When you touch a touchscreen, a capacitor *charges* through your finger's resistance. When a relay coil de-energizes, the current *decays* exponentially.

All of these behaviors are governed by **first-order differential equations** — the simplest dynamic equations in circuit theory. Mastering them gives you the tools to understand timing circuits, filters, power supply transients, and signal processing at the most fundamental level.

## Six Key Topics

1. **Capacitor & Inductor Fundamentals** — The V-I relationships that make these elements different from resistors: $i = C\frac{dv}{dt}$ and $v = L\frac{di}{dt}$

2. **Continuity & Impulse** — Why capacitor voltage and inductor current can never jump instantaneously (unless driven by an impulse)

3. **Energy Storage** — The lossless property: capacitors and inductors store energy without dissipating it

4. **RC & RL Response** — The exponential response $x(t) = x(\infty) + [x(t_0) - x(\infty)]e^{-(t-t_0)/\tau}$ and the time constant $\tau$

5. **Exponential Waveform Properties** — The 63% rule, rise time $t_r = 2.2\tau$, and solution by inspection

6. **Piecewise-Linear Circuits** — The dynamic route method for circuits with nonlinear elements
