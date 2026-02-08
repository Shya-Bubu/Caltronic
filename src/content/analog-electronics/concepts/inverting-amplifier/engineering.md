# Engineering Application

## Activity 1: Complete Lab Procedure

[[visual:diag-engineering-01]]

### Step 1: Build the Circuit
- R1 = 2.2 kΩ (input resistor)
- R2 = 39 kΩ (feedback resistor)
- Power supply: +Vs = +15V, -Vs = -15V

### Step 2: Apply Input Signal
- Set function generator to **1V peak-to-peak**
- Frequency: **1 kHz**
- Waveform: **Sinusoidal**

### Step 3: Find Saturation Point
1. Slowly increase input amplitude
2. Watch output on oscilloscope CH2
3. When output starts clipping → you've found saturation
4. **Record this input voltage**: Vi(max) ≈ _____

### Step 4: Return to Linear Operation
- Reduce input so output is undistorted
- Recommended: 0.5V peak-to-peak input

### Step 5: Measure Peak-to-Peak Voltages
Use oscilloscope cursors:
- Vi = _____ V peak-to-peak
- Vo = _____ V peak-to-peak

### Step 6: Calculate Measured Gain
$$A_{V(measured)} = \frac{V_o}{V_i} = \frac{\_\_\_\_\_}{\_\_\_\_\_} = \_\_\_\_\_$$

### Step 7: Calculate Theoretical Gain
$$A_{V(theoretical)} = -\frac{R_2}{R_1} = -\frac{39k\Omega}{2.2k\Omega} = -17.73$$

**Compare**: Are they close? Within 5% is acceptable!

### Step 8: Frequency Response Measurement

Fill in the table by measuring at each frequency:

| Frequency | Vi (Vpp) | Vo (Vpp) | Gain = Vo/Vi |
|-----------|----------|----------|--------------|
| 100 Hz    |          |          |              |
| 200 Hz    |          |          |              |
| 300 Hz    |          |          |              |
| 400 Hz    |          |          |              |
| 500 Hz    |          |          |              |
| 1 kHz     |          |          |              |
| 2 kHz     |          |          |              |

### Step 9: Analyze Frequency Response

**Expected observation**: Gain should be approximately **constant** across this frequency range (100 Hz - 2 kHz is well within the 741's bandwidth at this gain).

If gain drops at higher frequencies, it's due to:
- Gain-bandwidth product limitation
- Stray capacitance effects

## Common Mistakes to Avoid

❌ Forgetting to connect V- (Pin 4) to -15V
❌ Swapping R1 and R2 positions
❌ Using DC coupling on scope with large DC offset
❌ Not grounding the non-inverting input (+)

---

*For the mathematical derivation, continue to the Mathematics layer.*
