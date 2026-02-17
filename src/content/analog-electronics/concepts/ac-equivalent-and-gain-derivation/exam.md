# Exam Patterns — AC Equivalent & Gain Derivation

## How This Appears in Exams

This is the **most frequently examined topic** in multi-stage amplifier design. Expect 10-15 marks dedicated to AC analysis. You will typically be asked to:

- Draw the AC equivalent circuit (5 marks)
- Derive the voltage gain expression (5-7 marks)
- Calculate Zin or Zout (3-5 marks)
- Justify which approximations are valid (2-3 marks)

## Common Question Types

| Type | Marks | What They Test |
|------|-------|---------------|
| "Draw the AC small-signal equivalent" | 5 | Replacing VCC with short, capacitors with shorts, transistors with h-model |
| "Derive Av in terms of h-parameters and resistors" | 5-7 | Step-by-step derivation using KVL/KCL on the AC equivalent |
| "State and justify any approximations used" | 2-3 | Knowing the 10× rule and checking if ratios satisfy it |
| "Calculate the input impedance" | 3-5 | Parallel combination of bias network and transistor input |
| "Why is the actual gain less than the simplified formula?" | 2 | Loading effect of hie2 on stage 1 |

## Mark Allocation Tips

- Always **state the approximation before using it** (e.g., "Since R2/R3 = 22 >> 10, we approximate R2∥R3 ≈ R3")
- Show the **general expression first**, then substitute numbers
- Make sure units are consistent (kΩ vs Ω) throughout
- For Zin calculations, draw a clear parallel combination diagram

## Common Mistakes

1. **Forgetting to short VCC to ground** — this is the first step in AC analysis
2. **Drawing hoe in the model** — it can be ignored when 1/hoe >> load
3. **Claiming R1 >> hie2** — this ratio is only ~1.1, so this approximation is NOT valid
4. **Getting the sign of gain wrong** — the NPN-PNP cascade has specific inversion properties
5. **Ignoring the voltage divider (Ra∥Rb)** in Zin calculation
