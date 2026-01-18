# Exam Preparation: Arithmetic Adder Circuits

## Key Formulas

| Circuit | Sum | Carry |
|---------|-----|-------|
| Half Adder | S = A ⊕ B | C = AB |
| Full Adder | S = A ⊕ B ⊕ Cᵢₙ | Cₒᵤₜ = AB + Cᵢₙ(A⊕B) |

---

## Common Question Types

### Type 1: Half Adder Output

**Problem**: Find S and C for A=1, B=1

**Solution**:
- S = 1 ⊕ 1 = 0
- C = 1 · 1 = 1

### Type 2: Full Adder Output

**Problem**: Find S and Cₒᵤₜ for A=1, B=0, Cᵢₙ=1

**Solution**:
- S = 1 ⊕ 0 ⊕ 1 = 0
- Cₒᵤₜ = (1·0) + 1·(1⊕0) = 0 + 1·1 = 1

### Type 3: N-bit Adder Design

**Problem**: How many full adders for an 8-bit adder?

**Answer**: 8 full adders (one per bit position)

---

## Practice Problems

1. Design a 3-bit binary adder using full adders.
2. What is the maximum sum for a 4-bit adder (without overflow)?
3. Calculate: 1011 + 0110 using binary addition.
4. How many half adders are needed to make one full adder?

---

## Common Mistakes

1. **Forgetting carry propagation**: Each FA needs previous carry
2. **Wrong full adder formula**: Sum uses XOR, not OR
3. **Overflow confusion**: N-bit + N-bit can produce N+1 bits
