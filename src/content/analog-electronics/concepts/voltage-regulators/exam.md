# Exam Guide — Voltage Regulators

## What Examiners Ask

### Category 1: Block Diagram & Concepts (3–5 marks)
- Draw the power supply block diagram (AC → transformer → rectifier → filter → regulator)
- Explain the purpose of each block
- State why Vin must exceed Vo

**Time allocation:** 5 minutes. Be precise with labels.

### Category 2: Zener Regulator Analysis (6–8 marks)
- Draw the Zener series regulator circuit
- Derive Vo = VZ - VBE,ON using KVL
- Calculate output voltage from given VZ
- Explain how the transistor maintains constant Vo

**Time allocation:** 8–10 minutes.

### Category 3: Feedback Regulator (8–12 marks)
- Draw the feedback series regulator with T1, T2, voltage divider, and Zener
- Derive Vo = (VZ + VBE2,ON) / β
- Explain the perturbation analysis: how ΔVin is compensated
- Calculate Vo for given R1, R2, VZ values

**Time allocation:** 12–15 minutes. This is the most detailed derivation question.

### Category 4: Practical Questions (3–5 marks)
- List standard 78xx IC types and their output voltages
- Calculate power dissipation in the regulator
- Explain why heat sinks are needed

**Time allocation:** 5 minutes.

## Common Mistakes

1. **Getting the KVL loop wrong** — For the Zener: VZ = Vo + VBE (not VZ = Vo - VBE). For feedback: VZ + VBE2 = βVo (not VZ - VBE2 = βVo).
2. **Forgetting β < 1** — The voltage divider fraction is β = R1/(R1+R2) < 1, so Vo > VZ + VBE2.
3. **Confusing the two transistors** — T1 is the series-pass transistor (in the current path). T2 is the feedback/error amplifier (in the active region).
4. **Wrong power loss formula** — Ploss = Io × (Vin - Vo) = Io × VCE. Not Ploss = Vo × Io (that's the useful output power).

## Mark-Winning Tips

- Draw the complete circuit before attempting any calculation
- Label all currents (I, IZ, IB, IC, Io) and voltages (Vin, Vo, VCE, VZ, VBE)
- For the feedback regulator, trace the entire feedback loop step by step
- State T2 operates in the active region (not saturation)
