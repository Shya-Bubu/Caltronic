# Karnaugh Map Fundamentals

## The Visual Simplification Tool

What if you could **see** Boolean simplification instead of grinding through algebra? That's exactly what the Karnaugh map (K-map) offers!

---

## The Problem K-Maps Solve

Given a truth table, how do you find the simplest Boolean expression?

**Algebraic method**: Apply theorems, hope you find the right simplification
**K-map method**: Draw a map, spot patterns, read off the answer!

---

## A Neighborhood Analogy

Imagine organizing houses in a neighborhood:

**Bad planning**: House 1 next to House 5, House 2 next to House 7 (random)
**Good planning**: Similar houses are neighbors

In a K-map, we arrange cells so that **adjacent cells differ by exactly ONE variable**.

This is the magic that makes simplification visible!

---

## From Truth Table to K-Map

### Truth Table (2 variables)
```
A | B | F
──┼───┼───
0 | 0 | 1
0 | 1 | 0
1 | 0 | 1
1 | 1 | 1
```

### K-Map (2 variables)
```
        B
      0   1
    ┌───┬───┐
A 0 │ 1 │ 0 │
    ├───┼───┤
  1 │ 1 │ 1 │
    └───┴───┘
```

Same information, different arrangement!

---

## The Magic of Gray Code

Notice how K-map labels are ordered:
- Not 00, 01, 10, 11 (binary)
- But 00, 01, 11, 10 (Gray code)

**Gray code property**: Adjacent values differ by exactly ONE bit!

```
00 ↔ 01  (only B changes)
01 ↔ 11  (only A changes)
11 ↔ 10  (only B changes)
10 ↔ 00  (only A changes) — wraps around!
```

This is why K-maps work for simplification!

---

## Adjacency = Simplification Opportunity

When two adjacent cells both have 1:
- They share the same values for n-1 variables
- Only ONE variable differs
- That differing variable can be **eliminated**!

### Example

```
        B
      0   1
    ┌───┬───┐
A 0 │ 1 │ 0 │
    ├───┼───┤
  1 │ 1 │ 1 │
    └───┴───┘
```

The two 1s in column B=0:
- A=0, B=0 → minterm $\bar{A}\bar{B}$
- A=1, B=0 → minterm $A\bar{B}$

Combine: $\bar{A}\bar{B} + A\bar{B} = \bar{B}(\bar{A} + A) = \bar{B}$

**We eliminated A!** This is what grouping adjacent 1s does automatically.

---

## Wrap-Around Adjacency

K-maps wrap around like a cylinder (or torus for 4 variables):

```
     00   01   11   10
    ┌───┬───┬───┬───┐
 0  │   │   │   │   │
    ├───┼───┼───┼───┤
 1  │   │   │   │   │
    └───┴───┴───┴───┘
     ↑               ↑
     └───Adjacent!───┘
```

The leftmost and rightmost columns ARE adjacent (Gray code: 00 ↔ 10).

The top and bottom rows ARE adjacent too!

---

## Basic Grouping Rules

1. **Only group 1s** (for SOP; group 0s for POS)
2. **Groups must contain 2^n cells** (1, 2, 4, 8, 16...)
3. **Groups must be rectangular** (including wrap-around)
4. **Make groups as LARGE as possible**
5. **Every 1 must be in at least one group**
6. **Groups CAN overlap**

---

## Group Size = Variables Eliminated

| Group Size | Variables Eliminated | Term Complexity |
|------------|---------------------|-----------------|
| 1 cell | 0 | Full minterm |
| 2 cells | 1 | (n-1) variables |
| 4 cells | 2 | (n-2) variables |
| 8 cells | 3 | (n-3) variables |

**Bigger groups = simpler terms!**

---

## Reading a Group

For each group:
1. Look at which variables stay **constant** across all cells
2. Those variables appear in the term
3. If constant at 1: variable uncomplemented
4. If constant at 0: variable complemented
5. Variables that change: eliminated!

---

## Simple Example

```
        B
      0   1
    ┌───┬───┐
A 0 │ 0 │ 1 │
    ├───┼───┤
  1 │ 1 │ 1 │
    └───┴───┘
```

**Groups**:
- Row A=1 (both cells): B changes, A stays 1 → Term: **A**
- Column B=1 (both cells): A changes, B stays 1 → Term: **B**

**Result**: F = A + B

---

## Why This Beats Algebra

**Algebraic approach**:
1. Write all minterms: $\bar{A}B + A\bar{B} + AB$
2. Factor: $\bar{A}B + A(\bar{B} + B)$
3. Simplify: $\bar{A}B + A$
4. Hmm, is this minimal? Try another approach...
5. Apply absorption: ... (tedious!)

**K-map approach**:
1. Fill in the map
2. Group adjacent 1s
3. Read off: A + B
4. Done!

---

## Summary

| Concept | Key Point |
|---------|-----------|
| K-map structure | Cells arranged by Gray code |
| Adjacency | Neighbors differ by ONE variable |
| Grouping | Combine adjacent 1s |
| Simplification | Changing variables are eliminated |
| Group size | Powers of 2 only |
| Goal | Fewest, largest groups |
