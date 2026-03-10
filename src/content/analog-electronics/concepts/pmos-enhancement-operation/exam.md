# Exam Focus — P-Channel Enhancement MOSFET

## What Examiners Test

PMOS questions often appear **combined** with NMOS in comparison tables or as part of CMOS circuit analysis. Standalone PMOS questions are worth 3–6 marks.

## Common Question Types

### Type 1: NMOS vs PMOS Comparison (4–6 marks)
Table comparison is the fastest scoring method. Include: substrate type, source/drain doping, threshold voltage sign, turn-on condition, carrier type, and mobility.

### Type 2: Determine PMOS Operating Region (3–4 marks)
Same logic as NMOS but with absolute values: Check $|V_{GS}| > |V_T|$ first, then compare $|V_{DS}|$ to $|V_{GS}| - |V_T|$.

### Type 3: Why is PMOS slower than NMOS? (2–3 marks)
Answer: Hole mobility ($\mu_p$) is about 2.5× lower than electron mobility ($\mu_n$). Since $K_p = \mu_p C_{ox}' W/L$, PMOS has lower transconductance gain for the same $W/L$, requiring wider transistors to match NMOS performance.

## Common Mistakes
- Using a positive threshold voltage for PMOS ($V_T$ is negative)
- Forgetting that conventional current flows source-to-drain (opposite of NMOS)
- Not noting that PMOS needs to be wider to match NMOS current
