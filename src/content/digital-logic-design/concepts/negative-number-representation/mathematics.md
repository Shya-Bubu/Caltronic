# Mathematical Analysis: Number Representation

## Sign-Magnitude Representation

For an N-bit number $X = x_{N-1}x_{N-2}...x_1x_0$:

$$X = (-1)^{x_{N-1}} \cdot \sum_{i=0}^{N-2} x_i \cdot 2^i$$

**Range**: 
$$-(2^{N-1} - 1) \leq X \leq 2^{N-1} - 1$$

**Problem**: Non-unique zero: +0 = 0000...0, -0 = 1000...0

---

## One's Complement Representation

**Negation operator**: 
$$-X = \overline{X} = 2^N - 1 - X$$

**Value interpretation**:
$$X = \begin{cases} 
\sum_{i=0}^{N-1} x_i \cdot 2^i & \text{if } x_{N-1} = 0 \\
\sum_{i=0}^{N-1} x_i \cdot 2^i - (2^N - 1) & \text{if } x_{N-1} = 1
\end{cases}$$

**Problem**: -0 = 1111...1 ≠ +0 = 0000...0

---

## Two's Complement Representation

**Negation operator**:
$$-X = \overline{X} + 1 = 2^N - X$$

**Value interpretation**:
$$X = -x_{N-1} \cdot 2^{N-1} + \sum_{i=0}^{N-2} x_i \cdot 2^i$$

The MSB has negative weight!

**Example** (4 bits, X = 1011):
$$X = -1 \cdot 8 + 0 \cdot 4 + 1 \cdot 2 + 1 \cdot 1 = -8 + 3 = -5$$

---

## Range Analysis

**Two's complement N-bit range**:
$$-2^{N-1} \leq X \leq 2^{N-1} - 1$$

**Total values**: $2^N$ (exactly matching available bit patterns)

**Unique property**: Only one zero (0000...0)

---

## Proof: Two's Complement Negation

**Theorem**: For any N-bit 2's complement number X, $X + (-X) = 0$ (mod $2^N$).

**Proof**:
$$X + (-X) = X + (\overline{X} + 1)$$
$$= X + (2^N - 1 - X) + 1$$
$$= 2^N$$
$$\equiv 0 \pmod{2^N}$$

The $2^N$ overflows and is discarded, leaving 0. ∎

---

## Addition and Subtraction

**Addition**: Add directly, ignore carry-out
$$A + B = (A + B) \mod 2^N$$

**Subtraction**: 
$$A - B = A + (-B) = A + \overline{B} + 1$$

This allows the same adder hardware for both operations!

---

## Overflow Condition

**Signed overflow** occurs when:
$$\text{sign}(A) = \text{sign}(B) \neq \text{sign}(A + B)$$

**Mathematical test**:
$$\text{Overflow} = (a_{N-1} \cdot b_{N-1} \cdot \overline{s_{N-1}}) + (\overline{a_{N-1}} \cdot \overline{b_{N-1}} \cdot s_{N-1})$$

Or equivalently: $\text{Overflow} = C_{N-1} \oplus C_N$

---

## Sign Extension Theorem

**Theorem**: To extend N-bit $X$ to M bits (M > N) while preserving value, replicate MSB.

**Proof**: For positive X (MSB = 0):
Adding leading zeros doesn't change value.

For negative X (MSB = 1):
$$X_{new} = -2^{M-1} + 2^{M-2} + ... + 2^{N-1} + X_{lower}$$
$$= -2^{M-1} + (2^{M-1} - 2^{N-1}) + X_{lower}$$
$$= -2^{N-1} + X_{lower} = X_{original}$$ ∎

---

## Comparison of Ranges

| N bits | Unsigned | 2's Complement |
|--------|----------|----------------|
| 4 | 0 to 15 | -8 to 7 |
| 8 | 0 to 255 | -128 to 127 |
| 16 | 0 to 65535 | -32768 to 32767 |
