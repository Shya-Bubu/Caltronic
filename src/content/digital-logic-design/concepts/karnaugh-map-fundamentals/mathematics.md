# Karnaugh Map Fundamentals - Mathematical Framework

## Theoretical Foundation

The K-map is a visual representation of Boolean function truth tables that exploits the **adjacency theorem** for systematic minimization.

---

## The Adjacency Theorem

For any Boolean variable X:
$$XY + \bar{X}Y = Y$$

The variable X is eliminated when both its complemented and uncomplemented forms appear with identical remaining terms.

### Generalization

Two minterms that differ in exactly one variable can be combined:
$$m_i + m_j = \text{(product term with one fewer variable)}$$

if and only if $m_i$ and $m_j$ differ in exactly one bit position.

---

## Gray Code Mathematics

### Definition

Gray code is a binary numeral system where consecutive values differ by exactly one bit.

### Generation Formula

For n-bit Gray code, the i-th value is:
$$G_i = i \oplus (i >> 1)$$

where $\oplus$ is XOR and $>>$ is right shift.

### Property

If G(i) and G(i+1) are consecutive Gray codes:
$$\text{Hamming distance}(G(i), G(i+1)) = 1$$

---

## K-Map as Boolean Hypercube

### Hypercube Representation

An n-variable Boolean function can be represented on an n-dimensional hypercube:
- Each vertex = one minterm
- Adjacent vertices = minterms differing by one variable

### K-Map Projection

The K-map is a 2D projection of this hypercube that preserves adjacency (with wrap-around).

For 4 variables (4D hypercube):
- Projected onto 4×4 grid
- Horizontal neighbors: differ by one bit
- Vertical neighbors: differ by one bit
- Wrap-around: preserves opposite edge adjacency

---

## Implicant Theory

### Definitions

**Minterm**: Product term with all n variables (each appears once)
$$m_i = x_1^{a_1} x_2^{a_2} ... x_n^{a_n}$$

**Implicant**: Any product term that implies the function
$$P \rightarrow F \text{ (wherever P=1, F=1)}$$

**Prime Implicant**: An implicant that cannot be combined with another to form a larger implicant

**Essential Prime Implicant**: A prime implicant that covers at least one minterm not covered by any other prime implicant

---

## Minimization Theorem

**Theorem**: The minimal SOP expression consists of:
1. All essential prime implicants
2. Sufficient additional prime implicants to cover remaining minterms

### Procedure

1. Find all prime implicants (largest possible groups)
2. Identify essential prime implicants (unique coverage)
3. Select minimum additional prime implicants for complete coverage

---

## Group Size Mathematics

A group of $2^k$ adjacent cells in a K-map corresponds to a product term with $(n-k)$ variables.

| K-map Cells | Group Size | Variables in Term |
|-------------|------------|-------------------|
| n | 1 | n |
| n | 2 | n-1 |
| n | 4 | n-2 |
| n | 8 | n-3 |
| n | $2^n$ | 0 (constant 1) |

---

## Reading Groups Formally

For a group covering cells where:
- Variable $x_i$ is always 1: include $x_i$ in term
- Variable $x_i$ is always 0: include $\bar{x_i}$ in term
- Variable $x_i$ takes both values: omit from term

### Example

Group covering minterms {5, 7, 13, 15} in 4-variable map:

| Cell | A | B | C | D |
|------|---|---|---|---|
| 5 | 0 | 1 | 0 | 1 |
| 7 | 0 | 1 | 1 | 1 |
| 13 | 1 | 1 | 0 | 1 |
| 15 | 1 | 1 | 1 | 1 |

Analysis:
- A: varies (0,0,1,1) → eliminated
- B: constant 1 → include B
- C: varies (0,1,0,1) → eliminated
- D: constant 1 → include D

Result: **BD**

---

## Completeness and Correctness

### Completeness
The K-map representation is complete: every Boolean function of n variables can be uniquely represented.

### Correctness
K-map minimization is guaranteed correct:
- All 1s are covered (function is preserved)
- Grouping produces valid implicants (adjacency theorem)
- Minimal groups yield minimal expressions (no redundant variables)

---

## Relationship to Quine-McCluskey

The K-map is equivalent to the Quine-McCluskey algorithm for small n:
1. Both find all prime implicants
2. Both identify essential prime implicants
3. Both solve the covering problem

K-map advantage: Visual, fast for n ≤ 5
Q-M advantage: Algorithmic, scalable, computer-implementable

---

## Summary of Key Theorems

| Theorem | Statement |
|---------|-----------|
| Adjacency | $XY + \bar{X}Y = Y$ |
| Gray code | Adjacent codes differ by one bit |
| Group size | $2^k$ cells → eliminate k variables |
| Minimality | Prime implicants + covering = minimal |
