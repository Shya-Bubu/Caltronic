# Boolean Algebra Rules and Theorems

> **Why This Matters**: The canonical SOP/POS expressions from the previous concept are guaranteed to work — but they're often **wasteful**, using far more gates than necessary. Boolean algebra gives you a set of **rules** for algebraically simplifying expressions, reducing gate count and improving every metric: area, cost, power, and speed. These rules are your primary hand-simplification tool.

## The Fundamental Rules

The lecture presents rules grouped by type. Let's build them systematically.

### Identity Laws

These define how 0 and 1 interact with a variable:

| Rule | AND form | OR form |
|------|----------|---------|
| **Identity** | A · 1 = A | A + 0 = A |
| **Annulment** | A · 0 = 0 | A + 1 = 1 |

[[visual:identity-laws]]

**AND identity**: ANDing with 1 passes the variable through. ANDing with 0 kills it.  
**OR identity**: ORing with 0 passes the variable through. ORing with 1 forces output to 1.

> **Key Insight**: These are the Boolean analogues of arithmetic identities: $x \times 1 = x$ and $x + 0 = x$. But note the differences: $A + 1 = 1$ (not A + 1 in arithmetic!).

### Complement Laws

What happens when you combine a variable with its complement:

| Rule | AND form | OR form |
|------|----------|---------|
| **Complement** | A · Ā = 0 | A + Ā = 1 |

[[visual:complement-laws]]

**AND**: A variable AND its complement is always 0 (they can never both be 1 at the same time).  
**OR**: A variable OR its complement is always 1 (one of them is always 1).

<details>
<summary><strong>Pause & Think</strong>: If A · Ā = 0 always, what does this mean physically in a circuit?</summary>

If you AND a signal with its inverted version, the output is permanently stuck at 0 — a waste of a gate. This situation arises in unoptimised SOP expressions and can be eliminated by algebraic simplification with the complement law.

Recognising patterns like A·Ā buried in complex expressions is the key skill for Boolean simplification.

</details>

### Idempotent Laws

A variable combined with itself:

| Rule | AND form | OR form |
|------|----------|---------|
| **Idempotent** | A · A = A | A + A = A |

This is unique to Boolean algebra — in regular arithmetic, $A + A = 2A \neq A$. But in binary, 1 + 1 = 1 (logical OR), not 2.

### Commutative and Associative Laws

| Rule | AND | OR |
|------|-----|-----|
| **Commutative** | A · B = B · A | A + B = B + A |
| **Associative** | (A · B) · C = A · (B · C) | (A + B) + C = A + (B + C) |

These mean the **order** and **grouping** of variables don't matter — same as in regular algebra.

### Distributive Law

$$A \cdot (B + C) = A \cdot B + A \cdot C$$

This law distributes AND over OR, just like multiplication distributes over addition in regular algebra.

[[visual:distributive-law]]

But Boolean algebra also has a **second** distributive law with no arithmetic analogue:

$$A + B \cdot C = (A + B)(A + C)$$

This distributes OR over AND — something that's NOT true in regular arithmetic! (Try: $2 + 3 \times 4 = 14 \neq (2+3)(2+4) = 30$.)

### Absorption Laws

$$A + A \cdot B = A$$
$$A \cdot (A + B) = A$$

**Why?** Expand: $A + AB = A(1 + B) = A \cdot 1 = A$. The term B is **absorbed** — it's redundant.

These are extremely useful for simplification because they eliminate entire terms.

## De Morgan's Theorems

The most powerful simplification tools in Boolean algebra:

[[visual:demorgans-theorems]]

### Theorem 1: NOT of AND
$$\overline{A \cdot B} = \bar{A} + \bar{B}$$

"The complement of a product is the sum of the complements."

### Theorem 2: NOT of OR
$$\overline{A + B} = \bar{A} \cdot \bar{B}$$

"The complement of a sum is the product of the complements."

[[visual:demorgans-venn]]

