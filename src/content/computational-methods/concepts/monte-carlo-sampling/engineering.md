# Monte Carlo Sampling - Engineering Applications

## Industry Applications

### 1. Semiconductor Yield Analysis

**The Problem**: IC manufacturing has process variations. What percentage of chips will work?

**Monte Carlo Solution**:
1. Model each transistor with random parameters (Vth, mobility, oxide thickness)
2. Simulate circuit performance 10,000+ times
3. Count how many meet specifications
4. Yield = (passing / total) × 100%

**Industry Standard**: 6σ design targets (99.99966% yield for each spec)

---

### 2. PCB Tolerance Analysis

**Component Variations**:
- Resistors: ±1%, ±5%, ±10%
- Capacitors: ±10%, ±20%
- Inductors: ±5%, ±10%

**Monte Carlo Workflow**:
```
For each simulation:
    1. Generate random component values within tolerances
    2. Run SPICE simulation
    3. Record output metrics (gain, bandwidth, etc.)
    
After all simulations:
    4. Compute statistics (mean, std, min, max)
    5. Estimate yield for each spec
```

---

### 3. EMC/EMI Analysis

**Problem**: Predict radiated emissions with uncertain cable routing

**Approach**:
- Model cable positions as random variables
- Run EM simulation many times
- Get statistical distribution of emissions
- Design for worst-case with confidence

---

## SPICE Monte Carlo Commands

### LTspice

```spice
.param R1val=10k
.step param run 1 1000 1
.param R1mc = R1val*(1+0.05*gauss(0))

R1 1 2 {R1mc}
```

### PSpice

```spice
R1 1 2 RMOD 10K
.MODEL RMOD RES (R=1 DEV=5%)

.MC 1000 TRAN 1u 100u
+ OUTPUT ALL
```

### Key Parameters
- **DEV**: Device tolerance (per instance)
- **LOT**: Lot tolerance (all same-type devices correlated)

---

## Design Example: Voltage Regulator

**Requirement**: Output 5V ± 2% under all component variations

**Circuit**: LDO with R1 = 10k, R2 = 10k (sets output)

**Nominal**: Vout = Vref × (1 + R1/R2) = 2.5V × 2 = 5V

### Monte Carlo Analysis

```python
import numpy as np

n_simulations = 10000
Vref = 2.5  # Assume stable reference

# Component tolerances
R1_nom, R1_tol = 10000, 0.01  # 1%
R2_nom, R2_tol = 10000, 0.01  # 1%

Vout = np.zeros(n_simulations)

for i in range(n_simulations):
    R1 = R1_nom * (1 + np.random.uniform(-R1_tol, R1_tol))
    R2 = R2_nom * (1 + np.random.uniform(-R2_tol, R2_tol))
    Vout[i] = Vref * (1 + R1/R2)

# Statistics
print(f"Mean: {np.mean(Vout):.4f} V")
print(f"Std:  {np.std(Vout):.4f} V")
print(f"Min:  {np.min(Vout):.4f} V")
print(f"Max:  {np.max(Vout):.4f} V")

# Yield calculation
in_spec = np.sum((Vout >= 4.9) & (Vout <= 5.1))
yield_pct = 100 * in_spec / n_simulations
print(f"Yield: {yield_pct:.2f}%")
```

### Results (typical)
- Mean: 5.000 V
- Std: 0.035 V (~0.7%)
- Min: 4.90 V, Max: 5.10 V
- Yield: ~99.5%

### Design Iteration
If yield too low → use tighter tolerance resistors (0.1%) or add trimming.

---

## Communication System BER Estimation

### Problem
Estimate bit error rate (BER) for digital communication in noisy channel.

### Challenge
For BER = 10⁻⁶, need ~10⁷ bits for reliable estimate → slow!

### Importance Sampling Solution
1. Artificially increase noise (more errors)
2. Weight results by probability ratio
3. Dramatically fewer samples needed

