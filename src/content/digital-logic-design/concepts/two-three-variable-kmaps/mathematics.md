# Two and Three Variable K-Maps - Mathematical Framework

## Formal Group Analysis

### 2-Variable Map Structure

The 2-variable K-map represents the Boolean space $B^2 = \{0,1\}^2$.

Minterm mapping:
$$m_i(A,B) = A^{i_1} \cdot B^{i_0}$$

where $i = 2i_1 + i_0$ and $X^1 = X$, $X^0 = \bar{X}$.

| i | Binary | Minterm |
|---|--------|---------|
| 0 | 00 | $\bar{A}\bar{B}$ |
| 1 | 01 | $\bar{A}B$ |
| 2 | 10 | $A\bar{B}$ |
| 3 | 11 | $AB$ |

---

## 3-Variable Map Structure

The 3-variable K-map represents $B^3$ with minterm mapping:
$$m_i(A,B,C) = A^{i_2} \cdot B^{i_1} \cdot C^{i_0}$$

where $i = 4i_2 + 2i_1 + i_0$.

### Cell Position Formula

For minterm $m_i$:
- Row: $A = i_2$
- Column: $BC = \text{Gray}(i_1 i_0)$

where Gray(x) converts binary to Gray code.

---

## Grouping Theory

### Implicant Definition

An **implicant** of function F is a product term P such that:
$$P = 1 \implies F = 1$$

### Prime Implicant

A **prime implicant** is an implicant that cannot be combined with another to form a larger (simpler) implicant.

### K-Map Correspondence

- Each valid group corresponds to an implicant
- Largest valid groups are prime implicants
- Essential prime implicants cover minterms uniquely

---

## Group Mathematics

### General Formula

For a group of $2^k$ cells in an n-variable map:
- Number of variables in resulting term: $n - k$
- Each eliminated variable changes value within the group
- Each kept variable remains constant across all cells

### 2-Variable Examples

Group {0, 2} (column B=0):
- Cells: $\bar{A}\bar{B}$ and $A\bar{B}$
- Apply adjacency: $\bar{A}\bar{B} + A\bar{B} = \bar{B}(\bar{A} + A) = \bar{B}$

Group {1, 3} (column B=1):
- Cells: $\bar{A}B$ and $AB$
- Apply adjacency: $\bar{A}B + AB = B(\bar{A} + A) = B$

---

## Minimization Algorithm

### Input
Boolean function F expressed as sum of minterms: $F = \sum m(i_1, i_2, ..., i_k)$

### Algorithm

1. **Construct K-map**: Place 1 in cells $m_{i_j}$ for all j
2. **Find prime implicants**: 
   - Identify all maximal groups of adjacent 1s
   - Each group must be $2^k$ cells
3. **Find essential prime implicants**:
   - Mark minterms covered by only one prime implicant
   - Those prime implicants are essential
4. **Cover remaining minterms**:
   - Choose minimum additional prime implicants
5. **Output**: OR of selected prime implicants

---

## Wrap-Around Proof (3-Variable)

### Claim
Columns 00 and 10 are adjacent.

### Proof
Column 00: BC = 00
Column 10: BC = 10

Difference in B: 0 vs 1 → B changes
Difference in C: 0 vs 0 → C unchanged

The cells differ by exactly one variable (B), satisfying adjacency.

Algebraically: $m_0 = \bar{A}\bar{B}\bar{C}$ and $m_2 = \bar{A}B\bar{C}$
$$m_0 + m_2 = \bar{A}\bar{C}(\bar{B} + B) = \bar{A}\bar{C}$$

This is the valid simplification from grouping these cells. ∎

---

## Completeness of K-Map Minimization

### Theorem
K-map minimization finds a minimal SOP expression.

### Proof Sketch
1. All prime implicants are identifiable as maximal groups
2. Essential prime implicants are necessary (unique coverage)
3. The covering problem for remaining minterms is solved optimally by selecting fewest additional groups
4. Result is sum of products with minimum terms

---

## Example: Full Analysis

**Function**: $F(A,B,C) = \sum m(1, 3, 5, 7)$

### K-Map
```
       BC
     00  01  11  10
   ┌────┬────┬────┬────┐
A 0│  0 │  1 │  1 │  0 │
   ├────┼────┼────┼────┤
  1│  0 │  1 │  1 │  0 │
   └────┴────┴────┴────┘
```

### Prime Implicants

Only one maximal group: All four 1s (m1, m3, m5, m7)
- Columns 01 and 11
- Both have C=1

### Result
$$F = C$$

### Verification
$m_1 = \bar{A}\bar{B}C$, $m_3 = \bar{A}BC$, $m_5 = A\bar{B}C$, $m_7 = ABC$

Sum: $\bar{A}\bar{B}C + \bar{A}BC + A\bar{B}C + ABC$
$= \bar{A}C(\bar{B} + B) + AC(\bar{B} + B)$
$= \bar{A}C + AC$
$= C(\bar{A} + A)$
$= C$ ✓

---

## Summary of Formulas

| Quantity | Formula |
|----------|---------|
| Minterms in n-var | $2^n$ |
| Group size | $2^k$ for $k \in \{0, 1, ..., n\}$ |
| Variables in term | $n - k$ for group of $2^k$ |
| Gray code | $G(i) = i \oplus (i >> 1)$ |
