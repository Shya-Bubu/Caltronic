# Subtractors and ALU

## From Addition to Subtraction

Now that we understand 2's complement, subtraction becomes elegant:

$$A - B = A + (-B) = A + \overline{B} + 1$$

Instead of building a separate subtractor, we can **reuse the adder**!

---

## The Subtraction Trick

To subtract B from A:
1. **Invert B** (one's complement)
2. **Add 1** via carry-in
3. **Add to A** using regular adder

The result is A - B!

---

## Controlled Inverter Using XOR

[[visual:v1]]

XOR has a special property:
- X ⊕ 0 = X (pass through)
- X ⊕ 1 = X̄ (invert)

Use this to build a **controlled inverter**:

```
B ─────┬──[XOR]──── B or B̄
       │
Sub ───┘ (0=add, 1=subtract)
```

When Sub = 0: B passes through unchanged → Addition
When Sub = 1: B inverts → Ready for subtraction

---

## 4-Bit Adder-Subtractor

[[visual:v2]]

One circuit that does BOTH add and subtract:

```
A₃ A₂ A₁ A₀     B₃ B₂ B₁ B₀
│  │  │  │      │  │  │  │
│  │  │  │      ⊕  ⊕  ⊕  ⊕ ←── Sub
│  │  │  │      │  │  │  │
▼  ▼  ▼  ▼      ▼  ▼  ▼  ▼
┌────────────────────────────┐
│     4-Bit Full Adder      │←── Sub (Cin)
└────────────────────────────┘
         │  │  │  │  │
        Cout S₃ S₂ S₁ S₀
```

**Control signal (Sub)**:
- Sub = 0: B passes, Cin = 0 → A + B
- Sub = 1: B inverted, Cin = 1 → A + B̄ + 1 = A - B

---

## Binary Subtraction Example

**Problem**: Calculate 6 - 3 using 4-bit adder-subtractor

**Setup**:
- A = 0110 (+6)
- B = 0011 (+3)
- Sub = 1

**Process**:
1. Invert B: 1100
2. Add 1 (via Cin): effectively +(-3) = 1101
3. Add: 0110 + 1101 = 10011
4. Ignore overflow carry: 0011 = +3 ✓

---

## The Arithmetic Logic Unit (ALU)

[[visual:v3]]

An ALU combines multiple operations in one circuit:
- Addition
- Subtraction
- AND
- OR
- NOT
- Comparison

**Control inputs** select which operation to perform.

```
    A ────────┐
              │
    B ────────┤ ALU ───── Result
              │
  Control ────┘ (selects operation)
```

---

## Simple ALU Operations

| Control | Operation | Output |
|:-------:|-----------|--------|
| 00 | AND | A · B |
| 01 | OR | A + B |
| 10 | Add | A + B |
| 11 | Subtract | A - B |

The ALU is the heart of every processor!
