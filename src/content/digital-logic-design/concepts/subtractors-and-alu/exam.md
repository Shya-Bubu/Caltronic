# Exam Preparation: Subtractors and ALU

## Key Formula

$$A - B = A + \overline{B} + 1$$

Using adder with:
- B inverted (XOR with 1)
- Carry-in = 1

---

## Common Question Types

### Type 1: Adder-Subtractor Operation

**Problem**: How does a 4-bit adder-subtractor compute 5 - 3?

**Solution**:
1. A = 0101, B = 0011, Sub = 1
2. B inverted: 1100
3. Add with Cin=1: 0101 + 1100 + 1 = 10010
4. Ignore carry: 0010 = 2 ✓

### Type 2: XOR as Controlled Inverter

**Problem**: What is 1 ⊕ 0 and 1 ⊕ 1?

**Answer**: 
- 1 ⊕ 0 = 1 (pass through)
- 1 ⊕ 1 = 0 (invert)

---

## Practice Problems

1. Design a circuit that subtracts A - B using an adder.
2. What control signals are needed for subtraction?
3. How do you detect signed overflow in A - B?
4. What operation does Sub=1, Cin=1 configure?
