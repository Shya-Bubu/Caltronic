# Exam Guide — Fan-Out and Power Consumption

## What Examiners Ask

### Category 1: Load Current & Fan-Out Calculation (6–10 marks)
- Calculate IL from given Vcc, VCE,sat, VD,ON, and R values
- Derive the fan-out inequality and solve for maximum N
- State the integer constraint on N

**Time allocation:** 10–15 minutes. Show the full derivation.

### Category 2: Power Consumption (6–8 marks)
- Calculate P(0) and P(1) for the DTL gate
- Calculate the average power consumption
- Explain why P(0) > P(1)

**Time allocation:** 8–12 minutes.

### Category 3: Conceptual Questions (3–5 marks)
- Define fan-out
- Explain what limits the fan-out
- Compare DTL power consumption with CMOS

**Time allocation:** 5 minutes.

## Common Mistakes

1. **Forgetting to add the base circuit current IC** — Total collector current is IC(base) + N × IL, not just N × IL
2. **Using a non-integer N** — Fan-out must be a whole number (you can't drive half a gate). Always round down.
3. **Confusing P(0) and P(1)** — P(0) is power when output is LOW (transistor ON, higher power). P(1) is power when output is HIGH (transistor OFF, lower power). Students often mix these up.
4. **Wrong current path for P(1)** — When T is OFF, the current comes through the pull-up resistor and the conducting input diode, not through RC.

## Mark-Winning Tips

- Draw the current flow paths for both logic states before calculating power
- State IL = 0.82 mA, then clearly show the fan-out inequality step by step
- Box your final answers: N, P(0), P(1), Pav
