# Engineering Application

> **Practical Focus**: Setting up measurements and interpreting real laboratory data.

## Laboratory V-I Measurement Setup

<!-- DIAGRAM: diag-engineering-01 -->

To experimentally verify Ohm's law, you need a systematic measurement approach:

**Equipment Required**:
- Variable DC power supply (0-30V)
- Digital multimeter (DMM) for voltage
- Digital multimeter for current (or ammeter)
- Resistor under test
- Connecting wires

**Circuit Configuration**: The ammeter must be in **series** with the resistor (to measure current flowing through it). The voltmeter must be in **parallel** with the resistor (to measure voltage across it).

> 🤔 **Pause & Reflect**: If you accidentally connect the ammeter in parallel with the resistor, what happens?

<details>
<summary>Click to reveal answer</summary>

**Disaster!** An ammeter has near-zero internal resistance. Connecting it in parallel creates a short circuit:
- Massive current flows through the ammeter
- The ammeter's fuse blows (if you're lucky)
- The ammeter is damaged (if you're not lucky)
- The power supply may shut down or be damaged

**Always double-check your connections before applying power!**

</details>

## Measurement Procedure

**Step 1**: Connect the circuit with power OFF.

**Step 2**: Set power supply to 0V. Turn on and verify 0V output.

**Step 3**: Increase voltage in steps (e.g., 0V, 1V, 2V, 3V, 4V, 5V).

**Step 4**: At each step, record voltage (V) and current (I).

**Step 5**: Calculate R = V/I for each data point.

<!-- DIAGRAM: diag-engineering-02 -->

### Sample Data Table

| Voltage (V) | Current (mA) | Calculated R (kΩ) |
|-------------|--------------|-------------------|
| 0.0 | 0.00 | — |
| 1.0 | 0.99 | 1.01 |
| 2.0 | 1.98 | 1.01 |
| 3.0 | 2.97 | 1.01 |
| 4.0 | 3.96 | 1.01 |
| 5.0 | 4.95 | 1.01 |

**Observation**: Calculated R is constant (within measurement error), confirming ohmic behavior. The nominal 1kΩ resistor measures 1.01kΩ — within 5% tolerance.

> 🤔 **Pause & Reflect**: The first data point (0V, 0mA) is trivial — why include it?

<details>
<summary>Click to reveal answer</summary>

Including the origin (0, 0) point:
1. **Confirms no offset errors** — A faulty ammeter might read non-zero with no current
2. **Verifies equipment zero** — Ensures proper calibration
3. **Establishes theoretical starting point** — V-I curve MUST pass through origin for resistors
4. **Identifies non-ohmic behavior** — Some components don't start at origin (e.g., batteries, Zener diodes in reverse)

</details>

## Graphical Analysis

Plotting V vs I reveals:
- **Linearity**: Points falling on a straight line confirm ohmic behavior
- **Slope = R**: Linear regression gives the resistance value
- **Intercept = 0**: Confirms no offset or bias

**Best-fit line** through the data gives R = 1.01kΩ with R² > 0.999.

## Common Measurement Errors

| Error Type | Cause | Detection | Solution |
|------------|-------|-----------|----------|
| Offset error | Poor meter calibration | Non-zero reading at 0V | Zero meters before measurement |
| Parallax error | Reading at an angle | Inconsistent readings | Read meters straight-on |
| Loading error | Meter draws current | R calculation varies with V | Use high-impedance voltmeter |
| Thermal drift | Resistor heating | R changes during measurement | Use low power, work quickly |

---

*For the formal derivations and proofs, continue to the Mathematics layer.*
