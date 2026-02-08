# Exam Strategy

## Pre-Lab 1: What You Must Know

The exam will likely ask you to **derive** the gain formula:
$$A_V = -\frac{R_2}{R_1}$$

### Derivation Checklist (marks often allocated for each step):
1. ☐ State virtual short assumption: V- = V+ = 0 (1-2 marks)
2. ☐ State no current into inputs: I- = 0 (1 mark)
3. ☐ Write KCL at inverting node (2 marks)
4. ☐ Substitute V- = 0 (1 mark)
5. ☐ Solve for Vo/Vi (2 marks)
6. ☐ State the negative sign indicates inversion (1 mark)

## Calculation Problems

**Example**: Design an inverting amplifier with gain = -20 using R1 = 1kΩ.

**Solution**:
$$A_V = -\frac{R_2}{R_1}$$
$$-20 = -\frac{R_2}{1k\Omega}$$
$$R_2 = 20k\Omega$$

**Example 2**: For inverting amp with R1 = 2.2kΩ, R2 = 39kΩ, 1Vpp input:
- Gain = -39k/2.2k = -17.73
- Output = 1V × 17.73 = 17.73Vpp (but check saturation!)
- Since 17.73V > 14V (sat limit), output clips at ±14V

## Common Exam Mistakes

❌ **Forgetting the negative sign** — The inverting amplifier always has negative gain!

❌ **Not checking for saturation** — Always verify |Vo| < Vsat

❌ **Wrong formula for input impedance** — Zin = R1 (NOT high like non-inverting)

## Quick Reference

| Parameter | Formula |
|-----------|---------|
| Voltage Gain | Av = -R2/R1 |
| Input Impedance | Zin = R1 |
| Output Impedance | Zout ≈ 0 |
| Saturation | \|Vo\| < Vsupply - 1V |
| Max input | Vi(max) = Vsat/\|Av\| |
