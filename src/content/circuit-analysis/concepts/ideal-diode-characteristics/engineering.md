# Engineering Applications: Ideal Diode and Real Diodes

> How diodes are actually used in power, RF, and digital systems — and when the "ideal" model breaks down.

---

## Rectification: AC to DC Conversion

### Half-Wave Rectifier (1 diode)
Input: 120V RMS AC (170V peak) → Output: DC with 170V peaks, 0V troughs

**Real-world problems:**
- **Voltage drop:** Si diode drops ~0.7V → output is 169.3V peak (0.4% loss)
- **Reverse recovery:** Diode takes ~100ns to switch OFF → ringing at zero-crossing

### Full-Wave Bridge (4 diodes)
**Voltage loss:** Two diodes in series → 1.4V drop (nearly 1% at 170V)

**At lower voltages (e.g., 5V AC):**  
Output should be 7V peak, but actual is 5.6V peak — **20% loss!**

**Solution for low-voltage:** Use Schottky diodes ($V_f \approx 0.3V$)or synchronous rectification (MOSFETs instead of diodes).

---

## Schottky vs. pn-Junction Trade-offs

| Parameter | Si pn-Junction | Schottky |
|-----------|----------------|----------|
| Forward drop | 0.6-0.7V | 0.2-0.4V |
| Reverse recovery | ~100ns | <10ns |
| Reverse leakage | ~nA | ~μA to mA |
| Max reverse voltage | 1000V+ | ~100V typical |

**When to use which:**
- **Power supplies (<100V):** Schottky for efficiency
- **High voltage, high frequency:** Fast-recovery pn-junction
- **Ultra-low leakage:** pn-junction (battery-powered)

**Real example:** Modern laptop chargers (USB-C PD) use Schottky rectifiers for 20V → 5% efficiency gain vs. Si diodes.

---

## Zener Diodes for Voltage Regulation

**The 5V Rail Problem:** You have 12V input, need stable 5V output.

### Simple Zener Regulator
Components: 12V source + series resistor + 5.1V Zener diode

**How it works:**
- Zener operates in reverse breakdown ($V_Z = 5.1V$)
- Series resistor sets current
- Output voltage ≈ $V_Z$ regardless of load (within limits)

**Real limitations:**
1. **Load regulation:** Output changes with load current
2. **Efficiency:** Zener dissipates $(V_{in} - V_Z) \times I_Z$ continuously
3. **Noise:** Zener breakdown is noisy (~100 μV RMS)

**Modern solution:** Linear regulators (LM7805) use Zener reference + transistor buffer → better load regulation, lower noise.

---

## LED Current Control

LEDs are diodes with $V_f \approx 2-3V$ (depends on color).

### Why You Can't Use Just Voltage
**Exponential I-V:** Small voltage change → huge current change

At $V_f = 2.1V$: $I = 10$mA  
At $V_f = 2.15V$: $I = 20$mA (doubled!)

**Temperature effect:** $V_f$ has −2 mV/°C coefficient.  
If LED heats from 25°C to 75°C → $V_f$ drops by 100mV → current increases 2-3× → more heating → thermal runaway!

**Engineering practice:** Always use current limiting:
1. **Series resistor:** $R = (V_{supply} - V_f)/I_{desired}$
2. **Constant-current driver:** Feedback loop maintains fixed current

**High-power LEDs (1W+):** Passive resistor wastes power. Use switching LED driver IC with current feedback.

---

## ESD Protection Diodes

Every IC input pin has **two diodes:**
1. To $V_{DD}$ (protects against overvoltage)
2. To $GND$ (protects against negative spikes)

### How It Works
**Normal operation:** Both diodes reverse-biased → no current  
**ESD event (+8kV):** Top diode forward-conducts → clamps voltage to $V_{DD} + 0.7V$  
**ESD event (−8kV):** Bottom diode forward-conducts → clamps voltage to $-0.7V$

**During soldering:** If you plug in a cable before powering the IC:
- External signal can be 5V
- IC $V_{DD} = 0V$ (unpowered)
- Top diode conducts → **powers the IC through ESD diode!**

This is why some ICs seem to "work" when unpowered — they're parasitically powered through protection diodes.

**Design rule:** Never exceed $V_{DD} + 0.5V$ on any input, even when IC is unpowered.

---

## Reverse Recovery in High-Speed Switching

**The Problem:** Diodes don't turn OFF instantly.

### Charge Storage
When forward-biased, diode has stored charge in depletion region.  
When you reverse-bias it, this charge must be **removed** before diode blocks.

**Reverse recovery time** $t_{rr}$: 10ns (fast) to 500ns (standard rectifier)

### Consequence in Buck Converter
Freewheeling diode: When switch turns ON, diode must turn OFF.  
If $t_{rr} = 100ns$ and switch turns ON in 10ns → **diode conducts in reverse momentarily** → high current spike → EMI, losses.

**Solutions:**
1. **Schottky diodes:** No charge storage, $t_{rr} < 10ns$
2. **Synchronous rectification:** Replace diode with MOSFET (no recovery time)

---

## Tunnel Diode Negative Resistance

**I-V Curve:** Current increases, then **decreases**, then increases again (N-shape).

### Negative Resistance Region
$dI/dV < 0$ → acts like **negative resistor** $R_{neg} \approx -50\Omega$ to $-200\Omega$

**Use in Oscillators (Historical):**
- In 1960s-70s, used in microwave oscillators and amplifiers
- Simpler circuit than transistor-based oscillators at GHz frequencies

**Why not common today:**
- Modern GaAs FETs work well at microwave
- Tunnel diodes: hard to manufacture, poor yields
- Still used in **exotic applications:** THz sources, quantum computing experiments

---

## Summary: Engineering Reality

1. **Rectifiers:** Diode drops reduce output voltage, critical at low voltages
2. **Schottky trade-off:** Lower drop but higher leakage and lower voltage rating
3. **Zener regulation:** Simple but inefficient, noisy
4. **LED current:** Must use current source, not voltage source (exponential I-V)
5. **ESD diodes:** Protect IC inputs, can cause parasitic powering
6. **Reverse recovery:** Limits switching speed, use Schottky or synchronous rectification
7. **Tunnel diodes:** Negative resistance, mostly historical curiosity now
