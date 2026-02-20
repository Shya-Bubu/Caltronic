# Synthesis — Putting the Design Together

You've just walked through the complete design flow for a two-stage direct-coupled amplifier. Let's step back and see the big picture.

## The Design Flow

The key insight is that **you design from the output backwards to the input**. This is counterintuitive — you might expect to start where the signal enters — but the output specifications (voltage swing, load resistance) are what constrain your choices most tightly.

| Step | What You Chose | What Constrained It |
|------|---------------|-------------------|
| **R5** | Emitter resistor of Q2 | Output load — R5 must be small enough relative to RL |
| **VCEQ2** | Q-point voltage of Q2 | Voltage swing — must fit VP on both sides of Q-point |
| **ICQ2** | Q-point current of Q2 | AC load line — VP / (R5 ∥ RL) sets the minimum |
| **R4** | Collector resistor of Q2 | KVL: VCC = ICQ(R4 + R5) + VCEQ |
| **ICQ1** | Q-point current of Q1 | Design choice: IC2 ≈ 10–20 × IC1 |
| **R1, R2** | Stage 1 collector/emitter resistors | KVL on first stage + VCEQ1 |
| **R3** | Emitter degeneration of Q1 | Gain equation: Av = R5 · hfe2 / R3 |
| **Ra, Rb** | Base voltage divider | VB1 and stiff divider condition |

## What the Simulation Teaches You

When you run LTspice and the output isn't exactly 7Vpp or the gain isn't exactly 600 — that's normal. With E12 resistors (5% tolerance), being within ±10% of your target is a successful design. The simulation lets you **tweak** values before building the hardware.

## Connections to Future Topics

- **Feedback amplifiers**: The emitter resistor R3 is actually *series feedback* — it trades gain for stability. You'll formalise this in the feedback lecture.
- **Operational amplifiers**: An op-amp is essentially a refined multi-stage amplifier with very high gain and feedback. This lab builds the intuition for what's inside.
- **Frequency response**: The Bode plot you generate in LTspice shows the amplifier's bandwidth — directly connected to the capacitor coupling and transistor parasitic capacitances you'll study later.

> **You've just designed a real amplifier from scratch.** That's a genuinely significant milestone in your engineering education. The next time you see a circuit, you won't just analyse it — you'll know how to *create* it.
