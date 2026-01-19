# Model Validation and Verification - Exam Preparation

## Key Definitions

| Term | Definition |
|------|------------|
| **Verification** | Are we solving the equations correctly? (Math check) |
| **Validation** | Do the equations represent reality? (Physics check) |
| **Convergence** | Solution approaches a limit as step size decreases |
| **Uncertainty** | Quantified doubt about the result |

---

## Essential Formulas

### Richardson Extrapolation
$$u_{exact} \approx u_{h/2} + \frac{u_{h/2} - u_h}{2^p - 1}$$

### Error Estimate
$$\epsilon \approx \frac{u_{h/2} - u_h}{2^p - 1}$$

### Observed Order of Accuracy
$$p = \frac{\ln\left(\frac{e_h}{e_{h/2}}\right)}{\ln(2)} = \frac{\ln\left(\frac{u_h - u_{h/2}}{u_{h/2} - u_{h/4}}\right)}{\ln(2)}$$

### Combined Uncertainty
$$u_{total} = \sqrt{u_1^2 + u_2^2 + u_3^2 + ...}$$

---

## Common Exam Question Types

### Type 1: Convergence Study

**Question Pattern**: "Given solutions at different step sizes, estimate the exact solution and the order of accuracy."

**Example**:
Solutions to an ODE at different time steps:
- Δt = 0.1s: y = 2.60
- Δt = 0.05s: y = 2.54  
- Δt = 0.025s: y = 2.52

**Solution**:

Step 1: Calculate error ratios
$$\frac{e_h}{e_{h/2}} = \frac{y_{0.1} - y_{0.05}}{y_{0.05} - y_{0.025}} = \frac{2.60 - 2.54}{2.54 - 2.52} = \frac{0.06}{0.02} = 3$$

Step 2: Determine order
$$p = \frac{\ln(3)}{\ln(2)} = 1.585 \approx 1.5$$

(This suggests method is between first and second order)

Step 3: Estimate exact solution (using finest grids)
$$y_{exact} \approx 2.52 + \frac{2.52 - 2.54}{2^{1.5} - 1} = 2.52 + \frac{-0.02}{1.83} = 2.509$$

---

### Type 2: Verification vs Validation

**Question Pattern**: "Classify the following activity as verification or validation."

| Activity | Answer | Explanation |
|----------|--------|-------------|
| Comparing to analytical solution | **Verification** | Checking math |
| Comparing to bench measurement | **Validation** | Checking physics |
| Checking conservation of energy | **Verification** | Checking implementation |
| Running at different step sizes | **Verification** | Checking numerical accuracy |
| Testing against known SPICE results | Could be either | Depends on trust in SPICE model |

---

### Type 3: Uncertainty Propagation

**Question Pattern**: "Given component tolerances, find the uncertainty in the calculated result."

**Example**:
Time constant τ = RC where R = 1kΩ ± 1% and C = 1μF ± 5%.
Find uncertainty in τ.

**Solution**:

For τ = RC:
$$\frac{u_\tau}{\tau} = \sqrt{\left(\frac{u_R}{R}\right)^2 + \left(\frac{u_C}{C}\right)^2}$$

$$= \sqrt{(0.01)^2 + (0.05)^2} = \sqrt{0.0001 + 0.0025} = \sqrt{0.0026} = 0.051$$

$$u_\tau = 0.051 \times 1ms = 51\mu s$$

**Result**: τ = 1.00 ms ± 51 μs (or ±5.1%)

---

### Type 4: Manufactured Solutions

**Question Pattern**: "Describe how to use manufactured solutions to verify a solver."

**Template Answer**:

1. **Choose** manufactured solution $u_m$ that satisfies boundary conditions
2. **Substitute** into governing equation $\mathcal{L}[u_m] = f_m$ to find required source
3. **Modify** solver to include source term $f_m$
4. **Run** solver with this source term
5. **Compare** numerical solution $u_h$ to $u_m$
6. **Check** that error decreases at expected rate with grid refinement

**Advantage**: Works even when analytical solution doesn't exist

---

### Type 5: Identifying Model Deficiencies

**Question Pattern**: "Simulation predicts X, measurement shows Y. What could explain the discrepancy?"

**Framework for Answer**:

1. **Missing physics** in model
   - Parasitic elements (C, L) not included
   - Temperature effects
   - Nonlinear behavior

