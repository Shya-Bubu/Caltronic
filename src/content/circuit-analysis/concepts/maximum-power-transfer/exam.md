# Maximum Power Transfer - Exam Preparation

## Key Formulas

| Quantity | Formula |
|----------|---------|
| Maximum power condition | $R_L = R_{th}$ |
| Maximum power | $P_{max} = \frac{V_{th}^2}{4R_{th}}$ |
| Load power (general) | $P_L = \frac{V_{th}^2 R_L}{(R_{th} + R_L)^2}$ |
| Efficiency | $\eta = \frac{R_L}{R_{th} + R_L}$ |
| Efficiency at max power | 50% |

---

## Worked Examples

### Example 1: Basic Maximum Power

**Problem**: A source has $V_{th} = 24V$ and $R_{th} = 6Ω$. Find the load resistance for maximum power and calculate that power.

**Solution**:

For maximum power:
$$R_L = R_{th} = 6Ω$$

Maximum power:
$$P_{max} = \frac{V_{th}^2}{4R_{th}} = \frac{24^2}{4 \times 6} = \frac{576}{24} = 24W$$

**Answer**: $R_L = 6Ω$, $P_{max} = 24W$

---

### Example 2: Given Load, Find Power

**Problem**: For the same source ($V_{th} = 24V$, $R_{th} = 6Ω$), find power delivered to a 12Ω load.

**Solution**:

$$P_L = \frac{V_{th}^2 R_L}{(R_{th} + R_L)^2} = \frac{24^2 \times 12}{(6 + 12)^2} = \frac{576 \times 12}{324}$$

$$P_L = \frac{6912}{324} = 21.33W$$

Note: This is less than $P_{max} = 24W$ ✓

---

### Example 3: Efficiency Calculation

**Problem**: What is the efficiency when $R_L = 12Ω$ and $R_{th} = 6Ω$?

**Solution**:

$$\eta = \frac{R_L}{R_{th} + R_L} = \frac{12}{6 + 12} = \frac{12}{18} = \frac{2}{3} = 66.7\%$$

Note: Higher than 50% because $R_L > R_{th}$

---

### Example 4: Find Thévenin from Max Power Condition

**Problem**: A source delivers maximum power of 10W when connected to a 5Ω load. Find $V_{th}$ and $R_{th}$.

**Solution**:

At maximum power: $R_L = R_{th}$

So: $R_{th} = 5Ω$

From max power formula:
$$P_{max} = \frac{V_{th}^2}{4R_{th}}$$
$$10 = \frac{V_{th}^2}{4 \times 5} = \frac{V_{th}^2}{20}$$
$$V_{th}^2 = 200$$
$$V_{th} = \sqrt{200} = 14.14V$$

**Answer**: $V_{th} = 14.14V$, $R_{th} = 5Ω$

---

### Example 5: Complete Circuit Analysis

**Problem**: Find $R_L$ for maximum power transfer and calculate that power.

```
        10Ω          5Ω
    ┌───/\/\/───┬───/\/\/───○ A
    │           │
   50V        20Ω          R_L
    │           │
    └───────────┴───────────○ B
```

**Solution**:

**Step 1**: Find Thévenin equivalent

$V_{th}$: Open circuit at A-B
Voltage divider: $V_{th} = 50 \times \frac{20}{10+20} = 50 \times \frac{2}{3} = 33.33V$

$R_{th}$: Short 50V source
$R_{th} = 5 + (10||20) = 5 + \frac{200}{30} = 5 + 6.67 = 11.67Ω$

**Step 2**: Maximum power condition
$$R_L = R_{th} = 11.67Ω$$

**Step 3**: Calculate maximum power
$$P_{max} = \frac{V_{th}^2}{4R_{th}} = \frac{33.33^2}{4 \times 11.67} = \frac{1111}{46.68} = 23.8W$$

**Answer**: $R_L = 11.67Ω$, $P_{max} = 23.8W$

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Using $P = V_{th}^2/R_L$ | Use $P = V_{th}^2 R_L/(R_{th}+R_L)^2$ |
| Forgetting the factor of 4 | $P_{max} = V_{th}^2/4R_{th}$, not $V_{th}^2/R_{th}$ |
| Assuming 100% efficiency at max power | Efficiency is always 50% at max power |
| Not finding Thévenin first | Must convert complex circuit to Thévenin form |

---

## Quick Reference

### At Maximum Power ($R_L = R_{th}$):
- Current: $I = \frac{V_{th}}{2R_{th}}$
- Load voltage: $V_L = \frac{V_{th}}{2}$
- Load power: $P_L = \frac{V_{th}^2}{4R_{th}}$
- Source power: Same as load power!
- Efficiency: 50%

### For High Efficiency:
- Make $R_L >> R_{th}$
- Trade-off: Less total power

---

## Exam Checklist

- [ ] Find Thévenin equivalent of source
- [ ] For max power: Set $R_L = R_{th}$
- [ ] Calculate $P_{max} = V_{th}^2/(4R_{th})$
- [ ] Remember efficiency is 50% at max power
- [ ] For given $R_L$: Use full power formula
- [ ] Verify: Power should be ≤ $P_{max}$
