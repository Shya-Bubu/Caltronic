# Exam Strategy

## Pre-Lab 2: Key Derivation

The exam may ask you to derive: **Av = 1 + R2/R1**

### Marks Allocation:
1. State V+ = Vi (signal at non-inverting input) [1 mark]
2. Identify R1, R2 as voltage divider [1 mark]
3. Write V- = Vo × R1/(R1+R2) [2 marks]
4. Apply virtual short: V- = V+ [1 mark]
5. Substitute and solve for Vo/Vi [2 marks]
6. Simplify to 1 + R2/R1 [1 mark]

## Comparison Questions

Exams often ask you to compare inverting and non-inverting amplifiers:

| Property | Inverting | Non-Inverting |
|----------|-----------|---------------|
| Gain formula | -R2/R1 | 1 + R2/R1 |
| Phase | 180° (inverted) | 0° (in-phase) |
| Input Z | R1 (low) | ≈ ∞ (very high) |
| Min gain | 0 (when R2=0) | 1 |
| Signal input | Inverting (-) | Non-inverting (+) |

## Unity-Gain Buffer

Know this special case:
- R2 = 0, R1 = open circuit
- Av = 1 (unity gain)
- Used for impedance matching
- Also called "voltage follower"

## Common Mistakes

❌ Writing Av = R2/R1 (forgetting the +1)
❌ Saying gain can be less than 1
❌ Confusing which input receives the signal
❌ Stating input impedance = R1 (that's for inverting!)

## Quick Reference

| Parameter | Formula |
|-----------|---------|
| Voltage Gain | Av = 1 + R2/R1 |
| Minimum Gain | Av,min = 1 |
| Input Impedance | Zin ≈ ∞ |
| Output Impedance | Zout ≈ 0 |
