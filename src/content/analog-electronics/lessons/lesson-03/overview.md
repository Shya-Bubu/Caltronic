# Modeling Electronic Elements and Circuits

> **Why This Matters**: Every circuit you will ever analyse or design rests on one powerful idea — you don't need to understand the physics of every atom inside a component. You only need the **voltage-current relationship** at its terminals. This lesson teaches you how to build those models, from the simplest ideal wire to the most important semiconductor devices: diodes, BJTs, and MOSFETs.

In the previous lessons you met the concept of **abstraction** — replacing messy reality with clean, usable rules. Now you'll put that idea to work. You'll see that a resistor, a diode, and a transistor are all just black boxes with two (or three) terminals and a relationship between the voltage across them and the current through them. The only difference is what that relationship looks like.

We start with the easiest elements — ideal wires, resistors, open circuits, and sources. Their V-I characteristics are straight lines (or infinitely steep lines, or flat lines). Then we step into **nonlinear territory**: diodes whose current grows exponentially with voltage, and devices where the relationship is quadratic or even weirder.

Along the way, you'll encounter a critical concept: **dependent sources**. These are the secret ingredient that turns a simple junction of semiconductors into an amplifier. A tiny voltage or current at the input *controls* a much larger current or voltage at the output — and that's precisely what a transistor does.

By the end of this lesson, you will be able to:

- Draw and interpret V-I characteristics for any two-terminal element
- Write the element relationship (the equation linking V and I) for linear and nonlinear devices
- Identify the four types of dependent sources and explain how they model real transistors
- Apply three progressively accurate piecewise-linear models for a diode
- Explain how the BJT's external energy model leads to the current-controlled current source
- Distinguish the three operating modes of a BJT (cutoff, active linear, saturation) and draw the equivalent circuit for each
- Use the three MOSFET models (switch, switch-resistor, switch-current-source) and identify the regions of operation on a V-I plot

Don't be intimidated by the number of models. They all follow the same logic: **observe the real behaviour, then find the simplest equation (or set of line segments) that captures what matters for your application.** More detail costs more analysis effort. Less detail risks larger errors. Engineering is choosing the right trade-off.

Let's begin by establishing the conventions and building blocks you'll use throughout the entire course.
