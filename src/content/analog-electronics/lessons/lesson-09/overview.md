# MOSFET Gates, Digital Logic & Voltage Regulators

Welcome to one of the most practical lessons in the course — where transistors stop being abstract devices and start becoming the building blocks of real digital circuits and power supplies. This lesson takes you on a journey from the MOSFET inverter sitting on your desk to the voltage regulator IC powering every circuit board in your lab.

## What You'll Learn

This lesson covers a remarkably wide range of topics, all connected by a single thread: **how transistors are used as switches in real circuits**.

1. **MOSFET inverter circuits** — You'll start with the most basic NOT gate built from a MOSFET and a drain resistor, then see how replacing that resistor with another MOSFET (an "active load") creates a more practical inverter. Along the way, you'll apply KCL and KVL to analyse the circuit, and use load lines on the $I_D$ vs $V_{DS}$ characteristic to find operating points.

2. **Switching characteristics and delays** — Real circuits don't switch instantaneously. You'll see how parasitic capacitance ($C_o$) and ON resistance ($R_{sat}$) create time constants that govern how fast the output can change, and why open-drain outputs need external pull-up resistors.

3. **Diode logic circuits** — Before transistors, engineers built logic gates from diodes. You'll analyse a 2-input diode AND gate, work through its truth table case by case, and understand why diode logic has limitations that led to the invention of DTL.

4. **Diode-Transistor Logic (DTL) NAND gates** — The DTL NAND gate combines diode logic with a BJT inverter. You'll perform a complete DC analysis: calculating collector current, base current, checking the saturation condition, and finding the minimum $h_{FE}$ required.

5. **Fan-out and power consumption** — How many gates can a single output drive? You'll calculate the fan-out limit, then compute the static power consumption in both logic states. The average power of approximately 9 mW per gate explains why TTL and CMOS eventually replaced DTL.

6. **Noise margins and SRAM cells** — Logic levels need defined voltage ranges, and cascaded circuits need noise immunity. You'll define $V_{OH}$, $V_{OL}$, $V_{IH}$, $V_{IL}$, and calculate noise margins. Then you'll see how cross-coupled BJTs form a bistable flip-flop — the basic SRAM storage cell.

7. **Voltage regulators** — The lesson concludes with power supply design. From the AC mains through a transformer, rectifier, and filter, you'll arrive at the series voltage regulator — first with a Zener reference, then with transistor feedback for improved regulation. You'll meet the 7805, 7812, and 7815 regulator ICs that you'll use in every lab project.

## Why This Matters

These aren't theoretical exercises — every one of these circuits appears in real hardware. The DTL gate analysis teaches you systematic DC analysis of multi-transistor circuits. The fan-out and noise margin calculations are the foundation of digital design rules. And the voltage regulator section connects directly to every lab power supply you'll ever build.

> **This lesson is dense but rewarding.** Each concept builds on the previous one, so take them in order. By the end, you'll have analysed circuits from the gate level all the way to the power supply level — a complete picture of practical electronics.
