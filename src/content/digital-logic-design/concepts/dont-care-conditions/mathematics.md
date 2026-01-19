# Don't Care Conditions - Mathematical Framework

## Incompletely Specified Functions

### Definition

An **incompletely specified Boolean function** is defined by three disjoint sets:

$$F: \{0,1\}^n \rightarrow \{0, 1, X\}$$

Where:
- **ON-set**: Minterms where F = 1 (required outputs)
- **OFF-set**: Minterms where F = 0 (forbidden outputs)
- **DC-set**: Minterms where F = X (don't care)

$$\text{ON-set} \cup \text{OFF-set} \cup \text{DC-set} = \{0, 1, ..., 2^n - 1\}$$

### Canonical Notation

$$F = \Sigma m(\text{ON-set}) + \Sigma d(\text{DC-set})$$

Example: $F = \Sigma m(1,3,5) + \Sigma d(7,9)$

---

## Realization Classes

### Definition

A **realization** of an incompletely specified function F is any completely specified function G such that:
- G(x) = 1 for all x ∈ ON-set
- G(x) = 0 for all x ∈ OFF-set
- G(x) ∈ {0, 1} for all x ∈ DC-set

### Number of Realizations

If |DC-set| = k, then there are $2^k$ possible realizations.

### Optimal Realization

The **optimal realization** minimizes cost (gate count, literal count, etc.) while satisfying the constraints.

---

## K-Map Optimization with Don't Cares

### Modified Covering Problem

**Given**:
- ON-set M (must be covered)
- DC-set D (may be covered)
- Set of prime implicants PI

**Find**: Minimum subset S ⊆ PI such that:
$$M \subseteq \bigcup_{P \in S} \text{Cover}(P)$$

Note: Unlike fully specified functions, we don't need to cover D.

### Prime Implicant Generation

A prime implicant for an incompletely specified function:
1. Covers only minterms from ON-set ∪ DC-set
2. Cannot be expanded (would include OFF-set minterms)

### Essential Prime Implicant (Modified)

A prime implicant P is essential iff:
$$\exists m \in \text{ON-set}: m \text{ is covered only by } P$$

Note: Minterms in DC-set cannot make a PI essential!

---

## Formal Algorithm

### Step 1: Find All Prime Implicants

Consider the function $F' = \Sigma m(\text{ON-set} \cup \text{DC-set})$

Find all PIs of F'.

### Step 2: Identify Essential PIs

For each ON-set minterm, check if it's covered by exactly one PI.

### Step 3: Cover ON-set

Select minimum PIs to cover all ON-set minterms.

---

## Example: Formal Treatment

**Function**: $F = \Sigma m(1,3,5) + \Sigma d(7)$

### ON-set Analysis

ON-set = {1, 3, 5}
DC-set = {7}
OFF-set = {0, 2, 4, 6}

### K-Map (2 variables: AB)

Wait, this needs more variables. Let's use 3 variables: ABC.

```
      C
    0   1
  ┌───┬───┐
0 │ 0 │ 1 │  m0=0, m1=1
  ├───┼───┤
AB 1│ 0 │ 1 │  m2=0, m3=1
  ├───┼───┤
 11│ 0 │ 1 │  m6=0, m7=X
  ├───┼───┤
 10│ 0 │ 1 │  m4=0, m5=1
  └───┴───┘
```

The entire right column has 1, 1, X, 1 = all 1 (treating X as 1).

**Prime Implicant**: Column C=1 → term: C

**Verification**:
- m1: C=1 ✓
- m3: C=1 ✓
- m5: C=1 ✓
- m7: C=1 (X, optional) ✓

**Result**: F = C

---

## Don't Cares in POS Form

For **Product of Sums** minimization:

1. Group the 0s in the K-map
2. Treat X as 0 when it helps form larger groups
3. Extract maxterms from groups

### Duality

- SOP: Use X as 1 to enlarge groups of 1s
- POS: Use X as 0 to enlarge groups of 0s

---

## Complexity Considerations

### With Don't Cares

The presence of don't cares can:
1. **Reduce** circuit complexity (more optimization freedom)
2. **Increase** algorithm complexity (more choices to explore)

### Bounds

$$\text{Cost}(\text{Optimal with DC}) \leq \text{Cost}(\text{All DC} = 0) \leq \text{Cost}(\text{Fully Specified})$$

Don't cares never hurt—they can only help or have no effect.

---

## Summary

| Concept | With Don't Cares |
|---------|------------------|
| Function specification | ON-set + DC-set + OFF-set |
| Realizations | $2^{|DC-set|}$ possible |
| Prime implicants | Use ON ∪ DC for generation |
| Essential PIs | Based only on ON-set coverage |
| Optimization | Minimum cover of ON-set |
| Benefit | Potentially simpler circuits |
