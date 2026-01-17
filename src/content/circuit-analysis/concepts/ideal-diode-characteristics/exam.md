# Exam Preparation: Ideal Diode and pn-Junction

> Question patterns for diode analysis and characteristic equations.

---

## Common Question Types

### Type 1: Ideal Diode State Determination
**Given:** Circuit with ideal diode and sources  
**Strategy:** 
1. Assume diode ON (short circuit, $v_D = 0$) → find $i_D$
2. If $i_D > 0$ → assumption correct
3. If $i_D < 0$ → diode OFF (open circuit, $i_D = 0$) → find $v_D$

**Lecture key (Page 5):** $v \cdot i = 0$ always

### Type 2: pn-Junction Current Calculation
**Given:** $v_D$, find $i_D$ using Shockley equation  
**Strategy:** $i = I_s(e^{v/V_T} - 1)$ with $V_T = 26mV$ at room temp

**Typical exam values:**
- $I_s = 10^{-14}$ A
- $V_T = 0.026$ V
- Forward: $v = 0.6$ to $0.7$ V

### Type 3: Dynamic Resistance
**Given:** Operating point $(V_D, I_D)$  
**Strategy:** $r_d = V_T / I_D$

---

## Solution Strategies

### Ideal Diode Circuit Analysis (Systematic Approach)

**Step 1:** Identify all diodes and label polarities  
**Step 2:** Guess states (ON/OFF) for each diode  
**Step 3:** Solve circuit with those assumptions  
**Step 4:** Verify:
- ON diodes: check $i > 0$
- OFF diodes: check $v < 0$  
**Step 5:** If any violation, revise guess

**Time-saver:** Start with most obvious states based on source polarities

### pn-Junction Approximations

**Forward bias ($v > 0.5V$):**
$$i \approx I_s e^{v/V_T}$$ (drop the "-1")

**Reverse bias ($v < 0$):**
$$i \approx -I_s$$ (small, nearly constant)

**At $v = V_T = 26mV$:**
$$i = I_s(e - 1) \approx 1.7 I_s$$

---

## Time Management

**Diode questions: 4-7 minutes each**

- Ideal diode state: 3-4 min
- Shockley equation: 2-3 min
- Dynamic resistance: 2 min
- Circuit with multiple diodes: 6-8 min

---

## Common Errors

1. **Forgetting to verify diode states:** Always check $i > 0$ (ON) or $v < 0$ (OFF)
2. **Using wrong $V_T$:** At room temp, always use 26 mV unless told otherwise
3. **Sign errors in Shockley equation:** Current flows anode → cathode when ON
4. **Assuming $v_D = 0.7V$:** That's a practical model, not ideal diode!

---

## Formula Summary

**Memorize:**
- Ideal diode: $v \cdot i = 0$, $i \geq 0$, $v \leq 0$ (or $i > 0 \implies v = 0$)
- Shockley: $i = I_s(e^{v/V_T} - 1)$
- $V_T = 26$ mV at 300K
- Dynamic R: $r_d = V_T/I_D$

---

## Practice Problem Pattern

**Expected question:** "An ideal diode is in series with 5V source and 1kΩ resistor. Sketch shows anode to positive terminal. Find $v_D$ and $i_D$."

**Solution:**
1. Assume ON: $v_D = 0$
2. $i_D = 5V / 1k\Omega = 5mA > 0$ ✓
3. **Answer:** $v_D = 0V$, $i_D = 5mA$ (conducting)

**Variant (reversed diode):**
1. Assume ON: $i_D = -5V / 1k\Omega = -5mA < 0$ ✗
2. Diode OFF: $i_D = 0$
3. $v_D = -5V < 0$ ✓
4. **Answer:** $v_D = -5V$, $i_D = 0$ (blocking)
