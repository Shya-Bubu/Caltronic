# Engineering Applications: XOR and Derived Gates

## Gate Symbols and Pin Diagrams

### XOR Gate
```
X₀ ──╲
      ╲ )___
       ╲    ╲── Z
      ╱ )___╱
X₁ ──╱
```
The curved line before the input distinguishes XOR from OR.

### NAND Gate
```
X₀ ──┐
     │___╲
     │    ╲○── Z
     │___╱
X₁ ──┘
```
AND symbol with inversion bubble (○).

### NOR Gate
```
X₀ ──╲
      ╲___
       ╲   ╲○── Z
      ╱___╱
X₁ ──╱
```
OR symbol with inversion bubble.

---

## NAND as Universal Gate: Building Blocks

### NOT from NAND

[[visual:v4]]

```
X ──┬──┐
    │  │ NAND ── Z = X̄
    └──┘
```
NAND(X, X) = X̄

### AND from NAND

[[visual:v5]]

```
X₀ ──┐              ┌──┐
     │ NAND ────────┤  │
X₁ ──┘              │  │ NAND ── Z = X₀ · X₁
             ┌──────┤  │
             │      └──┘
             │
          (tie both inputs)
```
Two NANDs: NAND(X₀, X₁) → NAND → AND

### OR from NAND
```
X₀ ── NAND(X₀,X₀) ──┐
                    │ NAND ── Z = X₀ + X₁
X₁ ── NAND(X₁,X₁) ──┘
```
Invert each input, then NAND.

---

## Practical IC Packages

| IC Number | Gate Type | Gates per Chip | Package |
|-----------|-----------|----------------|---------|
| 74LS00 | Quad 2-input NAND | 4 | 14-pin DIP |
| 74LS02 | Quad 2-input NOR | 4 | 14-pin DIP |
| 74LS86 | Quad 2-input XOR | 4 | 14-pin DIP |
| 74LS266 | Quad 2-input XNOR | 4 | 14-pin DIP |

**Design Tip**: Using only NAND gates simplifies inventory and manufacturing — one chip type can implement any logic.

---

## XOR Propagation Delay

XOR gates typically have longer propagation delays than basic gates because they're more complex internally:

**Internal XOR implementation:**
$$Z = X_0 \oplus X_1 = \overline{X_0} \cdot X_1 + X_0 \cdot \overline{X_1}$$

This requires:
- 2 NOT gates
- 2 AND gates
- 1 OR gate

Total path: 3 gate delays (vs. 1 for basic AND/OR).

---

## Controlled Inverter Circuit

**Application**: Programmable bit manipulation

```
Control ────┐
            │ XOR ── Output
Data ───────┘
```

| Control | Data | Output |
|:-------:|:----:|:------:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Analysis:**
- Control = 0: Output = Data (pass-through)
- Control = 1: Output = NOT Data (inversion)

This is fundamental in **arithmetic units** for subtraction (complement and add).

---

## CMOS Implementation

Modern CMOS NAND gates use fewer transistors than AND:
- NAND: 4 transistors
- AND: 6 transistors (NAND + inverter)

This is why NAND-based designs are preferred in VLSI — fewer transistors mean:
- Lower power consumption
- Smaller chip area
- Lower cost
