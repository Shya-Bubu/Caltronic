# Karnaugh Map Fundamentals - Engineering Perspective

## Professional Application

K-maps are the standard tool for quick manual optimization of Boolean functions up to 5-6 variables. Understanding their structure is essential for digital design.

---

## K-Map Construction

### Step 1: Determine Size

| Variables | Map Dimensions | Total Cells |
|-----------|----------------|-------------|
| 2 | 2×2 | 4 |
| 3 | 2×4 or 4×2 | 8 |
| 4 | 4×4 | 16 |
| 5 | Two 4×4 maps | 32 |

### Step 2: Label with Gray Code

Gray code sequence: 00, 01, 11, 10

For 3 variables (rows = A, columns = BC):
```
        BC
       00  01  11  10
    ┌────┬────┬────┬────┐
A 0 │ m0 │ m1 │ m3 │ m2 │
    ├────┼────┼────┼────┤
  1 │ m4 │ m5 │ m7 │ m6 │
    └────┴────┴────┴────┘
```

For 4 variables (rows = AB, columns = CD):
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │ m0 │ m1 │ m3 │ m2 │
    ├────┼────┼────┼────┤
AB 01│ m4 │ m5 │ m7 │ m6 │
    ├────┼────┼────┼────┤
 11 │m12 │m13 │m15 │m14 │
    ├────┼────┼────┼────┤
 10 │ m8 │ m9 │m11 │m10 │
    └────┴────┴────┴────┘
```

### Step 3: Transfer Truth Table Values

Place 1s, 0s, or don't cares (X) in corresponding cells.

---

## Gray Code Deep Dive

### Why Gray Code?

Binary counting: 01 → 10 (TWO bits change)
Gray code: 01 → 11 (ONE bit changes)

K-map adjacency requires single-bit changes for the simplification theorem to apply.

### Gray Code Generation

```
1-bit: 0, 1
2-bit: 00, 01, 11, 10
3-bit: 000, 001, 011, 010, 110, 111, 101, 100
```

Pattern: Reflect and prefix with 0, then 1.

---

## Minterm Numbering

Each cell corresponds to a minterm number (decimal equivalent of input):

| A | B | C | D | Minterm | Cell Position |
|---|---|---|---|---------|---------------|
| 0 | 0 | 0 | 0 | m₀ | Top-left |
| 0 | 0 | 0 | 1 | m₁ | Row 00, Col 01 |
| 0 | 0 | 1 | 1 | m₃ | Row 00, Col 11 |
| ... | ... | ... | ... | ... | ... |

---

## Adjacency Map

### 4-Variable K-Map Adjacencies

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

**Cell 0 is adjacent to**: 1, 2, 4, 8 (wrap around!)
**Cell 5 is adjacent to**: 1, 4, 7, 13
**Cell 15 is adjacent to**: 7, 11, 13, 14

---

## Standard K-Map Templates

### 2-Variable
```
      B
    0   1
  ┌───┬───┐
A 0│   │   │
  ├───┼───┤
 1│   │   │
  └───┴───┘
```

### 3-Variable
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│    │    │    │    │
   ├────┼────┼────┼────┤
  1│    │    │    │    │
   └────┴────┴────┴────┘
```

### 4-Variable
```
        CD
      00  01  11  10
   ┌────┬────┬────┬────┐
00 │    │    │    │    │
   ├────┼────┼────┼────┤
01 │    │    │    │    │
AB ├────┼────┼────┼────┤
11 │    │    │    │    │
   ├────┼────┼────┼────┤
10 │    │    │    │    │
   └────┴────┴────┴────┘
```

---

## Canonical Forms

### Sum of Products (SOP)

Express function as OR of minterms:
$$F = \sum m(i, j, k, ...) = m_i + m_j + m_k + ...$$

Example: F = Σm(1, 3, 5, 7) = $\bar{A}\bar{B}C + \bar{A}BC + A\bar{B}C + ABC$

### Product of Sums (POS)

Express function as AND of maxterms:
$$F = \prod M(i, j, k, ...) = M_i \cdot M_j \cdot M_k \cdot ...$$

Example: F = ΠM(0, 2, 4, 6) = $(A+B+C)(A+B+\bar{C})(A+\bar{B}+C)(A+\bar{B}+\bar{C})$

---

## K-Map Entry Methods

### From Truth Table
1. Read each row
2. Place output value in corresponding cell

### From Minterm List
1. F = Σm(1, 3, 5, 7)
2. Place 1 in cells m₁, m₃, m₅, m₇
3. Place 0 in all other cells

### From Maxterm List
1. F = ΠM(0, 2, 4, 6)
2. Place 0 in cells M₀, M₂, M₄, M₆
3. Place 1 in all other cells

---

## Summary

| Element | Purpose |
|---------|---------|
| Gray code ordering | Ensures single-variable change between adjacent cells |
| Cell numbering | Maps directly to minterm indices |
| Adjacency | Horizontal, vertical, AND wrap-around |
| Entry values | 1 (true), 0 (false), X (don't care) |
