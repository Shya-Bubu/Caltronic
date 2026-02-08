# Exam Strategy

> **Focus**: Recognize patterns, avoid traps, maximize marks.

## Common Question Types

1. **Analysis**: Calculate resistance given material properties and geometry
2. **Design**: Select resistor value and power rating for a given application
3. **Color Code**: Identify resistance from color bands (and vice versa)
4. **Temperature**: Calculate resistance change with temperature

## Worked Past Paper Example

**Question** (Analog Electronics Lab Exam, Q1a-b)

> A carbon film resistor is rated at 1kΩ ± 5% with a temperature coefficient of -500 ppm/°C. 
> 
> (a) What is the range of possible resistance values at 25°C? [2 marks]
> (b) If the resistor operates at 75°C, what is the new resistance range? [4 marks]

**Marks**: 6 marks | **Time**: 8 minutes

### Solution

**Step 1** (2 marks): Calculate tolerance band at 25°C.

Nominal: 1000Ω
Tolerance: ±5% = ±50Ω

**Range at 25°C: 950Ω to 1050Ω** ✓

**Step 2** (2 marks): Calculate temperature effect.

Temperature change: ΔT = 75°C - 25°C = 50°C
Temperature coefficient: α = -500 ppm/°C = -500 × 10⁻⁶/°C

Resistance change factor: 1 + α·ΔT = 1 + (-500 × 10⁻⁶)(50) = 1 - 0.025 = 0.975

**Step 3** (2 marks): Apply to both extremes.

Minimum at 75°C: 950Ω × 0.975 = **926.25Ω**
Maximum at 75°C: 1050Ω × 0.975 = **1023.75Ω**

**Range at 75°C: 926Ω to 1024Ω** ✓

### Mark Allocation

| Step | Action | Marks |
|------|--------|-------|
| 1 | Correct tolerance calculation | 2 |
| 2 | Correct temperature factor | 2 |
| 3 | Apply to both extremes with units | 2 |

## Common Mistakes

❌ **Mistake 1**: Forgetting that ppm means ×10⁻⁶
✅ **Correct approach**: Always convert: 500 ppm = 500 × 10⁻⁶ = 0.0005

❌ **Mistake 2**: Applying temperature correction to nominal only
✅ **Correct approach**: Apply to BOTH min and max values — the range shifts

❌ **Mistake 3**: Wrong color code reading direction
✅ **Correct approach**: Tolerance band (gold/silver) is always furthest from one end — start from the OTHER end

❌ **Mistake 4**: Confusing temperature coefficient sign
✅ **Correct approach**: Negative α means resistance DECREASES with temperature (like carbon)

## Time Management

- Color code question: 1-2 minutes (pure recall)
- Design calculation: 3-4 minutes
- Temperature analysis: 4-5 minutes
- Always check units before moving on
- Write assumptions explicitly for partial credit

---

*Test your understanding with the Quiz, then reinforce with Flashcards.*
