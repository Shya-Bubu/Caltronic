# Boolean Algebra and Circuit Minimization

## Why Minimize Circuits?

[[visual:v1]]

The SOP expression we get from a truth table often isn't optimal. Consider a 4-minterm expression that could be reduced to 2 terms — that's half the gates!

**Benefits of minimization:**
- ↓ **Area** — fewer gates = smaller chip
- ↓ **Cost** — fewer components = cheaper
- ↓ **Power** — fewer gates = less energy
- ↑ **Speed** — simpler paths = faster operation

---

## Boolean Algebra Rules

These are your tools for simplification:

### Identity & Null Laws
| Rule | AND form | OR form |
|------|----------|---------|
| Identity | $X \cdot 1 = X$ | $X + 0 = X$ |
| Null | $X \cdot 0 = 0$ | $X + 1 = 1$ |

### Idempotent & Complement
| Rule | AND form | OR form |
|------|----------|---------|
| Idempotent | $X \cdot X = X$ | $X + X = X$ |
| Complement | $X \cdot \overline{X} = 0$ | $X + \overline{X} = 1$ |

### Commutative & Associative
- $AB = BA$ and $A + B = B + A$
- $(AB)C = A(BC)$ and $(A+B)+C = A+(B+C)$

### Distributive
- $A(B + C) = AB + AC$
- $A + BC = (A + B)(A + C)$ ← unique to Boolean algebra!

---

## De Morgan's Theorems

[[visual:v2]]

These let you convert between AND and OR:

$$\overline{AB} = \overline{A} + \overline{B}$$
$$\overline{A+B} = \overline{A} \cdot \overline{B}$$

**In words**: "Break the bar, change the operation"

**Example**: $\overline{ABC} = \overline{A} + \overline{B} + \overline{C}$

---

## Simplification Example

**Simplify**: $Z = ABC + ABC̄$

**Step 1**: Factor out common terms
$$Z = AB(C + \overline{C})$$

**Step 2**: Apply complement law ($C + \overline{C} = 1$)
$$Z = AB \cdot 1$$

**Step 3**: Apply identity law
$$Z = AB$$

We reduced from 6 literals to 2!

---

## Hamming Distance

[[visual:v4]]

The **Hamming distance** between two minterms is the number of variables that differ.

| Term 1 | Term 2 | Different bits | HD |
|--------|--------|----------------|:--:|
| ABC | AB̄C | B | 1 |
| ABC | ĀB̄C | A, B | 2 |
| ABC | ĀB̄C̄ | A, B, C | 3 |

**Key insight**: Two minterms with Hamming distance = 1 can be combined!

$$ABC + AB\overline{C} = AB(C + \overline{C}) = AB$$

The differing variable disappears!

---

## Minimization Methods

1. **Boolean Algebra** — Apply rules manually (good for small expressions)
2. **Karnaugh Maps** — Visual method for up to 4-5 variables
3. **Quine-McCluskey** — Algorithmic, works for any size

Each method finds expressions with:
- Minimum number of terms
- Minimum number of literals per term

---

## Canonical vs. Non-Canonical Forms

**Canonical**: Every term has all variables
$$Z = ABC + AB\overline{C} + \overline{A}BC$$

**Non-canonical** (minimized): Some variables eliminated
$$Z = AB + BC$$

The canonical form is unique, but the minimized form achieves the same function with less!
