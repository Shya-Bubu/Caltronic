# Exam Guide — Dependent Sources

## How This Topic Appears in Exams

Dependent sources appear in two forms: (1) standalone questions testing identification and circuit solving, and (2) as part of transistor small-signal analysis where equivalent circuits contain dependent sources.

## Typical Question Types

| Type | Marks | Time |
|------|-------|------|
| Identify dependent source type from a circuit diagram | 2-3 | 2 min |
| Find output voltage/current in a circuit with one dependent source | 6-8 | 8 min |
| Match transistor type to dependent source type | 3-4 | 3 min |
| Determine units of proportionality constants | 2-3 | 2 min |

## Mark-Scoring Tips

1. **State the type explicitly** (VCVS, VCCS, CCCS, CCVS) — don't just say "dependent source."
2. **Write the dependency equation first** ($I_2 = \beta I_1$, etc.) before substituting into KVL/KCL.
3. **Never turn off a dependent source** during superposition — this is a classic error.

## Common Mistakes

- Applying superposition by setting a dependent source to zero
- Confusing transconductance $(G_m$, units: S) with voltage gain ($\mu$, dimensionless)
- Drawing a dependent source with a circle instead of a diamond
- Forgetting that the control variable and output variable are at different ports
