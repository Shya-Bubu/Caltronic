# Exam Guide — BJT Structure and Models

## How This Topic Appears in Exams

BJT questions are core to analog electronics exams. They test your ability to identify operating modes, apply the correct model, and solve DC bias circuits.

## Typical Question Types

| Type | Marks | Time |
|------|-------|------|
| Determine operating mode from given bias conditions | 4-6 | 5 min |
| DC bias analysis (find I_C, V_CE, I_B) in active mode | 8-12 | 12 min |
| Draw equivalent circuit for each mode | 4-6 | 5 min |
| Explain why back-to-back diodes don't work as a BJT | 3-4 | 3 min |

## Mark-Scoring Tips

1. **Always state your mode assumption explicitly** before solving. Write "Assume active mode" first.
2. **Check your assumption** at the end. Show that V_CE > V_CE,sat for active mode.
3. **Show KCL at the transistor**: I_E = I_C + I_B. Markers award marks for this.

## Common Mistakes

- Assuming saturation without checking (most circuits are designed for active mode)
- Using V_CE,sat = 0V instead of 0.2V in saturation
- Forgetting I_E = I_C + I_B (the three currents are NOT independent)
- Modeling the B-C junction as a short circuit in active mode (it's an OPEN circuit)
