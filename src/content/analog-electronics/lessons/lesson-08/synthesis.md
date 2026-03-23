# Lesson 08 Synthesis: The Big Picture of Feedback

You've now gone through all five concepts of feedback amplifiers. Let's zoom out and see how it all connects.

## The Single Thread

Everything in this lesson flows from one equation:

$$A_f = \frac{A}{1 + A\beta}$$

From this one formula, you derived:
- **Gain stability**: $\frac{dA_f}{A_f} = \frac{1}{D} \cdot \frac{dA}{A}$
- **Reduced distortion**: divided by $D$
- **Extended bandwidth**: multiplied by $D$
- **Controlled impedances**: $R_i \times D$ or $R_i / D$, depending on topology

The desensitivity factor $D = 1 + A\beta$ is the engine behind all of these improvements.

## The Four Topologies at a Glance

| Topology | Amplifier Type | $R_i$ | $R_o$ |
|---|---|---|---|
| Series-Shunt | Voltage | $\times D$ | $\div D$ |
| Series-Series | Transconductance | $\times D$ | $\times D$ |
| Shunt-Shunt | Transresistance | $\div D$ | $\div D$ |
| Shunt-Series | Current | $\div D$ | $\times D$ |

**The pattern to remember**: feedback always pushes impedances toward their ideal values for that amplifier type.

## The Analysis Recipe

When you see a feedback circuit in an exam:
1. Find the feedback element
2. Check connections → identify topology
3. Calculate $\beta = X_f / X_o$
4. Find open-loop gain $A$ (with loading!)
5. Compute $A_f = A/(1+A\beta)$
6. Compute $R_{if}$ and $R_{of}$ from topology rules

## What's Next

Lesson 09 builds on feedback theory to study **oscillators** — where positive feedback ($A\beta = -1$) is used intentionally to produce sustained oscillations. The same equation, a different sign.
