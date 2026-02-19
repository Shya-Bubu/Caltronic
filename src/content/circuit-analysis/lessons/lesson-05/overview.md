# Lesson 05: AC Phasors & Impedance

Welcome to one of the most powerful ideas in all of electrical engineering — the **phasor method**.

Up until now, every circuit you have analysed has been a DC circuit. Voltages were constants, currents were constants, and resistors were the only elements you needed. That is about to change dramatically. In the real world, the vast majority of electrical signals are **sinusoidal** — your household mains supply, radio waves, audio signals, and the clock signal inside every computer are all sinusoids or built from sinusoids.

The challenge is this: when you apply a sinusoidal voltage to a circuit containing capacitors and inductors, the resulting currents and voltages are also sinusoidal — but with different amplitudes and phases. Writing out all those sine and cosine functions and solving differential equations for every circuit would be extraordinarily tedious. There has to be a better way.

And there is. The **phasor method** transforms sinusoidal time-domain problems into simple algebraic problems using complex numbers. Instead of solving differential equations, you solve the same kinds of equations you already know from DC circuit analysis — except the numbers are complex.

## What You Will Learn

| Concept | Key Idea |
|---------|----------|
| Complex numbers review | The rectangular, polar, and exponential forms — and Euler's formula |
| Introduction to phasors | How a sinusoid becomes a complex number (and back again) |
| Phasor properties & addition | The additive and derivative properties that make phasors so useful |
| Impedance & admittance | The phasor-domain V-I relationships for R, L, and C |
| Impedance combinations | KVL, KCL, series, parallel, and Y-Δ — all in the phasor domain |
| AC power analysis | Instantaneous power, average power, RMS, power factor, and the power triangle |

## Why This Matters

The phasor method is not just a mathematical trick — it is the **standard language** of AC circuit analysis. Power engineers use it to design the electrical grid. Communications engineers use it to analyse filters and amplifiers. Every single AC circuit problem on your exam will expect you to work in the phasor domain.

The beautiful part is this: once you understand phasors, **all the DC analysis techniques you already know — KVL, KCL, nodal analysis, voltage dividers, Thevenin equivalents — work exactly the same way**, just with complex-valued impedances instead of real-valued resistances.

Take your time with the complex number review if it feels unfamiliar. Everything else in this lesson builds on it. And remember: there is no such thing as a stupid question at this stage.
