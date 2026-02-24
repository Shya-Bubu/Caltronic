## Exam Strategy: Fixed Bias Circuit

### What Examiners Ask

Fixed bias is a **core numerical problem** (8-15 marks). You'll almost always be asked to calculate the Q-point and/or explain the circuit's limitations.

### Typical Question Patterns

1. **"Calculate the Q-point for the given fixed bias circuit"** (8-12 marks)
   - Step 1: KVL on BE loop → I_B = (V_CC − 0.7)/R₁ (2-3 marks)
   - Step 2: I_C = βI_B (1-2 marks)
   - Step 3: KVL on CE loop → V_CE = V_CC − I_C·R_C (2-3 marks)
   - State Q = (V_CEQ, I_CQ) clearly (1 mark)
   - Verify active region: V_CE > 0.2 V (1 mark)

2. **"Explain the disadvantages of fixed bias"** (4-6 marks)
   - Q-point depends on β (which varies between devices and with temperature)
   - Risk of thermal runaway — describe the feedback loop
   - Compare with voltage divider bias as an improvement

3. **"Design R₁ for a given Q-point"** (4-6 marks)
   - Work backwards from desired I_CQ → I_BQ → R₁
   - Choose nearest standard value

### Mark Allocation Tips

- **Show every KVL equation explicitly** — examiners give marks for the equation, not just the answer
- **Always state assumptions**: "Assuming active region, V_BE = 0.7 V"
- **Verify active region** after calculating — this check is often worth a mark and shows understanding
- **Units matter** — write μA, mA, kΩ consistently; mixed units lose marks

### Time Guide

- Full Q-point calculation from a given circuit: 8-10 minutes
- Explanation of β sensitivity: 4-5 minutes
- Design problem (choose R₁): 5-6 minutes

### Common Mistakes That Lose Marks

- Forgetting to subtract V_BE (using V_CC/R₁ instead of (V_CC − 0.7)/R₁)
- Not checking if V_CE > 0.2 V after calculation (transistor might be in saturation)
- Confusing R₁ (base bias resistor) with R_C (collector load resistor)
- Stating the Q-point as (I_CQ, V_CEQ) instead of the conventional (V_CEQ, I_CQ)