```python
# Simplified importance sampling for BER
def importance_sampling_ber(snr_db, n_samples=10000):
    snr = 10**(snr_db/10)
    sigma_actual = 1/np.sqrt(2*snr)
    
    # Biased distribution (larger sigma)
    sigma_biased = 3 * sigma_actual
    
    errors = 0
    weight_sum = 0
    
    for _ in range(n_samples):
        noise = np.random.normal(0, sigma_biased)
        # Weight by likelihood ratio
        weight = np.exp(-noise**2/(2*sigma_actual**2) + 
                        noise**2/(2*sigma_biased**2))
        
        if noise > 1:  # Error condition (simplified)
            errors += weight
        weight_sum += 1
    
    return errors / weight_sum
```

---

## Reliability Analysis

### Component Failure Modeling

Each component has failure rate λ (failures per hour).

**Exponential distribution**: Time to failure ~ Exp(λ)

**Monte Carlo for system MTTF**:
```python
def system_mttf_monte_carlo(component_lambdas, n_sim=10000):
    """Estimate system MTTF for series system."""
    system_lifetimes = []
    
    for _ in range(n_sim):
        # Generate failure time for each component
        failure_times = [np.random.exponential(1/lam) 
                        for lam in component_lambdas]
        # System fails when first component fails
        system_lifetimes.append(min(failure_times))
    
    return np.mean(system_lifetimes)
```

---

## Practical Guidelines

### How Many Samples?

| Desired Precision | Required Samples |
|-------------------|------------------|
| ±10% | ~100 |
| ±3% | ~1,000 |
| ±1% | ~10,000 |
| ±0.1% | ~1,000,000 |

**Formula**: $N \approx (z/\epsilon)^2 \sigma^2$ 

where z = 2 for 95% confidence, ε = desired precision

### When Monte Carlo Makes Sense

✓ Many random variables (>5-10)
✓ Complex nonlinear relationships
✓ Need full distribution, not just mean
✓ Analytical solution impossible/impractical

✗ Few variables, simple relationships
✗ Need exact answer
✗ Each simulation is very expensive

---

## Random Number Quality

### Testing Your PRNG

```python
import numpy as np
from scipy import stats

# Generate samples
samples = np.random.random(10000)

# Tests
print(f"Mean: {np.mean(samples):.4f} (should be ~0.5)")
print(f"Std:  {np.std(samples):.4f} (should be ~0.289)")

# Chi-squared test for uniformity
hist, _ = np.histogram(samples, bins=10)
chi2, p_value = stats.chisquare(hist)
print(f"Chi-squared p-value: {p_value:.4f} (should be >0.05)")
```

### Setting Seeds for Reproducibility

```python
np.random.seed(42)  # Fixed seed for reproducible results

# Now analysis can be exactly repeated
```

---

## Common Pitfalls

### 1. Too Few Samples
**Symptom**: Results vary significantly between runs
**Fix**: Increase N until results stabilize

### 2. Correlated Variables Ignored
**Symptom**: Unrealistic combinations (e.g., all resistors high)
**Fix**: Use correlated random generation for lot variations

### 3. Wrong Distribution
**Symptom**: Tails not matching reality
**Fix**: Use measured/appropriate distributions (uniform for tolerance, normal for many natural processes)

### 4. Ignoring Rare Events
**Symptom**: Missing worst-case scenarios
**Fix**: Use importance sampling or increase N dramatically

---

## Software Tools

### Circuit Simulation
- **LTspice**: Free, .step param with gauss()
- **PSpice**: .MC command
- **Spectre**: MonteCarlo analysis

### General Purpose
- **MATLAB**: Built-in random generators, statistics
- **Python/NumPy**: numpy.random, scipy.stats
- **R**: Excellent for statistical analysis

### Specialized
- **Crystal Ball**: Excel add-in for business Monte Carlo
- **@RISK**: Another Excel add-in
- **SAS/JMP**: Industrial statistics
