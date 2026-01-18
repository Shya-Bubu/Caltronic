# Mathematical Analysis: XOR Applications

## Binary Addition Algebra

### Single-Bit Addition
For two bits $A, B \in \{0, 1\}$:

$$Sum = A \oplus B$$
$$Carry = A \cdot B$$

**Proof by enumeration:**
| A | B | A+B (decimal) | Binary | Sum | Carry |
|:-:|:-:|:-------------:|:------:|:---:|:-----:|
| 0 | 0 | 0 | 00 | 0 | 0 |
| 0 | 1 | 1 | 01 | 1 | 0 |
| 1 | 0 | 1 | 01 | 1 | 0 |
| 1 | 1 | 2 | 10 | 0 | 1 |

---

## Full Adder Derivation

Three inputs: A, B, Cᵢₙ

### Sum Function
From the truth table, Sum = 1 for inputs with odd number of 1s:

$$S = A \oplus B \oplus C_{in}$$

**Verification**: XOR of n bits outputs 1 iff odd number of inputs are 1.

### Carry-Out Function
From truth table analysis:
$$C_{out} = AB + AC_{in} + BC_{in} = AB + C_{in}(A + B)$$

Alternative form:
$$C_{out} = AB + C_{in}(A \oplus B)$$

**Derivation**:
- Carry occurs when at least 2 inputs are 1
- $AB$: both A and B are 1
- $C_{in}(A \oplus B)$: carry-in with exactly one of A or B

---

## n-Bit Adder Analysis

### Ripple Carry Propagation
For an n-bit adder:

$$S_i = A_i \oplus B_i \oplus C_i$$
$$C_{i+1} = A_i B_i + C_i(A_i \oplus B_i)$$

**Propagation delay**: 
$$T_{total} = T_{setup} + n \cdot T_{carry}$$

Where $T_{carry}$ is the delay through one carry chain.

### Carry Lookahead (Preview)
Define:
- Generate: $G_i = A_i B_i$ (produces carry)
- Propagate: $P_i = A_i \oplus B_i$ (passes carry)

Then:
$$C_{i+1} = G_i + P_i C_i$$

This can be expanded to eliminate ripple dependency.

---

## Parity Mathematics

### Even Parity Definition
For n-bit data $D = d_{n-1}...d_1 d_0$, parity bit P satisfies:

$$P = d_0 \oplus d_1 \oplus ... \oplus d_{n-1}$$

Such that:
$$d_0 \oplus d_1 \oplus ... \oplus d_{n-1} \oplus P = 0$$

### Error Detection Capability
- **Detects**: Any odd number of bit errors
- **Misses**: Any even number of bit errors

**Probability analysis**: 
If bit error probability is p (small):
- P(1 error detected) = $\binom{n}{1} p^1 (1-p)^{n-1} \approx np$
- P(2 errors missed) = $\binom{n}{2} p^2 (1-p)^{n-2} \approx \frac{n^2 p^2}{2}$

For p << 1, single-bit errors dominate.

---

## Comparator Mathematics

### Equality Comparator
Two n-bit numbers A and B are equal iff all bits match:

$$EQ = \prod_{i=0}^{n-1} (A_i \odot B_i) = \prod_{i=0}^{n-1} \overline{(A_i \oplus B_i)}$$

### Magnitude Comparator
For A > B, find leftmost differing bit where A = 1, B = 0:

$$A > B = A_{n-1}\overline{B_{n-1}} + (A_{n-1} \odot B_{n-1})[A_{n-2}\overline{B_{n-2}} + ...]$$

Recursively:
$$GT_i = A_i \overline{B_i} + (A_i \odot B_i) \cdot GT_{i-1}$$

Where $GT_{-1} = 0$ (base case).

---

## XOR Properties in Cryptography

### One-Time Pad
If K is a random key:
$$C = M \oplus K$$ (encryption)
$$M = C \oplus K$$ (decryption)

**Property**: $M \oplus K \oplus K = M$ (self-inverse)

### Stream Cipher
Key stream $k_0, k_1, k_2, ...$ XORed with plaintext:
$$c_i = m_i \oplus k_i$$

Security depends on key stream randomness.

---

## Hamming Weight and XOR

**Hamming weight** = number of 1s in binary representation

**Property**: 
$$HW(A \oplus B) = \text{number of differing bits between A and B}$$

This is the **Hamming distance** between A and B.

**Application**: Error correction codes (e.g., Hamming codes use XOR to compute syndrome bits).
