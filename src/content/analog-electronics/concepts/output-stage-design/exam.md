# Exam Patterns — Output Stage Design

## How This Appears in Exams

Output stage design questions typically carry 8-12 marks and require you to:

- Determine R5 and justify the choice (3 marks)
- Calculate R4 using KVL (3-4 marks)
- Find the exact ICQ and verify power dissipation (2-3 marks)
- Verify the available output swing on the AC load line (3 marks)

## Common Question Types

| Type | Marks | What They Test |
|------|-------|---------------|
| "Choose R5 and justify" | 3 | Understanding stiff output / load independence |
| "Find R4 using KVL" | 3-4 | KVL: VCC = ICQ(R4+R5) + VCEQ |
| "Verify that ICQ is sufficient for the output swing" | 3 | ICQ > Vp/(R5∥RL) |
| "Calculate VB2" | 2-3 | This links Stage 2 to Stage 1 |
| "Check power dissipation" | 2 | P = VCEQ × ICQ < 500mW |

## Mark Allocation Tips

- Always state the **E12 value** you pick and the nearest alternatives
- Show the KVL equation **before** substituting numbers
- When calculating VB2, explain why it matters (it's the collector voltage that Stage 1 must provide)

## Common Mistakes

1. **Using ICQ directly from the Q-point spec without checking against E12 resistors** — the actual ICQ changes when you round R4 to E12
2. **Forgetting VBE in the VB2 calculation** — VB2 depends on both the collector current through R4 AND VBE
3. **Not checking power dissipation** — always verify P = VCEQ × ICQ < 500mW
4. **Confusing R4 position** — R4 is in the collector path (between VCC and collector for PNP)
