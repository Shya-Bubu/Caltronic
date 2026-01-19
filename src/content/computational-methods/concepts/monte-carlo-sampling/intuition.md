# Monte Carlo Sampling

## The Big Idea
> **When you can't solve it analytically, simulate it randomly—statistics will converge to truth.**

Some problems have no closed-form solution. High-dimensional integrals, complex probability distributions, tolerance analysis with many variables—traditional methods choke. Monte Carlo says: "Generate random samples, compute what you want, average the results."

---

## From Basics: The Law of Large Numbers

From A-Level statistics, you know:
- Flip a fair coin many times → ~50% heads
- More flips → closer to exactly 50%

This is the **Law of Large Numbers**: sample averages converge to true expected values as sample size increases.

Monte Carlo exploits this systematically.

---

## The Core Idea

### Problem: Estimate Expected Value

Want to find E[f(X)] where X is random?

**Analytical approach**: 
$$E[f(X)] = \int f(x) p(x) dx$$

Often impossible to evaluate!

**Monte Carlo approach**:
1. Generate N random samples: X₁, X₂, ..., Xₙ
2. Compute f for each: f(X₁), f(X₂), ..., f(Xₙ)
3. Average: Ê[f(X)] = (1/N) Σ f(Xᵢ)

As N → ∞, the estimate converges to the true value!

---

## Visual Understanding

```
True Distribution          Random Samples         Estimate Converges
                                                 
   ╭──────╮               • •  •                     ═══════════ true value
  ╱        ╲             •    •  •                  ╭─────────────
 ╱          ╲           •  •    •                  ╱
╱            ╲         •      •  •  •            ╱  
───────────────        ──────────────          ╱
    p(x)               N samples             estimate vs N
```

[[visual:monte-carlo-convergence]]

---

## Convergence Rate: The √N Law

### The Key Result

Monte Carlo error decreases as:

$$\text{Error} \propto \frac{\sigma}{\sqrt{N}}$$

where σ is the standard deviation of f(X).

### What This Means

| Samples N | Relative Error |
|-----------|----------------|
| 100 | 10% |
| 10,000 | 1% |
| 1,000,000 | 0.1% |

**To halve the error, you need 4× the samples!**

### The Curse and the Blessing

**Curse**: Slow convergence. 1/√N is not great.

**Blessing**: Works in ANY dimension! Traditional integration gets exponentially harder with dimension; Monte Carlo stays at 1/√N.

---

## Tolerance Analysis: The EEE Application

### The Problem

Real components have tolerances:
- Resistors: ±5%, ±1%
- Capacitors: ±10%, ±20%
- Transistors: β varies widely

**Question**: What's the distribution of circuit output given component variations?

### Analytical Approach (Often Impossible)

Propagate uncertainties through nonlinear circuit equations... good luck!

### Monte Carlo Approach

1. For each component, sample from its tolerance distribution
2. Simulate the circuit with those values
3. Record the output
4. Repeat 1000+ times
5. Analyze output distribution (mean, std, worst case)

---

## Monte Carlo Tolerance Example

**Circuit**: Voltage divider with R₁ = 10kΩ ± 5%, R₂ = 10kΩ ± 5%

**Output**: V_out = V_in × R₂/(R₁ + R₂)

**Nominal**: V_out = 0.5 × V_in

**Monte Carlo Simulation**:

```python
# Pseudocode
for i in range(10000):
    R1 = 10000 * (1 + random_uniform(-0.05, 0.05))
    R2 = 10000 * (1 + random_uniform(-0.05, 0.05))
    Vout[i] = Vin * R2 / (R1 + R2)

mean_Vout = average(Vout)
std_Vout = standard_deviation(Vout)
```

**Results** (typical):
- Mean: 0.500 × V_in (as expected)
- Std: 0.025 × V_in (2.5% variation)
- 3σ range: [0.425, 0.575] × V_in

---

## When to Use Monte Carlo

### Good For:
- High-dimensional integrals (> 4-5 dimensions)
- Complex probability distributions
- Tolerance/sensitivity analysis
- When you have a simulator but no analytical model
- "What if" scenario analysis

