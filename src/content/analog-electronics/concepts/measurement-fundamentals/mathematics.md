# Mathematical Foundation

> **Rigor Level**: Quantifying uncertainty and understanding error propagation.

## Setup

<!-- DIAGRAM: diag-mathematics-01 -->

**What we're deriving**: How to properly express and propagate measurement uncertainty.

**Starting assumptions**:
1. Random errors follow Gaussian (normal) distribution
2. Systematic errors are quantifiable or negligible
3. Errors in different quantities are independent

**Notation**:
- $x$ — Measured value
- $\bar{x}$ — Mean of n measurements
- $\sigma$ — Standard deviation
- $\Delta x$ — Absolute uncertainty
- $\delta x$ — Relative uncertainty ($\Delta x / x$)

## Derivation: Statistical Uncertainty

**Step 1**: Calculate the mean from repeated measurements.

$$\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i$$

**Step 2**: Calculate the sample standard deviation.

$$s = \sqrt{\frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})^2}$$

(Use n-1 for sample standard deviation, accounting for estimated mean.)

**Step 3**: Calculate the standard error of the mean.

$$\sigma_{\bar{x}} = \frac{s}{\sqrt{n}}$$

This is the uncertainty in the mean value, not in individual measurements.

> 🤔 **Pause & Reflect**: If you take 4× as many measurements, by what factor does your uncertainty decrease?

<details>
<summary>Click to reveal answer</summary>

Uncertainty decreases by **factor of 2**.

$\sigma_{\bar{x}} = s/\sqrt{n}$

If n → 4n, then $\sqrt{n} → 2\sqrt{n}$

So $\sigma_{\bar{x}} → \sigma_{\bar{x}}/2$

This is why averaging helps, but with diminishing returns. To halve uncertainty, you need 4× measurements.

</details>

## Error Propagation

When calculating a result from measured quantities, uncertainties combine:

**Addition/Subtraction**: $z = x \pm y$

$$\Delta z = \sqrt{(\Delta x)^2 + (\Delta y)^2}$$

**Multiplication/Division**: $z = xy$ or $z = x/y$

$$\frac{\Delta z}{|z|} = \sqrt{\left(\frac{\Delta x}{x}\right)^2 + \left(\frac{\Delta y}{y}\right)^2}$$

**Power**: $z = x^n$

$$\frac{\Delta z}{|z|} = |n| \frac{\Delta x}{|x|}$$

<!-- DIAGRAM: diag-mathematics-02 -->

### Example: Resistance Calculation

Measured: V = 4.95V ± 0.05V, I = 2.02mA ± 0.02mA

Calculate R = V/I and its uncertainty.

$$R = \frac{4.95V}{2.02mA} = 2.45k\Omega$$

$$\frac{\Delta R}{R} = \sqrt{\left(\frac{0.05}{4.95}\right)^2 + \left(\frac{0.02}{2.02}\right)^2}$$

$$\frac{\Delta R}{R} = \sqrt{(0.0101)^2 + (0.0099)^2} = \sqrt{0.0102 + 0.0098} = 0.0142 = 1.42\%$$

$$\Delta R = 0.0142 \times 2.45k\Omega = 35\Omega$$

**Result: R = 2.45kΩ ± 35Ω** (or 2.45kΩ ± 1.4%)

> 🤔 **Pause & Reflect**: In this example, voltage and current contributed roughly equal relative uncertainties. Which measurement should you improve to reduce total uncertainty most efficiently?

<details>
<summary>Click to reveal answer</summary>

It doesn't matter much — they contribute equally!

If one had higher relative uncertainty (say δV = 3% and δI = 1%), improving the worse one (voltage) would have more impact.

**Rule of thumb**: Improve the measurement with LARGEST relative uncertainty first.

</details>

## Key Results

| Result | Expression | Use Case |
|--------|------------|----------|
| Standard error | $\sigma_{\bar{x}} = s/\sqrt{n}$ | Uncertainty in mean |
| Addition error | $\Delta z = \sqrt{\Delta x^2 + \Delta y^2}$ | Sum/difference |
| Product error | $\delta z = \sqrt{\delta x^2 + \delta y^2}$ | Product/quotient |
| Power error | $\delta z = |n| \delta x$ | Exponential |

---

*For exam strategies and common question patterns, continue to the Exam layer.*
