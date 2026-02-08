# Exam Strategy

> **Focus**: Recognize patterns, avoid traps, maximize marks.

## Common Question Types

1. **Uncertainty calculation**: Propagate errors through formulas
2. **Instrument selection**: Choose appropriate equipment for given task
3. **Data interpretation**: Identify systematic vs random errors from data
4. **Practical troubleshooting**: Diagnose measurement setup problems

## Worked Past Paper Example

**Question** (Analog Electronics Lab Exam, Q3)

> A student measures voltage V = 8.2V ± 0.1V and current I = 4.1mA ± 0.1mA.
>
> (a) Calculate resistance R = V/I. [1 mark]
> (b) Calculate the absolute uncertainty in R. [3 marks]
> (c) Express the result in proper form with uncertainty. [1 mark]
> (d) Which measurement contributes more to the total uncertainty? [1 mark]

**Marks**: 6 marks | **Time**: 8 minutes

### Solution

**Step 1** (1 mark): Calculate resistance.

$$R = \frac{V}{I} = \frac{8.2V}{4.1mA} = 2.0k\Omega$$ ✓

**Step 2** (3 marks): Calculate relative uncertainties.

$$\delta V = \frac{\Delta V}{V} = \frac{0.1}{8.2} = 0.0122 = 1.22\%$$

$$\delta I = \frac{\Delta I}{I} = \frac{0.1}{4.1} = 0.0244 = 2.44\%$$

$$\delta R = \sqrt{\delta V^2 + \delta I^2} = \sqrt{0.0122^2 + 0.0244^2}$$
$$\delta R = \sqrt{0.000149 + 0.000594} = \sqrt{0.000743} = 0.0273 = 2.73\%$$

$$\Delta R = \delta R \times R = 0.0273 \times 2000\Omega = 54.5\Omega \approx 55\Omega$$ ✓

**Step 3** (1 mark): Express properly.

**R = 2.0kΩ ± 55Ω** (or equivalently 2.0kΩ ± 2.7%) ✓

**Step 4** (1 mark): Identify dominant error source.

Current measurement (δI = 2.44%) contributes more than voltage (δV = 1.22%). 

The current uncertainty contributes (0.0244)²/(0.000743) = 80% of total variance. ✓

### Mark Allocation

| Step | Action | Marks |
|------|--------|-------|
| 1 | Calculate R correctly | 1 |
| 2 | Correct relative uncertainties, correct propagation formula | 3 |
| 3 | Proper format with units | 1 |
| 4 | Identify current as dominant source | 1 |

## Common Mistakes

❌ **Mistake 1**: Using absolute uncertainties directly in multiplication
✅ **Correct approach**: Convert to relative (%) uncertainties first, then combine with root-sum-square

❌ **Mistake 2**: Adding uncertainties instead of root-sum-square
✅ **Correct approach**: For independent errors, use $\sqrt{\Delta_1^2 + \Delta_2^2}$, not $\Delta_1 + \Delta_2$

❌ **Mistake 3**: Reporting too many significant figures in uncertainty
✅ **Correct approach**: Uncertainty typically 1-2 significant figures. Match result precision to uncertainty.

❌ **Mistake 4**: Forgetting to include units with uncertainty
✅ **Correct approach**: "R = 2.0kΩ ± 55Ω" NOT "R = 2.0kΩ ± 55"

## Time Management

- Simple R calculation: 1 minute
- Uncertainty propagation: 3-4 minutes
- Always show the propagation formula explicitly
- Check that final uncertainty is reasonable (typically 1-10% for lab measurements)

---

*Test your understanding with the Quiz, then reinforce with Flashcards.*
