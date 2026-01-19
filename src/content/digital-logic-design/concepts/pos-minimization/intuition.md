# POS Minimization

## The Other Perspective

So far we've grouped 1s to get **Sum of Products** (SOP). But there's another approach: group the **0s** to get **Product of Sums** (POS)!

---

## When to Use POS

| Situation | Best Approach |
|-----------|---------------|
| More 1s than 0s | POS (fewer 0s to group) |
| More 0s than 1s | SOP (fewer 1s to group) |
| About equal | Try both, pick simpler |
| Output naturally ANDed | POS often maps better |

---

## The Core Idea

### SOP (what we've been doing)
- Group 1s → Get product terms (AND)
- Combine with OR
- F = term₁ + term₂ + ...

### POS (the new approach)
- Group 0s → Get sum terms (OR)
- Combine with AND
- F = (sum₁)(sum₂)...

---

## Maxterms: The Dual of Minterms

| Minterm | Maxterm |
|---------|---------|
| Product of variables | Sum of variables |
| = 1 for one input | = 0 for one input |
| $m_i$ | $M_i$ |
| Used in SOP | Used in POS |

### Maxterm Definition

For input combination i, **maxterm $M_i$** is the sum that equals 0 for that input:

| i | ABC | Minterm $m_i$ | Maxterm $M_i$ |
|---|-----|---------------|---------------|
| 0 | 000 | $\bar{A}\bar{B}\bar{C}$ | $A + B + C$ |
| 1 | 001 | $\bar{A}\bar{B}C$ | $A + B + \bar{C}$ |
| 2 | 010 | $\bar{A}B\bar{C}$ | $A + \bar{B} + C$ |
| 3 | 011 | $\bar{A}BC$ | $A + \bar{B} + \bar{C}$ |
| 4 | 100 | $A\bar{B}\bar{C}$ | $\bar{A} + B + C$ |
| 5 | 101 | $A\bar{B}C$ | $\bar{A} + B + \bar{C}$ |
| 6 | 110 | $AB\bar{C}$ | $\bar{A} + \bar{B} + C$ |
| 7 | 111 | $ABC$ | $\bar{A} + \bar{B} + \bar{C}$ |

**Key Pattern**: Maxterm has **opposite** complementation from minterm!
- Minterm: 1 → uncomplemented, 0 → complemented
- Maxterm: 1 → complemented, 0 → uncomplemented

---

## K-Map POS Procedure

### Step 1: Fill K-Map with 1s and 0s

Same as SOP.

### Step 2: Group the 0s

Same rules as grouping 1s:
- Powers of 2 only
- Rectangular groups
- Wrap-around allowed
- Maximize group size

### Step 3: Write Maxterms

For each group of 0s:
- Variables that **change** within group → eliminated
- Variables that are **constant** → included with OPPOSITE polarity
  - If constant at 0 → variable is **uncomplemented**
  - If constant at 1 → variable is **complemented**

### Step 4: AND the Maxterms

F = (maxterm₁)(maxterm₂)...

---

## Complete Example

**Function**: F(A,B,C) = Σm(1, 2, 5, 6, 7)

This means:
- 1s at: m1, m2, m5, m6, m7
- 0s at: m0, m3, m4

```
      C
    0   1
  ┌───┬───┐
0 │ 0 │ 1 │   m0=0, m1=1
AB ├───┼───┤
1 │ 1 │ 0 │   m2=1, m3=0
  ├───┼───┤
11│ 1 │ 1 │   m6=1, m7=1
  ├───┼───┤
10│ 0 │ 1 │   m4=0, m5=1
  └───┴───┘
```

### SOP (grouping 1s)
Five 1s scattered... multiple groups needed.

### POS (grouping 0s)
Only three 0s: m0, m3, m4

**Group 1**: m0, m4 (column C=0, rows 00 and 10)
- A varies, B=0 (constant), C=0 (constant)
- B=0 → use B (uncomplemented)
- C=0 → use C (uncomplemented)
- Maxterm: $(B + C)$

**Group 2**: m3 alone (can't group with others)
- AB=01, C=1
- A=0 → use A (uncomplemented)
- B=1 → use $\bar{B}$ (complemented)
- C=1 → use $\bar{C}$ (complemented)
- Maxterm: $(A + \bar{B} + \bar{C})$

**Result**: F = $(B + C)(A + \bar{B} + \bar{C})$

---

## Converting Between Forms

You can always convert:
- **SOP to POS**: Use Boolean algebra or K-map
- **POS to SOP**: Distribute (expand) or K-map

**Quick method**: Minimize F̄ in SOP, then complement to get POS of F.

---

## Four-Variable POS Example

**F = ΠM(0, 1, 2, 8, 9, 10)** (Product of maxterms notation)

This means 0s at positions 0, 1, 2, 8, 9, 10.

```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  0 │  0 │  1 │  0 │
AB 01│  1 │  1 │  1 │  1 │
 11 │  1 │  1 │  1 │  1 │
 10 │  0 │  0 │  1 │  0 │
    └────┴────┴────┴────┘
```

**Group the 0s**:

**G1**: m0, m2, m8, m10 (corners!)
- B=0, D=0
- Maxterm: $(B + D)$

**G2**: m0, m1, m8, m9 (left columns, rows 00 and 10)
- B=0, C=0
- Maxterm: $(B + C)$

**Result**: F = $(B + D)(B + C)$

Can factor: F = $B + CD$ (using distribution) — wait, let me verify:
$(B + D)(B + C) = B + CD$ ✓ (by Boolean algebra)

---

## Summary

| Aspect | SOP | POS |
|--------|-----|-----|
| Group | 1s | 0s |
| Terms | Products (AND) | Sums (OR) |
| Combine | OR (+) | AND (·) |
| Polarity | 0→complement | 1→complement |
| Notation | Σm(...) | ΠM(...) |
