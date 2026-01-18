# Combinational Circuit Design: From Requirement to Circuit

## The Design Flow

[[visual:v1]]

Every digital circuit starts with a **requirement** and ends with a **working circuit**:

```
Requirement → Truth Table → Boolean Expression → Logic Circuit
```

Let's walk through this process step by step.

---

## Step 1: Understand the Requirement

**Example**: Design a circuit for a meeting room light that turns on only when:
- At least 2 of 3 people (A, B, C) vote "yes"

This is a **majority vote** circuit!

---

## Step 2: Create the Truth Table

List all input combinations and determine the output:

| A | B | C | Z (light on?) |
|:-:|:-:|:-:|:-------------:|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 ✓ |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 ✓ |
| 1 | 1 | 0 | 1 ✓ |
| 1 | 1 | 1 | 1 ✓ |

Z = 1 when at least 2 inputs are 1.

---

## Step 3: Express as Sum of Products (SOP)

[[visual:v2]]

**Method**: For each row where Z = 1, write a **product term** (AND of all inputs).

Row 3 (0,1,1): $\overline{A} \cdot B \cdot C$
Row 5 (1,0,1): $A \cdot \overline{B} \cdot C$
Row 6 (1,1,0): $A \cdot B \cdot \overline{C}$
Row 7 (1,1,1): $A \cdot B \cdot C$

**SOP Expression**:
$$Z = \overline{A}BC + A\overline{B}C + AB\overline{C} + ABC$$

Each product term is called a **minterm**.

---

## Step 4: Or Use Product of Sums (POS)

[[visual:v3]]

**Alternative**: For each row where Z = 0, write a **sum term** (OR of all inputs).

Row 0 (0,0,0): $A + B + C$
Row 1 (0,0,1): $A + B + \overline{C}$
Row 2 (0,1,0): $A + \overline{B} + C$
Row 4 (1,0,0): $\overline{A} + B + C$

**POS Expression**:
$$Z = (A+B+C)(A+B+\overline{C})(A+\overline{B}+C)(\overline{A}+B+C)$$

Each sum term is called a **maxterm**.

---

## Minterms vs Maxterms

| Concept | Minterm | Maxterm |
|---------|---------|---------|
| Appears when | Output = 1 | Output = 0 |
| Contains | AND of all inputs | OR of all inputs |
| Variable form | Normal if 1, barred if 0 | Barred if 1, normal if 0 |
| Expression type | SOP (Sum of Products) | POS (Product of Sums) |

**Key insight**: If a function has fewer 1s than 0s, use SOP. Otherwise, POS may be simpler.

---

## Step 5: Draw the Circuit

For SOP: 
- Each minterm becomes an AND gate
- All AND outputs connect to an OR gate

```
A ──┬──────────────────────┐
    │                      │
B ──┼──┬───────────────────┼───────────────┐
    │  │                   │               │
C ──┼──┼──┬────────────────┼───────────────┼──┐
    │  │  │                │               │  │
   NOT NOT NOT             │               │  │
    │  │  │                │               │  │
    └──┼──┼── AND ─────────┤               │  │
       │  │                │               │  │
    ───┼──┼── AND ─────────┤ OR ── Z       │  │
       │  │                │               │  │
    ───┼──┴── AND ─────────┤               │  │
       │                   │               │  │
    ───┴────── AND ────────┘               │  │
```

This direct translation always works, but may not be optimal!
