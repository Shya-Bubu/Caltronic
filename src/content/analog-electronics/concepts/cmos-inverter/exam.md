# Exam Focus — CMOS Inverter

## What Examiners Test
CMOS inverter questions are high-value (6–12 marks): circuit analysis, VTC sketching, power calculation.

## Common Question Types

### Type 1: Analyse CMOS States (4–6 marks)
For each input (HIGH/LOW), determine which transistor is ON/OFF, output voltage, and current flow. Key: always one ON, one OFF → no static current.

### Type 2: Sketch the VTC (3–4 marks)
Show full swing (0 to VDD), sharp transition at ~VDD/2, and label noise margins.

### Type 3: Calculate Dynamic Power (3–4 marks)
P = CL × VDD² × f. Given CL, VDD, and frequency, calculate switching power.

### Type 4: Compare NMOS and CMOS (4–6 marks)
Table: static power, output swing, speed, transistor count.

## Common Mistakes
- Saying CMOS has zero power (it has zero STATIC power, but dynamic power P = CLV²f exists)
- Forgetting that PMOS must be wider than NMOS to match current (due to μp < μn)
- Not explaining the complementary principle (one ON, other OFF)
