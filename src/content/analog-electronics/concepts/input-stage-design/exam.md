# Exam Patterns — Input Stage Design

## How This Appears in Exams

Questions on the input stage design typically carry 10-15 marks:

- Calculate R1+R2 from KVL (3 marks)
- Find R3 from the gain specification (3 marks)
- Design the Ra/Rb voltage divider (5 marks)
- Verify the design by computing actual Q-points (3-5 marks)

## Common Question Types

| Type | Marks | What They Test |
|------|-------|---------------|
| "Find R1 and R2" | 3-4 | KVL: VCC = ICQ1(R1+R2) + VCEQ1 |
| "Design a bias network for VB1 = 5V" | 5 | Voltage ratio and stiffness conditions |
| "What R3 gives Av = 600?" | 3 | Gain equation: R3 = hfe2×R5/Av |
| "Compare target vs actual Q-points" | 3-5 | Substituting E12 values and verifying within tolerance |

## Mark Allocation Tips

- Show **both conditions** for the voltage divider (ratio AND stiffness)
- When verifying, compute **all** node voltages, not just VB1
- State the **E12 value chosen** and its deviation from the calculated value

## Common Mistakes

1. **Forgetting R3 in the VB1 calculation** — VB1 = VBE + IE(R2 + R3), not just VBE + IE×R2
2. **Making the voltage divider too stiff** (Ra, Rb too small) — wastes current and loads the supply
3. **Not checking the stiffness condition** — Idivider must be >> IBQ1
4. **Using the wrong gain formula** — Av = hfe2×R5/R3, not hfe1×R1/R3
