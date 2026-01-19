# Model Validation and Verification

## The Most Important Questions

You've built a beautiful mathematical model. Conservation laws? Check. Constitutive relations? Check. Solved the equations? Check.

But here's the uncomfortable truth: **your model might be completely wrong.**

Two critical questions must be answered:
1. **Did we solve the equations correctly?** (Verification)
2. **Do the equations actually describe reality?** (Validation)

These are different questions, and both are essential.

---

## The Restaurant Analogy

Imagine you're following a recipe to cook a dish:

### Verification: Did You Follow the Recipe?

- Did you use the right amounts?
- Did you cook for the correct time?
- Did you do the steps in the right order?

If yes → You've verified you followed the recipe correctly.

### Validation: Is the Recipe Good?

- Does the dish taste good?
- Is it what the customer wanted?
- Does it match what a real Italian chef would make?

If no → The recipe itself is wrong (even if you followed it perfectly).

**A perfectly executed bad recipe still produces bad food!**

---

## Verification: Did We Solve Correctly?

### What Verification Checks

> "Am I solving the mathematical equations without error?"

This includes:
- Did the computer solve the equations accurately?
- Did I implement the equations correctly in code?
- Are numerical errors under control?

### Common Verification Methods

#### 1. Analytical Solutions

For simple cases, solve by hand and compare:

```
Model: dv/dt + v/RC = Vs/RC

Analytical solution: v(t) = Vs(1 - e^(-t/RC))

Compare simulation output to this formula!
```

If they match (within numerical tolerance) → Code is likely correct.

#### 2. Manufactured Solutions

For complex problems with no analytical solution:

1. Choose a "fake" solution (any smooth function)
2. Substitute into your equations to find what source term makes it work
3. Solve with that source term
4. Compare numerical solution to manufactured solution

**Example**:
- Choose manufactured solution: $v(t) = \sin(\omega t)$
- Substitute into $\frac{dv}{dt} + \frac{v}{RC} = f(t)$
- Find: $f(t) = \omega\cos(\omega t) + \frac{\sin(\omega t)}{RC}$
- Solve equation with this $f(t)$
- Compare to $\sin(\omega t)$

#### 3. Convergence Studies

Refine mesh/time step and check that solution converges:

```
dt = 1ms   → Solution = 4.95V
dt = 0.1ms → Solution = 4.998V
dt = 0.01ms → Solution = 4.9998V
                         └── Converging to 5.0V
```

If solution converges as step size decreases → Numerical method is working.

#### 4. Conservation Checks

Check that conservation laws hold in your solution:

- Does KCL hold at every node? (Σi = 0?)
- Does KVL hold around every loop? (Σv = 0?)
- Does energy balance? (Power in = Power out + Stored?)

---

## Validation: Does It Match Reality?

### What Validation Checks

> "Do my equations actually represent the physical system?"

This is harder than verification because reality is the judge!

### Common Validation Methods

#### 1. Compare to Measurements

Build it. Measure it. Compare.

```
Model predicts: Output voltage = 3.45V at 1kHz
Measurement:    Output voltage = 3.42V at 1kHz
Error: 0.9% ← Acceptable!

Model predicts: Bandwidth = 10MHz
Measurement:    Bandwidth = 5MHz
Error: 50% ← Model is missing something!
```

#### 2. Benchmark Cases

Test against known solutions from literature or validated codes:

- SPICE vs hand calculation for simple circuits
- Your model vs industry-standard simulator
- Published experimental data

#### 3. Physical Intuition Checks

Does the model behave sensibly?

**Ask yourself**:
- If I double the resistance, does current halve?
- Does the output approach the right DC value?
- Does the transient look like exponential decay (as expected)?
- Are the time constants reasonable?

#### 4. Extreme Cases

Test behavior at limits:

- What happens when R → 0 or R → ∞?
- Does the model blow up for large signals?
- Does it handle DC correctly?
- What about very high frequency?

---

## The V&V Flowchart

