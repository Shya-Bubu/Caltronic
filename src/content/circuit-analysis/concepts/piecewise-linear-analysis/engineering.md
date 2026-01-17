# Engineering Applications: Piecewise-Linear Models

> How PWL approximations speed up circuit simulation and enable practical analog design.

---

## SPICE Simulation: Why PWL Models Matter

**Modern circuit simulators** (SPICE, LTspice, PSpice) use PWL internally during DC analysis.

### The Exponential Diode Problem
Exponential equation: $i = I_s(e^{v/V_T} - 1)$

**Numerical challenge:**
- At $v = 0.6V$: $e^{0.6/0.026} = e^{23} \approx 10^{10}$
- Small voltage change → huge current change → **Newton-Raphson struggles to converge**

**PWL solution:**
1. Break curve into ~10 linear segments
2. Solve DC operating point using piecewise-linear model (fast, stable)
3. Refine solution using full exponential model (from good starting point)

**Result:** 10-100× speedup in large circuits with many diodes.

---

## Zener Voltage Regulator Design

**Real Zener characteristic** (PWL with 3 segments):

1. **Reverse breakdown:** $v < -V_Z$ → steep slope (low $r_z \approx 5-50\Omega$)
2. **Blocking:** $-V_Z < v < V_f$ → nearly horizontal (high R)
3. **Forward:** $v > V_f$ → like regular diode

### Design Example
Input: 12V ± 2V, Output: 5V at 100mA

**Step 1:** Choose Zener voltage: 5.1V (standard value)

**Step 2:** Calculate series resistor:
$$R_s = \frac{V_{in(min)} - V_Z}{I_Z + I_{load}} = \frac{10 - 5.1}{0.02 + 0.1} = 41\Omega$$

Use standard 39Ω.

**Step 3:** Verify at max input:
$$I_{total} = \frac{14 - 5.1}{39} = 228mA$$
$$I_Z = 228 - 100 = 128mA$$

Check Zener power: $P_Z = 5.1 \times 0.128 = 0.65W$ → use 1W Zener

**PWL graphical method** lets you visualize operating point movement as load varies.

---

## LED Drivers with PWL Current Control

**Multi-string LED array:** 3 strings of 10 LEDs each (30 LEDs total).

### Challenge
Each string has $V_f = 10 \times 3V = 30V$, but:
- LED $V_f$ varies ±5% (binning tolerance)
- Temperature coefficient: −2 mV/°C per LED → −20 mV/°C per string

**If you use voltage source:** Current imbalance can be 2:1 ratio between strings!

**PWL constant-current solution:**
Each string gets its own current sink (transistor + sense resistor):
- Maintains $I = 20mA$ regardless of $V_f$ variation
- Temperature changes → $V_f$ changes → current stays constant

**Modern IC:** TI TLC59xx series uses PWL modeling internally for current accuracy <3%.

---

## PWL Synthesis for Soft-Start Circuits

**Problem:** Power supply capacitors create **inrush current spike** at turn-on.

**Solution:** "Soft-start" using PWL resistance that decreases over time.

### Implementation
Instead of time-varying R, use **PWL circuit** that approximates it:

1. At $t=0$: High resistance (e.g., 100Ω) → limits initial current
2. At $t=10ms$: Medium resistance (10Ω)
3. At $t=50ms$: Low resistance (1Ω) → normal operation

**Circuit:** Series of resistors + time-delayed switches (transistors controlled by RC delay)

**Modern approach:** Dedicated soft-start IC (e.g., LTC4365) uses internal PWL state machine.

---

## Clipping and Limiting Circuits

**Audio limiter:** Prevent overdriving speaker by clipping peaks.

### Diode Clipper (PWL)
Two back-to-back Zeners in parallel with signal:
- **Below ±5.1V:** Zeners off → signal passes through
- **Above +5.1V:** Top Zener conducts → clips to +5.1V
- **Below −5.1V:** Bottom Zener conducts → clips to −5.1V

**PWL model shows exactly where clipping occurs** (breakpoint analysis).

**Real use:** Guitar distortion pedals use diode clippers (Si, Ge, or LED diodes) for different "clipping flavors."

---

## Summary: Engineering Applications

1. **SPICE simulation:** PWL speeds up DC convergence by 10-100× for large circuits
2. **Zener regulation:** PWL model enables graphical design of operating point
3. **LED drivers:** Constant-current sinks compensate for $V_f$ variations
4. **Soft-start:** PWL time-varying resistance limits inrush current
5. **Audio clippers:** Back-to-back Zeners create symmetric PWL limiting
