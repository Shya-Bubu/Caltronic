# Exam Focus — CMOS NAND and NOR Gates

## What Examiners Test
CMOS gate questions are high-value (6–12 marks): circuit design, truth table derivation, and PUN/PDN duality.

## Common Question Types

### Type 1: Draw the CMOS Gate (5–8 marks)
Given a Boolean function, draw the PDN (NMOS) and PUN (PMOS). Use the duality rule: series ↔ parallel.

### Type 2: Truth Table and Function (4–6 marks)
Trace each input combination: which transistors ON/OFF, is PDN or PUN active, what's the output.

### Type 3: NAND vs NOR Preference (3–4 marks)
In CMOS, NAND is preferred because series NMOS is fast (high μn) and parallel PMOS helps offset slow holes. NOR has series PMOS (slow).

### Type 4: Transistor Count (2 marks)
n-input CMOS gate = 2n transistors (n NMOS + n PMOS).

## Common Mistakes
- Swapping PUN and PDN topologies (remember: PUN = dual of PDN)
- Not realising CMOS NAND preference (opposite of NMOS-only logic)
- Forgetting to size series transistors wider for equal rise/fall times
