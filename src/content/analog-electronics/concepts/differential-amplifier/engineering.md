# Engineering Application

## Activity 3: Complete Lab Procedure

[[visual:diag-engineering-01]]

### Step 1: Build the Differential Amplifier
- R1 = R3 = 2.2 kΩ
- R2 = R4 = 39 kΩ
- Power supply: ±15V

### Measuring Differential Gain (Steps 1-2)

**Setup**:
- Connect function generator to Vi2
- Ground Vi1 (connect to 0V)
- Apply 1Vpp, 200 Hz signal

**Measure**:
$$A_D = \frac{V_o}{V_{i2} - V_{i1}} = \frac{V_o}{V_{i2} - 0} = \frac{V_o}{V_{i2}}$$

Expected: AD ≈ 17.73

### Measuring Common-Mode Gain (Step 2)

**Setup**:
- Connect function generator to **BOTH** Vi1 and Vi2 simultaneously
- Apply 1Vpp, 200 Hz signal

**Measure**:
- The output Vo (should be very small!)
- $V_{cm} = (V_{i1} + V_{i2})/2 = V_{input}$ (since both are the same)

$$A_{cm} = \frac{V_o}{V_{cm}}$$

Expected: Acm should be very small (ideally 0)

### Calculate CMRR (Step 3)

$$CMRR = \frac{A_D}{A_{cm}}$$

**Example calculation**:
- AD = 17.73
- Acm = 0.006 (measured with common-mode input)
- CMRR = 17.73/0.006 = 2955

$$CMRR_{dB} = 20\log_{10}(2955) = 69.4 \text{ dB}$$

### Step 4: Compare with Datasheet

Look up the 741 datasheet:
- CMRR (typical) = 90 dB
- CMRR (minimum) = 70 dB

Your measured value should be close to 70-90 dB.

**Why might your value be lower?**
- Resistor tolerances (5% resistors cause mismatch)
- Breadboard contact resistance
- Temperature effects

### Homework 1: CMRR Calculation

For a diff amp with AD = 100:
- When CMRR = 100: Acm = AD/CMRR = 100/100 = 1
- When CMRR = 10,000: Acm = 100/10,000 = 0.01
- When CMRR = ∞ (ideal): Acm = 0

---

*For mathematical derivations, continue to the Mathematics layer.*
