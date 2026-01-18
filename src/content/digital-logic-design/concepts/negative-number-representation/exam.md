# Exam Preparation: Negative Number Representation

## Key Formulas

| System | Negation | Range (N bits) |
|--------|----------|----------------|
| Sign-Magnitude | Flip MSB | -(2^(N-1)-1) to +(2^(N-1)-1) |
| 1's Complement | Flip all bits | -(2^(N-1)-1) to +(2^(N-1)-1) |
| 2's Complement | Flip all + add 1 | -2^(N-1) to +(2^(N-1)-1) |

---

## Common Question Types

### Type 1: Convert to 2's Complement

**Problem**: Represent -5 in 4-bit 2's complement

**Solution**:
1. +5 = 0101
2. Invert: 1010
3. Add 1: 1011

**Answer**: 1011

### Type 2: Find 2's Complement Value

**Problem**: What decimal does 1101 represent in 2's complement?

**Solution**:
MSB = 1 → negative
Value = -8 + 4 + 0 + 1 = -3

### Type 3: Addition

**Problem**: Compute 5 + (-3) in 4-bit 2's complement

**Solution**:
0101 + 1101 = 10010 → ignore carry → 0010 = +2 ✓

---

## Practice Problems

1. Find the 2's complement of 0110 (4 bits)
2. What is the range of 8-bit 2's complement?
3. Why does 2's complement have asymmetric range?
4. Convert 1000 from 2's complement to decimal

---

## Common Mistakes

1. **Forgetting +1**: 1's complement ≠ 2's complement
2. **Wrong range**: 4-bit goes to -8, not -7
3. **Overflow**: 127 + 1 = -128 in 8-bit signed!
