# Mathematical Analysis: XOR and Derived Gates

## XOR: Formal Definition

The Exclusive OR operation is defined as:

$$X_0 \oplus X_1 = \overline{X_0} \cdot X_1 + X_0 \cdot \overline{X_1}$$

Alternative expression using AND, OR, NOT:
$$X_0 \oplus X_1 = (X_0 + X_1) \cdot \overline{(X_0 \cdot X_1)}$$

This can be read as: "(X₀ OR X₁) AND NOT (X₀ AND X₁)" — i.e., OR but not both.

---

## XOR Properties

### Commutative
$$X \oplus Y = Y \oplus X$$

### Associative
$$(X \oplus Y) \oplus Z = X \oplus (Y \oplus Z)$$

### Identity Element
$$X \oplus 0 = X$$

### Self-Inverse
$$X \oplus X = 0$$
$$X \oplus 1 = \overline{X}$$

### Inverse Operation
$$X \oplus Y \oplus Y = X$$

This property makes XOR useful in cryptography and error detection.

---

### De Morgan's Theorems

[[visual:v6]]

These theorems relate NAND and NOR to basic gates:

### First Theorem (NAND relation)
$$\overline{X \cdot Y} = \overline{X} + \overline{Y}$$

**Interpretation**: NAND(X, Y) = OR(NOT X, NOT Y)

### Second Theorem (NOR relation)
$$\overline{X + Y} = \overline{X} \cdot \overline{Y}$$

**Interpretation**: NOR(X, Y) = AND(NOT X, NOT Y)

---

## Functional Completeness Proof

### NAND is Functionally Complete

**Proof**: We show that NOT, AND, OR can all be built from NAND.

1. **NOT from NAND**:
$$\overline{X} = \overline{X \cdot X} = X \uparrow X$$

2. **AND from NAND**:
$$X \cdot Y = \overline{\overline{X \cdot Y}} = \overline{(X \uparrow Y)} = (X \uparrow Y) \uparrow (X \uparrow Y)$$

3. **OR from NAND** (using De Morgan's):
$$X + Y = \overline{\overline{X} \cdot \overline{Y}} = (X \uparrow X) \uparrow (Y \uparrow Y)$$

Since {NOT, AND, OR} is complete and can be derived from NAND, NAND alone is complete. ∎

### NOR is Similarly Complete

By analogous construction using the second De Morgan theorem.

---

## XOR Algebraic Identities

| Identity | Expression |
|----------|------------|
| XOR with 0 | $X \oplus 0 = X$ |
| XOR with 1 | $X \oplus 1 = \overline{X}$ |
| Self-XOR | $X \oplus X = 0$ |
| Double XOR | $X \oplus Y \oplus Y = X$ |
| Expansion | $X \oplus Y = \overline{X}Y + X\overline{Y}$ |
| Alternative | $X \oplus Y = (X + Y) \cdot \overline{XY}$ |

---

## XNOR as Equivalence

XNOR (also called XAND or EQV) detects equality:

$$X \odot Y = \overline{X \oplus Y} = XY + \overline{X}\overline{Y}$$

**Properties:**
- Returns 1 when inputs are equal
- Returns 0 when inputs differ
- $X \odot 1 = X$ (identity)
- $X \odot 0 = \overline{X}$ (inversion)

---

## Multi-Input XOR

For n inputs, XOR outputs 1 if an **odd number** of inputs are 1:

$$X_0 \oplus X_1 \oplus ... \oplus X_{n-1} = 1 \iff \sum_{i} X_i \text{ is odd}$$

This property is fundamental to **parity checking** — detecting single-bit errors.

---

## Counting Logic Functions

For 2-input gates, there are $2^{2^2} = 16$ possible functions:

| ID | Function | Expression |
|----|----------|------------|
| 0 | Always 0 | 0 |
| 1 | AND | $XY$ |
| 2 | X AND NOT Y | $X\overline{Y}$ |
| ... | ... | ... |
| 6 | XOR | $X \oplus Y$ |
| 7 | OR | $X + Y$ |
| 8 | NOR | $\overline{X + Y}$ |
| 9 | XNOR | $X \odot Y$ |
| 14 | NAND | $\overline{XY}$ |
| 15 | Always 1 | 1 |

XOR and XNOR are the only asymmetric functions among the 16.