```
┌─────────────────────────────────────────────────────────────┐
│                     MODEL DEVELOPMENT                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │  VERIFICATION            │
              │  "Are we solving the     │
              │   equations correctly?"  │
              └────────────┬────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                              │
            ▼                              ▼
    ┌───────────────┐              ┌───────────────┐
    │     PASS      │              │     FAIL      │
    │               │              │ Fix code!     │
    │               │              │ Fix solver!   │
    └───────┬───────┘              └───────────────┘
            │
            ▼
              ┌─────────────────────────┐
              │  VALIDATION              │
              │  "Do equations match     │
              │   physical reality?"     │
              └────────────┬────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                              │
            ▼                              ▼
    ┌───────────────┐              ┌───────────────┐
    │     PASS      │              │     FAIL      │
    │  Model ready  │              │ Improve model!│
    │  for use!     │              │ Add physics!  │
    └───────────────┘              └───────────────┘
```

---

## When Models Fail: Diagnosis

### Verification Failure Symptoms

| Symptom | Likely Cause |
|---------|--------------|
| Solution blows up | Time step too large, instability |
| Solution doesn't converge | Numerical error, bad algorithm |
| Results change with step size | Insufficient resolution |
| Conservation laws violated | Implementation bug |

### Validation Failure Symptoms

| Symptom | Likely Cause |
|---------|--------------|
| Wrong DC value | Missing component, wrong topology |
| Wrong time constant | Wrong R or C value |
| Wrong frequency response | Missing parasitic element |
| Unexpected oscillation | Missing feedback path in model |

---

## The Validation Hierarchy

Not all validation is equal:

```
        BEST
          │
          ▼
┌─────────────────────────────────────┐
│  Experimental Measurement           │  "Gold standard"
│  (on actual hardware)               │
└─────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│  Independent Validated Simulation   │  "Silver standard"
│  (another tool with proven track    │
│   record, e.g., HSPICE)            │
└─────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│  Analytical Solution                │  "Bronze standard"
│  (when available)                   │
└─────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│  Physical Intuition                 │  "Sanity check"
│  (necessary but not sufficient)     │
└─────────────────────────────────────┘
```

---

## Uncertainty and Error Budgets

### Sources of Uncertainty

1. **Model Uncertainty**: Missing physics, simplified assumptions
2. **Parameter Uncertainty**: Component tolerances (5% resistors, etc.)
3. **Numerical Uncertainty**: Discretization error, roundoff
4. **Measurement Uncertainty**: Instrument accuracy, noise

### Building an Error Budget

```
Total Uncertainty = √(model² + parameter² + numerical² + measurement²)

Example:
- Model uncertainty: ±5% (estimated from missing parasitics)
- Parameter uncertainty: ±3% (from component tolerances)
- Numerical uncertainty: ±0.1% (from convergence study)
- Measurement uncertainty: ±2% (from instrument specs)

Total: √(25 + 9 + 0.01 + 4) = √38.01 ≈ ±6.2%
```

---

## Practical V&V Checklist

Before declaring your model "done," verify:

### ✅ Verification Checklist
- [ ] Solution converges as mesh/step is refined
- [ ] Conservation laws hold (KCL, KVL, energy)
- [ ] Known analytical solutions are reproduced
- [ ] Code gives same results when re-run (deterministic)
- [ ] Results are independent of arbitrary choices (initial guess, etc.)

### ✅ Validation Checklist
- [ ] DC operating points match expectations
- [ ] Time constants are reasonable
- [ ] Frequency response matches theory/data
- [ ] Limiting cases behave correctly (R→0, R→∞, etc.)
- [ ] Comparison to measurements within expected tolerance
- [ ] Physical intuition is satisfied (no "magic")

---

## Summary

> **Verification asks "Did we solve the equations right?" Validation asks "Did we solve the right equations?"**

| Aspect | Verification | Validation |
|--------|--------------|------------|
| Question | Math correct? | Physics correct? |
| Reference | Exact solution | Physical measurement |
| Finds | Code bugs, solver issues | Missing physics, wrong assumptions |
| Methods | Convergence study, manufactured solutions | Experiments, benchmarks |

Both are essential:
- **Perfect code + wrong model = useless predictions**
- **Perfect model + buggy code = useless predictions**

Only with both verification AND validation can you trust your model!
