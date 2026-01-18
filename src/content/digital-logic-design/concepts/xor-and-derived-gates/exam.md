# Exam Preparation: XOR and Derived Gates

## Key Concepts to Master

### XOR Truth Table
| A | B | A ⊕ B |
|:-:|:-:|:-----:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Remember**: XOR = "different" = 1

---

## Common Question Types

### Type 1: Building Gates from NAND

**Problem**: Implement a NOT gate using only NAND gates.

**Solution**: Connect both NAND inputs together:
- NAND(X, X) = NOT(X AND X) = NOT(X) = X̄

### Type 2: De Morgan's Application

**Problem**: Express NAND(A, B) using OR and NOT.

**Solution**: 
$$\overline{A \cdot B} = \overline{A} + \overline{B}$$

NAND is equivalent to ORing the complements.

### Type 3: XOR Simplification

**Problem**: Simplify $A \oplus A \oplus B \oplus B \oplus C$

**Solution**:
- $A \oplus A = 0$
- $B \oplus B = 0$
- $0 \oplus 0 \oplus C = C$

**Answer**: C

---

## Important Formulas

| Property | Expression |
|----------|------------|
| XOR expansion | $A \oplus B = \overline{A}B + A\overline{B}$ |
| XNOR expansion | $A \odot B = AB + \overline{A}\overline{B}$ |
| De Morgan 1 | $\overline{AB} = \overline{A} + \overline{B}$ |
| De Morgan 2 | $\overline{A + B} = \overline{A} \cdot \overline{B}$ |
| Self-XOR | $X \oplus X = 0$ |
| XOR with 1 | $X \oplus 1 = \overline{X}$ |

---

## Practice Problems

1. Show how to build an AND gate using only NOR gates.

2. Evaluate: $(1 \oplus 0) \oplus (1 \oplus 1)$

3. If NAND(A, B) = 0, what are A and B?

4. How many NAND gates are needed to implement XOR?

5. Apply De Morgan to: $\overline{(A + B) \cdot C}$

---

## Common Mistakes

1. **Confusing XOR and OR**: XOR(1,1) = 0, but OR(1,1) = 1
2. **Forgetting the bubble**: NAND and NOR symbols have bubbles; AND and OR don't
3. **De Morgan errors**: Remember to flip the operation AND↔OR when applying
4. **XNOR sign**: $\odot$ or $\overline{\oplus}$, not just a different bubble position