### Not Good For:
- Simple 1D integrals (analytical or numerical better)
- When you need exact answers
- When samples are expensive to generate
- Very rare events (need too many samples)

---

## Variance Reduction Techniques

### The Problem

Basic Monte Carlo can be slow. How to speed up?

### 1. Importance Sampling

Sample more from "important" regions, weight results accordingly.

### 2. Stratified Sampling

Divide space into strata, sample each systematically.

### 3. Antithetic Variables

For each sample X, also use -X (if appropriate). Reduces variance.

### 4. Control Variates

Use a related variable with known mean to reduce variance.

These techniques can improve convergence by 10-100×!

---

## Random Number Generation

### The Irony

Monte Carlo needs random numbers, but computers are deterministic!

**Solution**: Pseudorandom number generators (PRNGs)
- Deterministic algorithms that LOOK random
- Pass statistical tests for randomness
- Reproducible if you set the seed

### Quality Matters

Bad PRNGs can give wrong Monte Carlo results. Use established generators:
- Mersenne Twister (MT19937)
- PCG family
- Hardware random number generators for cryptography

---

## Monte Carlo in SPICE

### .MC Analysis

SPICE has built-in Monte Carlo:

```spice
.MC 1000 TRAN 1u 10u
+ RESISTOR R1 10K DEV 5%
+ RESISTOR R2 10K DEV 5%
```

Runs 1000 simulations with random component values, gives statistical output.

### What You Get

- Nominal, mean, standard deviation
- Min/max values
- Distribution histograms
- Yield estimates (% passing spec)

---

## Worked Example

**Problem**: Estimate π using Monte Carlo.

**Method**: 
- Square of side 2, inscribed circle of radius 1
- Area of circle = π, area of square = 4
- Ratio of areas = π/4

**Algorithm**:
1. Generate random point (x, y) in [-1, 1] × [-1, 1]
2. Check if x² + y² ≤ 1 (inside circle)
3. Ratio of "inside" to total = π/4
4. π ≈ 4 × (inside count) / (total count)

**Results**:
- N = 100: π ≈ 3.12 (error ~0.7%)
- N = 10,000: π ≈ 3.1416 (error ~0.01%)
- N = 1,000,000: π ≈ 3.14159 (error ~0.0001%)

[[visual:monte-carlo-pi-estimation]]

---

## Integration by Monte Carlo

### General Formula

To estimate integral:
$$I = \int_a^b f(x) dx$$

Monte Carlo estimator:
$$\hat{I} = (b-a) \times \frac{1}{N} \sum_{i=1}^{N} f(X_i)$$

where Xᵢ are uniform random in [a, b].

### Why It Works

(b-a)/N × f(Xᵢ) is an unbiased estimator of I. Averaging reduces variance.

---

## Applications in EEE

### 1. Tolerance Analysis
Component variations → output distribution

### 2. Yield Estimation  
What fraction of manufactured circuits meet spec?

### 3. Reliability Analysis
Time to failure with random component degradation

### 4. EMC Analysis
Random coupling paths, statistical field distributions

### 5. Communication Systems
Bit error rate estimation in noisy channels

---

## Key Takeaways

1. **Monte Carlo** uses random sampling to solve deterministic problems
2. **Convergence** is O(1/√N)—slow but dimension-independent
3. **Tolerance analysis** is the primary EEE application
4. **SPICE .MC** provides built-in Monte Carlo simulation
5. **Variance reduction** can dramatically improve efficiency
6. Works when **analytical methods fail** (high dimension, complex distributions)

---

## The Big Picture

You now have four tools for computational problems:

| Tool | When to Use |
|------|-------------|
| Approximation | Simplify complex functions |
| Discretization | Make continuous problems finite |
| Linearization | Simplify nonlinear systems locally |
| Monte Carlo | Handle uncertainty and high dimensions |

These form the foundation of ALL computational engineering. Every simulator, every numerical tool, uses some combination of these techniques.

---

## What's Next

In Lesson 3, we'll see how these techniques combine in **Mathematical Modeling**—building computational representations of real systems. The tools you've learned here are the building blocks.