> **Key Insight**: De Morgan's theorems let you **push NOTs through gates**: a NOT-AND becomes OR-NOT, and vice versa. This is why NAND gates can implement OR (and NOR can implement AND).

### Generalised De Morgan's (N Variables)

$$\overline{X_1 \cdot X_2 \cdot \ldots \cdot X_n} = \bar{X}_1 + \bar{X}_2 + \ldots + \bar{X}_n$$
$$\overline{X_1 + X_2 + \ldots + X_n} = \bar{X}_1 \cdot \bar{X}_2 \cdot \ldots \cdot \bar{X}_n$$

De Morgan's works for any number of variables — just complement each variable AND swap the operator.

<details>
<summary><strong>Pause & Think</strong>: Use De Morgan's to show that NAND → OR: If you NOT both inputs of a NAND gate, what do you get?</summary>

Start: $\overline{A \cdot B}$ (NAND).  
NOT both inputs: $\overline{\bar{A} \cdot \bar{B}}$.  
Apply De Morgan's: $= A + B$.  
Result: **OR gate!** This is exactly how we build OR from NAND gates in the previous concept.

</details>

## Worked Example: SOP Simplification

The lecture works through simplifying a 4-minterm SOP expression:

$$Z = \bar{A}BC + A\bar{B}C + AB\bar{C} + ABC$$

[[visual:simplification-steps]]

**Step 1**: Group the last term (ABC) with each of the other three:
- $\bar{A}BC + ABC = BC(\bar{A} + A) = BC \cdot 1 = BC$
- $A\bar{B}C + ABC = AC(\bar{B} + B) = AC$
- $AB\bar{C} + ABC = AB(\bar{C} + C) = AB$

**But wait** — we used ABC **three times**! Is that allowed?

**Yes!** The **idempotent law** says $ABC + ABC + ABC = ABC$. We can duplicate terms freely. So:

$$Z = ABC + ABC + ABC + \bar{A}BC + A\bar{B}C + AB\bar{C}$$

Simplifying each pair:

$$Z = AB + BC + AC$$

From **4 minterms** (12 gate inputs) to **3 terms of 2 variables** (6 gate inputs) — a **50% reduction**!

[[visual:falstad-simplified-majority]]

<details>
<summary><strong>Pause & Think</strong>: Can we simplify AB + BC + AC further? Try applying absorption or other rules.</summary>

Let's check: Is any term absorbed by the others? AB + BC + AC — no term is a subset of another, and no further merging is possible (no shared terms with Hamming distance 1).

So AB + BC + AC is the **minimal SOP** for the majority voter. We'll learn in the next concept how Hamming distance tells us which terms can merge.

</details>

## Complete Rules Reference

[[visual:boolean-cheatsheet]]

| # | Rule | AND form | OR form |
|---|------|----------|---------|
| 1 | Identity | A·1 = A | A+0 = A |
| 2 | Annulment | A·0 = 0 | A+1 = 1 |
| 3 | Complement | A·Ā = 0 | A+Ā = 1 |
| 4 | Idempotent | A·A = A | A+A = A |
| 5 | Commutative | AB = BA | A+B = B+A |
| 6 | Associative | (AB)C = A(BC) | (A+B)+C = A+(B+C) |
| 7 | Distributive | A(B+C) = AB+AC | A+BC = (A+B)(A+C) |
| 8 | Absorption | A+AB = A | A(A+B) = A |
| 9 | De Morgan 1 | (AB)̄ = Ā+B̄ | |
| 10 | De Morgan 2 | | (A+B)̄ = Ā·B̄ |

## Summary

- **10 rules** govern all Boolean algebra simplification
- **De Morgan's theorems** are the most powerful: push NOTs through gates, swap AND↔OR
- **Idempotent + complement** laws enable term duplication and elimination
- **Absorption** eliminates entire terms when one subsumes another
- **Worked example**: 4-minterm SOP → 3-term simplified expression (50% fewer gates)

> **Master these 10 rules and you can simplify any Boolean expression by hand.** For larger circuits, Karnaugh maps (next lesson) provide a graphical shortcut.
