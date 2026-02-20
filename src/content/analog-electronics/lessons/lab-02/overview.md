# Two Stage Direct Coupled Amplifier Design

> **Why This Matters**: This is your first real analog design challenge — not just analysing a given circuit, but *choosing* every component value yourself to meet a set of specifications. This is exactly what practising engineers do.

You've spent weeks learning how transistors work — their regions, their models, their small-signal parameters. Now you're going to use all of that knowledge to **build something that actually works**.

The circuit you'll design is a **two-stage direct-coupled amplifier** using an NPN transistor (BC549) in the first stage and a PNP transistor (BC556) in the second stage. "Direct-coupled" means there is no capacitor between the two stages — the collector of Q1 connects directly to the base of Q2. This elegant trick means a single biasing network sets the operating point for both transistors simultaneously.

By the end of this lab, you'll be able to:

- Explain why direct coupling with complementary NPN-PNP transistors improves thermal stability
- Derive the AC voltage gain, input impedance, and output impedance from the h-parameter model
- Systematically choose a Q-point that guarantees the required output swing without clipping
- Design all five resistors (Ra, Rb, R1, R2, R3, R4, R5) from the output stage backwards to the input
- Verify your design in LTspice and interpret the Bode plot

The design is part science, part art. The science part — KVL, KCL, h-parameter analysis — gives you the equations. The art part — choosing values within the safe range, balancing trade-offs, picking from the E12 resistor series — is what makes you a designer, not just an analyst. Two engineers given the same specifications will produce different designs, and both can be perfectly valid.

Let's get started.
