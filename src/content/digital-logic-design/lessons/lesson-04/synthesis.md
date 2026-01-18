# Synthesis: Special Logic Circuits

## The Big Picture

You've now mastered the arithmetic and data selection circuits that form the computational core of digital systems:

```
Numbers → Representation → Arithmetic → Results
              ↓                ↓
        2's Complement    Adder/Subtractor
                               ↓
                              ALU
```

## Key Takeaways

### 1. Adders Are Modular
- **Half adder**: 2 inputs, no carry-in (Sum = A⊕B, Carry = AB)
- **Full adder**: 3 inputs including carry-in
- **N-bit adder**: Chain of N full adders with ripple carry

### 2. Negative Numbers Need Careful Representation
| System | Range (4-bit) | Issues |
|--------|---------------|--------|
| Sign-magnitude | -7 to +7 | Two zeros, complex arithmetic |
| 1's complement | -7 to +7 | Two zeros, end-around carry |
| 2's complement | -8 to +7 | Preferred! One zero, simple arithmetic |

### 3. Subtraction = Addition + Complement
$$A - B = A + (-B) = A + \overline{B} + 1$$

One adder circuit handles both add and subtract!

### 4. Multiplexers Route Data
- 2:1 MUX: 1 select bit, 2 inputs
- 4:1 MUX: 2 select bits, 4 inputs
- MUX can implement ANY Boolean function

## Connecting to What's Next

This foundation prepares you for:
- **Complete ALU Design** — Adding more operations (AND, OR, shift)
- **Sequential Logic** — Registers to store arithmetic results
- **Memory Systems** — Address decoding using decoders
- **CPU Architecture** — Data path and control unit

## Self-Check Questions

1. How many full adders are needed for an 8-bit adder?
2. What's the 2's complement of 0101?
3. How does a 4-bit adder-subtractor use XOR gates?
4. How many select lines does an 8:1 MUX have?
