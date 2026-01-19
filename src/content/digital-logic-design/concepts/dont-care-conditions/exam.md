# Don't Care Conditions - Exam Preparation

## Key Concepts Checklist

- [ ] Don't cares represent "either 0 or 1 is acceptable"
- [ ] Mark X (or d) in K-map
- [ ] Use X as 1 only when it enlarges groups
- [ ] X's don't NEED to be covered
- [ ] BCD circuits always have 6 don't cares (1010-1111)

---

## Worked Examples

### Example 1: BCD ≥ 5 Detector

**Problem**: F = 1 when BCD input ≥ 5

**Specification**:
- F = 1 for: 5, 6, 7, 8, 9 (ABCD: 0101, 0110, 0111, 1000, 1001)
- F = 0 for: 0, 1, 2, 3, 4
- F = X for: 10-15

$$F = \Sigma m(5,6,7,8,9) + \Sigma d(10,11,12,13,14,15)$$

**K-Map**:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  0 │  0 │  0 │  0 │
AB 01│  0 │  1 │  1 │  1 │
 11 │  X │  X │  X │  X │
 10 │  1 │  1 │  X │  X │
    └────┴────┴────┴────┘
```

**Groups**:
- G1: m5, m7, m13(X), m15(X) → 2×2 square → $BD$
- G2: m6, m7, m14(X), m15(X) → 2×2 square → $BC$
- G3: m8, m9, m10(X), m11(X) → row 10 full → $A\bar{B}$

Check: m8, m9 at row AB=10. With X's at m10, m11, full row → $A\bar{B}$

**Result**: F = $A\bar{B} + BC + BD$

Can simplify? $BC + BD = B(C+D)$... but this might not be simpler in gates.

Actually, let's try: m8, m9, m12(X), m13(X)?
- Rows 10 and 11, columns 00 and 01
- This is a 2×2 with wrap? Let's check positions.
- m8: row 10, col 00
- m9: row 10, col 01
- m12: row 11, col 00
- m13: row 11, col 01
- Yes! This is rows 10+11, cols 00+01 → $A\bar{C}$

New groups:
- G1': $BD$ (m5, m7, m13, m15)
- G2': $BC$ (m6, m7, m14, m15)
- G3': $A\bar{C}$ (m8, m9, m12, m13)

But G3' only covers m8, m9 from required... same as before.

Actually m8, m9 need a group. Let's try bigger:
- m8, m9, m10(X), m11(X), m12(X), m13(X), m14(X), m15(X)?
- That's rows 10+11, all columns = 8 cells → $A$

**Better**: $A$ covers m8, m9 (plus all X's)

**Revised**: F = $A + BC + BD$

Verify:
- m5 (0101): A=0, BC=0, BD=1 → F=1 ✓
- m6 (0110): A=0, BC=1, BD=0 → F=1 ✓
- m7 (0111): A=0, BC=1, BD=1 → F=1 ✓
- m8 (1000): A=1 → F=1 ✓
- m9 (1001): A=1 → F=1 ✓

**Final**: F = $A + BC + BD = A + B(C + D)$

---

### Example 2: Seven-Segment 'a'

**Problem**: Segment 'a' is ON for BCD digits that display the top segment.

Segment 'a' ON for: 0, 2, 3, 5, 6, 7, 8, 9

$$F = \Sigma m(0,2,3,5,6,7,8,9) + \Sigma d(10,11,12,13,14,15)$$

**K-Map**:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │  0 │  1 │  1 │
AB 01│  0 │  1 │  1 │  1 │
 11 │  X │  X │  X │  X │
 10 │  1 │  1 │  X │  X │
    └────┴────┴────┴────┘
```

**Large groups with X**:
- Rows 10+11: 8 cells → $A$ (covers m8, m9)
- Column 11: 4 cells → $CD$ (covers m3, m7)
- Column 10: 4 cells → $C\bar{D}$ (covers m2, m6)

Remaining: m0, m5

- m0 with X's? m0, m8 already in A? No, m0 is row 00.
- m0, m2 (row 00, cols 00+10) → $\bar{A}\bar{B}\bar{C}$? Wait, those are cols 00 and 10.
  - m0: 0000, m2: 0010. Both have A=0, B=0, D=0. Term: $\bar{A}\bar{B}\bar{D}$
  
- m5: row 01, col 01. Can pair with m7 (covered), or m13(X).
  - m5, m7: $\bar{A}BD$
  - m5, m13: $B\bar{C}D$

Let me try for bigger groups:
- m0, m2, m8, m10: corner group → $\bar{B}\bar{D}$

**Groups**:
- G1: m0, m2, m8, m10(X) → $\bar{B}\bar{D}$ (covers m0, m2, m8)
- G2: m2, m3, m6, m7 → 2×2 → $\bar{A}C$ (covers m2, m3, m6, m7)
- G3: m5, m7, m13(X), m15(X) → $BD$ (covers m5, m7)
- G4: m8, m9, m12(X), m13(X) → $A\bar{C}$ (covers m8, m9)

Check coverage:
- m0: G1 ✓
- m2: G1, G2 ✓
- m3: G2 ✓
- m5: G3 ✓
- m6: G2 ✓
- m7: G2, G3 ✓
- m8: G1, G4 ✓
- m9: G4 ✓

**Result**: F = $\bar{B}\bar{D} + \bar{A}C + BD + A\bar{C}$

---

### Example 3: Quick BCD

**Problem**: F = 1 for BCD digits 1, 4

$$F = \Sigma m(1,4) + \Sigma d(10,11,12,13,14,15)$$

**K-Map**:
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  0 │  1 │  0 │  0 │
AB 01│  1 │  0 │  0 │  0 │
 11 │  X │  X │  X │  X │
 10 │  0 │  0 │  X │  X │
    └────┴────┴────┴────┘
```

- m1: can extend to m1, m3(=0)? No. m1, m9(=0)? No. m1, m5(=0)? No.
- m1 alone? m1 with X's: m1, m9(0!)... m9 is 0, not X.

m1 is isolated among 1s. With don't cares:
- m1 is at (00, 01)
- Can it reach any X? Adjacents: m0, m3, m5, m9 - all 0!

m4 is at (01, 00). Adjacents: m0(0), m5(0), m6(0), m12(X)

m4 + m12(X) → rows 01+11, col 00 → need 2 more. m0(0), m8(0). Can't.

Actually m4, m12 alone: $B\bar{C}\bar{D}$

**Groups**:
- m1 alone: $\bar{A}\bar{B}\bar{C}D$
- m4, m12(X): $B\bar{C}\bar{D}$

**Result**: F = $\bar{A}\bar{B}\bar{C}D + B\bar{C}\bar{D}$

---

## Exam Tips

1. **Always write both notations**: $F = \Sigma m(...) + \Sigma d(...)$

2. **BCD = 6 don't cares**: 1010, 1011, 1100, 1101, 1110, 1111

3. **X's are optional**: Don't force them into groups

4. **Verify coverage**: Only required 1s must be covered

5. **Try different X assignments**: Sometimes the optimal isn't obvious
