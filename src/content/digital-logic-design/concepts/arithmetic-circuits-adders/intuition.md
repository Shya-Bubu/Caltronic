# Arithmetic Circuits: Adders

## Building Blocks of Computation

Every calculation your computer performs — from simple addition to complex graphics — ultimately relies on **adder circuits**. Let's build them from scratch.

---

## The Half Adder: Adding Two Bits

[[visual:v1]]
[[visual:v2]]

The simplest adder takes two single-bit inputs and produces:
- **Sum (S)**: The result bit
- **Carry (C₀)**: The overflow bit

| A | B | Sum | Carry |
|:-:|:-:|:---:|:-----:|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

**Key insight**: 
- Sum = A ⊕ B (XOR — "are they different?")
- Carry = A · B (AND — "are both 1?")

When we add 1+1 in binary, we get 10 (decimal 2): Sum=0, Carry=1.

---

## The Full Adder: Handling Carry-In

[[visual:v3]]

What if we're adding multi-bit numbers? Each position needs to handle the carry from the previous position.

A **full adder** has THREE inputs:
- A (first bit)
- B (second bit)
- Cᵢₙ (carry from previous stage)

| A | B | Cᵢₙ | Sum | Cₒᵤₜ |
|:-:|:-:|:---:|:---:|:----:|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

**Formulas**:
- Sum = A ⊕ B ⊕ Cᵢₙ
- Cₒᵤₜ = AB + Cᵢₙ(A ⊕ B)

---

## Building Full Adder from Half Adders

Here's an elegant construction:
1. First half adder: Add A and B → get partial sum and carry₁
2. Second half adder: Add partial sum and Cᵢₙ → get final Sum and carry₂
3. OR the two carries → get Cₒᵤₜ

```
A ──┬───[HA1]───┬───[HA2]─── Sum
B ──┘           │      │
                │      └── carry₂──┐
             carry₁                │ OR ── Cₒᵤₜ
                │                  │
                └──────────────────┘
                      Cᵢₙ ─────────┘
```

---

## N-Bit Ripple Carry Adder

[[visual:v5]]

To add two N-bit numbers, chain N full adders:

```
  A₀ B₀       A₁ B₁       A₂ B₂       A₃ B₃
   │ │         │ │         │ │         │ │
   ▼ ▼         ▼ ▼         ▼ ▼         ▼ ▼
 ┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐
0→ FA₀ │─C──→│ FA₁ │─C──→│ FA₂ │─C──→│ FA₃ │── Cₒᵤₜ
 └──┬──┘     └──┬──┘     └──┬──┘     └──┬──┘
    │           │           │           │
   S₀          S₁          S₂          S₃
```

**Key property**: The carry "ripples" from bit 0 to bit N-1, hence the name.
