# Lesson 08: Feedback Amplifiers

> **Before you begin**: This lesson is where everything you've learned so far — transistor models, small-signal analysis, amplifier configurations — gets used in the most powerful way. Feedback is the single technique that separates a toy amplifier from a professional one.

## What You'll Learn

In this lesson, you will:

- Understand why **negative feedback** is used in virtually every real-world amplifier
- Derive the fundamental closed-loop gain formula: $A_f = \frac{A}{1 + A\beta}$
- Identify the **four feedback topologies** from a circuit schematic
- Know how feedback changes **input and output impedance** — and *why*, with derivations
- Apply a **6-step analysis procedure** to two complete circuit examples

## Why This Lesson Changes Everything

Before feedback: your amplifier's gain depends on the transistor's $h_{FE}$, which varies from device to device and with temperature. Your gain is unpredictable.

After feedback: your gain depends on a resistor ratio. Resistors are stable. Your gain is predictable.

This trade — exchanging raw, unstable gain for controlled, stable gain — is the fundamental engineering insight of this entire chapter.

## Prerequisites

Make sure you're comfortable with:
- Amplifier classification (voltage, current, transconductance, transresistance)
- Small-signal BJT analysis using h-parameters
- The concept of input and output impedance

If any of those feel shaky, revisit Lessons 05 and 06 briefly before continuing.
