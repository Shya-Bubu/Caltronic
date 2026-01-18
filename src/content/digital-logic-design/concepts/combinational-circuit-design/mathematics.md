# Mathematical Foundations: Combinational Design

## Canonical Forms

### Sum of Products (SOP) - Disjunctive Normal Form

Any Boolean function can be expressed as an OR of AND terms:

$$f(X_1, X_2, ..., X_n) = \sum_{i} m_i$$

where each $m_i$ is a minterm (product of all variables or their complements).

**Canonical SOP**: Each minterm contains all n variables exactly once.

### Product of Sums (POS) - Conjunctive Normal Form

Alternatively, as an AND of OR terms:

$$f(X_1, X_2, ..., X_n) = \prod_{j} M_j$$

where each $M_j$ is a maxterm (sum of all variables or their complements).

---

## Minterm Definition

For n variables, minterm $m_i$ corresponds to binary representation of i:

$$m_i = \prod_{j=0}^{n-1} X_j^{b_j}$$

where $b_j$ is the j-th bit of i, and:
- $X_j^1 = X_j$ (if bit is 1)
- $X_j^0 = \overline{X_j}$ (if bit is 0)

**Example** (3 variables): 
$$m_5 = m_{101} = A \cdot \overline{B} \cdot C$$

---

## Maxterm Definition

Maxterm $M_i$ is the dual of $m_i$:

$$M_i = \sum_{j=0}^{n-1} \overline{X_j^{b_j}}$$

**Key relationship**:
$$M_i = \overline{m_i}$$

Therefore:
$$m_i \cdot M_i = 0 \quad \text{and} \quad m_i + M_i = 1$$

---

## Canonical Form Conversion

### SOP ↔ POS Relationship

If function f has minterms $\{m_i\}$, then:
$$f = \sum m_i$$
$$\overline{f} = \sum m_j \text{ for } j \notin \{i\}$$
$$f = \prod M_j \text{ for } j \notin \{i\}$$

**Example**: 
If $f = \sum m(1,2,3)$ for 2 variables:
Then $\overline{f} = \sum m(0)$
So $f = \prod M(0) = M_0$

---

## Minterm/Maxterm Enumeration

For n = 3 variables (A, B, C):

| i | Binary | Minterm $m_i$ | Maxterm $M_i$ |
|:-:|:------:|:-------------:|:-------------:|
| 0 | 000 | $\overline{A}\overline{B}\overline{C}$ | $A+B+C$ |
| 1 | 001 | $\overline{A}\overline{B}C$ | $A+B+\overline{C}$ |
| 2 | 010 | $\overline{A}B\overline{C}$ | $A+\overline{B}+C$ |
| 3 | 011 | $\overline{A}BC$ | $A+\overline{B}+\overline{C}$ |
| 4 | 100 | $A\overline{B}\overline{C}$ | $\overline{A}+B+C$ |
| 5 | 101 | $A\overline{B}C$ | $\overline{A}+B+\overline{C}$ |
| 6 | 110 | $AB\overline{C}$ | $\overline{A}+\overline{B}+C$ |
| 7 | 111 | $ABC$ | $\overline{A}+\overline{B}+\overline{C}$ |

---

## Functional Completeness of Canonical Forms

**Theorem**: Any Boolean function can be expressed in canonical SOP or POS form.

**Proof**: By construction.
1. Create truth table for function f
2. For each row where f = 1, write corresponding minterm
3. OR all minterms together
4. The resulting expression equals f by evaluation on all inputs ∎

---

## Don't Care Conditions

When certain input combinations never occur, their outputs are "don't cares" (X or d).

**Mathematical treatment**: 
$$f = \sum m(\text{on-set}) + d \cdot \sum m(\text{don't-care-set})$$

During minimization, d can be chosen as 0 or 1 to simplify the expression.

**Example**: BCD decoder (only 0-9 valid)
- Inputs 10-15 (1010-1111) are don't cares
- Can be assigned 0 or 1 to minimize circuit

---

## Complexity Measures

### Literal Count
Number of variable occurrences in minimized expression.

**Example**: $AB + \overline{A}C$ has 4 literals.

### Gate Count
- Level-1 gates: Number of product/sum terms
- Level-2 gate: 1 (OR for SOP, AND for POS)
- NOT gates: Typically shared among all terms

**Cost estimate**: $\text{Cost} \approx \text{literals} + \text{terms}$
