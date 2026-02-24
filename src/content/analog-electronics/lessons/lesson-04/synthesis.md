## Connecting the Dots

This lesson took you from a bare transistor to a fully designed amplifier stage. Here's how the concepts link together:

- **Biasing** sets the DC operating point (Q-point) so the transistor stays in the active region
- **Fixed bias** is simple but sensitive to β — a change in transistor or temperature shifts the Q-point
- **Voltage divider bias** with an emitter resistor creates **negative feedback** that stabilises the Q-point against temperature and β variations
- **Load lines** give you a graphical view: the DC load line shows where the Q-point sits; the AC load line shows the signal swing limits
- **The hybrid-π model** replaces the nonlinear transistor with a linear equivalent circuit, unlocking gain calculations using KVL and KCL

The key insight: **biasing is a DC design problem** (set the right currents and voltages with no signal), while **small-signal analysis is an AC problem** (linearise around the Q-point and use superposition). The two are completely separate — solve DC first, then AC.

### What's Next

In Lesson 05, you'll use the hybrid-π model to calculate voltage gain, input impedance, and output impedance for the three BJT amplifier configurations: common emitter, common collector, and common base.
