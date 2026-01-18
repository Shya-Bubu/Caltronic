# XOR Applications: Building Useful Digital Circuits

## The Magic of XOR in Arithmetic

XOR has a remarkable property: it performs **binary addition without the carry**.

| A | B | A + B (binary sum) | Carry |
|:-:|:-:|:-----------------:|:-----:|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

Notice something? The "Sum" column is exactly XOR! The "Carry" column is exactly AND!

---

## The Half Adder: Your First Arithmetic Circuit

[[visual:v1]]

A **half adder** adds two single bits:
- **Sum** = A ⊕ B (XOR)
- **Carry** = A · B (AND)

```
A ──┬──┐
    │  │ XOR ──── Sum
B ──┼──┘
    │
    └──┐
       │ AND ──── Carry
    ───┘
```

**Example**: 
- 0 + 0 = 0, carry 0
- 1 + 1 = 0, carry 1 (like 1 + 1 = 10 in binary)

---

## Binary Comparator: Finding Differences

How do you check if two binary numbers are equal? Compare each bit!

**XNOR**: Outputs 1 when bits are the same
**XOR**: Outputs 1 when bits are different

### Single-Bit Comparator

[[visual:v5]]

```
A₀ ──┐
     │ XNOR ── E (Equal)
B₀ ──┘
```

### Multi-Bit Comparator
For two 4-bit numbers (A₃A₂A₁A₀ and B₃B₂B₁B₀):

1. Compare each bit pair with XNOR
2. AND all results together

```
A₀ ──┬── XNOR ──┐
B₀ ──┘          │
                │
A₁ ──┬── XNOR ──┤
B₁ ──┘          │ AND ── EQUAL
                │
A₂ ──┬── XNOR ──┤
B₂ ──┘          │
                │
A₃ ──┬── XNOR ──┘
B₃ ──┘
```

Only if ALL bits match does output = 1 (Equal).

---

## Parity Check: Error Detection

**Problem**: How do you know if data was corrupted during transmission?

**Solution**: Add a **parity bit** that makes the total number of 1s even (or odd).

### Even Parity Example
Data: 1011 (three 1s — odd)
Parity bit: 1 (to make total even)
Transmitted: 10111

**Checking**: XOR all bits including parity:
$$1 \oplus 0 \oplus 1 \oplus 1 \oplus 1 = 0$$

If result is 0, no error detected!

### XOR Parity Circuit
```
S₁ ──┐
     │ XOR ──┐
S₂ ──┘       │
             │ XOR ──┐
S₃ ──────────┘       │
                     │ XOR ── Parity Bit
S₄ ──────────────────┘
```

Multi-input XOR outputs 1 if odd number of inputs are 1.

---

## Two-Way Switch: Real World Control

Imagine a hallway light controlled by two switches (upstairs and downstairs). Either switch should toggle the light.

**Truth Table:**
| S₁ | S₂ | Light |
|:--:|:--:|:-----:|
| 0 | 0 | OFF |
| 0 | 1 | ON |
| 1 | 0 | ON |
| 1 | 1 | OFF |

This is exactly XOR! Either switch toggles the state.

---

## Key Insight

XOR is the foundation of:
- **Arithmetic** (adders, ALUs)
- **Comparison** (equality checking)
- **Error detection** (parity, checksums)
- **Encryption** (XOR with a key)
- **Toggle logic** (switch states)

Its "different = 1" property makes it uniquely useful in digital systems.
