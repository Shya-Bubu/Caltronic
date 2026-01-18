# Engineering: Multiplexer Design and Applications

## Gate-Level 2:1 MUX

[[visual:v2]]

```
         ┌─────┐
X₀ ──────┤ AND ├───┐
    ┌────┤     │   │
    │    └─────┘   │  ┌────┐
 NOT     		   ├──┤ OR ├── Y
    │    ┌─────┐   │  └────┘
    └────┤ AND ├───┘
X₁ ──────┤     │
S ───────┴─────┘
```

**Gate count**: 1 NOT + 2 AND + 1 OR = 4 gates

---

## IC Multiplexers

| IC | Type | Features |
|----|------|----------|
| 74LS157 | Quad 2:1 MUX | 4 separate 2:1 muxes, common select |
| 74LS153 | Dual 4:1 MUX | 2 separate 4:1 muxes |
| 74LS151 | 8:1 MUX | Single 8:1 with complementary outputs |
| 74LS150 | 16:1 MUX | Single 16:1 |

---

## 74LS151 Pinout

```
     ┌─────────────┐
 D3 ─┤ 1       16 ├─ VCC
 D2 ─┤ 2       15 ├─ D4
 D1 ─┤ 3       14 ├─ D5
 D0 ─┤ 4       13 ├─ D6
  Y ─┤ 5       12 ├─ D7
  W ─┤ 6       11 ├─ S0
  E̅ ─┤ 7       10 ├─ S1
GND ─┤ 8        9 ├─ S2
     └─────────────┘
```

- D0-D7: Data inputs
- S0-S2: Select inputs
- Y: Output (active high)
- W: Complementary output
- E̅: Enable (active low)

---

## Function Implementation Using MUX

### Method 1: Full Variable Assignment

For n-variable function, use 2ⁿ:1 MUX:
- Connect all variables to select lines
- Connect 0 or 1 to each data input per truth table

### Method 2: Reduced MUX (n-1 variables)

Use 2^(n-1):1 MUX for n-variable function:
- Use n-1 variables as select lines
- Connect last variable, its complement, 0, or 1 to data inputs

**Example**: 3-variable function with 4:1 MUX

For each select combination (A,B), determine what C does:
| A | B | Data Input |
|:-:|:-:|:----------:|
| 0 | 0 | f(0,0,C) = ? → 0, 1, C, or C̄ |
| 0 | 1 | f(0,1,C) = ? |
| 1 | 0 | f(1,0,C) = ? |
| 1 | 1 | f(1,1,C) = ? |

---

## Minimum MUX Implementation

**Problem**: Implement 3-judge majority (output = 1 if ≥2 inputs are 1) using minimum 2:1 MUX.

**Solution**: Analyze recursively
- Use tree of 2:1 MUX
- Total: 4 MUX minimum

---

## Timing Specifications

Typical 74LS series MUX:
- Propagation delay (select to output): ~20ns
- Propagation delay (data to output): ~15ns
- Enable to output: ~25ns

---

## Applications

1. **Data Routing**: Select which input goes to output
2. **Function Generation**: Implement any truth table
3. **Parallel-to-Serial**: Convert parallel data to serial stream
4. **Time-Division Multiplexing**: Share single line among multiple sources
