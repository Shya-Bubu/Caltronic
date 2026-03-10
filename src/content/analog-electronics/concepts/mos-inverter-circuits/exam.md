# Exam Focus — MOS Inverter Circuits

## What Examiners Test
MOS inverter questions focus on circuit analysis (5–8 marks) and comparing load types (3–5 marks).

## Common Question Types

### Type 1: Analyse Inverter Operation (5–8 marks)
Given the circuit with component values, determine output for high/low input. Show which transistor is ON/OFF and trace the current path.

### Type 2: Enhancement vs Depletion Load (4–6 marks)
Compare output swing, gain, and power. Key point: enhancement load gives Vout(HIGH) = VDD − VT (degraded), depletion gives full VDD.

### Type 3: Explain Static Power Dissipation (3 marks)
When output is LOW, current flows VDD → load → driver → GND. Power = VDD × IDS wasted as heat.

## Common Mistakes
- Forgetting that enhancement load output doesn't reach full VDD
- Not explaining WHY depletion load achieves full swing (Vgs = 0, always ON)
- Confusing driver and load transistors
