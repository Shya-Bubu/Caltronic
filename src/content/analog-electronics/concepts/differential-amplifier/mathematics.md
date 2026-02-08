# Mathematical Foundation

## Pre-Lab 3: Deriving the Differential Amplifier Formula

[[visual:diag-mathematics-01]]

### Circuit Analysis

Using superposition (analyze each input separately, then add):

**With Vi1 only** (Vi2 = 0):
This is an inverting amplifier:
$$V_{o1} = -\frac{R_2}{R_1}V_{i1}$$

**With Vi2 only** (Vi1 = 0):
At non-inverting input, voltage divider R3-R4:
$$V_+ = V_{i2} \times \frac{R_4}{R_3 + R_4}$$

Then non-inverting amplifier action:
$$V_{o2} = V_+ \times \left(1 + \frac{R_2}{R_1}\right) = V_{i2} \times \frac{R_4}{R_3+R_4} \times \left(1 + \frac{R_2}{R_1}\right)$$

**Total output** (superposition):
$$V_o = V_{o1} + V_{o2} = -\frac{R_2}{R_1}V_{i1} + V_{i2} \times \frac{R_4}{R_3+R_4} \times \left(1 + \frac{R_2}{R_1}\right)$$

### Special Case: R2/R1 = R4/R3

When resistor ratios are matched:
$$V_o = \frac{R_2}{R_1}(V_{i2} - V_{i1})$$

This is the ideal differential amplifier equation!

> 🤔 **Pause & Reflect**: Why is resistor matching so important?

<details>
<summary>Click to reveal answer</summary>

If R2/R1 ≠ R4/R3, the circuit won't perfectly cancel common-mode signals. Any mismatch creates a finite common-mode gain, reducing CMRR.

For high CMRR:
- Use precision resistors (0.1% or better)
- Or use an instrumentation amplifier (dedicated IC)

</details>

## CMRR Mathematics

### Definitions

**Differential Gain**:
$$A_D = \frac{V_o}{V_d} = \frac{V_o}{V_{i2} - V_{i1}}$$

**Common-Mode Gain**:
$$A_{cm} = \frac{V_o}{V_{cm}} = \frac{2V_o}{V_{i1} + V_{i2}}$$

**CMRR**:
$$CMRR = \left|\frac{A_D}{A_{cm}}\right|$$

### Real Op-Amp Output

For a real differential amplifier:
$$V_o = A_D V_d + A_{cm} V_{cm}$$
$$V_o = A_D(V_{i2} - V_{i1}) + A_{cm}\frac{(V_{i1} + V_{i2})}{2}$$

### Homework 1 Worked Example

Given: AD = 100, Vi1 = 950µV, Vi2 = 1050µV

Vd = 1050 - 950 = 100µV
Vcm = (1050 + 950)/2 = 1000µV

**(a) CMRR = 100**:
Acm = 100/100 = 1
Vo = 100×100µV + 1×1000µV = 10mV + 1mV = **11mV**

**(b) CMRR = 10,000**:
Acm = 100/10,000 = 0.01
Vo = 100×100µV + 0.01×1000µV = 10mV + 0.01mV = **10.01mV**

**(c) CMRR = ∞ (ideal)**:
Acm = 0
Vo = 100×100µV + 0 = **10mV** (pure differential)

---

*For exam strategies, continue to the Exam layer.*
