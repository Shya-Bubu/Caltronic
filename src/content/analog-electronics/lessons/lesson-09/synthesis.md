# Synthesis — From MOSFET Switches to Regulated Power Supplies

You've just completed a journey that spans the entire electronics stack — from the simplest transistor switch to the voltage regulator IC that powers every circuit you'll build in the lab. Let's connect everything.

## The Complete Story

$$\text{MOSFET Switch} \xrightarrow{\text{load}} \text{Inverter} \xrightarrow{\text{diodes}} \text{Logic Gates} \xrightarrow{\text{BJT}} \text{DTL} \xrightarrow{\text{cascade}} \text{Fan-out \& Noise} \xrightarrow{\text{memory}} \text{SRAM} \xrightarrow{\text{power}} \text{Regulators}$$

1. **MOSFET Inverter** (Concept 1): A MOSFET with a drain resistor creates a NOT gate. Replacing the resistor with an active MOSFET load ($T_2$ with $V_{GS2} = V_{DS2}$) gives a more integrated inverter analysed with KCL and KVL.

2. **Switching Characteristics** (Concept 2): Parasitic capacitance $C_o$ and ON resistance $R_{sat}$ create charge/discharge time constants. The output voltage settles at $V_{o1} = \frac{R_o}{R_o + R_{sat}} V_{DD}$, not at zero.

3. **Diode Logic** (Concept 3): Diodes modeled with $V_{ON} \approx 0.8V$ form AND gates — but they attenuate signals and can't restore logic levels.

4. **DTL NAND** (Concept 4): Adding a BJT inverter to diode logic creates the DTL NAND gate. A complete DC analysis gives $I_C = 2.182$ mA, $I_B = 0.4$ mA, requiring $h_{FE,\min} \ge 5$.

5. **Fan-Out & Power** (Concept 5): Each load gate sinks $I_L = 0.82$ mA. Fan-out is limited by the saturation condition $I_B > I_C/h_{FE}$. Average power consumption is approximately $9$ mW per gate.

6. **Noise Margins & SRAM** (Concept 6): Logic levels have defined voltage ranges. Noise margins ($NM_H = V_{OH} - V_{IH}$, $NM_L = V_{IL} - V_{OL}$) quantify noise immunity. Cross-coupled BJTs form a bistable SRAM cell where $h_{FE}$ mismatch determines startup state.

7. **Voltage Regulators** (Concept 7): A series-pass transistor regulated by a Zener reference gives $V_o = V_Z - V_{BE,ON}$. Feedback via a second transistor and voltage divider gives adjustable output: $V_o = \frac{V_Z + V_{BE2,ON}}{\beta}$. Standard ICs (7805, 7812, 7815) implement this in a 3-pin package.

## The Key Connections

| From | To | The Link |
|------|------|----------|
| MOSFET inverter | Switching delays | Parasitic $C_o$ limits speed |
| Diode logic | DTL | BJT restores logic levels |
| DTL analysis | Fan-out | $I_B$ budget determines max loads |
| Fan-out | Power consumption | More loads → more supply current |
| Power consumption | Noise margins | Voltage ranges define valid logic |
| Noise margins | SRAM | Bistable circuit stores one bit |
| All digital circuits | Voltage regulators | Every circuit needs a clean $V_{cc}$ |

## The Big Picture

This lesson bridges two worlds:

- **Digital electronics** — where transistors are switches with defined logic levels, fan-out limits, noise margins, and power budgets
- **Power electronics** — where transistors regulate voltage to supply clean, stable DC to those digital circuits

The analysis techniques are the same in both: KVL around loops, KCL at nodes, load lines on characteristics, and checking operating regions (saturation for switches, active region for regulators).

> **You've covered an enormous amount of ground.** From a single MOSFET switch to a complete regulated power supply — these are the circuits that make real electronics work. The DC analysis skills you've practised here will serve you in every course that follows.
