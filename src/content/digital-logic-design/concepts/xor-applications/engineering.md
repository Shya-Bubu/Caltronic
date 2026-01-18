# Engineering XOR Applications

## Half Adder Circuit Design

### Basic Implementation
```
       ┌─────────────┐
  A ───┤             ├──── Sum (S)
       │   XOR       │
  B ───┤             │
       └─────────────┘
       ┌─────────────┐
  A ───┤             ├──── Carry (C)
       │   AND       │
  B ───┤             │
       └─────────────┘
```

**Equations:**
$$S = A \oplus B$$
$$C = A \cdot B$$

### Gate Count
- 1 XOR gate
- 1 AND gate
- **Total: 2 gates**

---

## Full Adder: Handling Three Inputs

A **full adder** adds three bits: A, B, and **carry-in (Cᵢₙ)**.

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

**Equations:**
$$S = A \oplus B \oplus C_{in}$$
$$C_{out} = AB + C_{in}(A \oplus B)$$

### Full Adder from Two Half Adders

[[visual:v2]]

```
      ┌──────────┐
 A ───┤   Half   ├─── S₁ ───┐
      │  Adder 1 │          │  ┌──────────┐
 B ───┤          ├─── C₁ ───┼──┤   Half   ├─── Sum
      └──────────┘          │  │  Adder 2 │
                     Cᵢₙ ───┴──┤          ├─── C₂
                               └──────────┘
                                     │
                              C₁ ────┤ OR ─── Cₒᵤₜ
                              C₂ ────┘
```

---

## 4-Bit Ripple Carry Adder

[[visual:v3]]

Chain full adders to add multi-bit numbers:

```
  A₀ B₀    A₁ B₁    A₂ B₂    A₃ B₃
   │ │      │ │      │ │      │ │
   ▼ ▼      ▼ ▼      ▼ ▼      ▼ ▼
 ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
 │ FA₀ │──│ FA₁ │──│ FA₂ │──│ FA₃ │── Cₒᵤₜ
 └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘
    │        │        │        │
   S₀       S₁       S₂       S₃
```

**Limitation**: Carry must "ripple" through all stages, causing delay proportional to bit width.

---

## Practical Parity Generator/Checker

### 8-Bit Even Parity Generator

[[visual:v4]]

```
D₀ ──┐
     │ XOR ──┐
D₁ ──┘       │
             │ XOR ──┐
D₂ ──────────┘       │
                     │ XOR ──┐
D₃ ──────────────────┘       │
                             │ XOR ── P (parity bit)
D₄ ──────────────────────────┘
    ... (tree structure continues)
```

**Implementation**: Tree of XOR gates
- Depth: log₂(n) levels for n bits
- Delay: O(log n) gate delays

### IC Package: 74LS280
- 9-bit parity generator/checker
- Single 14-pin DIP package
- Outputs both even and odd parity

---

## Comparator ICs

### 74LS85: 4-Bit Magnitude Comparator
Provides three outputs:
- A > B
- A = B
- A < B

**Cascadable** for larger bit widths using expansion inputs.

### Equality vs. Magnitude
| Type | Gates | Speed | Use |
|------|-------|-------|-----|
| Equality (XNOR chain) | Simple | Fast | Hash comparison |
| Magnitude (74LS85) | Complex | Slower | Sorting, branching |

---

## Design Trade-offs

### Adder Architectures

| Type | Delay | Area | When to Use |
|------|-------|------|-------------|
| Ripple Carry | O(n) | O(n) | Low speed, minimal area |
| Carry Lookahead | O(log n) | O(n log n) | High speed critical |
| Carry Select | O(√n) | O(2n) | Balanced trade-off |

**Rule of thumb**: 
- < 8 bits: Ripple carry is fine
- 16+ bits: Consider lookahead or pipelining
