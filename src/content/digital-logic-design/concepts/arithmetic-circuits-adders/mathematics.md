# Mathematical Analysis: Adder Circuits

## Half Adder Equations

For two bits A, B ∈ {0, 1}:

$$S = A \oplus B$$
$$C_0 = A \cdot B$$

**Proof of correctness**: 
The arithmetic sum A + B ∈ {0, 1, 2} which in 2-bit binary is {00, 01, 10}.
- C₀ is the 2¹ bit, S is the 2⁰ bit
- Verification: 1 + 1 = 2 = 10₂ → S=0, C₀=1 ✓

---

## Full Adder Equations

For three bits A, B, Cᵢₙ ∈ {0, 1}:

$$S = A \oplus B \oplus C_{in}$$
$$C_{out} = AB + C_{in}(A \oplus B)$$

### Alternative Forms for Cₒᵤₜ

**Form 1** (Majority function):
$$C_{out} = AB + AC_{in} + BC_{in}$$

**Form 2** (Using XOR):
$$C_{out} = AB + C_{in}(A \oplus B)$$

**Form 3** (Symmetric):
$$C_{out} = AB + BC_{in} + AC_{in} = \text{MAJ}(A, B, C_{in})$$

---

## N-Bit Adder Analysis

For two N-bit unsigned integers:
$$A = \sum_{i=0}^{N-1} a_i \cdot 2^i, \quad B = \sum_{i=0}^{N-1} b_i \cdot 2^i$$

The sum S = A + B requires N+1 bits:
$$S = \sum_{i=0}^{N-1} s_i \cdot 2^i + c_N \cdot 2^N$$

### Carry Recurrence

$$c_0 = 0 \text{ (or external carry-in)}$$
$$s_i = a_i \oplus b_i \oplus c_i$$
$$c_{i+1} = a_i b_i + c_i(a_i \oplus b_i)$$

---

## Integer Representation

### Unsigned N-bit Range
$$0 \leq X \leq 2^N - 1$$

For N = 4: Range is 0 to 15

### Binary Representation
$$X = \sum_{i=0}^{N-1} x_i \cdot 2^i$$

---

## Carry Lookahead Preview

Define:
- **Generate**: $G_i = a_i b_i$ (produces carry regardless of input carry)
- **Propagate**: $P_i = a_i \oplus b_i$ (passes carry through)

Then:
$$c_{i+1} = G_i + P_i \cdot c_i$$

Expanding:
$$c_1 = G_0 + P_0 c_0$$
$$c_2 = G_1 + P_1 G_0 + P_1 P_0 c_0$$
$$c_3 = G_2 + P_2 G_1 + P_2 P_1 G_0 + P_2 P_1 P_0 c_0$$

This eliminates serial dependency → O(log N) delay instead of O(N).

---

## Overflow Detection

For N-bit unsigned addition:
- **Overflow** occurs when result ≥ 2ᴺ
- Detected by: $\text{Overflow} = c_N$ (final carry-out = 1)

For signed addition (2's complement):
- Overflow when adding two positives gives negative, or
- Adding two negatives gives positive
- Detection: $\text{Overflow} = c_{N-1} \oplus c_N$

---

## Gate Complexity

| Circuit | XOR | AND | OR | Total |
|---------|-----|-----|-----|-------|
| Half Adder | 1 | 1 | 0 | 2 |
| Full Adder (2 HA) | 2 | 2 | 1 | 5 |
| N-bit Ripple | 2N | 2N | N | 5N |

**Transistor count** (CMOS):
- XOR: ~8-12 transistors
- Full Adder: ~28 transistors (optimized)
