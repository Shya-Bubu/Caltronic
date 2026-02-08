# Engineering Application

## Activity 2: Complete Lab Procedure

[[visual:diag-engineering-01]]

### Step 1: Build the Circuit
- R1 = 2.2 kΩ (from inverting input to ground)
- R2 = 39 kΩ (feedback from output to inverting input)
- Input signal to **non-inverting (+)** terminal
- Power supply: +Vs = +15V, -Vs = -15V

### Step 2: Apply Input Signal
- Function generator: **1V peak-to-peak, 1 kHz sinusoidal**

### Step 3: Find Saturation Point
1. Increase input amplitude until output clips
2. Note when distortion begins
3. Expected: With gain ≈ 18.7, saturation around 0.75V input

### Step 4: Linear Operation
- Reduce input to avoid distortion (≈ 0.5Vpp recommended)

### Step 5: Measure Voltages
- Vi = _____ V peak-to-peak
- Vo = _____ V peak-to-peak

### Step 6: Calculate Measured Gain
$$A_{V(measured)} = \frac{V_o}{V_i} = \_\_\_\_\_$$

### Step 7: Calculate Theoretical Gain
$$A_{V(theoretical)} = 1 + \frac{R_2}{R_1} = 1 + \frac{39k\Omega}{2.2k\Omega} = 18.73$$

### Step 8: Frequency Response

| Frequency | Vi (Vpp) | Vo (Vpp) | Gain |
|-----------|----------|----------|------|
| 100 Hz    |          |          |      |
| 200 Hz    |          |          |      |
| 300 Hz    |          |          |      |
| 400 Hz    |          |          |      |
| 500 Hz    |          |          |      |
| 1 kHz     |          |          |      |
| 2 kHz     |          |          |      |

### Step 9: Observation
- Gain should remain constant across this frequency range
- Compare with Activity 1 results — gains are slightly different!
  - Inverting: |−17.73| = 17.73
  - Non-inverting: 18.73 (higher by 1)

## Special Case: Unity-Gain Buffer (Voltage Follower)

When R2 = 0 and R1 = ∞ (open):
$$A_V = 1 + \frac{0}{\infty} = 1$$

This creates a **buffer** with:
- Gain = exactly 1 (no amplification)
- Very high input impedance
- Very low output impedance
- Used for impedance matching!

---

*For the mathematical derivation, continue to the Mathematics layer.*
