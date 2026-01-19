# Four Variable K-Maps - Exam Preparation

## Standard Template (Memorize!)

```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  0 │  1 │  3 │  2 │
    ├────┼────┼────┼────┤
AB 01│  4 │  5 │  7 │  6 │
    ├────┼────┼────┼────┤
 11 │ 12 │ 13 │ 15 │ 14 │
    ├────┼────┼────┼────┤
 10 │  8 │  9 │ 11 │ 10 │
    └────┴────┴────┴────┘
```

**Row order** (Gray code): 00, 01, 11, 10
**Column order** (Gray code): 00, 01, 11, 10

---

## Worked Examples

### Example 1: Standard Grouping

**Problem**: F(A,B,C,D) = Σm(0, 1, 2, 8, 9, 10, 12, 13)

**K-Map**:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │  1 │  0 │  1 │
AB 01│  0 │  0 │  0 │  0 │
 11 │  1 │  1 │  0 │  0 │
 10 │  1 │  1 │  0 │  1 │
    └────┴────┴────┴────┘
```

**Groups**:
- G1: m0, m1, m8, m9 (rows 00+10, cols 00+01) → $\bar{B}\bar{C}$
- G2: m0, m2, m8, m10 (corners: rows 00+10, cols 00+10) → $\bar{B}\bar{D}$
- G3: m12, m13 (row 11, cols 00+01) → $AB\bar{C}$

**Result**: F = $\bar{B}\bar{C} + \bar{B}\bar{D} + AB\bar{C}$

Can simplify? $\bar{B}\bar{C} + AB\bar{C} = \bar{C}(\bar{B} + AB) = \bar{C}(\bar{B} + A)$ using absorption... but K-map gives us the direct minimal SOP.

---

### Example 2: Large Groups

**Problem**: F(A,B,C,D) = Σm(0, 1, 4, 5, 8, 9, 12, 13)

**K-Map**:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │  1 │  0 │  0 │
AB 01│  1 │  1 │  0 │  0 │
 11 │  1 │  1 │  0 │  0 │
 10 │  1 │  1 │  0 │  0 │
    └────┴────┴────┴────┘
```

**Group**: All 8 ones form one group (left two columns)
- A varies, B varies, C=0, D varies between 0 and 1... 
- Wait, columns 00 and 01 have CD=00 and CD=01
- C=0 in both, D varies
- Term: $\bar{C}$

**Result**: F = $\bar{C}$

---

### Example 3: Corner Group

**Problem**: F(A,B,C,D) = Σm(0, 2, 8, 10)

**K-Map**:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │  0 │  0 │  1 │
AB 01│  0 │  0 │  0 │  0 │
 11 │  0 │  0 │  0 │  0 │
 10 │  1 │  0 │  0 │  1 │
    └────┴────┴────┴────┘
```

**Group**: Four corners (wrap-around both ways!)
- Row 00 and 10: B=0
- Col 00 and 10: D=0
- Term: $\bar{B}\bar{D}$

**Result**: F = $\bar{B}\bar{D}$

---

### Example 4: Isolated Cell

**Problem**: F(A,B,C,D) = Σm(5, 7, 13)

**K-Map**:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  0 │  0 │  0 │  0 │
AB 01│  0 │  1 │  1 │  0 │
 11 │  0 │  1 │  0 │  0 │
 10 │  0 │  0 │  0 │  0 │
    └────┴────┴────┴────┘
```

**Groups**:
- G1: m5, m7 (row 01, cols 01+11) → $\bar{A}BD$
- G2: m5, m13 (col 01, rows 01+11) → $B\bar{C}D$

**Result**: F = $\bar{A}BD + B\bar{C}D$

Both are needed (m7 only covered by G1, m13 only by G2, m5 by both).

---

## Common Mistake Fixes

| Mistake | Correct Approach |
|---------|------------------|
| Missing corner group | Always check: m0, m2, m8, m10 |
| Groups of 6 | Split into two overlapping groups of 4 |
| Wrong wrap-around | Both left↔right AND top↔bottom |
| Diagonal grouping | Diagonals are NOT adjacent |

---

## Quick Group-to-Term Reference

### Full Rows
- Row 00: $\bar{A}\bar{B}$
- Row 01: $\bar{A}B$
- Row 11: $AB$
- Row 10: $A\bar{B}$

### Full Columns
- Col 00: $\bar{C}\bar{D}$
- Col 01: $\bar{C}D$
- Col 11: $CD$
- Col 10: $C\bar{D}$

### Common 2×2 Squares
- Center: $BD$ (cells 5,7,13,15)
- Top-left: $\bar{A}\bar{C}$ (cells 0,1,4,5)
- Corners: $\bar{B}\bar{D}$ (cells 0,2,8,10)

---

## Exam Checklist

- [ ] Template drawn correctly (Gray code: 00,01,11,10)
- [ ] All minterms placed in correct positions
- [ ] Check for groups of 8 first
- [ ] Check for groups of 4 (rows, columns, 2×2 squares)
- [ ] Check corner group specifically
- [ ] All wrap-arounds considered
- [ ] Every 1 covered by at least one group
- [ ] No groups smaller than necessary
- [ ] Final expression is OR of all group terms
