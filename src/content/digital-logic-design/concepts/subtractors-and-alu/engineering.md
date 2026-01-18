# Engineering: Subtractors and ALU Design

## Adder-Subtractor Implementation

### XOR-Based B Input Control

```
B₀ ──[XOR]──┐
     │      │
     │      ├──► Modified B₀
Sub ─┴──────┘
```

For each bit position, XOR with Sub signal.

### Complete 4-Bit Circuit

**Components**:
- 4 XOR gates (one per B bit)
- 4-bit full adder
- Sub control line connected to all XORs and Cin

**Operation**:
| Sub | Operation | Cin | B Input |
|:---:|-----------|:---:|---------|
| 0 | A + B | 0 | B (unchanged) |
| 1 | A - B | 1 | B̄ (inverted) |

---

## Overflow Detection

### Unsigned Overflow
- Add: Cout = 1
- Subtract: Cout = 0 (borrow occurred)

### Signed Overflow
$$\text{Overflow} = C_{n-1} \oplus C_n$$

Occurs when sign of result is wrong:
- (+) + (+) → (-)
- (-) + (-) → (+)

---

## ALU Design

### Basic 1-Bit ALU Slice

```
A ───┬─────────────────────────────────────┐
     │                                     │
     ├──[AND]──┐                          │
     │         │                          │
B ───┼──[AND]──┘──┬─[MUX]──► Result       │
     │            │    ↑                  │
     ├──[OR]─────┤   Op                  │
     │            │                       │
     ├──[XOR]────┤                       │
     │            │                       │
     └──[Full Adder]──┘                   │
              ↑                            │
             Cin                           │
```

### ALU Control Encoding

| Control[1:0] | Operation |
|:------------:|-----------|
| 00 | AND |
| 01 | OR |
| 10 | Add |
| 11 | Subtract |

---

## Practical ALU ICs

| IC | Description |
|----|-------------|
| 74LS181 | 4-bit ALU with 16 logic + 16 arithmetic functions |
| 74LS381 | 8-function ALU/Function Generator |

**74LS181 Functions** (selected by S₃S₂S₁S₀):
- Arithmetic: A, A+B, A-B, A+1, etc.
- Logic: AND, OR, XOR, NAND, etc.

---

## Cascading ALUs

For 16-bit ALU from 4-bit slices:

```
      A₁₅₋₁₂  B₁₅₋₁₂   A₁₁₋₈  B₁₁₋₈   A₇₋₄  B₇₋₄   A₃₋₀  B₃₋₀
          │     │        │    │       │    │      │    │
          ▼     ▼        ▼    ▼       ▼    ▼      ▼    ▼
       ┌────────┐     ┌────────┐   ┌────────┐  ┌────────┐
Cout ←─┤  ALU3  │←C──┤  ALU2  │←C─┤  ALU1  │←C┤  ALU0  │←Cin
       └───┬────┘     └───┬────┘   └───┬────┘  └───┬────┘
           │              │            │           │
        F₁₅₋₁₂         F₁₁₋₈        F₇₋₄       F₃₋₀
```

Same carry propagation issue as ripple carry adder.

---

## Status Flags

[[visual:v4]]

ALUs typically produce status outputs:

| Flag | Meaning | Detection |
|------|---------|-----------|
| Z (Zero) | Result is 0 | NOR all result bits |
| N (Negative) | Result is negative | MSB of result |
| C (Carry) | Unsigned overflow | Cout |
| V (Overflow) | Signed overflow | Cn-1 ⊕ Cn |
