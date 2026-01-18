# Exam Preparation: Boolean Algebra Minimization

## Essential Laws to Memorize

| Law | Formula | Use |
|-----|---------|-----|
| Absorption | $X + XY = X$ | Eliminate redundant terms |
| Complement | $X + \overline{X} = 1$ | Simplify to constants |
| De Morgan | $\overline{AB} = \overline{A} + \overline{B}$ | Convert AND↔OR |
| Distributive | $X + YZ = (X+Y)(X+Z)$ | Factor/expand |

---

## Common Question Types

### Type 1: Simplify Expression

**Problem**: Simplify $Z = ABC + AB\overline{C}$

**Solution**:
1. Factor: $Z = AB(C + \overline{C})$
2. Complement: $Z = AB \cdot 1$
3. Identity: $Z = AB$

### Type 2: Apply De Morgan

**Problem**: Find $\overline{A(B + C)}$

**Solution**:
1. Break outer: $\overline{A} + \overline{(B+C)}$
2. Break inner: $\overline{A} + \overline{B}\overline{C}$

**Answer**: $\overline{A} + \overline{B}\overline{C}$

### Type 3: Hamming Distance

**Problem**: Can $ABC$ and $A\overline{B}\overline{C}$ be combined?

**Solution**:
- ABC = 111, AB̄C̄ = 100
- Differ in B and C (2 positions)
- HD = 2 ≠ 1

**Answer**: No, cannot combine (HD must be 1)

---

## Simplification Strategy

1. Look for complementary terms: $XY + X\overline{Y} = X$
2. Look for absorption: $X + XY = X$
3. Factor common terms: $AB + AC = A(B+C)$
4. Apply De Morgan if needed

---

## Practice Problems

1. Simplify: $Z = \overline{A}B + AB + A\overline{B}$
2. Simplify: $Z = (A+B)(A+\overline{B})$
3. Apply De Morgan to: $\overline{(A+B)(C+D)}$
4. What is the Hamming distance between $m_3$ and $m_7$ (3 variables)?

---

## Common Mistakes

1. **Forgetting double complement**: $\overline{\overline{X}} = X$
2. **Wrong De Morgan application**: Must change operation AND↔OR
3. **Incomplete simplification**: Check if further reduction possible
4. **HD calculation errors**: XOR the binary values, count 1s
