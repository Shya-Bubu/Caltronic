# Two-Terminal Resistors

> **Lesson 01** · Circuit Analysis · Weeks 1-3

---

## What You'll Learn

This lesson covers the foundational building blocks of all circuit analysis. By the end, you'll understand:

- **What resistors really are** — beyond just Ohm's Law
- **v-i characteristics** — the fundamental way to describe any circuit element
- **Linear vs nonlinear resistors** — from basic resistors to diodes
- **Power analysis** — passive vs active elements
- **Series and parallel connections** — combining resistors graphically
- **Piecewise-linear approximation** — practical analysis of nonlinear circuits
- **DC operating points** — finding circuit solutions

---

## Why This Matters

In your previous courses, you learned that a resistor obeys Ohm's Law: v = iR. But what about:
- A diode that only conducts in one direction?
- A tunnel diode with negative resistance regions?
- A Zener diode that breaks down at specific voltages?

**All of these are resistors too!** They're just nonlinear. Understanding this generalized concept of a resistor is essential for:

| Application | Why Two-Terminal Resistors Matter |
|-------------|-----------------------------------|
| **Analog Design** | Diode-based circuits, biasing |
| **Power Electronics** | Nonlinear loads, switching |
| **RF Engineering** | Mixer circuits using nonlinearity |
| **Signal Processing** | Waveform shaping, clipping |

---

## Prerequisites

Before diving in, make sure you're comfortable with:

- Basic circuit concepts (voltage, current, power)
- Kirchhoff's Voltage Law (KVL)
- Kirchhoff's Current Law (KCL)
- Simple series and parallel resistor combinations

> **Don't worry!** Each concept includes a Fundamentals section that reviews any prerequisite material you might need.

---

## Concepts in This Lesson

1. **Linear Resistors and Ohm's Law** — The foundation: v-i characteristics
2. **Power, Passive & Active Resistors** — Energy and modeling
3. **Ideal Diode Characteristics** — Your first nonlinear resistor
4. **Nonlinear Resistor Behaviors** — Bilateral property, harmonics
5. **Series and Parallel Connections** — Driving-point characteristics
6. **Piecewise-Linear Approximation** — Practical analysis technique
7. **DC Operating Points** — Finding circuit solutions

---

Let's begin with the fundamental concept: linear resistors and v-i characteristics.
