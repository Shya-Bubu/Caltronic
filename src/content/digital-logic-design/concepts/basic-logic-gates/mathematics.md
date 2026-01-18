# Mathematical Foundations of Logic Gates

## Boolean Algebra Fundamentals

Logic gates implement Boolean algebra operations on a binary set $\mathbb{B} = \{0, 1\}$.

### Formal Definitions

**Negation (NOT)**:
$$\overline{X} = 1 - X$$

Or equivalently:
$$\overline{0} = 1, \quad \overline{1} = 0$$

**Disjunction (OR)**:
$$X + Y = \max(X, Y)$$

**Conjunction (AND)**:
$$X \cdot Y = \min(X, Y) = X \times Y$$

---

## Algebraic Properties

### Identity Laws
$$X + 0 = X \quad \text{(OR identity)}$$
$$X \cdot 1 = X \quad \text{(AND identity)}$$

### Null Laws
$$X + 1 = 1 \quad \text{(OR null)}$$
$$X \cdot 0 = 0 \quad \text{(AND null)}$$

### Idempotent Laws
$$X + X = X$$
$$X \cdot X = X$$

### Complement Laws
$$X + \overline{X} = 1$$
$$X \cdot \overline{X} = 0$$

### Double Negation (Involution)
$$\overline{\overline{X}} = X$$

---

## Commutative, Associative, Distributive

### Commutative
$$X + Y = Y + X$$
$$X \cdot Y = Y \cdot X$$

### Associative
$$(X + Y) + Z = X + (Y + Z)$$
$$(X \cdot Y) \cdot Z = X \cdot (Y \cdot Z)$$

### Distributive
$$X \cdot (Y + Z) = X \cdot Y + X \cdot Z$$
$$X + (Y \cdot Z) = (X + Y) \cdot (X + Z) \quad \text{(unique to Boolean algebra!)}$$

---

## Truth Table Enumeration

For $n$ input variables, a truth table has $2^n$ rows.

### General Form for 2 Variables

| $X_0$ | $X_1$ | $\overline{X_0}$ | $X_0 + X_1$ | $X_0 \cdot X_1$ |
|:-----:|:-----:|:----------------:|:-----------:|:---------------:|
| 0 | 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 | 1 |

### Counting Possible Functions

With $n$ inputs, there are $2^{2^n}$ possible Boolean functions.

For 2 inputs: $2^{2^2} = 2^4 = 16$ functions

These include: constant 0, constant 1, AND, OR, NOT-A, NOT-B, XOR, XNOR, NAND, NOR, etc.

---

## Functional Completeness

A set of operators is **functionally complete** if any Boolean function can be expressed using only those operators.

**Theorem**: The set $\{\text{NOT}, \text{AND}, \text{OR}\}$ is functionally complete.

**Proof sketch**: Any Boolean function can be expressed in Sum of Products (SOP) form using only these three operations.

**Corollary**: The set $\{\text{NOT}, \text{AND}\}$ is also functionally complete since:
$$X + Y = \overline{\overline{X} \cdot \overline{Y}}$$

Similarly, $\{\text{NOT}, \text{OR}\}$ is complete since:
$$X \cdot Y = \overline{\overline{X} + \overline{Y}}$$

---

## Duality Principle

For any Boolean expression, its **dual** is obtained by:
1. Interchanging AND (·) and OR (+)
2. Interchanging 0 and 1

**Property**: If an identity holds, its dual also holds.

**Example**:
- Identity: $X + 0 = X$
- Dual: $X \cdot 1 = X$ ✓

---

## Precedence Rules

Standard operator precedence (highest to lowest):
1. NOT (negation): $\overline{X}$
2. AND (conjunction): $X \cdot Y$
3. OR (disjunction): $X + Y$

**Example**: $A + B \cdot C = A + (B \cdot C)$, not $(A + B) \cdot C$
