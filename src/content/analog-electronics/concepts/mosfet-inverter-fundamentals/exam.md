# Exam Guide — MOSFET Inverter Fundamentals

## What Examiners Ask

MOSFET inverter questions typically fall into three categories:

### Category 1: Circuit Identification & Truth Tables (2–4 marks)
- Draw or identify the resistive-load MOSFET inverter
- Write the truth table showing input/output logic levels
- State the condition for the MOSFET to turn ON ($V_{GS} > V_{Th}$)

**Time allocation:** 3–5 minutes. These are recall questions — be precise with terminal labels.

### Category 2: Active-Load Inverter Analysis (6–10 marks)
- Apply KCL to show $I_{D1} = I_{D2}$
- Apply KVL to derive $V_{DS1} + V_{DS2} = V_{DD}$
- Show that $V_{GS2} = V_{DS2}$ for the gate-drain shorted load
- Sketch the load curve on the $I_D$ vs $V_{DS}$ characteristics
- Identify operating points for given input voltages

**Time allocation:** 10–15 minutes. Show every step of KCL and KVL clearly.

### Category 3: Design Questions (4–6 marks)
- Given $V_{DD}$ and $V_{Th}$, determine the output voltage for a given input
- Explain why a MOSFET load is preferred over a resistor in ICs
- Compare the resistive-load and active-load inverter performance

**Time allocation:** 8–10 minutes.

## Common Mistakes

1. **Forgetting the KCL constraint** — Since $T_1$ and $T_2$ are in series, $I_{D1} = I_{D2}$ always. Students sometimes write separate current equations.
2. **Drawing a straight load line** — The load "line" for an active MOSFET load is a curve, not a straight line. Only a resistor gives a straight load line.
3. **Confusing $V_{GS2} = V_{DS2}$ with $V_{GS1}$** — The constraint $V_{GS2} = V_{DS2}$ applies to the load transistor $T_2$ only, because its gate is tied to its drain.
4. **Ignoring the substrate connection** — In most practical circuits, the substrate is tied to the source. State this assumption explicitly.

## Mark-Winning Tips

- Always label all three terminals (G, D, S) and both voltage drops ($V_{DS1}$, $V_{DS2}$) on your circuit diagram
- Write the KVL equation as $V_{DD} = V_{DS1} + V_{DS2}$ and the KCL equation as $I_{D1} = I_{D2}$ before doing anything else
- When sketching load curves, show at least 3–4 $V_{GS}$ curves for the driver and mark their intersections with the load curve
