# Exam Guide — DTL NAND Gate

## What Examiners Ask

### Category 1: Circuit Drawing & Function Identification (3–5 marks)
- Draw the complete DTL NAND gate circuit with all component values
- Identify the logic function and write the truth table
- Explain the role of the two series diodes D1 and D2

**Time allocation:** 5–8 minutes.

### Category 2: Complete DC Analysis (8–12 marks)
This is the most common exam question type. You'll be given the circuit and asked to:
- Calculate node voltage VP when all inputs are HIGH
- Calculate I1, I2, IB, and IC
- Verify the saturation condition
- Find the minimum hFE

**Time allocation:** 12–18 minutes. This is worth significant marks — show every step.

### Category 3: Threshold Analysis (4–6 marks)
- Calculate the voltage at the common node when one input is LOW
- Show that this voltage is insufficient to turn ON the transistor
- Calculate the minimum voltage needed: 2Vγ + VBE,ON

**Time allocation:** 5–8 minutes.

## Common Mistakes

1. **Forgetting to subtract I2 from I1** — The base current is IB = I1 - I2, NOT IB = I1. Current I2 flows through RB to ground.
2. **Using wrong VBE** — Use VBE,sat = 0.8V (not 0.7V) when the transistor is in saturation. The lecture is specific about this.
3. **Confusing Vγ with VON** — The cut-in voltage Vγ ≈ 0.6V is used for threshold calculations. The full ON voltage VON ≈ 0.7V is used for node voltage calculations under current flow.
4. **Not checking saturation** — Always verify IB > IC/hFE. State the check explicitly.
5. **Getting VP wrong** — VP = 2 × VD,ON + VBE,sat = 2(0.7) + 0.8 = 2.2V. Not 2(0.8) + 0.8.

## Mark-Winning Tips

- Draw the complete circuit with all values labelled before starting calculations
- Show the KCL equation at the base node: I1 = IB + I2
- State all assumptions: VCE,sat = 0.2V, VBE,sat = 0.8V, VD,ON = 0.7V
- Box your final answers: IC, IB, hFE,min
