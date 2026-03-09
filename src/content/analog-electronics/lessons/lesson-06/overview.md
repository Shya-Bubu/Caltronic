# BJT Small-Signal Analysis & Amplifier Design

Welcome back. In the previous lessons, you learned how to bias a BJT, classify amplifiers, and analyse the three configurations (CE, CB, CC) as two-port networks. You now have the DC side of the story — setting the Q-point so the transistor sits happily in the active region.

But here's the thing: **biasing is only half the job**. The whole reason we bias a transistor is so it can *amplify signals*. And to predict *how much* it amplifies, we need a way to analyse the AC behaviour — the small wiggles around the Q-point.

That's what this lesson is all about.

## What You'll Learn

You're about to develop a complete toolkit for small-signal AC analysis:

1. **Why linearisation works** — The BJT is inherently nonlinear, but when signals are tiny (less than 10 mV at the base-emitter junction), a Taylor series expansion lets us treat it as a linear device. This is the foundation of everything that follows.

2. **The h-parameter model** — You'll derive the four h-parameters ($h_{ie}$, $h_{re}$, $h_{fe}$, $h_{oe}$) from first principles using partial derivatives, and understand what each one physically represents.

3. **Reading h-parameters from graphs** — Given only the input and output characteristic curves of a transistor, you'll learn to extract all four h-parameters graphically — a skill the exam loves to test.

4. **Analysing any amplifier** — Using the h-parameter equivalent circuit, you'll derive general formulas for current gain ($A_I$), voltage gain ($A_V$), input impedance ($Z_{in}$), and output impedance ($Z_{out}$) that work for *any* configuration.

5. **Bandwidth** — Real amplifiers don't work at all frequencies. Coupling capacitors create a lower cutoff, and parasitic capacitances create an upper cutoff. You'll learn to calculate both.

6. **A complete worked example** — Tying it all together, you'll walk through a full CE amplifier analysis from DC bias through AC equivalent circuit to final gain and impedance numbers.

## Why This Matters

This is the lesson where theory meets practice. After this, when someone hands you a BJT amplifier circuit and says "what's the voltage gain?", you'll know exactly how to answer — systematically, confidently, and with numbers that match what you'd measure on a real circuit.

> **Take your time with this one.** The concepts build on each other tightly. If the linearisation in Concept 1 feels shaky, pause and revisit it before moving on — everything else depends on it.
