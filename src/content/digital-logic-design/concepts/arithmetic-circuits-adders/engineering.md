# Engineering: Arithmetic Adder Circuits

## Half Adder IC Implementation

### Gate-Level Design
```
     A ──┬───────[XOR]──── Sum
         │
     B ──┼───────[AND]──── Carry
         │         │
         └─────────┘
```

**Gate count**: 1 XOR + 1 AND = 2 gates

### K-Map for Half Adder

**Sum K-map**:
```
    AB
Cᵢₙ 00 01 11 10
 0   0  1  0  1
```

**Carry K-map**:
```
    AB
Cᵢₙ 00 01 11 10
 0   0  0  1  0
```

---

## Full Adder Implementation Options

### Option 1: Two Half Adders + OR

[[visual:v4]]

- 2 XOR + 2 AND + 1 OR = 5 gates
- Clear, modular structure

### Option 2: Direct SOP Implementation
From K-map:
- Sum = A'B'Cᵢₙ + A'BCᵢₙ' + AB'Cᵢₙ' + ABCᵢₙ = A ⊕ B ⊕ Cᵢₙ
- Cₒᵤₜ = AB + ACᵢₙ + BCᵢₙ

**Simplified Cₒᵤₜ**: AB + Cᵢₙ(A+B) or AB + Cᵢₙ(A⊕B)

---

## Practical ICs

| IC | Function | Package |
|----|----------|---------|
| 74LS83 | 4-bit binary adder | 16-pin DIP |
| 74LS283 | 4-bit binary adder (fast carry) | 16-pin DIP |
| 74LS183 | Dual full adder | 14-pin DIP |

**74LS283 Pinout**:
- A₁-A₄: First 4-bit input
- B₁-B₄: Second 4-bit input
- C₀: Carry input
- Σ₁-Σ₄: Sum outputs
- C₄: Carry output

---

## Timing Analysis

### Ripple Carry Delay

[[visual:v6]]

For N-bit adder:
$$T_{total} = T_{setup} + N \times T_{carry}$$

**Example** (74LS283):
- Single stage: ~15ns
- 4-bit adder: ~40ns
- 16-bit (4 cascaded): ~100ns

### Speed vs. Area Trade-off

| Architecture | Delay | Gate Count |
|--------------|-------|------------|
| Ripple Carry | O(N) | O(N) |
| Carry Lookahead | O(log N) | O(N log N) |
| Carry Select | O(√N) | O(2N) |

---

## Cascading for Larger Widths

### 8-bit Adder from Two 4-bit Adders

```
   A₇-A₄  B₇-B₄         A₃-A₀  B₃-B₀
      │     │              │     │
      ▼     ▼              ▼     ▼
   ┌─────────┐          ┌─────────┐
   │ 74LS283 │←── C₄ ←──│ 74LS283 │←── C₀=0
   └────┬────┘          └────┬────┘
        │                    │
     Σ₇-Σ₄               Σ₃-Σ₀
```

The carry-out of the lower adder feeds the carry-in of the upper adder.

---

## Design Exercise: 3-Bit Adder

Adding A (1st bit), B (2nd bit), C (3rd bit):

Total = A + B + C (range: 0 to 3)

Requires:
- 2-bit output: S₁S₀
- Formula: S₁S₀ = sum of three bits

Implementation: Chain a half adder and full adder appropriately.
