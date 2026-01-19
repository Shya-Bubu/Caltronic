# Superposition Principle - Exam Preparation

## Key Definitions

| Term | Definition |
|------|------------|
| **Superposition** | Total response = Sum of individual responses |
| **Linear circuit** | One where doubling input doubles output |
| **Turning off V-source** | Replace with short circuit (wire) |
| **Turning off I-source** | Replace with open circuit (break) |

---

## Essential Procedure

1. Count independent sources (n sources)
2. For each source:
   - Keep it, turn off all others
   - Solve simplified circuit
3. Add all n contributions (watch signs!)

---

## Worked Examples

### Example 1: Two Voltage Sources

**Problem**: Find current through 6Ω.

```
        4Ω           6Ω
    ┌───/\/\/───┬───/\/\/───┐
    │           │           │
   (+)         │          (+)
   12V         │           8V
   (-)         │          (-)
    │           │           │
    └───────────┴───────────┘
```

**Solution**:

**Due to 12V alone** (8V → short):
```
        4Ω           6Ω
    ┌───/\/\/───┬───/\/\/───short
    │           │
   12V          │
    │           │
    └───────────┘
```
Current: $I^{(12V)} = \frac{12}{4+6} = 1.2A$ (clockwise)
Through 6Ω: 1.2A (left to right)

**Due to 8V alone** (12V → short):
```
        4Ω           6Ω
    short───────┬───/\/\/───┐
                │           │
                │          8V
                │           │
    ────────────┴───────────┘
```
Current: $I^{(8V)} = \frac{8}{4+6} = 0.8A$ (clockwise in this loop)
Through 6Ω: 0.8A (right to left = -0.8A in our reference)

**Total**:
$$I_{6Ω} = 1.2 + (-0.8) = 0.4A$$ (left to right)

---

### Example 2: Voltage and Current Source

**Problem**: Find voltage across 2Ω.

```
    ┌────/\/\/────┐
    │     4Ω      │
    │             │
   10V           ─┴─ 2Ω
    │             │
    │            3A↑
    │             │
    └─────────────┘
```

**Solution**:

**Due to 10V alone** (3A → open):
```
    ┌────/\/\/────┐
    │     4Ω      │
   10V           2Ω
    │             │
    └─────────────┘
```
Voltage divider:
$$V_{2Ω}^{(10V)} = 10 \cdot \frac{2}{4+2} = \frac{20}{6} = 3.33V$$

**Due to 3A alone** (10V → short):
```
    ┌────/\/\/────┐
    │     4Ω      │
   short         2Ω
    │             │
    │            3A↑
    └─────────────┘
```
4Ω and 2Ω in parallel: $\frac{4 \times 2}{4+2} = \frac{4}{3}Ω$
$$V_{2Ω}^{(3A)} = 3 \times \frac{4}{3} = 4V$$

**Total**:
$$V_{2Ω} = 3.33 + 4 = 7.33V$$

---

### Example 3: Three Sources

**Problem**: Find current I through center branch.

```
           R₁=2Ω     I     R₂=4Ω
    ┌──────/\/\/───→○←───/\/\/──────┐
    │               │               │
   (+)             R₃=3Ω          (+)
   6V               │              12V
   (-)             │              (-)
    │               │               │
    │              2A↓              │
    │               │               │
    └───────────────┴───────────────┘
```

**Solution**:

**Due to 6V alone**:
Kill 12V (short), kill 2A (open).
Only 6V driving through 2Ω + 3Ω in series (4Ω branch shorted at end):
Actually with 12V shorted: R₂ is in parallel with the series R₃.

Let me reconsider: 2Ω in series with (3Ω || 4Ω):
3Ω || 4Ω = 12/7 Ω
Total = 2 + 12/7 = 26/7 Ω
$I_{total} = \frac{6}{26/7} = \frac{42}{26} = 1.615A$
Current through 3Ω: By current divider from junction:
$I^{(6V)} = 1.615 \times \frac{4}{4+3} = 0.923A$ (downward)

**Due to 12V alone**:
Kill 6V (short), kill 2A (open).
12V driving through 4Ω + (2Ω || 3Ω):
2Ω || 3Ω = 6/5 = 1.2Ω
Total = 4 + 1.2 = 5.2Ω
$I_{total} = \frac{12}{5.2} = 2.31A$
Current through 3Ω: $I^{(12V)} = 2.31 \times \frac{2}{2+3} = 0.923A$ (downward)

**Due to 2A alone**:
Kill 6V and 12V (both short).
2A flows through 3Ω with 2Ω || 4Ω = 4/3 Ω in parallel.
Current through 3Ω: By current divider:
$I^{(2A)} = 2 \times \frac{4/3}{4/3 + 3} = 2 \times \frac{4/3}{13/3} = \frac{8}{13} = 0.615A$ (downward)

**Total**:
$$I = 0.923 + 0.923 + 0.615 = 2.46A$$ (downward)

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Keeping dependent sources off | Dependent sources are NEVER turned off |
| Adding powers directly | $P \neq P_1 + P_2$; find total I or V first |
| Wrong sign when combining | Track reference directions carefully |
| Shorting/opening wrong element | V-source → short, I-source → open |

---

## Quick Reference

### "Off" Equivalents
- **Voltage source (V=0)**: Short circuit (wire)
- **Current source (I=0)**: Open circuit (gap)
- **Dependent source**: KEEP ACTIVE!

### Works For
- ✓ Voltage (linear)
- ✓ Current (linear)
- ✗ Power (quadratic—NOT linear)

---

## Exam Checklist

- [ ] Circuit is linear (no diodes, transistors)
- [ ] All independent sources identified
- [ ] Each source analyzed separately
- [ ] Correct replacement (short vs open)
- [ ] Signs tracked properly
- [ ] Power calculated AFTER combining I or V
