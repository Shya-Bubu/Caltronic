# Exam Patterns — Small-Signal Worked Example

## How This Topic Appears in Exams

This is the **most frequently examined topic** in BJT small-signal analysis. A full circuit analysis question typically carries 15–25 marks and requires all steps.

## Common Question Types

### Type 1: Full Circuit Analysis (15-25 marks)
"For the given CE amplifier with specified components and h-parameters, find R_in, R_out, A_V, and A_I."

**Step-by-step approach:**
1. Draw AC equivalent circuit (3 marks)
2. Replace BJT with h-parameter model (3 marks)
3. Simplify (justify which h-params to neglect) (2 marks)
4. Use R_E reflection if needed (2 marks)
5. Calculate each quantity (2-3 marks each)

### Type 2: Cross-Configuration (8-10 marks)
"Given CE h-parameters, analyse a common base circuit."

**Key:** Insert the CE model, connect terminals (B, C, E) appropriately, then apply KVL/KCL.

### Type 3: Effect of Load Change (5 marks)
"How does removing R_L affect the voltage gain and current gain?"

## Common Mistakes
1. **Not drawing the AC equivalent first.** Jumping directly to the h-parameter model without showing the AC circuit loses marks.
2. **Forgetting to reflect R_E.** Students try to analyse with R_E in the emitter and get confused.
3. **Wrong current direction for I_L.** Load current flows out; conventional I_2 flows in.
4. **Including R_L in R_out.** By definition, R_out is measured WITHOUT the load connected.

## Time Management
- Full analysis (all 4 quantities): 20 minutes
- AC equivalent + h-parameter model: 5 minutes
- Each quantity calculation: 3-4 minutes
- Sanity check with shortcuts: 1 minute
