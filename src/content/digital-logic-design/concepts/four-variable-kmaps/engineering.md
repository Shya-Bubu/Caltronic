# Four Variable K-Maps - Engineering Perspective

## Professional Application

The 4-variable K-map is the standard for manual optimization of moderately complex combinational logic.

---

## Standard Template

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

Minterm i is at row $\lfloor i/4 \rfloor$ (Gray coded), column $i \mod 4$ (Gray coded).

---

## All Standard Groups

### Groups of 16 (F = 1)
- Entire map

### Groups of 8
- Top two rows: $\bar{A}$
- Bottom two rows: $A$
- Left two columns: $\bar{D}$
- Right two columns: $D$
- Middle two rows (01, 11): $B$
- Middle two columns (01, 11): $C$

### Groups of 4

**Rows**:
- Row 00: $\bar{A}\bar{B}$
- Row 01: $\bar{A}B$
- Row 11: $AB$
- Row 10: $A\bar{B}$

**Columns**:
- Column 00: $\bar{C}\bar{D}$
- Column 01: $\bar{C}D$
- Column 11: $CD$
- Column 10: $C\bar{D}$

**2×2 Squares** (many possibilities):
- Corners: $\bar{B}\bar{D}$
- Top-left 2×2: $\bar{A}\bar{C}$
- Center 2×2: $BC$
- etc.

### Groups of 2
Any two horizontally or vertically adjacent cells (including wrap-around).

---

## Complete Worked Example

**Problem**: F(A,B,C,D) = Σm(1, 3, 4, 5, 9, 11, 12, 13, 14, 15)

### Step 1: Fill K-Map

```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  0 │  1 │  1 │  0 │
    ├────┼────┼────┼────┤
AB 01│  1 │  1 │  0 │  0 │
    ├────┼────┼────┼────┤
 11 │  1 │  1 │  1 │  1 │
    ├────┼────┼────┼────┤
 10 │  0 │  1 │  1 │  0 │
    └────┴────┴────┴────┘
```

### Step 2: Find Prime Implicants

**P1**: m12, m13, m14, m15 (row AB=11, all 4 cells)
- Full row → AB

**P2**: m1, m3, m9, m11 (column CD=01 and CD=11, rows 00 and 10)
- Wait, let me re-examine. These are in different rows.
- m1: row 00, col 01
- m3: row 00, col 11
- m9: row 10, col 01
- m11: row 10, col 11
- This is a 2×2 square using wrap-around (rows 00,10 adjacent!)
- A varies, B=0, C varies, D=1
- Term: $\bar{B}D$

**P3**: m4, m5, m12, m13 (rows 01 and 11, columns 00 and 01)
- A varies, B=1, C=0, D varies
- Term: $B\bar{C}$

**P4**: m3, m7? Wait, m7=0.

Let me recheck which cells are 1:
1, 3, 4, 5, 9, 11, 12, 13, 14, 15

m1, m3: row 00, cols 01 and 11
m4, m5: row 01, cols 00 and 01
m9, m11: row 10, cols 01 and 11
m12, m13, m14, m15: row 11, all

**P2 revised**: m1, m3, m9, m11
- Rows 00 and 10 (wrap-around), columns 01 and 11
- B=0 (rows 00 and 10 both have B=0)
- D=1 (columns 01 and 11 both have D=1)
- A varies, C varies
- Term: $\bar{B}D$

Hmm wait, column 11 has C=1 and D=1. Column 01 has C=0 and D=1.
So D=1 always, C varies. Correct: $\bar{B}D$

### Step 3: Check Coverage

- m1: P2 ✓
- m3: P2 ✓
- m4: P3 ✓
- m5: P3 ✓
- m9: P2 ✓
- m11: P2 ✓
- m12: P1 ✓, P3 ✓
- m13: P1 ✓, P3 ✓
- m14: P1 ✓
- m15: P1 ✓

All covered!

### Step 4: Check for Essential/Redundant

- P1 is essential (only covers m14, m15 uniquely)
- P2 is essential (only covers m1, m3, m9, m11)
- P3 is essential (only covers m4, m5)

No redundancy.

### Result

**F = AB + $\bar{B}D$ + B$\bar{C}$**

---

## Adjacency Reference

Cell m[i] is adjacent to:
- m[(i+1) mod 16] if same row, adjacent column (Gray code)
- m[(i+4) mod 16] if same column, adjacent row (Gray code)

Plus wrap-around considerations.

---

## Systematic Procedure

1. **Plot all 1s** on the K-map
2. **Find all prime implicants**:
   - Start with groups of 8, then 4, then 2, then 1
   - Don't miss wrap-arounds!
3. **Identify essential prime implicants**:
   - Which 1s are covered by only one prime implicant?
4. **Select minimal cover**:
   - Essential PIs + minimum additional PIs to cover all 1s
5. **Write expression**: OR of selected prime implicants

---

## Common Exam Patterns

### Checkerboard Pattern
Often indicates XOR functions.

### Symmetric Patterns
May simplify to complement relationships.

### Sparse 1s
Each needs explicit coverage—watch for essential PIs.

### Dense 1s
Consider POS (grouping 0s) instead of SOP.
