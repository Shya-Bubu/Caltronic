# Engineering Applications: Power and Passivity

> Where the passive/active distinction matters in real circuits, and how engineers exploit (or avoid) negative resistance.

---

## Power Ratings and Component Selection

Every physical component has a **maximum power dissipation** spec.

### Example: 0.25W vs. 1W Resistor (same 1kΩ value)
- **Physical size:** 0.25W is 2mm × 0.8mm, 1W is 4mm × 2mm
- **Max current:** 0.25W → $I_{max} = \sqrt{P/R} = 15.8$mA, 1W → 31.6mA
- **Cost:** 1W resistor is ~3× more expensive
- **Board space:** 1W takes 4× the area

**Engineering trade-off:** Don't over-spec. If you only need 10mA, use 0.25W. Board space is expensive in production.

---

## Derating in High-Temperature Environments

Automotive electronics operate at 105°C ambient (under hood). Standard derating:

**At 70°C:** 100% of rated power  
**At 105°C:** 60% of rated power  
**At 125°C:** 40% of rated power

**Real example:** A 1W resistor in engine bay → derate to 0.6W max dissipation at 105°C.

### Why?
Resistor's internal temperature: $T_{junction} = T_{ambient} + P \cdot R_{\theta JA}$

If you run at full power in hot environment → junction exceeds max temperature (usually 155°C) → **resistance drifts, then fails open**.

---

## Active Elements: Batteries and Power Supplies

From lecture: passive elements **absorb** power, active elements can **deliver** power.

### Battery as Active Resistor
A 12V lead-acid battery has:
- **Internal resistance:** ~10-50 mΩ (passive component)
- **EMF:** 12V (active source)

Combined: Acts as active element that can deliver ~100-500A (depending on CCA rating).

**Engineering insight:** Battery's $R_{internal}$ causes voltage drop under load:
$$V_{terminal} = V_{EMF} - I \cdot R_{internal}$$

At 300A starting current: $V_{drop} = 300 \times 0.05 = 15V$ → terminal voltage drops to 0V!

This is why car batteries are rated in **Cold Cranking Amps** (CCA) — the lower the $R_{internal}$, the higher the CCA.

---

## Negative Resistance: Tunnel Diode Oscillators

Tunnel diodes have a **negative resistance region**: as voltage increases, current decreases.

### Why This Enables Oscillation
In an LC tank circuit:
- Inductor + capacitor store energy and oscillate
- But real L and C have **losses** (parasitic resistance) → oscillation damps out
- **Add tunnel diode in negative-R region** → compensates loss → sustains oscillation

**Barkhausen criterion:** For oscillation, total loop resistance must be ≤ 0:
$$R_{total} = R_{parasitic} + R_{tunnel} \leq 0$$

If $R_{tunnel} < -R_{parasitic}$ → net energy gain → oscillator starts.

**Modern use:** Microwave oscillators (10-100 GHz) where transistors are too slow.

---

## Power Converters: Switching Loss

MOSFETs in buck/boost converters aren't perfect switches. They have:
- **$R_{DS(on)}$:** On-resistance when conducting (~10-100 mΩ)
- **Switching transitions:** During turn-on/off, both $v$ and $i$ are non-zero → $P = vi > 0$

### Conduction Loss
When MOSFET is ON, conducting 10A through 10mΩ:
$$P_{cond} = I^2 \cdot R_{DS(on)} = 10^2 \times 0.01 = 1W$$

### Switching Loss
During transition (say, 10ns), average power:
$$P_{sw} = \frac{1}{2} V I t_{transition} \cdot f_{switching}$$

At 100kHz switching frequency, $V=12V$, $I=10A$, $t=10ns$:
$$P_{sw} = \frac{1}{2} \times 12 \times 10 \times 10^{-8} \times 10^5 = 0.6W$$

**Total dissipation:** 1W + 0.6W = 1.6W in the MOSFET.

**Engineering principle:** Higher switching frequency → more switching loss → need better (faster, lower $R_{DS(on)}$) MOSFETs.

---

## Energy Harvesting and Passive Circuits

**Passive circuit:** Can only dissipate or store energy, never generate it.

### RFID Tags (Passive)
No battery! Powered by RF energy from reader:
1. Reader transmits RF power at 13.56 MHz
2. Tag's antenna receives ~1mW (passive coupling)
3. Rectifier + capacitor stores charge
4. Tag responds using **backscatter modulation** (passive switching)

**All passive components:** Diodes, capacitors, antenna (coil). Total power budget: <1mW.

**Range:** ~10cm for tiny tags, ~1m for larger antennas.

---

## Thermal Runaway in Power Resistors

**Problem:** Resistor dissipates power → heats up → resistance changes → current changes → can spiral out of control.

### Positive Temperature Coefficient (PTC)
Most metal resistors: $R$ increases with $T$.
- More power → higher $T$ → higher $R$ → less current → **self-limiting**
- Stable

### Negative Temperature Coefficient (NTC)
Some semiconductors: $R$ decreases with $T$.
- More power → higher $T$ → lower $R$ → more current → more power → **runaway!**
- Unstable without external current limiting

**Real failure mode:** Power MOSFETs have NTC above 150°C. If one device in a parallel array gets hotter, it draws more current, heats more, draws even more → **burns out** while others stay cool.

**Solution:** Current-sense resistors with negative feedback to balance current.

---

## Summary: Engineering Applications

1. **Component selection:** Match power rating to actual dissipation, derate for temperature
2. **Batteries:** Active elements with internal resistance affecting terminal voltage
3. **Negative resistance:** Enables oscillators (tunnel diodes, Gunn diodes)
4. **Switching loss:** MOSFETs dissipate power during transitions
5. **Passive RFID:** Energy harvesting with <1mW power budget
6. **Thermal runaway:** NTC devices can spiral out of control without limiting
