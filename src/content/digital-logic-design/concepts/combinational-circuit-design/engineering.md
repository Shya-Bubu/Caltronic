# Engineering Combinational Circuits

## Standard Form Implementations

### Two-Level Logic (SOP/POS)

[[visual:v4]]

Standard implementation uses exactly two levels of gates:
1. **Level 1**: AND gates (for minterms) or OR gates (for maxterms)
2. **Level 2**: OR gate (for SOP) or AND gate (for POS)

**Advantage**: Fixed, predictable delay (2 gate delays maximum)

### Circuit Symbol Reference

| Gate Type | Level 1 (SOP) | Level 2 (SOP) |
|-----------|---------------|---------------|
| SOP | AND gates | OR gate |
| POS | OR gates | AND gate |

---

## Minterm and Maxterm Notation

### Minterm Shorthand
Each minterm corresponds to a row number in binary.

For 3 variables (A, B, C):
- m₀ = Ā B̄ C̄ (row 000)
- m₁ = Ā B̄ C (row 001)
- m₃ = Ā B C (row 011)
- m₇ = A B C (row 111)

**Notation**: $f = \sum m(1, 3, 5, 7)$ means output=1 for rows 1, 3, 5, 7.

### Maxterm Shorthand
Maxterms use capital M:
- M₀ = A + B + C (row 000)
- M₇ = Ā + B̄ + C̄ (row 111)

**Notation**: $f = \prod M(0, 2, 4, 6)$ means output=0 for rows 0, 2, 4, 6.

---

## Practical Example: 7-Segment Display Decoder

**Requirement**: Convert 4-bit BCD (0-9) to 7-segment display signals.

### Truth Table (Segment 'a')
| D | C | B | A | a |
|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 1 |
| 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 0 | 1 |
| ... | ... | ... | ... | ... |

### Implementation
IC 74LS47 implements this function with internal don't-care optimization.

---

## Design Considerations

### Gate Fan-In
Maximum number of inputs a gate can have:
- 74LS series: typically 2-8 inputs
- CMOS: virtually unlimited (but slower)

**Solution**: Cascade gates for more inputs
$$\text{8-input AND} = \text{AND}(\text{AND}(A,B,C,D), \text{AND}(E,F,G,H))$$

### Gate Fan-Out
Maximum number of gates one output can drive:
- TTL: ~10 standard loads
- CMOS: Higher (capacitive loading is the limit)

**Solution**: Add buffer gates for high fan-out nodes.

---

## Multi-Output Design

### Shared Product Terms

When designing multiple outputs, look for common terms:

$$Z_1 = ABC + AB\overline{C}$$
$$Z_2 = ABC + \overline{A}BC$$

Shared term: ABC

**Implementation**: Generate ABC once, connect to both outputs.

### Programmable Logic Arrays (PLAs)

PLAs implement multi-output SOP with shared AND plane:
```
     A  B  C  Ā  B̄  C̄
     │  │  │  │  │  │
AND ─┼──┼──┼──┼──┼──┼─── Product terms
     ├──┼──┼──┼──┼──┤
     ├──┼──┼──┼──┼──┤
     │  │  │  │  │  │
OR  ─┴──┴──┴──┴──┴──┴─── Sum outputs
```

---

## Timing Analysis

### Propagation Delay Budget

For a 2-level SOP circuit:
$$T_{total} = T_{NOT} + T_{AND} + T_{OR}$$

Typical values (74LS):
- NOT: 10ns
- AND: 15ns  
- OR: 15ns
- **Total**: ~40ns → Max frequency ≈ 25MHz

### Critical Path

Always identify the longest delay path through the circuit for timing analysis.
