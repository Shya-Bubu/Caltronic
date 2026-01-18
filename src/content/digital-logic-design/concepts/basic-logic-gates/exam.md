# Exam Preparation: Basic Logic Gates

## Common Question Types

### Type 1: Truth Table Completion

**Problem**: Complete the truth table for the given logic expression.

**Example**: $Z = \overline{A} \cdot B + A$

| A | B | $\overline{A}$ | $\overline{A} \cdot B$ | Z |
|:-:|:-:|:--------------:|:----------------------:|:-:|
| 0 | 0 | 1 | 0 | ? |
| 0 | 1 | 1 | 1 | ? |
| 1 | 0 | 0 | 0 | ? |
| 1 | 1 | 0 | 0 | ? |

**Solution Strategy**:
1. Compute intermediate terms first
2. Apply operations in order of precedence (NOT → AND → OR)

**Answer**: Z = {0, 1, 1, 1}

---

### Type 2: Expression from Truth Table

**Problem**: Write the Boolean expression for this truth table:

| A | B | Z |
|:-:|:-:|:-:|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**Strategy**: 
- Find rows where Z = 1
- Write a product term (AND) for each
- Add (OR) all terms together

**Answer**: $Z = \overline{A}\overline{B} + A\overline{B} + AB = \overline{B} + A$

---

### Type 3: Gate-Level Analysis

**Problem**: What is the output of this circuit when A = 1, B = 0?

```
A ──┐
    │ AND ──┐
B ──┘       │ OR ── Z
       1 ──┘
```

**Solution**:
- AND output: 1 · 0 = 0
- OR output: 0 + 1 = 1
- **Z = 1**

---

## Key Formulas to Memorize

| Identity | Formula |
|----------|---------|
| Identity (OR) | $X + 0 = X$ |
| Identity (AND) | $X \cdot 1 = X$ |
| Null (OR) | $X + 1 = 1$ |
| Null (AND) | $X \cdot 0 = 0$ |
| Complement (OR) | $X + \overline{X} = 1$ |
| Complement (AND) | $X \cdot \overline{X} = 0$ |
| Double Negation | $\overline{\overline{X}} = X$ |

---

## Common Mistakes to Avoid

1. **Confusing + and ·**: In Boolean algebra, + is OR (not addition), · is AND
2. **Precedence errors**: NOT > AND > OR — use parentheses when unsure
3. **Forgetting double negation**: $\overline{\overline{X}} = X$
4. **Voltage confusion**: 5V = 1 = HIGH = TRUE (they're all the same)

---

## Practice Problems

1. Simplify: $Z = A \cdot 1 + A \cdot 0$
2. Evaluate: $Z = \overline{0} + 1 \cdot 0$
3. If a 2-input OR gate has inputs X = 1, Y = 0, what is Z?
4. How many rows does a 4-input truth table have?
5. Express $Z = A + B$ using only NOT and AND gates.
