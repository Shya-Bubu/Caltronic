# Monte Carlo Sampling - Mathematical Foundations

## Probability Foundations

### Expected Value

For continuous random variable X with PDF p(x):
$$E[f(X)] = \int_{-\infty}^{\infty} f(x) p(x) dx$$

For discrete X with PMF P(X = xᵢ):
$$E[f(X)] = \sum_i f(x_i) P(X = x_i)$$

### Monte Carlo Estimator

The **sample mean** approximates expected value:

$$\hat{\mu}_N = \frac{1}{N}\sum_{i=1}^{N} f(X_i)$$

where $X_1, X_2, ..., X_N$ are i.i.d. samples from distribution of X.

---

## Law of Large Numbers

### Weak Law (Convergence in Probability)

For any ε > 0:
$$\lim_{N \to \infty} P\left(|\hat{\mu}_N - E[f(X)]| > \epsilon\right) = 0$$

**Meaning**: Sample mean gets arbitrarily close to true mean with high probability.

### Strong Law (Almost Sure Convergence)

$$P\left(\lim_{N \to \infty} \hat{\mu}_N = E[f(X)]\right) = 1$$

**Meaning**: Sample mean converges to true mean with probability 1.

---

## Central Limit Theorem

### Statement

For i.i.d. samples with mean μ and variance σ²:

$$\frac{\hat{\mu}_N - \mu}{\sigma/\sqrt{N}} \xrightarrow{d} N(0, 1)$$

as N → ∞.

### Practical Form

$$\hat{\mu}_N \sim N\left(\mu, \frac{\sigma^2}{N}\right)$$ approximately

**Standard error**: $SE = \sigma/\sqrt{N}$

### Confidence Intervals

95% confidence interval for true mean:
$$\hat{\mu}_N \pm 1.96 \cdot \frac{\hat{\sigma}}{\sqrt{N}}$$

where $\hat{\sigma}$ is the sample standard deviation.

---

## Derivation: The √N Convergence

### Variance of Sample Mean

$$\text{Var}(\hat{\mu}_N) = \text{Var}\left(\frac{1}{N}\sum_{i=1}^N X_i\right)$$

Since Xᵢ are independent:
$$= \frac{1}{N^2}\sum_{i=1}^N \text{Var}(X_i) = \frac{1}{N^2} \cdot N \cdot \sigma^2 = \frac{\sigma^2}{N}$$

**Standard deviation** (error):
$$\sqrt{\text{Var}(\hat{\mu}_N)} = \frac{\sigma}{\sqrt{N}}$$

This is why error ∝ 1/√N!

---

## Monte Carlo Integration

### Setup

Want to compute:
$$I = \int_a^b f(x) dx$$

### Transformation

Write as expected value:
$$I = (b-a) \int_a^b f(x) \cdot \frac{1}{b-a} dx = (b-a) \cdot E[f(U)]$$

where U ~ Uniform[a, b].

### Estimator

$$\hat{I}_N = (b-a) \cdot \frac{1}{N}\sum_{i=1}^N f(X_i)$$

where Xᵢ ~ Uniform[a, b].

### Error Analysis

$$\text{Var}(\hat{I}_N) = \frac{(b-a)^2}{N} \text{Var}(f(U))$$

---

## Multidimensional Integration

### Problem

$$I = \int_{\Omega} f(\mathbf{x}) d\mathbf{x}$$

where Ω ⊂ ℝᵈ is d-dimensional.

### Monte Carlo Approach

$$\hat{I}_N = \frac{V(\Omega)}{N}\sum_{i=1}^N f(\mathbf{X}_i)$$

where V(Ω) is volume and Xᵢ are uniform in Ω.

### Dimension Independence!

Error ∝ $\frac{1}{\sqrt{N}}$ regardless of dimension d!

Compare to trapezoidal rule with n points per dimension:
- Total points: $n^d$ (exponential in d!)
- Error ∝ $n^{-2}$ = $N^{-2/d}$

For d > 4: Monte Carlo wins.

---

## Variance Reduction Techniques

### 1. Importance Sampling

**Idea**: Sample from distribution g(x) instead of uniform:

$$E_p[f(X)] = \int f(x) p(x) dx = \int f(x) \frac{p(x)}{g(x)} g(x) dx = E_g\left[f(X)\frac{p(X)}{g(X)}\right]$$

**Estimator**:
$$\hat{I} = \frac{1}{N}\sum_{i=1}^N f(X_i) \frac{p(X_i)}{g(X_i)}$$

where Xᵢ ~ g(x).

**Optimal g(x)**: Proportional to |f(x)|p(x)

### 2. Antithetic Variables

For estimating E[f(X)] where X ~ Uniform[0,1]:

Use pairs: X and (1-X)

$$\hat{\mu} = \frac{1}{N}\sum_{i=1}^{N/2} \frac{f(X_i) + f(1-X_i)}{2}$$

If f is monotonic, this can halve variance!

### 3. Control Variates

If g(X) has known mean E[g(X)] = μg:

$$\hat{\mu}_c = \frac{1}{N}\sum_{i=1}^N f(X_i) - c\left[\frac{1}{N}\sum_{i=1}^N g(X_i) - \mu_g\right]$$

Optimal: $c^* = \text{Cov}(f, g)/\text{Var}(g)$

### 4. Stratified Sampling

Divide domain into strata, sample each proportionally:

$$\hat{I} = \sum_{j=1}^k \frac{V_j}{N_j}\sum_{i=1}^{N_j} f(X_{ji})$$

Reduces variance if function varies differently in different regions.

---

## Random Number Generation

### Linear Congruential Generator (LCG)

$$X_{n+1} = (aX_n + c) \mod m$$

Simple but has known weaknesses (correlations in high dimensions).

### Mersenne Twister

- Period: $2^{19937} - 1$ (huge!)
- Passes most statistical tests
- Default in NumPy, MATLAB

### Transformation Methods

**Inverse Transform**: If F is CDF of desired distribution:
$$X = F^{-1}(U)$$ where U ~ Uniform[0,1]

**Box-Muller** (for normal):
$$X = \sqrt{-2\ln U_1} \cos(2\pi U_2)$$
$$Y = \sqrt{-2\ln U_1} \sin(2\pi U_2)$$

gives independent N(0,1) from uniform U₁, U₂.

---

## Convergence Diagnostics

### Sample Size Estimation

For desired precision ε with confidence level 1-α:

$$N \geq \left(\frac{z_{\alpha/2} \sigma}{\epsilon}\right)^2$$

where $z_{\alpha/2}$ is the standard normal quantile.

### Running Mean Plot

Plot $\hat{\mu}_n$ vs n. Should stabilize as n increases.

### Effective Sample Size

For correlated samples:
$$N_{eff} = \frac{N}{1 + 2\sum_{k=1}^{\infty} \rho_k}$$

where ρₖ is autocorrelation at lag k.

---

## Error Analysis Summary

### Standard Error

$$SE = \frac{\hat{\sigma}}{\sqrt{N}}$$

### 95% Confidence Interval

$$\hat{\mu} \pm 1.96 \cdot SE$$

### Relative Error

$$RE = \frac{SE}{|\hat{\mu}|}$$

### Required Samples for Precision

To achieve relative error ε:
$$N \approx \left(\frac{1.96 \cdot CV}{\epsilon}\right)^2$$

where CV = σ/μ is coefficient of variation.
