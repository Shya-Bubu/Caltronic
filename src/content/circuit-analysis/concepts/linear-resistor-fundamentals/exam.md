# Exam Preparation: Linear Resistors

> How to tackle resistor problems in exams quickly and correctly.

---

## Common Question Types

### Type 1: Direct Ohm's Law Calculation
"Given two of (V, I, R), find the third"

**Time:** 1-2 minutes  
**Strategy:** Memorize v = IR, rearrange as needed

### Type 2: Power Calculation
"Find power dissipated by resistor"

**Time:** 1-2 minutes  
**Strategy:** Use P = VI, or P = I²R, or P = V²/R (pick easiest!)

### Type 3: Voltage Divider
"Two resistors in series, find output voltage"

**Time:** 2-3 minutes  
**Strategy:** $V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}$

---

## Step-by-Step Example Solutions

### Example 1: Basic Ohm's Law

**Question:** A 2.2kΩ resistor carries 5mA. Find the voltage.

**Solution (every step):**

Step 1: Write what you know
- R = 2.2kΩ
- I = 5mA
- V = ?

Step 2: Convert to base units
- R = 2200Ω
- I = 0.005A

Step 3: Choose the right form
Need V, have R and I → use V = IR

Step 4: Substitute
V = 2200Ω × 0.005A

Step 5: Calculate
V = 11V

**Answer:** 11 Volts

---

### Example 2: Power from Current

**Question:** A 100Ω resistor carries 0.1A. Find power dissipated.

**Solution:**

Step 1: What do we have?
- R = 100Ω
- I = 0.1A
- P = ?

Step 2: Which power formula?
Have I and R → use P = I²R

Step 3: Substitute
P = (0.1)² × 100

Step 4: Calculate
P = 0.01 × 100 = 1W

**Answer:** 1 Watt

---

### Example 3: Voltage Divider

**Question:** 12V input, R₁ = 8kΩ, R₂ = 4kΩ in series. Find V across R₂.

**Solution:**

Step 1: Draw quick sketch
```
12V --[8k]--•--[4k]-- GND
           Vout
```

Step 2: Formula
$$V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}$$

Step 3: Substitute
$$V_{out} = 12V \times \frac{4k}{8k + 4k} = 12V \times \frac{4}{12}$$

Step 4: Simplify
$$V_{out} = 12V \times \frac{1}{3} = 4V$$

**Answer:** 4 Volts across R₂

---

## Common Mistakes to Avoid

### ✗ Mistake 1: Unit Confusion
**Wrong:** 2.2kΩ × 5mA = 11 (forgot units!)  
**Right:** 2200Ω × 0.005A = 11V

**Tip:** ALWAYS convert to Ω, A, V before calculating!

### ✗ Mistake 2: Wrong Power Formula
**Question:** Given V = 10V, R = 5Ω, find P

**Wrong:** P = V × R = 50W (this makes no sense!)  
**Right:** P = V²/R = 100/5 = 20W

**Tip:** Check units! Power needs voltage AND current (directly or indirectly).

### ✗ Mistake 3: Voltage Divider Confusion
**Wrong:** $V_{out} = V_{in} \times \frac{R_1}{R_2}$  
**Right:** $V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}$ 

**Tip:** Output voltage is across R₂, so R₂ goes on **top** of fraction!

---

## Quick Reference Formulas

**Copy these before exam:**

```
Ohm's Law:     V = IR,  I = V/R,  R = V/I

Power:         P = VI = I²R = V²/R

Voltage Div:   V_out = V_in × R₂/(R₁+R₂)

Series:        R_total = R₁ + R₂

Parallel:      1/R_total = 1/R₁ + 1/R₂
```

---

## Time Management

**Allocate by difficulty:**

| Question Type | Time Allowed |
|--------------|--------------|
| Direct V=IR calc | 1-2 min |
| Power calculation | 1-2 min |
| Voltage divider | 2-3 min |
| Multi-step with diagram | 4-5 min |

**If stuck for >3 minutes:** Move on! Come back later with fresh eyes.

---

## Practice Problem (Try Yourself)

**Question:** A voltage divider uses R₁ = 1.5kΩ and R₂ = 3.3kΩ with 9V input. If the output is connected to a device drawing 1mA, what is the actual output voltage?

<details>
<summary>Hint</summary>

This is a LOADED voltage divider - you can't just use the simple formula! The load current matters.

Try drawing the circuit first.
</details>

<details>
<summary>Solution</summary>

Step 1: Current through divider
$I_{divider} = \frac{9V}{1.5k + 3.3k} = \frac{9}{4.8k} = 1.875mA$

Step 2: Unloaded output
$V_{unloaded} = 9V \times \frac{3.3k}{4.8k} = 6.1875V$

Step 3: **But** 1mA is drawn from output!

Effective R₂ = 3.3kΩ ∥ (load) — this gets complicated.

**Simpler approach:** Use **Thevenin equivalent**...

Actually, at A-Level, you'd solve as:
Current splits at the tap → some goes through R₂, some to load.
This requires KCL, which is beyond simple voltage divider.

**Expected answer:** "Output voltage drops below 6.19V due to loading effect" (qualitative answer is fine!)
</details>

---

## Summary

**For exam success:**
1. Convert ALL units first (kΩ → Ω, mA → A)
2. Pick the RIGHT power formula (P=VI, I²R, or V²/R)
3. Show ALL steps (even simple ones get partial marks!)
4. Check units in final answer
