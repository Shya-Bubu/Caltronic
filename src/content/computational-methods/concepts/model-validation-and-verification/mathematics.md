# Model Validation and Verification - Mathematical Framework

## Formal Definitions

### Verification

**Definition**: The process of determining that a computational model accurately represents the underlying mathematical model and its solution.

Mathematically, if:
- $u$ = exact solution to the mathematical model
- $u_h$ = numerical solution (with discretization parameter h)

Then verification confirms:
$$\lim_{h \to 0} \|u_h - u\| = 0$$

And the convergence rate is as expected.

### Validation

**Definition**: The process of determining the degree to which a model is an accurate representation of the real world from the perspective of the intended uses.

If:
- $u$ = solution predicted by the model
- $D$ = experimental observations

Then validation assesses:
$$\|u - D\| \leq \epsilon_{acceptable}$$

accounting for all sources of uncertainty.

---

## Verification Mathematics

### Order of Accuracy

For a numerical method with truncation error:
$$\tau_h = C h^p + O(h^{p+1})$$

The **order of accuracy** is p.

**Verification test**: Given solutions at two grid sizes h and h/2:
$$p \approx \frac{\log(|u_h - u_{h/2}|) - \log(|u_{h/2} - u_{h/4}|)}{\log(2)}$$

### Richardson Extrapolation

For a p-th order method:
$$u \approx u_h + Ch^p$$
$$u \approx u_{h/2} + C(h/2)^p$$

Solving for u (exact):
$$u \approx u_{h/2} + \frac{u_{h/2} - u_h}{2^p - 1}$$

This provides both an improved estimate and an error estimate:
$$\epsilon \approx \frac{u_{h/2} - u_h}{2^p - 1}$$

### Grid Convergence Index (GCI)

The GCI provides a standardized error band:

$$GCI_{fine} = \frac{F_s |u_{h/2} - u_h|}{(r^p - 1)}$$

where:
- $F_s$ = safety factor (typically 1.25 for 3+ grids)
- $r$ = refinement ratio (typically 2)
- $p$ = observed order of accuracy

**Interpretation**: With 95% confidence, the true solution lies within $u_{h/2} \pm GCI_{fine}$.

---

## Manufactured Solutions Method

### Procedure

1. **Choose** a smooth manufactured solution $u_m(x,t)$
2. **Substitute** into the governing equation:
   $$\mathcal{L}[u_m] = f_m$$
   where $\mathcal{L}$ is the differential operator
3. **Solve** the modified problem:
   $$\mathcal{L}[u_h] = f_m$$
4. **Compare** $u_h$ to $u_m$

### Example: Heat Equation

**Governing equation**: $\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}$

**Manufactured solution**: $u_m = \sin(\pi x)\cos(\omega t)$

**Substituting**:
$$\frac{\partial u_m}{\partial t} = -\omega\sin(\pi x)\sin(\omega t)$$
$$\frac{\partial^2 u_m}{\partial x^2} = -\pi^2\sin(\pi x)\cos(\omega t)$$

**Required source term**:
$$f_m = -\omega\sin(\pi x)\sin(\omega t) + \alpha\pi^2\sin(\pi x)\cos(\omega t)$$

**Verification**: Solve with $f_m$ and compare to $\sin(\pi x)\cos(\omega t)$.

---

## Validation Mathematics

### Uncertainty Quantification

Total prediction uncertainty:
$$u_{total}^2 = u_{model}^2 + u_{numerical}^2 + u_{input}^2$$

Where:
- $u_{model}$ = model form uncertainty (unknown)
- $u_{numerical}$ = numerical uncertainty (from verification)
- $u_{input}$ = input parameter uncertainty (from specifications)

### Validation Metric

Define the validation comparison error:
$$E = u_{simulation} - D_{experiment}$$

And the validation uncertainty:
$$u_{val}^2 = u_{numerical}^2 + u_{input}^2 + u_{D}^2$$

where $u_D$ = measurement uncertainty.

**Validation criterion**:
$$|E| \leq k \cdot u_{val}$$

where k is a coverage factor (typically k = 2 for 95% confidence).

### Area Validation Metric

For comparing full curves (e.g., frequency response):

