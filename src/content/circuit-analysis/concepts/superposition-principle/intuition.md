# Superposition Principle

## Breaking Big Problems Into Small Ones

Some circuits have multiple sources—batteries, power supplies, current sources. Superposition lets you tackle them one at a time!

---

## The Core Idea

For any **linear** circuit with multiple sources:

> **Total response = Sum of individual responses**

Turn on one source at a time, find its contribution, then add them all up.

---

## A Wave Pool Analogy

Imagine a swimming pool with wave machines on two sides:

**Machine A** creates waves going left-to-right.
**Machine B** creates waves going up-down.

**Question**: What does the water surface look like when BOTH machines run?

**Answer**: The waves ADD together!
- Where both push up → Extra high
- Where both push down → Extra low
- Where one pushes up and one pushes down → They partially cancel

This is superposition: the total disturbance is the sum of individual disturbances.

---

## Why Does This Work?

### Linearity Is Key

Superposition works because circuit elements (R, L, C) are **linear**:
- Double the voltage → Double the current
- Add two voltages → Currents add

**Linear means**: $f(a + b) = f(a) + f(b)$

### Non-Linear Elements Break Superposition!

For a diode or transistor (nonlinear):
- Doubling voltage does NOT double current
- Superposition does NOT work!

---

## The Procedure

### Step 1: Count the Independent Sources

How many independent voltage and current sources?

### Step 2: Keep One Source, "Turn Off" Others

For each source:
- **Turn off voltage source**: Replace with short circuit (wire)
- **Turn off current source**: Replace with open circuit (break)

### Step 3: Solve the Simplified Circuit

With only one source active, find the response (current or voltage you want).

### Step 4: Repeat for Each Source

Do Step 2-3 for every source.

### Step 5: Add the Results

$$\text{Total response} = \sum \text{Individual responses}$$

Watch the signs—responses can add or subtract!

---

## "Turning Off" Sources

### Voltage Source → Short Circuit

A "turned off" ideal voltage source has V = 0.

V = 0 means no voltage difference → equivalent to a **wire**.

```
   Before:        After (turned off):
   
    + 12V -           ────────
   ────┤├────        (short circuit)
```

### Current Source → Open Circuit

A "turned off" ideal current source has I = 0.

I = 0 means no current flow → equivalent to a **break**.

```
   Before:         After (turned off):
   
     ↑              
    2A              ─ ─ ─
     │             (open circuit)
```

---

## Example: Two Voltage Sources

```
        R₁=4Ω           R₂=2Ω
    ┌────/\/\/────┬────/\/\/────┐
    │             │             │
   (+)           R₃=6Ω        (+)
   12V            │            6V
   (-)           │            (-)
    │             │             │
    └─────────────┴─────────────┘
```

**Goal**: Find voltage across R₃.

### Due to 12V Source Alone

Turn off 6V (replace with wire):

```
        4Ω            2Ω
    ┌────/\/\/────┬───/\/\/───┐
    │             │           │
   (+)           6Ω          │
   12V            │          ─┘
   (-)           │
    │             │
    └─────────────┘
```

R₂ and R₃ in parallel: $\frac{6 \times 2}{6+2} = 1.5Ω$

Total R from 12V: $4 + 1.5 = 5.5Ω$

Current from 12V: $I = \frac{12}{5.5} = 2.18A$

Voltage across R₃: $V_{R3}^{(1)} = 2.18 \times 1.5 = 3.27V$ (+ at top)

### Due to 6V Source Alone

Turn off 12V (replace with wire):

```
        4Ω            2Ω
    ┌───/\/\/───┬───/\/\/────┐
   ─┘           │            │
               6Ω           (+)
                │           6V
                │           (-)
                │            │
    ────────────┴────────────┘
```

R₁ and R₃ in parallel: $\frac{4 \times 6}{4+6} = 2.4Ω$

Total R from 6V: $2 + 2.4 = 4.4Ω$

Current from 6V: $I = \frac{6}{4.4} = 1.36A$

Voltage across R₃: $V_{R3}^{(2)} = 1.36 \times 2.4 = 3.27V$ (+ at top)

### Total Response

Both sources create positive voltage at top of R₃:

$$V_{R3} = V_{R3}^{(1)} + V_{R3}^{(2)} = 3.27 + 3.27 = 6.54V$$

---

## Example: Mixed Sources

```
    ┌────/\/\/────┐
    │     4Ω      │
    │             │
   12V           2A↑
    │             │
    └─────────────┘
```

**Goal**: Find current through 4Ω.

### Due to 12V Alone

Open circuit the 2A source:

```
    ┌────/\/\/────┐
    │     4Ω      │
   12V           ─ ─
    │
    └─────────────
```

No complete path! Current from 12V = 0A.

$I_{R}^{(1)} = 0A$

### Due to 2A Alone

Short circuit the 12V:

```
    ┌────/\/\/────┐
    │     4Ω      │
    │             │
    ─            2A↑
    │             │
    └─────────────┘
```

All 2A flows through the 4Ω (and the short):

$I_{R}^{(2)} = 2A$ (upward on right side means leftward through R)

### Total

$$I_R = 0 + 2 = 2A$$

---

## When to Use Superposition

### Great For:
✅ Understanding how each source contributes
✅ Finding contribution of a single source
✅ Sensitivity analysis (how does changing one source affect output?)
✅ Simple circuits where component-by-component analysis is easy

### Not Ideal For:
❌ Finding power (P = I²R is nonlinear!)
❌ Complex circuits where nodal/mesh is faster
❌ Nonlinear circuits (doesn't work at all)

---

## Important Warning: Power!

Superposition works for **voltage** and **current** (linear).

It does NOT work directly for **power** (nonlinear)!

$$P \neq P_1 + P_2$$

To find power:
1. Use superposition to find total V or I
2. THEN calculate P = V²/R or P = I²R

---

## Summary

| Step | Action |
|------|--------|
| 1 | Identify all independent sources |
| 2 | Turn off all sources except one |
| 3 | Solve for desired response |
| 4 | Repeat for each source |
| 5 | Add all responses (with correct signs) |

**The Magic**: Complex multi-source circuits become simple single-source problems!
