# Exam Patterns — Direct Coupling & Complementary Pairs

## How This Appears in Exams

Direct coupling questions typically appear as **part of a larger amplifier design problem** rather than standalone questions. Expect 3-5 marks focused on:

- Explaining *why* direct coupling is used instead of capacitor coupling (2 marks)
- Identifying the thermal stability advantage of NPN-PNP pairs (2-3 marks)
- Drawing the circuit correctly with all component labels (3-5 marks)

## Common Question Types

| Type | Marks | What They Test |
|------|-------|---------------|
| "State two advantages of direct coupling" | 2 | Recall: no low-frequency cutoff, fewer components |
| "Why is a PNP used in Stage 2?" | 2-3 | Thermal compensation + correct biasing with NPN collector voltage |
| "Explain how the Q-point of Q2 depends on Q1" | 3-4 | Understanding the bias chain: VC1 = VB2 |
| "Draw the complete circuit diagram" | 5 | Accuracy: all resistors, transistor types, coupling capacitors at input/output only |

## Mark Allocation Tips

- Always label **all** resistors (Ra, Rb, R1, R2, R3, R4, R5) — missing labels lose marks
- Clearly show that C_in and C_o exist at input and output, but **no capacitor between stages**
- Specify transistor types (NPN/PNP) — don't assume the examiner knows
- When explaining thermal stability, mention the *mechanism* (opposing drift directions), not just "it's more stable"

## Common Mistakes

1. **Drawing a coupling capacitor between Q1 and Q2** — defeats the entire concept
2. **Using NPN for both stages** — loses the thermal stability advantage and creates biasing issues
3. **Forgetting that VC1 = VB2** — this is the fundamental link in direct coupling
4. **Not mentioning the low-frequency advantage** — direct coupling preserves DC and low-frequency gain
