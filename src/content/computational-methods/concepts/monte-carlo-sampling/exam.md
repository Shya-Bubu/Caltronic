# Monte Carlo Sampling - Exam Guide

## Question Types

### Type 1: Basic Monte Carlo Estimation
**"Estimate the integral/expected value using Monte Carlo"**

### Type 2: Error and Sample Size
**"How many samples for given precision?"** or **"What's the error with N samples?"**

### Type 3: Variance Reduction
**"Apply importance sampling/antithetic variables"**

### Type 4: Convergence Rate
**"Explain why error decreases as 1/√N"**

### Type 5: Applications
**"Describe Monte Carlo for tolerance analysis/yield estimation"**

---

## Pattern Recognition

### Key Formulas to Recognize

| Formula | What it represents |
|---------|-------------------|
| $\hat{\mu} = \frac{1}{N}\sum f(X_i)$ | Monte Carlo estimator |
| $\sigma/\sqrt{N}$ | Standard error |
| $1.96\sigma/\sqrt{N}$ | 95% CI half-width |
| $(z/\epsilon)^2 \sigma^2$ | Required N for precision |

### Quick Conversions

| Error reduction | Sample increase |
|-----------------|-----------------|
| 2× | 4× |
| 3× | 9× |
| 10× | 100× |

---

## Step-by-Step Procedures

### Computing Monte Carlo Estimate

1. Identify the integral/expected value
2. Identify the sampling distribution
3. Generate N random samples
4. Evaluate function at each sample
5. Compute average (and multiply by volume if needed)

### Sample Size Calculation

1. Identify required precision ε
2. Identify confidence level (usually 95% → z = 1.96)
3. Estimate or use given σ
4. Calculate: $N = (z\sigma/\epsilon)^2$

---

## Worked Examples

### Example 1: Basic Monte Carlo Integration [10 marks]

**Q**: Estimate $I = \int_0^1 e^{-x^2} dx$ using Monte Carlo with N = 4 samples at x = 0.2, 0.5, 0.7, 0.9.

**Solution**:

Monte Carlo formula for integral on [a,b]:
$$\hat{I} = (b-a) \cdot \frac{1}{N}\sum_{i=1}^N f(x_i)$$

Here a = 0, b = 1, so:
$$\hat{I} = 1 \cdot \frac{1}{4}\left[f(0.2) + f(0.5) + f(0.7) + f(0.9)\right]$$

Compute $f(x) = e^{-x^2}$:
- f(0.2) = e^(-0.04) = 0.961
- f(0.5) = e^(-0.25) = 0.779
- f(0.7) = e^(-0.49) = 0.613
- f(0.9) = e^(-0.81) = 0.445

$$\hat{I} = \frac{1}{4}(0.961 + 0.779 + 0.613 + 0.445) = \frac{2.798}{4} = 0.700$$

**True value**: I ≈ 0.746 (error ~6%)

---

### Example 2: Error and Sample Size [8 marks]

**Q**: A Monte Carlo simulation with 100 samples gives mean = 5.0 and standard deviation = 2.0. 

(a) What is the 95% confidence interval?
(b) How many samples for ±1% precision?

**Solution**:

**(a) Confidence interval**:

Standard error: $SE = \sigma/\sqrt{N} = 2.0/\sqrt{100} = 0.2$

95% CI: $\mu \pm 1.96 \cdot SE = 5.0 \pm 1.96(0.2) = 5.0 \pm 0.39$

**Answer**: [4.61, 5.39]

**(b) Sample size for 1% precision**:

1% of 5.0 = 0.05 required precision

$$N = \left(\frac{z\sigma}{\epsilon}\right)^2 = \left(\frac{1.96 \times 2.0}{0.05}\right)^2 = (78.4)^2 = 6147$$

**Answer**: ~6,150 samples needed

---

### Example 3: π Estimation [12 marks]

**Q**: Explain how to estimate π using Monte Carlo. If 7850 out of 10,000 random points in a 2×2 square land inside the inscribed circle, estimate π and its error.

**Solution**:

**Method**:
1. Generate random (x, y) uniform in [-1, 1] × [-1, 1]
2. Check if x² + y² ≤ 1 (inside unit circle)
3. π/4 = (circle area)/(square area) = P(inside circle)
4. π ≈ 4 × (fraction inside)

**Calculation**:
$$\hat{p} = 7850/10000 = 0.785$$
$$\hat{\pi} = 4 \times 0.785 = 3.14$$

