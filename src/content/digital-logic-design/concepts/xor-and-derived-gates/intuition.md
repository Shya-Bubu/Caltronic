# XOR and Derived Gates: Beyond the Basics

### 1. XOR Gate (Exclusive OR)

[[visual:v1]]

XOR (Exclusive OR) asks a simple question: **"Are the inputs different?"**

| X₀ | X₁ | XOR Output |
|:--:|:--:|:----------:|
| 0 | 0 | 0 (same) |
| 0 | 1 | 1 (different!) |
| 1 | 0 | 1 (different!) |
| 1 | 1 | 0 (same) |

**Intuition**: Think of a disagreement detector. XOR outputs 1 only when the inputs disagree.

**Expression**: $Z = X_0 \oplus X_1$

---

## The Universal Gates: NAND and NOR

### NAND = NOT + AND

[[visual:v2]]

A NAND gate is an AND gate followed by a NOT gate.

| X₀ | X₁ | AND | NAND |
|:--:|:--:|:---:|:----:|
| 0 | 0 | 0 | **1** |
| 0 | 1 | 0 | **1** |
| 1 | 0 | 0 | **1** |
| 1 | 1 | 1 | **0** |

**Expression**: $Z = \overline{X_0 \cdot X_1}$

**Symbol**: AND gate with a bubble at the output.

### NOR = NOT + OR

[[visual:v3]]

A NOR gate is an OR gate followed by a NOT gate.

| X₀ | X₁ | OR | NOR |
|:--:|:--:|:--:|:---:|
| 0 | 0 | 0 | **1** |
| 0 | 1 | 1 | **0** |
| 1 | 0 | 1 | **0** |
| 1 | 1 | 1 | **0** |

**Expression**: $Z = \overline{X_0 + X_1}$

---

## Why Universal Gates Matter

Here's something remarkable: **You can build ANY logic circuit using only NAND gates** (or only NOR gates).

### Building a NOT from NAND:
Connect both inputs together:
```
X ──┬──┐
    │  │ NAND ── X̄
    └──┘
```
Result: NAND(X, X) = NOT(X AND X) = NOT(X)

### Building OR from NAND:
```
X ── NAND(X,X) ──┐
                 │ NAND ── X + Y
Y ── NAND(Y,Y) ──┘
```

This is why manufacturers often produce chips with just NAND gates — they're cheaper to make and can implement any function!

---

## XNOR: The Equality Detector

XNOR is the opposite of XOR. It asks: **"Are the inputs the same?"**

| X₀ | X₁ | XNOR Output |
|:--:|:--:|:-----------:|
| 0 | 0 | 1 (same!) |
| 0 | 1 | 0 (different) |
| 1 | 0 | 0 (different) |
| 1 | 1 | 1 (same!) |

**Expression**: $Z = \overline{X_0 \oplus X_1} = X_0 \odot X_1$

XNOR is just XOR with a NOT at the output.

---

## Controlled NOT Gate

What if you want to invert a signal only sometimes?

Use an AND gate with a control input:
- When A = 0, output Z = B̄ (inverted)
- When A = 1, output Z = B (same)

This is the foundation for **programmable logic** — circuits that can be reconfigured!

---

## Key Insights

> **XOR**: Different = 1, Same = 0
> **XNOR**: Same = 1, Different = 0
> **NAND**: Only 0 when both are 1 (anti-AND)
> **NOR**: Only 1 when both are 0 (anti-OR)

The "anti" behavior of NAND and NOR makes them incredibly versatile as universal building blocks.
