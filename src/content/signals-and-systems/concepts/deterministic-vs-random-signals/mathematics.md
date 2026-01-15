# Mathematical Foundations

> From certainty to probability distributions.

---

## Deterministic Signal Definition

A signal $x(t)$ is **deterministic** if it can be expressed by an explicit mathematical formula:

$$x(t) = f(t)$$

For any time $t$, the value is:
$$\Pr[x(t) = f(t)] = 1$$

The probability is 1 — absolute certainty.

---

## Random Signal Definition

A **random signal** (also called stochastic process) is a function of time whose value at each instant is a random variable.

$$x(t) \sim \text{PDF}_{t}$$

For each $t$, $x(t)$ is drawn from some probability density function.

---

## Key Distinctions

| Property | Deterministic | Random |
|----------|---------------|--------|
| **Representation** | Formula | Statistical description |
| **Knowledge** | Exact value | Distribution of values |
| **Repeatability** | Same every time | Different each realization |
| **Analysis tools** | Algebra, calculus | Probability theory |

---

## Random Variables Review

A random variable $X$ has:

- **PDF** $f_X(x)$: Probability density function
- **Mean**: $\mu_X = E[X] = \int x f_X(x) dx$
- **Variance**: $\sigma_X^2 = E[(X-\mu_X)^2]$

For random signals, these become functions of time:
- Mean: $\mu_x(t) = E[x(t)]$
- Autocorrelation: $R_x(t_1, t_2) = E[x(t_1)x(t_2)]$

---

## The Gaussian Distribution

Many random signals follow the **Gaussian (normal) distribution**:

$$f_X(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

Properties:
- Completely described by mean $\mu$ and variance $\sigma^2$
- Bell-shaped curve
- Central limit theorem: sum of many effects → Gaussian

---

## Stationarity (Preview)

A random signal is **stationary** if its statistical properties don't change over time:

- Mean is constant: $\mu_x(t) = \mu_x$
- Autocorrelation depends only on time difference: $R_x(t_1, t_2) = R_x(t_2 - t_1)$

Most practical analysis assumes stationarity (even if approximate).

---

## Ensemble vs Time Averages

| Average Type | Description |
|--------------|-------------|
| **Ensemble** | Average over multiple realizations at fixed time |
| **Time** | Average over time for single realization |

For **ergodic** signals, these are equal — huge simplification!

---

## Why This Matters

Even in "deterministic" analysis:
- We model noise as random
- We design for worst-case scenarios
- We specify components by tolerance distributions

Understanding probability is essential for real engineering.
