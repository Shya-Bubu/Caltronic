# Engineering Application

## Activity 4: Complete Lab Procedure

[[visual:diag-engineering-02]]

### Step 1: Build the Circuit
- R1 = 1.2 kΩ (V1 input)
- R2 = 18 kΩ (V2 input)
- Rf = 39 kΩ (feedback)
- Power: ±15V

### Step 2: Apply Inputs
- V1: Function generator, **0.4Vpp triangular, 1kHz**
- V2: **3V DC** (from voltage divider using power supply)

**Creating 3V DC from 15V supply**:
Use a voltage divider: R = 10kΩ and R = 2.5kΩ
$$V_2 = 15V \times \frac{2.5k}{10k + 2.5k} = 3V$$

### Step 3: Observe Composite Output
- CH1: V1 (triangular wave)
- CH2: Vo (composite output)
- Use DC coupling on oscilloscope!

### Step 4: Sketch Waveforms

Expected output:
- AC component: Triangular wave scaled by A1 = 32.5
  - Amplitude = 0.4V × 32.5 = 13V pp (if not saturating)
- DC offset: 3V × A2 = 3 × 2.17 = 6.5V
- Total output: Triangular oscillating around -6.5V DC

**Important**: The output is INVERTED!

### Step 5: Measure Individual Gains

**Measuring A1** (ground V2):
$$A_1 = \frac{V_o}{V_1}\bigg|_{V_2=0} = \_\_\_\_\_$$

Theoretical: A1 = 39k/1.2k = 32.5

**Measuring A2** (ground V1):
$$A_2 = \frac{V_o}{V_2}\bigg|_{V_1=0} = \_\_\_\_\_$$

Theoretical: A2 = 39k/18k = 2.17

### Step 7: Calculate Theoretical Values
- A1 = Rf/R1 = 39k/1.2k = **32.5**
- A2 = Rf/R2 = 39k/18k = **2.17**

### Step 8: Reasons for Discrepancy

Why might measured differ from theoretical?
1. Resistor tolerances (5%)
2. Op-amp input offset voltage
3. Loading effects from measurement equipment
4. Op-amp gain-bandwidth limitations

---

*For mathematical derivation, continue to the Mathematics layer.*
