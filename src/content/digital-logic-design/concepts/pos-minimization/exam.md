# POS Minimization - Exam Preparation

## Quick Reference

### Maxterm Construction
| Input Bit | In Maxterm |
|-----------|------------|
| 0 | Variable (uncomplemented) |
| 1 | Variable (complemented) |

**Example**: For input 011 (A=0, B=1, C=1):
- A=0 → A
- B=1 → $\bar{B}$
- C=1 → $\bar{C}$
- Maxterm $M_3$ = $(A + \bar{B} + \bar{C})$

---

## Worked Examples

### Example 1: Basic POS

**Problem**: F(A,B,C) = ΠM(0, 3, 5, 6)

This means 0s at positions 0, 3, 5, 6.

**K-Map**:
```
      C
    0   1
  ┌───┬───┐
0 │ 0 │ 1 │   m0=0, m1=1
AB ├───┼───┤
1 │ 1 │ 0 │   m2=1, m3=0
  ├───┼───┤
11│ 0 │ 1 │   m6=0, m7=1
  ├───┼───┤
10│ 1 │ 0 │   m4=1, m5=0
  └───┴───┘
```

**Group the 0s**:
- G1: m0, m6 (col C=0, rows 00 and 11)
  - Hmm, rows 00 (AB=00) and 11 (AB=11)... are they adjacent?
  - In Gray code: 00 and 11 are NOT adjacent (differ in 2 bits)
  - So m0 and m6 cannot form a group.

Let me reconsider:
- m0: row 00, col 0
- m3: row 01, col 1
- m5: row 10, col 1
- m6: row 11, col 0

**G1**: m3, m5 (col C=1, rows 01 and 10)
- Rows 01 and 10 are NOT adjacent in Gray code
- Cannot group.

Each 0 must be covered individually:

- m0 (000): $(A + B + C)$
- m3 (011): $(A + \bar{B} + \bar{C})$
- m5 (101): $(\bar{A} + B + \bar{C})$
- m6 (110): $(\bar{A} + \bar{B} + C)$

**Result**: F = $(A+B+C)(A+\bar{B}+\bar{C})(\bar{A}+B+\bar{C})(\bar{A}+\bar{B}+C)$

This is a checkerboard pattern — it's actually XOR: $F = A \oplus B \oplus C$

---

### Example 2: POS with Larger Groups

**Problem**: Find POS for F = Σm(0, 1, 4, 5, 6, 7)

**K-Map** (3-variable):
```
      C
    0   1
  ┌───┬───┐
0 │ 1 │ 1 │   m0=1, m1=1
AB ├───┼───┤
1 │ 0 │ 0 │   m2=0, m3=0
  ├───┼───┤
11│ 1 │ 1 │   m6=1, m7=1
  ├───┼───┤
10│ 1 │ 1 │   m4=1, m5=1
  └───┴───┘
```

0s at: m2, m3 only

**Group**: m2, m3 (full row AB=01)
- A=0, B=1, C varies
- A=0 → A
- B=1 → $\bar{B}$
- Maxterm: $(A + \bar{B})$

**Result**: F = $(A + \bar{B})$

---

### Example 3: Four-Variable POS

**Problem**: F(A,B,C,D) = ΠM(0, 2, 5, 7, 8, 10, 13, 15)

**K-Map**:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  0 │  1 │  1 │  0 │
AB 01│  1 │  0 │  0 │  1 │
 11 │  1 │  0 │  0 │  1 │
 10 │  0 │  1 │  1 │  0 │
    └────┴────┴────┴────┘
```

0s at: m0, m2, m5, m7, m8, m10, m13, m15

**Groups of 0s**:

**G1**: m0, m2, m8, m10 (corners)
- B=0, D=0
- Maxterm: $(B + D)$

**G2**: m5, m7, m13, m15 (center 2×2)
- B=1, D=1
- Maxterm: $(\bar{B} + \bar{D})$

**Result**: F = $(B + D)(\bar{B} + \bar{D})$

Simplify: $= B\bar{B} + B\bar{D} + D\bar{B} + D\bar{D} = B\bar{D} + D\bar{B} = B \oplus D$

---

### Example 4: POS with Don't Cares

**Problem**: F = ΠM(1, 3, 6) + Πd(10, 11, 12, 13, 14, 15)

0s at: 1, 3, 6
Xs at: 10-15

**K-Map**:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │  0 │  0 │  1 │
AB 01│  1 │  1 │  1 │  0 │
 11 │  X │  X │  X │  X │
 10 │  X │  X │  X │  X │
    └────┴────┴────┴────┘
```

**Grouping 0s** (can use X as 0):

**G1**: m1, m3 (row 00, cols 01+11)
- A=0, B=0, D=1
- Maxterm: $(A + B + \bar{D})$

**G2**: m6, m14(X) (col 10, rows 01+11)
- Or larger: m6 with m2? No, m2=1.
- m6 alone would be $(\bar{A} + \bar{B} + C + D)$... 4 literals
- m6, m14: rows 01 and 11, col 10
  - A varies, B=1, C=1, D=0
  - Maxterm: $(\bar{B} + \bar{C} + D)$

**Result**: F = $(A + B + \bar{D})(\bar{B} + \bar{C} + D)$

---

## Exam Checklist

- [ ] Identify all 0s in the function
- [ ] Plot 0s on K-map
- [ ] Group 0s (same rules as grouping 1s)
- [ ] For don't cares: treat X as 0 when it helps
- [ ] Extract maxterms using **opposite** complementation rule
- [ ] AND all maxterms together
- [ ] Verify: check that all 0s are covered

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Using SOP complementation rule | Maxterms: 0→uncomp, 1→comp |
| Forgetting wrap-around for 0s | Same adjacency rules apply |
| Treating X as 1 | In POS, treat X as 0 |
| OR'ing maxterms | POS uses AND between maxterms |
| Wrong notation | POS = ΠM(...), SOP = Σm(...) |
