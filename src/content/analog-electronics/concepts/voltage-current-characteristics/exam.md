# Exam Strategy

> **Focus**: Recognize patterns, avoid traps, maximize marks.

## Common Question Types

1. **Data interpretation**: Given V-I data, calculate resistance and assess linearity
2. **Graphical analysis**: Read resistance from slope of V-I graph
3. **Error analysis**: Identify sources of measurement error
4. **Component identification**: Determine component type from V-I curve shape

## Worked Past Paper Example

**Question** (Analog Electronics Lab Exam, Q2)

> The following V-I data was measured for an unknown component:
> 
> | V (V) | 0 | 1 | 2 | 3 | 4 | 5 |
> |-------|---|---|---|---|---|---|
> | I (mA) | 0 | 2.1 | 4.0 | 6.2 | 8.0 | 10.1 |
>
> (a) Calculate the average resistance. [2 marks]
> (b) Is this component ohmic? Justify your answer. [2 marks]
> (c) A student measures 4.7kΩ with a multimeter. Explain the discrepancy. [2 marks]

**Marks**: 6 marks | **Time**: 8 minutes

### Solution

**Step 1** (2 marks): Calculate resistance for each non-zero point.

R₁ = 1V / 2.1mA = 476Ω
R₂ = 2V / 4.0mA = 500Ω
R₃ = 3V / 6.2mA = 484Ω
R₄ = 4V / 8.0mA = 500Ω
R₅ = 5V / 10.1mA = 495Ω

Average R = (476 + 500 + 484 + 500 + 495) / 5 = **491Ω ≈ 500Ω** ✓

**Step 2** (2 marks): Assess linearity.

The calculated R values are consistent (range: 476-500Ω, variation ~5%).

**Yes, the component is ohmic** because:
- V-I relationship is approximately linear (R is constant)
- Curve passes through origin
- Variation is within measurement uncertainty ✓

**Step 3** (2 marks): Explain discrepancy.

Possible reasons for 4.7kΩ vs measured 500Ω:
- **Incorrect resistor selected** (4.7kΩ vs 470Ω — color code misread)
- **Multimeter on wrong range** (reading 4.70 as 4.7k)
- **Damaged resistor** (internal connection partially open)

Most likely: Color code misread. 4.7kΩ (Yellow-Violet-Red) vs 470Ω (Yellow-Violet-Brown) differ by only one band.

### Mark Allocation

| Step | Action | Marks |
|------|--------|-------|
| 1 | Calculate R at each point, find average | 2 |
| 2 | State ohmic, justify with constant R and linearity | 2 |
| 3 | Identify plausible reason for 10× discrepancy | 2 |

## Common Mistakes

❌ **Mistake 1**: Including (0,0) in resistance calculation (R = 0/0 = undefined)
✅ **Correct approach**: Skip the origin point in calculations

❌ **Mistake 2**: Connecting ammeter in parallel (causes short circuit)
✅ **Correct approach**: Ammeter ALWAYS in series with component under test

❌ **Mistake 3**: Confusing slope of V vs I with slope of I vs V
✅ **Correct approach**: Slope of V-I curve (V on y, I on x) = R. Slope of I-V curve = 1/R = conductance G.

❌ **Mistake 4**: Claiming non-ohmic behavior due to measurement noise
✅ **Correct approach**: Small variations (~5%) are normal; non-ohmic means systematic deviation from linearity

## Time Management

- Data interpretation: 4-5 minutes
- Always show working for partial credit
- Check units (mA vs A is common error)
- State assumptions explicitly

---

*Test your understanding with the Quiz, then reinforce with Flashcards.*
