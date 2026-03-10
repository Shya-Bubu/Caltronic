# MOSFET Fundamentals & MOS Logic Families

Welcome to the world of MOSFETs — the most important electronic device ever invented. Every smartphone, every computer, every digital system you've ever used runs on billions of these tiny transistors. If the BJT is the workhorse of analog circuit design, the MOSFET is the engine of the entire digital revolution.

But here's the thing: **understanding MOSFETs starts with understanding their physical structure**. Unlike the BJT, where current flows through a sandwich of semiconductor materials, the MOSFET works by creating a conductive channel using an electric field — no current flows into the control terminal at all.

## What You'll Learn

This lesson builds your MOSFET knowledge from the ground up — literally from the silicon wafer:

1. **What a MOSFET is and how it's built** — You'll see the four-terminal structure (Gate, Drain, Source, Body), the thin oxide layer that makes it all work, and why the metal-oxide-semiconductor sandwich is such a brilliant piece of engineering.

2. **How the N-channel enhancement MOSFET operates** — Apply a voltage to the gate, and a conductive channel appears between drain and source. You'll understand exactly why this happens at the physics level, and what the threshold voltage $V_T$ means.

3. **The P-channel enhancement MOSFET** — The complement of the NMOS. Everything works in reverse: negative gate voltage, hole conduction, p-type channel in an n-type substrate.

4. **Depletion-mode MOSFETs** — These are "normally ON" devices with a pre-built channel. You need to apply a voltage to turn them OFF — the exact opposite of enhancement-mode devices.

5. **MOS inverter circuits** — Your first MOSFET circuit. Instead of using a resistor as a load (which wastes chip area), you'll see how another MOSFET acts as the load — either in enhancement or depletion mode.

6. **NMOS NOR and NAND gates** — How to build logic gates from transistors. NOR uses parallel drivers, NAND uses series drivers. You'll analyse the truth tables and understand why.

7. **The CMOS inverter** — The circuit that changed everything. By pairing an NMOS and a PMOS transistor, you get an inverter with essentially zero static power consumption. This is why your phone battery lasts all day.

8. **CMOS NAND and NOR gates** — The building blocks of every modern processor. NMOS drivers in series with PMOS loads in parallel give you NAND; swap the arrangement for NOR.

## Why This Matters

The MOSFET is not an alternative to the BJT — it's a completely different beast with different strengths. While BJTs excel in analog amplification (as you saw in previous lessons), MOSFETs dominate digital logic because of three killer advantages: **zero gate current** (high input impedance), **small physical size** (billions fit on a single chip), and **low power consumption** (especially in CMOS configuration).

By the end of this lesson, you'll understand not just how individual MOSFETs work, but how they're combined to build the logic gates that form the foundation of every digital system.

> **Take your time with the structure concepts.** The physics of channel formation might feel abstract at first, but once it clicks, everything else — from inverters to CMOS gates — follows naturally.
