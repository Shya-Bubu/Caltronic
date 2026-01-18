# Mathematical Foundations: Boolean Algebra Minimization

## Complete Set of Boolean Algebra Theorems

### Basic Laws

| Law | AND Form | OR Form |
|-----|----------|---------|
| Identity | $X \cdot 1 = X$ | $X + 0 = X$ |
| Null | $X \cdot 0 = 0$ | $X + 1 = 1$ |
| Idempotent | $X \cdot X = X$ | $X + X = X$ |
| Complement | $X \cdot \overline{X} = 0$ | $X + \overline{X} = 1$ |
| Involution | $\overline{\overline{X}} = X$ | $\overline{\overline{X}} = X$ |

### Combining Laws

| Law | AND Form | OR Form |
|-----|----------|---------|
| Commutative | $XY = YX$ | $X+Y = Y+X$ |
| Associative | $(XY)Z = X(YZ)$ | $(X+Y)+Z = X+(Y+Z)$ |
| Distributive | $X(Y+Z) = XY+XZ$ | $X+YZ = (X+Y)(X+Z)$ |

### Absorption Laws

[[visual:v3]]

$$X + XY = X$$
$$X(X + Y) = X$$
$$X + \overline{X}Y = X + Y$$
$$X(\overline{X} + Y) = XY$$

---

## De Morgan's Theorems: General Form

For n variables:
$$\overline{X_1 \cdot X_2 \cdot ... \cdot X_n} = \overline{X_1} + \overline{X_2} + ... + \overline{X_n}$$
$$\overline{X_1 + X_2 + ... + X_n} = \overline{X_1} \cdot \overline{X_2} \cdot ... \cdot \overline{X_n}$$

**Application**: Converting between NAND/NOR and AND/OR forms.

---

## Hamming Distance and Combining

### Definition
The Hamming distance $d_H(m_i, m_j)$ between two minterms is:
$$d_H(m_i, m_j) = \text{popcount}(i \oplus j)$$

Where popcount counts the number of 1s in the XOR result.

### Combining Theorem
Two minterms $m_i$ and $m_j$ can combine into a simpler term if and only if:
$$d_H(m_i, m_j) = 1$$

The combined term eliminates the variable that differs.

**Example**: 
- $m_5 = A\overline{B}C$ and $m_7 = ABC$ differ only in B
- $5 \oplus 7 = 101 \oplus 111 = 010$ (HD = 1)
- Combined: $AC$

---

## Prime Implicants

### Definitions

**Implicant**: A product term that implies the function (is 1 only when function is 1).

**Prime Implicant**: An implicant that cannot be combined with any other to form a simpler term.

**Essential Prime Implicant**: A prime implicant that covers at least one minterm not covered by any other prime implicant.

### Minimization Goal
Find the minimum set of prime implicants that covers all minterms.

---

## Quine-McCluskey Algorithm

### Step 1: Group Minterms
Organize minterms by number of 1s in binary representation.

### Step 2: Find Prime Implicants
Compare adjacent groups, combine terms with HD = 1, mark combined terms.

### Step 3: Prime Implicant Chart
Create matrix: rows = prime implicants, columns = minterms.

### Step 4: Select Cover
1. Identify essential prime implicants (must be included)
2. Cover remaining minterms with minimum additional terms

---

## Complexity of Minimization

### Two-Level Minimization
- Finding minimum SOP is NP-hard in general
- Karnaugh maps: O(2^n) for n variables (visual inspection)
- Quine-McCluskey: O(3^n/n) for complete algorithm

### Heuristic Methods
For large problems, exact minimization is impractical:
- **ESPRESSO** algorithm (industry standard)
- Iterative improvement
- Local search methods

---

## Algebraic Proof Techniques

### Proving Equality
To prove $f = g$:
1. Transform f to g using Boolean laws, OR
2. Show f ⊕ g = 0 (they differ nowhere), OR
3. Verify truth tables are identical

### Example Proof
Prove: $X + XY = X$

**Proof**:
$$X + XY = X \cdot 1 + XY$$ (Identity law)
$$= X(1 + Y)$$ (Factor)
$$= X \cdot 1$$ (OR null: 1 + Y = 1)
$$= X$$ (Identity) ∎