2. **Wrong parameters**
   - Nominal vs actual component values
   - Operating conditions differ

3. **Measurement issues**
   - Probe loading
   - Calibration errors
   - Noise

4. **Numerical issues**
   - Insufficient resolution
   - Solver convergence problems

---

## Worked Problems

### Problem 1: Convergence Study (15 marks)

**Q**: A finite difference solver gives these results for peak voltage:

| Grid points | V_peak |
|-------------|--------|
| 100 | 4.812 V |
| 200 | 4.903 V |
| 400 | 4.926 V |

(a) Estimate the order of convergence (5 marks)
(b) Estimate the exact solution using Richardson extrapolation (5 marks)
(c) Estimate the error in the finest grid solution (5 marks)

**Solution**:

(a) Order of convergence:
$$\frac{e_{100}}{e_{200}} = \frac{4.812 - 4.903}{4.903 - 4.926} = \frac{-0.091}{-0.023} = 3.96 \approx 4$$

$$p = \frac{\ln(4)}{\ln(2)} = 2$$

**The method is second-order accurate.**

(b) Richardson extrapolation (using 200 and 400 point solutions):
$$V_{exact} \approx V_{400} + \frac{V_{400} - V_{200}}{2^p - 1}$$
$$= 4.926 + \frac{4.926 - 4.903}{2^2 - 1} = 4.926 + \frac{0.023}{3} = 4.934 V$$

(c) Error estimate for 400-point solution:
$$\epsilon_{400} \approx \frac{V_{400} - V_{200}}{2^p - 1} = \frac{0.023}{3} = 0.0077 V \approx 8 mV$$

---

### Problem 2: Validation Assessment (10 marks)

**Q**: A simulation predicts bandwidth of 10.0 MHz. Measurement gives 9.2 MHz ± 0.5 MHz.
Component tolerances contribute ±3% uncertainty to simulation.
Numerical uncertainty is estimated at ±1%.

(a) Calculate the combined validation uncertainty (5 marks)
(b) Is the model validated to 95% confidence? (5 marks)

**Solution**:

(a) Combined uncertainty:
- Measurement uncertainty: 0.5 MHz
- Simulation input uncertainty: 3% × 10.0 MHz = 0.3 MHz
- Numerical uncertainty: 1% × 10.0 MHz = 0.1 MHz

$$u_{val} = \sqrt{0.5^2 + 0.3^2 + 0.1^2} = \sqrt{0.25 + 0.09 + 0.01} = \sqrt{0.35} = 0.59 MHz$$

(b) Validation check:
- Comparison error: E = 10.0 - 9.2 = 0.8 MHz
- 95% confidence interval: ±2 × u_val = ±1.18 MHz

Since |E| = 0.8 MHz < 1.18 MHz:
**Yes, the model is validated to 95% confidence.**

---

### Problem 3: Verification Checklist (10 marks)

**Q**: List five specific checks you would perform to verify a SPICE transient simulation.

**Answer**:

1. **Conservation check**: Sum of power delivered by sources equals sum of power dissipated plus rate of energy storage change

2. **DC convergence**: Initial operating point matches DC analysis result

3. **Time step convergence**: Reduce TMAX and verify solution doesn't change significantly

4. **Analytical comparison**: For simple sub-circuits (RC networks), compare time constant to τ = RC

5. **Symmetry check**: If circuit has symmetry, verify symmetric voltages/currents

6. **Limiting behavior**: Verify solution approaches expected DC value as t → ∞

7. **Energy check**: For reactive circuits, verify total stored energy = initial stored energy for lossless cases

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Confusing verification and validation | V&V are different; both needed |
| Using only one grid for convergence study | Need at least 3 grid levels |
| Forgetting measurement uncertainty | Always include in validation |
| Claiming validation from one test point | Validate across operating range |
| Not documenting conditions | Record T, bias, equipment |

---

## Quick Reference

| Check Type | Method | What It Catches |
|------------|--------|-----------------|
| Analytical comparison | Compare to formula | Code bugs |
| Convergence study | Vary step size | Numerical error |
| Conservation | Check Σi=0, Σv=0 | Implementation errors |
| Benchmark | Compare to validated code | Systematic errors |
| Measurement | Compare to hardware | Missing physics |
