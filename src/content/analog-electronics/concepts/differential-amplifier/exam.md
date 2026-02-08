# Exam Strategy

## Key Formulas to Memorize

| Formula | Expression |
|---------|------------|
| Differential output | Vo = (R2/R1)(Vi2 - Vi1) |
| Differential gain | AD = Vo/Vd = Vo/(Vi2 - Vi1) |
| Common-mode gain | Acm = 2Vo/(Vi1 + Vi2) |
| CMRR | CMRR = AD/Acm |
| CMRR in dB | CMRR_dB = 20log₁₀(CMRR) |
| Vd | Vd = Vi2 - Vi1 |
| Vcm | Vcm = (Vi1 + Vi2)/2 |

## Common Question Types

### Type 1: Calculate output from differential amp
"Given Vi1 = 2V, Vi2 = 2.1V, R2/R1 = 10, find Vo"

Solution: Vo = 10 × (2.1 - 2) = 10 × 0.1 = 1V

### Type 2: Find CMRR from AD and Acm
"If AD = 50 and Acm = 0.05, what is CMRR?"

Solution: CMRR = 50/0.05 = 1000 = 60 dB

### Type 3: Homework 1 style (with CMRR effects)
"For AD = 100, Vi1 = 950µV, Vi2 = 1050µV, find Vo when CMRR = 100"

Solution:
- Vd = 100µV, Vcm = 1000µV
- Acm = AD/CMRR = 100/100 = 1
- Vo = AD×Vd + Acm×Vcm = 100×100µV + 1×1000µV = 11mV

## Common Mistakes

❌ Forgetting that higher CMRR is better
❌ Confusing Vd and Vcm formulas
❌ Using wrong dB formula (should be 20log₁₀, not 10log₁₀)
❌ Not recognizing when resistors aren't matched

## Quick Reference

| Item | Value |
|------|-------|
| 741 CMRR | ~70-90 dB (3000-30000) |
| Ideal CMRR | ∞ (Acm = 0) |
| Matched resistor condition | R2/R1 = R4/R3 |