$$V = \frac{1}{x_{max} - x_{min}} \int_{x_{min}}^{x_{max}} |u(x) - D(x)| dx$$

Normalized version:
$$V_{norm} = \frac{V}{\bar{D}}$$

where $\bar{D}$ is the mean of experimental data.

---

## Sensitivity Analysis

### Local Sensitivity

Derivative of output with respect to parameter:
$$S_i = \frac{\partial y}{\partial p_i}$$

Normalized sensitivity:
$$S_i^* = \frac{p_i}{y} \frac{\partial y}{\partial p_i} = \frac{\partial \ln y}{\partial \ln p_i}$$

**Interpretation**: A 1% change in $p_i$ causes approximately $S_i^*$% change in y.

### Global Sensitivity (Sobol Indices)

Decompose output variance:
$$Var(y) = \sum_i V_i + \sum_{i<j} V_{ij} + \cdots$$

First-order Sobol index:
$$S_i = \frac{V_i}{Var(y)}$$

Total-effect index (includes interactions):
$$S_{Ti} = \frac{E[Var(y|X_{\sim i})]}{Var(y)}$$

---

## Model Selection and Comparison

### Akaike Information Criterion (AIC)

For comparing models with different numbers of parameters:
$$AIC = 2k - 2\ln(\hat{L})$$

where:
- $k$ = number of parameters
- $\hat{L}$ = maximum likelihood

**Lower AIC = better model** (balances fit vs complexity).

### Bayesian Information Criterion (BIC)

$$BIC = k\ln(n) - 2\ln(\hat{L})$$

where $n$ = number of data points.

BIC penalizes complexity more heavily than AIC.

### Cross-Validation

Split data into training and test sets:
$$CV = \frac{1}{K}\sum_{k=1}^{K} |y_{test,k} - \hat{y}_{test,k}|^2$$

Leave-one-out CV:
$$LOOCV = \frac{1}{n}\sum_{i=1}^{n} (y_i - \hat{y}_{-i})^2$$

---

## Statistical Tests for Validation

### Hypothesis Testing Framework

**Null hypothesis**: Model is valid ($|E| \leq \epsilon$)
**Alternative**: Model is invalid ($|E| > \epsilon$)

Test statistic:
$$t = \frac{E}{u_E}$$

Reject null hypothesis if $|t| > t_{critical}$ (from t-distribution).

### Chi-Square Test for Frequency Response

For comparing model to measurement at multiple frequencies:

$$\chi^2 = \sum_{i=1}^{n} \frac{(y_{model,i} - y_{meas,i})^2}{\sigma_i^2}$$

If $\chi^2 < \chi^2_{critical}(n-p, \alpha)$, model is statistically consistent with data.

---

## Error Propagation

### Linear Propagation

For $y = f(x_1, x_2, ..., x_n)$:

$$u_y^2 = \sum_{i=1}^{n} \left(\frac{\partial f}{\partial x_i}\right)^2 u_{x_i}^2 + 2\sum_{i<j} \frac{\partial f}{\partial x_i}\frac{\partial f}{\partial x_j} u_{x_i,x_j}$$

where $u_{x_i,x_j}$ is the covariance.

### Monte Carlo Propagation

For nonlinear functions or non-Gaussian inputs:

1. Sample input parameters from their distributions
2. Run model N times
3. Compute statistics of output

$$\bar{y} = \frac{1}{N}\sum_{k=1}^{N} y_k$$
$$u_y = \sqrt{\frac{1}{N-1}\sum_{k=1}^{N}(y_k - \bar{y})^2}$$

---

## Summary of Key Formulas

| Concept | Formula |
|---------|---------|
| Richardson extrapolation | $u \approx u_{h/2} + \frac{u_{h/2} - u_h}{2^p - 1}$ |
| GCI (fine grid) | $GCI = \frac{1.25 |u_{h/2} - u_h|}{2^p - 1}$ |
| Observed order | $p = \frac{\ln(e_h/e_{h/2})}{\ln(2)}$ |
| Validation uncertainty | $u_{val}^2 = u_{num}^2 + u_{input}^2 + u_{meas}^2$ |
| Normalized sensitivity | $S^* = \frac{p}{y}\frac{\partial y}{\partial p}$ |
| AIC | $AIC = 2k - 2\ln(\hat{L})$ |
