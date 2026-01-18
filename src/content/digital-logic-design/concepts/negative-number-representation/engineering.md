# Engineering: Number Representation

## Comparison of Systems

[[visual:v3]]

| System | Range (N bits) | Zeros | Hardware Complexity |
|--------|----------------|-------|---------------------|
| Unsigned | 0 to 2ᴺ-1 | 1 | Simple |
| Sign-Magnitude | -(2ᴺ⁻¹-1) to +(2ᴺ⁻¹-1) | 2 | Complex |
| 1's Complement | -(2ᴺ⁻¹-1) to +(2ᴺ⁻¹-1) | 2 | Medium |
| 2's Complement | -2ᴺ⁻¹ to +(2ᴺ⁻¹-1) | 1 | Simple |

---

## Two's Complement Hardware

### Negation Circuit

```
X ──┬──[NOT]──┬
    │         │
    │    ┌────┘
    │    │  ┌─[+1]── -X
    │    │  │
    └────┴──┘
```

**Components needed**:
- N NOT gates (for inversion)
- N-bit adder (to add 1)

**Simplified**: XOR each bit with 1 (inverts), then add 1 via carry-in.

---

## Sign Detection

[[visual:v2]]

In 2's complement:
- **Positive**: MSB = 0
- **Negative**: MSB = 1

```
Number ─── MSB ─── Sign (0=pos, 1=neg)
```

No complex comparison needed!

---

## Range Calculation

For N-bit 2's complement:
- **Minimum**: -2^(N-1) (e.g., -8 for 4 bits)
- **Maximum**: 2^(N-1) - 1 (e.g., +7 for 4 bits)

| Bits | Range |
|------|-------|
| 4 | -8 to +7 |
| 8 | -128 to +127 |
| 16 | -32768 to +32767 |
| 32 | -2.1B to +2.1B |

---

## Addition Example

**Problem**: Calculate +5 + (-3) using 4-bit 2's complement

**Step 1**: Convert to 2's complement
- +5 = 0101
- -3 = 1101 (invert 0011, add 1)

**Step 2**: Add normally
```
  0101
+ 1101
------
 10010 → Ignore carry → 0010 = +2 ✓
```

---

## Subtraction Using 2's Complement

**A - B = A + (-B) = A + (B̄ + 1)**

```
A ─────────────┐
               │
B ──[NOT]──────┤ Adder ──→ A - B
               │
      1 ───────┘ (Carry-in)
```

The XOR-with-subtract control makes this elegant.

---

## Overflow Detection

Signed overflow occurs when:
- Adding two positives → negative result
- Adding two negatives → positive result

**Hardware detection**:
$$\text{Overflow} = C_{n-1} \oplus C_n$$

Where C_{n-1} is carry into MSB, C_n is carry out of MSB.

---

## Sign Extension

[[visual:v4]]

When promoting N-bit to M-bit (M > N):
- Copy the sign bit (MSB) into all new upper bits

**Example**: 4-bit to 8-bit
- +5 = 0101 → 00000101
- -3 = 1101 → 11111101

This preserves the numerical value!
