# Exam Preparation: XOR Applications

## Key Circuits to Know

### Half Adder
- Sum = A ⊕ B
- Carry = A · B
- 2 gates total

### Full Adder
- Sum = A ⊕ B ⊕ Cᵢₙ
- Cₒᵤₜ = AB + Cᵢₙ(A ⊕ B)
- Can be built from 2 half adders + 1 OR

---

## Common Question Types

### Type 1: Adder Analysis

**Problem**: What are the sum and carry outputs when A=1, B=1 in a half adder?

**Solution**:
- Sum = 1 ⊕ 1 = 0
- Carry = 1 · 1 = 1

**Answer**: S=0, C=1 (represents 10 in binary = 2 in decimal)

### Type 2: Parity Calculation

**Problem**: Calculate even parity for data 1011.

**Solution**:
- Count 1s: three (odd)
- Parity bit = 1 (to make total even)
- **Check**: 1⊕0⊕1⊕1⊕1 = 0 ✓

**Answer**: Parity bit = 1

### Type 3: Full Adder Truth Table

Complete this row: A=1, B=0, Cᵢₙ=1

| A | B | Cᵢₙ | Sum | Cₒᵤₜ |
|:-:|:-:|:---:|:---:|:----:|
| 1 | 0 | 1 | ? | ? |

**Solution**:
- Sum = 1 ⊕ 0 ⊕ 1 = 0
- Cₒᵤₜ = (1·0) + 1·(1⊕0) = 0 + 1·1 = 1

**Answer**: S=0, Cₒᵤₜ=1

---

## Formulas to Memorize

| Circuit | Sum/Output | Carry |
|---------|------------|-------|
| Half Adder | A ⊕ B | A · B |
| Full Adder | A ⊕ B ⊕ Cᵢₙ | AB + Cᵢₙ(A⊕B) |
| Parity (n bits) | XOR all bits | N/A |
| Equality | A ⊙ B (XNOR) | N/A |

---

## Practice Problems

1. Design a 2-bit equality comparator using only XOR and AND gates.

2. What is the worst-case delay in an 8-bit ripple carry adder?

3. If parity check gives result 1, what does it indicate?

4. How many half adders are needed to build one full adder?

5. Calculate: 1011 + 0110 using binary addition (show carries).

---

## Common Mistakes

1. **Forgetting carry-in**: Full adder has 3 inputs, not 2
2. **Parity confusion**: Even parity = even total 1s INCLUDING parity bit
3. **XOR vs AND**: Sum uses XOR, Carry uses AND (and more for full adder)
4. **Ripple delay**: Carry propagates through ALL stages
