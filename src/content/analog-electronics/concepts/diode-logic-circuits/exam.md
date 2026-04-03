# Exam Guide — Diode Logic Circuits

## What Examiners Ask

### Category 1: Diode Model & Gate Identification (3–5 marks)
- State the ON voltage of a silicon diode ($V_{ON} \approx 0.8V$)
- Identify the logic function from a circuit diagram (AND or OR)
- State the positive logic convention

**Time allocation:** 3–5 minutes.

### Category 2: Truth Table Construction (4–6 marks)
- Given a diode logic circuit, construct the complete truth table
- Determine which diodes are ON/OFF for each input combination
- Calculate the output voltage for each case

**Time allocation:** 8–10 minutes. Show diode states for every row.

### Category 3: Circuit Analysis (5–8 marks)
- For a specific input combination, draw the equivalent circuit showing ON diodes as voltage sources and OFF diodes as open circuits
- Calculate the output voltage using Ohm's law and KVL
- Determine the current through the pull-up resistor

**Time allocation:** 8–12 minutes.

## Common Mistakes

1. **Wrong diode orientation** — Anodes at output = AND gate. Anodes at inputs = OR gate. Getting this backwards flips the entire truth table.
2. **Forgetting the diode voltage drop** — The output LOW is $\approx 0.8V$, not $0V$. Many students write "output = 0V" which loses marks.
3. **Ignoring which diode is OFF** — When one input is LOW, only that diode conducts. The other diode is reverse-biased because the output is clamped to $0.8V$, which is lower than the HIGH input.
4. **Using $V_\gamma = 0.7V$ instead of $V_{ON} = 0.8V$** — The lecture uses $V_{ON} = V_\gamma + I_D R_f \approx 0.8V$. Be consistent with the lecturer's values.

## Mark-Winning Tips

- Always show the diode equivalent circuit (voltage source + resistance) for ON state, open circuit for OFF state
- Label currents and voltage drops on your circuit diagram
- State your logic convention explicitly: "Using positive logic: LOW = 0V, HIGH = +Vcc"
