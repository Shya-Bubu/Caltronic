# Engineering Applications: Series and Parallel Resistor Networks

> How resistor networks are used in signal processing, power distribution, and precision measurement.

---

## Resistor Ladder Networks: R-2R DACs

**Digital-to-Analog Converter (DAC)** using only two resistor values: R and 2R.

### 4-bit R-2R DAC Example
- 4 digital bits control 4 switches
- Each switch connects to either $V_{ref}$ or GND
- Output is weighted sum: $V_{out} = V_{ref} \cdot (b_3/2 + b_2/4 + b_1/8 + b_0/16)$

**Why R-2R instead of binary weighted ($R, 2R, 4R, 8R, 16R$)?**
- **Tolerance:** With R-2R, only two resistor values needed → easier to match
- **Range:** Binary weighted requires 16R for 4 bits → 1024R for 10 bits (impractical)

**Modern DACs:** Still use R-2R topology internally (e.g., audio codecs up to 24-bit).

---

## Kelvin (4-Wire) Resistance Measurement

**Problem:** Measuring low resistance (<1Ω) — wire resistance dominates.

### 2-Wire Measurement (Wrong)
Measured resistance = $R_{DUT} + R_{wire1} + R_{wire2}$

If $R_{DUT} = 1\Omega$ and $R_{wire} = 0.1\Omega$ each → 20% error!

### 4-Wire (Kelvin) Measurement
- **Current wires:** Force current through DUT
- **Sense wires:** High-impedance voltmeter (no current, so no drop in sense wires)

Measured: $V = I \cdot R_{DUT}$ exactly

**Used in:**
- **Shunt resistor measurement** (current sensing in battery management)
- **PCB trace resistance** (quality control)
- **Superconductivity testing** (∝nΩ)

---

## Thermistor Bridge for Differential Temperature Measurement

**Wheatstone bridge** with one thermistor:

$$\frac{R_1}{R_2} = \frac{R_{NTC}(T)}{R_4}$$

When balanced: $V_{out} = 0$

**Temperature change:** $R_{NTC}$ changes → bridge unbalances → $V_{out} \neq 0$

**Sensitivity:** Can detect 0.01°C changes with proper amplification.

**Real use:** Thermocouples are better for absolute temperature, but thermistor bridges excel at **differential** (e.g., temp difference across heat sink: hot side vs. cold side).

---

## Power Distribution: Parallel Resistors for Current Sharing

**Challenge:** Distribute 100A across PCB without burning traces.

**Solution:** Use multiple parallel paths (vias, planes).

### Example
Single trace: 1 mΩ, carries 100A → $P = I^2R = 10W$ per inch → **melts copper**

4 parallel traces of 1 mΩ each:
- Equivalent: 0.25 mΩ
- Each carries 25A
- Each dissipates: $(25)^2 \times 0.001 = 0.625W$ per inch → **safe**

**PCB design rule:** For high current (>10A), use:
- **Thick copper** (2 oz vs. 1 oz)
- **Wide traces** (100+ mils)
- **Multiple layers** in parallel (via stitching)

---

## Series Resistor Voltage Divider: ADC Input Conditioning

**Problem:** Measure 100V with a 3.3V ADC.

**Solution:** Voltage divider with $R_1 = 97k\Omega$, $R_2 = 3k\Omega$:
$$V_{ADC} = 100V \cdot \frac{3k}{97k + 3k} = 3V$$

**Real considerations:**
1. **Impedance:** ADC input impedance (typ. 1MΩ) loads the divider → use $R_1 + R_2 \ll 1M\Omega$
2. **Noise:** High impedance picks up EMI → add capacitor across $R_2$ for filtering
3. **Tolerance:** 1% resistors → ±1% error → 10-bit ADC max (11-12 bits need 0.1% resistors)

**Fun fact:** Automotive battery voltage sensing uses 100kΩ/3.3kΩ dividers to monitor 12V with a 5V microcontroller ADC.

---

## Filter Networks: RC Low-Pass Ladder

Series R + parallel C repeated $n$ times creates an $n$-pole low-pass filter.

**1st order (1 RC section):** −20 dB/decade roll-off  
**2nd order (2 RC sections):** −40 dB/decade roll-off

**Design challenge:** Repeated identical RC stages **don't give Butterworth response** (flat passband).

**Sallen-Key topology:** Uses different R and C values per stage → achieves desired filter shape.

**Used in:** Anti-aliasing filters before ADCs, audio crossovers (separating bass/treble to different speaker drivers).

---

## Summary: Engineering Applications

1. **R-2R DAC:** Only two resistor values needed for N-bit conversion
2. **Kelvin measurement:** 4-wire technique eliminates lead resistance errors
3. **Thermistor bridge:** Differential temperature sensing with 0.01°C resolution
4. **Parallel PCB traces:** Current sharing prevents trace melting in high-current designs
5. **ADC voltage divider:** Scale high voltages down, mind impedance and tolerance
6. **RC Ladder filters:** Multi-pole filters for anti-aliasing and audio crossovers