**Error analysis**:
Variance of Bernoulli: $\sigma^2 = p(1-p) \approx 0.785(0.215) = 0.169$

Standard error of p: $SE_p = \sqrt{0.169/10000} = 0.0041$

Standard error of π: $SE_\pi = 4 \times SE_p = 0.0164$

**95% CI**: $3.14 \pm 1.96(0.0164) = 3.14 \pm 0.032$

**Answer**: π ≈ 3.14 ± 0.03 (or [3.11, 3.17])

---

### Example 4: Convergence Rate [8 marks]

**Q**: Explain why Monte Carlo error decreases as 1/√N, not 1/N.

**Solution**:

The Monte Carlo estimator is the sample mean:
$$\hat{\mu} = \frac{1}{N}\sum_{i=1}^N X_i$$

For independent samples with variance σ²:
$$\text{Var}(\hat{\mu}) = \text{Var}\left(\frac{1}{N}\sum X_i\right) = \frac{1}{N^2}\sum \text{Var}(X_i) = \frac{N\sigma^2}{N^2} = \frac{\sigma^2}{N}$$

The **standard deviation** (our error measure) is:
$$\sqrt{\text{Var}(\hat{\mu})} = \frac{\sigma}{\sqrt{N}}$$

**Key insight**: We average N variables, gaining factor 1/N in variance, but standard deviation is the square root, giving 1/√N.

**Implication**: To halve error, need 4× samples (not 2×).

---

### Example 5: Tolerance Analysis [15 marks]

**Q**: A voltage divider has R₁ = 10kΩ ± 5% and R₂ = 10kΩ ± 5% (uniform distribution). Using Monte Carlo:

(a) Write the formula for Vout if Vin = 10V
(b) With samples R₁ = {9.8, 10.2, 10.5, 9.5}kΩ and R₂ = {10.3, 9.7, 10.1, 9.9}kΩ, estimate mean Vout
(c) Estimate the probability Vout is within ±2% of nominal

**Solution**:

**(a) Formula**:
$$V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2} = 10 \times \frac{R_2}{R_1 + R_2}$$

Nominal: $V_{out} = 10 × 0.5 = 5V$

**(b) Monte Carlo estimate**:

| i | R₁ (kΩ) | R₂ (kΩ) | Vout (V) |
|---|---------|---------|----------|
| 1 | 9.8 | 10.3 | 5.124 |
| 2 | 10.2 | 9.7 | 4.874 |
| 3 | 10.5 | 10.1 | 4.903 |
| 4 | 9.5 | 9.9 | 5.103 |

Mean: $\hat{V}_{out} = (5.124 + 4.874 + 4.903 + 5.103)/4 = 5.001$ V

**(c) Yield estimate**:

±2% of 5V = [4.9, 5.1] V

Count within spec: Sample 1 (5.124 > 5.1) OUT, Samples 2,3,4 IN

Estimated yield: 3/4 = 75%

**Note**: With only 4 samples, this is a very rough estimate. Real analysis needs 1000+ samples.

---

## Common Mistakes

### Mistake 1: Forgetting √N
❌ Error ∝ 1/N
✓ Error ∝ 1/√N

### Mistake 2: Wrong Interval Width
❌ CI = μ ± σ
✓ CI = μ ± z×σ/√N

### Mistake 3: Volume Factor
For integration on [a,b], don't forget:
$$\hat{I} = (b-a) \times \text{average}$$

### Mistake 4: Sample Size Squaring
To reduce error by factor k, need k² samples (not k)

---

## Quick Reference

### Monte Carlo Estimator
$$\hat{I} = (b-a)\frac{1}{N}\sum f(X_i)$$

### Standard Error
$$SE = \frac{\sigma}{\sqrt{N}}$$

### 95% Confidence Interval
$$\hat{\mu} \pm 1.96 \times SE$$

### Required Samples
$$N = \left(\frac{z\sigma}{\epsilon}\right)^2$$

### Convergence
Error ∝ $1/\sqrt{N}$ (dimension-independent!)

---

## Time Allocation

| Question Type | Suggested Time |
|---------------|----------------|
| Basic MC estimation | 8-10 min |
| Error/CI calculation | 5-8 min |
| Sample size | 5-7 min |
| π estimation | 10-12 min |
| Tolerance analysis | 12-15 min |
