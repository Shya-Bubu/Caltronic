# Random Sampling: Using Randomness to Understand Systems

> **Why This Matters**: The first three concepts we've studied are all **deterministic** — given the same input, they always produce the same output. Random sampling is fundamentally different: it uses **deliberate randomness** to estimate quantities that might be too complex to compute directly. This is not a sign of imprecision — it's one of the most powerful computational strategies ever invented.

## Definition

> **Random Sampling**: Using randomness to select representatives from a population or distribution to estimate properties or solve problems.

The core idea: **we use probability and statistics to learn about a system without examining every element.**

## Example 1: Monte Carlo Integration

Suppose you need to estimate a definite integral that has no closed-form solution:

$$\int_0^1 f(x)\,dx$$

[[visual:monte-carlo-integration]]

The Monte Carlo method:

1. **Generate** $N$ random points $x_i \sim \text{Uniform}(0, 1)$
2. **Compute** $f(x_i)$ for each
3. **Estimate**:

$$\boxed{\int_0^1 f(x)\,dx \approx \frac{1}{N}\sum_{i=1}^{N} f(x_i)}$$

The error decreases as $1/\sqrt{N}$ — regardless of the dimension of the integral!

[[visual:monte-carlo-error-vs-n]]

This last point is crucial. For a 10-dimensional integral:
- **Grid-based** (discretization): needs $100^{10} = 10^{20}$ grid points — completely infeasible
- **Monte Carlo**: needs $\sim 10000$ random points for 1% accuracy — easily done

> **Key Insight**: Monte Carlo's error rate $\sim 1/\sqrt{N}$ doesn't depend on dimension. This makes it the *only* practical method for high-dimensional integrals (which appear constantly in finance, physics, and machine learning).

<details>
<summary><strong>Pause & Think</strong>: Why does Monte Carlo's error scale as 1/√N rather than 1/N?</summary>

By the Central Limit Theorem, the average of N random samples has standard deviation $\sigma/\sqrt{N}$, where $\sigma$ is the standard deviation of the underlying distribution. This means quadrupling the number of samples only halves the error. This slow convergence is the main weakness of Monte Carlo — but it's compensated by dimension-independence.

</details>

## Example 2: Circuit Yield Analysis

Given components with manufacturing tolerances:

$$R = 1\,\text{k}\Omega \pm 10\%, \quad C = 1\,\text{nF} \pm 5\%$$

[[visual:circuit-yield-sampling]]

**How many manufactured circuits will meet specifications?**

Monte Carlo yield analysis:

1. Randomly sample $R$ and $C$ from their tolerance distributions
2. Simulate the circuit for each random sample
3. Count the fraction meeting specs → **estimated yield**

$$\boxed{\text{Yield} = \frac{\text{Circuits meeting spec}}{N} \times 100\%}$$

[[visual:yield-histogram]]

With $N = 1000$ trials: yield estimate is accurate to $\pm 3\%$ (at 95% confidence). With $N = 10000$: accurate to $\pm 1\%$. This is vastly more efficient than testing every possible corner of the parameter space.

## Example 3: Stochastic Simulation (Random Walks)

Random sampling also models inherently random physical processes. **Brownian motion** (diffusion) is described by:

$$\boxed{x_{n+1} = x_n + \sqrt{\Delta t} \cdot Z_n, \quad Z_n \sim N(0, 1)}$$

[[visual:random-walk-paths]]

Each simulation run produces one **possible path**. Running many simulations gives you the statistics:
- Mean position vs. time
- Spread (diffusion rate)
- Probability of exceeding a threshold

This approach is used in modeling:
- **Noise in electronic circuits** (thermal noise, shot noise)
- **Stock prices** (geometric Brownian motion)
- **Particle diffusion** (semiconductor physics)

## The Key Attribute

$$\boxed{\text{Random sampling: answers are statistical (with confidence intervals), not deterministic}}$$

[[visual:deterministic-vs-statistical]]

This is the fundamental philosophical difference:

| Property | Discretization | Random Sampling |
|----------|---------------|----------------|
| Approach | Systematic, grid-based | Stochastic, scatter-based |
| Result type | Deterministic | Statistical (with confidence interval) |
| Error scaling | Depends on grid spacing | $\sim 1/\sqrt{N}$ (dimension-independent) |
| Strength | Predictable, structured | Scales to high dimensions |
| Parallelization | Moderate | Embarrassingly parallel |

## Combining Random Sampling with Other Concepts

Random sampling is **orthogonal** to the other three concepts — it can be combined with any of them:

- **Approximation + Random**: Approximate a complex distribution with a simpler one, then sample
- **Discretization + Random**: Random sampling on a discrete set (e.g., randomly selecting test cases from a database)
- **Linearization + Random**: Linearize a system, then use random sampling for uncertainty analysis

## Summary

- Random sampling uses deliberate randomness to estimate properties of complex systems
- **Monte Carlo integration**: $\int f(x)dx \approx (1/N)\sum f(x_i)$, error $\sim 1/\sqrt{N}$, dimension-independent
- **Circuit yield analysis**: randomly sample component values, simulate, count fraction meeting spec
- **Stochastic simulation**: model random processes like Brownian motion ($x_{n+1} = x_n + \sqrt{\Delta t} \cdot Z_n$)
- Results are **statistical** (with confidence intervals), not deterministic
- Random sampling is orthogonal to and combinable with approximation, discretization, and linearization
