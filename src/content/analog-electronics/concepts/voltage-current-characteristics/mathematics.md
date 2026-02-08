# Mathematical Foundation

> **Rigor Level**: Linear regression analysis and resistance determination from V-I data.

## Setup

<!-- DIAGRAM: diag-mathematics-01 -->

**What we're deriving**: Best-fit resistance from experimental V-I data.

**Starting assumptions**:
1. Linear V-I relationship: V = IR (Ohm's law)
2. Measurement errors are random (Gaussian distributed)
3. No systematic bias in measurements

**Notation**:
- $(V_i, I_i)$ — The i-th voltage-current measurement pair
- $R$ — True resistance (unknown)
- $\hat{R}$ — Estimated resistance from data
- $n$ — Number of data points

## Derivation: Least Squares Resistance Estimate

**Step 1**: Define the error for each measurement.

For Ohm's law V = IR, we expect $V_i = R \cdot I_i$. The residual (error) for each point is:

$$e_i = V_i - R \cdot I_i$$

**Step 2**: Minimize total squared error.

We want to find R that minimizes:

$$S(R) = \sum_{i=1}^{n} e_i^2 = \sum_{i=1}^{n} (V_i - R \cdot I_i)^2$$

**Step 3**: Take derivative and set to zero.

$$\frac{dS}{dR} = \sum_{i=1}^{n} 2(V_i - R \cdot I_i)(-I_i) = 0$$

$$\sum_{i=1}^{n} V_i I_i = R \sum_{i=1}^{n} I_i^2$$

> 🤔 **Pause & Reflect**: Why do we minimize squared error rather than just error?

<details>
<summary>Click to reveal answer</summary>

Three reasons:
1. **Sign handling**: Positive and negative errors would cancel. Squaring makes all terms positive.
2. **Penalizes outliers more**: Large errors get squared, emphasizing the need to fit them.
3. **Mathematical convenience**: Quadratic function has a single minimum, easy to find with calculus.

This is the foundation of **least squares regression**, used throughout engineering and statistics.

</details>

**Step 4**: Solve for optimal R.

$$\hat{R} = \frac{\sum_{i=1}^{n} V_i I_i}{\sum_{i=1}^{n} I_i^2}$$

This is the **least squares estimate** of resistance from V-I data.

## Goodness of Fit: R² Coefficient

<!-- DIAGRAM: diag-mathematics-02 -->

To assess how well the data fits a linear model:

**Total Sum of Squares** (variation in V):
$$SS_{tot} = \sum_{i=1}^{n} (V_i - \bar{V})^2$$

**Residual Sum of Squares** (unexplained variation):
$$SS_{res} = \sum_{i=1}^{n} (V_i - \hat{R} I_i)^2$$

**Coefficient of Determination**:
$$R^2 = 1 - \frac{SS_{res}}{SS_{tot}}$$

- $R^2 = 1$: Perfect linear fit
- $R^2 > 0.99$: Excellent fit (expected for resistors)
- $R^2 < 0.95$: Poor linearity — component may be non-ohmic

> 🤔 **Pause & Reflect**: If you measure a diode's V-I characteristic and fit a straight line, what R² value would you expect?

<details>
<summary>Click to reveal answer</summary>

**Very low R²** (perhaps 0.3-0.7) because a diode's V-I curve is exponential, not linear:

$$I = I_s(e^{V/V_T} - 1)$$

A straight line cannot fit this curve well. Low R² tells you the linear model (Ohm's law) is inappropriate for this component.

</details>

## Special Cases

**Case 1**: Perfect measurements (no noise)

All points lie exactly on V = RI line. $R^2 = 1$, $\hat{R}$ = true R.

**Case 2**: High measurement noise

Points scatter around the line. $R^2 < 1$, but $\hat{R}$ still estimates R correctly (unbiased).

**Case 3**: Non-linear component

Points follow a curve, not a line. R² is low, and $\hat{R}$ has no physical meaning.

## Key Results

| Result | Expression | Conditions |
|--------|------------|------------|
| Least squares R | $\hat{R} = \frac{\sum V_i I_i}{\sum I_i^2}$ | Assumes V = RI model |
| R² coefficient | $R^2 = 1 - \frac{SS_{res}}{SS_{tot}}$ | Measures linearity |
| Slope interpretation | $\Delta V / \Delta I = R$ | For any linear region |

---

*For exam strategies and common question patterns, continue to the Exam layer.*
