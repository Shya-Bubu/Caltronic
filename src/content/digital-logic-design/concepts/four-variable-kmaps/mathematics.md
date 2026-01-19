# Four Variable K-Maps - Mathematical Framework

## Structure Analysis

### Boolean Space

A 4-variable K-map represents the Boolean function space:
$$F: B^4 \rightarrow B$$

where $B = \{0, 1\}$.

### Minterm Correspondence

Minterm $m_i$ corresponds to the input pattern:
$$m_i = A^{i_3} B^{i_2} C^{i_1} D^{i_0}$$

where $i = 8i_3 + 4i_2 + 2i_1 + i_0$ and $X^1 = X$, $X^0 = \bar{X}$.

---

## Adjacency Mathematics

### Hamming Distance

Two cells $m_i$ and $m_j$ are adjacent iff:
$$H(i, j) = 1$$

where H is the Hamming distance (number of bit positions that differ).

### Adjacency Set

For cell $m_i$, the adjacent cells are:
$$\text{Adj}(m_i) = \{m_j : H(i,j) = 1\}$$

In a 4-variable map, each cell has exactly 4 neighbors.

---

## Group Mathematics

### Valid Group Criterion

A set of cells $G$ forms a valid group iff:
1. $|G| = 2^k$ for some $k \geq 0$
2. G forms a "subcube" of the Boolean hypercube

### Subcube Definition

A subcube is defined by fixing $(n-k)$ variables and allowing $k$ variables to take both values.

### Term Extraction

For a valid group G:
$$\text{Term}(G) = \prod_{x_i \text{ fixed}} x_i^{v_i}$$

where $v_i$ is the fixed value of $x_i$ in G.

---

## Prime Implicants

### Definition

A prime implicant is an implicant that:
1. Cannot be combined with another implicant to form a larger one
2. Corresponds to a maximal group in the K-map

### Counting Prime Implicants

For a 4-variable function, the number of prime implicants depends on the function structure but is bounded:
$$1 \leq |PI| \leq 16$$

### Essential Prime Implicants

A prime implicant P is **essential** if:
$$\exists m_i \in F: m_i \text{ is covered only by } P$$

---

## Covering Problem

### Definition

Given:
- Set of minterms M to cover
- Set of prime implicants PI

Find: Minimum subset $S \subseteq PI$ such that:
$$\bigcup_{P \in S} \text{Cover}(P) \supseteq M$$

### Solution Method

1. Include all essential prime implicants
2. For remaining minterms, select minimum additional PIs
3. This is an instance of the Set Cover problem (NP-complete in general, but tractable for small K-maps)

---

## Example: Complete Analysis

**Function**: F(A,B,C,D) = Σm(0, 2, 5, 7, 8, 10, 13, 15)

### K-Map
```
         CD
       00  01  11  10
    ┌────┬────┬────┬────┐
 00 │  1 │  0 │  0 │  1 │
    ├────┼────┼────┼────┤
AB 01│  0 │  1 │  1 │  0 │
    ├────┼────┼────┼────┤
 11 │  0 │  1 │  1 │  0 │
    ├────┼────┼────┼────┤
 10 │  1 │  0 │  0 │  1 │
    └────┴────┴────┴────┘
```

### Prime Implicant Analysis

**P1**: m0, m2, m8, m10 (four corners)
- Wrap-around group
- B=0, D=0 in all cells
- Term: $\bar{B}\bar{D}$

**P2**: m5, m7, m13, m15 (center 2×2)
- B=1, D=1
- Term: $BD$

### Verification

$\bar{B}\bar{D}$ covers: 
- m0 (0000): ✓
- m2 (0010): ✓
- m8 (1000): ✓
- m10 (1010): ✓

$BD$ covers:
- m5 (0101): ✓
- m7 (0111): ✓
- m13 (1101): ✓
- m15 (1111): ✓

All 8 minterms covered by exactly 2 prime implicants.

### Result

$$F = \bar{B}\bar{D} + BD$$

This is recognizable as: $F = B \odot D$ (XNOR of B and D)!

---

## Group Size Formulas

| Group Size | # Variables Fixed | # Variables Free | Term Literals |
|------------|-------------------|------------------|---------------|
| 1 | 4 | 0 | 4 |
| 2 | 3 | 1 | 3 |
| 4 | 2 | 2 | 2 |
| 8 | 1 | 3 | 1 |
| 16 | 0 | 4 | 0 (=1) |

---

## Complexity Analysis

### Manual K-Map

Time complexity: $O(2^n)$ for visual inspection (practical for $n \leq 5$)

### Optimal Cover

Finding minimum cover is NP-complete, but:
- For 4 variables (16 cells): tractable by inspection
- For 5-6 variables: still manageable with care
- Beyond: use algorithmic methods (Quine-McCluskey, Espresso)

---

## Summary

| Concept | Formula/Rule |
|---------|--------------|
| Cells | $2^4 = 16$ |
| Adjacency | Hamming distance = 1 |
| Valid groups | $2^k$ cells forming subcube |
| Term from group | Fixed variables only |
| Minimal SOP | Essential PIs + minimum cover |
