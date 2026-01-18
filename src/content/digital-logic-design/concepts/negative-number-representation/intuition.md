# Negative Number Representation

## The Problem: How Do We Represent Negative Numbers?

In the physical world, we use a minus sign: -5. But computers only understand 1s and 0s. How do we encode negativity in binary?

---

## Approach 1: Sign-Magnitude

**Idea**: Use the leftmost bit as a sign indicator.
- MSB = 0 → Positive
- MSB = 1 → Negative

**Example (4 bits)**:
- +5 = 0101
- -5 = 1101

| Decimal | Binary |
|:-------:|:------:|
| +7 | 0111 |
| +0 | 0000 |
| -0 | 1000 |
| -7 | 1111 |

**Range**: -(2ⁿ⁻¹ - 1) to +(2ⁿ⁻¹ - 1)

**Problems**:
1. **Two zeros**: 0000 (+0) and 1000 (-0)
2. **Arithmetic is complicated**: Addition/subtraction need special cases

---

## Approach 2: One's Complement

**Idea**: Represent negative by inverting all bits.

**To negate**: Flip every bit
- +5 = 0101
- -5 = 1010 (flip all bits)

| Decimal | Binary |
|:-------:|:------:|
| +7 | 0111 |
| +0 | 0000 |
| -0 | 1111 |
| -7 | 1000 |

**Range**: Same as sign-magnitude

**Problem**: Still has two zeros (0000 and 1111)

**Quirk**: End-around carry needed for correct addition.

---

## Approach 3: Two's Complement (The Winner!)

[[visual:v1]]

**Idea**: Negate by inverting all bits AND adding 1.

**To negate**: Invert + Add 1
- +5 = 0101
- Invert: 1010
- Add 1: 1011 → This is -5!

| Decimal | 4-bit Binary |
|:-------:|:------------:|
| +7 | 0111 |
| +6 | 0110 |
| ... | ... |
| +1 | 0001 |
| 0 | 0000 |
| -1 | 1111 |
| -2 | 1110 |
| ... | ... |
| -8 | 1000 |

**Range**: -2ⁿ⁻¹ to +(2ⁿ⁻¹ - 1)

For 4 bits: -8 to +7

---

## Why Two's Complement Wins

1. **One zero only**: 0000
2. **Simple arithmetic**: Add normally, ignore overflow carry
3. **Same circuit for add/subtract**: No special cases
4. **Asymmetric range**: One extra negative number (-8 but not +8)

---

## Example: -3 in 2's Complement (4 bits)

1. Start with +3: 0011
2. Invert all bits: 1100
3. Add 1: 1101

**Verify**: 1101 = -3
- Check: 0011 + 1101 = 10000 (ignore carry) = 0000 ✓

---

## Quick Trick: Shortcut for 2's Complement

Instead of inverting all and adding 1:
1. Copy bits from right until first 1 (including that 1)
2. Invert remaining bits

**Example**: +6 = 0110
- Copy rightmost "10": ...10
- Invert left bits: 1010
- Result: 1010 = -6 ✓
