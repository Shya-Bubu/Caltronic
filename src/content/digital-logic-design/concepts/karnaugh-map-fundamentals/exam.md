# Karnaugh Map Fundamentals - Exam Preparation

## Key Definitions

| Term | Definition |
|------|------------|
| **K-map** | Visual tool for Boolean minimization |
| **Gray code** | Binary sequence where adjacent values differ by 1 bit |
| **Adjacency** | Two cells that differ by exactly one variable |
| **Minterm** | Product term with all variables |
| **Implicant** | Product term that implies the function |

---

## Essential K-Map Templates

### 2-Variable
```
      B
    0   1
  ┌───┬───┐
A 0│m0 │m1 │
  ├───┼───┤
 1│m2 │m3 │
  └───┴───┘
```

### 3-Variable
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│ m0 │ m1 │ m3 │ m2 │
   ├────┼────┼────┼────┤
  1│ m4 │ m5 │ m7 │ m6 │
   └────┴────┴────┴────┘
```

### 4-Variable
```
        CD
      00  01  11  10
   ┌────┬────┬────┬────┐
00 │ m0 │ m1 │ m3 │ m2 │
   ├────┼────┼────┼────┤
01 │ m4 │ m5 │ m7 │ m6 │
AB ├────┼────┼────┼────┤
11 │m12 │m13 │m15 │m14 │
   ├────┼────┼────┼────┤
10 │ m8 │ m9 │m11 │m10 │
   └────┴────┴────┴────┘
```

---

## Worked Examples

### Example 1: Fill K-Map from Minterm List

**Problem**: Draw K-map for F(A,B,C) = Σm(1, 2, 5, 6, 7)

**Solution**:
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  0 │  1 │  0 │  1 │  (m0=0, m1=1, m3=0, m2=1)
   ├────┼────┼────┼────┤
  1│  0 │  1 │  1 │  1 │  (m4=0, m5=1, m7=1, m6=1)
   └────┴────┴────┴────┘
```

---

### Example 2: Identify Adjacent Cells

**Problem**: Which cells are adjacent to m5 in a 4-variable K-map?

**Solution**:

m5 is at position AB=01, CD=01

Adjacent cells (differ by one variable):
- m1 (AB=00, CD=01) — A changes
- m4 (AB=01, CD=00) — D changes
- m7 (AB=01, CD=11) — C changes
- m13 (AB=11, CD=01) — B changes

**Answer**: m1, m4, m7, m13

---

### Example 3: Convert Expression to K-Map

**Problem**: Draw K-map for F = AB + BC

**Solution**:

Expand to minterms:
- AB covers: m6(110), m7(111) for 3 variables
- BC covers: m3(011), m7(111)

```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  0 │  0 │  1 │  0 │
   ├────┼────┼────┼────┤
  1│  0 │  0 │  1 │  1 │
   └────┴────┴────┴────┘
```

---

### Example 4: Gray Code Sequence

**Problem**: List 4-bit Gray code from 0 to 15

**Solution**:
```
0: 0000    4: 0110    8: 1100   12: 1010
1: 0001    5: 0111    9: 1101   13: 1011
2: 0011    6: 0101   10: 1111   14: 1001
3: 0010    7: 0100   11: 1110   15: 1000
```

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Using binary order instead of Gray code | Column/row order: 00, 01, 11, 10 |
| Forgetting wrap-around adjacency | Left-right and top-bottom edges ARE adjacent |
| Placing minterms in wrong cells | Verify: m5 = ABC = 101 goes in row A=1, column BC=01 |
| Groups of 3, 5, 6, etc. | Only powers of 2 allowed: 1, 2, 4, 8... |

---

## Quick Reference

### Gray Code Order (memorize!)
- 2-bit: 00, 01, 11, 10
- Row labels (4-var): 00, 01, 11, 10
- Column labels (4-var): 00, 01, 11, 10

### Adjacency Rule
Adjacent cells share an edge (including wrap-around). Diagonal cells are NOT adjacent.

### Minterm to Cell
For minterm m_i:
1. Convert i to binary
2. First half of bits → row (in Gray code position)
3. Second half → column (in Gray code position)

---

## Exam Checklist

- [ ] Labels use Gray code: 00, 01, 11, 10
- [ ] Minterms placed in correct cells
- [ ] Recognize all adjacencies (including wrap-around)
- [ ] Understand that adjacency = one variable difference
- [ ] Can convert between truth table, minterm list, and K-map
