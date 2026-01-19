# Maximum Power Transfer

## The Matching Problem

How do you squeeze the most power out of a source? The answer might surprise you!

---

## The Core Question

Given a source (with internal resistance), what load resistance extracts maximum power?

```
    Source                  Load
    ┌─────────┐
    │   R_th  │
    │ ──/\/\/─┼───○────/\/\/────○
    │         │         R_L
    │  V_th   │
    │    │    │
    │────┼────┼───○──────────────○
    └────┴────┘
```

Should $R_L$ be big? Small? Somewhere in between?

---

## Extreme Cases

### Case 1: $R_L = 0$ (Short Circuit)

Current is maximum: $I = \frac{V_{th}}{R_{th}}$

But voltage across load is zero: $V_L = 0$

Power to load: $P_L = V_L \times I = 0$ ❌

### Case 2: $R_L = \infty$ (Open Circuit)

Voltage is maximum: $V_L = V_{th}$

But current is zero: $I = 0$

Power to load: $P_L = V_L \times I = 0$ ❌

### The Goldilocks Zone

If both extremes give zero power, the maximum must be somewhere in between!

---

## A Water Pipe Analogy

Imagine water flowing through a pipe (source) into a turbine (load):

**Wide open turbine** (no resistance):
- Water flows fast, but turbine spins freely with no force
- Zero power extracted

**Blocked turbine** (infinite resistance):
- Huge pressure builds up, but water can't flow
- Zero power extracted

**Matched turbine** (right resistance):
- Some flow AND some pressure
- Maximum power extracted!

---

## The Answer: Impedance Matching

**Maximum power transfer occurs when:**

$$R_L = R_{th}$$

The load resistance should **equal** the Thévenin (source) resistance!

This is called **impedance matching** or **resistance matching**.

---

## Maximum Power Formula

When $R_L = R_{th}$:

$$P_{max} = \frac{V_{th}^2}{4R_{th}}$$

This is the theoretical maximum power the source can deliver to ANY load.

---

## Efficiency vs Power

Here's the catch: **Maximum power ≠ Maximum efficiency**

### At Maximum Power ($R_L = R_{th}$):

- Power to load: $\frac{V_{th}^2}{4R_{th}}$
- Power in source: $\frac{V_{th}^2}{4R_{th}}$ (same!)
- **Efficiency: 50%**

Half the power is wasted in the source resistance!

### For High Efficiency:

Make $R_L >> R_{th}$
- Most voltage appears across load
- Efficiency approaches 100%
- But total power decreases

---

## When to Use Matching

### Match for Maximum Power:
- Radio/antenna systems (weak signals, need max power)
- Audio amplifiers (speaker matching)
- Sensor interfaces (extract all signal power)
- Communication systems

### Don't Match (Prioritize Efficiency):
- Power distribution (want 95%+ efficiency)
- Battery-powered devices (save energy)
- Motor drives (efficiency matters more)
- Any high-power application

---

## Numerical Example

**Given**: $V_{th} = 12V$, $R_{th} = 4Ω$

**Question**: What $R_L$ maximizes power? What is that power?

**Solution**:

For maximum power: $R_L = R_{th} = 4Ω$

$$P_{max} = \frac{V_{th}^2}{4R_{th}} = \frac{12^2}{4 \times 4} = \frac{144}{16} = 9W$$

**Verification**:
- Total resistance: $R_{th} + R_L = 8Ω$
- Current: $I = 12/8 = 1.5A$
- Power to load: $P_L = I^2 R_L = 1.5^2 \times 4 = 9W$ ✓

---

## Power Curve

As $R_L$ varies from 0 to ∞:

```
Power
  │
  │      ●  Maximum at R_L = R_th
  │     /|\
  │    / | \
  │   /  |  \
  │  /   |   \
  │ /    |    \
  │/     |     \
  └──────┼──────────── R_L
         R_th
```

The curve rises from 0, peaks at $R_L = R_{th}$, then falls back toward 0.

---

## Summary

| Condition | Power to Load | Efficiency |
|-----------|---------------|------------|
| $R_L = 0$ | 0 | 0% |
| $R_L < R_{th}$ | Less than max | < 50% |
| $R_L = R_{th}$ | **Maximum** | 50% |
| $R_L > R_{th}$ | Less than max | > 50% |
| $R_L = \infty$ | 0 | ~100% (but zero power!) |

**The Trade-off**: You can have maximum power OR high efficiency, but not both!
