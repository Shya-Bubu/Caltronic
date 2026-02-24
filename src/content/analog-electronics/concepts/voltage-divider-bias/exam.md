## Exam Strategy: Voltage Divider Bias

### What Examiners Ask

This is the **most-tested bias circuit** (10-20 marks). Expect a full numerical problem.

### Typical Question Patterns

1. **"Find the Q-point for the given VDB circuit"** (12-15 marks)
   - Step 1: Thévenin equivalent — V_TH and R_TH (3-4 marks)
   - Step 2: KVL on BE loop with Thévenin → I_B formula (3-4 marks)
   - Step 3: I_C = βI_B (1 mark)
   - Step 4: KVL on CE loop → V_CE (2-3 marks)
   - Verify active region (1 mark)
   - State Q = (V_CEQ, I_CQ) (1 mark)

2. **"Explain the role of R_E in bias stabilisation"** (5-8 marks)
   - Describe the negative feedback loop step by step
   - Contrast with fixed bias (no R_E → thermal runaway)
   - State the condition (1+β)R_E >> R_TH for β-independence

3. **"Design a VDB circuit for a given Q-point"** (8-10 marks)
   - Work backwards from I_CQ to choose R_E, R₁, R₂

### Mark Allocation Tips

- **Draw the Thévenin equivalent circuit explicitly** — this typically earns 2 marks
- **Show every KVL step** — don't skip from V_TH to I_B without showing the equation
- **State your approximations**: "Since (1+β)R_E >> R_TH, we can approximate..."
- **Sensible rounding**: 5% resistors mean 3 significant figures is plenty

### Time Guide

- Full Q-point calculation: 10-12 minutes
- Thévenin conversion alone: 3-4 minutes
- Stability explanation: 5-6 minutes

### Common Mistakes That Lose Marks

- Forgetting to use the Thévenin equivalent (trying to solve the divider directly with I_B)
- Using I_C instead of I_E = (1+β)I_B in the R_E voltage drop
- Forgetting to include R_E in the CE loop KVL
- Not verifying the active region assumption
