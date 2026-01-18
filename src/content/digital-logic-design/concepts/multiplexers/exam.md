# Exam Preparation: Multiplexers

## Key Formulas

**2:1 MUX**: $Y = \overline{S}X_0 + SX_1$

**4:1 MUX**: $Y = \overline{S_1}\overline{S_0}X_0 + \overline{S_1}S_0X_1 + S_1\overline{S_0}X_2 + S_1S_0X_3$

**Select lines for N:1 MUX**: log₂(N)

---

## Common Question Types

### Type 1: MUX Output

**Problem**: 4:1 MUX with X₀=1, X₁=0, X₂=1, X₃=0, S₁=1, S₀=0

**Solution**: S₁S₀ = 10 = 2, so Y = X₂ = 1

### Type 2: Function Implementation

**Problem**: Implement Y = A ⊕ B using 4:1 MUX

**Solution**:
- S₁=A, S₀=B
- Truth table: 00→0, 01→1, 10→1, 11→0
- Connect: X₀=0, X₁=1, X₂=1, X₃=0

---

## Practice Problems

1. How many select lines for 16:1 MUX?
2. Implement 3-input majority using 4:1 MUX.
3. Build 8:1 from two 4:1 MUX.
