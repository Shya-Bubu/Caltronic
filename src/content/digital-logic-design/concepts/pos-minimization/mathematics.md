# POS Minimization - Mathematical Framework

## Canonical Forms

### Sum of Products (SOP)

$$F = \sum_{i \in ON} m_i = \bigvee_{i \in ON} m_i$$

where ON is the set of minterms where F = 1.

### Product of Sums (POS)

$$F = \prod_{i \in OFF} M_i = \bigwedge_{i \in OFF} M_i$$

where OFF is the set of minterms where F = 0.

---

## Minterm-Maxterm Relationship

### Complementary Relationship

For n variables, minterm $m_i$ and maxterm $M_i$ are related:

$$m_i = \overline{M_i}$$
$$M_i = \overline{m_i}$$

### Orthogonality

$$m_i \cdot M_i = 0$$

A minterm and its corresponding maxterm cannot both be 1.

### Index Relationship

If minterm uses variable X when bit is 1 and $\bar{X}$ when 0:
Maxterm uses $\bar{X}$ when bit is 1 and X when bit is 0.

---

## Duality in Minimization

### SOP Minimization

Given F with ON-set:
1. Find prime implicants (maximal groups of 1s)
2. Cover all minterms in ON-set
3. Result: minimal SOP

### POS Minimization

Given F with OFF-set:
1. Find prime implicates (maximal groups of 0s)
2. Cover all maxterms in OFF-set
3. Result: minimal POS

### Prime Implicate Definition

A **prime implicate** is a maximal group of 0s in the K-map (dual of prime implicant).

---

## Formal Extraction Rules

### From Group of 0s to Maxterm

Let G be a valid group of 0s in a K-map.

For each variable $x_i$:
- If $x_i = 0$ for all cells in G: include $x_i$ (uncomplemented)
- If $x_i = 1$ for all cells in G: include $\bar{x_i}$ (complemented)
- If $x_i$ varies in G: exclude from maxterm

### Mathematical Justification

For a group G of 0s, we want a sum term that equals 0 for exactly those cells.

If $x_i = 0$ constantly in G, then $x_i$ is 0 throughout G, so including $x_i$ in the sum keeps the sum = 0 for G.

If $x_i = 1$ constantly in G, we need $\bar{x_i} = 0$, so include $\bar{x_i}$.

---

## Equivalence Proof

### Claim
$F_{SOP} = F_{POS}$ for the same function F.

### Proof Sketch

Let ON-set = {i : F(i) = 1} and OFF-set = {i : F(i) = 0}.

$F_{SOP} = \bigvee_{i \in ON} m_i$

$F_{POS} = \bigwedge_{j \in OFF} M_j$

For any input x:
- If x ∈ ON: $m_x = 1$ so $F_{SOP} = 1$. Also, x ∉ OFF so all $M_j(x) = 1$, thus $F_{POS} = 1$.
- If x ∈ OFF: All $m_i(x) = 0$ so $F_{SOP} = 0$. Also, $M_x(x) = 0$ so $F_{POS} = 0$.

Therefore $F_{SOP} = F_{POS}$. ∎

---

## Optimization Duality

### SOP Optimization
Minimize: $\sum |P_i|$ where $P_i$ are product terms

### POS Optimization  
Minimize: $\sum |S_j|$ where $S_j$ are sum terms

### Choosing Between Them

Let $|ON|$ = number of 1s, $|OFF|$ = number of 0s.

- If $|ON| < |OFF|$: SOP likely simpler
- If $|OFF| < |ON|$: POS likely simpler
- If $|ON| \approx |OFF|$: compute both

---

## Example: Complete Analysis

**Function**: $F(A,B,C) = \sum m(0, 1, 6, 7)$

### Sets
- ON = {0, 1, 6, 7}
- OFF = {2, 3, 4, 5}

|ON| = 4, |OFF| = 4 (equal—try both)

### K-Map
```
      C
    0   1
  ┌───┬───┐
0 │ 1 │ 1 │   m0, m1
AB ├───┼───┤
1 │ 0 │ 0 │   m2, m3
  ├───┼───┤
11│ 1 │ 1 │   m6, m7
  ├───┼───┤
10│ 0 │ 0 │   m4, m5
  └───┴───┘
```

### SOP (grouping 1s)
- G1: m0, m1 → $\bar{A}\bar{B}$
- G2: m6, m7 → $AB$

$F_{SOP} = \bar{A}\bar{B} + AB$

### POS (grouping 0s)
- G1: m2, m3 → (A + B̄)?

Let me recalculate:
- m2 (010): A=0, B=1, C=0
- m3 (011): A=0, B=1, C=1

A=0 constant → include A (uncomplemented)
B=1 constant → include $\bar{B}$ (complemented)
C varies → exclude

Maxterm: $(A + \bar{B})$

- G2: m4, m5
- m4 (100): A=1, B=0, C=0
- m5 (101): A=1, B=0, C=1

A=1 → include $\bar{A}$
B=0 → include B
C varies → exclude

Maxterm: $(\bar{A} + B)$

$F_{POS} = (A + \bar{B})(\bar{A} + B)$

### Verification

$(A + \bar{B})(\bar{A} + B) = A\bar{A} + AB + \bar{A}\bar{B} + \bar{B}B = AB + \bar{A}\bar{B}$

So $F_{POS} = F_{SOP}$ ✓

**Observation**: This is actually $A \odot B$ (XNOR)!

---

## Incompletely Specified Functions (POS)

For function with don't cares:

$$F = \prod_{i \in OFF} M_i$$

Don't cares can be treated as 0 (included in groups) when it helps.

**Rule**: In POS, treat X as 0 to enlarge groups of 0s.

---

## Summary Table

| Concept | SOP | POS |
|---------|-----|-----|
| Group | 1s | 0s |
| Basic unit | Minterm | Maxterm |
| Operation between terms | OR | AND |
| Operation within term | AND | OR |
| Variable at 1 | Uncomplemented | Complemented |
| Variable at 0 | Complemented | Uncomplemented |
| Notation | Σm(...) | ΠM(...) |
| Don't care usage | Treat as 1 | Treat as 0 |
