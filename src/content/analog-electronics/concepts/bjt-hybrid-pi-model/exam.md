## Exam Strategy: BJT Hybrid-π Model

### What Examiners Ask

This is a **core analytical tool** (8-15 marks). You must know the model and be able to calculate parameters from the Q-point.

### Typical Question Patterns

1. **"Draw the hybrid-π model and label all parameters"** (4-6 marks)
   - Draw r_π between B and E (2 marks)
   - Draw g_m·v_be from C to E as VCCS (2 marks)
   - Label v_be across r_π (1 mark)
   - Optionally include R_out if asked (1 mark)

2. **"Given the Q-point, calculate g_m, r_π, and r_e"** (4-6 marks)
   - g_m = I_CQ / V_T (1-2 marks)
   - r_π = β / g_m or βV_T / I_CQ (1-2 marks)
   - r_e = 1 / g_m or V_T / I_CQ (1-2 marks)

3. **"Explain the simplifications made from the general h-parameter model"** (4-6 marks)
   - State that h_re ≈ 0 (why) and h_oe ≈ 0 (why)
   - Show the resulting simplified model
   - Explain when R_out can be dropped

4. **"Replace the BJT with its hybrid-π model in the given amplifier circuit"** (6-10 marks)
   - Draw the AC equivalent circuit first
   - Replace the BJT with the hybrid-π model
   - This is the starting point for gain/impedance calculations

### Mark Allocation Tips

- **Memorise the three key formulas**: g_m, r_π, r_e — these are always tested
- **Show the relationship** r_π = β·r_e to demonstrate understanding
- **Always state V_T = 26 mV** (at room temperature) before using it
- **Calculate g_m first** — then derive r_π and r_e from it

### Time Guide

- Parameter calculation: 3-4 minutes
- Drawing and labelling the model: 3-4 minutes
- Substituting into a circuit: 5-8 minutes
- Explaining simplifications: 4-5 minutes

### Common Mistakes That Lose Marks

- Confusing r_e (small-signal) with R_E (physical resistor)
- Using the hybrid-π model for DC analysis (it's AC only!)
- Forgetting to find the Q-point first, then calculate g_m
- Writing g_m = V_T/I_CQ instead of I_CQ/V_T (inverted)
