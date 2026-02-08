# Exam Strategy

## Key Formula
$$V_o = -\left(\frac{R_f}{R_1}V_1 + \frac{R_f}{R_2}V_2 + ...\right)$$

Or with gains: $V_o = -(A_1V_1 + A_2V_2 + ...)$ where $A_n = R_f/R_n$

## Common Question Types

### Type 1: Calculate output
"Given R1 = 10kΩ, R2 = 20kΩ, Rf = 40kΩ, V1 = 1V, V2 = 2V, find Vo"

Solution:
- A1 = 40k/10k = 4
- A2 = 40k/20k = 2
- Vo = -(4×1 + 2×2) = -(4 + 4) = **-8V**

### Type 2: Design problem
"Design a summing amp where Vo = -(3V1 + 5V2). Use Rf = 15kΩ."

Solution:
- A1 = 3 → R1 = Rf/A1 = 15k/3 = **5kΩ**
- A2 = 5 → R2 = Rf/A2 = 15k/5 = **3kΩ**

### Type 3: Special case - averaging
"For a 4-input summing amp with all equal resistors R, what is Vo?"

Solution: $V_o = -(V_1 + V_2 + V_3 + V_4)$

For true averaging (divide by 4): need Rf = R/4

## Common Mistakes

❌ Forgetting the negative sign (all inputs are inverted)
❌ Using wrong formula (Rf/Rn, not Rn/Rf)
❌ Not checking for saturation with large gains

## Quick Reference

| Parameter | Formula |
|-----------|---------|
| Individual gain | An = Rf/Rn |
| Total output | Vo = -Σ(AnVn) |
| Unity gain summing | All R equal |
