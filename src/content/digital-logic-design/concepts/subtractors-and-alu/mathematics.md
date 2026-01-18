# Mathematical Analysis: Subtraction and ALU

## Subtraction as Addition

**Theorem**: In 2's complement, $A - B = A + \overline{B} + 1$

**Proof**:
$$-B = \overline{B} + 1 \quad \text{(definition of 2's complement)}$$
$$\therefore A - B = A + (-B) = A + \overline{B} + 1$$ ∎

---

## Controlled Complement Function

The XOR-based controlled inverter:

$$f(B, \text{Sub}) = B \oplus \text{Sub}$$

| Sub | B | f(B, Sub) |
|:---:|:-:|:---------:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

When Sub = 0: $f = B$ (identity)
When Sub = 1: $f = \overline{B}$ (complement)

---

## Adder-Subtractor Equations

For N-bit inputs A, B and control signal Sub:

$$B'_i = B_i \oplus \text{Sub}$$
$$C_0 = \text{Sub}$$
$$S_i = A_i \oplus B'_i \oplus C_i$$
$$C_{i+1} = A_i B'_i + C_i(A_i \oplus B'_i)$$

The result S represents:
- $A + B$ when Sub = 0
- $A - B$ when Sub = 1

---

## Overflow Analysis

### Unsigned Subtraction
When A < B (unsigned), the result requires a borrow:
$$\text{Borrow} = \overline{C_{out}}$$

After subtracting: if Cout = 0, borrow occurred.

### Signed Subtraction Overflow

[[visual:v5]]

$$\text{Overflow} = (a_{n-1} \oplus b_{n-1}) \cdot (a_{n-1} \oplus s_{n-1})$$

Or equivalently: $C_{n-1} \oplus C_n$

---

## ALU Function Encoding

An ALU with k control bits can implement up to $2^k$ operations.

### Example: 2-bit Control

| S₁ | S₀ | Operation | Output F |
|:--:|:--:|-----------|----------|
| 0 | 0 | AND | $A \cdot B$ |
| 0 | 1 | OR | $A + B$ |
| 1 | 0 | Add | $A + B$ (arithmetic) |
| 1 | 1 | Subtract | $A - B$ |

---

## ALU Slice Equation

For a 1-bit ALU slice with operations {AND, OR, ADD}:

$$F = S_1'S_0'(A \cdot B) + S_1'S_0(A + B) + S_1(A \oplus B \oplus C_{in})$$

With appropriate multiplexing based on select signals.

---

## Comparator Using Subtraction

To compare A and B, compute A - B and check flags:

| Condition | Flag Test |
|-----------|-----------|
| A = B | Z = 1 |
| A ≠ B | Z = 0 |
| A > B (unsigned) | C = 1, Z = 0 |
| A < B (unsigned) | C = 0 |
| A > B (signed) | N ⊕ V = 0, Z = 0 |
| A < B (signed) | N ⊕ V = 1 |

---

## Gate Complexity

| Component | Gates |
|-----------|-------|
| XOR (controlled invert) | 1 per bit |
| N-bit Full Adder | ~5N |
| 4-operation MUX | ~6 per bit |

**Total 4-bit Adder-Subtractor**: ~4 + 20 = 24 gates
