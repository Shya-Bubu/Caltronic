# Mathematical Foundation

## Pre-Lab 4: Deriving the Summing Amplifier Formula

[[visual:diag-mathematics-01]]

### Analysis Using KCL

At the inverting node (virtual ground, V- = 0):

Current from V1: $I_1 = \frac{V_1 - 0}{R_1} = \frac{V_1}{R_1}$

Current from V2: $I_2 = \frac{V_2 - 0}{R_2} = \frac{V_2}{R_2}$

Current through Rf: $I_f = \frac{0 - V_o}{R_f} = \frac{-V_o}{R_f}$

**KCL at inverting node** (no current into op-amp):
$$I_1 + I_2 + I_f = 0$$
$$\frac{V_1}{R_1} + \frac{V_2}{R_2} - \frac{V_o}{R_f} = 0$$

**Solve for Vo**:
$$\frac{V_o}{R_f} = \frac{V_1}{R_1} + \frac{V_2}{R_2}$$
$$V_o = R_f\left(\frac{V_1}{R_1} + \frac{V_2}{R_2}\right)$$

Wait - this gives positive! We need to be careful with sign:

Actually, current through Rf flows FROM output TO virtual ground when Vo is positive:
$$I_f = \frac{V_o - 0}{R_f} = \frac{V_o}{R_f}$$

But current INTO the node through Rf is negative of this.

**Correct KCL**:
$$I_1 + I_2 = I_f$$
$$\frac{V_1}{R_1} + \frac{V_2}{R_2} = \frac{0 - V_o}{R_f}$$

$$\boxed{V_o = -R_f\left(\frac{V_1}{R_1} + \frac{V_2}{R_2}\right) = -\frac{R_f}{R_1}V_1 - \frac{R_f}{R_2}V_2}$$

### General Form (n inputs)

For n inputs:
$$V_o = -R_f\left(\frac{V_1}{R_1} + \frac{V_2}{R_2} + ... + \frac{V_n}{R_n}\right)$$

### Special Case: Equal Weights

If R1 = R2 = ... = Rn = R:
$$V_o = -\frac{R_f}{R}(V_1 + V_2 + ... + V_n)$$

If also Rf = R:
$$V_o = -(V_1 + V_2 + ... + V_n)$$

This is an **averaging amplifier** (with inversion)!

### Numerical Example (Activity 4)

R1 = 1.2kΩ, R2 = 18kΩ, Rf = 39kΩ
V1 = 0.2V (triangle amplitude), V2 = 3V (DC)

$$V_o = -\frac{39k}{1.2k}(0.2V) - \frac{39k}{18k}(3V)$$
$$V_o = -32.5 \times 0.2V - 2.17 \times 3V$$
$$V_o = -6.5V - 6.5V = -13V$$ (at triangle peak)

---

*For exam tips, continue to the Exam layer.*
